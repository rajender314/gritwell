import { PiHeaderMenu } from 'pixel-kit'
import React, { useState, useContext, useEffect } from 'react'
import { HeaderMain } from '../header/header-components'
import Logo from '../../assets/Vector.svg'
import { useHistory, useLocation } from 'react-router-dom'
import { triggerApi } from '../../services'
import { AuthContext } from '../../providers/auth'
import { setLocalStorage, getLocalStorage, clearLocalStorage } from '../../core/localStorageService'
import apiEndpoint from '../../core/apiend_point'
import { ApiResponseProps, PayloadProps, Permissions, PiMenuOptions, ProfileProps } from '../../core/schema'
import { useAppSelector } from '../../store/hooks';
import { checkUserPermissions } from '../../core/checkUserPermission'

export default function Loginheader() {
	const [headerLinkactive, setHeaderLinkactive] = useState("");
	const [hideHeader, setHideheader] = useState(false)
	const { userInfo }: any = useContext(AuthContext);
	let history = useHistory()
	let proImg = userInfo.display_url
	const location = useLocation();
	
	const [menuItems, setMenuItems] = useState<PiMenuOptions[]>([])
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
    

	useEffect(() => {
		// console.log(userPermissions)
		getMenuItems()
		if (window.location.href.indexOf("user") > -1 || window.location.href.indexOf("roles") > -1 || window.location.href.indexOf("nutrition") > -1
			|| window.location.href.indexOf("testing") > -1 || window.location.href.indexOf("supplements") > -1 || window.location.href.indexOf("lifestyle") > -1
	 		|| window.location.href.indexOf("rootcause") > -1 || window.location.href.indexOf("diagnosis") > -1 || window.location.href.indexOf("coredysfunction") > -1 
			 || window.location.href.indexOf("goals") > -1 || window.location.href.indexOf("plans") > -1 ) {
			setHeaderLinkactive("admin")
		}  else if (window.location.href.indexOf("profile") > -1) {
			setHeaderLinkactive("")
		}


	}, [getLocalStorage("leftMenu"), (window.location.href.indexOf("user") > -1 || window.location.href.indexOf("roles") > -1 || window.location.href.indexOf("nutrition") > -1
		|| window.location.href.indexOf("testing") > -1 || window.location.href.indexOf("supplements") > -1 || window.location.href.indexOf("lifestyle")), userPermissions])

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

		// if(checkUserPermissions(userPermissions, 'admin') === ''){
			memu.push({
				// icon: <Icon name="settings" />,
				key: 'admin',
				label: 'Admin',
				children: [],
				href: ''

			});
		// }

		setMenuItems(memu);
	}

	const MenuClick = (menu: PiMenuOptions) => {
		// setHeaderLinkactive(menu.key)
		// setSecondaryHeader(menu.label)
		setLocalStorage("leftMenu", menu.key)
		if (menu.key == "clients") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/clients")
		} else if (menu.key == "admin") {
			setHeaderLinkactive(menu.key)
			history.replace(`/office/${getLocalStorage("leftMenuItem")}`)
		} else if (menu.key == "dashboard") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/dashboard")
		} else if (menu.key == "chats") {
			setHeaderLinkactive(menu.key)
			history.replace("/office/chats")
		}
		// history.replace('/' + menu.key)

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
	// const menuItems = [];

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