
export function toLocaleDash(date){
    return date.toLocaleDateString().replaceAll('/','-')
}
export function invertDayMonth(date){
    const d = date.split('-')
    return [d[1],d[0],d[2]].join('-')
}
export function valueFormater(value){
    const formated = new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL'}).format(value)
    return formated
}