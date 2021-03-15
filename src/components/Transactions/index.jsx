import React, { useState } from "react"
import styled from 'styled-components'
import Filters from './Filters'
import List from './List'

export default function Transactions(props){

    const [filtersState, setFiltersState] = useState({
        description:'',
        type:'SAQUE DEPOSITO',
        startDate: '2000-01-01',
        endDate: '2022-01-01'
    })

    function handleSetFilters(filterType, filterValue){
        const formated = filterValue.replaceAll('/','-')
        setFiltersState({...filtersState, [filterType]: formated})
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

const TransactionsSection = styled.div`
    width: 52%;
`