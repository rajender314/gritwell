import { PiLeftMenu } from 'pixel-kit'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LeftMenuContainer } from '../../styles/common-styles';
import { SideMenuContainer, TableListContainer } from '../secondaryheader/secondaryheader-components'
import { SideMenuList } from '../secondaryheader/secondaryheader-components'
import { useHistory } from 'react-router-dom'
// import { AdminList } from './left-menu-render-data'
import { setLocalStorage } from '../../core/localStorageService'
import { getLocalStorage } from '../../core/localStorageService'
import { Permissions, PiMenuOptions, SidenavProps } from '../../core/schema';

import { useAppSelector } from '../../store/hooks';
import { checkUserPermissions } from '../../core/checkUserPermission'
import Icon from '../icon';


export default function LeftMenu() {
	const [headerLinkactive, setHeaderLinkactive] = useState("");
	// const [LeftHeader, setLeftHeader] = useState('')
	// const headerLabel = getLocalStorage("leftMenu")
	// const [iconName, setIconName] = useState("")
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [menuItems, setMenuItems] = useState<PiMenuOptions[]>([])
	
	useLayoutEffect(() => {
		getMenuItems();
	}, [userPermissions])

	let history = useHistory()
	useEffect(() => {
		setHeaderLinkactive("user")
		if (getLocalStorage("leftMenuItem") === "roles") {
			setHeaderLinkactive("roles")
		} else if (getLocalStorage("leftMenuItem") === "user") {
			setHeaderLinkactive("user")
		} else if (getLocalStorage("leftMenuItem") === "plans") {
			setHeaderLinkactive("plans")
		}
		 else if (getLocalStorage("leftMenuItem") === "nutrition") {
			setHeaderLinkactive("nutrition")
		} else if (getLocalStorage("leftMenuItem") === "testing") {
			setHeaderLinkactive("testing")
		} else if (getLocalStorage("leftMenuItem") === "supplements") {
			setHeaderLinkactive("supplements")
		} else if (getLocalStorage("leftMenuItem") === "lifestyle") {
			setHeaderLinkactive("lifestyle")
		} else if (getLocalStorage("leftMenuItem") === "rootcause") {
			setHeaderLinkactive("rootcause")
		} else if (getLocalStorage("leftMenuItem") === "diagnosis") {
			setHeaderLinkactive("diagnosis")
		} else if (getLocalStorage("leftMenuItem") === "coredysfunction") {
			setHeaderLinkactive("coredysfunction")
		} else if (getLocalStorage("leftMenuItem") === "goals") {
			setHeaderLinkactive("goals")
		}
		// if (headerLabel == "admin") {
		//     setLeftHeader("Admin")
		//     setIconName("settings")
		// }
		// if (headerLabel == "clients") {
		//     setLeftHeader("Clients")
		//     setIconName("clients")
		// }
		// if (window.location.href.indexOf("user") > -1) {
		//     setLeftHeader("Admin")
		// }
		if (window.location.href.indexOf("roles") > -1) {
			setHeaderLinkactive("roles")
		}
		if (window.location.href.indexOf("clients") > -1) {
			setHeaderLinkactive("myactiveclients")
		}
	}, [])


	function getMenuItems(){
		let memu = []
		if(checkUserPermissions(userPermissions, 'list-nutrition') === true){
			memu.push({
				icon: <Icon name="nutritionicon" />,
				key: "nutrition",
				label: "Nutrition",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-tests')){
			memu.push({
				icon: <Icon name="testicon" />,
				key: "testing",
				label: "Testing",
				children: []
			});
		}

		if(checkUserPermissions(userPermissions, 'list-supplements') === true){
			memu.push({
				icon: <Icon name="supplemetsicon" />,
				key: "supplements",
				label: "Supplements",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-lifestyle') === true){
			memu.push({
				icon: <Icon name="lifestyleicon" />,
				key: "lifestyle",
				label: "Lifestyle",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-rootcause') === true){
			memu.push({
				icon: <Icon name='rootcauseicon' />,
				key: "rootcause",
				label: "Root Cause",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-diagnosis') === true){
			memu.push({
				icon: <Icon name='diagnosisicon' />,
				key: "diagnosis",
				label: "Diagnosis",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-coredysfunction') === true){
			memu.push({
				icon: <Icon name='coredysfunctionIcon' />,
				key: "coredysfunction",
				label: "Core Dysfunction",
				children: []
			});
		}
		if(checkUserPermissions(userPermissions, 'list-goals') === true){
			memu.push({
				icon: <Icon name='goalsicon' />,
				key: "goals",
				label: "Goals",
				children: []
			});
		}
		let users = checkUserPermissions(userPermissions, 'user-management');
		if(users === '1' || users === '2'){
			memu.push({
				icon: <Icon name="usericon" />,
				key: "user",
				label: "Users",
				children: []
			});
		}
		let roles = checkUserPermissions(userPermissions, 'manage-roles');
		if(roles === '1' || roles === '2'){
			memu.push({
				icon: <Icon name="leftMenuIcon" />,
				key: "roles",
				label: "Roles",
				children: []
			});
		}
		let plans = checkUserPermissions(userPermissions, 'subscription-plans');
		if(plans === '1' || plans === '2'){
			memu.push({
				icon: <Icon name="plansicon" />,
				key: "plans",
				label: "Plans",
				children: []
			});
		}

		setMenuItems(memu);
	}

	function onItemClick(obj: SidenavProps) {
		setLocalStorage("leftMenuItem", obj.key)
		if (obj.key == "user") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/user")
		} else if (obj.key === "roles") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/roles")
		} else if (obj.key === "plans") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/plans")
		}else if (obj.key === "nutrition") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/nutrition")
		} else if (obj.key === "testing") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/testing")
		} else if (obj.key === "supplements") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/supplements")
		} else if (obj.key === "lifestyle") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/lifestyle")
		} else if (obj.key === "rootcause") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/rootcause")
		} else if (obj.key === "diagnosis") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/diagnosis")
		} else if (obj.key === "coredysfunction") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/coredysfunction")
		} else if (obj.key === "goals") {
			setHeaderLinkactive(obj.key)
			history.replace("/office/goals")
		}
	}
	return (
		<LeftMenuContainer>
			<TableListContainer>
				{/* <LeftMenuHeader className="text-center headerBorder">
                    <span className="custom-icon"><Icon name="settings" /></span>
                    <PiTypography component="h4">Admin</PiTypography>
                </LeftMenuHeader> */}
				<SideMenuContainer className="menu-list">
					<SideMenuList className="menu-list-item">
						<PiLeftMenu
							activeKey={headerLinkactive}
							onMenuClick={e => onItemClick(e)}
							// options={headerLabel ? leftMenuList : AdminList}
							options={menuItems}
						/>
					</SideMenuList>
				</SideMenuContainer>
			</TableListContainer>
		</LeftMenuContainer>
	)

}