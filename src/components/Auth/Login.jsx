import React, {useState} from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {FormWrapper, Title, SubmitButton, StyledLink, Input} from '../templates/common'
import {useAccountContext} from '../../context/account'
import api from '../../services/api'
import { propTypes } from 'react-currency-input'


const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  input{
      margin-bottom: 1.5rem;
  }
`

export function Login(props){
    
    const {accountState ,setAccountState} = useAccountContext()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    function handleSetEmail(email){
        setUserData({
            password: userData.password,
            email
        })
    }
    function handleSetPassword(password){
        setUserData({
            password,
            email: userData.email
        })
    }
    async function handleLogin(){
        await api.post("signin", userData)
            .then(res => loginSuccess(res.data))
            .catch(err => console.log(err))
    }

    async function loginSuccess(accountData){
        console.log('loginSuccess???????????')
        const accountId = accountData.id
        const accountBalance = accountData.balance
        const accountTransactions = await api.get(`transactions/${accountId}`)
            .then(transactions => transactions.data)

        console.log(accountBalance)
        console.log(accountTransactions)

        await setAccountState({
            listState: accountTransactions,
            balanceState: accountBalance
        })
        
        props.setPage("home")
    }   
    function loginFail(error){
        console.log(error)
    } 
    return (
        <AppWrapper>
            <FormWrapper>
                <Title>Access your account</Title>
                <div className="inputs-wrapper">

                    <Input type="e-mail" name="email" 
                        placeholder="Insert your e-mail"
                        value={userData.email}
                        onChange={e => handleSetEmail(e.target.value)}/>

                    <Input type="password" name="password" 
                        placeholder="Insert your password"
                        value={userData.password}
                        onChange={e => handleSetPassword(e.target.value)}/>
                </div>
                <SubmitButton onClick={()=>{handleLogin()}} defaultValue="Login" readOnly/>
                   
            </FormWrapper>
            <StyledLink onClick={()=>{props.setPage('signup')}}>
                Create an account
            </StyledLink>           
        </AppWrapper>
    )
}