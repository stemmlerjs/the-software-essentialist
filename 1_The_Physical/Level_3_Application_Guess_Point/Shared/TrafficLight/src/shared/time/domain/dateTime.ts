
interface State {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class DateTime {

  private state: State;

  private constructor (state: State) {
    this.state = state;
  }

  public advance({ seconds }: { seconds: number }): DateTime {
    let systemCurrentTime = this.toSystemDateTime();
    systemCurrentTime.setSeconds(systemCurrentTime.getSeconds() + seconds);
    return DateTime.fromSystemDateTime(systemCurrentTime);
  }

  getYear () {
    return this.state.year;
  }

  getMonth () {
    return this.state.month;
  }

  getDate () {
    return this.state.date;
  }

  getHours () {
    return this.state.hours;
  }

  getMinutes () {
    return this.state.minutes;
  }

  getSeconds () {
    return this.state.seconds;
  }

  getSecondsBetween (inputDate: DateTime) {
    // Get the delta in seconds
    let inputSystemDate = inputDate.toSystemDateTime();
    let thisSystemDate = this.toSystemDateTime();
    return Math.abs(inputSystemDate.getSeconds() - thisSystemDate.getSeconds());
  }

  public static fromSystemDateTime (systemDateTime: Date) {
    let year = systemDateTime.getFullYear();
    let month = systemDateTime.getMonth();
    let date = systemDateTime.getDate();
    let hours = systemDateTime.getHours();
    let minutes = systemDateTime.getMinutes();
    let seconds = systemDateTime.getSeconds()

    return new DateTime({ year, month, date, hours, minutes, seconds })
  }

  toSystemDateTime () {
    let year = this.getYear();
    let month = this.getMonth();
    let date = this.getDate();
    let hours = this.getHours();
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();

    return new Date(year, month, date, hours, minutes, seconds);
  }

}