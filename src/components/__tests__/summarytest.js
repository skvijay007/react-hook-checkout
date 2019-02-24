import React from 'react';
import { render, cleanup, fireEvent } from "react-testing-library";
import Summary from '../containers/Summary'

afterEach(cleanup)

describe("Summary", () => {

  const promotions = [
    {"code": "RRD4D32", "discountType": "PERC", "toBeDiscounted": "10", "min": "1000", "max": "", "forProducts": [], "onPurchase": [], "on": "value"},
    {"code": "44F4T11", "discountType": "PERC", "toBeDiscounted": "10", "min": "1500", "max": "", "forProducts": [], "onPurchase": [], "on": "value"},
    {"code": "FF9543D1", "discountType": "PRICE", "toBeDiscounted": "8.99", "min": "10", "max": "", "forProducts": [], "onPurchase": [], "on": "value"},
    {"code": "YYGWKJD", "discountType": "PRICE", "toBeDiscounted": "89.99", "min": "1", "max": "", "forProducts": ["form"], "onPurchase": ["wf"], "on": "quantity"}
  ]

  it('it renders only selected product and quantity > 0' , () => {
    const products = [
      {"id": "wf", "name": "Workflow", "price": "$199.99", selected: true, quantity: 1, "totalPrice": 199.99},
      {"id": "docgen", "name": "Document Generation", "price": "$9.99"},
      {"id": "form", "name": "Form", "price": "$99.99"}
    ]
    const { getByTestId } =  render(<Summary products={products} promotions={promotions} />);
    const workflow_selected = getByTestId(`Workflow_selected`);
    expect(workflow_selected).toBeDefined()
  })

  it('it renders only selected product and quantity not greater than 0' , () => {
    const products = [
      {"id": "wf", "name": "Workflow", "price": "$199.99", selected: true, quantity: ''},
      {"id": "docgen", "name": "Document Generation", "price": "$9.99"},
      {"id": "form", "name": "Form", "price": "$99.99"}
    ]
    const { container } =  render(<Summary products={products} promotions={promotions} />);
    expect(container.innerText).toBeUndefined()
  })

  it('it displays Invalid coupon code if does not meets the coupon code criteria' , () => {
    const products = [
      {"id": "wf", "name": "Workflow", "price": "$199.99", selected: true, quantity: '1', "totalPrice": 199.99},
      {"id": "docgen", "name": "Document Generation", "price": "$9.99", selected: true, quantity: '1', "totalPrice": 9.99},
      {"id": "form", "name": "Form", "price": "$99.99"}
    ]
    const { getByTestId } =  render(<Summary products={products} promotions={promotions} />);
    fireEvent.change(getByTestId('promotionCode'), { target: { value: 'YYGWKJD' } });
    const error_block = getByTestId('couponError')
    expect(error_block).toBeDefined()
  })

  it('it hides Invalid coupon code error if meets the coupon code criteria' , () => {
    const products = [
      {"id": "wf", "name": "Workflow", "price": "$199.99", selected: true, quantity: '1', "totalPrice": 199.99},
      {"id": "docgen", "name": "Document Generation", "price": "$9.99", selected: true, quantity: '1', "totalPrice": 9.99},
      {"id": "form", "name": "Form", "price": "$99.99", selected: true, quantity: '1', "totalPrice": 99.99}
    ]
    const { container, getByTestId } =  render(<Summary products={products} promotions={promotions} />);
    fireEvent.change(getByTestId('promotionCode'), { target: { value: 'YYGWKJD' } });
    expect(container.innerText).toBeUndefined()
  })

})