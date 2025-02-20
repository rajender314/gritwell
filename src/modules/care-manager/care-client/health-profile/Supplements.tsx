import { PiButton, PiEditorQuills, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { Icon } from "../../../../components";
import apiEndpoint from "../../../../core/apiend_point";
import { getLocalStorage } from "../../../../core/localStorageService";
import { ApiResponseProps, PayloadProps } from "../../../../core/schema";
import Snackbar from "../../../../core/snackbar";
import { triggerApi } from "../../../../services";
import { ButtonGroup, HealthProfileEditorContainer , HealthProfileRightContainerBorder} from "../../../../styles/common-styles";


const Supplements = (props: any) => {
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
      apiUrl: apiEndpoint.healthprofileSuppliment + '/' + props.id,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setSelectedData(res.data)
        console.log(res.data)
        let array:any =[]

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
    console.log(descArray[i].desc)
    console.log(activeData[i]['description'])
    if(descArray[i].desc !== activeData[i]['description']) {
			setHideBtns(false)
		} else {
			setHideBtns(true)
		}
  }

  return (<>
  <HealthProfileRightContainerBorder>
    <div className="HealthProfileContentTitle">
      <Icon name="supplimentstabicon" />
      <PiTypography component="h3">Current Supplements</PiTypography>
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
export default Supplements;
