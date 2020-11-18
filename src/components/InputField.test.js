import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {

  test("should have id", () => {
    let val = "id1";
    render(<InputField id={val} />);
    let elem = screen.getByRole("textbox", { id: val });
    expect(elem).toBeInTheDocument();
  });

//   test("should have name", () => {
//     let val = "Name2";
//     render(<InputField name={val} />);
//     let elem = screen.getByRole("textbox", 
//         { name: val.toLowerCase()});
//     expect(elem).toBeInTheDocument();
//   });

//   test("should have value", () => {
//     let val = "Value3";
//     render(<InputField name={val} />);
//     let elem = screen.getByDisplayValue( val.toLowerCase());
//     expect(elem).toBeInTheDocument();
//   });

//   test("should have callback", () => {
//     let val = ()=>{};
//     render(<InputField handleChangeCallback={val} />);
//     let elem = screen.getByRole("textbox", 
//         { onChange: null});
//     expect(elem).toBeInTheDocument();
//   });


  //   const baseTestFlow = (t, d) => {
  //     render(<AboutView title={t} description={d} />);
  //     let texts = [t, d];
  //     for (let text of texts) {
  //       if (text) {
  //         let elem = screen.getByText(text);
  //         expect(elem).toBeInTheDocument();
  //       }
  //     }
  //   };

  //   test("should show Title", () => {
  //     baseTestFlow(title, null);
  //   });
});
