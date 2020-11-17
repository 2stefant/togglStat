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
    //expect(result.apiKey).toEqual("TOKEN");
  });

  test("should create empty togglKeys object", () => {
    //Arrange
    let service=ConfigService.getSingleton();

    //Act 
    let result=service.cloneTogglKeysObject(null);

    //Assert
    expect(result.apiKey).toEqual(null);
    expect(result.workspaceId).toEqual(null);
    expect(result.userAgent).toEqual(null);
    expect(result.projectId).toEqual(null);
  });

  test("should clone togglKeys object", () => {
    //Arrange
    let service=ConfigService.getSingleton();

    let obj={
      apiKey: "a",
      workspaceId: "b",
      userAgent: "c",
      projectId: "d"
    }

    //Act 
    let result=service.cloneTogglKeysObject(obj);

    //Assert
    expect(result.apiKey).toEqual(obj.apiKey);
    expect(result.workspaceId).toEqual(obj.workspaceId);
    expect(result.userAgent).toEqual(obj.userAgent);
    expect(result.projectId).toEqual(obj.projectId);
  });

});
