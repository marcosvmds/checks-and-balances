import React, {useState} from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';

import DateFilter from './Date.jsx'
import DescriptionFilter from './Description.jsx'
import TypeFilter from './Type.jsx'

const FiltersSection = styled.section`
    #description-date-wrapper{
        display:flex;
        justify-content: space-between;
        margin-bottom: 2.5rem;    
    }
    #type-filter{
        display:flex;
        align-items:center;
        flex-direction: row;
    }
`

export default function Filters(props){
    function handleSetDescription(event){   
        props.setFilters('description', event.target.value)   
    }
    function handleSetDate(name, date){
        const formated = date.toLocaleDateString().replaceAll('/','-')
        props.setFilters(name, formated)   
    }
    function handleSetType(event){
        props.setFilters('type',event.target.value)     
    }
    return(
        <FiltersSection>
            <div id='description-date-wrapper'>
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
