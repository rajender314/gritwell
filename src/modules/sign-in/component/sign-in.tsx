import React, { useState, useRef, useContext, useEffect } from "react";
import {
  LoginWrapper,
  LoginContentWrapper,
  LoginTitle,
  LoginContent,
} from "./sign-in_components";
import { PiButton, PiInputForm } from "pixel-kit";
import { Icon } from "../../../components/index";
import { primaryColor } from "../../../styles/index";
import { signInSchema } from "../validation/sign-in-validation";
import { useHistory } from "react-router-dom";
import { handleRef, initialValues } from "../helpers/sign-in-helpers";
import { triggerApi } from "../../../services";
import { AuthContext } from "../../../providers/auth";
import { FormContainer } from "../../../styles/common-styles";
import { Form, Formik } from "formik";
import axios from "axios";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../core/localStorageService";
import apiEndpoint from "../../../core/apiend_point";
import { ApiResponseProps, PayloadProps } from "../../../core/schema";
import Snackbar from "../../../core/snackbar";
import { SigninProps } from "../schema/sign-schema";

import { getGlobalDataAsync } from "../../../store/modules/globalData";
import { useAppDispatch } from "../../../store/hooks";

import backDropBG1 from "../../../../src/assets/loginBackdropBG1.png";
import backDropBG2 from "../../../../src/assets/loginBackdropBG2.png";

