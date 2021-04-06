import React, {useState} from 'react'
import styled from 'styled-components'

import Header from './Header'
import Operation from './Operation'
import Transactions from './Transactions'

import {useAccountContext} from '../../context/account'



const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

`
const Manager = styled.div`
  width: 70%;
  height: auto;
  display:flex;
  flex-direction: row;
  justify-content: space-between;

  @media(max-width: 1200px){
    width: 85%;
  }
  @media(max-width: 1080px){
    width: 90%;
  }
  @media(max-width: 720px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
  }
`

export default function Home(){ 
  const {accountState} = useAccountContext()
	console.log('HOME/>')
  console.log(accountState)
  	return (
		<AppWrapper className="app">
				<Header/>
				<Manager>
					<Operation/>
					<Transactions/>
				</Manager>
		</AppWrapper>
  	)
}


