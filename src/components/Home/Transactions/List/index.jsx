import React from 'react'
import styled from 'styled-components'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import PaginationList from 'react-pagination-list';
import moment from 'moment'

import {useAccountContext} from '../../../../context/account'
import {valueFormater, getDateMilliValue} from '../utils.js'

const TransactionsList = styled.ul`
    padding: 2rem 0;
    font-size: 1.7rem;
    list-style: none outside;
    margin-top: 2rem;
    line-height: 3.5rem;
    color: #666666;
    background-color: #f9f9f9;
`

export default function List(props){
    
    const {accountState} = useAccountContext()
   
    console.log('LIST/>')

    function transTypeIcon(type){
        return (
            type == 'deposit' ? 
            <FontAwesomeIcon icon={faArrowRight}/> : 
            <FontAwesomeIcon icon={faArrowLeft}/>
        )
    }
    function listFilter(data, filters){      
        console.log("LIST Filtering new transactions list... (listFilter)")
        return (
            data.filter((transaction)=>{
                return (
                    transaction.description.toLowerCase().includes(filters.description.toLowerCase())
                    &&filters.type.includes(transaction.type)
                    && Date.parse(transaction.date)>=getDateMilliValue(filters.startDate)
                    && Date.parse(transaction.date)<=getDateMilliValue(filters.endDate)
                )
            })
        )
    }
    function transactionDataFormatter(transaction, key){
        console.log("LIST Formatting list lines... (transactionDataFormatter)")
        const typeIcon = transTypeIcon(transaction.type)
        const formatedDate = moment(transaction.date).format('DD/MM/YYYY')
        return (
            <li key={key}>
                {typeIcon}
                {` ${transaction.description} • ${formatedDate} • ${valueFormater(transaction.amount)}`}
            </li>
        )
    }
    const filters = props.filters
    const transactionsFilteredData = listFilter(accountState.listState, filters).reverse() 

    return (
        <TransactionsList>
            <PaginationList 
                className='pagination-list'
                data={transactionsFilteredData} 
                pageSize={10}
                renderItem={(item, key)=>transactionDataFormatter(item, key)}
            />
        </TransactionsList>  
    )               
}

