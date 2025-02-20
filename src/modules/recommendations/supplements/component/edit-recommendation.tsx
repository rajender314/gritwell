import { PiButton, PiInputForm, PiToggle, PiTextareaForm, PiDrawerHeader } from 'pixel-kit'
import React, { useState } from 'react'
import { FormInnerContainer, UserDataInfo, FormField, FooterDiv, FormContainer, RecommendationFormContent } from '../../../users/component/add-user-components'
import { recommendationSchema } from '../validations/validations'
import 'react-phone-input-2/lib/style.css'
import { triggerApi } from '../../../../services';
import { Form, Formik } from 'formik';
import { getLocalStorage } from '../../../../core/localStorageService';
import apiEndpoint from '../../../../core/apiend_point';
import { ApiResponseProps, PayloadProps } from '../../../../core/schema';
import Snackbar from '../../../../core/snackbar';



export default function EditRecommendation(props: any) {
	const [infoErrMsg, setInfoErrMsg] = useState<string>('')
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [showSectionMsgErr, setShowSectionMsgErr] = useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)
	const [isChecked, setIsChecked] = useState(true)
	const [toggleChecked, setToggleChecked] = useState(props.initialValues ? props.initialValues.status.value : '')
	const [submitDisable, setSubmitDisable] = useState(true)
	const [successMsg, setsuccessMsg] = useState('')
	const [showSuccessMsg, setShowSuccessMsg] = useState(false)



	function handleSubmit(data: any) {
		setIsSubmiting(true)
		const apiObject: PayloadProps = {
			payload: {
				name: data.testname,
				description: data.description,
				brand: data.brand,
				dosage: data.dosage,
				price: data.price,
				link: data.link,
				status: props.userId ? toggleChecked : isChecked,
			},
			method: props.userId ? "PUT" : "POST",
			apiUrl: props.userId ? apiEndpoint.supplementsApi.concat(props.userId) : apiEndpoint.supplementsApi,
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setIsSubmiting(false)
				if (res.status_code === 200) {
					setShowSuccessMsg(true);
					setsuccessMsg(res.data.message ? res.data.message : res.data)
					setTimeout(() => {
						setShowSuccessMsg(false)
						props.showRecomendationModal(false)
						props.onClick();
					}, 4000)
				}
				else {
					setInfoErrMsg(res.data.message ? res.data.message : res.data)
					setShowSectionMsgErr(true)
					setTimeout(() => {
						setShowSectionMsgErr(false)
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}

	function handleRef() {
		// console.log(e);
		// formik.current = e;
	}




	return (
		<>
			<Snackbar
				title="Success"
				appearance="success"
				message={successMsg}
				open={showSuccessMsg}
				close={() => setShowSuccessMsg(false)}
			/>
			<Snackbar
				title="Error"
				appearance="error"
				message={infoErrMsg}
				open={showSectionMsgErr}
				close={() => setShowSectionMsgErr(false)}
			/>
			<FormContainer>
				<PiDrawerHeader
					libraryType="atalskit"
					OnClose={() => props.showRecomendationModal(false)}
					title={props.title}
				/>
				<Formik
					validationSchema={recommendationSchema}
					onSubmit={handleSubmit}
					initialValues={props.initialValues}
					innerRef={handleRef}
				>
					{({ ...formik }: any) => {
						return (
							<Form style={{ overflow: "hidden" }} autoComplete="off">

								<RecommendationComponent
									formik={formik}
									isDisable={isSubmiting}
									onCancel={() => props.showRecomendationModal(false)}
									userid={props.userId}
									initialvalues={props.initialValues}
									data={props}
									setIsChecked={setIsChecked}
									isChecked={isChecked}
									submitDisable={submitDisable}
									setSubmitDisable={setSubmitDisable}
									setToggleChecked={setToggleChecked}
									toggleChecked={toggleChecked}
								/>

							</Form>
						)
					}}
				</Formik>
			</FormContainer>
		</>
	)
}

const RecommendationComponent = ({ formik, onCancel, userid, initialvalues, onFileupdate, setIsChecked, isChecked, toggleChecked, setToggleChecked, ...props }: any) => {

	const btnDisable = (prev: string, cur: string) => {
		if (prev !== cur) {
			props.setSubmitDisable(false)
		} else {
			props.setSubmitDisable(true)
		}
	}
	const handleChange = (e: any, type: string) => {
		if (type === "name") {
			btnDisable(initialvalues.testname, e.target.value)
		} else if (type === "description") {
			btnDisable(initialvalues.description, e.target.value)
		} else if (type === "brand") {
			btnDisable(initialvalues.brand, e.target.value)
		} else if (type === "dosage") {
			btnDisable(initialvalues.dosage, e.target.value)
		} else if (type === "price") {
			btnDisable(initialvalues.price, e.target.value)
		} else if (type === "link") {
			btnDisable(initialvalues.link, e.target.value)
		} else if (type === "toggle") {
			setIsChecked(!isChecked)
			setToggleChecked(!toggleChecked)
			btnDisable(initialvalues.status.value, e.target.checked)
		}

	}
	return (
		<>
			<RecommendationFormContent  >
				<FormInnerContainer>
					<UserDataInfo >

						<div style={{ paddingRight: "32px" }}>
							<FormField className="one-sibling gw-required">
								<PiInputForm name="testname"
									label="Test Name"
									onChange={(e: any) => handleChange(e, "name")}
									placeholder="Enter Test Name"
									libraryType='default'
									autoComplete="off"
								></PiInputForm>
							</FormField>
							<FormField className="one-sibling gw-required">
								<PiInputForm name="brand"
									label="Brand"
									onChange={(e: any) => handleChange(e, "brand")}
									placeholder="Enter Brand"
									libraryType='default'
									autoComplete="off"
								></PiInputForm>
							</FormField>
						</div>
						<div style={{ paddingRight: "32px" }}>
							<FormField className="one-sibling gw-required">
								<PiTextareaForm name="description"
									label="Description"
									onChange={(e: any) => handleChange(e, "description")}
									placeholder="Enter Description"
									libraryType='default'
								/>
							</FormField>
							<FormField className="one-sibling gw-required">
								<PiInputForm name="dosage"
									label="Dosage"
									onChange={(e: any) => handleChange(e, "dosage")}
									placeholder="Enter Dosage"
									libraryType='default'
									autoComplete="off"
								></PiInputForm>
							</FormField>


						</div>
						<div style={{ paddingRight: "32px" }}>
							<FormField className="one-sibling gw-required">
								<PiInputForm name="price"
									label="Price"
									onChange={(e: any) => handleChange(e, "price")}
									placeholder="Enter Price"
									libraryType='default'
									type="number"
									autoComplete="off"
								></PiInputForm></FormField>
							<FormField className="one-sibling gw-required">
								<PiInputForm name="link"
									label="Link to supplement"
									onChange={(e: any) => handleChange(e, "link")}
									placeholder="Enter Test Details"
									libraryType='default'
									autoComplete="off"
								></PiInputForm>
							</FormField>
						</div>
						<div>
							<div className="mt-3 m-10p">
								<label>Status</label>
								<div className="d-flex align-items-center">
									<PiToggle
										direction="row"
										label=""
										name="toggle"
										onChange={(e: any) => handleChange(e, "toggle")}
										size="large"
										isChecked={userid ? toggleChecked : isChecked}
									/>
									{userid ? <label className="statusLabel">{toggleChecked == true ? "Active" : "Inactive"} </label> :
										<label className="statusLabel">{isChecked == true ? "Active" : "Inactive"} </label>}
								</div>
							</div>
						</div>


					</UserDataInfo>
				</FormInnerContainer>
			</RecommendationFormContent>
			<FooterDiv className={userid && props.submitDisable ? "hideFooter" : "showFooter"}>
				<PiButton appearance="cancel"
					label="Cancel"
					type='button'
					size="large"
					onClick={() => onCancel()}
					className=" mr-3 " />
				<PiButton
					className={userid && props.submitDisable ? " disabled mr-3" : "mr-3 "}
					appearance="primary"
					label="Save"
					size="large"
					type="submit"
					// isDisabled={props.isDisable}
					isLoading={props.isDisable}
					onClick={formik.handleSubmit} />

			</FooterDiv>
		</>
	)
}