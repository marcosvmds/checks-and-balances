import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {useForm} from 'react-hook-form'

import {FormWrapper, Title, SubmitButton, StyledLink, Input} from '../components/templates/common'

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export default function Login(){
    return (
        <AppWrapper>
            <FormWrapper>
                <Title>Access your account</Title>
                <div class="inputs-wrapper">
                    <Input type="e-mail" placeholder="Insert your e-mail" style={{marginBottom:"1rem"}}/>
                    <Input type="password" placeholder="Insert your password"/>
                </div>
                <SubmitButton type="submit" value="Login"/>
            </FormWrapper>
            <Link href="/Home">
                <StyledLink>Create an account</StyledLink>
            </Link>           
        </AppWrapper>
    )
}