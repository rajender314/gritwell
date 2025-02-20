import { PiTypography } from 'pixel-kit'
import React from 'react'
import { Comingsoon, RightContainer, UserListContainer } from '../../../styles/common-styles'
import LeftMenu from '../../../components/leftMenu/leftmenu'

export default function Plans() {
    return (
        <UserListContainer className="main">
        <LeftMenu />
        <RightContainer>
        <Comingsoon><PiTypography component="h2">Coming Soon</PiTypography></Comingsoon>
        </RightContainer>
        </UserListContainer>
        
    )
}