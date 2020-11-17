import { render, screen } from "@testing-library/react";
import ConfigService from "./ConfigService";

describe("ConfigService", () => {

  test("should read dotenv values", () => {
    //Arrange
    let service=ConfigService.getSingleton();

    //Act 
    let result=service.getToggleKeys();

    //Assert
    expect(result).not.toBeNull();
  });

  test("should contain Toggl-specific properties", () => {
    //Arrange
    let service=ConfigService.getSingleton();

    //Act 
    let result=service.getToggleKeys();

    //Assert
    expect(result.apiKey).toEqual("TOKEN");
  });
});
