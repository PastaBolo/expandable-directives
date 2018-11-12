import { Directive, OnChanges, OnInit, HostBinding, Input, Output, EventEmitter, InjectionToken, forwardRef, SimpleChanges } from '@angular/core';
import { ExpandableContentDirective } from './expandable-content.directive';

export const EXPANDABLE_CONTAINER = new InjectionToken<ExpandableContainerDirective>('expandable container');

@Directive({
  selector: '[expandable]',
  exportAs: 'expandableContainer',
  providers: [{ provide: EXPANDABLE_CONTAINER, useExisting: forwardRef(() => ExpandableContainerDirective) }]
})
export class ExpandableContainerDirective implements OnChanges, OnInit {
  @HostBinding('class.expansion-animating') animationClass;
  @HostBinding('class.expansion-opened') openedClass;
  @HostBinding('class.expansion-disabled') disabledClass;

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  @Input() disabled = false;
  @Output() disabledChange = new EventEmitter<boolean>();

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationDone = new EventEmitter<void>();

  content: ExpandableContentDirective;

  ngOnChanges(changes: SimpleChanges): void {
    const { opened, disabled } = changes;
    if (opened && !opened.firstChange) {
      opened.currentValue ? this.open() : this.close();
    }
    if (disabled) {
      disabled.currentValue ? this.disable() : this.enable();
    }
  }

  ngOnInit(): void {
    this.openedClass = this.opened;
    this.disabledClass = this.disabled;
    if (!this.opened) {
      this.content.closeAtInitialization();
    }
  }

  toggle(): void {
    if (!this.disabled) {
      this.openedChange.emit(this.opened = this.openedClass = !this.opened);
      this.animate();
    }
  }

  open(): void {
    if (!this.disabled) {
      this.openedChange.emit(this.opened = this.openedClass = true);
      this.animate();
    }
  }

  close(): void {
    if (!this.disabled) {
      this.openedChange.emit(this.opened = this.openedClass = false);
      this.animate();
    }
  }

  private animate(): void {
    this.opened ? this.content.open() : this.content.close();
  }

  enable(): void {
    this.disabledChange.emit(this.disabled = this.disabledClass = false);
  }

  disable(): void {
    this.disabledChange.emit(this.disabled = this.disabledClass = true);
  }
}
