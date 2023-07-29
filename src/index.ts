import { bufferTime, filter, fromEvent, scan, map, Observable, Subscriber } from 'rxjs';

const button = document.getElementById("firstButton")
const multipleOperatorFunctionButton = document.getElementById("multipleOperatorFunction")
const doubleClick = document.getElementById("doubleClick")

/**
 * Simple getting started Example
 */

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

/**
 * Observable Example
 */

const simpleObservable1 = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(0)
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    subscriber.error("some error message")
    subscriber.complete()
})

// define only next handler
// simpleObservable1.subscribe((data: number) => {
//     console.log(`data: ${data}`)
// })

// define all handler
simpleObservable1.subscribe({
    next: (x: number) => console.log(`value: ${x}`),
    error: (err: any) => console.log(`error: ${err}`),
    complete: () => console.log("subscription completed")
})

const asyncObservable = new Observable((subscriber: Subscriber<Promise<number>>) => {
    subscriber.next(Promise.resolve(1))
    subscriber.next(Promise.resolve(2))
    subscriber.next(Promise.resolve(3))
    subscriber.next(Promise.resolve(4))
})

asyncObservable.subscribe((data: Promise<number>) => {
    data.then((x: number) =>{
        console.log(`resolved data: ${x}`)
    })
})
