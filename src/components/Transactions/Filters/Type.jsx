import React, {useState} from 'react'

import styled from 'styled-components';

const TypeInput = styled.div`
    margin-top: 1.5rem;
    label{
        color: #666666;
        font-size: 1.5rem;
        margin-right: 1rem;
    }
`
export default function TypeFilter(props){

    return(
        <TypeInput id="type-filter" onChange={props.setType}>
            <input type="radio" id="all" name="type" value="SAQUE DEPOSITO" defaultChecked/>
            <label htmlFor="all">All</label><br/>

            <input type="radio" id="deposits" name="type" value="DEPOSITO"/>
            <label htmlFor="deposits">Deposits</label><br/>

            <input type="radio" id="withdraws" name="type" value="SAQUE"/>
            <label htmlFor="withdraws">Withdraws</label><br/>
        </TypeInput> 
    )
}