import React, {createContext} from 'react'

export const AccountContext = createContext({})
export const useAccountContext = () => React.useContext(AccountContext)