import React, {useState} from 'react'
import styled from 'styled-components'

import Header from './Header'
import Operation from './Operation'
import Transactions from './Transactions'
import {AccountContext} from '../../context/account'

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

export default function Home({transactionsFromDB, balanceFromDB}){ 

	console.log('HOME/>')
	
  	const AccountStateProvider = (props) => {

		const [accountState, setAccountState] = useState({
			listState: transactionsFromDB,
			balanceState: balanceFromDB
		})	
		
		return(
			<AccountContext.Provider 
				value={{accountState, setAccountState}}>
				{props.children}
			</AccountContext.Provider>
		)
	}
  
  	return (
		<AppWrapper className="app">
			<AccountStateProvider>
				<Header/>
				<Manager>
					<Operation/>
					<Transactions/>
				</Manager>
			</AccountStateProvider>
		</AppWrapper>
  	)
}


