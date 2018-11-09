import { Directive, HostBinding, Input, Output, EventEmitter, InjectionToken, forwardRef } from '@angular/core'
import { ExpandableContent } from './expandable-content.directive'

export const EXPANDABLE_CONTAINER = new InjectionToken<ExpandableContainer>('expandable container')

@Directive({
  selector: '[expandable]',
  exportAs: 'expandableContainer',
  providers: [{ provide: EXPANDABLE_CONTAINER, useExisting: forwardRef(() => ExpandableContainer) }]
})
export class ExpandableContainer {
  @HostBinding('class.expansion-animating') animationClass = false
  @HostBinding('class.expansion-disabled') disabledClass = false

  @Input() opened: boolean = false
  @Input() disabled: boolean = false

  @Output() animationStart = new EventEmitter()
  @Output() animationDone = new EventEmitter()

  content: ExpandableContent

  ngOnInit(): void {
    this.disabledClass = this.disabled
    if (!this.opened) this.content.closeAtInitialization()
  }

  toggle(): void {
    if (!this.disabled) {
      this.opened = !this.opened
      this.opened ? this.content.open() : this.content.close()
    }
  }

  enable(): void {
    this.disabled = this.disabledClass = false
  }

  disable(): void {
    this.disabled = this.disabledClass = true
  }
}
