import { Component, OnInit } from '@angular/core';
import { delay, filter, fromEvent, map } from 'rxjs';

interface mouseTrack {
  x: number
  y: number
}

@Component({
  selector: 'app-mouse-events',
  templateUrl: './mouse-events.component.html',
  styleUrls: ['./mouse-events.component.css']
})
export class MouseEventsComponent implements OnInit {

  ngOnInit(): void { }

  source = fromEvent(document, 'mousemove').pipe(
    map((e: any) => {
      return { x: e.clientX, y: e.clientY }
    }),
    filter((value: mouseTrack) => value.x < 500)
  )

  onNext(value: mouseTrack) {
    let circle: any = document.getElementById('circle')
    circle.style.left = `${value.x}px`
    circle.style.top = `${value.y}px`
  }

  mouseMove() {
    this.source.subscribe({
      next: (value) => this.onNext(value),
      error: (e: Error) => console.log(e),
      complete: () => console.log()
    })
  }

}
