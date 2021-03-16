import React, { useState } from "react"
import moment from 'moment'
import styled from 'styled-components'

import Filters from './Filters'
import List from './List'

const TransactionsSection = styled.div`
    width: 52%;
`

export default function Transactions(props){
    const [filtersState, setFiltersState] = useState({
        description:'',
        type:'SAQUE DEPOSITO',
        startDate: '01-01-2000',
        endDate: moment().format('DD-MM-YYYY')
    })
    function handleSetFilters(filterType, filterValue){
        setFiltersState({...filtersState, [filterType]: filterValue})
    }
    return(
        <TransactionsSection>
            <Filters 
                filters={filtersState}
                setFilters={handleSetFilters}               
            />
            <List 
                filters={filtersState}
                transactionsData={props.transactionsData}
            />
        </TransactionsSection>      
    )
}

