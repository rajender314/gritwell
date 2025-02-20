import { PiButton, PiSelect, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";

import apiEndpoint from "../../../../core/apiend_point";
import { getLocalStorage } from "../../../../core/localStorageService";
import { ApiResponseProps, PayloadProps, SelectProps } from "../../../../core/schema";
import { triggerApi } from "../../../../services";
import { ButtonGroup, HealthProfileEditorContainer, HealthProfileRightContainerBorder } from "../../../../styles/common-styles";
import Spinner from '../../../../components/spinner'
import Snackbar from "../../../../core/snackbar";

export type Menu = {
  label: string
  key: string
}

const Goals = (props: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [goalsDropdown, setGoalsDropdown] = useState<SelectProps[]>([]);
  const [goalsData, setGoalsData] = useState<SelectProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSectionMsg, setShowSectionMsg] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
   const [hideBtns,setHideBtns] = useState(true)

  useEffect(() => {
    getGoals()
  }, [props]);


  const getExistingGoals = (data: SelectProps[]) => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthprofileGoals + '/' + props.id,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        let goals = data.filter((item: SelectProps) => res.data.goals.includes(item.value));
        setGoalsData(goals)
        console.log(goals)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };


  const getGoals = async () => {
    setIsLoading(true)
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthprofileGoals,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setGoalsDropdown(res.data.result)
        setIsLoading(false)
        getExistingGoals(res.data.result)
        setHideBtns(true)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const saveData = () => {
    const apiObject: PayloadProps = {
      payload: {
        client_id: props.id,
        goals: goalsData.map((item: SelectProps) => item.value)
      },
      method: "POST",
      apiUrl: apiEndpoint.healthprofileGoals,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // console.log(res.data.result)
        setAlertMessage(res.data.message)
        setShowSectionMsg(true)
        setHideBtns(true)
        setTimeout(() => {
          setShowSectionMsg(false)
        }, 4000)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const onItemChange = (e: any) => {
    let goals = goalsData.map((item: SelectProps) => item.value)
    
   console.log(e)
    if (e.length < 2 || e.length <= 3) {
      setGoalsData(e)
    }
    if(goals !== e){
      setHideBtns(false)
    }else{
      setHideBtns(true)
    }
     

  }


  return (<>
  <HealthProfileRightContainerBorder>
    <div className="HealthProfileContentTitle">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5368 1.55731C17.6739 1.614 17.7912 1.71011 17.8737 1.83347C17.9562 1.95683 18.0002 2.1019 18.0003 2.25031V6.00031H21.7503C21.8988 6.00004 22.0441 6.04388 22.1676 6.12628C22.2912 6.20867 22.3876 6.3259 22.4444 6.46311C22.5013 6.60032 22.5162 6.75133 22.4871 6.89699C22.4581 7.04266 22.3864 7.17641 22.2813 7.28131L19.2813 10.2813C19.2115 10.3509 19.1287 10.4061 19.0376 10.4437C18.9464 10.4812 18.8488 10.5005 18.7503 10.5003H14.5608L13.4508 11.6118C13.5101 11.8342 13.5175 12.0672 13.4724 12.2929C13.4273 12.5186 13.331 12.7309 13.1908 12.9134C13.0506 13.0959 12.8703 13.2438 12.6639 13.3456C12.4575 13.4473 12.2304 13.5003 12.0003 13.5003C11.6024 13.5003 11.2209 13.3423 10.9396 13.061C10.6583 12.7797 10.5003 12.3981 10.5003 12.0003L10.5018 11.9313C10.512 11.7072 10.5725 11.4883 10.6785 11.2907C10.7846 11.0931 10.9337 10.9217 11.1147 10.7893C11.2958 10.6569 11.5042 10.5668 11.7247 10.5256C11.9452 10.4844 12.1721 10.4932 12.3888 10.5513L13.5003 9.43981V5.25031C13.5001 5.15175 13.5193 5.05412 13.5569 4.96301C13.5945 4.8719 13.6497 4.78909 13.7193 4.71931L16.7193 1.71931C16.8242 1.61448 16.9579 1.54314 17.1034 1.51431C17.249 1.48547 17.3997 1.50043 17.5368 1.55731ZM18.4398 9.00031L19.9398 7.50031H17.2503C17.0513 7.50031 16.8606 7.42129 16.7199 7.28064C16.5793 7.13998 16.5003 6.94922 16.5003 6.75031V4.06081L15.0003 5.56081V9.00031H18.4398ZM20.9178 10.7643C21.1766 12.632 20.8422 14.5338 19.9619 16.2013C19.0817 17.8688 17.6999 19.2176 16.0117 20.0575C14.3235 20.8974 12.4142 21.1858 10.5533 20.8821C8.69232 20.5784 6.97377 19.6978 5.64022 18.3648C4.30667 17.0318 3.42547 15.3136 3.12103 13.4528C2.81658 11.5919 3.10427 9.6825 3.94347 7.99399C4.78268 6.30548 6.13101 4.92318 7.79813 4.04225C9.46525 3.16131 11.3669 2.82623 13.2348 3.08431L12.6603 3.65881C12.4225 3.8966 12.241 4.18466 12.1293 4.50181L12.0003 4.50031C10.5115 4.50053 9.0564 4.94384 7.82039 5.7738C6.58438 6.60376 5.62335 7.7828 5.05968 9.16077C4.49601 10.5388 4.35521 12.0533 4.65521 13.5116C4.95521 14.9698 5.68243 16.3058 6.74427 17.3494C7.80611 18.393 9.15451 19.0969 10.6178 19.3716C12.081 19.6462 13.5929 19.4792 14.9609 18.8917C16.3289 18.3042 17.4911 17.3229 18.2995 16.0726C19.1079 14.8224 19.5259 13.3599 19.5003 11.8713C19.8162 11.7596 20.1032 11.5787 20.3403 11.3418L20.9163 10.7643H20.9178ZM12.0003 6.75031C10.9619 6.75031 9.94687 7.05821 9.08352 7.63509C8.22016 8.21197 7.54725 9.03191 7.14989 9.99122C6.75253 10.9505 6.64856 12.0061 6.85114 13.0245C7.05371 14.0429 7.55372 14.9784 8.28795 15.7126C9.02217 16.4468 9.95763 16.9469 10.976 17.1494C11.9944 17.352 13.05 17.248 14.0093 16.8507C14.9687 16.4533 15.7886 15.7804 16.3655 14.9171C16.9424 14.0537 17.2503 13.0387 17.2503 12.0003H15.7503C15.7503 12.742 15.5303 13.467 15.1183 14.0837C14.7062 14.7004 14.1205 15.181 13.4353 15.4649C12.7501 15.7487 11.9961 15.8229 11.2687 15.6783C10.5412 15.5336 9.87306 15.1764 9.34861 14.652C8.82416 14.1275 8.46701 13.4593 8.32231 12.7319C8.17762 12.0045 8.25188 11.2505 8.53571 10.5652C8.81954 9.88002 9.30019 9.29435 9.91687 8.8823C10.5336 8.47024 11.2586 8.25031 12.0003 8.25031V6.75031Z" fill="#51B89C" />
      </svg>
      <PiTypography component="h3">Top 3 Health Goals</PiTypography>
    </div>

    {!isLoading ? (<><HealthProfileEditorContainer>
      <div className="HealthProfileContentEditor">
        <PiSelect
          helpText=""
          isMulti
          label=""
          libraryType="atalskit"
          name="goals"
          onChange={onItemChange}
          options={goalsDropdown}
          placeholder="Type your client goals"
          value={goalsData}
        />
      </div>
      <p className="note-text">*Minimum 2 and maximum 3 goals can be selected </p>
    </HealthProfileEditorContainer>
      </>)
      :
        <Spinner />
      
    }</HealthProfileRightContainerBorder>
    <ButtonGroup className={hideBtns ? "hideFooter" : "showFooter d-flex align-items-center justify-content-end mt-4 "}>
        <PiButton
          appearance="cancel"
          label="Cancel"
          onClick={getGoals}
          size="extraLarge"
          className="mr-3" />

        <PiButton
          appearance="primary"
          label="Save"
          size="extraLarge"
          onClick={saveData}
          isDisabled={goalsData.length < 2 || goalsData.length > 3 ? true : false}
        />

      </ButtonGroup>
    <Snackbar
      title="Success"
      appearance="success"
      message={alertMessage}
      open={showSectionMsg}
      close={() => setShowSectionMsg(false)}
    />
  </>)
};
export default Goals;
