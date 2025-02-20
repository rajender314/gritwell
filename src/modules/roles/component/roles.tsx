import { PiButton, PiInput, PiLeftMenu, PiPermissionsList, PiSelect, PiSpinner, PiThemeContextProvider, PiTypography } from 'pixel-kit'
import React, { useEffect, useState } from 'react'
import LeftMenu from '../../../components/leftMenu'
import { SideMenuContainer, RoleTableListContainer, SideMenuList } from '../../../components/secondaryheader/secondaryheader-components'
import { triggerApi } from '../../../services'
import { primaryColor, whiteColor } from '../../../styles'
import { LeftMenuContainer, PermissionsBox, LeftMenuHeader, RightContainer, UserListContainer } from '../../../styles/common-styles'
import { FooterDiv, FormField, FormFlexWrapper } from '../../users/component/add-user-components'
import { getLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps, Permissions } from '../../../core/schema'
import Snackbar from '../../../core/snackbar'
import { useAppSelector } from '../../../store/hooks';
import { checkUserPermissions } from '../../../core/checkUserPermission'
import { useHistory } from 'react-router';

export default function Roles() {
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [headerLinkactive, setHeaderLinkactive] = useState("");
	// const [searchValue, setSearchValue] = useState("");
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [permissionsList, setPermissionsList] = useState([])
	const [permissionValues, setPermissionValues] = useState({})
	const [roles, setRoles]: any = useState([])
	const [rolesData, setRolesData]: any = useState([])
	const [selectedRole, setSelectedRole]: any = useState()
	const [showSectionMsg, setShowSectionMsg] = useState(false)
	const [assignObj, setAssignObj]: any = useState()
	const [optionsObj, setOptionObj]: any = useState()
	const [roleName, setRoleName] = useState("")
	const [spinner, setSpinner] = useState(true)
	const [paramRolename, setparamRolename] = useState()
	const [userpermission, setuserPermission] = useState<any>()
	const [activeRole, setActiveRole] = useState()
	const [submitDisable, setSubmitDisable] = useState(true)
	const [hideFooter,setHideFooter] = useState(true)
	let history = useHistory()

	// function clearSearch() {
	// }
	// function onKeyUpValue(e: any) {

	// }
	// function valueChanged(e: any) {

	// }
	const [selectedLabel, setSelectedlabel] = useState({});

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		setSpinner(true)
		getPermission()
		getRole()
	}, [userPermissions])

	function checkPemission(){
		console.log(userPermissions, 'user-management')
		if(checkUserPermissions(userPermissions, 'user-management') === "3"){
			// setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied") 
		}else if(checkUserPermissions(userPermissions, 'user-management') === "1"){
			setHideFooter(false)
		}
	}

	function getPermission() {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.permissionApi,
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setTimeout(() => {
					setSpinner(false)
				}, 1000)
				setPermissionsList(res.data)
			})
	}

	function getRole() {
		const apiObject1: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getRoles,
			headers: { Authorization: token }
		}

		triggerApi(apiObject1)
			.then((res: ApiResponseProps) => {
				setTimeout(() => {
					setSpinner(false)
				}, 1000)
				let resp = res.data.result
				let role: any = [];
				let rolesData: any = {}
				let activeRoleExists = false;
				resp.map((data: any, index: any) => {

					let roleObj = {
						label: data.name,
						key: data._id
					}
					rolesData[data._id] = data;
					role.push(roleObj)

					if (activeRole == data._id) {
						activeRoleExists = true;
						setActiveRole(data._id)
					}
				})
				setRoles(role.reverse())
				setRolesData(rolesData)

				//Get Single Role Data
				if (activeRoleExists) {
					onRoleClick({ key: activeRole })
				} else {
					onRoleClick({ key: role[0].key })
				}
			})
	}



	function onRoleClick(data: any) {

		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getRoles.concat(data.key),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code == 200) {
					setSubmitDisable(true)
					setuserPermission(JSON.stringify(response.data.permission))
					setPermissionValues(response.data.permission);
					setAssignObj(response.data.assign_client_to)
					setRoleName(response.data.name)
					setSelectedRole(response.data)
					setActiveRole(response.data._id)

				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});


		setHeaderLinkactive(data.key)
		let roleId = data.key;
		// setPermissionValues(rolesData[roleId] ? rolesData[roleId].permission : []);
		// setSelectedRole(rolesData[roleId] ? rolesData[roleId] : [])
		setRoleName(data.label)

	}

	const handleSubmit = () => {
		selectedRole.permission = permissionValues;
		selectedRole.id = selectedRole._id
		selectedRole.name = roleName
		let role = selectedRole;
		const apiObject: PayloadProps = {
			payload: selectedRole,
			method: "PUT",
			apiUrl: apiEndpoint.getRoles.concat(selectedRole.id),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setRoleName(res.data.name)
				setActiveRole(res.data._id)
				setSubmitDisable(true)
				setShowSectionMsg(true)
				setTimeout(() => {
					setShowSectionMsg(false)
				}, 4000)
				getRole()
			})
	}
	const handleChange = (data: any) => {

	}
	const roleChange = (e: any) => {
		setparamRolename(e.target.value)
		setRoleName(e.target.value)
	}
	const onCancel = () => {
		getRole()
		setSubmitDisable(true)
	}
	const onPermissionChange = (e: object) => {
		// console.log(JSON.stringify(e))
		// console.log(userpermission)
		if (userpermission == JSON.stringify(e)) {
			setSubmitDisable(true)
		} else {
			setSubmitDisable(false)
		}
	}
	return (
		<UserListContainer className="main">
			<LeftMenu />
			<RightContainer style={{ display: "flex", flex: '1', margin: "0", padding: "0", overflow: "hidden" }}>

				<LeftMenuContainer style={{ width: "460px" }}>
					<RoleTableListContainer   >
						{/* <LeftMenuHeader className="text-center headerBorder">
                            <PiTypography component="h5">Roles</PiTypography>
                        </LeftMenuHeader> */}
						<SideMenuContainer className="menu-list">
							<SideMenuList className={spinner ? 'spinner-container' : ''}>
								{spinner ? <div className="spinner"><PiSpinner color='primary' size={50} /></div> :
									<PiLeftMenu
										activeKey={headerLinkactive}

										onMenuClick={(e) => onRoleClick(e)}
										options={roles}
									/>}
							</SideMenuList>
						</SideMenuContainer>
					</RoleTableListContainer>
				</LeftMenuContainer>
				<PermissionsBox className={"gritwell-select " + (spinner ? 'spinner-container' : '')} >
					<Snackbar
						title="Success"
						appearance="success"
						message="User permissions updated successfully"
						open={showSectionMsg}
						close={() => setShowSectionMsg(false)}
					/>
					{spinner ? <div className="spinner"><PiSpinner color='primary' size={50} /></div> :
						<>
							<div className={hideFooter === true ? "permission-container" : "disablePermission"}>
								<FormFlexWrapper style={{ borderBottom: "1px solid #BBC7CA", padding: "0 0 32px", flexDirection: 'column' }}>
									<FormField className="one-sibling gritwell-input maxW-50" style={{ marginBottom: '16px' }}>
										<label>Role Name</label>
										<input disabled type="text" value={roleName} onChange={roleChange} className="inputCustomHeight" />
									</FormField>
									<FormField className="one-sibling gritwell-select custom-multi-select maxW-50">
										{assignObj && <PiSelect name="assign"
											label="Assign client to"
											placeholder="Assign client to"
											options={optionsObj}
											value={assignObj}
											isMulti={true}
											isDisabled
										/>}
									</FormField>
								</FormFlexWrapper>
								<PiTypography component="h5">Permissions</PiTypography>
								{/* <PiThemeContextProvider value={permissionStyles}> */}
								<div className="permissionslistCustom "  >

									<PiPermissionsList
										inputObject={permissionsList}
										values={permissionValues}
										onValueChange={onPermissionChange}
									/>

								</div>
							</div>
							{/* </PiThemeContextProvider> */}

							{hideFooter ? <FooterDiv style={{ alignItems: "center" }} className={submitDisable ? "hideFooter" : "showFooter"}>
								<PiButton appearance="cancel"
									label="Cancel"
									type='button'
									onClick={() => onCancel()}
									size="extraLarge"
									className="mr-3" />
								<PiButton
									className={"mr-3"}
									appearance="primary"
									label="Save"
									type="submit"
									size="extraLarge"
									// isDisabled={props.isDisable}
									// isLoading={props.isDisable}
									onClick={handleSubmit} />
							</FooterDiv> : ''}
						</>}
				</PermissionsBox>

			</RightContainer>
		</UserListContainer>
	)
}