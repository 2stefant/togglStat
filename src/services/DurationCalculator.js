/**
 * Encapsulation of Duration calculations between
 * milliseconds to hours, minutes, seconds.
 */
var DurationCalculator = (function () {
  var instance;

  function createSingleton() {
    return {
      /**
       * Splits milli-seconds into duration and returns the military time
       * format HH:MM:SS. Note that HH is not limited to 24 hours.
       * @param  {number} millis
       */
      toDurationTime: function (millis = 0, skipSeconds = false) {
        return this.toDuration(millis).toTime(skipSeconds);
      },
      /**
       * Splits milli-seconds into duration with
       * hours, minutes, seconds.
       * @param  {number} millis
       * @param  {string} title optional, title explaining what it is.
       * @return {object} duration object with metrics separated.
       */
      toDuration: function (millis = 0, title = null) {
        return this.createDuration(
          this.calcHours(millis),
          this.calcMinsPart(millis),
          this.calcSecsPart(millis),
          title,
          millis
        );
      },
      createDuration: function (hours, mins, secs, title = null, millis = 0) {
        return new Duration(hours, mins, secs, title, millis);
      },
      calcMillis: function (hours, mins, secs) {
        if (!hours) hours = 0;
        if (!mins) mins = 0;
        if (!secs) secs = 0;
        return 1000 * (secs + mins * 60 + hours * 60 * 60);
      },
      calcSecs: function (millis) {
        if (!millis) millis = 0;
        return parseInt(millis / 1000);
      },
      calcSecsPart: function (millis) {
        return parseInt(this.calcSecs(millis) % 60);
      },
      calcMins: function (millis) {
        if (!millis) millis = 0;
        return parseInt(this.calcSecs(millis) / 60);
      },
      calcMinsPart: function (millis) {
        return parseInt(this.calcMins(millis) % 60);
      },
      calcHours: function (millis) {
        if (!millis) millis = 0;
        return parseInt(this.calcMins(millis) / 60);
      },
      calcHoursPartDay: function (millis) {
        return parseInt(this.calcHours(millis) % 24);
      },

      /** Converts a value to atleast a two digit string. */
      twoDigits: function (value) {
        if (!value) value = 0;
        return value < 10 ? `0${value}` : value;
      },
      /** 
       * Converts duration into military time format "HH:MM:SS".
       * Note that HH is not limited to 24 hours.
      */
      toTime: function (hours, mins, secs, skipSeconds = false) {
        if (!hours) hours = 0;
        if (!mins) mins = 0;
        if (!secs) secs = 0;

        if (hours < 1 && mins < 1 && secs < 1) {
          return "-";
        }

        return (
          `${this.twoDigits(hours)}:` +
          `${this.twoDigits(mins)}` +
          `${skipSeconds ? "" : ":" + this.twoDigits(secs)}`
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

export class Duration {
  constructor(hours = 0, mins = 0, secs = 0, title = null, raw = 0) {
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;
    this.title = title;

    if (raw && raw > 0 && raw !== this.calcRaw()) {
      throw Error("Mismatch raw vs hours/mins/secs when creating Duration object.");
    }
    this.updateRaw();
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
  toTime(skipSeconds=false) {
    return DurationCalculator.getSingleton()
      .toTime(this.hours, this.mins, this.secs, skipSeconds);
  }
}
