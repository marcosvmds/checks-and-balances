import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import ReactDom from 'react-dom'
import styled from 'styled-components'

import CurrencyInput from 'react-currency-input';


const OperationForm = styled.form` 
  width:42%;
  height: 400px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: solid 1px black;
  padding: 0 1.5rem 1.5rem 1.5rem;
  #trans-value{
    display: flex;
    flex-direction: row;
  }
`
const Title = styled.h3`
  color: #666666;
  font-weight:400;
  text-transform: uppercase;
`
const ValueInput = styled.div`
  justify-content: space-evenly;
  align-items:center;
  width: 80%;
  input{
    width:60%;
    font-size:1.2rem;
    padding:0.8rem;
  }
`
const AmountButton = styled.div`
    border-radius: 50%;
    width: 2.5rem;
    line-height: 2.5rem;
    font-size: 2rem;
    text-align:center;
    border: solid 1.5px black;
    cursor: pointer;
`
const DescriptionInput = styled.input`
    width: 100%;
    font-size: 1.2rem;
    padding: 0.5rem;
`
const TypeInput = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: flex-start;
    width: 35%;
    color: #666666;
    input{
      margin-right: 1rem
    }
`
const SubmitButton = styled.input`
    width:50%;
    align-self: flex-start;
    font-size: 1.2rem;
    color: #666666;
    padding: 0.5rem 0.3rem;
    border: 1px solid #969696;
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
    const original = floatvalue
    setValueState(maskedvalue) 
  }
  function submitTransaction(register){
    handleNewTransaction(register.type, register.description, Date.now(), toNumeric(valueState))
  }
  function toNumeric(value){
      return value.replace(/[\.]/g,'').replace(',','.').slice(2)
  }
  return(
    <OperationForm onSubmit={handleSubmit(submitTransaction)}>
        <Title>New transaction</Title>
        <ValueInput id="trans-value" className="form-group">
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
        </ValueInput>
        <DescriptionInput id="description" type="text" name="description" 
            placeholder="Insert description" ref={register}/>
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
