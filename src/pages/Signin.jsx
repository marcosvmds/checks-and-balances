import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {FormWrapper, Title, SubmitButton, StyledLink, Input} from '../components/templates/common'

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


export default function Login(){
    return (
        <AppWrapper>
            <FormWrapper>
                <Title>Create account</Title>
                <div class="inputs-wrapper">
                    <Input type="text" placeholder="Insert your name"/>
                    <Input type="e-mail" placeholder="Insert your e-mail"/>
                    <Input type="password" placeholder="Insert your password"/>
                    <Input type="password" placeholder="Repeat password"/>
                </div>
                <SubmitButton type="submit" value="Register"/>
            </FormWrapper>
            <Link href="/Login">
                <StyledLink>Already have an account</StyledLink>
            </Link>           
        </AppWrapper>
    )
}