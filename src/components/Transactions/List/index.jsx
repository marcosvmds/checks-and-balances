import React from 'react'
import styled from 'styled-components'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import PaginationList from 'react-pagination-list';

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
    
    const filters = props.filters
    const transactionsData = listFilter(props.transactionsData, filters).reverse()

    function transTypeIcon(type){
        return (
        type == 'DEPOSITO' ? 
        <FontAwesomeIcon icon={faArrowRight}/> : 
        <FontAwesomeIcon icon={faArrowLeft}/>
        )
    }
    function valueFormater(value){
        const formated = new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL'}).format(value)
        return formated
    }
    function invert(date){
        const d = date.split('-')
        return [d[1],d[0],d[2]].join('-')
    }
    function listFilter(data, filters){    
        return (
            data.filter((t)=>{
                return (
                    t.descricao.toLowerCase().includes(filters.description.toLowerCase())
                    && filters.type.includes(t.tipo)
                    && t.atualizadoEm>=Date.parse(invert(filters.startDate))
                    && t.atualizadoEm<=Date.parse(invert(filters.endDate))
                )
            })
        )
    }
    function itemFormatter(item, key){
        const typeIcon = transTypeIcon(item.tipo)
        const date = new Date(item.atualizadoEm) 
        const formatedDate = date.toLocaleDateString()
        const formatedValue = item.tipo == 'SAQUE' ?
            valueFormater(item.valor*-1) : valueFormater(item.valor)
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
                pageSize={10}
                renderItem={(item, key)=>itemFormatter(item, key)}
            />
        </TransactionsList>  
    )               
}

