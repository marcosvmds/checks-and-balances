import React from 'react'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

import Datepicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt'
registerLocale('pt', pt)

const DateRangeInput = styled.div`
    display:flex;
`
const Selector = styled.div` 
    label{
        display:flex;
        padding-right:3rem;
        cursor: pointer;
        .label-calendar-icon{
            font-size: 3.3rem;
            margin-right: 0.8rem;
            color: #969696;
        }
        #selector-info-wrapper{
            display:flex;
            flex-direction: column;
            p{
                margin:0;
                font-size: 1.3rem;
            }
            #date-value{
                color: #666666
            }
        }
        #date-picker-container{
            font-size: 2rem;
            .date-picker{
                display:none;
                font-size: 1.6rem;
                height: 1px;
                width: 1px;
            }
        }
        
    }
   
`
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
                <div id='date-picker-container'>
                    <Datepicker
                        className='date-picker'
                        id={startOrEnd}
                        name={startOrEnd}
                        selected={selected}  
                        locale='pt'
                        dateFormat="dd/MM/yyyy"
                        onChange={date=>(props.setDate(startOrEnd, date))}
                    />
                </div>
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