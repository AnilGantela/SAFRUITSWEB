import styled from "styled-components";

/* Root container: flex row layout */
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh; /* fallback for older browsers */
  min-height: 100dvh; /* mobile-safe viewport */
  margin: 0;
  box-sizing: border-box;
`;

/* Sidebar / Navigation */
export const SideNavContainer = styled.div`
  width: 220px;
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  flex-shrink: 0; /* prevent sidebar shrinking */
  background-color: #f0f0f0; /* optional, for visibility */

  @media (max-width: 768px) {
    display: block;
    width: 0px; /* hide sidebar on mobile */
  }
`;

/* Main content area */
export const ContentContainer = styled.div`
  flex: 1; /* take remaining space */
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto; /* scroll content if taller than viewport */

  /* Safe area for notches / mobile bars */
  padding-top: calc(10px + env(safe-area-inset-top));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));

  @media (max-width: 768px) {
    min-height: 100dvh;
  }
`;
