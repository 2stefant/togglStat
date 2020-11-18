import React from "react";
import { render, screen } from "@testing-library/react";
import BasicDropdown from "./BasicDropdown";

describe("BasicDropdown", () => {
  // const title = "titleX";
  // const desc = "descriptionY";

  test("should show empty Dropdown", () => {
    const {queryByLabelText} = render(
      <BasicDropdown />
    );
    
    expect(queryByLabelText(/Select Item:/)).toBeTruthy();
  });

});
