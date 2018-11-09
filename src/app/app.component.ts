import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onStart(): void {
    console.log('animation started')
  }

  onDone(): void {
    console.log('animation done')
  }
}
