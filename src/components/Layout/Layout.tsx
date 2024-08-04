import React, { ReactElement } from "react";
import "./Layout.scss";

interface LayoutProps {
  children: [ReactElement, ReactElement];
}

/**
 * Layout Component
 *
 * A layout component that divides the UI into a header and main content area.
 *
 * @component
 * @example
 * // Basic usage
 * <Layout>
 *   <HeaderComponent />
 *   <MainContentComponent />
 * </Layout>
 *
 * @param {Object} props - React props
 * @param {Array<ReactElement>} props.children - An array containing exactly two React elements,
 *                                               the first for the header and the second for the main content
 *
 * @returns {JSX.Element} The rendered layout component
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout__header">{children[0]}</header>
      <main className="layout__main">{children[1]}</main>
    </div>
  );
};
