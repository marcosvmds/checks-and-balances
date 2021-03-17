import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import moment from 'moment'

import CurrencyInput from 'react-currency-input';


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
const AmountArea = styled.div`
  justify-content: space-between;
  align-items:center;
  width: 100%;
  max-width: 25rem;
  input{
    max-width: 15rem;
    font-size:1.6rem;
    padding:1rem;

    @media(max-width: 320px){
      width: 12rem;
  }
  }
  
`
const AmountButton = styled.div`
    border-radius: 50%;
    width: 3.5rem;
    line-height: 3.5rem;
    text-align:center;
    font-size: 2.8rem;
    font-weight: 200;
    border: solid 0.15rem black;
    cursor: pointer;

    @media(max-width: 320px){
      width: 3rem;
      line-height: 3rem;
    }
`
const DescriptionInput = styled.input`
    width: 100%;
    font-size: 1.6rem;
    padding: 0.5rem;
`
const TypeInput = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: flex-start;
    font-size: 1.5rem;
    color: #666666;
    line-height: 3rem;
    input{
      margin-right: 1.5rem
    }
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
  function toNumeric(value){
      return value.replace(/[\.]/g,'').replace(',','.').slice(2)
  }
  function todayMilli(){
    return Date.parse((moment().format('YYYY-MM-DD'))+'T00:00:00')
  }
  return(
    <OperationForm onSubmit={handleSubmit(submitTransaction)}>
        <Title>New transaction</Title>
        <AmountArea id="trans-value" className="form-group">
            <AmountButton id="value-button" onClick={()=>changeValueByClick('add')}>+</AmountButton>  
            <CurrencyInput name='value'
              ref={register}
              prefix='R$' 
              thousandSeparator='.' 
              decimalSeparator=','
              value={valueState}
              onChangeEvent={handleChangeValue}
            />
            <AmountButton id="value-button" onClick={()=>changeValueByClick('sub')}>-</AmountButton>
        </AmountArea>
        <DescriptionInput id="description" type="text" name="description" 
            placeholder="Insert description"  maxLength="40" ref={register}/>
        <TypeInput id="trans-type" className="form-group">
            <div className="type-input">
                <input type="radio" id="deposit" name="type" value="DEPOSITO"
                  ref={register} defaultChecked/>
                <label htmlFor="deposit">Deposit</label><br/>
            </div>
            <div className="type-input">
                <input type="radio" id="withdraw " name="type" value="SAQUE"
                  ref={register}/>
                <label htmlFor="withdraw">Withdraw</label><br/>
            </div>
        </TypeInput>
        <SubmitButton type="submit" id="trans-submit" value="Register"/>

    </OperationForm>
  )
}
