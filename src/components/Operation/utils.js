import moment from 'moment'

export function toNumeric(value){
    return value.replace(/[\.]/g,'').replace(',','.').slice(2)
}
export function todayMilli(){
  return Date.parse((moment().format('YYYY-MM-DD'))+'T00:00:00')
}