import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
        console.log(`filter ${x}`)
      },
      error: (e: Error) => console.log(e),
      complete: () => console.log('Complete'),
    })
  }

}
