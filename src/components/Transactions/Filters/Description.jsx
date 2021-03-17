import React from 'react'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const DescriptionInput = styled.div`
    width: 100%;
    max-width: 30rem;
    position: relative;
    #search-icon{
        position:absolute;
        top: 0.7rem;
        left: 1rem;
        color: #b8b8b8;
        font-size: 2rem;
    }
    #description-input{
        width: 95%;
        height:3.5rem;
        padding-left: 4rem;
        font-size: 1.7rem;
        &::placeholder{
            color:#969696;
        }
    }
    @media(max-width: 1080px){
        margin-bottom: 2.5rem;
    }
`
export default function DescFilter(props){
    
    return(
        <DescriptionInput>
            <FontAwesomeIcon id='search-icon' icon={faSearch}/>
            <input id="description-input" type="text" 
                placeholder='Description'
                onChange={props.setDescription} value={props.description}/>
        </DescriptionInput>
        
    )
}