import { bufferTime, filter, fromEvent, scan, throttleTime, map } from 'rxjs';

const button = document.getElementById("firstButton")
const multipleOperatorFunctionButton = document.getElementById("multipleOperatorFunction")
const doubleClick = document.getElementById("doubleClick")


// simple counter
fromEvent(button, 'click')
    .pipe(
        scan((count: number) => count + 1, 0),
    )
    .subscribe((count: number) => 
        console.log(`count: ${count}`)
    )

// 偶数だけをprintする
fromEvent(multipleOperatorFunctionButton, 'click')
    .pipe(
        scan((count: number) => count + 1, 0),
        filter((count: number) => count % 2 === 0)
    )
    .subscribe((count: number) => 
        console.log(`even count: ${count}`)
    )

// double click checker
fromEvent(doubleClick, 'click')
    .pipe(
        bufferTime(250),
        map((clicks: Array<Event>) => clicks.length),
        filter((clickLength: number)=> clickLength >= 2)
    )
    .subscribe((_: any) => 
        console.log(`double click detected!!`)
    )
