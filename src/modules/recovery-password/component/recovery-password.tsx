
import { PiButton, PiInputForm,   PiPasswordValidator} from 'pixel-kit'
import React, { useState, useEffect } from 'react'
import { Icon } from '../../../components'
import { LoginWrapper, LoginContentWrapper, LoginTitle, LoginContent, ForgotCancel, SectionHolder, ExpiredPasswordSection } from '../../sign-in/component/sign-in_components'
import { RecoverySchema } from '../validation/recovery-validation'
import {
    initialValues,
    handleRef,
    // checkSpecialCharacters,
    // specialCharValid,
    // uppercaseValid,
    // numberValid,
    // charNumberValid,
    // lowerCharValid
} from '../helpers/forgot-helpers'
import { useParams, useLocation } from "react-router-dom"
import { triggerApi } from '../../../services'
import { useHistory } from 'react-router-dom'
import { FormContainer } from '../../../styles/common-styles'
import { Form, Formik } from 'formik';
import { clearLocalStorage } from '../../../core/localStorageService';
import apiEndpoint from '../../../core/apiend_point'
import { ApiResponseProps, PayloadProps } from '../../../core/schema'
import Snackbar from '../../../core/snackbar'
import axios from 'axios'
import { recoveryProps } from '../schema/forgot-schema'

