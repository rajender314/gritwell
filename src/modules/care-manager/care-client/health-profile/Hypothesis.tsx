import { PiButton, PiSelect, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";

import apiEndpoint from "../../../../core/apiend_point";
import { getLocalStorage } from "../../../../core/localStorageService";
import { ApiResponseProps, PayloadProps, SelectProps } from "../../../../core/schema";
import { triggerApi } from "../../../../services";
import { ButtonGroup, HealthProfileEditorContainer , HealthProfileRightContainerBorder} from "../../../../styles/common-styles";
import Spinner from '../../../../components/spinner'
import Snackbar from "../../../../core/snackbar";

export type HypothesisDropdownProps = {
  imbalance: SelectProps[]
  rootcause: SelectProps[]
  diagnosis: SelectProps[]
}

const Hypothesis = (props: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [hypothesisDropdown, setHypothesisDropdown] = useState<HypothesisDropdownProps>({
    imbalance: [],
    rootcause: [],
    diagnosis: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imbalance, setImbalance] = useState<SelectProps[]>([]);
  const [rootcause, setRootcause] = useState<SelectProps[]>([]);
  const [diagnosis, setDiagnosis] = useState<SelectProps[]>([]);
  const [hideBtns,setHideBtns] = useState(true)
  const [showSectionMsg, setShowSectionMsg] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    getHypothesis()
  }, []);


  const getExistingHypothesis = (data: HypothesisDropdownProps) => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthprofileHypothesis + '/' + props.id,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setImbalance(data.imbalance.filter((item: SelectProps) => res.data.imbalance?.includes(item.value)))
        setRootcause(data.rootcause.filter((item: SelectProps) => res.data.rootcause?.includes(item.value)))
        setDiagnosis(data.diagnosis.filter((item: SelectProps) => res.data.diagnosis?.includes(item.value)))
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };


  const getHypothesis = async () => {
    setIsLoading(true)
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthprofileHypothesis,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // console.log(res.data)
        setHypothesisDropdown({
          imbalance: res.data.imbalance,
          rootcause: res.data.rootcause,
          diagnosis: res.data.diagnosis,
        })
        setIsLoading(false)
        getExistingHypothesis(res.data)
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
        imbalance: imbalance.map((item: SelectProps) => item.value),
        rootcause: rootcause.map((item: SelectProps) => item.value),
        diagnosis: diagnosis.map((item: SelectProps) => item.value),
      },
      method: "POST",
      apiUrl: apiEndpoint.healthprofileHypothesis,
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

  function onValueChange(e: any, type: string = '') {
       let Imbalance =  imbalance.map((item: SelectProps) => item.value)
       let Rootcause =  rootcause.map((item: SelectProps) => item.value)
       let Diagnosis = diagnosis.map((item: SelectProps) => item.value)
    if (type === 'imbalance') {
      setImbalance(e);
      if(Imbalance !== e){
        setHideBtns(false)
      }else{
        setHideBtns(true)
      }
    } else if (type === 'rootcause') {
      setRootcause(e)
      if(Rootcause !== e){
        setHideBtns(false)
      }else{
        setHideBtns(true)
      }
    } else if (type === 'diagnosis') {
      setDiagnosis(e)
      if(Diagnosis !== e){
        setHideBtns(false)
      }else{
        setHideBtns(true)
      }
    }
  }


  return (<>
  <HealthProfileRightContainerBorder>
    <div className="HealthProfileContentTitle">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V7C22 7.74708 21.5904 8.39848 20.9835 8.74188C20.9944 8.82638 21 8.91253 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 8.91253 3.00561 8.82638 3.0165 8.74188C2.40961 8.39848 2 7.74707 2 7V5ZM20 7V5H4V7H20ZM5 9V19H19V9H5ZM8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z" fill="#1596B7" />
      </svg>
      <PiTypography component="h3">Hypothesis</PiTypography>
    </div>

    {!isLoading ? (<>
      <HealthProfileEditorContainer>
        <div className="HealthProfileContentEditor">
          <div className="HealthProfileTitle">Imbalance</div>
          <PiSelect
            helpText=""
            isMulti
            label=""
            libraryType="atalskit"
            name="imbalance"
            onChange={(e: any) => onValueChange(e, 'imbalance')}
            options={hypothesisDropdown.imbalance}
            placeholder="Type imbalance"
            value={imbalance}
          />
        </div>
      </HealthProfileEditorContainer>
      <HealthProfileEditorContainer>
        <div className="HealthProfileContentEditor">
          <div className="HealthProfileTitle">Root Cause</div>
          <PiSelect
            helpText=""
            isMulti
            label=""
            libraryType="atalskit"
            name="rootcause"
            onChange={(e: any) => onValueChange(e, 'rootcause')}
            options={hypothesisDropdown.rootcause}
            placeholder="Type root cause"
            value={rootcause}
          />
        </div>
      </HealthProfileEditorContainer>
      <HealthProfileEditorContainer>
        <div className="HealthProfileContentEditor">
          <div className="HealthProfileTitle">Diagnosis</div>
          <PiSelect
            helpText=""
            isMulti
            label=""
            libraryType="atalskit"
            name="diagnosis"
            onChange={(e: any) => onValueChange(e, 'diagnosis')}
            options={hypothesisDropdown.diagnosis}
            placeholder="Type diagnosis"
            value={diagnosis}
          />
        </div>
      </HealthProfileEditorContainer></>)
      :
      <HealthProfileEditorContainer>
          <Spinner />
      </HealthProfileEditorContainer>
      
    }</HealthProfileRightContainerBorder>

      
     <ButtonGroup className={hideBtns ? "hideFooter" : "showFooter d-flex align-items-center justify-content-end mt-4 "}>
        <PiButton
          appearance="cancel"
          label="Cancel"
          onClick={getHypothesis}
          size="extraLarge"
          className="mr-3" />

        <PiButton
          appearance="primary"
          label="Save"
          size="extraLarge"
          onClick={saveData}
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
export default Hypothesis;
