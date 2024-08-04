import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button");
  });

  it("applies the className prop correctly", () => {
    const className = "custom-button-class";
    render(<Button className={className}>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("button");
    expect(buttonElement).toHaveClass(className);
  });

  it("renders correctly when disabled", () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("button");
    expect(buttonElement).toHaveClass("button--disabled");
  });

  it("passes other props correctly", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
