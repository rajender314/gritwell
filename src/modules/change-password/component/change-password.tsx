import React, { useState, useContext } from 'react'
import { LoginWrapper, LoginContentWrapper, LoginTitle, LoginContent, ForgotCancel } from '../../sign-in/component/sign-in_components'
import { PiButton, PiInputForm, PiPasswordValidator } from 'pixel-kit'
import { Icon } from '../../../components/index'
import { useHistory } from 'react-router-dom'
import { initialValues, handleRef } from '../helpers/change-password-helpers'
import { ForgotSchema } from '../validation/change-password-validation'
import { triggerApi } from '../../../services'
import { AuthContext } from '../../../providers/auth'
import { Form, Formik } from 'formik'
import { UserListContainer, RightContainer, ButtonGroup, FormContainer } from '../../../styles/common-styles';
import { getLocalStorage, clearLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps } from '../../../core/schema'
import Snackbar from '../../../core/snackbar'
import { PasswordProps } from '../schema/changepass-schema'


const ForgotPassword = (formik: any) => {
	const [infoMsg, setInfoMsg] = useState('')
	const [showSectionMsg, setShowSectionMsg] = useState(false)
	const [showErrMsg, setShowErrMsg] = useState(false)
	const [infoErrMsg, setInfoErrMsg] = useState<string>('')
	let history = useHistory()
	const [isSubmiting, setIsSubmiting] = useState(false);
	// const [resetForm, setResetForm] = useState(false)

	const token = getLocalStorage('token') ? getLocalStorage('token') : '';

	function handleSubmit(data: PasswordProps) {
		setIsSubmiting(true)
		const apiObject: PayloadProps = {
			payload: {
				oldPassword: data.oldpassword,
				password: data.password,
				confirmPassword: data.confirmPassword,
				//id: userId
			},
			method: "POST",
			apiUrl: apiEndpoint.changePasswordApi,
			headers: { Authorization: token }
		};

		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				if (res.status_code == 200) {
					setIsSubmiting(false)
					setInfoMsg(res.data.message)
					setShowSectionMsg(true)
					setTimeout(() => {
						clearLocalStorage()
						window.location.reload()
						setTimeout(() => {
							history.replace("/sign-in")
						}, 100)

						setShowSectionMsg(false)
					}, 1000)
				} else {
					setIsSubmiting(false)
					setShowErrMsg(true)
					setInfoErrMsg(res.message)
					setTimeout(() => {
						setShowErrMsg(false)
					}, 4000)
				}

			})
			.catch((err: object) => {
				console.log(err, "Error");
			});


	}


	return (
		<>
			<UserListContainer>
				<RightContainer style={{ padding: "80px 0" }}>
					<div className="inner-container" style={{ height: "unset" }}>
						<div>
							<Snackbar
								title="Error"
								appearance="error"
								message={infoErrMsg}
								open={showErrMsg}
								close={() => setShowErrMsg(false)}
							/>
							<Snackbar
								title="Success"
								appearance="success"
								message={infoMsg}
								open={showSectionMsg}
								close={() => setShowSectionMsg(false)}
							/>
							<FormContainer>
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
						</div>
					</div>
				</RightContainer>
			</UserListContainer>
		</>
	)
}

const SignInComponent = ({ formik, ...props }: any) => {
	const [showpassword, setShowPassword] = useState(false)
	const [showOldPassword, setShowOldPassword] = useState(false)
	const [confPass, setShowConfPass] = useState(false)
	const [password, setPassword] = useState('')
	const { userInfo }: any = useContext(AuthContext)
	const toggleShowOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const toggleShowPassword = () => {
		setShowPassword(!showpassword);
	};
	const toggleShowConfPassword = () => {
		setShowConfPass(!confPass)
	}
	let history = useHistory()

	const SubmitFun = () => {
		formik.handleSubmit()
	}

	const HandleChange = (event: any) => {
		setPassword(event.target.value)
	}
	const onCancel = () => {
		if (userInfo && userInfo.user_type == 1) {
			if (userInfo.code == "admin") {
				history.replace(`/office/${getLocalStorage("leftMenuItem")}`)
			} else {
				history.replace("/office/clients")
			}

		} else if (userInfo && userInfo.user_type == 2) {
			history.replace("/customer/profile")
		}
	}
	const valueChange = (event: any) => {
	}
	return (<>
		<LoginWrapper>
			<LoginContentWrapper style={{ display: "flex", maxWidth: "600px", width: "561px", justifyContent: "space-between", alignItems: "center" }} >
				<div style={{ maxWidth: "60%", width: "100%" }}>
					<LoginTitle>Change Password</LoginTitle>
					{/* <div className="formContainer"> */}
					<div>


						<LoginContent className="form-field-height gritwell-input mt-3" style={{ position: 'relative' }}>
							<PiInputForm name="oldpassword"
								label="Old password"
								libraryType='atalskit'
								type={showOldPassword ? "text" : 'password'}
								placeholder="Old password"
								onKeyDown={() => console.log("input2")}
							/>
							<span className="icon-styles" onClick={toggleShowOldPassword}>
								<Icon name={!showOldPassword ? 'showicon' : 'openeye'} />
							</span>
						</LoginContent>


						<LoginContent className="form-field-height gritwell-input" style={{ position: 'relative' }}>
							<PiInputForm name="password"
								label="New password"
								libraryType='atalskit'
								type={showpassword ? "text" : 'password'}
								placeholder="New password"
								onChange={(e: any) => HandleChange(e)}
								onKeyDown={(e: any) => valueChange(e)}
							/>
							<span className="icon-styles" onClick={toggleShowPassword}>
								<Icon name={!showpassword ? 'showicon' : 'openeye'} />
							</span>
						</LoginContent>


						<LoginContent className="form-field-height gritwell-input" style={{ position: 'relative' }}>
							<PiInputForm name="confirmPassword"
								label="Confirm password" libraryType='atalskit'
								type={confPass ? "text" : 'password'}
								placeholder="Confirm password"
							/>
							<span className="icon-styles" onClick={toggleShowConfPassword}>
								<Icon name={!confPass ? 'showicon' : 'openeye'} />
							</span>
						</LoginContent>


                    </div>
                    <ButtonGroup className="d-flex flex-column flex-column-reverse align-items-center justify-content-center mt-3" >
                        <ForgotCancel className="mt-2" style={{ width: "100%" }}>
                            <PiButton
                                appearance="cancel"
                                label="Cancel"
                                type="button"
                                libraryType="atalskit"
                                onClick={onCancel}
                                shouldFitContainer
                                size= "extraLarge"
                            />
                        </ForgotCancel>
                        <LoginContent style={{ width: "100%" }}>
                            <PiButton
                                appearance="primary"
                                label="Submit"
                                type="submit"
                                libraryType="atalskit"
                                onClick={SubmitFun}
                                shouldFitContainer
                                isDisabled={props.isDisable}
                                isLoading={props.isDisable}
                                size= "extraLarge"
                            />
                        </LoginContent>
                    </ButtonGroup>


				</div>
				<LoginContent>
					<PiPasswordValidator
						maxSize={18}
						minSize={8}
						password={password}
					/>
				</LoginContent>
			</LoginContentWrapper>

		</LoginWrapper>
	</>

	)
}

export default ForgotPassword