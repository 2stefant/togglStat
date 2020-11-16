import { render, screen } from "@testing-library/react";
import AboutView from "./AboutView";

describe("AboutView", () => {
  const title = "titleX";
  const desc = "descriptionY";

  test("should show About", () => {
    render(<AboutView />);
    let elem = screen.getByText("About");
    expect(elem).toBeInTheDocument();
  });

  const baseTestFlow = (t, d) => {
    render(<AboutView title={t} description={d} />);
    let texts = [t, d];
    for (let text of texts) {
      if (text) {
        let elem = screen.getByText(text);
        expect(elem).toBeInTheDocument();
      }
    }
  };

  test("should show Title", () => {
    baseTestFlow(title, null);
  });

  test("should show Description", () => {
    baseTestFlow(null, desc);
  });

  test("should show Title + Description", () => {
    baseTestFlow(title, desc);
  });
});
