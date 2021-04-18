import React from 'react'
import styled from 'styled-components';
import {useAccountContext} from '../../../context/account'
import {StyledLink} from '../../templates/common'

import api from '../../../services/api'
import { useCookies } from "react-cookie"

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
    margin:0 0 1rem;

    @media (max-width: 365px){
      font-size: 1.3rem;
    }
` 
function toBrlCurrency(value){
	return new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function Header(props){
	const {accountState, userTokenCookie} = useAccountContext()
  	console.log("HEADER/>")
	const formatedBalance = toBrlCurrency(accountState.balanceState)
	const [cookies, removeCookie] = useCookies()

  function handleLogout(){
	api.defaults.headers.common['Authorization'] = ""
	removeCookie(userTokenCookie)
	props.setPage("login")
  }

    return(
		<Title>
			<MainTitle>Checks and Balances</MainTitle>
			<SubTitle>Your current balance is {formatedBalance}</SubTitle>
        	<StyledLink onClick={()=>handleLogout()}>Logout</StyledLink>
      </Title>
		
    )   
}



