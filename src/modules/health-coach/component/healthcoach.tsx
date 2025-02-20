import { PiAvatar, PiReactTable, PiSearch } from 'pixel-kit'
import React, { useEffect, useState } from 'react';
import { SalesmangerLeftmenu } from '../../../components/salesmanager-leftmenu';
import { RightContent, SecondaryHeaderContainer, RightContainer, UserListContainer, ClientName, ClientNamePic, ClientID } from '../../../styles/common-styles'
import { triggerApi } from '../.././../services';
import { useHistory } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point';
import { ApiResponseProps, ClientDetailProps, ClientProps, PayloadProps, Permissions } from '../../../core/schema';
import { GridHolder } from '../../../components/login-commonlayout/login-layout-components';
import TableGrid from '../../../components/tablegrid';
import Spinner from '../../../components/spinner'
import { useAppSelector } from '../../../store/hooks';
import { checkUserPermissions } from '../../../core/checkUserPermission'


export default function HealthClients() {
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [searchValue, setSearchValue] = useState("");
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	let [pageNumber, setPageNumber]: any = useState(1);
	let [perPage, setperPage] = useState(20);
	let [sort, setSort]: any = useState("asc");
	let [sortkey, setSortKey] = useState('username');
	let [noOfPages, setNoOfPages]: any = useState(0);
	const [userCount, setUserCount] = useState(0)
	const [showCount, setShowCount] = useState(false)
	const [clientData, setClientData] = useState([]);
	const [isSearch, setIsSearch] = useState(false)
	let clientObj: any = {};
	let clientUsers: any = [];
	let history = useHistory()
	const [hasMore, setHasMore] = useState(true)
	const [showSpinner, setShowSpinner] = useState(false)

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		setShowSpinner(true)
		getClientsList()
	}, [userPermissions])
	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
	}

	function checkPemission(){
		if(checkUserPermissions(userPermissions, 'list-myclients') != true){
			setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied")
		}
	}

	function onPageChanged(e: number) {
		// console.log(e);
	}
	function clearSearch() {
		pageNumRefresh();
		setSearchValue("");
		setClientData([])
		getClientsList({ clearSearch: true });
	}
	function onKeyUpValue(e: any) {
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2 || isSearch) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				getClientsList();
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
				getClientsList();
			}
		}
	}
	


	const getClientsList = (params: any = {}) => {
		let search = params.clearSearch ? '' : searchValue;
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
				setUserCount(res.data.count)
				setTimeout(() => {
					setShowCount(true)
					setShowSpinner(false)
				}, 1000)
				res.data.result.map((data: ClientProps) => {
					clientObj = {
						id: data._id,
						username: data.first_name + ' ' + data.last_name,
						clientId: data.gwc_client_id,
						hcData: data.hc_assignment.first_name + ' ' + data.hc_assignment.last_name,
						combinedName: data.first_name.slice(0, 1) + '' + data.last_name.slice(0, 1),
						imgUrl: data.hc_assignment && data.hc_assignment ? data.hc_assignment.display_url : '',
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
				console.log(err, "Error");
			});
	}
	async function fetchMoreData() {
		if (hasMore) {
			await pageUpdate()
			getClientsList({ isScroll: true })
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
	const onSortClick = async (e: any) => {
		await setSortPros(e)
	}

	async function setSortPros(e: any) {
		pageNumRefresh()
		await setSortKey(e.accessor)
		await setSort(e.sortDirection)
		console.log(e)
		getClientsList({ sortKey: e.accessor, sortDirection: e.sortDirection })
		// console.log(e.sortDirection)
	}
	return (
		<UserListContainer className="main">
			<SalesmangerLeftmenu />
			<RightContainer>
				<div className="inner-container">
					<div>
						<SecondaryHeaderContainer>
							<RightContent>
								<div>
									{showCount && <div>
										<p>My Active Clients ({userCount})</p>
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

					<GridHolder className="spinner-container">
						{showSpinner && <Spinner />}
						{/* {spinner ? <PiSpinner color='primary' size={50} /> : */}
						<>
							{userCount && !showSpinner ? <TableGrid>
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
											// maxWidth: 70,
											// width: '70px',
											Cell: (props: any) => {
												return <ClientName onClick={() => onClientClick(props.row.original)}>
													<div><span className="alphaProfile">{props.row.original.combinedName}</span></div>
													<span className="clientName"> {props.value} </span>

												</ClientName>
											}
										},
										{
											Header: 'Client ID',
											accessor: 'clientId',
											// maxWidth: 70,
											// minWidth: 70,
											Cell: (props: any) => {
												return <ClientID onClick={() => onClientClick(props.row.original)}>
													{props.value}

												</ClientID>
											}
										},
										{
											Header: 'Health Coach',
											accessor: 'hcData', // accessor is the "key" in the data
											// maxWidth: 70,
											// minWidth: 70,
											Cell: (props: any) => {
												return <ClientNamePic onClick={() => onClientClick(props.row.original)} className="d-flex align-items-center ">

													<div className="pictureProfile">
														{props.row.original.imgUrl ? <PiAvatar
															appearance="circle"
															onClick={function noRefCheck() { }}
															// size="54"
															src={props.row.original.imgUrl ? props.row.original.imgUrl : ''}
														/> : <span className="clientName" style={{ color: "#717171" }} >Pending</span>}
													</div>
													<span className="clientName">{props.value}</span>

												</ClientNamePic>
											}
										}
									]}
								/>

							</TableGrid> : <> {!showSpinner && <div className="noUser">No clients to show</div>}</>}
						</>
						{/* } */}
					</GridHolder>
				</div>

			</RightContainer>

		</UserListContainer>
	)
}



