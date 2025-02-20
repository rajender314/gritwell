import { PiButton, PiInputForm, PiTypography, PiReactDatePicker } from 'pixel-kit'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import {
	DialogFormContent, FormInnerContainer, UserDataInfo, FormFlexWrapper, FormField, FooterDiv, PopupHeader,
	FormContainer,
	ImgUploadDiv
} from '../../modules/users/component/add-user-components'
import { Icon } from '../../components/index';
import 'react-phone-input-2/lib/style.css'
import { triggerApi } from '../../services';
// import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik';
import { getLocalStorage } from '../../core/localStorageService';
import apiEndpoint from '../../core/apiend_point';
import { ApiResponseProps, PayloadProps, UrlParams } from '../../core/schema';
import { editClientProfileSchema } from './validations/edit-client-validation';
import Snackbar from '../../core/snackbar';
import { userImg } from '../../assets/index'
import { handleSubmitFunProps } from './schema/edit-client-schema';


export default function EditClientProfile(props: any) {
	const [showSectionMsg, setShowSectionMsg] = useState(false)
	const [infoErrMsg, setInfoErrMsg] = useState<string>('')
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [showSectionMsgErr, setShowSectionMsgErr] = useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)
	let clientParam = useParams<UrlParams>()
	const [seletedDate, setSelectedDate] = useState<any>(props.initialValues.dob ? new Date(props.initialValues.dob) : '')
	// let history = useHistory()

	function handleSubmit(data: handleSubmitFunProps) {
		let month = seletedDate.getMonth() + 1;
		if (seletedDate !== "") {
			month = month < 10 ? "0" + month : month;
		}
		let day = seletedDate.getDate();
		if (seletedDate !== "") {
			day = day < 10 ? "0" + day : day;
		}
		setIsSubmiting(true)
		const apiObject: PayloadProps = {
			payload: {
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone,
				address: data.address,
				dob: seletedDate.getFullYear() + '-' + month + '-' + day,
				ethnicity: data.ethnicity,
				height: data.height,
				weight: data.weight,
				state: data.state
			},
			method: "PUT",
			apiUrl: apiEndpoint.editProfileApi.concat(clientParam.id),
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				// console.log(res)
				props.getClientList()
				// setIsSubmiting(false)
				if (res.status_code !== 200) {
					setShowSectionMsgErr(true);
					setInfoErrMsg(res.message)
					setTimeout(() => {
						setShowSectionMsgErr(false)
					}, 4000)
				}
				// else if (res.status_code == 204) {
				//     setInfoErrMsg(res.message)
				//     setTimeout(() => {
				//         setShowSectionMsgErr(false)
				//     }, 4000)
				// }
				else {
					setShowSectionMsg(true)
					setTimeout(() => {
						setShowSectionMsg(false)
						props.setOpenEditProfile(false)
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}


	function handleRef() {

	}



	return (
		<>
			<Snackbar
				title="Success"
				appearance="success"
				message="You have updated the client details successfully"
				open={showSectionMsg}
				close={() => setShowSectionMsg(false)}
			/>
			<Snackbar
				title="Error"
				appearance="error"
				message={infoErrMsg}
				open={showSectionMsgErr}
				close={() => setShowSectionMsgErr(false)}
			/>

			<FormContainer>
				<PopupHeader>
					<div className="d-flex">
						<span className="d-flex" onClick={() => props.setOpenEditProfile(false)}> <Icon name="back" /> </span>
						<span><PiTypography component="h2">{props.clientName}</PiTypography></span>
					</div>

				</PopupHeader>

				<Formik
					validationSchema={editClientProfileSchema}
					onSubmit={handleSubmit}
					initialValues={props.initialValues}
					innerRef={handleRef}
				>
					{({ ...formik }: any) => {
						return (
							<Form style={{ overflow: "hidden" }}>

								<AddUserComponent
									formik={formik}
									isDisable={isSubmiting}
									onCancel={() => props.setOpenEditProfile(false)}
									// setFilename ={filename}
									data={props}
									initialvalues={props.initialValues}
									seletedDate={seletedDate}
									setSelectedDate={setSelectedDate}
								/>

							</Form>
						)
					}}
				</Formik>
			</FormContainer>
		</>
	)
}

const AddUserComponent = ({ formik, onCancel, userid, seletedDate, setSelectedDate, initialvalues, setIsChecked, isChecked, toggleChecked, setToggleChecked, ...props }: any) => {
	const [submitDisable, setSubmitDisable] = useState(true)



	const btnDisable = (prev: string, cur: string) => {
		if (prev !== cur) {
			setSubmitDisable(false)
		} else {
			setSubmitDisable(true)
		}
	}
	const handleChange = (e: any, type: string) => {

		if (type === "firstName") {
			btnDisable(initialvalues.firstName, e.target.value)
		} else if (type === "lastName") {
			btnDisable(initialvalues.lastName, e.target.value)
		} else if (type === "phone") {
			btnDisable(initialvalues.phone, e.target.value)
		} else if (type === "address") {
			btnDisable(initialvalues.address, e.target.value)
		} else if (type === "dob") {
			let date = new Date(e)
			setSelectedDate(date)
			btnDisable(initialvalues.dob, e)
		} else if (type === "ethnicity") {
			btnDisable(initialvalues.ethnicity, e.target.value)
		} else if (type === "height") {
			btnDisable(initialvalues.height, e.target.value)
		} else if (type === "weight") {
			btnDisable(initialvalues.weight, e.target.value)
		} else if (type === "state") {
			btnDisable(initialvalues.state, e.target.value)
		}

	}

	return (
		<>
			<DialogFormContent className="user-form">
				<FormInnerContainer>
					<UserDataInfo style={{ display: "flex", flexDirection: "row-reverse" }}>
						<div>
							<FormFlexWrapper style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
								<ImgUploadDiv>
									{(<div style={{ display: "flex" }}>
										<img src={userImg} width="160" height="160" alt="userImage" />
									</div>)
									}

								</ImgUploadDiv>
							</FormFlexWrapper>
						</div>

						<div style={{ paddingRight: "32px" }}>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gw-required ">
									<PiInputForm name="firstName"
										label="First Name"
										onChange={(e: string) => handleChange(e, "firstName")}
										placeholder="Enter First Name"
										libraryType='default'></PiInputForm>
								</FormField>
								<FormField className="one-sibling gw-required">
									<PiInputForm name="lastName"
										label="Last Name"
										onChange={(e: string) => handleChange(e, "lastName")}
										placeholder="Enter Last Name"
										libraryType='default'></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling ">
									<PiInputForm name="email"
										label="Email"
										isDisabled={true}
										placeholder="Enter Email"
										libraryType='default'></PiInputForm>
								</FormField>

							</FormFlexWrapper>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gw-required">

									<PiInputForm name='phone'
										label="Phone Number"
										onChange={(e: string) => handleChange(e, "phone")}
										placeholder="Enter Phone Number"
										maxLength={15}
									></PiInputForm>
								</FormField>

							</FormFlexWrapper>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiInputForm name='address'
										label="Address"
										onChange={(e: string) => handleChange(e, "address")}
										placeholder="Enter Address"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiReactDatePicker
										dateFormat="MM-dd-yyyy"
										dropdownMode="select"
										placeholderText="Select Date"
										helpText=""
										label="Date of Birth"
										libraryType="atalskit"
										name="dob"
										// value={seletedDate}
										onChange={(e: Date) => handleChange(e, "dob")}
										peekNextMonth
										selected={seletedDate}
										showMonthDropdown
										showYearDropdown
										maxDate={new Date()}
									/>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiInputForm name='ethnicity'
										label="Ethnicity"
										onChange={(e: string) => handleChange(e, "ethnicity")}
										placeholder="Enter ethnicity"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiInputForm name='height'
										label="Height"
										onChange={(e: string) => handleChange(e, "height")}
										placeholder="Enter Height"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiInputForm name='weight'
										label="Weight"
										onChange={(e: string) => handleChange(e, "weight")}
										placeholder="Enter weight"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select ">
									<PiInputForm name='state'
										label="State"
										onChange={(e: string) => handleChange(e, "state")}
										placeholder="Enter State"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>
						</div>

					</UserDataInfo>
				</FormInnerContainer>
			</DialogFormContent>
			<FooterDiv className={submitDisable ? "hideFooter" : "showFooter"}>
				<PiButton appearance="cancel"
					label="Cancel"
					type='button'
					onClick={() => onCancel()}
					size="extraLarge"
					className="mr-3" />

				<PiButton
					className={userid && submitDisable ? " disabled mr-3" : "mr-3"}
					appearance="primary"
					label="Save"
					type="submit"
					size="extraLarge"
					// isDisabled={props.isDisable}
					isLoading={props.isDisable}
					onClick={formik.handleSubmit} />
			</FooterDiv>
		</>
	)
}