import { renderHook, act } from "@testing-library/react-hooks";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock lodash debounce
const cancelMock = vi.fn();
const debounceMock = vi.fn((fn: (...args: unknown[]) => void) => {
  const debouncedFn = Object.assign(
    (...args: unknown[]) => {
      fn(...args);
    },
    {
      cancel: cancelMock,
    }
  );
  return debouncedFn;
});

vi.doMock("lodash", () => ({
  debounce: debounceMock,
}));

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial value and updates value", async () => {
    const initialValue = "initial";
    const onFlush = vi.fn();

    const { useDebouncedValue } = await import("./useDebouncedValue");

    const { result } = renderHook(() =>
      useDebouncedValue({ initialValue, onFlush })
    );

    expect(result.current.value).toBe(initialValue);

    act(() => {
      result.current.setValue("new value");
    });

    expect(result.current.value).toBe("new value");
  });

  it("calls onFlush with debounced value", async () => {
    const initialValue = "initial";
    const debounceDelay = 300;
    const onFlush = vi.fn();

    const { useDebouncedValue } = await import("./useDebouncedValue");

    const { result } = renderHook(() =>
      useDebouncedValue({
        initialValue,
        onFlush,
        debounceDelay,
      })
    );

    act(() => {
      result.current.setValue("new value");
    });

    // Assert that debounce was called with the correct arguments
    expect(debounceMock).toHaveBeenCalledWith(
      expect.any(Function),
      debounceDelay
    );

    // Since we're mocking debounce to call the function immediately,
    // the onFlush should have been called right away
    expect(onFlush).toHaveBeenCalledWith("new value");
  });

  it("cancels previous debounce calls on unmount", async () => {
    const initialValue = "initial";
    const debounceDelay = 300;
    const onFlush = vi.fn();

    const { useDebouncedValue } = await import("./useDebouncedValue");

    const { result, unmount } = renderHook(() =>
      useDebouncedValue({
        initialValue,
        onFlush,
        debounceDelay,
      })
    );

    act(() => {
      result.current.setValue("new value");
    });

    unmount();

    expect(cancelMock).toHaveBeenCalled();
  });
});
