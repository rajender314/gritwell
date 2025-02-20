import { PiButton, PiDropdownMenu, PiFleUploader, PiInputForm, PiTypography } from 'pixel-kit'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Icon } from '../../../components'
import { triggerApi } from '../../../services'
import { ButtonGroup, ProfileInner, RightContainer, UserListContainer, FormContainer, ProfileHeader } from '../../../styles/common-styles'
import { ProfileForm, UserDataInfo, FormFlexWrapper, FormField, ImgUploadDiv } from '../../users/component/add-user-components'
import { Form, Formik } from 'formik';
import { AuthContext } from '../../../providers/auth'
import { customerProfileSchema } from '../validations/customer-profile-validations';
import { getLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps } from '../../../core/schema'
import { handleSubmitFunProps } from '../schema/customer-profile-schema'

export default function CustomerProfile() {
	const { userInfo }: any = useContext(AuthContext);
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [isSubmiting, setIsSubmiting] = useState(false)


	const initialValues = {
		firstName: userInfo.first_name,
		lastName: userInfo.last_name,
		email: userInfo.email,
		phone: userInfo.phone,
	}
	function handleRef(e: any) {
		// if (data.target.value !== userDetails[data.target.name]) {
		//     setDisableButton(false);
		// }
	}
	const handleChange = (e: any) => {
	}
	function handleSubmit(data: handleSubmitFunProps) {
		setIsSubmiting(true)
		const apiObject: PayloadProps = {
			payload: {
				email: data.email,
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone,
				role_id: userInfo.user_data.role_id,
				id: userInfo.user_data.id
			},
			method: "PUT",
			apiUrl: apiEndpoint.addUserApi,
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				// console.log(res.data)
				setIsSubmiting(false)
				if (res.status_code === 200) {

				}
				else {
					setTimeout(() => {
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});

	}
	return (
		<UserListContainer >
			{/* <CustomerLeftMenu /> */}
			<RightContainer style={{ margin: "32px auto" }} >
				<div className="inner-container">
					<FormContainer className="form-box-container">

						<Formik
							validationSchema={customerProfileSchema}
							onSubmit={handleSubmit}
							initialValues={initialValues}
							innerRef={handleRef}
							handleChange={handleChange}
						>
							{({ values, handleChange, ...formik }: any) => {
								return (
									<Form>
										<CustomerProfileComponent
											formik={formik}
											isDisable={isSubmiting}
											onChange={handleChange}
										/>

									</Form>
								)
							}}
						</Formik>
					</FormContainer>
				</div>
			</RightContainer>
		</UserListContainer>
	)
}


const CustomerProfileComponent = ({ formik, ...props }: any) => {

	let history = useHistory()
	const { userInfo }: any = useContext(AuthContext);

	const [submitDisable, setSubmitDisable] = useState(true)
	const btnDisable = (prev: string, cur: string) => {
		if (prev !== cur) {
			setSubmitDisable(false)
		} else {
			setSubmitDisable(true)
		}
	}
	const handleChange = (e: any, type: string) => {
		if (type === "first_name") {
			btnDisable(userInfo.user_data.first_name, e.target.value)
		} else if (type === "last_name") {
			btnDisable(userInfo.user_data.last_name, e.target.value)
		} else if (type === "phone") {
			btnDisable(userInfo.user_data.phone, e.target.value)
		}

	}





	// const onUpload = (file: any) => {
	// 	// console.log(file)
	// 	const body = new FormData()
	// 	body.append('profile_pic', file[0])
	// 	const apiObject: PayloadProps = {
	// 		payload: body,
	// 		method: "POST",
	// 		apiUrl: apiEndpoint.uploadProfilePicApi,
	// 		headers: {
	// 			Accept: '*/*',
	// 			enctype: 'multipart/form-data',
	// 			'content-type': 'multipart/form-data'
	// 		}
	// 	};
	// 	triggerApi(apiObject)
	// 		.then((res: ApiResponseProps) => {
	// 			if (res.status_code == 200) {
	// 			}
	// 		})
	// 		.catch((err: object) => {
	// 			console.log(err, "Error");
	// 		});
	// }
	const profileMenu = (menu: any) => {
		// console.log(menu)
		if (menu.id === 1) {
			history.replace("/changepassword")
		}
	}

	return (
		<>
			<ProfileForm className="user-form">
				<ProfileInner >
					<ProfileHeader>
						<div className="d-flex align-items-center">
							{/* <span onClick={() => console.log()} > <Icon name="back" /> </span> */}
							<span><PiTypography component="h2">Profile</PiTypography></span>
						</div>
						<div>
							<PiDropdownMenu
								items={[
									{
										id: 1,
										name: 'Change Password',
									},
								]}
								label=""
								onOpenChange={profileMenu}
							/>
						</div>
					</ProfileHeader>

					<UserDataInfo>
						<FormFlexWrapper className="justify-content-center">
							<ImgUploadDiv>
								<Icon name="uploadIcon" />
								{/* <PiTypography component="h4">Profile</PiTypography> */}
								<PiFleUploader
									dropzoneProps={{
										accept: 'image/*',
										disabled: false,
										maxFileSizeErroMessage: 'Max file uplode size should be 5MB',
										maxSize: 5242880,
										multiple: false,
										noDrag: false,
										text: 'Profile Picture',
										validFieErrorMessage: 'Upload valid file type'
									}}
									onUpload={''}
								/>
							</ImgUploadDiv>

						</FormFlexWrapper>

						<FormFlexWrapper className="form-field-height mt-3" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="firstName"
									label="First Name"
									placeholder="Enter First Name"
									onChange={(e: any) => handleChange(e, "first_name")}
									libraryType='default'></PiInputForm>
							</FormField>

						</FormFlexWrapper>

						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="lastName"
									label="Last Name"
									placeholder="Enter Last Name"
									onChange={(e: any) => handleChange(e, "last_name")}
									libraryType='default'></PiInputForm>
							</FormField>
						</FormFlexWrapper>

						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="email"
									label="Email"
									placeholder="Enter Email"
									isDisabled
									// onChange={(e: any) => handleChange(e)}
									libraryType='default'></PiInputForm>
							</FormField>

						</FormFlexWrapper>

						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField style={{ marginTop: "5px" }} className="one-sibling">

								<PiInputForm name='phone'
									label="Phone Number"
									type="number"
									onChange={(e: any) => handleChange(e, "phone")}
									placeholder="Enter Phone Number"
								// type="hidden"
								></PiInputForm>
							</FormField>
						</FormFlexWrapper>

						<ButtonGroup>
							<PiButton appearance="cancel"
								label="Cancel"
								type='button'
								size="large"
								onClick={() => console.log()}
								className="mr-3" />
							<PiButton
								appearance="primary"
								label="Save"
								type="submit"
								size="large"
								isDisabled={props.isDisable || submitDisable}
								isLoading={props.isDisable}
								onClick={formik.handleSubmit} />
						</ButtonGroup>


					</UserDataInfo>
				</ProfileInner>

			</ProfileForm>
		</>
	)
}