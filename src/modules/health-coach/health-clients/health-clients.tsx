import { PiDocViewer, PiIntakeFormSideDrawer, PiRteBox, PiSecondaryHeader, PiSideDrawer, PiSymptomAnalysisSideDrawer, PiTabGroup, PiTabHeader, PiTabHeaderPanel, PiTabPanel, PiTypography } from 'pixel-kit'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IntakeFormIcon, PdfIcon, SymptomAnalysisIcon } from '../../../components/icon/icons'
import ClientsLeftmenu from '../../../components/salesmanager-leftmenu/sales-client-leftmenu'
import { triggerApi } from '../../../services'
import { ClientSummaryBlock, SecondaryHeaderCon, RightContainer, UserListContainer, SideDrawerHolder } from '../../../styles/common-styles'
import { getLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps, UrlParams } from '../../../core/schema'
import { EditClientprofile } from '../../../components'
// import Snackbar from '../../../core/snackbar'
import { userImg } from '../../../assets'
import {DateFormats} from '../../../core/dateFormats'
import { useHistory } from 'react-router-dom'
import Overview from '../../care-manager/care-client/overview'
import Documents from '../../care-manager/care-client/documents'

export default function HCClient() {
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	let clientParam = useParams<UrlParams>()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	// const [toast, showToast] = useState(false)
	// const [successToast, setSuccessToast] = useState(false)
	// const [errMsg, setErrMsg] = useState('')
	const [intakeForm, showIntakeForm] = useState(false)
	const [symptomAnalysis, showSymptomAnalysis] = useState(false)
	const [intakeCount, setIntakeCount] = useState<any>()
	const [intakeData, setIntakeData] = useState([]);
	const [symptomCount, setSymptomCount] = useState<any>()
	const [symptomanalysisData, setSymptomanalysisData] = useState([]);
	const [openEditProfile, setOpenEditProfile] = useState(false)
	const [initialValues, setInitaialValues] = useState()
	const [docViewer, openDocViewer] = useState(false);
	const [docLink, setDockLink] = useState<any>()
	const [clientDetails, setClientDetails] = useState<any>({})
	const [notes, setNotes] = useState<any>([])
	const [rteNotes, setRteNotes] = useState('')
	const { current } = React.useRef({ notes, timer: 0 });
	let history = useHistory()
	const [selectedTab,setSelectedTab] = useState<number>()

	useEffect(() => {
		getClientList()
		// rteBox()
	}, [])
	const getClientList = (params: any = {}) => {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getClients.concat(clientParam.id),
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				let data = res.data;
				getInitialValues(data)
				setFirstName(data.first_name ? data.first_name : '')
				setLastName(data.last_name ? data.last_name : '')
				setClientDetails(res.data)

			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const getInitialValues = (data: any) => {

		let profile_pic = data.img_name ? data.display_url : '';

		setInitaialValues({
			firstName: data.first_name,
			lastName: data.last_name,
			email: data.email,
			phone: data.phone,
			address: data.address,
			dob: data.dob,
			ethnicity: data.ethnicity,
			height: data.height,
			weight: data.weight,
			profile_pic: profile_pic,
			state: data.state
		} as any)
	}

	const intakeForn = () => {
		if(clientDetails.client_intake === true){
		showIntakeForm(true)
		intakeFormData()
	}else return
}
	async function intakeFormData(data: any = {}) {
		// console.log(data)
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.intakeFormApi.concat(clientParam.id),
			// apiUrl: apiEndpoint.intakeFormApi.concat("622f8376310753237bcb95b7"),
			headers: {
				Authorization: token
			}
		};
		await triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setIntakeCount(res.data.count)
				setIntakeData(res.data.result)
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const symptomAnalysisData = () => {
		if(clientDetails.client_msq === true){
		showSymptomAnalysis(true)
		symptomData()
	}else return 
}
	async function symptomData(data: any = {}) {
		// console.log(data)
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.symptomAnalysisApi.concat(clientParam.id),
			// apiUrl: apiEndpoint.symptomAnalysisApi.concat("622f8387ce784623ac037a5d"),
			headers: {
				Authorization: token
			}
		};
		await triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setSymptomCount(res.data.count)
				setSymptomanalysisData(res.data.result)
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}

	const intakeBackdropClose = () => {
		showIntakeForm(false)
	}
	const symptomBackdropClose = () => {
		showSymptomAnalysis(false)
	}
	const docView = () => {
		if(clientDetails.client_past_test === true){
		openDocViewer(true)
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.docviewer.concat(clientParam.id),
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				// setDockLink("http://research.nhm.org/pdfs/10840/10840-002.pdf")
				setDockLink(res.data)
				// console.log(res)
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}else return 
}
	const rteBox = () => {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.rteBox.concat(clientParam.id),
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setNotes(res.data)
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}

	const rteNote = (e: string, index: number) => {
		// console.log(e)
		let rtenotes: any = [...notes]
		let selectedItem: any = rtenotes[index];
		selectedItem = { ...selectedItem, description: e }
		// console.log(rtenotes[index], e)
		rtenotes[index] = selectedItem;
		// console.log(rtenotes)
		setNotes(rtenotes)
		current.notes = { ...selectedItem, description: e }
		if (current.timer) clearTimeout(current.timer);
		current.timer = window.setTimeout(() => {
			current.timer = 0;
			// setData(current.data);
			console.log("Saving...", selectedItem, index);
			onRteBox(selectedItem, index)
		}, 1000);

	}

	const onRteBox = (data: object, index: number) => {
		sendNotes(rteNotes, data, index)

	}

	const sendNotes = (e: string, data: any, index: number) => {
		// console.log(data)
		const apiObject: PayloadProps = {
			payload: {
				client_id: clientParam.id,
				note_id: data.note_id,
				description: notes[index].description,
			},
			method: "POST",
			apiUrl: apiEndpoint.rteBox,
			headers: {
				Authorization: token
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				// setIntervalID(false)
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const onEditProfile = () => {
		setOpenEditProfile(true)
	}
	const onBack = () => {
		history.replace('/office/clients')
	}
	const onBackdropClose = () => {
		openDocViewer(false)
	}


	return (
		<>
			{/* <Snackbar {...toastProps} /> */}
			{/* <Snackbar
				title="Error"
				appearance="error"
				message={errMsg}
				open={toast}
				close={() => showToast(false)}
			/>
			<Snackbar
				title="Success"
				appearance="success"
				message={errMsg}
				open={successToast}
				close={() => setSuccessToast(false)}
			/> */}
			<SecondaryHeaderCon>
				<PiSecondaryHeader
					displayAssignButton={false}
					assignButtonText=""
					backOptions={{
						name: firstName + ' ' + lastName,
						route: '/office/clients'
					}}
					onAssignClick={() => console.log()}
					profileChildren={<p>{clientDetails.gender ? clientDetails.gender + "," : ''}{clientDetails.age ? clientDetails.age : ''}</p>}
					subscription={{
						plan: '6 Months Plan',
						week: 'Week 1'
					}}
					avatarProps={{ src: userImg, appearance: "square" }}
					profileProps={{
						name: clientDetails.first_name + clientDetails.last_name,
						height: clientDetails.height && clientDetails.height ,
						wieght: clientDetails.weight && clientDetails.weight ,
						age: clientDetails.age && clientDetails.age,
						gender: clientDetails.gender && clientDetails.gender
					}}
					onBackButtonClick={onBack}
					onEditClick={onEditProfile}

				/>
				<PiTabGroup
					id="tab"
					onChange={(e: number) => setSelectedTab(e)}
					selected={selectedTab}
				>
					<PiTabHeaderPanel>
						<PiTabHeader>Overview</PiTabHeader>
						<PiTabHeader>Documents</PiTabHeader>
						<PiTabHeader>Health Profile  </PiTabHeader>
					</PiTabHeaderPanel>

					<PiTabPanel>
					<Overview 
						id={clientParam.id} 
						onAssignClick={() => {}}
						clientDetails={clientDetails}
						displayAssignButton={false}
						assignButtonText={''}
					/>
					</PiTabPanel>
					<PiTabPanel>
						{/* <UserListContainer className="main">
						<ClientsLeftmenu email={clientDetails.email} phone={clientDetails.phone} onEditProfile={onEditProfile} />
						<RightContainer style={{ padding: 0, background: "#E5E5E5", }}>
							<ClientSummaryBlock>
								<div className="clientSummary">
									<div className="summaryHeader">
										<PiTypography component="h5">Documents</PiTypography>
									</div>
									<div className="summaryDetails">
										<div className={"linkBtn " + (clientDetails.client_msq === true ? "" : "disabled")}>
											<div className='linkText' onClick={symptomAnalysisData}> <SymptomAnalysisIcon /><span>Symptom Analysis</span></div>
										</div>
										<div className={"linkBtn " + (clientDetails.client_intake === true ? "" : "disabled")}>
											<div className='linkText' onClick={intakeForn}> <IntakeFormIcon /><span>Intake Form</span></div>
										</div>
										<div className={"linkBtn " + (clientDetails.client_past_test === true ? "" : "disabled")}>
											<div className='linkText' onClick={docView}> <PdfIcon /><span>Historical Tests</span></div>
										</div>

									</div>
								</div> */}
								{/* {notes && notes.map((note: any, index: number) => {
									return <PiRteBox
										editorProps={{
											libraryType: 'atalskit',
											onChange: (e: any) => rteNote(e, index),
											// onBlur: (e: any) => onRteBox(note, index),
											placeholder: 'Text Here...',
											value: note.description
										}}
										libraryType="atalskit"
										onAddComment={function noRefCheck() { }}
										title={note.note_name}
										lastUpdated={DateFormats(note.last_modified_date)}
										modifiedByName={note.last_modified_by}
									/>
								})} */}
								{/* <div className="clientSummary">
                            <div className="summaryHeader d-flex" >
                                <div className="d-flex align-items-center"><PiTypography component="h5">Sales Notes</PiTypography> &nbsp; <span className="statusBadge">Internal</span></div>
                                <div className="linkBtn" style={{margin: "0px"}}>
                                    <a href="#"> <MessageIcon/><span>Add Comment</span></a>
                                </div>
                            </div>
                            <div className="summaryDetails">
                                <PiTextArea
                                    libraryType="atalskit"
                                    minimumRows={3}
                                    name="textarea"
                                    placeholder="Text here..."
                                />
                            </div>
                        </div> */}


							{/* </ClientSummaryBlock>
						</RightContainer>
					</UserListContainer> */}
					<Documents symptomAnalysisData={symptomAnalysisData} intakeForn={intakeForn} docView={docView} clientDetails={clientDetails} />
					</PiTabPanel>
					<PiTabPanel>Health Profile</PiTabPanel>

				</PiTabGroup>


			</SecondaryHeaderCon>

			<PiIntakeFormSideDrawer
				isOpen={intakeForm}
				OnDrawerClose={intakeBackdropClose}
				headerTitle="Intake Form"
				libraryType="atalskit"
				questionData={intakeData}
				totalScore={intakeCount}
			/>

			<PiSymptomAnalysisSideDrawer
				isOpen={symptomAnalysis}
				OnDrawerClose={symptomBackdropClose}
				headerTitle="Symptom Analysis"
				libraryType="atalskit"
				questionData={symptomanalysisData}
				totalScore={symptomCount}
			/>

			<SideDrawerHolder>
				<PiSideDrawer isOpen={openEditProfile}
					onClose={() => setOpenEditProfile(false)}
					width="medium"
					onBackdropClose={() => setOpenEditProfile(false)}
				>
					{openEditProfile && <EditClientprofile clientId={clientParam.id}
						setOpenEditProfile={setOpenEditProfile}
						clientName={firstName + ' ' + lastName}
						initialValues={initialValues}
						getClientList={getClientList}
					/>}
				</PiSideDrawer>
			</SideDrawerHolder>

			<SideDrawerHolder>
				{/* <PiSideDrawer isOpen={docViewer}
					onClose={() => openDocViewer(false)}
					width="full"
					onBackdropClose={() => openDocViewer(false)}
				> */}
				{/* <PiDrawerHeader
					libraryType="atalskit"
					OnClose={() => openDocViewer(false)}
					title="Historical Tests"
				/> */}
				{docLink && <PiDocViewer isOpen={docViewer} onClose={() => openDocViewer(false)} source={docLink} onBackdropClose={onBackdropClose} />}
				{/* </PiSideDrawer> */}
			</SideDrawerHolder>
		</>
	)
}