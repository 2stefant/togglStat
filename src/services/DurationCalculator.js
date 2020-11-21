/**
 * Encapsulation of Duraction calculations between
 * milliseconds to hours, minutes, seconds.
 */
var DurationCalculator = (function () {
  var instance;

  function createSingleton() {
    return {
      /**
       * Splits milli-seconds into duration with
       * hours, minutes, seconds.
       * @param  {number} millis
       * @param  {string} title optional, title explaining what it is.
       * @return {object} duration object with metrics separated.
       */
      toDuration: function (millis, title = null) {
        let secs = millis / 1000;

        return this.createDuration(
          parseInt((secs / (60 * 60)) % 24),
          parseInt((secs / 60) % 60),
          parseInt(secs % 60),
          title,
          millis
        );
      },
      createDuration: function (hours, mins, secs, title = null, raw = 0) {
        return new Duration(hours, mins, secs, title, raw);
      },
      calcMillis: function (hours, mins, secs) {
        return 1000 * (secs + mins * 60 + hours * 60 * 60);
      },
      /** Converts a value to atleast a two digit string. */
      twoDigits: function (value) {
        return value < 10 ? `0${value}` : value;
      },
      /** Converts duration into military time format "HH:MM:SS". */
      toTime: function (hours, mins, secs) {
        return (
          `${this.twoDigits(hours)}` +
          `${this.twoDigits(mins)}` +
          `${this.twoDigits(secs)}`
        );
      },
    };
  }

  return {
    /**
     * @return {object} The only instance of this service.
     */
    getSingleton: function () {
      if (!instance) {
        instance = createSingleton();
      }
      return instance;
    },
  };
})();
export default DurationCalculator;

class Duration {
  constructor(hours, mins, secs, title = null, raw = 0) {
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;
    this.title = title;
    this.raw = raw; //TODO make this private.
  }

  /** Gets the private raw, original value in total milliseconds. */
  getRaw() {
    return this.raw;
  }

  /** Calculates total milliseconds.
   * @returns The raw, original value if it existed or the calculated value.
   */
  calcRaw() {
    return this.raw && this.raw > 0
      ? this.raw
      : DurationCalculator.getSingleton().calcMillis(
          this.hours,
          this.mins,
          this.secs
        );
  }

  /** Updates the raw value from the hours, minutes and seconds value,
   * which may have changed from outside.
   * @returns The updated raw value.
   */
  updateRaw() {
    this.raw = 0;
    this.raw = this.calcRaw();
    return this.getRaw();
  }

  /** Converts duration into military time format "HH:MM:SS". */
  toTime() {
    return DurationCalculator.getSingleton()
      .toTime(this.hours,this.mins,this.secs);
  }
}
