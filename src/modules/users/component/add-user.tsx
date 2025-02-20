import { PiButton, PiInputForm, PiSelectForm, PiTypography, PiFleUploader, PiToggle, PiTextareaForm, PiDropdownTreeSelect } from 'pixel-kit'
import React, { useEffect, useState } from 'react'
import {
	DialogFormContent, FormInnerContainer, UserDataInfo, FormFlexWrapper, FormField, FooterDiv, PopupHeader,
	FormContainer,
	ImgUploadDiv
} from './add-user-components'
import { addUserSchema } from '../validation/add-user-validation'
import { Icon } from '../../../components';
import 'react-phone-input-2/lib/style.css'
import { handleRef } from '../helpers/add-user-helpers'
import { triggerApi } from '../../../services';
import { Form, Formik } from 'formik';
import { getLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point';
import { ApiResponseProps, PayloadProps } from '../../../core/schema';
import Snackbar from '../../../core/snackbar';
import { AdduserProps } from '../schema/adduser-schema';
import { DeleteWrap } from '../../../styles/common-styles';



export default function AddUser(props: any) {
	const [showSectionMsg, setShowSectionMsg] = useState(false)
	const [showResendMsg, setShowResendMsg] = useState(false)
	const [resendMsg, setResenMsg] = useState('')
	const [infoErrMsg, setInfoErrMsg] = useState<string>('')
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	const [showSectionMsgErr, setShowSectionMsgErr] = useState(false)
	const [ResendMsgErr, setResendMsgErr] = useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)
	const [filename, setFilename] = useState({ filename: '', original_filename: '' })
	const [isChecked, setIsChecked] = useState(true)
	const [toggleChecked, setToggleChecked] = useState(props.initialValues ? props.initialValues.status.value : '')
	const [specialsId, setspecialsId] = useState([])
	const [removeProfile, setRemoveProfile] = useState(false)
	const [deleteProfileSuccess, setDeleteProfileSuccess] = useState(false)
	const [deletePicSuccessMsg, setDeleteSuccessMsg] = useState('')
	const [allocationDefault, setAllocationDefault] = useState()
	// let specialsId: Array<string> = [];

	useEffect(() => {
		setspecialsId(props.specialists)
	}, [props.specialists])



	function handleSubmit(data: AdduserProps) {
		console.log(data)
		let imagename = removeProfile === false ? props.originalFile : '';
		setIsSubmiting(true)
		let weekdaysArr: any = [];
		if (data.day_of_the_week) {
			weekdaysArr.push(data.day_of_the_week._id || props.initialValues.day_of_the_week.value);
		}
		// let specialistsArr: any = [];
		// if (data.specialists && data.specialists.length) {
		//     data.specialists.map((data: any) => {
		//         specialistsArr.push(data._id || (props.initialValues.specialists && props.initialValues.specialists.value))
		//     })
		// }
		//  else {
		//     if (props.initialValues && props.initialValues.specialists) {
		//         specialistsArr.push(props.initialValues.specialists.value)
		//     }

		// }
		const apiObject: PayloadProps = {
			payload: {
				email: data.email,
				img_file_name: filename.original_filename || imagename,
				original_filename: filename.original_filename || imagename,
				img_unique_name: filename.filename || imagename,
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone,
				role_id: data.roleName.value || props.initialValues.roleName.value,
				status: props.userId ? toggleChecked : isChecked,
				zoom_link: data.zoom_link ? data.zoom_link : '',
				experience: data.experience && data.experience._id ? data.experience._id : '',               //select component
				allocation: data.allocation ? parseInt(data.allocation) : allocationDefault,
				time_zone: data.time_zone && data.time_zone._id ? data.time_zone._id : '',                 //select component
				background: data.background ? data.background : '',
				qualifications: data.qualifications ? data.qualifications : '',
				day_of_the_week: weekdaysArr ? weekdaysArr : [],
				specialists: specialsId && specialsId.length ? specialsId : []


			},
			method: props.userId ? "PUT" : "POST",
			apiUrl: props.userId ? apiEndpoint.addUsersApi.concat(props.userId) : apiEndpoint.addUsersApi,
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				setIsSubmiting(false)
				if (res.status_code !== 200) {
					setShowSectionMsgErr(true);
					setInfoErrMsg(res.message)
					setTimeout(() => {
						setShowSectionMsgErr(false)
						// props.onClick();
					}, 4000)
				}
				//  else if (res.status_code == 204) {
				//     setInfoErrMsg(res.message)
				//     setTimeout(() => {
				//         setShowSectionMsgErr(false)
				//     }, 4000)
				// }
				else {
					setShowSectionMsg(true)
					setTimeout(() => {
						setShowSectionMsg(false)
						props.showUserModal(false)
						props.onClick();
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}

	function ResenLink() {
		const apiObject: PayloadProps = {
			payload: {
				email: props.initialValues.email,
			},
			method: "POST",
			apiUrl: apiEndpoint.adminResetPasswordApi,
			headers: { Authorization: token }
		};
		triggerApi(apiObject)
			.then((res: ApiResponseProps) => {
				if (res.status_code === 200) {
					setResenMsg(res.data.message)
					setShowResendMsg(true)
					setTimeout(() => {
						setShowResendMsg(false)
					}, 4000)
				} else if (res.data.status_code === 402) {
					setInfoErrMsg(res.data.message ? res.data.message : res.message)
					setResendMsgErr(true)
					setTimeout(() => {
						setResendMsgErr(false)
					}, 4000)
				}
			})
			.catch((err: object) => {
				console.log(err, "Error");
			});
	}
	const specilization = (data: any) => {
		let specialistsArr: any = [];
		if (data && data.length) {
			data.map((specialist: any) => {
				return specialistsArr.push(specialist.value)
			})
			setspecialsId(specialistsArr)
		} else {
			setspecialsId([])
		}


	}


	return (
		<>
			<Snackbar
				title="Success"
				appearance="success"
				message={props.userId ? "You have updated the user details successfully" :
					"You have created an account successfully."}
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
			<Snackbar
				title="Success"
				appearance="success"
				message={resendMsg}
				open={showResendMsg}
				close={() => setShowSectionMsg(false)}
			/>
			<Snackbar
				title="Error"
				appearance="error"
				message={infoErrMsg}
				open={ResendMsgErr}
				close={() => setResendMsgErr(false)}
			/>
			<Snackbar
				title="Success"
				appearance="success"
				message={deletePicSuccessMsg}
				open={deleteProfileSuccess}
				close={() => setDeleteProfileSuccess(false)}
			/>
			<FormContainer>
				<PopupHeader>
					<div className="d-flex">
						<span className="d-flex" onClick={() => props.showUserModal(false)}> <Icon name="back" /> </span>
						<span><PiTypography component="h2">{props.header}</PiTypography></span>
					</div>
					{props.resetLink ? <a onClick={() => ResenLink()} className={props.initialValues.status.value === true ? "resetLink" : "resetLink disabled"}>  {props.resetLink} </a> : ''}
					{/* <PiButton appearance="primary"
                        label={props.resetLink}
                        type="button"
                        libraryType="atalskit"
                        onClick={() => ResenLink()}></PiButton> */}
				</PopupHeader>

				<Formik
					validationSchema={addUserSchema}
					onSubmit={handleSubmit}
					initialValues={props.initialValues}
					innerRef={handleRef}
				>
					{({ ...formik }: any) => {
						return (
							<Form style={{ overflow: "hidden" }} autoComplete="off">

								<AddUserComponent
									formik={formik}
									isDisable={isSubmiting}
									onCancel={() => props.showUserModal(false)}
									userid={props.userId}
									initialvalues={props.initialValues}
									// setFilename ={filename}
									onFileupdate={(file: any) => { setFilename(file); }}
									data={props}
									setIsChecked={setIsChecked}
									isChecked={isChecked}
									setToggleChecked={setToggleChecked}
									toggleChecked={toggleChecked}
									specializationFetch={specilization}
									editSpecialist={props.specialists}
									setRemoveProfile={setRemoveProfile}
									setDeleteSuccessMsg={setDeleteSuccessMsg}
									setDeleteProfileSuccess={setDeleteProfileSuccess}
									setAllocationDefault={setAllocationDefault}
								/>

							</Form>
						)
					}}
				</Formik>
			</FormContainer>
		</>
	)
}

const AddUserComponent = ({ formik, onCancel, userid, initialvalues, onFileupdate, setIsChecked, isChecked, toggleChecked, setToggleChecked, setAllocationDefault, ...props }: any) => {
	const token = getLocalStorage('token') ? getLocalStorage('token') : '';
	// const [inputValue, setInputValue] = useState()
	const [profilePic, setProfilePic] = useState('')
	const [roles, setRoles]: any = useState([])
	const [submitDisable, setSubmitDisable] = useState(true)
	const [dynamicFields, setDynamicFields] = useState([])
	const [specialistOptions, setSpecialistOptions] = useState<Array<Object>>([])



	const btnDisable = (prev: string, cur: string) => {
		if (prev !== cur) {
			setSubmitDisable(false)
		} else {
			setSubmitDisable(true)
		}
	}
	const handleChange = (e: any, type: string) => {
		// console.log(e, type)
		if (type === "first_name") {
			btnDisable(initialvalues.firstName, e.target.value)
		} else if (type === "last_name") {
			btnDisable(initialvalues.lastName, e.target.value)
		} else if (type === "phone") {

			const re = /^[0-9\b]+$/;
			if (e.target.value === '' || re.test(e.target.value)) {
				e.preventDefault();
			}
			btnDisable(initialvalues.phone, e.target.value)
		} else if (type === "role") {
			onRoleClick(e.value)
			btnDisable(initialvalues.roleName.label, e.label)
		} else if (type === "toggle") {
			setIsChecked(!isChecked)
			setToggleChecked(!toggleChecked)
			btnDisable(initialvalues.status.value, e.target.checked)
		} else if (userid && (type === "zoom_link" || type === "qualifications")) {
			btnDisable(initialvalues.zoom_link || initialvalues.qualifications, e.target.value)
		} else if (userid && type === "experience") {
			btnDisable(initialvalues.experience.label, e.label)
		} else if (userid && type === "background") {
			btnDisable(initialvalues.background, e.target.value)
		} else if (userid && type === "allocation") {
			btnDisable(initialvalues.allocation, e.target.value)
		}
		//  else if (userid  && type === "available_hours") {
		//     btnDisable(initialvalues.available_hours, e.target.value)
		// }
		else if (userid && type === "day_of_the_week") {
			btnDisable(initialvalues.day_of_the_week.label, e.label)
		} else if (userid && type === "time_zone") {
			btnDisable(initialvalues.time_zone.label, e.label)
		} else if (type === "hierarchy_select") {
			props.specializationFetch(e)
			// btnDisable(initialvalues.specialists.label, e[0] && e[0].label)
		}

	}
	useEffect(() => {
		const Element: any = document.getElementById('yourInputID')
		if (Element) {
			Element.addEventListener('keydown', function (e: any) {
				if (e.which === 38 || e.which === 40) {
					e.preventDefault();
				}
			});
		}
		getRole()
		if (userid) {
			onRoleClick(initialvalues.roleName.value)
		}
		setProfilePic(initialvalues.profile_pic);

	}, [])

	function getRole() {
		const apiObject1: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getRoles.concat("?exclude_admin=" + true),
			headers: { Authorization: token }
		}

		triggerApi(apiObject1)
			.then((res: ApiResponseProps) => {
				// setTimeout(() => {
				//     setSpinner(false)
				// }, 1000)
				let resp = res.data.result
				let role: any = [];
				resp.map((data: any, index: any) => {
					let roleObj = {
						label: data.name,
						value: data._id
					}
					role.push(roleObj)
				})
				setRoles(role.reverse())

			})
	}
	function onRoleClick(data: any) {
		const apiObject: PayloadProps = {
			payload: {},
			method: "GET",
			apiUrl: apiEndpoint.getRoleField.concat(data),
			headers: { Authorization: token }
		}
		triggerApi(apiObject)
			.then((response: ApiResponseProps) => {
				if (response.status_code == 200) {
					setDynamicFields(response.data.custome_fields);
					response.data.custome_fields.map((fields: any) => {
						if (fields.label == "Specialization") {
							setSpecialistOptions(fields.option)
							if (userid) {
								specializationOption(props.editSpecialist, fields.option)
							}

						}
						if (fields.label == "Available hours per week") {
							setAllocationDefault(fields.default_value)
						} else if (fields.label == "Allocation") {
							setAllocationDefault(fields.default_value)
						}
					})
				} else {

				}
			})
			.catch((err: object) => {
				console.log(err);
			});

	}



	const onUpload = (file: any) => {
		if (!file) {
			return false;
		}
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
					// setInfoMsg(res.data.message ? res.data.message : res.message)
					// setShowSectionMsg(true)
					setProfilePic(res.data.file_path);
					// setFilename(res.data.filename)
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
		const apiObject: PayloadProps = {
			payload: {},
			method: "DELETE",
			apiUrl: apiEndpoint.deleteProfilePicApi.concat(userid),
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



	const specilizationIds = (curr: any, selected: any) => {


		let specialistsArr: any = [];
		selected.map((data: any) => {
			specialistsArr.push(data.value)
		})
		specializationOption(specialistsArr, specialistOptions)
		if (JSON.stringify(props.editSpecialist) === JSON.stringify(specialistsArr)) {
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
					if (child.checked) {
						data.expanded = true;
					}
				});
				data['children'] = children;

			}
			finalData[index] = data;

		})
		setSpecialistOptions(finalData)
	}






	return (
		<>
			<DialogFormContent className="user-form">
				<FormInnerContainer>
					<UserDataInfo style={{ display: "flex", flexDirection: "row-reverse" }}>
						<div>
							<FormFlexWrapper style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
								<ImgUploadDiv className="profileEditUpload">
									<Icon name="ProfileUpload" />
									{profilePic && <DeleteWrap className="hoverWrapper">
										{/* <span onClick={onUpload}><Icon name="uploadicon" /></span> */}
										<span onClick={deleteProfilePic}><Icon name="deleteIcon" /></span>

									</DeleteWrap>}
									{/* <PiTypography component="h4">Profile</PiTypography> */}
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
										<img src={profilePic} width="160" height="160" alt="userImage
										" />
									</div>)
									}

								</ImgUploadDiv>


								<div style={{ display: "flex", alignItems: "center" }} className="mt-3">

									<PiToggle
										direction="row"
										// helpText="Active"
										name="toggle"
										onChange={(e: any) => handleChange(e, "toggle")}
										size="large"
										isChecked={userid ? toggleChecked : isChecked}
									/>

									{userid ? <label className="statusLabel">{toggleChecked == true ? "Active" : "Inactive"} </label> :
										<label className="statusLabel">{isChecked == true ? "Active" : "Inactive"} </label>}
								</div>
							</FormFlexWrapper>
						</div>

						<div style={{ paddingRight: "32px" }}>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gw-required">
									<PiInputForm name="firstName"
										label="First Name"
										onChange={(e: any) => handleChange(e, "first_name")}
										placeholder="Enter First Name"
										// onChange={handleChange}
										libraryType='default'
										autoComplete="off"
									></PiInputForm>
								</FormField>
								<FormField className="one-sibling gw-required">
									<PiInputForm name="lastName"
										label="Last Name"
										onChange={(e: any) => handleChange(e, "last_name")}
										placeholder="Enter Last Name"
										// onChange={handleChange}
										libraryType='default'
										autoComplete="off"
									></PiInputForm>
								</FormField>
							</FormFlexWrapper>

							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gw-required">
									<PiInputForm name="email"
										label="Email"
										isDisabled={userid ? true : false}
										placeholder="Enter Email"
										// onChange={(e: any) => handleChange(e)}
										libraryType='default'
										autoComplete="off"></PiInputForm>
								</FormField>

							</FormFlexWrapper>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gw-required">

									<PiInputForm name='phone'
										label="Phone Number"
										onChange={(e: any) => handleChange(e, "phone")}
										// value={inputValue}
										placeholder="Enter Phone Number"
										maxLength={15}
										autoComplete="off"
									></PiInputForm>

								</FormField>

							</FormFlexWrapper>
							<FormFlexWrapper className="form-field-height">
								<FormField className="one-sibling gritwell-select gw-required">
									<PiSelectForm name="roleName"
										options={roles}
										isMulti={false}
										label="Role"
										isDisabled={userid ? true : false}
										onChange={(e: any) => handleChange(e, "role")}
										variant="standard"
										isSearchable={false}
										placeholder="Select Role"
									// onChange={(e: any) => handleChange(e)}
									></PiSelectForm>
								</FormField>
							</FormFlexWrapper>


							{/* dynamic fields mapping*/}

							{dynamicFields && dynamicFields.map((data: any, index: number) => {
								return (
									data.type == "text" && (
										<FormFlexWrapper className="form-field-height" key={index}>
											<FormField className="one-sibling">
												<PiInputForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)} />
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "number" && (
										<FormFlexWrapper className="form-field-height" key={index}>
											<FormField className="one-sibling">
												<PiInputForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)}
													type={data.type}
													// value={data.default_value}
													defaultValue={data.default_value}
												/>
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "select" && (
										<FormFlexWrapper className="form-field-height" key={index}>
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
													data={specialistOptions}
													label={data.label}
													libraryType="atalskit"
													onChange={(e: any, data: any) => specilizationIds(e, data)}
													placeholder="Select..."
												/>
											</FormField>
										</FormFlexWrapper>
									) ||
									data.type == "TextArea" && (
										<FormFlexWrapper className="form-field-height" key={index}>
											<FormField className="one-sibling gritwell-input ">
												<PiTextareaForm name={data.name}
													label={data.label}
													placeholder={data.placeholder}
													onChange={(e: any) => handleChange(e, data.name)} />
											</FormField>
										</FormFlexWrapper>
									)
								)
							})}
						</div>

					</UserDataInfo>
				</FormInnerContainer>
			</DialogFormContent>
			<FooterDiv className={userid && submitDisable ? "hideFooter" : "showFooter"}>
				<PiButton appearance="cancel"
					label="Cancel"
					type='button'
					size="extraLarge"
					onClick={() => onCancel()}
					className=" mr-3 " />

				<PiButton
					className={userid && submitDisable ? " disabled mr-3" : "mr-3 "}
					appearance="primary"
					label="Save"
					size="extraLarge"
					type="submit"
					// isDisabled={props.isDisable}
					isLoading={props.isDisable}
					onClick={formik.handleSubmit} />



			</FooterDiv>
		</>
	)
}