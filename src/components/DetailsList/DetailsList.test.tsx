import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DetailsList } from "./DetailsList";

describe("DetailsList", () => {
  const mockItems: [string, string][] = [
    ["Label 1", "Value 1"],
    ["Label 2", "Value 2"],
    ["Label 3", "Value 3"],
  ];

  it("renders correctly with given items", () => {
    render(<DetailsList items={mockItems} />);

    // Check that each label and value is rendered correctly
    mockItems.forEach(([label, value]) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("renders with additional className", () => {
    const additionalClassName = "additional-class";
    render(
      <DetailsList
        data-testid="details-list"
        items={mockItems}
        className={additionalClassName}
      />
    );

    const detailsListElement = screen.getByTestId("details-list");
    expect(detailsListElement).toHaveClass("details-list", additionalClassName);
  });

  it("applies additional props to the div", () => {
    const dataTestId = "details-list";
    render(<DetailsList items={mockItems} data-testid={dataTestId} />);

    const detailsListElement = screen.getByTestId(dataTestId);
    expect(detailsListElement).toBeInTheDocument();
  });

  it("renders with no items", () => {
    render(<DetailsList items={[]} />);

    // Check that no rows are rendered
    expect(screen.queryAllByRole("row")).toHaveLength(0);
  });
});
