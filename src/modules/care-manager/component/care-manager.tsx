import { PiAvatar, PiReactTable, PiSearch } from 'pixel-kit'
import React, { useEffect, useState } from 'react';
import { SalesmangerLeftmenu } from '../../../components/salesmanager-leftmenu';
import { RightContent, SecondaryHeaderContainer, RightContainer, UserListContainer, ClientName, ClientNamePic, ClientID } from '../../../styles/common-styles'
import { triggerApi } from '../.././../services';
import { useHistory } from 'react-router-dom';
import { getLocalStorage } from '../../../core/localStorageService';
import { ApiResponseProps, ClientDetailProps, PayloadProps } from '../../../core/schema';
import { GridHolder } from '../../../components/login-commonlayout/login-layout-components';
import TableGrid from '../../../components/tablegrid';
import apiEndpoint from '../../../core/apiend_point';


export default function CaremanagerClients() {
	const [spinner, setSpinner] = useState(false)
	const [searchValue, setSearchValue] = useState("");
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	let [pageNumber, setPageNumber]: any = useState(1);
	let [perPage, setperPage] = useState(20);
	let [sort, setSort]: any = useState("asc");
	let [sortkey, setSortKey] = useState('first_name');
	const [userCount, setUserCount] = useState(0)
	const [showCount, setShowCount] = useState(false)
	const [clientData, setClientData] = useState([]);
	const [isSearch, setIsSearch] = useState(false)
	let clientObj: any = {};
	let clientUsers: any = [];
	let history = useHistory()
	const [hasMore, setHasMore] = useState(true)
	let [noOfPages, setNoOfPages]: any = useState(0);

	function onPageChanged(e: number) {
		console.log(e);
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
	useEffect(() => {
		getClientsList()
	}, [])

	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
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
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getClients.concat("?search=" + search + "&page=" + page + "&perPage=" + perPage + "&sort=" + sort + "&column=" + sortkey + "&status="),
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setUserCount(res.data.count)
				calculateNumOfPages(res.data.count)
				setTimeout(() => {
					setSpinner(false)
					setShowCount(true)
				}, 100)
				res.data.result.map((data: any) => {
					clientObj = {
						id: data._id,
						username: data.first_name + ' ' + data.last_name,
						clientId: data.gwc_client_id,
						hcData: (data.hc_assignment.first_name ? data.hc_assignment.first_name : '') + ' ' + (data.hc_assignment.last_name ? data.hc_assignment.last_name : ''),
						mdData: (data.md_assignment.first_name ? data.md_assignment.first_name : '') + ' ' + (data.md_assignment.last_name ? data.md_assignment.last_name : ''),
						combinedName: data.first_name.slice(0, 1) + '' + data.last_name.slice(0, 1),
						hcImgUrl: data.hc_assignment && data.hc_assignment ? data.hc_assignment.display_url : '',
						mdImgUrl: data.md_assignment && data.md_assignment ? data.md_assignment.display_url : '',
					}
					clientUsers.push(clientObj)

				})
				setClientData(clientUsers)
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
		history.replace(`/office/client/${data.id}`)
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
						{/* {spinner ? <PiSpinner color='primary' size={50} /> : */}
						<>
							{userCount ? <TableGrid>
								<PiReactTable
									pages={10}
									selectedIndex={1}
									infinitescroll={true}
									fetchMoreData={fetchMoreData}
									onPageChange={(e: any) => onPageChanged(e)}
									tableData={clientData}
									hasMore={hasMore}
									onSortClick={(e:object) => {console.log(e)}}
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
													<span className="clientName">{props.value}</span>
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
														{props.row.original.hcImgUrl ? <PiAvatar
															appearance="circle"
															onClick={function noRefCheck() { }}
															// size="54"
															src={props.row.original.hcImgUrl}
														/> : <span className="clientName" style={{ color: "#717171" }} >Pending</span>}
													</div>
													<span className="clientName">{props.value}</span>

												</ClientNamePic>
											}
										},
										{
											Header: 'MD',
											accessor: 'mdData', // accessor is the "key" in the data
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
														/> : <span className="clientName" style={{ color: "#717171" }} >Pending</span>}
													</div>
													<span className="clientName">{props.value}</span>

												</ClientNamePic>
											}
										},
									]}
								/>
							</TableGrid> : <div className="noUser">No clients to show</div>}
						</>
						{/* } */}
					</GridHolder>
				</div>

			</RightContainer>
		</UserListContainer>
	)
}



