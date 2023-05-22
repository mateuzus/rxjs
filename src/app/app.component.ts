import { Component } from '@angular/core';
import { Observable, filter } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    this.component()
  }

  numbers = [1, 5, 10, 15, 20, 25, 30]

  source = new Observable(subscriber => {
    let index = 0
    let produceValue = () => {
      subscriber.next(this.numbers[index++])
      if (index < this.numbers.length) {
        setTimeout(produceValue, 500)
      } else {
        subscriber.complete()
      }
    }
    produceValue()
  })

  component() {
    this.source.pipe(
      filter((n: any) => n > 5)
    ).subscribe({
      next: (x: any) => {
        console.log(`filter: ${x}`)
      },
      error: (e: Error) => console.log(e),
      complete: () => console.log('Complete'),
    })
  }

}
