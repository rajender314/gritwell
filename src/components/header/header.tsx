import * as React from "react";
import { HeaderMain } from './header-components'
import { Icon } from '../index'
import { useHistory } from "react-router-dom"


export default function Header() {
  let history = useHistory()



  return (
    <HeaderMain className='text-center' onClick={() => history.replace('/sign-in')}>
      <Icon name='gritwell' />
    </HeaderMain>
  )
}


