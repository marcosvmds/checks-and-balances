import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import moment from 'moment'

import Type from './Type.jsx'
import Description from './Description.jsx'
import Amount from './Amount.jsx'

import api from '../../../services/api'
import {useAccountContext} from '../../../context/account'
import {toNumeric} from './utils.js'

import {FormWrapper, Title, SubmitButton} from '../../templates/common'

export default function Operation(props) {
	console.log('OPERATION/>')
	
	const {accountState, setAccountState} = useAccountContext()
	const { register, handleSubmit } = useForm()
	const [amountState, setAmountState] = useState('')

	function handleChangeAmountByClick(type) {
		const numericValue = Number(toNumeric(amountState))
		const addVal = (numericValue + 10).toString().replace('.', ',')
		const subVal = (numericValue - 10).toString().replace('.', ',')
		if (type == 'sub' && numericValue >= 10) setAmountState('R$' + subVal)
		if (type == 'add') setAmountState('R$' + addVal)
	}
	function handleChangeAmount(event, maskedvalue, floatvalue) {
		console.log(maskedvalue)
		setAmountState(maskedvalue)
	}
	async function handleSubmitTransaction(register) {
		console.log('OPERATION New transaction form submit... (handleSubmitTransaction)')
		await newTransaction(
			register.type, 
			register.description, 
			moment().format('YYYY-MM-DD'), 
			toNumeric(amountState)
		)
	}
	async function newTransaction(type, desc, date, amount){
		
		console.log('OPERATION (newTransaction)...')
		if (amount <= 0) {
			alert('Invalid amount')
			return
		}
		if (type == 'withdraw'){
			if(accountState.balanceState < amount){
				alert('Insuficient balance')
				return
			} else {
				amount*=(-1)
			}  
		}
		const newTrans = {
			"accountId": accountState.accountId,
			"type": type,
			"amount": Number(amount),
			"description": desc,
			"date": date
		}	
		const newBal = Number(accountState.balanceState) + Number(newTrans.amount)
		
		updateDataBase(newTrans, newBal)
	}
	async function updateDataBase(newTransaction, newBalance){
		try{
			await api.post('transactions', newTransaction)
				.then(res=>{
					console.log("OPERATION New transaction sucessfully regitered in DB API... (newTransaction)")
				})

			await api.patch(`accounts/${accountState.accountId}`, {balance: newBalance})
				.then(res=>{
					console.log("OPERATION New balance sucessfully updated in DB API... (newTransaction)")
				})
			updateAppState(newTransaction, newBalance)
		}
		catch(err){
			alert("Please signin again")
			props.setPage("login")
		}
	}
	function updateAppState(newTransactionObj, newBalanceState){

		console.log('OPERATION Setting new account state... (updateAppState)')
		const newListState = [...accountState.listState, newTransactionObj]
		
		setAccountState((()=>{
				return {
					...accountState,
					balanceState: newBalanceState,
					listState: newListState
				}
			})()	
		)
		console.log('OPERATION Account states updated... (updateAppState)')
	}
	
	
	return (
		<FormWrapper onSubmit={handleSubmit(handleSubmitTransaction)}>
			<Title>New transaction</Title>
			<Amount 
				register={register}
				amountState={amountState}
				changeAmount={handleChangeAmount}
				handleChangeAmountByClick={handleChangeAmountByClick}
			/>
			<Description register={register} />
			<Type register={register} />
			<SubmitButton 
				type="submit" 
				id="trans-submit" 
				defaultValue="Register" 
				style={{alignSelf: "flex-start"}} 
			/>
		</FormWrapper>
	)
}
