import React, {memo, useState, useEffect} from 'react'
import styled from 'styled-components'
import { useCookies } from "react-cookie"

import {FormWrapper, Title, SubmitButton, StyledLink, Input} from '../templates/common'
import {useAccountContext} from '../../context/account'
import api from '../../services/api'

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
function Login(props){

    console.log("LOGIN PAGE>>>")

    const {userTokenCookie, setAccountState} = useAccountContext()
    const [cookies, setCookie] = useCookies([userTokenCookie])

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
            .catch(err => loginFail(err.response.data))
    }

    function loginSuccess(accountData){
        //accountData = {payload, token, transactions}
        console.log('loginSuccess')

        const token = accountData.token

        const payload = accountData.payload
        const accountTransactions = accountData.transactions

        const accountId = payload.id
        const accountBalance = payload.balance
        const userEmail = payload.sub

        api.defaults.headers.common['Authorization'] = `bearer ${token}`

        setCookie(userTokenCookie, JSON.stringify({token, payload}), {
            path: "/",
            sameSite: true
        })

        console.log("antes de setar acc state")

        setAccountState({
            accountId,
            listState: accountTransactions,
            balanceState: accountBalance
        })

        console.log("setou acc state")
        props.setPage("home")
    }   

    function loginFail(err){
        console.log("login error")
        alert(err)
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

export default memo(Login)

