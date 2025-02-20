import { PiButton, PiEditorQuills, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import apiEndpoint from "../../../../core/apiend_point";
import { getLocalStorage } from "../../../../core/localStorageService";
import { ApiResponseProps, PayloadProps } from "../../../../core/schema";
import Snackbar from "../../../../core/snackbar";
import { triggerApi } from "../../../../services";
import { ButtonGroup, HealthProfileEditorContainer , HealthProfileRightContainerBorder} from "../../../../styles/common-styles";


const Medications = (props: any) => {
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
      apiUrl: apiEndpoint.healthprofileMedication + '/' + props.id,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setSelectedData(res.data)
        let array:any = []
        res.data.map((desc:any)=>{
          array.push({id:desc.note_id,desc:desc.description})
        })
        setDescArray(array)
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
    let activeData: any = selectedData;
    activeData[i]['description'] = e;
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
        <path d="M9.17151 9.17249L14.8275 14.8285M9.17151 9.17249L5.63551 12.7075C5.26406 13.0789 4.9694 13.5199 4.76837 14.0052C4.56734 14.4905 4.46387 15.0107 4.46387 15.536C4.46387 16.0613 4.56734 16.5815 4.76837 17.0668C4.9694 17.5521 5.26406 17.9931 5.63551 18.3645V18.3645C6.00695 18.7359 6.44792 19.0306 6.93323 19.2316C7.41855 19.4327 7.93871 19.5361 8.46401 19.5361C8.98932 19.5361 9.50948 19.4327 9.99479 19.2316C10.4801 19.0306 10.9211 18.7359 11.2925 18.3645L14.8275 14.8285L9.17151 9.17249ZM9.17151 9.17249L12.7065 5.63649C13.0779 5.26503 13.5189 4.97038 14.0042 4.76935C14.4895 4.56831 15.0097 4.46484 15.535 4.46484C16.0603 4.46484 16.5805 4.56831 17.0658 4.76935C17.5511 4.97038 17.9921 5.26503 18.3635 5.63649V5.63649C18.735 6.00793 19.0296 6.44889 19.2307 6.93421C19.4317 7.41952 19.5352 7.93969 19.5352 8.46499C19.5352 8.99029 19.4317 9.51046 19.2307 9.99577C19.0296 10.4811 18.735 10.9221 18.3635 11.2935L14.8275 14.8285L9.17151 9.17249Z" stroke="#E09B07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <PiTypography component="h3">Current Medications</PiTypography>
    </div>

    {selectedData && selectedData.map((item: any, index: number) => <HealthProfileEditorContainer>
      <div className="HealthProfileContentEditor">
        {/* <div className="HealthProfileTitle">{item.note_name}</div> */}
        <PiEditorQuills
          libraryType="atalskit"
          onChange={(e: any) => { onValueChange(e, index) }}
          placeholder="Type here..."
          value={item.description}
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
        label="Cancel"
        onClick={getData}
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
export default Medications;
