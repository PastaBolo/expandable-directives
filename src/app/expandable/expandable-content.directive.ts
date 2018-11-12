import { Directive, HostBinding, Input, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationMetadata, AnimationPlayer, style, animate } from '@angular/animations';

import { ExpandableContainerDirective } from './expandable-container.directive';

@Directive({
  selector: '[expandableContent]'
})
export class ExpandableContentDirective {
  @HostBinding('style.overflow-y') overflowY = 'hidden';

  @Input() timings: string | number = '225ms cubic-bezier(0.4,0.0,0.2,1)';

  private player: AnimationPlayer;

  constructor(
    private container: ExpandableContainerDirective,
    private animationBuilder: AnimationBuilder,
    private el: ElementRef
  ) {
    this.container.content = this;
  }

  closeAtInitialization(): void {
    this.player = this.animationBuilder
      .build([style({ height: 0, visibility: 'hidden' })])
      .create(this.el.nativeElement);
    this.player.play();
  }

  open(): void {
    this.animate([
      style({ height: this.el.nativeElement.clientHeight }),
      animate(this.timings, style('*')),
      style({ height: 'auto' })
    ]);
  }

  close(): void {
    this.animate([
      style({ height: this.el.nativeElement.clientHeight }),
      animate(this.timings, style({ height: 0, visibility: 'hidden' }))
    ]);
  }

  private animate(animationData: AnimationMetadata[]): void {
    if (this.player) {
      this.player.reset();
    }
    this.player = this.animationBuilder.build(animationData).create(this.el.nativeElement);
    this.player.onStart(() => {
      this.container.animationStart.emit();
      this.container.animationClass = true;
    });
    this.player.onDone(() => {
      this.container.animationDone.emit();
      this.container.animationClass = false;
    });
    this.player.play();
  }
}
