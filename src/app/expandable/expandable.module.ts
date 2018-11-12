import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableContainerDirective } from './expandable-container.directive';
import { ExpandableContentDirective } from './expandable-content.directive';

@NgModule({
  imports: [CommonModule],
  exports: [ExpandableContainerDirective, ExpandableContentDirective],
  declarations: [ExpandableContainerDirective, ExpandableContentDirective]
})
export class ExpandableModule {}
