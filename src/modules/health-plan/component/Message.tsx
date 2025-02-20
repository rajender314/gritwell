import { PiButton, PiTextArea, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Icon } from "../../../components";
import apiEndpoint from "../../../core/apiend_point";
import { getLocalStorage } from "../../../core/localStorageService";
import { ApiResponseProps, HealthPlanUrlParams, PayloadProps } from "../../../core/schema";
import { triggerApi } from "../../../services";
import {
  FooterAction,
  GwcNoSuggestionsCard,
  GWCStepperContent,
  NoSuggestionsCardTitle,
} from "../../../styles/common-styles";

const Message = (props:any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  let urlParams = useParams<HealthPlanUrlParams>();
  let history = useHistory();
  const [notes, setNotes] = useState("");
  // const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    getExistingMessage()
  }, [])

  const getExistingMessage = async () => {
    const apiObject: PayloadProps = {
      payload: {
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "GET",
      apiUrl: apiEndpoint.healthPlanMessage + '/' + urlParams.id,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data) {
          setNotes(res.data.notes)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const addLifeStyel = async () => {
    const apiObject: PayloadProps = {
      payload: {
        notes: notes,
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "POST",
      apiUrl: apiEndpoint.healthPlanMessage,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // if (setSaveAndExit) {
        //   history.push("/office/client/" + urlParams.id);
        // } else {
        //   history.push("/office/health-plan/"+urlParams.health_plan_id+"/" + urlParams.id + "/" + "preview");
        // }
        // history.push("/office/health-plan/"+urlParams.health_plan_id+"/" + urlParams.id + "/" + "preview");
        history.push("/office/client/" + urlParams.id);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const onNotesChange = (e:any) => {
    let value = e.target.value
    setNotes(value.slice(0, 500));
  }

  return (<>
    <GWCStepperContent>
      <div className="StepperContentHeader">
        <Icon name="messagetabicon" />
        <PiTypography component="h4">
          Message to your client : (Optional)
        </PiTypography>
      </div>

      <div className="stepperContentBody">
        <GwcNoSuggestionsCard className="internalTextArea">
          <NoSuggestionsCardTitle className="ColorCara">
            Let your client know their hightlights of this week
          </NoSuggestionsCardTitle>
          <PiTextArea
            placeholder=''
            name=''
            minimumRows={8}
            className='TabsTextArea'
            onChange={onNotesChange}
            value={notes}
            // defaultValue={notes}
          />
          <span className="text-limit">{notes.length}/500</span>
        </GwcNoSuggestionsCard>
      </div>

    </GWCStepperContent>
    <FooterAction className="d-flex align-items-center  justify-content-between">
      <div className="FooterActionWidth d-flex align-items-center  justify-content-between">
        <div className="d-flex align-items-center BackBlock" onClick={() => props.setTabChange('phases')}>
          <Icon name="back" />
          &nbsp; Back
        </div>
        <PiButton
          appearance="primary"
          label="Save and continue"
          size="extraLarge"
          onClick={addLifeStyel}
        />
      </div>
    </FooterAction>
  </>);
};
export default Message;
