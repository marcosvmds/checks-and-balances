import React, {useState} from 'react'
import styled from 'styled-components'
import data from '../../data/dados.json'

import Header from '../components/Header'
import Operation from '../components/Operation'
import Transactions from '../components/Transactions'

export default function Main(){ 

  const inicialBalance = data.saldo
  const inicialList = [...data.transacoes]

  const [balanceState, setBalanceState] = useState(inicialBalance)
  const [listState, setListState] = useState(inicialList)
  
  function handleChangeBalance(value, type){
    if(type == 'DEPOSITO') setBalanceState(balanceState+Number(value))
    else setBalanceState(balanceState-Number(value))  
  }
  function handleChangeList(newTransaction){
    setListState([...listState, newTransaction])
  }
  function valueFormater(value){
    return new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }
  return (
    <AppWrapper className="app">
      <Header balance={valueFormater(balanceState)}/>
      <Manager>
        <Operation 
            changeBalance={handleChangeBalance}
            changeList={handleChangeList}
            balance={balanceState}
        />
        <Transactions transactionsData={listState}/>
      </Manager>
    </AppWrapper>
  )
}
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
@media(max-width: 720px){
  width: 90%;
  flex-direction: column;
  align-items: center;
}
`