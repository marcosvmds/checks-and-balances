import React, {useState} from 'react'
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

import Datepicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt'
registerLocale('pt', pt)

const DateInput = styled.div`
    width: 45%;
    display:flex;
    justify-content: space-between;
`
const Selector = styled.div` 
    label{
        display:flex;
        padding-right:1rem;
        .label-calendar-icon{
            font-size: 2rem;
            margin-right: 0.5rem;
        }
        #selector-info-wrapper{
            display:flex;
            flex-direction: column;
            p{
                margin:0;
                font-size: 0.8rem;
            }
            #date-value{
                color: #969696
            }
        }
        .date-picker{
            display:none;
        }
    }
   
`
function DateSelector(props){ 
    const name = props.title == 'Start date' ? 'startDate' : 'endDate'  
    const localDate = (date) => date.toLocaleDateString()
    return(
        <Selector>
            <label htmlFor={name}>
                <FontAwesomeIcon className='label-calendar-icon' 
                    icon={faCalendar}/>
                <div id='selector-info-wrapper'>
                    <p id='date-title'>{props.title}</p>
                    <p id='date-value'>{props.filters[name]}</p>
                </div>  
                
                <Datepicker
                    className='date-picker'
                    id={name}
                    name={name}
                    selected={Date.parse(props.filters[name])}
                    locale="pt"     
                    onSelect={date=>(props.setDate(name, localDate(date)))}
                />               
            </label>
        </Selector>        
    )
}
export default function DateFilter(props){
    return(
        <DateInput>
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
        </DateInput>   
    )
}