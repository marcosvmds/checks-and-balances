import React from 'react'
import styled from 'styled-components'

const TypeWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: flex-start;
    font-size: 1.5rem;
    color: #666666;
    line-height: 3rem;
    input{
      margin-right: 1.5rem
    }
`

export default function Type(props){
    return(
        <TypeWrapper id="trans-type" className="form-group">
            <div className="type-input">
                <input type="radio" id="deposit" name="type" value="deposit"
                ref={props.register} defaultChecked/>
                <label htmlFor="deposit">Deposit</label><br/>
            </div>
            <div className="type-input">
                <input type="radio" id="withdraw " name="type" value="withdraw"
                ref={props.register}/>
                <label htmlFor="withdraw">Withdraw</label><br/>
            </div>
        </TypeWrapper>
    )

}


