import React, { useState, useEffect, useRef } from 'react';
import { Grid, Row, Column } from '../styles/Grid'
import { Wrapper, SectionHeader, HighlightedRow, BorderColumn, Input, ContentBlock, Content, Span } from '../styles/styles';

const Summary = ({ products, promotions }) => {

  const [discountPrice, setDiscountPrice] = useState('$0')
  const [invalidCoupon, setInvalidCoupon] = useState(false)
  const inputEl = useRef(null);

  useEffect(()=>{
    if(inputEl.current && inputEl.current.value !== ""){
      checkPromotionCode(inputEl)
    }
  }, [products])

  // To get array of all selected products ID
  const getSelectedProducts = () => {
    let selectedArray = []
    products.forEach((item)=>{
      if(item.quantity  && item.quantity > 0) selectedArray.push(item.id)
    })
    return selectedArray
  }

  // To check validity of promotion code and calculate the discount on overall price
  const checkPromotionCode = (e) => {
    let inputValue
    if(e.target && e.target.value){
      inputValue = e.target.value
    }
    if(e.current && e.current.value){
      inputValue = e.current.value
    }
    setInvalidCoupon(false)
    setDiscountPrice('$0')
    const selectedProducts = getSelectedProducts()
    const totalPriceValue = parseFloat(getAllProductsTotalPrice().replace(/[$,]/g,''))
    if (inputValue && inputValue.length > 0) {
      const selectedPromotion = promotions.filter(promo => promo.code && promo.code.toUpperCase() === inputValue.toUpperCase())
      if (selectedPromotion && selectedPromotion.length > 0) {
        const filteredPromo = selectedPromotion[0]
        const min = parseFloat(filteredPromo['min'].replace(/[$,]/g,''))
        if (filteredPromo['forProducts'] &&
          filteredPromo['forProducts'].length > 0) {
          if(filteredPromo['forProducts'].some(r => selectedProducts.includes(r))){
            if (filteredPromo['onPurchase'] &&
              filteredPromo['onPurchase'].length > 0) {
              const hasPurchased = products.filter( prod => {
                if (prod['on'] === 'quantity') {
                  return filteredPromo['onPurchase'].indexOf(prod.id) !== -1 && prod.quantity >= min && prod.selected
                } else {
                  return filteredPromo['onPurchase'].indexOf(prod.id) !== -1 && totalPriceValue >= min && prod.selected
                }
              })
              if(hasPurchased.length > 0){
                if(totalPriceValue >= min){
                  calculateDiscountedPrice(filteredPromo)
                }
              }else{
                setInvalidCoupon(true)
              }
            } else {
              if(totalPriceValue >= min) {
                calculateDiscountedPrice(filteredPromo)
              }else{
                setInvalidCoupon(true)
              }
            }
          } else {
            setInvalidCoupon(true)
          }
        } else {
          if(totalPriceValue >= min) {
            calculateDiscountedPrice(filteredPromo)
          }else{
            setInvalidCoupon(true)
          }
        }
      }else{
        setDiscountPrice('$0')
        setInvalidCoupon(true)
      }
    }
  }

  // helper function to get discounted price
  const calculateDiscountedPrice = (filteredPromo) => {
    const { discountType, toBeDiscounted } = filteredPromo
    const total = getAllProductsTotalPrice()
    let discountPrice

    const totalAmount = parseFloat(total.replace(/[$,]/g,''))
    const discountAmount = parseFloat(toBeDiscounted.replace(/[$,]/g,''))

    if (discountType === 'PRICE') {
      discountPrice = `$${discountAmount}`
    } else {
      discountPrice = `$${(totalAmount * discountAmount / 100).toFixed(2)}`
    }
    setDiscountPrice(discountPrice)
    return discountPrice
  }

  // To calculate the overall price all products selected
  const getAllProductsTotalPrice = () => {
    let calculatedPrice
    if(products){
      const sumPrice = products.reduce((sum, record) => {
        if (record.quantity && parseInt(record.quantity) > 0) {
          return sum + (parseFloat(record['price'].replace(/[$,]/g,'')) * record['quantity'])
        }
        return sum
      }, 0);
      calculatedPrice = `$${sumPrice.toFixed(2)}`
    }
    return calculatedPrice
  }

  return (
    <Wrapper>
      <Grid>
        <Row>
          <SectionHeader>Price details</SectionHeader>
        </Row>
        <Row>
          <Column className='productsSelected' xs={12} md={6}>
              <Row>
                <Column md={4}>Product name</Column>
                <Column md={2}>Quantity</Column>
                <Column md={3}>Unit price</Column>
                <Column md={3}>Total</Column>
              </Row>
              {products && products.map((item, index) => {
                  const {name, quantity, price, selected, totalPrice} = item
                  return (selected && quantity > 0) ?
                    <HighlightedRow data-testid={`${name}_selected`} key={index}>
                      <Column md={4}>{name}</Column>
                      <Column md={2}>{quantity}</Column>
                      <Column md={3}>{price}</Column>
                      <Column md={3}>{`$${totalPrice.toFixed(2)}`}</Column>
                    </HighlightedRow>
                  : null
                }
              )}
          </Column>
          <BorderColumn className='priceDetails' xs={12} md={6}>
              <Row>
                <Column md={8}>
                  <Input type="text" ref={inputEl} data-testid='promotionCode' placeholder="Enter promotion code" onChange={(e)=>checkPromotionCode(e)} />
                  {invalidCoupon &&
                  <Span error={'true'} data-testid='couponError'>Invalid promotion code</Span>}
                </Column>
              </Row>
              <Row>
                <Column md={8}>
                  <ContentBlock>
                    <Span title={'true'}>overall</Span>
                    <Content>Total price <span>{getAllProductsTotalPrice()}</span></Content>
                    <Content>Discount <span>{discountPrice}</span></Content>
                    <Content last>Amount payable <span>{getAllProductsTotalPrice() ? `$${(parseFloat(getAllProductsTotalPrice().replace(/[$,]/g,'')) - parseFloat(discountPrice.replace(/[$,]/g,''))).toFixed(2)}` : '$0'}</span></Content>
                  </ContentBlock>
                </Column>
              </Row>
          </BorderColumn>
        </Row>
      </Grid>
    </Wrapper>
  )
}

export default Summary