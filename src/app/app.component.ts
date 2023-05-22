import { Component } from '@angular/core';
import { Observable, from } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    this.component()
  }

  numbers = [1, 5, 10]
  source = from(this.numbers)

  sourceInstance = new Observable(subscriber => {
    
  })

  component() {
    this.sourceInstance.subscribe({
      next: (x: any) => {
        console.log(x)
      },
      error: (e: Error) => console.log(e),
      complete: () => console.log('Complete'),
    })
  }

}
