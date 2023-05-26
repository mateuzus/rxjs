import { Component, OnInit } from '@angular/core';
import { fromEvent, map } from 'rxjs';

interface mouseTrack {
  x: number
  y: number
}

interface IMovie {
  title: string
}

@Component({
  selector: 'app-mouse-events',
  templateUrl: './mouse-events.component.html',
  styleUrls: ['./mouse-events.component.css']
})
export class MouseEventsComponent implements OnInit {

  button: any = document.getElementById('button')
  output: any = document.getElementById('output')

  click: any = fromEvent(this.button, 'click')

  ngOnInit(): void { 
    setTimeout(() => console.log(this.click), 1000)
  }

  source = fromEvent(document, 'mousemove').pipe(
    map((e: any) => {
      return { x: e.clientX, y: e.clientY }
    })/* ,
    filter((value: mouseTrack) => value.x < 500) */
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

  load(url: string) {
    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      let movies = JSON.parse(xhr.responseText)

      movies.forEach((movie: IMovie) => {
        let div = document.createElement('div')
        div.innerText = movie.title
        this.output.appendChild(div)
      })
    })

    xhr.open('GET', url)
    xhr.send()
  }

  clickButton() {
    this.click.subscribe({
      next: () => { this.load('../../../../movies.json') },
      error: (e: Error) => { console.log(e) },
      complete: () => { console.log('complete') }
    })
  }

}
