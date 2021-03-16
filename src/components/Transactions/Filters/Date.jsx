import React from 'react'
import styled from 'styled-components';
import moment from 'moment'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

import Datepicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt'
registerLocale('pt', pt)

const DateRangeInput = styled.div`
    width: 50%;
    display:flex;
    justify-content: space-between;
`
const Selector = styled.div` 
    label{
        display:flex;
        padding-right:1rem;
        cursor: pointer;
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
            height: 1px;
            width: 1px;
        }
    }
   
`
const localDate = (date) => date.toLocaleDateString()
const invert = (date) => {
    const d = date.split('-')
    return [d[1],d[0],d[2]].join('-')
}
function DateSelector(props){ 
    const startOrEnd = props.title == 'Start date' ? 'startDate' : 'endDate'  
    const invertd = invert(props.filters[startOrEnd])
    const d = new Date(invertd)
    const selected = Date.parse(d)
    return(
        <Selector>
            <label htmlFor={startOrEnd}>    
                <FontAwesomeIcon className='label-calendar-icon' 
                    icon={faCalendar}/>
                 <Datepicker
                    className='date-picker'
                    id={startOrEnd}
                    name={startOrEnd}
                    selected={selected}  
                    locale='pt'
                    dateFormat="dd/MM/yyyy"
                    onSelect={date=>(props.setDate(startOrEnd, date))}
                />
                <div id='selector-info-wrapper'>
                    <p id='date-title'>{props.title}</p>
                    <p id='date-value'>{props.filters[startOrEnd]}</p>
                </div>                            
            </label>
        </Selector>        
    )
}
export default function DateFilter(props){
    return(
        <DateRangeInput>
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
        </DateRangeInput>   
    )
}