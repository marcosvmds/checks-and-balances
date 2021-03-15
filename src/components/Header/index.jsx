import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';


const Title = styled.header`
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    text-align: center;
    height: 20vh;
    margin-bottom: 1rem;
`
const MainTitle = styled.h1`
    margin-bottom:0;
    font-size: 2.5rem;
    font-weight: 400;
`
const SubTitle = styled.h2`
    color: #969696;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 2rem;
` 
export default function Header(props){
    return(
      <Title>
        <MainTitle>Checks and Balances</MainTitle>
        <SubTitle>Your current balance is {props.balance}</SubTitle>
      </Title>
    )   
}



