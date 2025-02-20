import React, { useEffect, useState } from 'react'
import LeftMenu from '../../../../components/leftMenu';
import { GridHolder } from '../../../../components/login-commonlayout/login-layout-components';
import apiEndpoint from '../../../../core/apiend_point';
import { getLocalStorage, setLocalStorage } from '../../../../core/localStorageService';
import { ApiResponseProps, PayloadProps, SortProps, Permissions } from '../../../../core/schema';
import { triggerApi } from '../../../../services';
import { RightContainer, SideDrawerHolder, SupplementLink, UserListContainer } from '../../../../styles/common-styles';
import { PiButton, PiDrawerHeader, PiRecomendationsHeader, PiRecomendationsUpload, PiSideDrawer } from 'pixel-kit';
import { PiNoRecomendations } from 'pixel-kit';
import Spinner from '../../../../components/spinner'
import { FooterDiv } from '../../../users/component/add-user-components';
import axios from 'axios'; import { Icon } from '../../../../components';
import EditRecommendation from "./edit-recomendation";
import { DateFormats } from '../../../../core/dateFormats';
import { useAppSelector } from '../../../../store/hooks';
import { checkUserPermissions } from '../../../../core/checkUserPermission'
import { useHistory } from 'react-router';


export default function Testing() {
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [searchValue, setSearchValue] = useState("");
	let [pageNumber, setPageNumber]: any = useState(1);
	let [perPage, setperPage] = useState(20);
	let [sort, setSort]: any = useState("asc");
	let [sortkey, setSortKey] = useState('name');
	const [testCount, setTestCount] = useState<any>()
	const [testData, setTestData] = useState([]);
	const [isSearch, setIsSearch] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	let [noOfPages, setNoOfPages] = useState(0);
	const [showSpinner, setShowSpinner] = useState(false)
	const noBearerToken = token?.split("Bearer ")[1]
	const [openUploader, setOpenUploader] = useState(false)
	const [file, setFile] = useState<any>([])
	const [uploadingMsg, setUploadingMsg] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const [headerUploadText, setUploaderText] = useState("Upload")
	const [isUploadSuccess, setIsUploadSuccess] = useState(false)
	const [isUploadFail, setIsUploadFail] = useState(false)
	const [btnDisable, setBtnDisable] = useState(true)
	const [uploadbtnText, setUploadbtnText] = useState("Upload")
	const [progress, setProgress] = useState<any>(0)
	const apiBaseUrl = process.env.REACT_APP_API_URL;
	const [refreshCom, setRefreshCom] = useState(false)
	const [initialValue, setInitaialValues] = useState()
	const [recomendationModal, showRecomendationModal] = useState(false)
	const [userId, setuserId] = useState()
	const [addRecomendationModal, showAddRecomendationModal] = useState(false)
	const [activity, setActivity] = useState<any>()
	const [successMsg, setSuccessMsg] = useState('')
	const userPermissions:Permissions[] = useAppSelector((state) => state.globalData.permissions);
	const [hideUpload,setHideUpload] = useState(false);
	const [hideDownload,setHideDownload] = useState(false);
	const [hideAdd,setHideAdd] = useState(false);
	const [hideEdit,setHideEdit] = useState(false)
	let history = useHistory()

	useEffect(() => {
		if(userPermissions.length > 0){
			checkPemission();
		}
		setShowSpinner(true)
		testing()
	}, [userPermissions])

	function checkPemission(){
		if(checkUserPermissions(userPermissions, 'list-tests') != true){
			setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied")
		}
		if(checkUserPermissions(userPermissions, 'edit-tests') === true){
			setHideEdit(true)
			setHideAdd(true)
			showRecomendationModal(false)
			showAddRecomendationModal(false)
		}
		if(checkUserPermissions(userPermissions, 'import-tests') === true){
			setHideDownload(true)
		}
		if(checkUserPermissions(userPermissions, 'export-tests') === true){
			setHideUpload(true)
			setOpenUploader(false)
		}
	}

	function clearSearch() {
		pageNumRefresh();
		setSearchValue("");
		setTestData([])
		testing({ clearSearch: true });
	}

	function onKeyUpValue(e: any) {
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2 || isSearch) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				testing({ clearPageNumber: true });

			}
			if (e.target.value.length > 1) {
				setIsSearch(true)
			}
			if (e.target.value.length < 1) {
				setIsSearch(true)
			}
		}
	}
	function valueChanged(e: any) {
		setSearchValue(e.target.value);
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				testing();
			}
		}
	}
	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
	}

	function testing(params: any = {}) {
		let page = pageNumber;
		if (params.clearSearch || params.clearPageNumber) {
			page = 1;
			setHasMore(true)
			pageNumRefresh()
			setTestCount(0)
		}
		let sortk = sortkey;
		let sortDirection = sort;
		if (params.sortKey) {
			page = 1;
			sortk = (params.sortDirection == 'none') ? 'name' : params.sortKey;
			sortDirection = (params.sortDirection == 'none') ? 'asc' : params.sortDirection;
		}
		let search = params.clearSearch ? '' : searchValue;
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.testingApi.concat("?search=" + search + "&page=" + page + "&perPage=" + perPage + "&sort=" + sortDirection + "&column=" + sortk + "&status=" + true),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code === 200) {
					setActivity(response.data.activity)
					setTimeout(() => {
						setShowSpinner(false)
					}, 1000)
					calculateNumOfPages(response.data.count);
					setTestCount(response.data.count);
					let testObj: any = {};
					let testUsers: any = [];
					response.data.result.map((data: any) => {
						testObj = {
							id: data._id,
							testname: data.name,
							brand: data.brand,
							descriptions: data.description,
							price: data.price_with_symbol,
							sampletype: data.type,
							test: data.link,
							status: data.status

						}
						testUsers.push(testObj)
					})
					if (params.isScroll && params.isScroll == true) {
						setTestData(testData.concat(testUsers))
					} else {
						setTestData(testUsers)
						if (testUsers.length < perPage) {
							setHasMore(false)
						}
					}
				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});
	}
	async function getRecomendation(id: any) {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.testingApi.concat(id),
			headers: { Authorization: token }
		}
		await triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code === 200) {
					let user = response.data;
					setuserId(id)
					getInitialValues(user)
				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});
		showRecomendationModal(true)
	}
	const getInitialValues = (data: any) => {
		let status = data.status === true ?
			{ label: 'Active', value: true } : { label: 'Inactive', value: false, }
		setInitaialValues({
			testname: data.name,
			brand: data.brand,
			description: data.description,
			price: data.price,
			type: data.type,
			link: data.link,
			status: status,
		} as any)
	}
	const initialValues = {
		testname: "",
		brand: "",
		description: "",
		price: "",
		type: "",
		link: "",
		status: { label: 'Active', value: true },
	}
	async function fetchMoreData() {
		// setPageNumber(pageNumber + 1)
		// alert(pageNumber)
		if (hasMore) {
			await pageUpdate();
			testing({ isScroll: true })
			if (pageNumber === noOfPages) {
				setHasMore(false)
			}
		} else {
			return;
		}
	}
	function uploading(e: any) {
		setFile(e)
		setBtnDisable(false)
		setRefreshCom(false)
	}

	async function onUpload() {
		setUploaderText("Uploading")
		setIsUploading(true)
		let formData;
		formData = new FormData();
		formData.append(`recommendatation`, file[0]);
		return await axios({
			url: apiBaseUrl + apiEndpoint.uploadTest,
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${token}`, 'Accept': '*/*' },
			onUploadProgress: (progressEvent: any) => {
				const progress = (progressEvent.loaded / progressEvent.total) * 100;
				setProgress(progress)
			},
			data: formData
		})
			.then((res: any) => {
				if (res.data.status_code === 200) {
					let msg = res.data.data.data;
					if (res.data.data.status == true) {
						setSuccessMsg("File uploaded successfully.")
						setTimeout(() => {
							setOpenUploader(false)
						}, 4000)
						testing()
						clearVariables()
						setUploaderText("Uploaded Successfully")
						setIsUploading(false)
						setIsUploadSuccess(true)
						setBtnDisable(true)
						setUploadingMsg(msg.inserted && msg.updated && `  ${msg.inserted} new items added and ${msg.updated} updated.` || msg.inserted && ` ${msg.inserted} items added. ` || msg.updated && ` ${msg.updated} items updated.` || msg.inactivated && ` ${msg.inactivated} status changed.`)
					} else if (res.data.data.status == false) {
						setRefreshCom(true)
						setUploaderText("Error")
						setIsUploadFail(true)
						setBtnDisable(false)
						setUploadingMsg(res.data.data.message)
						setUploadbtnText("Upload again")
					}
				} else {
					setUploaderText("Error")
					setRefreshCom(true)
					setIsUploadFail(true)
					setBtnDisable(false)
					setUploadingMsg(res.data.message ? res.data.message : res.data)
					setUploadbtnText("Upload again")
				}
				;
			})
			.catch((err: any) => {
				console.log(err, "Error");
			});

	}
	async function pageUpdate() {
		setPageNumber(++pageNumber)
	}
	function pageNumRefresh() {
		setHasMore(true)
		setPageNumber(1)
	}
	function onDownload() {
		window.open(apiBaseUrl + apiEndpoint.downloadTest + `?search=&token=${noBearerToken}`, "_self")

	}
	function openUpload() {
		onClose()
		setOpenUploader(true)

	}
	function onClose() {
		setFile([])
		setOpenUploader(false)
		clearVariables()
	}
	function clearVariables() {
		setFile([])
		setIsUploadSuccess(false)
		setIsUploadFail(false)
		setUploadingMsg('')
		setUploaderText("Upload")
		setUploadbtnText("Upload")
		setBtnDisable(true)
		setIsUploading(false)
		setProgress(0)

	}
	function uploadBtn() {
		if (uploadbtnText === "Upload again") {
			clearVariables()
		} else onUpload()

	}
	function onBackdropClose() {
		setOpenUploader(false)
		clearVariables()
	}
	const onSortClick = async (e: SortProps) => {
		await setSortPros(e)
	}

	async function setSortPros(e: SortProps) {
		pageNumRefresh()
		await setSortKey(e.accessor)
		await setSort(e.sortDirection)
		console.log(e)
		testing({ sortKey: e.accessor, sortDirection: e.sortDirection })
		// console.log(e.sortDirection)
	}
	return (
		<>
			<UserListContainer className="main">
				<LeftMenu />
				<RightContainer>
					<GridHolder >
						{showSpinner && <Spinner />}
						{(testCount > 0 || isSearch) && !showSpinner ? <PiRecomendationsHeader
							count={testCount}
							libraryType="atalskit"
							// onChange={() => { }}
							onClear={clearSearch}
							onDownloadClick={onDownload}
							onSearchKeyUp={(e: any) => onKeyUpValue(e)}
							onSearchValueChange={(e: any) => valueChanged(e)}
							onUploadClick={() => openUpload()}
							searchPlaceholder="Search Testing"
							searchValue={searchValue}
							onAddClick={() => showAddRecomendationModal(true)}
							tableProps={{
								column: [
									{
										Header: 'TEST NAME',
										accessor: 'testname',
										width: '260px',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer" title={props.row.original.testname}>{props.row.original.testname}</div>;
										}
									},
									{
										Header: 'BRAND',
										accessor: 'brand',
										width: '200px',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer textColorNeutral800" title={props.row.original.brand}>{props.row.original.brand}</div>;
										}
									},
									{
										Header: 'DESCRIPTION',
										accessor: 'descriptions',
										canSort: false,
										width: '260px',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer 
											textColorNeutral400" title={props.row.original.descriptions}>{props.row.original.descriptions}</div>;
										}
									},
									{
										Header: 'PRICE',
										accessor: 'price',
										textAlign: 'right',
										width: "180px",
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer textColorNeutral400" style={{ textAlign: "right" }} title={props.row.original.price}>{props.row.original.price}</div>;
										}
									},
									{
										Header: 'SAMPLE TYPE',
										accessor: 'sampletype',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer textColorNeutral400" title={props.row.original.sampletype}>{props.row.original.sampletype}</div>;
										}
									},
									{
										Header: 'TEST DETAILS',
										accessor: 'testdetails',
										width: '150px',
										Cell: (props: any) => {
											return <div className="truncate cursor-pointer textColorNeutral400">{props.row.original.test ? <SupplementLink onClick={() => window.open(props.row.original.test, "_blank")} >Test details</SupplementLink> : "-- "}</div>;
										}
									},
									{
										Header: 'STATUS',
										accessor: 'status',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="d-flex align-items-center cursor-pointer activeStatus textColorNeutral400">{props.row.original.status === true ? <> <Icon name="activeIcon" /> Active </> : <><Icon name="inactiveIcon" /> Inactive</>}</div>;
										}
									}

								],
								fetchMoreData: fetchMoreData,
								hasMore: hasMore,
								infinitescroll: true,
								onPageChange: function noRefCheck() { },
								onSortClick: onSortClick,
								pages: 10,
								pagination: false,
								scrollableTarget: 'scrollableDiv',
								selectedIndex: 1,
								tableData: testData

							}}
							title="Testing"
							lastUpdated={DateFormats(activity.date)}
							modifiedByName={activity.name}
							uploadType={activity.type}
							downloadButtonDisplay={hideDownload}
							addButtonDisplay={hideAdd}
							uploadButtonDisplay={hideUpload}
						/>

							: <> {(testCount === 0 || !isSearch) && !showSpinner ? <PiNoRecomendations
								libraryType="atalskit"
								onDownloadClick={onDownload}
								onUploadClick={() => openUpload()}
								titleHeader='Testing'
								title="No testing added yet. Click on download for sample format"
								onAddClick={() => showAddRecomendationModal(true)}
								downloadButtonDisplay={hideDownload}
								addButtonDisplay={hideAdd}
								uploadButtonDisplay={hideUpload}
							/> : ''}
							</>}

					</GridHolder>
				</RightContainer>
			</UserListContainer>

			<SideDrawerHolder>
				<PiSideDrawer isOpen={recomendationModal}
					onClose={() => showRecomendationModal(false)}
					width='narrow'
					onBackdropClose={() => showRecomendationModal(false)}
					onCloseComplete={() => ('')}
				>

					{recomendationModal && <EditRecommendation
						title="Testing"
						showRecomendationModal={showRecomendationModal}
						initialValues={initialValue}
						onClick={() => testing({ clearSearch: true })}
						userId={userId}
					/>}
				</PiSideDrawer>
			</SideDrawerHolder>

			<SideDrawerHolder>
				<PiSideDrawer isOpen={addRecomendationModal}
					onClose={() => showAddRecomendationModal(false)}
					width='narrow'
					onBackdropClose={() => showAddRecomendationModal(false)}
					onCloseComplete={() => ('')}
				>

					{addRecomendationModal && <EditRecommendation
						title="Add New"
						showRecomendationModal={showAddRecomendationModal}
						initialValues={initialValues}
						onClick={() => testing({ clearSearch: true })}
					/>}

				</PiSideDrawer>
			</SideDrawerHolder>

			<SideDrawerHolder>
				<PiSideDrawer isOpen={openUploader}
					onClose={() => onClose()}
					width="medium"
					onBackdropClose={() => onBackdropClose()}
				>
					<PiDrawerHeader
						libraryType="atalskit"
						OnClose={() => onClose()}
						title={headerUploadText}
					/>
					{openUploader && <PiRecomendationsUpload
						buttonTitle="Choose File"
						dropzoneProps={{
							accept: '.xls,.xlsx',
							disabled: false,
							maxFileSizeErroMessage: 'Max file uplode size should be 50MB',
							maxSize: 5242880,
							multiple: false,
							noClick: true,
							noDrag: false,
							text: 'Drag & Drop your file',
							validFieErrorMessage: 'Upload valid file type'
						}}
						libraryType="atalskit"
						onUploadClick={(e: any) => uploading(e)}
						isUploadFail={isUploadFail}
						isUploadSuccess={isUploadSuccess}
						uploadMessage={uploadingMsg}
						isUploading={isUploading}
						uploadProgress={progress}
						dragText=""
						errorFileLink=""
						refresheUpload={refreshCom}
						successMessage={successMsg}
					/>}
					<FooterDiv className={btnDisable ? "hideFooter" : "showFooter"}>
						<PiButton
							className="mr-3"
							appearance="cancel"
							onClick={() => onClose()}
							size="extraLarge"
							label="Cancel"
							type="submit" />
						<PiButton appearance="primary"
							label={uploadbtnText}
							type='button'
							size="extraLarge"
							onClick={() => uploadBtn()}
							className="mr-3" />
					</FooterDiv>
				</PiSideDrawer>
			</SideDrawerHolder>
		</>
	)
}