const SignIn = () => {
  let history = useHistory();
  const [infoMsg, setInfoMsg] = useState<string>("");
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const { setUserInfo } = useContext(AuthContext);
  const [isLoading, setShowLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const d = new Date();
  let offset = d.getTimezoneOffset();
  setLocalStorage("offset", offset.toString());
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    let redirectPage = !getLocalStorage("leftMenuItem")
      ? "user"
      :
       getLocalStorage("leftMenuItem");
    if (!token) {
      setShowLoading(true);
    } else {
      history.replace(`/office/${redirectPage}`);
    }
  }, []);

  function handleSubmit(data: SigninProps) {
    setIsSubmiting(true);
    axios({
      url: apiBaseUrl + apiEndpoint.signInApi,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==",
      },
      data: `username=${encodeURIComponent(data.email)}&password=${
        data.password
      }&offset=${offset}`,
    })
      .then(function (response: any) {
        if (response.data.status_code == 200) {
          setLocalStorage("token", response.data.token);
          dispatch(getGlobalDataAsync());
          getProfileDetails();
        } else if (response.status_code == 402) {
          setIsSubmiting(false);
          setInfoMsg(response.data.message);
          setShowSectionMsg(true);
        } else {
          setIsSubmiting(false);
          setInfoMsg(response.data.message);
          setIsSubmiting(false);
          // setToastProps({
          //     appearance: "error",
          //     title: "Success",
          //     message: response.data.message,
          //     open: showSectionMsg,
          //     close: () => setShowSectionMsg(false)
          // })
          setTimeout(() => {
            setShowSectionMsg(false);
          }, 4000);
          setShowSectionMsg(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //     const apiObject = {
    //         payload: {
    //             username: data.email,
    //             password: data.password,
    //             offset: offset
    //         },
    //         method: "POST",
    //         apiUrl: "login",
    //         headers: {}
    //     };
    //     triggerApi(apiObject)
    //         .then((response: any) => {

    //             if (response.status_code == 200) {
    //                 localStorage.setItem("token", response.data.token)
    //                 getProfileDetails()
    //             } else {
    //                 setIsSubmiting(false);
    //                 setInfoMsg(response.message)
    //                 setShowSectionMsg(true)
    //                 setTimeout(() => {
    //                     setShowSectionMsg(false)
    //                 }, 4000)
    //             }
    //         })
    //         .catch((err: any) => {
    //             console.log(err);
    //         });
  }

  function getProfileDetails() {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.getProfileApi,
      headers: { Authorization: getLocalStorage("token") },
    };
    triggerApi(apiObject)
      .then((response: ApiResponseProps) => {
        if (response.status_code == 200) {
          setIsSubmiting(false);
          // console.log(response)
          setLocalStorage("userData", JSON.stringify(response.data));
          setUserInfo(response.data);
          if (response.data.user_type == 1) {
            if (response.data.code == "admin") {
              history.replace("/office/user");
            } else if (
              response.data.code == "sales_manager" ||
              response.data.code == "care_manager" ||
              response.data.code == "md" ||
              response.data.code == "health_coach"
            ) {
              history.replace("/office/clients");
            } else {
              history.replace("/office/dashboard");
            }
          } else if (response.data.user_type == 2) {
            history.replace("/customer/profile");
          }

          // if (response.data.user_type == 1) {
          //
          // } else if (response.data.user_type == 2) {
          //     history.replace('/customer/profile');
          // } else if (response.data.user_type == 3) {
          //     history.replace('/sales/clients');
          // }
        } else {
        }
      })
      .catch((err: object) => {
        console.log(err);
      });
  }

  return (
    <>
      {isLoading && (
        <FormContainer className="form-styles main section-common-padding withBg-container">
          <Snackbar
            title="Error"
            appearance="error"
            message={infoMsg}
            open={showSectionMsg}
            close={() => setShowSectionMsg(false)}
          />
          <Formik
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            innerRef={handleRef}
          >
            {({ ...formik }: any) => {
              return (
                <Form>
                  <SignInComponent
                    formik={formik}
                    isDisable={isSubmiting}
                    showSectionMsg={showSectionMsg}
                  />
                </Form>
              );
            }}
          </Formik>
          <div className="backdrop bg1">
            <svg
              width="644"
              height="650"
              viewBox="0 0 644 650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-115.272 583.606C-230.244 505.206 -288.907 372.93 -305.85 234.643C-324.394 83.2907 -322.639 -87.2869 -209.855 -188.369C-97.4797 -289.085 69.1186 -261.2 218.055 -234.905C365.208 -208.925 525.956 -175.572 600.724 -45.2596C676.238 86.3536 640.879 250.327 574.155 385.74C513.755 508.319 400.465 589.375 269.489 626.965C139.245 664.345 -2.6485 660.403 -115.272 583.606Z"
                fill="#51B89C"
              />
            </svg>
          </div>
          <div className="backdrop bg2">
            <img src={backDropBG1} alt="bg" />
          </div>
          <div className="backdrop bg3">
            <svg
              width="420"
              height="583"
              viewBox="0 0 420 583"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M81.137 89.1704C146.161 25.7563 237.361 0.34184 326.634 0.531021C424.34 0.738076 531.36 14.6287 579.493 90.2265C627.452 165.55 587.129 263.887 550.223 351.697C513.758 438.455 470.797 532.855 378.629 568.126C285.542 603.749 187.272 570.096 111.251 519.684C42.435 474.049 6.96362 399.653 1.24258 317.865C-4.44646 236.534 17.4414 151.289 81.137 89.1704Z"
                fill="#F7F0DF"
              />
            </svg>
          </div>
          <div className="backdrop bg4">
            <img src={backDropBG2} alt="bg" />
          </div>
        </FormContainer>
      )}
    </>
  );
};

const SignInComponent = ({ formik, ...props }: any) => {
  const [showpassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showpassword);
  };
  let history = useHistory();
  const handleSubmit = () => {};

  return (
    <>
      <LoginWrapper>
        <LoginContentWrapper>
		<div className='logoHolder text-center' onClick={() => history.replace('/sign-in')}><Icon name='gritwell' /></div>
          <LoginTitle>Log In </LoginTitle>
          <div className="formContainer">
            <LoginContent className="form-field-height gritwell-input gritwell-input">
              {/* <PiThemeContextProvider value={inputStyles}> */}
              <PiInputForm
                name="email"
                label="Email"
                placeholder="Enter Email"
                autoFocus
                libraryType="atalskit"
                className=""
              ></PiInputForm>
              {/* </PiThemeContextProvider> */}
            </LoginContent>
            <LoginContent
              className="form-field-height gritwell-input gritwell-input"
              style={{ position: "relative" }}
            >
              {/* <PiThemeContextProvider value={inputStyles}> */}
              <PiInputForm
                name="password"
                label="Password"
                placeholder="Enter Password"
                libraryType="atalskit"
                className="gritwell-input"
                type={showpassword ? "text" : "password"}
              ></PiInputForm>
              {/* </PiThemeContextProvider> */}
              <span className="icon-styles" onClick={toggleShowPassword}>
                <Icon name={!showpassword ? "showicon" : "openeye"} />
              </span>
            </LoginContent>
          </div>
          <LoginContent className="text-right">
            {/* <PiTypography component='small' >Forgot password?</PiTypography> */}
            <span
              className="forgot-text"
              onClick={() => history.replace("/forgotpassword")}
            >
              Forgot password?
            </span>
          </LoginContent>
          <LoginContent className="mt-3">
            {/* <PiThemeContextProvider value={btnStyles}> */}
            <PiButton
              appearance="primary"
              label="Log In"
              type="submit"
              libraryType="atalskit"
              size="extraLarge"
              onClick={handleSubmit}
              // isDisabled={props.isDisable}
              isLoading={props.isDisable}
              className=" w-100"
            />
            {/* </PiThemeContextProvider> */}
          </LoginContent>
        </LoginContentWrapper>
      </LoginWrapper>
    </>
  );
};

export default SignIn;
