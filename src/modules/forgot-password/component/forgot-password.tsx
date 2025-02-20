import React, { useState, useEffect } from 'react'
import { LoginWrapper, LoginContentWrapper, LoginTitle, LoginContent, ForgotCancel } from '../../sign-in/component/sign-in_components'
import { PiTypography, PiButton, PiInputForm } from 'pixel-kit'
import { useHistory } from 'react-router-dom'
import { initialValues, handleRef } from '../helpers/forgot-helpers'
import { ForgotSchema } from '../validation/forgot-validation'
import { triggerApi } from '../../../services'
import { FormContainer } from '../../../styles/common-styles'
import { Form, Formik } from 'formik'
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps } from '../../../core/schema'
import Snackbar from '../../../core/snackbar'
import axios from 'axios'
import { forgotProps } from '../schema/forgot-schema'


const ForgotPassword = () => {
	const [infoMsg, setInfoMsg] = useState('')
	const [ErrMsg, setErrMsg] = useState('')
	const [showSectionMsg, setShowSectionMsg] = useState(false)
	const [showErrSectionMsg, setShoErrwSectionMsg] = useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)
	let history = useHistory()
	const apiBaseUrl = process.env.REACT_APP_API_URL;
	const d = new Date();
	let offset = d.getTimezoneOffset();
	const [guestToken, setGuestToken] = useState()

	useEffect(() => {
		guestLogin()
	}, [])

	function guestLogin() {
		axios({
			url: apiBaseUrl + apiEndpoint.guestLogin,
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==' },
			data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`
		})
			.then(function (response: any) {
				if (response.status == 200) {
					setGuestToken(response.data.token)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	function handleSubmit(data: forgotProps) {
		setIsSubmiting(true);
		const apiObject: PayloadProps = {
			payload: {
				email: data.email,
			},
			method: "POST",
			apiUrl: apiEndpoint.forgotApi,
			headers: { Authorization: guestToken }
		};

		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setIsSubmiting(false);
				if (res.status_code == 200) {
					setInfoMsg(res.data.message ? res.data.message : res.message)
					setShowSectionMsg(true)
					setTimeout(() => {
						setShowSectionMsg(false)
						history.replace('/sign-in')
					}, 4000)
				} else {
					setErrMsg(res.data.message ? res.data.message : res.message)
					setShoErrwSectionMsg(true)
					setTimeout(() => {
						setShoErrwSectionMsg(false)
					}, 4000)
				}

			})
			.catch((err: object) => {
				console.log(err, "Error");
			});


	}


	return (
		<>
			<FormContainer className="form-styles main section-common-padding">
				<Snackbar
					title="Error"
					appearance="error"
					message={ErrMsg}
					open={showErrSectionMsg}
					close={() => setShoErrwSectionMsg(false)}
				/>
				<Snackbar
					title="Success"
					appearance="success"
					message={infoMsg}
					open={showSectionMsg}
					close={() => setShowSectionMsg(false)}
				/>
				<Formik
					initialValues={initialValues}
					validationSchema={ForgotSchema}
					onSubmit={handleSubmit}
					innerRef={handleRef}

				>
					{({ ...formik }: any) => {
						return (
							<Form>
								<SignInComponent
									formik={formik}
									isDisable={isSubmiting}
								/>

							</Form>
						)
					}}
				</Formik>
			</FormContainer>
		</>
	)
}

const SignInComponent = ({ formik, ...props }: any) => {
	let history = useHistory()

	const SubmitFun = () => {
		formik.handleSubmit()

	}
	return (<>
		<LoginWrapper>
			<LoginContentWrapper>
				<LoginTitle>Forgot Pasword</LoginTitle> <PiTypography component="p">Please enter the registered email address to receive reset password instructions. </PiTypography>
				<LoginContent className="form-field-height gritwell-input">
					<PiInputForm name="email" label="Email" placeholder="Enter Email" autoFocus libraryType='atalskit' ></PiInputForm>
				</LoginContent>


				<LoginContent className="mt-3">
					<PiButton
						appearance="primary"
						label="Submit"
						type="submit"
						size="extraLarge"
						libraryType="atalskit"
						onClick={SubmitFun}
						isDisabled={props.isDisable}
						isLoading={props.isDisable}
						className="w-100"
					/>
				</LoginContent>

				<ForgotCancel className="mt-2">
					<PiButton
						appearance="cancel"
						label="Back to login"
						type="button"
						size="extraLarge"
						libraryType="atalskit"
						onClick={() => history.replace('/sign-in')}
						className="w-100"
					/>
				</ForgotCancel>
			</LoginContentWrapper>
		</LoginWrapper>
	</>

	)
}

export default ForgotPassword