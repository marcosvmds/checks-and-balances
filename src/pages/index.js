import React, {useEffect, useState} from 'react'
import cookie from "cookie"
import { CookiesProvider } from "react-cookie"


import Home from '../components/Home'
import Login from '../components/Auth/Login'
import {Signup} from '../components/Auth/Signup'
import {Loading} from '../components/Auth/Loading'
import api from '../services/api'
import {useAccountContext} from '../context/account'

export async function getServerSideProps({req, res}){
	console.log("GET SERVER SIDE PROPS: USER COOKIES")
	if(req.headers.cookie){
		console.log("Has cookies on headers")
		const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
		const userCookie =  cookies.__account_user_token
		const loggedUser = await cookieVerify(userCookie).then()
		return { props: { loggedUser }}
	} 
	else {
		console.log("No cookie on headers")
		return { props: {loggedUser: false}}
	}
}

async function cookieVerify(cookie){
	console.log("COOKIE TOKEN VERIFY")
	const payloadAndToken = JSON.parse(cookie)
	const accountData = payloadAndToken.payload
		
	if (accountData.exp > (Date.now()/1000)){
		console.log("Has has validity")
		return await api.post('validateToken', payloadAndToken)
			.then(res => {
				console.log("Token successfull validate... Returning user data")
				return res.data
			})
			.catch(err => {
				console.log("Cant validate token")
				console.log(err.data)
				return false
			})
	} else {
		return false
	}
}

export default function index({loggedUser}){

	const {accountState, setAccountState} = useAccountContext()

	console.log("INDEXXXXXX")
	const [pageState, setPageState] = useState('login')
	console.log("Page state: "+pageState)

	const page = () =>{
		if(loggedUser){
			console.log("Login with verified cookie")
			if(accountState == undefined){
				console.log("Setting cookie")
				api.defaults.headers.common['Authorization'] = `bearer ${loggedUser.token}`
				console.log("Setting new account state")
				setAccountState({
					accountId: loggedUser.payload.id,
					listState: [...loggedUser.transactions],
					balanceState: loggedUser.payload.balance
				})
			}
			useEffect(()=>{
				console.log("New account state set... Turning to Home page state")
				setPageState("home")
			}, [accountState])					
		}
		switch (pageState) {
			case 'signup': return <Signup setPage={setPageState}/>
			case 'login': return <Login setPage={setPageState}/>
			default: return <Home setPage={setPageState}/>
		}
	}
	return(
		<>
			<CookiesProvider>
				{page()}	
			</CookiesProvider>
		</>	
	) 
}
