import '../styles/globals.css'
import React, {useState} from 'react'

import {AccountContext} from '../context/account'

const AccountStateProvider = (props) => {
  const [accountState, setAccountState] = useState({
  listState: '',
  balanceState: 35
  })	

  return(
  <AccountContext.Provider 
    value={{accountState, setAccountState}}>
    {props.children}
  </AccountContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <AccountStateProvider>
      <Component {...pageProps}/> 
    </AccountStateProvider>       
    )
}


export default MyApp
