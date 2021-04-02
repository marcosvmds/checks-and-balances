import React, {useState} from 'react'
import styled from 'styled-components'

import Header from '../components/Home/Header'
import Operation from '../components/Home/Operation'
import Transactions from '../components/Home/Transactions'
import {AccountContext} from '../context/account'

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

export async function getStaticProps() {

	console.log("INDEX Pegando static props")

	const accountId = 1

	const getTransactionsByAccount = await fetch(`http://localhost:3001/transactions/${accountId}`)
	const transactionsData = await getTransactionsByAccount.json()
	console.log("Got transactions data")

	const getBalance = await fetch(`http://localhost:3001/accounts/${accountId}`)
	const balanceData = await getBalance.json()
	console.log("Got balance data")

	return {
		props: { 
			transactionsFromDB: transactionsData, 
			balanceFromDB: balanceData.balance,
			accountId: accountId
		}
	}
}

export default function Home({transactionsFromDB, balanceFromDB, accountId}){ 
	console.log(accountId+"?????????")
	console.log('HOME/>')
	
  	const AccountStateProvider = (props) => {
		const accId = accountId
		const [accountState, setAccountState] = useState({
			listState: transactionsFromDB,
			balanceState: balanceFromDB
		})	

		console.log("HOME ->> ACCOUNT ID: "+accId)
		return(
			<AccountContext.Provider 
				value={{accId, accountState, setAccountState}}>
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


