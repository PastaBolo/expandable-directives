import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ExpandableModule } from './expandable/expandable.module'
import { AppComponent } from './app.component';
import { ExpandComponent } from './expand/expand.component'

@NgModule({
  declarations: [AppComponent, ExpandComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ExpandableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
