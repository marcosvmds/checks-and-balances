import React from 'react'
import styled from 'styled-components'

import CurrencyInput from 'react-currency-input';

const AmountButton = styled.div`
    border-radius: 50%;
    width: 3.5rem;
    line-height: 3.5rem;
    text-align:center;
    font-size: 2.8rem;
    font-weight: 200;
    border: solid 0.15rem black;
    cursor: pointer;
    @media(max-width: 320px){
      width: 3rem;
      line-height: 3rem;
    }
`
const AmountSelectWrapper = styled.div`
    display: flex;
	flex-direction: row;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    max-width: 25rem;		
    input{
        max-width: 15rem;
        font-size:1.6rem;
        padding:1rem;   
        @media(max-width: 320px){
            width: 12rem;
        }
  }
`
export default function Amount(props){
    return(
        <AmountSelectWrapper id="trans-value" className="form-group">
            <AmountButton 
                id="value-button" 
                onClick={()=>props.handleChangeAmountByClick('add')}>+
            </AmountButton>              
                <CurrencyInput 
                    name='value'
                    ref={props.register}
                    prefix='R$' 
                    thousandSeparator='.' 
                    decimalSeparator=','
                    value={props.amountState}
                    onChangeEvent={props.changeAmount}
                />
            <AmountButton 
                id="value-button"
                onClick={()=>props.handleChangeAmountByClick('sub')}>-         
            </AmountButton>
        </AmountSelectWrapper>
    )
}