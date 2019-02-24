import styled, { css } from "styled-components";
import { Column } from "./Grid";

export const Wrapper = styled.div`
    margin: 1em auto;
    padding: 20px;
    width: 80%;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
`

export const Form = styled.form`
  padding: 0 16px;
  font-size: 18px;
  font-weight: 600;
`

export const Input = styled.input`
  margin: 10px 0 0;
  width: 100%;
  padding: 10px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
  
  &::placeholder {
    color: #cdcdcd;
    opacity: 1;
    font-size:15px;
  }
`

export const SectionHeader = styled.h1`
  text-decoration: underline;
  font-size: 36px;
  margin: 0;
  padding: 14px;
`

export const InputCheckboxGroup = styled.div`

  background-color: #ECEFF1;
  display: block;
  margin: 10px 0;
  position: relative;

  label {
    padding: 12px 30px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3C454C;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
    

  &:before {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      content: '';
      background-color: #42A5F5;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale3d(1, 1, 1);
      transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: 0;
      z-index: -1;
    }

  &:after {
      width: 32px;
      height: 32px;
      content: '';
      border: 2px solid #D1D7DC;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: 2px 3px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    color: #fff;

    &:before {
        transform: translate(-50%, -50%) scale3d(56, 56, 1);
        opacity: 1;
      }
  
    &:after {
        background-color: #0D47A1;
        border-color: #0D47A1;
      }
  }

  input {
    width: 100%;
    height: 100%;
    order: 1;
    z-index: 4;
    position: absolute;
    top: 46%;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0;
  }
  
`

export const InputBlock = styled.div`
  display: block;
  margin: 10px 0;
  position: relative;
  
  input {
    width: 100%;
    padding: 12px 30px;
    font-size: 15px;
    color: #3C454C;
    text-align: center;
  }
`

export const HeadBanner = styled.div`
    background-color: #2874f0;
    color: #fff;
    width: 100%;
    border-bottom: Solid 8px #2875A2;
    h1 {
      margin: 0 11px 0px;
      font-size: 36px;
      padding: 10px;
    }
`
export const HighlightedRow = styled.div`
    clear: both;
    display: flex;
    font-weight: 300;
    color: blue;
    padding-top: 10px;
    font-style: italic;
    font-size: 15px;
`
export const ServiceMessage = styled.h1`
    text-align: center;
    padding: 30px;
    ${({ type }) => type === 'error' && css`
      background-color : #b00020;
      color: #fff;
    `}
    ${({type}) => type === 'fetching' && css`
      background-color : #BBDEFB;
      color: #fff;
    `}
`

export const Spinner = styled.div`
  
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  
  &&:after {
    content: " ";
    display: block;
    width: 10em;
    height: 10em;
    margin: 3em;
    border-radius: 50%;
    border: 5px solid blue;
    border-color: blue transparent blue transparent;
    animation: spin-animation 1.2s linear infinite;
    position: absolute;
    left: 44%;
  }
  
  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`
export const BorderColumn = styled(Column)`
  border-left: solid 1px #cdcdcd;
`

export const ContentBlock = styled.div`
    background: #e6f2ff;
    padding: 10px 20px;
    font-size: 15px;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 15px;
  font-family: Roboto,Arial,sans-serif;
  color: #212121;
  line-height: 1.4;
  
  ${({ last }) => last && css`
    border-top: 1px dashed #e0e0e0;
    margin-top: 0px;
    margin-bottom: 20px;
  `}
  
  span {
    
  }
`

export const Span = styled.span`

${({ title }) => title && css`
  display: block;
  text-align: center;
  text-transform: uppercase;
  padding: 13px 24px;
  font-weight: 500;
  font-size: 16px;
  color: #878787;
  min-height: 47px;
  border-radius: 2px 2px 0 0;
  border-bottom: solid 1px #cdcdcd;
`}

${({ error }) => error && css `
  font-weight: 100;
  font-size: 16px;
  color: red;
`}

`