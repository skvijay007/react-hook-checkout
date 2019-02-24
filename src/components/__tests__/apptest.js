import React from 'react';
import { render, cleanup } from "react-testing-library";
import App from '../App'

afterEach(cleanup)

describe('<App />', () => {
  it("App should render without crashing", () => {
    render(<App />);
  });
})