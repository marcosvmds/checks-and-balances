import React from 'react'
import styled from 'styled-components';

const DescriptionInput = styled.input`
    
    font-size: 1.2rem;
    height:2.5rem;
`
export default function DescFilter(props){
    return(
        <DescriptionInput id="description-filter" type="text" placeholder="Description"
                onChange={props.setDescription} value={props.description}/>
    )
}