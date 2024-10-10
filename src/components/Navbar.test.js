import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  // HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

describe("Navbar Component", () => {
  test("renders title", () => {
    // Arrange
    render(<Navbar />);

    // Act
    // N/A

    // Assert
    const titleElt = screen.getByText("Tiny To-Dos", { exact: true });
    expect(titleElt).toBeInTheDocument();
  });

  test("renders sub-bar", () => {
    // Arrange
    render(<Navbar />);

    // Act
    // N/A

    // Assert
    const titleElt = screen.getByText("Powered by Firestore Database", {
      exact: true,
    });
    expect(titleElt).toBeInTheDocument();
  });

  test("Clear Board button appears when there are todos", () => {
    // Arrange
    render(<Navbar todoNum={1} />);

    // Act
    // N/A

    // Assert
    let elt = screen.getByText("Clear Board", {
      exact: true,
    });
    expect(elt).toBeInTheDocument();

    elt = screen.queryByText("Populate with Sample Set", { exact: false });
    expect(elt).toBeNull();
  });

  test("Populate button appears when board is empty", () => {
    // Arrange
    render(<Navbar todoNum={0} />);

    // Act
    // N/A

    // Assert
    let elt = screen.getByText("Populate with Sample Set", {
      exact: true,
    });
    expect(elt).toBeInTheDocument();

    elt = screen.queryByText("Clear Board", { exact: false });
    expect(elt).toBeNull();
  });

  //   test("Confirmation dialog appears when 'Clear Board' button is clicked", () => {
  //     // Arrange
  //     render(<Navbar todoNum={14} />);

  //     // Act
  //     let btn = screen.getByText("Clear Board");
  //     userEvent.click(btn);

  //     // Assert
  //     btn = screen.getByText("No, Keep All", {
  //         exact: false,
  //       });
  //     userEvent.click(btn);
  //   });

//   test("Confirmation dialog can be dismissed", () => {
//     // Arrange
//     render(<Navbar todoNum={14} />);

//     // Action
//     let btn = screen.getByText("Clear Board");
//     userEvent.click(btn);

//     let dialog = screen.getByRole("dialog", { hidden: true });
//     btn = screen.getByText("No, Keep All");
//     expect(dialog).toContainElement(btn);
//     expect(btn).toBeVisible();
//     userEvent.click(btn);

//     // Assert
//     dialog = screen.getByRole("dialog", { hidden: true });
    
//   });
});
