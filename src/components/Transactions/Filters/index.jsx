import React, {useState} from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';

import DateFilter from './Date.jsx'
import DescriptionFilter from './Description.jsx'
import TypeFilter from './Type.jsx'

export default function Filters(props){
    function handleSetDescription(event){   
        props.setFilters('description', event.target.value)   
    }
    function handleSetDate(name, date){
        props.setFilters(name, date)   
    }
    function handleSetType(event){
        props.setFilters('type',event.target.value)     
    }
    return(
        <FiltersSection>
            <div id='description-date-wrapper'>
                <DateFilter 
                    setDate={handleSetDate} 
                    filters={props.filters}
                />
                <DescriptionFilter 
                    setDescription={handleSetDescription} 
                    description={props.filters.description}
                />           
            </div>
            <TypeFilter setType={handleSetType}/>
        </FiltersSection>  
        
    )
}
const FiltersSection = styled.section`
    #description-date-wrapper{
        display:flex;
        justify-content: space-between;
        align-items:center;      
    }
    #type-filter{
        display:flex;
        flex-direction: row;
    }
`
