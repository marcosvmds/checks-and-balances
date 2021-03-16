import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';


const Title = styled.header`
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    text-align: center;
    height: 15vh;
    margin-bottom: 4rem;
`
const MainTitle = styled.h1`
    margin-bottom:0;
    font-size: 4rem;
    font-weight: 400;
    
`
const SubTitle = styled.h2`
    color: #969696;
    font-size: 1.8rem;
    font-weight: 500;
    margin:0;
` 
export default function Header(props){
    return(
      <Title>
        <MainTitle>Checks and Balances</MainTitle>
        <SubTitle>Your current balance is {props.balance}</SubTitle>
      </Title>
    )   
}



