import React, {useState} from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import PaginationList from 'react-pagination-list';

const TransactionsList = styled.ul`
    list-style: none;
    line-height: 2.5rem;
    background-color: #f9f9f9;
`

export default function List(props){
    
    const filters = props.filters
    const transactionsData = listFilter(props.transactionsData,  filters).reverse()

    function transTypeIcon(type){
        return (
        type == 'DEPOSITO' ? 
        <FontAwesomeIcon icon={faArrowRight}/> : 
        <FontAwesomeIcon icon={faArrowLeft}/>
        )
    }
    function valueFormater(value, type){
        const formated = new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL'}).format(value)
        return formated
    }
    function listFilter(data, filters){
        return (
            data.filter((t)=>{
                const d = new Date(filters.endDate)
                return (
                    t.descricao.toLowerCase().includes(filters.description.toLowerCase())
                    && filters.type.includes(t.tipo)
                    && t.atualizadoEm>=Date.parse(filters.startDate)
                    && t.atualizadoEm<=Date.parse(filters.endDate)
                )
            })
        )
    }
    function itemFormatter(item, key){
        const typeIcon = transTypeIcon(item.tipo)
        const date = new Date(item.atualizadoEm) 
        const formatedDate = date.toLocaleDateString()
        const formatedValue = valueFormater(item.valor)
        return (
            <li key={key}>
                {typeIcon}
                {` ${item.descricao} • ${formatedDate} • ${formatedValue}`}
            </li>
        )
    }
    return (
        <TransactionsList>
            <PaginationList 
                className='pagination-list'
                data={transactionsData} 
                pageSize={7}
                renderItem={(item, key)=>itemFormatter(item, key)}
            />
        </TransactionsList>  
    )               
}

