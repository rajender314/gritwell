import React, { useEffect, useState } from 'react'
import LeftMenu from '../../../../components/leftMenu';
import { GridHolder } from '../../../../components/login-commonlayout/login-layout-components';
import apiEndpoint from '../../../../core/apiend_point';
import { getLocalStorage, setLocalStorage } from '../../../../core/localStorageService';
import { ApiResponseProps, PayloadProps, SortProps, Permissions } from '../../../../core/schema';
import { triggerApi } from '../../../../services';
import { RightContainer, SideDrawerHolder, UserListContainer } from '../../../../styles/common-styles';
import { PiButton, PiDrawerHeader, PiRecomendationsHeader, PiRecomendationsUpload, PiSideDrawer } from 'pixel-kit';
import { PiNoRecomendations } from 'pixel-kit';
import { FooterDiv } from '../../../users/component/add-user-components';
import Spinner from '../../../../components/spinner'
import axios from 'axios';
import { Icon } from '../../../../components';
import EditRecommendation from './edit-recomendation';
import { DateFormats } from '../../../../core/dateFormats';
import { useAppSelector } from '../../../../store/hooks';
import { checkUserPermissions } from '../../../../core/checkUserPermission'
import { useHistory } from 'react-router';



export default function Lifestyle() {
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [searchValue, setSearchValue] = useState("");
	let [pageNumber, setPageNumber]: any = useState(1);
	let [perPage, setperPage] = useState(20);
	let [sort, setSort]: any = useState("asc");
	let [sortkey, setSortKey] = useState('name');
	const [lifestyleCount, setLifestyleCount] = useState<any>()
	const [lifestyleData, setLifestyleData] = useState([]);
	const [isSearch, setIsSearch] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	let [noOfPages, setNoOfPages] = useState(0);
	const [openUploader, setOpenUploader] = useState(false)
	const [file, setFile] = useState<any>([])
	const [uploadingMsg, setUploadingMsg] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const [headerUploadText, setUploaderText] = useState("Upload")
	const [isUploadSuccess, setIsUploadSuccess] = useState(false)
	const [isUploadFail, setIsUploadFail] = useState(false)
	const [btnDisable, setBtnDisable] = useState(true)
	const [uploadbtnText, setUploadbtnText] = useState("Upload")
	const [showSpinner, setShowSpinner] = useState(false)
	const apiBaseUrl = process.env.REACT_APP_API_URL;
	const [progress, setProgress] = useState<any>(0)
	const noBearerToken = token?.split("Bearer ")[1]
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
		life()
	}, [userPermissions])

	function checkPemission(){
		if(checkUserPermissions(userPermissions, 'list-lifestyle') != true){
			setLocalStorage("leftMenuItem", '')
			history.replace("/permission-denied")
		}
		if(checkUserPermissions(userPermissions, 'edit-lifestyle') === true){
			setHideEdit(true)
			setHideAdd(true)
			showRecomendationModal(false)
			showAddRecomendationModal(false)
		}
		if(checkUserPermissions(userPermissions, 'import-lifestyle') === true){
			setHideDownload(true)
		}
		if(checkUserPermissions(userPermissions, 'export-lifestyle') === true){
			setHideUpload(true)
			setOpenUploader(false)
		}
	}

	function clearSearch() {
		pageNumRefresh();
		setSearchValue("");
		setLifestyleData([])
		life({ clearSearch: true });
	}

	function onKeyUpValue(e: any) {
		if (e.key === 'Enter') {
			if (e.target.value.length >= 2 || isSearch) {
				pageNumRefresh();
				setSearchValue(e.target.value);
				life({ clearPageNumber: true });

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
				life();
			}
		}
	}
	function calculateNumOfPages(count: number) {
		let pages = count < perPage ? 1 : Math.ceil(count / perPage);
		setNoOfPages(pages);
	}

	function life(params: any = {}) {
		let page = pageNumber;
		if (params.clearSearch || params.clearPageNumber) {
			page = 1;
			setHasMore(true)
			pageNumRefresh()
			setLifestyleCount(0)
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
			apiUrl: apiEndpoint.lifestyleApi.concat("?search=" + search + "&page=" + page + "&perPage=" + perPage + "&sort=" + sortDirection + "&column=" + sortk + "&status=" + true),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code === 200) {
					setActivity(response.data.activity)
					setTimeout(() => {
						setShowSpinner(false)
					}, 1000)
					setLifestyleCount(response.data.count);
					calculateNumOfPages(response.data.count)
					let lifestyleObj: any = {};
					let lifestyleUsers: any = [];
					response.data.result.map((data: any) => {
						lifestyleObj = {
							id: data._id,
							name: data.name,
							descriptions: data.description,
							status: data.status
						}
						lifestyleUsers.push(lifestyleObj)
					})
					if (params.isScroll && params.isScroll == true) {
						setLifestyleData(lifestyleData.concat(lifestyleUsers))
					} else {
						setLifestyleData(lifestyleUsers)
						if (lifestyleUsers.length < perPage) {
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
	const initialValues = {
		name: '',
		description: '',
		status: { label: 'Active', value: true },
	}
	async function fetchMoreData() {
		// setPageNumber(pageNumber + 1)
		// alert(pageNumber)
		if (hasMore) {
			await pageUpdate();
			life({ isScroll: true })
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
	function openUpload() {
		setOpenUploader(true)
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
			url: apiBaseUrl + apiEndpoint.uploadLifestyleApi,
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
						life()
						clearVariables()
						setUploaderText("Uploaded Successfully")
						setIsUploading(false)
						setIsUploadSuccess(true)
						setBtnDisable(true)
						console.log(msg.updated)
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
					setRefreshCom(true)
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
	async function getRecomendation(id: any) {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.lifestyleApi.concat(id),
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
			name: data.name,
			description: data.description,
			status: status,
		} as any)
	}

	function onDownload() {
		window.open(apiBaseUrl + apiEndpoint.downloadLifestyle + `?search=&token=${noBearerToken}`, "_self")
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
		life({ sortKey: e.accessor, sortDirection: e.sortDirection })
		// console.log(e.sortDirection)
	}
	return (
		<>
			<UserListContainer className="main">
				<LeftMenu />
				<RightContainer>
					<GridHolder  >
						{showSpinner && <Spinner />}
						{(lifestyleCount > 0 || isSearch) && !showSpinner ? <PiRecomendationsHeader
							count={lifestyleCount}
							libraryType="atalskit"
							// onChange={() => { }}
							onClear={clearSearch}
							onDownloadClick={onDownload}
							onSearchKeyUp={(e: any) => onKeyUpValue(e)}
							onSearchValueChange={e => valueChanged(e)}
							onUploadClick={() => openUpload()}
							searchPlaceholder="Search Lifestyle"
							searchValue={searchValue}
							onAddClick={() => showAddRecomendationModal(true)}
							tableProps={{
								column: [
									{
										Header: 'NAME',
										accessor: 'name',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer textColorNeutral800" title={props.row.original.name}>{props.row.original.name}</div>;
										}
									},
									{
										Header: 'DESCRIPTION',
										accessor: 'descriptions',
										canSort: false,
										width: '260px',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="truncate cursor-pointer textColorNeutral400" title={props.row.original.descriptions}>{props.row.original.descriptions}</div>;
										}
									},
									{
										Header: 'STATUS',
										accessor: 'status',
										Cell: (props: any) => {
											return <div onClick={hideEdit ? () => getRecomendation(props.row.original.id) : () => { }} className="d-flex  align-items-center cursor-pointer activeStatus
											textColorNeutral400">{props.row.original.status === true ? <> <Icon name="activeIcon" /> Active </> : <><Icon name="inactiveIcon" /> Inactive</>}</div>;
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
								tableData: lifestyleData
							}}
							title="Lifestyle"
							lastUpdated={DateFormats(activity.date)}
							modifiedByName={activity.name}
							uploadType={activity.type}
							downloadButtonDisplay={hideDownload}
							addButtonDisplay={hideAdd}
							uploadButtonDisplay={hideUpload}
						/>

							: <> {(lifestyleCount === 0 || !isSearch) && !showSpinner ? <PiNoRecomendations
								libraryType="atalskit"
								onDownloadClick={onDownload}
								onUploadClick={() => openUpload()}
								title="No lifestyle added yet. Click on download for sample format"
								titleHeader='Lifestyle'
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
						title="Lifestyle"
						showRecomendationModal={showRecomendationModal}
						initialValues={initialValue}
						onClick={() => life({ clearSearch: true })}
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
						onClick={() => life({ clearSearch: true })}
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
							size="extraLarge"
							onClick={() => onClose()}
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