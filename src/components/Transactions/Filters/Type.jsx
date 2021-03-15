import React, {useState} from 'react'

import styled from 'styled-components';

const TypeInput = styled.div`
    grid-area: type;
    margin-top: 1rem;
    input{
        
    }
    label{
        font-size: 0.8rem;
        margin-right: 0.5rem;
    }
`
export default function TypeFilter(props){

    return(
        <TypeInput id="type-filter" onChange={props.setType}>
            <input type="radio" id="all" name="type" value="SAQUE DEPOSITO" defaultChecked/>
            <label for="all">All</label><br/>

            <input type="radio" id="deposits" name="type" value="DEPOSITO"/>
            <label for="deposits">Deposits</label><br/>

            <input type="radio" id="withdraws" name="type" value="SAQUE"/>
            <label for="withdraws">Withdraws</label><br/>
        </TypeInput> 
    )
}