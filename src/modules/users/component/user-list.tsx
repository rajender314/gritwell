import { PiAvatar, PiButton, PiReactTable, PiSearch, PiSideDrawer } from 'pixel-kit'
import React, { useEffect, useState } from 'react'
import { GridHolder } from '../../../components/login-commonlayout/login-layout-components'
import { RightContent, SecondaryBtn, SecondaryHeaderContainer, SideDrawerHolder, RightContainer, UserListContainer, ClientID, ClientNamePic } from '../../../styles/common-styles'
import TableGrid from '../../../components/tablegrid'
import AddUser from './add-user'
import { triggerApi } from '../../../services'
import LeftMenu from '../../../components/leftMenu/leftmenu'
import { getLocalStorage, setLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point';
import { ApiResponseProps, PayloadProps,Permissions } from '../../../core/schema';
import Spinner from '../../../components/spinner'
import { Icon } from '../../../components'
import { useAppSelector } from '../../../store/hooks';
import { checkUserPermissions } from '../../../core/checkUserPermission'
import { useHistory } from 'react-router';

export default function UserList() {
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [searchValue, setSearchValue] = useState("");
	const [userModal, showUserModal] = useState(false)
	const [addUserModal, showAddUserModal] = useState(false)
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [userName, setuserName] = useState('')
	const [initialValue, setInitaialValues] = useState()
	const [userId, setuserId] = useState()
	let [pageNumber, setPageNumber] = useState(1);
	let [noOfPages, setNoOfPages] = useState(0);
	let [perPage, setPerpage] = useState(20);
	let [sort, setSort] = useState("asc");
	let [sortkey, setSortkey] = useState('username');
	// const [spinner, setSpinner] = useState(true)
	const [isSearch, setIsSearch] = useState(false)
	const [userCount, setUserCount] = useState(0)
	const [filename, setFilename] = useState()
	const [originalFile, setOriginalFile] = useState()
	const [showCount, setShowCount] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [adminData, setAdminData] = useState([]);
	const [showSpinner, setShowSpinner] = useState(false)
	const [editSpecialist, setEditSpecialists] = useState([])
	const [hideButton,setHideButton] = useState(true)
	let history = useHistory()

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		setShowSpinner(true)
		setSort("asc")
		setSortkey('first_name')
		setPerpage(20)
	}, [userPermissions])
	function checkPemission(){
		// console.log(userPermissions, 'user-management')
		if(checkUserPermissions(userPermissions, 'user-management') === "3"){
			// alert(2)
			
			// setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied") 
		}else if((checkUserPermissions(userPermissions, 'user-management') === "1")){
			// alert(1)
			setHideButton(false)
			// showAddUserModal(false)
		}
	}

	function onKeyUpValue(e: any) {
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2 || isSearch) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				getUsersList({ clearPageNumber: true });

			}
			if (e.target.value.length > 1) {
				setIsSearch(true)
			}
			if (e.target.value.length < 1) {
				setIsSearch(false)
			}
		}
	}
	function valueChanged(e: any) {
		setSearchValue(e.target.value);
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				getUsersList();
			}
		}
	}

	function clearSearch() {
		pageNumRefresh();
		setSearchValue("");
		setAdminData([])
		getUsersList({ clearSearch: true });
	}

	async function getUser(data: any) {
		if(hideButton === false) return
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.addUsersApi.concat(data),
			headers: { Authorization: token }
		}
		await triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code === 200) {
					let user = response.data;
					setuserName(user.first_name + ' ' + user.last_name)
					getInitialValues(user)
					setuserId(data)
					setFilename(user.img_name ? user.display_url : '')
					setOriginalFile(user.img_name)
				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});
		showUserModal(true)
	}

	const getInitialValues = (data: any) => {
		let status = data.status === true ?
			{ label: 'Active', value: true } : { label: 'Inactive', value: false, profile_pic: '' }

		let roleObject = {
			value: data.role_id,
			label: data.role_name
		}
		let experience: any = []
		if (data.experience) {
			experience = {
				_id: data.experience._id ? data.experience._id : '',
				label: data.experience.label ? data.experience.label : '',
				name: data.experience.name ? data.experience.name : ''
			}
		}
		let profile_pic = data.img_name ? data.display_url : '';

		let weekday = {};
		data.day_of_the_week && data.day_of_the_week.map((data: any) => {
			weekday = {
				value: data._id,
				label: data.label
			}
		})
		let timezone: any = []
		timezone = {
			code: data.time_zone && data.time_zone.code ? data.time_zone.code : '',
			gmt_offset: data.time_zone && data.time_zone.gmt_offset ? data.time_zone.gmt_offset : '',
			label: data.time_zone && data.time_zone.label ? data.time_zone.label : '',
			name: data.time_zone && data.time_zone.name ? data.time_zone.name : '',
			_id: data.time_zone && data.time_zone._id ? data.time_zone._id : '',
			utc_offset: data.time_zone && data.time_zone.utc_offset ? data.time_zone.utc_offset : '',
			value: data.time_zone && data.time_zone.value ? data.time_zone.value : '',
		}

		// let time_zone = {
		//     code: data.time_zone && data.time_zone.code ? data.time_zone.code : '',
		//     gmt_offset: data.time_zone && data.time_zone.gmt_offset ? data.time_zone.gmt_offset : '',
		//     label: data.time_zone && data.time_zone.label ? data.time_zone.label : '',
		//     name: data.time_zone && data.time_zone.name ? data.time_zone.name : '',
		//     _id: data.time_zone && data.time_zone._id ? data.time_zone._id : '',
		//     utc_offset: data.time_zone && data.time_zone.utc_offset ? data.time_zone.utc_offset : '',
		//     value: data.time_zone && data.time_zone.value ? data.time_zone.value : '',
		// }

		let specialists: any = [];
		data.specialists && data.specialists.map((data: any) => {
			specialists.push(data)
			// console.log(data._id)
			// specialists = {
			//     value: data._id,
			//     label: data.label
			// }
		})
		setEditSpecialists(specialists)
		setInitaialValues({
			firstName: data.first_name,
			lastName: data.last_name,
			email: data.email,
			phone: data.phone,
			status: status,
			roleName: roleObject,
			zoom_link: data.zoom_link,
			qualifications: data.qualifications,
			// available_hours: data.available_hours,
			background: data.background,
			allocation: data.allocation,
			experience: experience,
			profile_pic: profile_pic,
			day_of_the_week: weekday,
			time_zone: timezone,
			// specialists: specialists
		} as any)
	}



	useEffect(() => {
		getUsersList();
	}, [])

	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
	}

	const getUsersList = (params: any = {}) => {
		let page = pageNumber;
		if (params.clearSearch || params.clearPageNumber) {
			page = 1;
			setHasMore(true)
			pageNumRefresh()
			setUserCount(0)
		}
		let sortk = sortkey;
		let sortDirection = sort;
		if (params.sortKey) {
			page = 1;
			sortk = (params.sortDirection == 'none') ? 'username' : params.sortKey;
			sortDirection = (params.sortDirection == 'none') ? 'asc' : params.sortDirection;
		}
		// setSpinner(true)
		let search = params.clearSearch ? '' : searchValue;
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.addUsersApi.concat("?search=" + search + "&page=" + page + "&perPage=" + perPage + "&sort=" + sortDirection + "&column=" + sortk + "&status="),
			headers: {
				Authorization: token
			}
		};


		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				calculateNumOfPages(res.data.count)
				setTimeout(() => {
					setShowSpinner(false)
					setShowCount(true)
				}, 1000)
				setUserCount(res.data.count);
				let adminObj: any = {};
				let adminUsers: any = [];
				res.data.result.map((data: any) => {
					adminObj = {
						id: data._id,
						username: data.first_name + ' ' + data.last_name,
						roleName: data.role_name,
						status: data.status,
						email: data.email,
						imgUrl: data.display_url,
						data: data
					}
					adminUsers.push(adminObj)
				})
				if (params.isScroll && params.isScroll == true) {
					setAdminData(adminData.concat(adminUsers))
				} else {
					setAdminData(adminUsers)
					if (adminUsers.length < perPage) {
						setHasMore(false)
					}
				}


			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		status: { label: 'Active', value: true },
		roleName: ''
	}
	async function fetchMoreData() {
		// setPageNumber(pageNumber + 1)
		// alert(pageNumber)
		if (hasMore) {
			await pageUpdate();
			getUsersList({ isScroll: true })
			if (pageNumber === noOfPages) {
				setHasMore(false)
			}
		} else {
			return;
		}
	}
	async function pageUpdate() {
		setPageNumber(++pageNumber)
	}
	function pageNumRefresh() {
		setHasMore(true)
		setPageNumber(1)
	}
	const tableData = React.useMemo(() => adminData, [adminData]);
	const onSortClick = async (e: any) => {
		await setSortPros(e)
	}

	async function setSortPros(e: any) {
		pageNumRefresh()
		await setSortkey(e.accessor)
		await setSort(e.sortDirection)
		console.log(e)
		getUsersList({ sortKey: e.accessor, sortDirection: e.sortDirection })
		// console.log(e.sortDirection)
	}
	return (
		<UserListContainer className="main">
			<LeftMenu />
			<RightContainer>
				<div className="inner-container">

					<SecondaryHeaderContainer>

						<RightContent>
							<div>
								{showCount && <div>
									<p>Users ({userCount ? userCount : 0})</p>
								</div>}
							</div>
							<div className="searchBlock">
								<PiSearch
									libraryType="atalskit"
									onClear={clearSearch}
									onKeyUp={(e: any) => onKeyUpValue(e)}
									onValueChange={e => valueChanged(e)}
									placeholder="Search User"
									value={searchValue}
								/>
							{hideButton ?	<SecondaryBtn>
									<PiButton
										appearance="primary"
										label="Add User"
										type="button"
										libraryType="atalskit"
										size="extraLarge"
										// iconBefore={<Icon name="plusicon" />}
										onClick={() => showAddUserModal(true)}
										className="ml-2 gritwell-btn "
									/>
								</SecondaryBtn> : ''}
							</div>
						</RightContent>
					</SecondaryHeaderContainer>

					<SideDrawerHolder>
						<PiSideDrawer isOpen={userModal}
							onClose={() => showUserModal(false)}
							width="medium"
							onBackdropClose={() => showUserModal(false)}
							onCloseComplete={() => ('')}
						>
							{userModal && <AddUser
								header={userName}
								close={userModal}
								showUserModal={showUserModal}
								initialValues={initialValue}
								userId={userId}
								onClick={() => getUsersList({ clearSearch: true })}
								resetLink="Send password reset link"
								fileName={filename}
								originalFile={originalFile}
								specialists={editSpecialist}
							/>}

						</PiSideDrawer>

					</SideDrawerHolder>

					<SideDrawerHolder>
						<PiSideDrawer isOpen={addUserModal}
							onClose={() => showUserModal(false)}
							width="medium"
							onBackdropClose={() => showAddUserModal(false)}
							onCloseComplete={() => ('')}
						>
							{addUserModal && <AddUser
								header="Add User"
								close={addUserModal}
								showUserModal={showAddUserModal}
								initialValues={initialValues}
								onClick={() => getUsersList({ clearSearch: true })}
							/>}
						</PiSideDrawer>
					</SideDrawerHolder>
					<GridHolder >
						{showSpinner && <Spinner />}
						{/* {userCount == 0 ? <PiSpinner color='primary' size={50} /> : */}
						<>
							{userCount > 0 && !showSpinner ? <TableGrid>
								<PiReactTable
									pages={10}
									selectedIndex={1}
									infinitescroll={true}
									fetchMoreData={fetchMoreData}
									onPageChange={(e: any) => console.log(e)}
									onSortClick={onSortClick}
									tableData={tableData}
									hasMore={hasMore}
									scrollableTarget="scrollableDiv"
									column={[
										{
											Header: 'User',
											accessor: 'username', // accessor is the "key" in the data
											// maxWidth: 70,
											// width: '70px',
											Cell: (props: any) => {
												return <>
													<ClientNamePic onClick={() => getUser(props.row.original.id)} className="d-flex align-items-center ">
														<div className="pictureProfile custom-width58">
															<PiAvatar
																appearance="circle"
																onClick={function noRefCheck() { }}
																// size="54"
																src={props.row.original.imgUrl}
															/>
														</div>
														<div className="clientNameGroup">
															<p className="clientName truncate" > {props.value} </p>
															{/* <p className="clientName">{props.row.original.email}</p> */}
														</div>
													</ClientNamePic>

												</>
											}
										},
										{
											Header: 'User Email',
											accessor: 'useremail',
											// maxWidth: 70,
											// minWidth: 70,
											Cell: (props: any) => {
												return <ClientNamePic onClick={() => getUser(props.row.original.id)}>
													<p className="clientName truncate">{props.row.original.email}</p>

												</ClientNamePic>
											}
										},
										{
											Header: 'Role',
											accessor: 'roleName',
											// maxWidth: 70,
											// minWidth: 70,
											Cell: (props: any) => {
												return <>
													<ClientID onClick={() => getUser(props.row.original.id)} className="clientName truncate" >{props.value}</ClientID>

												</>
											}
										},
										{
											Header: 'Status',
											accessor: 'status',
											// maxWidth: "60px",
											// width: "60px",
											Cell: (props: any) => {
												return <div onClick={() => getUser(props.row.original.id)} >
													<p className=" cursor-pointer d-flex align-items-center activeStatus textColorNeutral400">	{props.value === true ? <> <Icon name="activeIcon" /> Active </> : <><Icon name="inactiveIcon" /> Inactive</>}</p>
												</div>

											}
										},
									]}
								/>


							</TableGrid> : <> {!showSpinner && <div className="noUser">No users to show</div>}</>}
						</>
						{/* } */}
					</GridHolder>
				</div>
			</RightContainer>

		</UserListContainer>
	)
}