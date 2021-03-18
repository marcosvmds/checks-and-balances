import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'

import Type from './Type.jsx'
import Description from './Description.jsx'
import Amount from './Amount.jsx'

import {toNumeric, todayMilli} from './utils.js'

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
export default function Operation(props){

  const {register, handleSubmit} = useForm()
  const [valueState, setValueState] = useState('')

  function handleNewTransaction(type, desc, date, value){ 
    if(value<=0){
      alert('Quantia inválida')
      return
    }
    if(type=='SAQUE' && props.balance<value){
      alert('Seu saldo é insuficiente para realizar esta transação')
      return
    }
    const newTrans = {
      "tipo": type,
      "valor": value,
      "descricao": desc,
      "atualizadoEm": date
    }
    props.changeList(newTrans)
    props.changeBalance(value, type)
  }
  function changeValueByClick(type){
    const numericValue = Number(toNumeric(valueState))
    const addVal = (numericValue+10).toString().replace('.',',')
    const subVal = (numericValue-10).toString().replace('.',',')
    if(type=='sub' && numericValue>=10) setValueState('R$'+subVal)
    if(type=='add') setValueState('R$'+addVal) 
  }
  function handleChangeValue(e, maskedvalue, floatvalue){
    setValueState(maskedvalue) 
  }
  function submitTransaction(register){
    handleNewTransaction(register.type, register.description, todayMilli(), toNumeric(valueState))
  }
  return(
    <OperationForm onSubmit={handleSubmit(submitTransaction)}>
        <Title>New transaction</Title>
        <Amount register={register} 
          balance={props.balance}
          valueState={valueState}
          changeValue={handleChangeValue}
          changeValueByClick={changeValueByClick}
        />    
        <Description register={register}/>
        <Type register={register}/>
        <SubmitButton type="submit" id="trans-submit" value="Register"/>
    </OperationForm>
  )
}
