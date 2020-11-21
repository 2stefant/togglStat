import { render, screen } from "@testing-library/react";
import DurationCalculator from "./DurationCalculator";

describe("DurationCalculator", () => {
  test("should create Duration object", () => {
    // Arrange
    let calculator = DurationCalculator.getSingleton();
    let expected = {
      hours: 1,
      mins: 2,
      secs: 3,
      title: "hello",
      raw: 4,
    };
    // Act
    let result = calculator.createDuration(1, 2, 3, "hello", 4);
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 111 sec", () => {
    // Arrange
    let calculator = DurationCalculator.getSingleton();
    let expected = calculator.createDuration(0, 0, 111, null, 111 * 1000);
    // Act
    let result = calculator.toDuration(111 * 1000);
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 678 minutes => 11hours + 18mins", () => {
    // Arrange
    let calculator = DurationCalculator.getSingleton();
    let millis=678 * 60 * 1000;
    let expected = calculator.createDuration(11, 18, 0, null, millis);
    // Act
    let result = calculator.toDuration(millis);
    // Assert
    assertDurationProps(result, expected);
  });

  test("should return 3 hours", () => {
    // Arrange
    let calculator = DurationCalculator.getSingleton();
    const millis = 3 * 60 * 60 * 1000;
    let expected = calculator.createDuration(3, 0, 0, null, millis);
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
