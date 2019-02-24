import React from 'react';
import { Grid, Row, Column } from '../styles/Grid'
import { Wrapper, SectionHeader, InputCheckboxGroup, InputBlock } from '../styles/styles';

const ProductsList = ({ products, selectionCallback, updateQuantityCallback }) => {
  return (
    <Wrapper>
      <Grid data-testid='productLists'>
        <Row>
          <SectionHeader>Choose products</SectionHeader>
        </Row>
        {products && products.length > 0 && products.map((item, index) =>
          <Row key={index}>
            <Column xs={12} md={4}>
              <InputCheckboxGroup className='product' >
                <input id={item.id} data-testid={item.name} name={item.name} type="checkbox" onChange={()=>selectionCallback(index)} />
                <label htmlFor={item.name}>{item.name}</label>
              </InputCheckboxGroup>
            </Column>
            <Column xs={12} md={2}>
              {item.selected &&
                <InputBlock className='quantity' >
                  <input type="number" min='0' data-testid={`${item.name}_quantity`} placeholder='Enter quantity' name="quantity" onChange={(e)=>updateQuantityCallback(e, index)} />
                </InputBlock>
              }
            </Column>
          </Row>
        )}
      </Grid>
    </Wrapper>
  )
}


export default ProductsList