export default function RecoveryPassword() {
    const { id }: any = useParams()
    const { type }: any = useParams()
    const location = useLocation();
    const [infoMsg, setInfoMsg] = useState<string>('')
    const [showSectionMsg, setShowSectionMsg] = useState(false)
    const [showRecoverySectionMsg, setRecoveryShowSectionMsg] = useState(false)
    let history = useHistory()
    const [noRecovery, setNoRecovery] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false);
    const d = new Date();
    let offset = d.getTimezoneOffset();
    const [guestToken, setGuestToken] = useState()
    const apiBaseUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        guestLogin()
        setNoRecovery(false)
    }, [])


    function guestLogin() {
        axios({
            url: apiBaseUrl + apiEndpoint.guestLogin,
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==' },
            data: `username=guest@gwc.com&password=Enter@123&offset=${offset}`
        })
            .then(function (response: any) {
                // alert(2)
                if (response.status == 200) {

                    setGuestToken(response.data.token)
                    setTimeout(() => {
                        verifyToken(response.data.token)
                    }, 100)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function verifyToken(data: string) {
        const apiObject: PayloadProps = {
            payload: {
                token_id: id,
                type: type
            },
            method: "POST",
            apiUrl: apiEndpoint.verifyTokenApi,
            headers: { Authorization: data }
        };

        triggerApi(apiObject)
            .then((res: ApiResponseProps) => {
                // console.log(res)
                if (res.status_code && res.status_code == 200) {
                    setNoRecovery(true)
                }
                else if (res.status_code && res.status_code == 402) {
                    setNoRecovery(false)
                    setInfoMsg(res.message)
                    setShowSectionMsg(true)
                }
            })
            .catch((err: object) => {
                history.replace("/sign-in")
            });
    }
    function handleSubmit(data: recoveryProps) {
        setIsSubmiting(true)
        const apiObject: PayloadProps = {
            payload: {
                token_id: id,
                password: data.password,
                confirm_password: data.confirmPassword,
                type: type
            },
            method: "POST",
            apiUrl: apiEndpoint.resetPasswordApi,
            headers: { Authorization: guestToken }
        };

        triggerApi(apiObject)
            .then((res: ApiResponseProps) => {
                setIsSubmiting(false)
                setInfoMsg(res.message)
                setRecoveryShowSectionMsg(true)
                setTimeout(() => {
                    clearLocalStorage()
                    setRecoveryShowSectionMsg(false)
                    history.replace('/sign-in')
                    window.location.reload()
                }, 1000)
            })
            .catch((err: object) => {
                console.log(err, "Error");
            });
    }
    // function handleRef(e: any) {
    //     // console.log(e);
    //     formik.current = e;
    // }

    return (
        <>
            <Snackbar
                title="Error"
                appearance="error"
                message={infoMsg}
                open={showSectionMsg}
                close={() => setShowSectionMsg(false)}
            />



            {noRecovery ? <FormContainer className="form-styles main section-common-padding" style={{ justifyContent: "unset", padding: "80px 0", overflowY: "auto" }}>

                <>
                    <Snackbar
                        title="Success"
                        appearance="success"
                        message="Password has been updated successfully"
                        open={showRecoverySectionMsg}
                        close={() => setRecoveryShowSectionMsg(false)}
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RecoverySchema}
                        onSubmit={handleSubmit}
                        innerRef={handleRef}
                    >
                        {({ ...formik }: any) => {
                            return (
                                <Form>
                                    <ForgotComponent
                                        formik={formik}
                                        isDisable={isSubmiting}
                                    />

                                </Form>
                            )
                        }}
                    </Formik> </>
            </FormContainer> : ''}
        </>
    )
}
const ForgotComponent = ({ formik, ...props }: any) => {


    const [showpassword, setShowPassword] = useState(false)
    const [confPass, setShowConfPass] = useState(false)
    let history = useHistory()

    const [password, setPassword] = useState('')
    // const theme = useContext(ThemeContext)

    const toggleShowPassword = () => {
        setShowPassword(!showpassword);
    };

    const toggleShowConfPassword = () => {
        setShowConfPass(!confPass)
    }


    const HandleChange = (event: any) => {
        setPassword(event.target.value)
        // console.log(event.target.value)
    }

    const onCancel = () => {
        clearLocalStorage()
        history.replace("/sign-in")
        window.location.reload()
    }
    return (<>
        <LoginWrapper className="main">
            <LoginContentWrapper className="section-common-padding">
                <LoginTitle>Password Update</LoginTitle>

                {/* <LoginContent>
                    <PiTypography component='pbold'>Your email</PiTypography>
                    <PiTypography component="pbold">dynamic@email.com</PiTypography>
                    <p className="para">{email}</p>
                </LoginContent> */}
                <div className="formContainer">


                    <LoginContent className="form-field-height gritwell-input" style={{ position: 'relative' }}>
                        <PiInputForm name="password"
                            label="New password"
                            libraryType='atalskit'
                            type={showpassword ? "text" : 'password'}
                            onChange={HandleChange}
                            onKeyDown={() => console.log("input2")}
                            placeholder="New password"
                        />
                        <span className="icon-styles" onClick={toggleShowPassword}>
                            <Icon name={!showpassword ? 'showicon' : 'openeye'} />
                        </span>
                    </LoginContent>

                    <LoginContent className="form-field-height gritwell-input" style={{ position: 'relative' }}>
                        <PiInputForm name="confirmPassword"
                            label="Confirm password" libraryType='atalskit' placeholder="Confirm password"
                            type={confPass ? "text" : 'password'}
                        />
                        <span className="icon-styles" onClick={toggleShowConfPassword}>
                            <Icon name={!confPass ? 'showicon' : 'openeye'} />
                        </span>
                    </LoginContent>

                    <LoginContent>

                        <PiPasswordValidator
                            maxSize={18}
                            minSize={8}
                            password={password}
                        />
                    </LoginContent>
                </div>
                <LoginContent className="mt-3">
                    <PiButton
                        appearance="primary"
                        label="Update"
                        type="submit"
                        size="extraLarge"
                        libraryType="atalskit"
                        onClick={formik.handleSubmit}
                        isDisabled={props.isDisable}
                        isLoading={props.isDisable}
                        className=""
                        shouldFitContainer

                    />
                </LoginContent>
                <ForgotCancel className="mt-2">
                    {/* <PiThemeContextProvider value={btnStyles}> */}
                    <PiButton
                        appearance="cancel"
                        label="Cancel"
                        type="submit"
                        size="extraLarge"
                        libraryType="atalskit"
                        onClick={onCancel}
                        className=""
                        shouldFitContainer

                    />
                    {/* </PiThemeContextProvider> */}
                </ForgotCancel>
            </LoginContentWrapper>
        </LoginWrapper>
        {/* :
        <LoginWrapper>
            <LoginContentWrapper>
                <LoginContent>
                    <PiTypography component="h1">Test</PiTypography>
                </LoginContent>
            </LoginContentWrapper>
        </LoginWrapper> */}
    </>
    )


}