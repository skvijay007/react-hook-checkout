import styled from "styled-components";

const derivedWidth = (unit) => {
  if(!unit) return;
  const width = unit / 12 * 100;
  return `width : ${width}%;`;
}

export const Grid = styled.div`
  @media only screen and (min-width : 48em) {
    width: 46rem;
  }
  
  @media only screen and (min-width : 62em) {
    width: 61rem;
  }
  
  @media only screen and (min-width : 75em) {
    width: 76rem;
  }
 
`

export const Row = styled.div`
    clear: both;
    display: flex;
`

export const Column = styled.div`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  min-height: 1px;
  
  ${({ xs }) => xs ? derivedWidth(xs) : "width: 100%"};
  
  @media only screen and (min-width : 48em) {
    ${({ sm }) => sm && derivedWidth(sm)};
  }
  
  @media only screen and (min-width : 62em) {
    ${({ md }) => md && derivedWidth(md)};
  }
  
  @media only screen and (min-width : 75em) {
    ${({ lg }) => lg && derivedWidth(lg)};
  }
`