import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from "react-testing-library";
import Checkout from '../containers/Checkout'

afterEach(cleanup)

describe('Checkout page', () => {
  it("Checkout component should render without crashing", () => {
    render(<Checkout />);
  });
  it("Page should render with header Checkout", () => {
    const { getByText } =  render(<Checkout />);
    const headerEl = getByText("Checkout");
    expect(headerEl).toBeDefined()
  });
})