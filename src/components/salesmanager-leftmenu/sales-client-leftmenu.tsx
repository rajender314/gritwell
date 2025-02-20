import { PiAssignmentsLeftNav } from 'pixel-kit'
import React from 'react'
import { LeftMenuContainer } from '../../styles/common-styles'
import { TableListContainer } from '../secondaryheader/secondaryheader-components'

type Props = {
	email: string;
	phone: string;
	onEditProfile: () => void
}

export default function ClientsLeftmenu({ email, phone, onEditProfile }: Props) {
	return (
		<LeftMenuContainer>
			<TableListContainer>
				<PiAssignmentsLeftNav
					libraryType="atalskit"
					onEditProfile={() => onEditProfile()}
					email={email}
					phone={phone}
				/>
			</TableListContainer>
		</LeftMenuContainer>
	)
}