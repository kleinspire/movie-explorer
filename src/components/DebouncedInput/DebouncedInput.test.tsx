import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

const useDebouncedValueMock = vi.fn();

vi.doMock("../../util/useDebouncedValue", () => ({
  useDebouncedValue: useDebouncedValueMock,
}));

vi.mock("../Input/Input", () => ({
  Input: vi.fn((props) => <input {...props} />),
}));

describe("DebouncedInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with the initial value", async () => {
    const initialValue = "initial";
    const onValueChange = vi.fn();

    // Mock the hook to return the initial value
    useDebouncedValueMock.mockReturnValue({
      value: initialValue,
      setValue: vi.fn(),
    });

    const { DebouncedInput } = await import("./DebouncedInput");

    render(
      <DebouncedInput
        initialValue={initialValue}
        onValueChange={onValueChange}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue(initialValue);
  });

  it("updates the input value when changed", async () => {
    const initialValue = "initial";
    const onValueChange = vi.fn();
    const setValueMock = vi.fn();

    // Mock the hook to return the initial value and setValue function
    useDebouncedValueMock.mockReturnValue({
      value: initialValue,
      setValue: setValueMock,
    });

    const { DebouncedInput } = await import("./DebouncedInput");

    render(
      <DebouncedInput
        initialValue={initialValue}
        onValueChange={onValueChange}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(setValueMock).toHaveBeenCalledWith("new value");
  });

  it("calls onValueChange with debounced input value", async () => {
    const initialValue = "initial";
    const debounceDelay = 300;
    const onValueChange = vi.fn();

    // Mock the hook to return the initial value and setValue function
    useDebouncedValueMock.mockReturnValue({
      value: initialValue,
      setValue: (newValue: string) => {
        onValueChange(newValue);
      },
    });

    const { DebouncedInput } = await import("./DebouncedInput");

    render(
      <DebouncedInput
        initialValue={initialValue}
        onValueChange={onValueChange}
        debounceDelay={debounceDelay}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(onValueChange).toHaveBeenCalledWith("new value");
  });
});
