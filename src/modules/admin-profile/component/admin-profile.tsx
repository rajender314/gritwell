import { PiButton, PiDropdownMenu, PiDropdownTreeSelect, PiFleUploader, PiInputForm, PiSelectForm, PiTextareaForm, PiTypography } from 'pixel-kit'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Icon } from '../../../components'
import { triggerApi } from '../../../services'
import { FormContainer, ProfileHeader, UserListContainer, ProfileInner, RightContainer, ButtonGroup, DeleteWrap } from '../../../styles/common-styles'
import { ProfileForm, UserDataInfo, FormFlexWrapper, FormField, ImgUploadDiv } from '../../users/component/add-user-components'
import { Form, Formik } from 'formik';
import { profileSchema } from '../validation/profile-validation'
import { AuthContext } from '../../../providers/auth'
import { setLocalStorage, getLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps } from '../../../core/schema'
import Snackbar from '../../../core/snackbar'
import { handleSubmitFunProps } from '../schema/profile-schema'
import { objectProps } from '../../users/schema/adduser-schema'

export default function Profile() {
	const [isSubmiting, setIsSubmiting] = useState(false)
	const { userInfo, setUserInfo }: any = useContext(AuthContext);
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [showSectionMsg, setShowSectionMsg] = useState(false);
	const [showErrMsg, setShowErrMsg] = useState(false);
	const [submitDisable, setSubmitDisable] = useState(true)
	const [filename, setFilename] = useState({ filename: '', original_filename: '' })
	const [errMsg, setErrMsg] = useState('');
	const [removeProfile, setRemoveProfile] = useState(false)
	const [deleteProfileSuccess, setDeleteProfileSuccess] = useState(false)
	const [deletePicSuccessMsg, setDeleteSuccessMsg] = useState('')
	// const [dynamicFields, setDynamicFields] = useState([])
	// const [specialistOptions, setSpecialistOptions] = useState<Array<Object>>([])
	// let specialsId: Array<string> = [];
	const [specialistId, setSpecialsitId] = useState([])

	let experience = userInfo.experience && userInfo.experience._id ? userInfo.experience._id : '';

	let specialists: Array<string> = [];
	userInfo.specialists && userInfo.specialists.map((data: any) => {
		return specialists.push(data)
	})

	let time_zone = userInfo.time_zone && userInfo.time_zone.value ? userInfo.time_zone.value : ''

	let timezone = {
		value: userInfo.time_zone && userInfo.time_zone._id ? userInfo.time_zone._id : '',
		label: userInfo.time_zone && userInfo.time_zone.label ? userInfo.time_zone.label : ''
	}


	let weekday = {};
	userInfo.day_of_the_week && userInfo.day_of_the_week.map((data: any) => {
		return weekday = {
			value: data._id,
			label: data.label
		}
	})
	useEffect(() => {
		setSpecialsitId(userInfo.specialists)
	}, [userInfo.specialists])

	useEffect(() => {
		getProfileDetails()
	}, [])
	const [initialVal, setinitailVal] = useState<any>(
		{
			firstName: userInfo.first_name,
			lastName: userInfo.last_name,
			email: userInfo.email,
			phone: userInfo.phone,
			status: { label: 'Active', value: "true" },
			zoom_link: userInfo.zoom_link,
			experience: experience ? experience : [],
			allocation: userInfo.allocation,
			// specialists: specialists,
			time_zone: timezone,
			background: userInfo.background,
			qualifications: userInfo.qualifications,
			// available_hours: userInfo.available_hours,
			day_of_the_week: weekday,
		}
	)

	function handleSubmit(data: handleSubmitFunProps) {
		let imagename = removeProfile === false ? userInfo.img_name : '';
		setIsSubmiting(true)
		let weekdaysArr: any = [];
		if (data.day_of_the_week && data.day_of_the_week._id) {
			weekdaysArr.push(data.day_of_the_week._id);
		} else {
			userInfo.day_of_the_week && userInfo.day_of_the_week.map((data: objectProps) => {
				return weekdaysArr.push(data._id)
			})

		}

		const apiObject: PayloadProps = {

			payload: {
				email: data.email,
				img_file_name: filename.original_filename || imagename,
				original_filename: filename.original_filename || imagename,
				img_unique_name: filename.filename || imagename,
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone,
				id: userInfo._id,
				role_id: userInfo.role_id,
				zoom_link: data.zoom_link || userInfo.zoom_link,
				experience: experience,
				allocation: data.allocation ? parseInt(data.allocation) : 0,
				specialists: specialistId.length ? specialistId : [],
				time_zone: (data.time_zone._id ? data.time_zone._id : '') || time_zone,
				background: data.background || userInfo.background,
				qualifications: data.qualifications || userInfo.qualifications,
				// available_hours: data.available_hours || userInfo.available_hours,
				day_of_the_week: (weekdaysArr ? weekdaysArr : []) || weekday
			},
			method: "PUT",
			apiUrl: apiEndpoint.getProfileApi,
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setIsSubmiting(false)
				if (res.status_code === 200) {
					setSubmitDisable(true)
					setShowSectionMsg(true)
					const userData = { ...userInfo, ...res.data };
					setLocalStorage('userData', JSON.stringify(res.data))
					setinitailVal(userData)
					setUserInfo(userData)
					setTimeout(() => {
						setShowSectionMsg(false)
					}, 4000)
				}
				else {
					setErrMsg(res.data ? res.data : res.message)
					setShowErrMsg(true)
					setTimeout(() => {
						setShowErrMsg(false)
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}


	async function getProfileDetails() {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getProfileApi,
			headers: { Authorization: getLocalStorage('token') }
		}
		await triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code === 200) {
					const userData = { ...userInfo, ...response.data };
					setLocalStorage('userData', JSON.stringify(response.data));
					setinitailVal(userData)
					setUserInfo(userData)
					let profile_pic = (userInfo.img_file_name) ? userInfo.display_url : '';
					setinitailVal(
						{
							firstName: userInfo.first_name,
							lastName: userInfo.last_name,
							email: userInfo.email,
							phone: userInfo.phone,
							zoom_link: userInfo.zoom_link,
							experience: experience,
							allocation: userInfo.allocation,
							// specialists: specialists,
							time_zone: timezone,
							background: userInfo.background,
							qualifications: userInfo.qualifications,
							// available_hours: userInfo.available_hours,
							day_of_the_week: weekday,

							profile_pic: profile_pic
						}
					)

				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});
	}





	function handleRef(e: any) {

	}
	function handleChange(data: any) {
		// console.log(data)
	}
	const specilization = (data: any) => {
		let specialistsArr: any = [];
		data.map((specialist: any) => {
			return specialistsArr.push(specialist.value)
		})
		setSpecialsitId(specialistsArr)
	}
	return (
		<UserListContainer>
			{/* <LeftMenu /> */}
			<RightContainer>

				<div className="inner-container" style={{ height: "unset" }}>
					<FormContainer className="form-box-container">
						<Snackbar
							title="Success"
							appearance="success"
							message="Your profile has been updated successfully"
							open={showSectionMsg}
							close={() => setShowSectionMsg(false)}
						/>
						<Snackbar
							title="Error"
							appearance="error"
							message={errMsg}
							open={showErrMsg}
							close={() => setShowErrMsg(false)}
						/>
						<Snackbar
							title="Success"
							appearance="success"
							message={deletePicSuccessMsg}
							open={deleteProfileSuccess}
							close={() => setDeleteProfileSuccess(false)}
						/>
						<Formik
							validationSchema={profileSchema}
							onSubmit={handleSubmit}
							initialValues={initialVal}
							innerRef={handleRef}
							handleChange={handleChange}
						>

							{({ values, handleChange, ...formik }: any) => {
								return (
									<Form autoComplete="off">
										<AdminProfile
											formik={formik}
											isDisable={isSubmiting}
											onChange={handleChange}
											setSubmitDisable={setSubmitDisable}
											submitDisable={submitDisable}
											onFileupdate={(file: any) => { setFilename(file); }}
											specializationFetch={specilization}
											specialists={specialists}
											setRemoveProfile={setRemoveProfile}
											setDeleteSuccessMsg={setDeleteSuccessMsg}
											setDeleteProfileSuccess={setDeleteProfileSuccess}
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
const AdminProfile = ({ formik, submitDisable, setSubmitDisable, onFileupdate, ...props }: any) => {
	let history = useHistory()
	const { userInfo }: any = useContext(AuthContext);
	const [profilePic, setProfilePic] = useState('')
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [dynamicFields, setDynamicFields] = useState([])
	const [specialistOptions, setSpecialistOptions] = useState<Array<Object>>([])

	const btnDisable = (prev: string, cur: string) => {
		if (prev !== cur) {
			setSubmitDisable(false)
		} else {
			setSubmitDisable(true)
		}
	}

	useEffect(() => {
		let profilePic = (userInfo.img_name) ? userInfo.display_url : ''
		setProfilePic(profilePic);
	}, [])
	const handleChange = (e: any, type: string) => {

		// console.log(e)
		if (type === "first_name") {
			btnDisable(userInfo.first_name, e.target.value)
		} else if (type === "last_name") {
			btnDisable(userInfo.last_name, e.target.value)
		} else if (type === "phone") {
			btnDisable(userInfo.phone, e.target.value)
		} else if ((type === "zoom_link" || type === "qualifications")) {
			btnDisable(userInfo.zoom_link || userInfo.qualifications, e.target.value)
		}
		//  else if ( type === "experience") {
		//     btnDisable(userInfo.experience.label, e.label)
		// }
		//  else if ( type === "available_hours") {
		//     btnDisable(userInfo.available_hours.toString(), e.target.value)
		// }
		else if (type === "day_of_the_week") {
			btnDisable(userInfo.day_of_the_week.label, e.label)
		} else if (type === "background") {
			btnDisable(userInfo.background, e.target.value)
		} else if (type === "time_zone") {
			btnDisable(userInfo.time_zone.label, e.label)
		} else if (type === "hierarchy_select") {
			props.specializationFetch(e)
		} else if (type === "allocation") {
			btnDisable(userInfo.allocation, e.target.value)
		}

	}



	const onUpload = (file: any) => {
		const body = new FormData()
		body.append('profile_pic', file[0])
		const apiObject: PayloadProps = {
			payload: body,
			method: "POST",
			apiUrl: apiEndpoint.uploadProfilePicApi,
			headers: {
				Authorization: token,
				Accept: '*/*',
				enctype: 'multipart/form-data',
				'content-type': 'multipart/form-data'
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				if (res.success) {
					setProfilePic(res.data.file_path);
					onFileupdate({
						filename: res.data.filename,
						original_filename: res.data.original_name,
					});
					setSubmitDisable(false);
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const deleteUploadedPic = () => {
		setSubmitDisable(false);
		const body = new FormData()
		const apiObject: PayloadProps = {
			payload: body,
			method: "DELETE",
			apiUrl: apiEndpoint.deleteProfilePicApi.concat(userInfo._id),
			headers: {
				Authorization: token,
			}
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				if (res.status_code === 200) {
					props.setDeleteSuccessMsg(res.data ? res.data : res.data.message)
					props.setRemoveProfile(true)
					props.setDeleteProfileSuccess(true)
					setTimeout(() => {
						props.setDeleteProfileSuccess(false)
					}, 1500)
					onFileupdate({
						filename: '',
						original_filename: '',
					});
					setProfilePic('');
					setSubmitDisable(false);
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}

	const deleteProfilePic = () => {
		deleteUploadedPic()
		setProfilePic('')
	}
	const onCancel = () => {
		if (userInfo && userInfo.user_type === 1) {
			if (userInfo.code === "admin") {
				history.replace(`/office/${getLocalStorage("leftMenuItem")}`)
			} else {
				history.replace("/office/clients")
			}

		} else if (userInfo && userInfo.user_type === 2) {
			history.replace("/customer/profile")
		}

		// if (localStorage.getItem("leftMenu") == "admin") {
		//     history.replace("/office/user")
		// }
		// if (localStorage.getItem("leftMenu") == "clients") {
		//     history.replace("/office/clients")
		// }

	}
	useEffect(() => {
		onRoleClick(userInfo)

	}, [userInfo])
	function onRoleClick(data: any) {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getRoles.concat(data.role_id),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code == 200) {
					setDynamicFields(response.data.custome_fields)
					response.data.custome_fields.map((fields: any) => {
						if (fields.label == "Specialization") {
							setSpecialistOptions(fields.option)
							specializationOption(props.specialists, fields.option)
						}
					})
				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});

	}
	const profileMenu = (menu: any) => {
		if (menu.id === 1) {
			history.replace("/changepassword")
		}
	}
	const specilizationIds = (curr: any, selected: any) => {
		let specialistsArr: any = [];
		selected.map((data: any) => {
			specialistsArr.push(data.value)
		})

		specializationOption(specialistsArr, specialistOptions)
		if (JSON.stringify(props.specialists) === JSON.stringify(specialistsArr)) {
			setSubmitDisable(true)
		} else setSubmitDisable(false)
		handleChange(selected, "hierarchy_select")
	}

	function specializationOption(specialistsArr: Array<string>, specialistOptions: any) {
		let finalData = new Array();
		specialistOptions.map((data: any, index: number) => {
			data.checked = specialistsArr.includes(data.value) ? true : false;
			if (data.checked == true) {
				data.expanded = true;
			}
			let children = data.children;
			if (data.children) {

				children.length && children.map((child: any, i: number) => {
					child.checked = specialistsArr.includes(child.value) ? true : data.checked;
					children[i] = child
				});
				data['children'] = children;
			}
			finalData[index] = data;

		})
		setSpecialistOptions(finalData)
	}

	return (
		<>
			<ProfileForm className="user-form">
				<ProfileInner >
					<ProfileHeader>
						<div className="d-flex align-items-center">
							{/* <span onClick={onCancel} > <Icon name="back" /> </span> */}
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
							<ImgUploadDiv className="profileEditUpload">
								<Icon name="ProfileUpload" />
								{profilePic && <DeleteWrap className="hoverWrapper" onClick={deleteProfilePic}>
									<Icon name="deleteIcon" />
								</DeleteWrap>}
								<PiFleUploader
									dropzoneProps={{
										accept: 'image/*',
										disabled: false,
										maxFileSizeErroMessage: 'Max file uplode size should be 5MB',
										maxSize: 5242880,
										multiple: false,
										noDrag: false,
										// text: 'Profile Picture',
										validFieErrorMessage: 'Upload valid file type'
									}}
									onUpload={onUpload}
								/>
								{profilePic && (<div style={{ display: "flex" }}>
									<img src={profilePic} width="160" height="160" alt="userProfileImage" />
								</div>)
								}
							</ImgUploadDiv>
						</FormFlexWrapper>
						<FormFlexWrapper className="form-field-height mt-3" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="firstName"
									label="First Name"
									placeholder="Enter First Name"
									onChange={(e: any) => handleChange(e, "first_name")}
									// onChange={handleChange}
									libraryType='default'></PiInputForm>
							</FormField>
						</FormFlexWrapper>
						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="lastName"
									label="Last Name"
									onChange={(e: any) => handleChange(e, "last_name")}
									placeholder="Enter Last Name"
									// onChange={handleChange}
									libraryType='default'></PiInputForm>
							</FormField>
						</FormFlexWrapper>
						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name="email"
									label="Email"
									isDisabled
									placeholder="Enter Email"
									// onChange={(e: any) => handleChange(e)}
									libraryType='default'></PiInputForm>
							</FormField>
						</FormFlexWrapper>
						<FormFlexWrapper className="form-field-height" style={{ width: "100%" }}>
							<FormField className="one-sibling">
								<PiInputForm name='phone'
									label="Phone Number"
									maxLength={15}
									onChange={(e: any) => handleChange(e, "phone")}
									placeholder="Enter Phone Number"
								// type="hidden"
								></PiInputForm>
							</FormField>
						</FormFlexWrapper>

						<>
							{dynamicFields && dynamicFields.map((data: any, index: number) => {
								return (
									data.type == "text" && (
										<FormFlexWrapper className="form-field-height" style={{ width: "100%" }} key={index}>
											<FormField className="one-sibling">
												<PiInputForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)} />
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "number" && (
										<FormFlexWrapper className="form-field-height" style={{ width: "100%" }} key={index}>
											<FormField className="one-sibling">
												<PiInputForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)}
													type={data.type} />
											</FormField>
										</FormFlexWrapper>
									) ||
									(data.type == "select" && data.hide_profile !== true) && (
										<FormFlexWrapper className="form-field-height" style={{ width: "100%" }} key={index}>
											<FormField className="one-sibling gritwell-select">
												<PiSelectForm name={data.name}
													options={data.option}
													label={data.label}
													placeholder={data.placeholder}
													isMulti={data.is_multi}
													variant="standard"
													onChange={(e: any) => handleChange(e, data.name)}

												/>
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "hierarchy_select" && (
										<FormFlexWrapper className="form-field-height" key={index}>
											<FormField className="one-sibling gritwell-select">
												{/* <PiSelectForm name={data.name}
                                                    options={data.option}
                                                    label={data.label}
                                                    placeholder={data.placeholder}
                                                    isMulti={data.is_multi}
                                                    variant="standard"
                                                    onChange={(e: any) => handleChange(e, data.name)}

                                                /> */}
												<PiDropdownTreeSelect
													name={data.name}
													data={data.option}
													label={data.label}
													libraryType="atalskit"
													onChange={(e: any, data: any) => specilizationIds(e, data)}
													placeholder="Select..."
												/>
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "TextArea" && (
										<FormFlexWrapper className="form-field-height" style={{ width: "100%" }} key={index}>
											<FormField className="one-sibling">
												<PiTextareaForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)} />
											</FormField>
										</FormFlexWrapper>
									)
								)
							})}
						</>

					</UserDataInfo>
				</ProfileInner>

				<ButtonGroup className={submitDisable ? "hideFooter" : "showFooter d-flex flex-column flex-column-reverse btnGroup-custom-container mt-3"}>
					<PiButton appearance="cancel"
						label="Cancel"
						type='button'
						// onClick={onCancel}
						onClick={() => onCancel()}
						size="extraLarge"
						shouldFitContainer
						className="mt-2" />
					<PiButton
						appearance="primary"
						label="Save"
						shouldFitContainer
						type="submit"
						size="extraLarge"
						// isDisabled={props.isDisable || submitDisable}
						isLoading={props.isDisable}
						onClick={formik.handleSubmit} />
				</ButtonGroup>
			</ProfileForm>
		</>
	)
}