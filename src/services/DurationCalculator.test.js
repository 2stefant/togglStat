import DurationCalculator from "./DurationCalculator";

describe("DurationCalculator", () => {
  const calculator = DurationCalculator.getSingleton();

  test("should calc secs", () => {
    // Arrange
    let expected = 2;
    // Act
    let result = calculator.calcSecs(2.745 * 1000);
    // Assert
    expect(result).toBe(expected);
  });

  test("should calc secs part", () => {
    // Arrange
    let expected = 12;
    let oneMin = 60 * 1000;
    // Act
    let result = calculator.calcSecsPart(oneMin + 12.745 * 1000);
    // Assert
    expect(result).toBe(expected);
  });

  test("should calc mins", () => {
    // Arrange
    let expected = 67;
    let oneHour = 60 * 60 * 1000;
    // Act
    let result = calculator.calcMins(oneHour + 7 * 60 * 1000);
    // Assert
    expect(result).toBe(expected);
  });

  test("should calc mins part", () => {
    // Arrange
    let expected = 7;
    let oneHour = 60 * 60 * 1000;
    // Act
    let result = calculator.calcMinsPart(oneHour + 7 * 60 * 1000);
    // Assert
    expect(result).toBe(expected);
  });

  test("should calc hours", () => {
    // Arrange
    let expected = 112;
    let lots = 112 * 60 * 60 * 1000;
    // Act
    let result = calculator.calcHours(lots);
    // Assert
    expect(result).toBe(expected);
  });

  test("should calc hours part 24 hours", () => {
    // Arrange
    let expected = 11;
    let lots = 35 * 60 * 60 * 1000;
    // Act
    let result = calculator.calcHoursPartDay(lots);
    // Assert
    expect(result).toBe(expected);
  });

  test("should create Duration object by time parts", () => {
    // Arrange
    let expected = {
      hours: 1,
      mins: 2,
      secs: 3,
      title: "hello",
      raw: 1000* (3 + 2*60 + 1*60*60)
    };
    // Act
    let result = calculator.createDuration(1, 2, 3, "hello");
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 121secs => 2mins + 1secs", () => {
    // Arrange
    let millis = 121 * 1000;
    let expected = calculator.createDuration(0, 2, 1);
    // Act
    let result = calculator.toDuration(millis);
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 678 minutes => 11hours + 18mins", () => {
    // Arrange
    let millis = 678 * 60 * 1000;
    let expected = calculator.createDuration(11, 18);
    // Act
    let result = calculator.toDuration(millis);
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 3 hours", () => {
    // Arrange
    const millis = 3 * 60 * 60 * 1000;
    let expected = calculator.createDuration(3);
    // Act
    let result = calculator.toDuration(millis);
    // Assert
    assertDurationProps(result, expected);
  });

  function assertDurationProps(result, expected) {
    expect(result.hours).toBe(expected.hours);
    expect(result.minutes).toBe(expected.minutes);
    expect(result.seconds).toBe(expected.seconds);
    expect(result.raw).toBe(expected.raw);
    expect(result.title).toBe(expected.title);
  }
});
