import { PiButton, PiSelect, PiTextArea, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { Icon } from "../../../components";
import Editable from "../../../components/editable";
import apiEndpoint from "../../../core/apiend_point";
import { getLocalStorage } from "../../../core/localStorageService";
import { ApiResponseProps, HealthPlanUrlParams, ModalProps, PayloadProps, SelectProps } from "../../../core/schema";
import { triggerApi } from "../../../services";
import {
  FooterAction,
  GWCStepperContent,
  PhaseCard,
} from "../../../styles/common-styles";
import Spinner from '../../../components/spinner'

import { useHistory, useParams } from "react-router";
import { StatusProps } from "../../../schema/schema";
import ConfirmBox from "./modals/ConfirmBox";

export type Phases = {
  name: string;
  description: string;
  status: any;
}

const PhasesOfCare = ({ setSaveAndExit, ...props }: any) => {
  let urlParams = useParams<HealthPlanUrlParams>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [statusDropdown, setStatusDropdown] = useState([]);
  let history = useHistory();
  let active: SelectProps[] = getStatusByValue("active", 'code');
  let future: SelectProps[] = getStatusByValue("future", 'code');
  const [data, setData] = useState<Phases[]>([
    {
      name: 'Phase 1',
      description: '',
      status: active[0]?.value
    },
    {
      name: 'Phase 2',
      description: '',
      status: future[0]?.value
    },
    {
      name: 'Phase 3',
      description: '',
      status: future[0]?.value
    },
  ]);

  let defaultConfirm = {
    is_open: false,
    action: '',
    message: '',
    data: {},
    type: ''
  };
  const [conrfirmBox, setConrfirmBox] = useState<ModalProps>(defaultConfirm);

  useEffect(() => {
    getStatus();
    getData()
    if (setSaveAndExit === true) {
      savePhasesData()
    }
  }, [setSaveAndExit]);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', alertUser)
  //   window.addEventListener('unload', handleEndConcert)
  //   return () => {
  //     window.removeEventListener('beforeunload', alertUser)
  //     window.removeEventListener('unload', handleEndConcert)
  //     handleEndConcert()
  //   }
  // }, [])

  // const alertUser = (e:any)=> {
  //   e.preventDefault()
  //   e.returnValue = ''
  // }
  // const handleEndConcert = async () => {

  // }

  const getStatus = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.phasesOfCareStatuses,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data.result.length > 0) {
          setStatusDropdown(res.data.result)
        }

      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const getData = () => {
    const apiObject: PayloadProps = {
      payload: {
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "GET",
      apiUrl: apiEndpoint.healthPlanPhases + '/' + urlParams.id,
      headers: {
        Authorization: token,
      },
    };
    setIsLoading(true);
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data.result.length > 0) {
          setData(res.data.result)
          setIsDisabled(false);
        }
        setIsLoading(false);
      })
      .catch((err: object) => {
        console.log(err, "Error");

      });
  };

  const addNewPhase = () => {
    if (data.length <= 5) {
      let newData = {
        name: 'Phase ' + (data.length + 1),
        description: '',
        status: future[0]?.value
      }
      setData([...data, newData]);
    }
  }

  const deletePhase = (index: number) => {
    let existingData = data;
    let newData = existingData.filter(function (value: any, i) {
      return i != index;
    }).map((value: Phases, j) => {
      value.name = 'Phase ' + (j + 1)
      return value;
    });
    setData(newData);
  }

  function getStatusByValue(status: string | number, column: string = 'code') {
    return statusDropdown.filter((value: StatusProps, i: number) => {
      var columnValue = value.code;
      if (column === 'value') {
        columnValue = value.value;
      }
      if (status === columnValue) {
        return {
          label: value.label,
          value: value.value
        }
      }
    })
  }


  function updatePhaseDetails(e: any, index: number, type: string = '') {
    var isDisable = false;
    let existingData = data;
    let newData = existingData.map((value: Phases, i) => {
      if (index === i) {
        if (type === 'select') {
          value.status = e.value
        } else {
          value.description = e.target.value

        }
      }
      if (i < 3 && value.description === '') {
        isDisable = true;
      }
      return value;
    });
    if (isDisable) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    setData(newData);
  }

  const savePhasesData = () => {
    const apiObject: PayloadProps = {
      payload: {
        payload: { phases: data },
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "POST",
      apiUrl: apiEndpoint.healthPlanPhases,
      headers: {
        Authorization: token,
      },
    };
    setIsLoading(true);
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // if(setSaveAndExit){
        //   history.push("/office/client/"+urlParams.id);
        // }else{
        //   history.push("/office/health-plan/"+urlParams.health_plan_id+"/"+urlParams.id+"/"+"nutrition");
        // }
        history.push("/office/health-plan/" + urlParams.health_plan_id + "/" + urlParams.id + "/" + "nutrition");
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }

  return (
    <>
      <GWCStepperContent>
        <div className="StepperContentHeader">
          <Icon name="flagicon" />
          <PiTypography component="h4">
            Select a current Phase of Care
          </PiTypography>
        </div>

        <div className="stepperContentBody">
          {isLoading && <Spinner />}
          {!isLoading && data?.map((item: Phases, index) => {
            return <PhaseCard key={`phase-${index}`}>
              <div className="PhaseCardHeader d-flex align-items-center">
                <PiTypography component="h5">{item.name}</PiTypography>
                <div className="d-flex flex1 align-items-center justify-content-between">
                  <div className="SelectBlock">
                    <PiSelect
                      libraryType="atalskit"
                      name="Select"
                      onChange={(e: any) => updatePhaseDetails(e, index, 'select')}
                      options={statusDropdown}
                      placeholder="Select"
                      value={item.status ? getStatusByValue(item.status, 'value') : index === 0 ? active : future}
                    />
                  </div>
                  {index > 2 && <div className="actions delete-icon"
                    onClick={() => setConrfirmBox({
                      is_open: true,
                      data: index,
                      action: 'Delete',
                      message: `Are you sure you want to delete the Phase ${item.name}?`,
                      type: 'increase'
                    })}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9H10.5V18H9V9ZM13.5 9H15V18H13.5V9Z" fill="#717171" />
                      <path d="M3 4.5V6H4.5V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H18C18.3978 22.5 18.7794 22.342 19.0607 22.0607C19.342 21.7794 19.5 21.3978 19.5 21V6H21V4.5H3ZM6 21V6H18V21H6ZM9 1.5H15V3H9V1.5Z" fill="#717171" />
                    </svg>
                  </div>}
                </div>
              </div>
              <div className="PhaseCardBody">
                <Editable
                  text={item.description}
                  placeholder="Type here to add phase details"
                  type="textarea"
                // saveData={() => { }}
                >
                  {/* <PiTextArea
                    helpText=""
                    label=""
                    libraryType="atalskit"
                    minimumRows={1}
                    name="textarea"
                    onChange={(e: any) => updatePhaseDetails(e, index)}
                    defaultValue={item.description}
                    autoFocus={true}
                  /> */}
                  <textarea
                    className="editabel-text"
                    value={item.description} autoFocus={true}
                    onChange={(e: any) => updatePhaseDetails(e, index)}
                  />
                </Editable>
              </div>
            </PhaseCard>
          })
          }
        </div>

        {!isLoading && data.length < 6 && <PiButton
          appearance="link"
          label="add"
          iconBefore={<Icon name="plusicon" />}
          onClick={addNewPhase}
          isDisabled={data.length === 6 ? true : false}
        />}

        {conrfirmBox.is_open && <ConfirmBox {...conrfirmBox}
          onModalClose={() => {
            setConrfirmBox(defaultConfirm)
          }}
          width="small"
          onConfirm={(index: number) => {
            console.log(index)
            deletePhase(index);
            setConrfirmBox(defaultConfirm)
          }}
        />}


      </GWCStepperContent>
      <FooterAction className="d-flex align-items-center  justify-content-between">
        <div className="FooterActionWidth d-flex align-items-center  justify-content-between">
          <div className="d-flex align-items-center BackBlock" onClick={() => { props.setTabChange() }} >
            <Icon name="back" />
            &nbsp; Back
          </div>
          <PiButton
            appearance="primary"
            label="Save and continue"
            size="extraLarge"
            onClick={savePhasesData}
            isDisabled={isDisabled}
          />
        </div>
      </FooterAction>
    </>
  );
};
export default PhasesOfCare;
