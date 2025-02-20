import { PiButton, PiEditorQuills, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import apiEndpoint from "../../../../core/apiend_point";
import { getLocalStorage } from "../../../../core/localStorageService";
import { ApiResponseProps, PayloadProps } from "../../../../core/schema";
import Snackbar from "../../../../core/snackbar";
import { triggerApi } from "../../../../services";
import { ButtonGroup, HealthProfileEditorContainer , HealthProfileRightContainerBorder} from "../../../../styles/common-styles";

export type TimelineProps = {
  family: string
  children: string
  adult: string
}

const TimeLine = (props: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState([]);
  const [showSectionMsg, setShowSectionMsg] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [descArray,setDescArray]=useState<any>([])
  const [hideBtns,setHideBtns] = useState(true)

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true)
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthprofileTimeLine + '/' + props.id,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        console.log(res.data)
        let array:any =[]

        res.data.map((desc:any)=>{
          array.push({id:desc.note_id,desc:desc.description})
        })
        setDescArray(array)
        setSelectedData(res.data)
        setIsLoading(false)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }

  const saveData = async () => {
    const apiObject: PayloadProps = {
      payload: {
        notes: selectedData,
        client_id: props.id
      },
      method: "POST",
      apiUrl: apiEndpoint.healthprofileNotes,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
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
 

  const onValueChange = (e: any, i: number) => {
    
    console.log(e)
    let activeData: any = selectedData;
    activeData[i]['description'] = e;
    // console.log(activeData[i])
    // console.log(descArray[i].desc,activeData[i]['description'])
    setSelectedData(activeData);
    if(descArray[i].desc !== activeData[i]['description']) {
			setHideBtns(false)
		} else {
			setHideBtns(true)
		}
  }

  return (<>
  <HealthProfileRightContainerBorder>
    <div className="HealthProfileContentTitle">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.3999 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.7652 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2ZM12 10C11.4067 10 10.8266 9.82405 10.3333 9.49441C9.83994 9.16476 9.45542 8.69623 9.22836 8.14805C9.0013 7.59987 8.94189 6.99667 9.05764 6.41473C9.1734 5.83279 9.45912 5.29824 9.87868 4.87868C10.2982 4.45912 10.8328 4.1734 11.4147 4.05764C11.9967 3.94189 12.5999 4.0013 13.1481 4.22836C13.6962 4.45542 14.1648 4.83994 14.4944 5.33329C14.8241 5.82664 15 6.40666 15 7C15 7.79565 14.6839 8.55871 14.1213 9.12132C13.5587 9.68393 12.7956 10 12 10ZM21 21V20C21 18.1435 20.2625 16.363 18.9497 15.0503C17.637 13.7375 15.8565 13 14 13H10C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20V21H5V20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15H14C15.3261 15 16.5979 15.5268 17.5355 16.4645C18.4732 17.4021 19 18.6739 19 20V21H21Z" fill="#067356" />
      </svg>
      <PiTypography component="h3">Timeline</PiTypography>
    </div>

    {selectedData && selectedData.map((item: any, index: number) => <HealthProfileEditorContainer>
      <div className="HealthProfileContentEditor">
        <div className="HealthProfileTitle">{item.note_name}</div>
        <PiEditorQuills
          libraryType="atalskit"
          onChange={(e: any) => { onValueChange(e, index) }}
          placeholder="Type here..."
          value={item.description}
          className="health-profile-editor"
        />
      </div>
    </HealthProfileEditorContainer>)
    }</HealthProfileRightContainerBorder>

    <Snackbar
      title="Success"
      appearance="success"
      message={alertMessage}
      open={showSectionMsg}
      close={() => setShowSectionMsg(false)}
    />

<ButtonGroup className={hideBtns ? "hideFooter" : "showFooter d-flex align-items-center justify-content-end mt-4 "} >

      <PiButton
        appearance="cancel"
        onClick={getData}
        label="Cancel"
        size="extraLarge"
        className="mr-3"
      />

      <PiButton
        appearance="primary"
        label="Save"
        size="extraLarge"
        onClick={saveData}
      />

    </ButtonGroup>

  </>)
};
export default TimeLine;
