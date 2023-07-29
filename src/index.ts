import { fromEvent, scan } from 'rxjs';

const button = document.getElementById("buttonId")

fromEvent(button, 'click')
    .pipe((scan))
