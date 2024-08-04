import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input Component", () => {
  it("renders correctly with default props", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("input");
  });

  it("applies the className prop correctly", () => {
    const className = "custom-class";
    render(<Input className={className} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("input");
    expect(inputElement).toHaveClass(className);
  });

  it("passes other props correctly", () => {
    const placeholderText = "Enter text";
    const inputValue = "Sample text";
    render(<Input placeholder={placeholderText} value={inputValue} readOnly />);

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(inputValue);
  });
});
