import React from 'react'
import styled from 'styled-components';

const TypeInput = styled.div`
    display:flex;
    align-items:center;
    flex-direction: row;
    label{
        color: #666666;
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }
`
export default function TypeFilter(props){
    return(
        <TypeInput onChange={props.setType}>
            <input type="radio" id="all" name="type" value="withdraw deposit" defaultChecked/>
            <label htmlFor="all">All</label><br/>

            <input type="radio" id="deposits" name="type" value="deposit"/>
            <label htmlFor="deposits">Deposits</label><br/>

            <input type="radio" id="withdraws" name="type" value="withdraw"/>
            <label htmlFor="withdraws">Withdraws</label><br/>
        </TypeInput> 
    )
}