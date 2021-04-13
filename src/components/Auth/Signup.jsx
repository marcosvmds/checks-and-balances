import React from 'react'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'

import api from '../../services/api'
import {FormWrapper, Title, SubmitButton, StyledLink, Input} from '../templates/common'

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

export function Signup(props){
    
    const { register, handleSubmit } = useForm()

    async function handleRegisterUser(newUserData){
        await api.post('signup', newUserData)
            .then(res => {
                console.log(res)
                registerSuccess(res.data)}) 
            .catch(err => {
                registerFail(err)})
    }
    function registerSuccess(msg){
        console.log("entrou no reg sucess?")
        alert(msg)
        props.setPage("login")
    }
    function registerFail(err){
        console.log("entrou no reg fail?")
        alert(err.response.data)
    }
    return (
        <AppWrapper>
            <FormWrapper onSubmit={handleSubmit(handleRegisterUser)}>
                <Title>Create account</Title>
                <div className="inputs-wrapper">
                    <Input name="name" ref={register} type="text" 
                        placeholder="Insert your name" required/>
                    <Input name="email" ref={register} type="e-mail" 
                        placeholder="Insert your e-mail" required/>
                    <Input name="password" ref={register} type="password" 
                        placeholder="Insert your password" required/>
                    <Input name="passwordConfirm" ref={register} type="password" 
                        placeholder="Repeat password" required/>
                </div>
                <SubmitButton type="submit" defaultValue="Register"/>
            </FormWrapper>
            <StyledLink onClick={()=> props.setPage("login")}>
                Already have an account
            </StyledLink>   
        </AppWrapper>
    )
}