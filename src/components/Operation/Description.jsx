import React from 'react'
import styled from 'styled-components'

const DescriptionWrapper = styled.input`
    width: 100%;
    font-size: 1.6rem;
    padding: 0.5rem;
`

export default function Description(props){
    return(
        <DescriptionWrapper id="description" type="text" name="description" 
            placeholder="Insert description"  maxLength="35" ref={props.register}/>
    )
}