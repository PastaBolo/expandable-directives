import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExpandableContainer } from './expandable-container.directive'
import { ExpandableContent } from './expandable-content.directive'

@NgModule({
  imports: [CommonModule],
  exports: [ExpandableContainer, ExpandableContent],
  declarations: [ExpandableContainer, ExpandableContent]
})
export class ExpandableModule {}
