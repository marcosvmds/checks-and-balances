import React, { useState } from "react"
import moment from 'moment'
import styled from 'styled-components'

import Filters from './Filters'
import List from './List'

const TransactionsSection = styled.div`
    width: 52%;

    @media(max-width: 720px){
        width: 100%;
        max-width: 40rem;
    }
`

export default function Transactions(props){
    console.log('TRANSACTIONS/>')

    const [filtersState, setFiltersState] = useState({
        description:'',
        type:'withdraw deposit',
        startDate: '01-01-2000',
        endDate: moment().format('DD-MM-YYYY')
    })

    function handleSetFilters(filterType, filterValue){
        console.log('TRANSACTIONS Setando filtros...')
        setFiltersState({...filtersState, [filterType]: filterValue})
    }
    return(
        <TransactionsSection>
            <Filters 
                filters={filtersState}
                setFilters={handleSetFilters}               
            />
            <List filters={filtersState}/>
        </TransactionsSection>      
    )
    
}

