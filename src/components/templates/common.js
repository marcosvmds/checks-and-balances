import styled from 'styled-components'

const FormWrapper = styled.form` 
	width:42%;
	height: 40rem;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	border: solid 1px black;
	padding: 0 3.5rem 2rem 3.5rem;
	margin-bottom: 4rem;
	@media (max-width: 850px){
		padding: 0 2.5rem 2rem 2.5rem;
	}
	@media(max-width: 720px){
		width: 100%;
		max-width: 40rem;
	}
	@media(max-width: 320px){
		width: 100%;
		max-width: 40rem;
	}
`

const Title = styled.h3`
	color: #666666;
	font-size: 1.5rem;
	font-weight:500;
	text-transform: uppercase;
`
const SubmitButton = styled.input`
    width:45%;
    font-size: 1.7rem;
    color: #666666;
    padding: 0.6rem 0.4rem;
    border: 1.5px solid #969696;
    background-color:white;
	cursor: pointer;
`
const StyledLink = styled.a`
	font-size: 1.5rem;
	color: #666666;
	text-decoration: underline;
	cursor: pointer;	
`
const Input = styled.input`
    width: 100%;
    font-size: 1.6rem;
    padding: 0.5rem;
`

export {FormWrapper, SubmitButton, Title, StyledLink, Input}