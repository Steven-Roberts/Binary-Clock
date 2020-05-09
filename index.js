import BinaryClock from './binary-clock.js';

const time = document.getElementById('time');
const rows = Array.from(Array(4), (x, i) => document.getElementById(`row${i}`));

const clock = new BinaryClock((bc) => {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r].cells;
    for (let c = 0; c < row.length; c++) {
      row[c].className = bc.isCellOn(r, c) ? 'on' : '';
    }
  }
  time.innerHTML = bc.toString();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 't' && !event.repeat) {
    clock.touggleHour12();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
