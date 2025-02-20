import { PiAvatar, PiLozenge, PiReactTable, PiSearch } from 'pixel-kit'
import React, { useEffect, useContext, useState } from 'react'
// import { useLocation } from "react-router-dom"
import { GridHolder } from '../../../components/login-commonlayout/login-layout-components'
import { RightContent, SecondaryHeaderContainer, RightContainer, UserListContainer, ClientID, ClientName, ClientNamePic } from '../../../styles/common-styles'
import TableGrid from '../../../components/tablegrid'
import { triggerApi } from '../../../services'
import { getLocalStorage, setLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, ClientDetailProps, PayloadProps, ClientProps } from '../../../core/schema'
import { useHistory } from 'react-router-dom';
import { SalesmangerLeftmenu } from '../../../components/salesmanager-leftmenu'
import { AuthContext } from "../../../providers/auth";
import Spinner from '../../../components/spinner';
import { Icon } from '../../../components'

import { useAppSelector } from '../../../store/hooks';
import { checkUserPermissions } from '../../../core/checkUserPermission'

export default function Clients() {
	const userPermissions:any = useAppSelector((state) => state.globalData.permissions);
	const [searchValue, setSearchValue] = useState("");
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	let [pageIndex, setPageIndex] = useState(0);
	let [pageNumber, setPageNumber]: any = useState(1);
	let [noOfPages, setNoOfPages]: any = useState(0);
	let [perPage, setperPage] = useState(20);
	let [sort, setSort]: any = useState("asc");
	let [sortkey, setSortKey] = useState('username');
	// const [spinner, setSpinner] = useState(true)
	const [showCount, setShowCount] = useState(false)
	const [userCount, setUserCount] = useState()
	const [isSearch, setIsSearch] = useState(false)
	const [clientData, setClientData] = useState([]);
	const [hasMore, setHasMore] = useState(true)
	let history = useHistory()
	const { userInfo } = useContext(AuthContext);
	const [showSpinner, setShowSpinner] = useState(false)

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		setShowSpinner(true)
		setSort("asc")
		setSortKey('first_name')
		setperPage(20)
	}, [userPermissions])

	function checkPemission(){
		if(checkUserPermissions(userPermissions, 'list-myclients') !== true){
			console.log(userPermissions.length)
			setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied")
		}

		
	}

	function onKeyUpValue(e: any) {
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2 || isSearch) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				getUsersList();
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
		setClientData([])
		getUsersList({ clearSearch: true });
	}

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		getUsersList();
	}, [userPermissions])

	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
	}

	const getUsersList = (params: any = {}) => {
		let search = params.clearSearch ? '' : searchValue;
		let page = pageNumber;
		if (params.clearSearch || params.clearPageNumber) {
			page = 1;
		}
		let sortk = sortkey;
		let sortDirection = sort;
		if (params.sortKey) {
			page = 1;
			sortk = (params.sortDirection == 'none') ? 'username' : params.sortKey;
			sortDirection = (params.sortDirection == 'none') ? 'asc' : params.sortDirection;
		}
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getClients.concat("?search=" + search + "&page=" + page + "&perPage=" + perPage + "&sort=" + sortDirection + "&column=" + sortk + "&status="),
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				calculateNumOfPages(res.data.count)
				setUserCount(res.data.count);
				setTimeout(() => {
					setShowCount(true)
					setShowSpinner(false)
				}, 1000)
				let clientUsers: any = [];
				let clientObj: object = {};
				res.data.result.map((data: ClientProps) => {
					clientObj = {
						id: data._id,
						username: data.first_name + ' ' + data.last_name,
						clientId: data.gwc_client_id,
						hcData: (data.hc_assignment.first_name ? data.hc_assignment.first_name : '') + ' ' + (data.hc_assignment.last_name ? data.hc_assignment.last_name : ''),
						mdData: (data.md_assignment.first_name ? data.md_assignment.first_name : '') + ' ' + (data.md_assignment.last_name ? data.md_assignment.last_name : ''),
						hcImgUrl: data.hc_assignment && data.hc_assignment ? data.hc_assignment.display_url : '',
						mdImgUrl: data.hc_assignment && data.md_assignment ? data.md_assignment.display_url : "",
						combinedName: data.first_name.slice(0, 1) + '' + data.last_name.slice(0, 1),
						date: "Mar 12, 2022",
					}
					clientUsers.push(clientObj)

				})
				if (params.isScroll && params.isScroll == true) {
					setClientData(clientData.concat(clientUsers))
				} else {
					setClientData(clientUsers)
					if (clientUsers.length < perPage) {
						setHasMore(false)
					}
				}


			})
			.catch((err: object) => {
				console.log(err, "Error", typeof (err));
			});
	}
	async function onPageChanged(e: number) {
		alert(1)
		let num = e;
		let pgIndex = e - 1;
		pageNumber = num;
		setPageIndex(pgIndex);
		setPageNumber(pageNumber);
		getUsersList();
	}
	async function fetchMoreData() {
		if (hasMore) {
			await pageUpdate()
			getUsersList({ isScroll: true })
			if (pageNumber === noOfPages) {
				setHasMore(false)
			}
		} else {
			return;
		}
	}
	async function pageUpdate() {
		// alert(2)
		setPageNumber(++pageNumber)
	}
	function pageNumRefresh() {
		setHasMore(true)
		setPageNumber(1)
	}

	const onClientClick = (data: ClientDetailProps) => {
		if(checkUserPermissions(userPermissions, 'edit-clients') === true){
			history.replace(`/office/client/${data.id}`)
		}
	}
	// const tableData = React.useMemo(() => clientData, [clientData]);
	const tableData = clientData;
	const onSortClick = async (e: any) => {
		await setSortPros(e)
	}

	async function setSortPros(e: any) {
		pageNumRefresh()
		await setSortKey(e.accessor)
		await setSort(e.sortDirection)
		console.log(e)
		getUsersList({ sortKey: e.accessor, sortDirection: e.sortDirection })
		// console.log(e.sortDirection)
	}
	return (
		<UserListContainer className="main">
			<SalesmangerLeftmenu />
			<RightContainer >
				<div className="inner-container">
					<div>
						<SecondaryHeaderContainer >
							<RightContent>
								<div>
									{showCount && <div>
										<p>My Active Clients ({userCount ? userCount : 0})</p>
									</div>}
								</div>
								<div className="searchBlock">
									<PiSearch
										libraryType="atalskit"
										onClear={clearSearch}
										onKeyUp={(e: any) => onKeyUpValue(e)}
										onValueChange={e => valueChanged(e)}
										placeholder="Search Clients"
										value={searchValue}
									/>
								</div>
							</RightContent>
						</SecondaryHeaderContainer>
					</div>
					<GridHolder >
						{showSpinner && <Spinner />}
						{/* {spinner ? <div className="spinner"><PiSpinner color='primary' size={50} /> </div> :  */}
						<>
							{userCount && !showSpinner ? <TableGrid>
								<>
									{(userInfo.code === "sales_manager") &&
										<PiReactTable
											pages={10}
											selectedIndex={1}
											infinitescroll={true}
											fetchMoreData={fetchMoreData}
											onPageChange={(e: any) => onPageChanged(e)}
											tableData={clientData}
											hasMore={hasMore}
											onSortClick={onSortClick}
											column={[
												{
													Header: 'Client',
													accessor: 'username', // accessor is the "key" in the data
													// maxWidth: 50,
													// minWidth: 30,
													Cell: (props: any) => {
														return <>
															<ClientName onClick={() => onClientClick(props.row.original)}>
																<div><span className="alphaProfile">{props.row.original.combinedName}</span></div>
																<span className="clientName truncate"> {props.value} </span>
															</ClientName>

														</>
													}
												},
												{
													Header: 'Client ID',
													accessor: 'clientId',
													// maxWidth: 70,
													// Width: 50,
													Cell: (props: any) => {
														return <>
															<ClientID onClick={() => onClientClick(props.row.original)}>{props.value}</ClientID>

														</>
													}
												},
												{
													Header: 'Health Coach',
													accessor: 'hcData', // accessor is the "key" in the data
													// maxWidth: 30,
													// minWidth: 20,
													Cell: (props: any) => {
														return <ClientNamePic onClick={() => onClientClick(props.row.original)} className="d-flex align-items-center ">

															<div className="pictureProfile">
																{props.row.original.hcImgUrl ? <PiAvatar
																	appearance="circle"
																	onClick={function noRefCheck() { }}
																	// size="54"
																	src={props.row.original.hcImgUrl ? props.row.original.hcImgUrl : ''}
																// href="/"
																/> : <div className="d-flex align-items-center"> <Icon name="pendingicon" />&nbsp; <span className="clientName" style={{ color: "#717171" }}>Pending</span></div>}
															</div>
															<span className="clientName truncate">{props.value}</span>

														</ClientNamePic>
													}
												},
												{
													Header: 'Requested match on',
													accessor: 'date', // accessor is the "key" in the data
													// maxWidth: 70,
													// minWidth: 70,
													Cell: (props: any) => {
														return <ClientID onClick={() => onClientClick(props.row.original)}>
															Feb 18, 2022
                                                </ClientID>
													}
												},
												{
													Header: 'Status',
													accessor: 'status', // accessor is the "key" in the data
													// maxWidth: 70,
													// minWidth: 70,
													Cell: (props: any) => {
														return <div style={{ cursor: "pointer" }} onClick={() => onClientClick(props.row.original)}>
															<PiLozenge
																maxWidth="100px"
																appearance='success'
															>
																Subscriber
                                                       </PiLozenge>

														</div>
													}
												},
											]}
										/> ||

										(userInfo.code === "admin" || "care_manager") && <PiReactTable
											pages={10}
											selectedIndex={1}
											infinitescroll={true}
											fetchMoreData={fetchMoreData}
											onPageChange={(e: any) => onPageChanged(e)}
											tableData={tableData}
											hasMore={hasMore}
											scrollableTarget="scrollableDiv"
											onSortClick={onSortClick}
											column={[
												{
													Header: 'Client',
													accessor: 'username', // accessor is the "key" in the data
													// maxWidth: 70,
													disableSortBy: false,
													// width: '70px',
													Cell: (props: any) => {
														return <>
															<ClientName onClick={() => onClientClick(props.row.original)}>
																<div><span className="alphaProfile">{props.row.original.combinedName}</span></div>
																<span className="clientName"> {props.value} </span>
															</ClientName>

														</>
													}
												},
												{
													Header: 'Client ID',
													accessor: 'clientId',
													disableSortBy: false,
													// maxWidth: 70,
													// minWidth: 70,
													Cell: (props: any) => {
														return <ClientID onClick={() => onClientClick(props.row.original)}>
															<span className="clientName">{props.value}</span>

														</ClientID>
													}
												},
												{
													Header: 'Health Coach',
													accessor: 'hcData',
													// maxWidth: 70,
													// minWidth: 70,
													Cell: (props: any) => {
														return <ClientNamePic onClick={() => onClientClick(props.row.original)} className="d-flex align-items-center ">
															<div className="pictureProfile">
																{props.row.original.hcImgUrl ? <PiAvatar
																	appearance="circle"
																	onClick={function noRefCheck() { }}
																	// size="54"
																	src={props.row.original.hcImgUrl}
																/> : <div className="d-flex align-items-center"> <Icon name="pendingicon" /> &nbsp;  <span className="clientName" style={{ color: "#717171" }}>Pending</span> </div>}
															</div>
															<span className="clientName" > {props.value} </span>

														</ClientNamePic>
													}
												},
												{
													Header: 'MD',
													accessor: 'mdData',
													// maxWidth: 70,
													// minWidth: 70,
													Cell: (props: any) => {
														return <ClientNamePic onClick={() => onClientClick(props.row.original)} className="d-flex align-items-center ">
															<div className="pictureProfile">
																{props.row.original.mdImgUrl ? <PiAvatar
																	appearance="circle"
																	onClick={function noRefCheck() { }}
																	// size="54"
																	src={props.row.original.mdImgUrl}
																/> : <div className="d-flex align-items-center"> <Icon name="pendingicon" />&nbsp; <span className="clientName" style={{ color: "#717171" }}>Pending</span> </div>}
															</div>
															<span className="clientName" >  {props.value} </span>

														</ClientNamePic>
													}
												},
											]}
										/>
									}


								</>
							</TableGrid> : <> {!showSpinner && <div className="noUser">No clients to show</div>}</>}
						</>
						{/* } */}
					</GridHolder>
				</div>
			</RightContainer>
		</UserListContainer>
	)
}