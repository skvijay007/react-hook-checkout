import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, HeadBanner, ServiceMessage, Spinner } from '../styles/styles';
import ProductsList from '../containers/ProductsList';
import Summary from '../containers/Summary';


const Checkout = props => {
  const [products, setProducts] = useState();
  const [promotions, setPromotions] = useState();

  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)

  // Function to fetch products and promotions
  const fetchData = async () => {
    try {
      setFetching(true)
      const prodResult = await axios('fixtures/products.json');
      setProducts(prodResult.data);
      const promResult = await axios('fixtures/promotions.json');
      setPromotions(promResult.data);
    }catch(err) {
      setError(true)
    }
    finally {
      setTimeout(()=>{
        setFetching(false)
      },500)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Callback function to update the product with selected flag or reset the selection along with quantity and total price if deselected
  const selectionCallback = useCallback(
    (index) => {
      const updatedProducts =
        products.map((item, itemIndex) => {
          if (itemIndex === index) {
            return {
              ...item,
              selected: !item.selected,
              quantity: '',
              totalPrice: '',
            };
          }
          return item
      })
      setProducts(updatedProducts)
    }, [products]
  )

  // Callback function to update the product with quantity and total price
  const updateQuantityCallback = useCallback(
    (e, index) => {
    const quantity =  e.target.value
    const updatedProducts =
        products.map((item, itemIndex) => {
          if (itemIndex === index) {
            return {
              ...item,
              quantity: quantity,
              totalPrice: quantity * parseFloat(item['price'].replace(/[$,]/g,''))
            };
          }
          return item
        })
      setProducts(updatedProducts)
    }, [products]
  )

  return (
    <>
      <HeadBanner data-testid='headBanner'><h1>Checkout</h1></HeadBanner>
      {error && <ServiceMessage data-testid='errorMessage' type={'error'}>Error with service, please refresh the page</ServiceMessage>}
      {fetching ? <Spinner /> :
      <Form>
        <ProductsList products={products} selectionCallback={selectionCallback} updateQuantityCallback={updateQuantityCallback} />
        <Summary products={products} promotions={promotions} />
      </Form>}
    </>
  )
}

export default Checkout