import { PiHeaderMenu } from 'pixel-kit'
import React, { useEffect, useState } from 'react'
import { HeaderMain } from '../header/header-components'
import Logo from '../../assets/Vector.svg'
import { useHistory } from 'react-router-dom'
import Icon from '../icon'
import { triggerApi } from '../../services'
// import { AuthContext } from '../../providers/auth';
import { clearLocalStorage } from '../../core/localStorageService'
import apiEndpoint from '../../core/apiend_point'
import { ApiResponseProps, PayloadProps, Permissions, PiMenuOptions, ProfileProps, SidenavProps } from '../../core/schema'

import { useAppSelector } from '../../store/hooks';
import { checkUserPermissions } from '../../core/checkUserPermission'

export default function CustomerLoginheader() {
	const [headerLinkactive, setHeaderLinkactive] = useState("dashboard");
	// const [secondaryHeader, setSecondaryHeader] = useState("Admin")
	const [hideHeader, setHideheader] = useState(false)
	let history = useHistory()

	const [menuItems, setMenuItems] = useState<PiMenuOptions[]>([])
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);

	useEffect(() => {
		if(userPermissions.length > 0){
			getMenuItems()
		}
	},[userPermissions]);

	function getMenuItems(){
		let memu = []
		if(checkUserPermissions(userPermissions, 'dashboard') === true){
			memu.push({
				// icon: <Icon name='dashboard' />,
				key: 'dashboard',
				label: 'Dashboard',
				children: [],
				href: ''
			});
		}

		setMenuItems(memu);
	}

	const MenuClick = (menu: SidenavProps) => {
		setHeaderLinkactive(menu.key)
		// setSecondaryHeader(menu.label)

	}
	const ProfileClick = (menu: ProfileProps) => {
		if (menu.id === "logout") {
			setHideheader(true)
			clearLocalStorage()
			history.replace("/sign-in")
			window.location.reload()
			Logout()
		} else if (menu.id === "profile") {
			history.replace("/customer/profile")

		}
	}

	const Logout = () => {
		const apiObject: PayloadProps = {
			payload: {},
			method: "POST",
			apiUrl: apiEndpoint.logoutApi,
			headers: {}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {

			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	return (
		<>

			{!hideHeader && <HeaderMain >
				{/* <PiThemeContextProvider value={HeaderStyles} > */}
				<PiHeaderMenu
					activeKey={headerLinkactive}
					image={Logo}
					onMenuClick={MenuClick}
					onProfileClick={(e: any) => ProfileClick(e)}
					options={[
						{
							icon: <Icon name='dashboard' />,
							key: 'dashboard',
							label: 'Dashboard',
							children: [],
							href: ''
						}

					]}
					profileOptions={[
						{
							id: "profile",
							name: "Profile",
							route: "",
							url: ""
						},
						{
							id: "logout",
							name: "Log out",
							route: "",
							url: ""
						},

					]}
					xsImage="/Logo.svg"
				/>
			</HeaderMain>} </>

	)
}