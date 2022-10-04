export class Countdown {
  TIMER_INTERVAL = 1000; //ms
  static DONE = 0;

  // constructor gets callback for update interface
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.init();
  }

  init() {
    this.onTick(0);
  }

  //method gets initial starting time in Unix time ms for countdown timer
  start(initialTime) {
    return new Promise((resolve, reject) => {
      if (this.intervalId) {
        reject('Timer has been already started');
      } else {
        this.intervalId = setInterval(() => {
          const timeLeftMiliseconds = initialTime - Date.now();
          if (timeLeftMiliseconds < 1000) {
            resolve('Counting done successfully!');
          }
          this.onTick(timeLeftMiliseconds);
        }, this.TIMER_INTERVAL);
        console.log('timer started');
      }
    });
  }

  reset() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('timer stoped');
      this.intervalId = null;
      this.onTick(0);
      return;
    }
  }
}
