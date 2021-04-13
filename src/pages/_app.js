import '../styles/globals.css'
import React, {useState} from 'react'
import {AccountContext} from '../context/account'

function MyApp({ Component, pageProps }) {
  return (
    <AccountStateProvider>
      <Component {...pageProps}/> 
    </AccountStateProvider>
    )
}

const AccountStateProvider = (props) => {
	const [accountState, setAccountState] = useState()	
	const userTokenCookie = "__account_user_token"
  
	return(
	<AccountContext.Provider 
	  value={{userTokenCookie, accountState, setAccountState}}>
	  {props.children}
	</AccountContext.Provider>
	)
}


export default MyApp
