import React from 'react'
import styled from 'styled-components';

const Title = styled.header`
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    text-align: center;
    height: 15vh;
    margin-bottom: 4rem;

    @media (max-width: 365px){
      margin-bottom: 2.5rem;
    }
`
const MainTitle = styled.h1`
    margin-bottom:0;
    font-size: 4rem;
    font-weight: 400;

    @media (max-width: 365px){
      font-size: 3rem;
    }
    
`
const SubTitle = styled.h2`
    color: #969696;
    font-size: 1.8rem;
    font-weight: 500;
    margin:0;

    @media (max-width: 365px){
      font-size: 1.3rem;
    }
` 
export default function Header(props){
    return(
      <Title>
        <MainTitle>Checks and Balances</MainTitle>
        <SubTitle>Your current balance is {props.balance}</SubTitle>
      </Title>
    )   
}



