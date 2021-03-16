import React from 'react'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const DescriptionInput = styled.input`
    font-size: 1.7rem;
    height:3.5rem;
    &::placeholder{
        color:#969696;
    }
`
export default function DescFilter(props){
    const searchIcon = <FontAwesomeIcon icon={faSearch}/>
    return(
        <DescriptionInput id="description-filter" type="text" 
            placeholder='Description'
            onChange={props.setDescription} value={props.description}/>
    )
}