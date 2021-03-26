import React from 'react'
import Home from '../components/Home'

export async function getStaticProps() {

	console.log("INDEX Pegando static props")

	const getTransactions = await fetch('http://localhost:3001/transactions')
	const transactionsData = await getTransactions.json()
	console.log("Got transactions data")

	const getBalance = await fetch(`http://localhost:3001/accounts/1`)
	const balanceData = await getBalance.json()
	console.log("Got balance data")

	return {
		props: { 
			transactionsFromDB: transactionsData, 
			balanceFromDB: balanceData.balance
		}
	}
}

export default function index({transactionsFromDB, balanceFromDB}){
	return(
			<Home 
				transactionsFromDB={transactionsFromDB}
				balanceFromDB={balanceFromDB}
			/>
	) 
}