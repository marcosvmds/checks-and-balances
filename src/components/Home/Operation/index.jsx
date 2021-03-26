import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import moment from 'moment'

import Type from './Type.jsx'
import Description from './Description.jsx'
import Amount from './Amount.jsx'

import api from '../../../services/api'
import {useAccountContext} from '../../../context/account'
import {toNumeric} from './utils.js'

const OperationForm = styled.form` 
	width:42%;
	height: 40rem;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	border: solid 1px black;
	padding: 0 3.5rem 2rem 3.5rem;
	margin-bottom: 4rem;
	#trans-value{
		display: flex;
		flex-direction: row;
	}
	@media (max-width: 850px){
		padding: 0 2.5rem 2rem 2.5rem;
	}
	@media(max-width: 720px){
		width: 100%;
		max-width: 40rem;
	}
	@media(max-width: 320px){
		width: 100%;
		max-width: 40rem;
	}
`
const Title = styled.h3`
	color: #666666;
	font-size: 1.5rem;
	font-weight:500;
	text-transform: uppercase;
`
const SubmitButton = styled.input`
    width:45%;
    align-self: flex-start;
    font-size: 1.7rem;
    color: #666666;
    padding: 0.6rem 0.4rem;
    border: 1.5px solid #969696;
    background-color:white;
`
export default function Operation() {

	console.log('OPERATION/>')
	
	const { accountState, setAccountState } = useAccountContext()

	const { register, handleSubmit } = useForm()
	const [amountState, setAmountState] = useState('')

	function handleChangeAccountState(newTransactionObj){

		console.log('OPERATION Setting new account state... (handleChangeAccountState)')
		const newBalanceState = Number(accountState.balanceState) + Number(newTransactionObj.amount)
		const newListState = [...accountState.listState, newTransactionObj]
		setAccountState((()=>{
				return {
					balanceState: newBalanceState,
					listState: newListState
				}
			})()	
		)
		console.log('OPERATION Account states updated... (handleChangeAccountState)')
	}

	async function handleNewTransaction(type, desc, date, amount){
		console.log('OPERATION (handleNewTransaction)...')
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
			"userId": 1,
			"type": type,
			"amount": Number(amount),
			"description": desc,
			"date": date
		}	
		await api.post('transactions', newTrans)
			.then(res=>{
				console.log("OPERATION New transaction sucessfully send to DB API... (handleNewTransaction)")
				handleChangeAccountState(newTrans)
			})
			.catch(err=>console.log(err))	
	}
	function changeValueByClick(type) {
		const numericValue = Number(toNumeric(amountState))
		const addVal = (numericValue + 10).toString().replace('.', ',')
		const subVal = (numericValue - 10).toString().replace('.', ',')
		if (type == 'sub' && numericValue >= 10) setAmountState('R$' + subVal)
		if (type == 'add') setAmountState('R$' + addVal)
	}
	function handleChangeValue(event, maskedvalue, floatvalue) {
		setAmountState(maskedvalue)
	}
	async function submitTransaction(register) {
		console.log('OPERATION New transaction form submit... (submitTransaction)')
		await handleNewTransaction(
			register.type, 
			register.description, 
			moment().format('YYYY-MM-DD'), 
			toNumeric(amountState)
		)
	}
	return (
		<OperationForm onSubmit={handleSubmit(submitTransaction)}>
			<Title>New transaction</Title>
			<Amount 
				register={register}
				amountState={amountState}
				changeValue={handleChangeValue}
				changeValueByClick={changeValueByClick}
			/>
			<Description register={register} />
			<Type register={register} />
			<SubmitButton type="submit" id="trans-submit" value="Register" />
		</OperationForm>
	)
}
