import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useImageErrorHandler } from "./useImageErrorHandler";

describe("useImageErrorHandler", () => {
  it("should hide the image on error", () => {
    const { result } = renderHook(() => useImageErrorHandler());
    const event = {
      currentTarget: {
        style: { display: "block" },
      },
    } as React.SyntheticEvent<HTMLImageElement, Event>;

    result.current(event);

    expect(event.currentTarget.style.display).toBe("none");
  });
});
