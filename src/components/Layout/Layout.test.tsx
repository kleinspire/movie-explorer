import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("renders children correctly", () => {
    const headerContent = <div>Header Content</div>;
    const mainContent = <div>Main Content</div>;

    render(<Layout>{[headerContent, mainContent]}</Layout>);

    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });
});
