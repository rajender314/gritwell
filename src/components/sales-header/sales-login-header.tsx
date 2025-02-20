import { PiHeaderMenu } from 'pixel-kit'
import React, { useState, useContext, useEffect } from 'react'
import { HeaderMain } from '../header/header-components'
import Logo from '../../assets/Vector.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { triggerApi } from '../../services'
import Icon from '../icon'
import { AuthContext } from '../../providers/auth';
import { clearLocalStorage } from '../../core/localStorageService';
import apiEndpoint from '../../core/apiend_point'
import { ApiResponseProps, PayloadProps, Permissions, PiMenuOptions, ProfileProps } from '../../core/schema'

import { useAppSelector } from '../../store/hooks';
import { checkUserPermissions } from '../../core/checkUserPermission'

export default function SalesHeader() {
	const [hideHeader, setHideheader] = useState(false)
	const [headerLinkactive, setHeaderLinkactive] = useState("");
	let history = useHistory()
	const { userInfo }: any = useContext(AuthContext);
	let proImg = userInfo.display_url
	const location = useLocation();

	const [menuItems, setMenuItems] = useState<PiMenuOptions[]>([])
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);

	useEffect(() => {
		if(userPermissions.length > 0){
			getMenuItems()
		}
		
		if (window.location.href.indexOf("clients") > -1 || window.location.href.indexOf("health-plan") > -1) {
			setHeaderLinkactive("clients")
		} else if (window.location.href.indexOf("dashboard") > -1) {
			setHeaderLinkactive("dashboard")
		} else if (window.location.href.indexOf("chats") > -1) {
			setHeaderLinkactive("chats")
		}
		else if (window.location.href.indexOf("sign-in") > -1) {
			// alert("logout")
			setHideheader(true)
		}
	}, [userPermissions, window.location.href.indexOf("clients") > -1 || window.location.href.indexOf("sign-in") > -1])

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
		if(checkUserPermissions(userPermissions, 'list-myclients')){
			memu.push({
				// icon: <Icon name='clients' />,
				children: [],
				key: 'clients',
				label: 'Clients',
				href: ''
			});
		}

		// if(checkUserPermissions(userPermissions, 'chat_with_client') === true){
			memu.push({
				// icon: <Icon name="chats" />,
				key: 'chats',
				label: 'Chats',
				children: [],
				href: ''
			});
		// }

		setMenuItems(memu);
	}


	const ProfileClick = (menu: ProfileProps) => {
		if (menu.id == "logout") {
			setHideheader(true)
			clearLocalStorage()
			history.replace("/sign-in")
			window.location.reload()
			Logout()
		} else if (menu.id == "profile") {
			setHeaderLinkactive("")
			history.replace("/office/profile")

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
	const MenuClick = (menu: PiMenuOptions) => {
		setHeaderLinkactive(menu.key)
		if (menu.key == "clients") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/clients")
		}
		else if (menu.key == "dashboard") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/dashboard")
		} else if (menu.key == "chats") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/chats")
		}

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
					profilePicSrc={proImg}
					options={menuItems}
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