import { PiLeftMenu } from 'pixel-kit'
import React, { useLayoutEffect, useState } from 'react'
import { Permissions, SidenavProps, PiMenuOptions } from '../../core/schema'
import { LeftMenuContainer } from '../../styles/common-styles'
import { SideMenuContainer, TableListContainer, SideMenuList } from '../secondaryheader/secondaryheader-components'
// import { ClientList } from './sales-render-data'

import { useAppSelector } from '../../store/hooks';
import { checkUserPermissions } from '../../core/checkUserPermission'
import Icon from '../icon';


export default function SalesmangerLeftmenu() {
	const [headerLinkactive, setHeaderLinkactive] = useState("myactiveclients");
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [menuItems, setMenuItems] = useState<PiMenuOptions[]>([])
	
	useLayoutEffect(() => {
		getMenuItems();
	}, [userPermissions])

	function getMenuItems(){
		let memu = []
		if(checkUserPermissions(userPermissions, 'list-myclients') === true){
			memu.push(
				{
					icon: '',
					key: "myactiveclients",
					label: "My Active Clients",
					children: []
				},
				{
					icon: '',
					key: "matchpending",
					label: "Match Pending",
					children: []
				},
				{
					icon: '',
					key: "paused",
					label: "Paused",
					children: []
				},
				{
					icon: '',
					key: "dropped",
					label: "Dropped",
					children: []
				},
				{
					icon: '',
					key: "completed",
					label: "Completed",
					children: []
				}
			
			);
		}
		

		setMenuItems(memu);
	}
	

	function onItemClick(obj: SidenavProps) {
		setHeaderLinkactive('myactiveclients')
		// console.log(obj.key)
	}
	return (
		<LeftMenuContainer>
			<TableListContainer>
				{/* <LeftMenuHeader className="text-center headerBorder">
                    <span className="custom-icon"><Icon name="clients" /></span>
                    <PiTypography component="h4">Clients</PiTypography>
                </LeftMenuHeader> */}
				<SideMenuContainer className="menu-list">
					<SideMenuList className="menu-list-item">
						{/* <PiThemeContextProvider value={leftContainer}> */}
						<PiLeftMenu
							activeKey={headerLinkactive}
							onMenuClick={e => onItemClick(e)}
							options={menuItems}
						/>
						{/* </PiThemeContextProvider> */}
					</SideMenuList>
				</SideMenuContainer>
			</TableListContainer>
		</LeftMenuContainer>

	)

}