import React, {useEffect} from 'react'
import styled from 'styled-components'

import Header from './Header'
import Operation from './Operation'
import Transactions from './Transactions'


const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

`
const Manager = styled.div`
  width: 70%;
  height: auto;
  display:flex;
  flex-direction: row;
  justify-content: space-between;

  @media(max-width: 1200px){
    width: 85%;
  }
  @media(max-width: 1080px){
    width: 90%;
  }
  @media(max-width: 720px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
  }
`

export default function Home(props){ 

    console.log('HOME/>')

  	return (
		<AppWrapper className="app">
			<Header/>
			<Manager>
				<Operation setPage={props.setPage}/>
				<Transactions/>
			</Manager>
		</AppWrapper>
  	)
}


