import React, {useState} from 'react'
import styled from 'styled-components';

import DateFilter from './Date.jsx'
import DescriptionFilter from './Description.jsx'
import TypeFilter from './Type.jsx'

import {toLocaleDash} from '../utils.js'

const FiltersSection = styled.section`
    #description-type-wrapper{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;    

        @media(max-width: 1080px){
            flex-direction: column;
            align-items: flex-start;
        }
    }
`
export default function Filters(props){
    function handleSetDescription(event){   
        props.setFilters('description', event.target.value)   
    }
    function handleSetDate(name, date){
        const formated = toLocaleDash(date)
        props.setFilters(name, formated)   
    }
    function handleSetType(event){
        props.setFilters('type',event.target.value)     
    }
    return(
        <FiltersSection>
            <div id='description-type-wrapper'>
                <DescriptionFilter 
                    setDescription={handleSetDescription} 
                    description={props.filters.description}
                />  
                <TypeFilter setType={handleSetType}/>    
            </div>
            <DateFilter 
                    setDate={handleSetDate} 
                    filters={props.filters}
            />            
        </FiltersSection>    
    )
}
