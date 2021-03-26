import React from 'react'
import styled from 'styled-components';

import DateSelector from './DateSelector'

const DateRangeInput = styled.div`
    display:flex;
`

export default function DateFilter(props){
    return(
        <DateRangeInput>
            <DateSelector 
                title={'Start date'} 
                setDate={props.setDate} 
                filters={props.filters}
            />
            <DateSelector 
                title={'End date'} 
                setDate={props.setDate} 
                filters={props.filters}
            />
        </DateRangeInput>   
    )
}