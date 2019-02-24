import React from 'react';
import { render, cleanup, waitForElement } from "react-testing-library";
import ProductsList from '../containers/ProductsList'

afterEach(cleanup)

describe('Product list', () => {
  const props = [
    {"id": "wf", "name": "Workflow", "price": "$199.99"},
    {"id": "docgen", "name": "Document Generation", "price": "$9.99"},
    {"id": "form", "name": "Form", "price": "$99.99"}
  ]

  const selectionCallback = jest.fn()

  it('it renders the product lists', () => {
    render(<ProductsList products={props} />)
  })
  it("it renders the Workflow product checkbox", async () => {
    const { getByTestId } =  render(<ProductsList products={props} selectionCallback={selectionCallback} />);
    await waitForElement(() => getByTestId(`Workflow`));
    const Workflow_checkbox = getByTestId(`Workflow`);
    expect(Workflow_checkbox).toBeDefined()
  });
  it("it renders the Form product checkbox", async () => {
    const { getByTestId } =  render(<ProductsList products={props} selectionCallback={selectionCallback} />);
    await waitForElement(() => getByTestId(`Form`));
    const form_checkbox = getByTestId(`Form`);
    expect(form_checkbox).toBeDefined()
  });
  it("it renders the Document Generation checkbox", async () => {
    const { getByTestId } =  render(<ProductsList products={props} selectionCallback={selectionCallback} />);
    await waitForElement(() => getByTestId(`Document Generation`));
    const dg_checkbox = getByTestId(`Document Generation`);
    expect(dg_checkbox).toBeDefined()
  });
})