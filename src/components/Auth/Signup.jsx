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

    function handleRegisterUser(newUserData){
        api.post('signup', newUserData)
            .then(registerSuccess)
            .catch(err => console.log(err))
    }
    function registerSuccess(res){
        console.log(res)
        props.setPage("login")
    }
    function handleRegisterUse(data){
        console.log(data)
    }
    return (
        <AppWrapper>
            <FormWrapper onSubmit={handleSubmit(handleRegisterUser)}>
                <Title>Create account</Title>
                <div className="inputs-wrapper">
                    <Input name="name" ref={register} type="text" 
                        placeholder="Insert your name" />
                    <Input name="email" ref={register} type="e-mail" 
                        placeholder="Insert your e-mail" />
                    <Input name="password" ref={register} type="password" 
                        placeholder="Insert your password" />
                    <Input name="passwordConfirm" ref={register} type="password" 
                        placeholder="Repeat password" />
                </div>
                <SubmitButton type="submit" defaultValue="Register"/>
            </FormWrapper>
            <StyledLink onClick={()=> props.setPage("login")}>
                Already have an account
            </StyledLink>   
        </AppWrapper>
    )
}