import React, {useState} from 'react'

import Home from '../components/Home'
import {Login}  from '../components/Auth/Login'
import {Signup} from '../components/Auth/Signup'

export default function index(){

	const [pageState, setPageState] = useState('login')
	
	const page = () =>{
		switch (pageState) {
			case 'signup': return <Signup setPage={setPageState}/>
				break
			case 'login': return <Login setPage={setPageState}/>
				break
			default: return <Home/>
		}
	}

	return(
		<>
			
				{page()}
				
		</>	
	) 
}