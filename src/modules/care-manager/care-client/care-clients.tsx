import {
  PiAssignmentBoxHcSideDrawer,
  PiAssignmentBoxMDSideDrawer,
  PiDocViewer,
  PiIntakeFormSideDrawer,
  PiSecondaryHeader,
  PiSideDrawer,
  PiSymptomAnalysisSideDrawer,
  PiTabPanel,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
} from "pixel-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import ClientsLeftmenu from '../../../components/salesmanager-leftmenu/sales-client-leftmenu'
import { triggerApi } from "../../../services";
import {
  SecondaryHeaderCon,
  SideDrawerHolder,
} from "../../../styles/common-styles";
import { getLocalStorage } from "../../../core/localStorageService";
import apiEndpoint from "../../../core/apiend_point";
import {
  ApiResponseProps,
  PayloadProps,
  UrlParams,
  UserListProps,
  filterProps,
} from "../../../core/schema";
import { EditClientprofile } from "../../../components";
import Snackbar from "../../../core/snackbar";
import noUserImg from "../../../assets/userimg.png";
import { useHistory } from "react-router-dom";
import Overview from "./overview";
import Document from "./documents";
import HealthProfile from "./health-profile";
import Spinner from '../../../components/spinner/spinner'

export default function CareManagerClient() {
  const [assignMD, showAssignMD] = useState(false);
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [searchValue, setSearchValue] = useState("");
  const [hcSearchValue, setHcSearchValue] = useState("");
  let pageNumber: any = useState(1);
  let perPage = useState(100);
  let sort: any = useState("asc");
  let sortkey = useState("first_name");
  const [mdData, setMDData] = useState([]);
  let clientParam = useParams<UrlParams>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [toast, showToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [intakeForm, showIntakeForm] = useState(false);
  const [symptomAnalysis, showSymptomAnalysis] = useState(false);
  const [intakeCount, setIntakeCount] = useState<any>();
  const [intakeData, setIntakeData] = useState([]);
  const [symptomCount, setSymptomCount] = useState<any>();
  const [symptomanalysisData, setSymptomanalysisData] = useState([]);
  const [hcData, setHCData] = useState([]);
  const [assignHC, showAssignHC] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [initialValues, setInitaialValues] = useState();
  const [docViewer, openDocViewer] = useState(false);
  const [docLink, setDockLink] = useState<any>();
  const [clientDetails, setClientDetails] = useState<any>({});
  const [notes, setNotes] = useState<any>([]);
  const [rteNotes, setRteNotes] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [weekdays, setWeekdays] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [timezones, setTimezones] = useState([]);
  let filterKey = "weekdays,experiences,timezones,specialists";
  const { current } = React.useRef({ notes, timer: 0 });
  const [isSearch, setIsSearch] = useState(false);
  const [noRecordFilterMsg,setNorecordFilterMsg] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  let history = useHistory();
  const [selectedFilterValues, setSelectedFilterValues] = useState({
    experience: [],
    timezone: [],
    specialization: [],
  });
  const [selectedTab, setSelectedTab] = useState<number>();

  function assigningHC() {
    let assignmentDetails = clientDetails.assignment_details
    if (assignmentDetails.hc_assigned === false) {
      showAssignHC(true);
      getFilters();
      getHealthCoachList();
    } else {
      showAssignMD(true);
      getFilters();
      getMDList("");
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Escape") {
        setSearchValue("");
        setIsFilterApplied(false);
        showAssignMD(false);
        showAssignHC(false);
        setHCData([]);
        setSelectedFilterValues({
          experience: [],
          timezone: [],
          specialization: [],
        });
      }
    });
    setShowSpinner(true)
    getClientList();
    // rteBox();
  }, []);
  const getClientList = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.getClients.concat(clientParam.id),
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setShowSpinner(false)
        let data = res.data;
        getInitialValues(res.data);
        setFirstName(data.first_name ? data.first_name : "");
        setLastName(data.last_name ? data.last_name : "");
        setClientDetails(res.data);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };
  const getInitialValues = (data: any) => {
    let profile_pic = data.img_name ? data.display_url : "";

    setInitaialValues({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      dob: data.dob,
      ethnicity: data.ethnicity,
      height: data.height,
      weight: data.weight,
      profile_pic: profile_pic,
      state: data.state,
    } as any);
  };

  const assignClient = (assignid: any = {}) => {
    const apiObject: PayloadProps = {
      payload: {
        client_id: clientParam.id,
        assignment_user_id: assignid,
      },
      method: "POST",
      apiUrl: apiEndpoint.assignmentsApi,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.status_code === 200) {
          getClientList();
          setErrMsg(res.data ? res.data : res.message);
          showAssignMD(false);
          setIsFilterApplied(false);
          showAssignHC(false);
          setTimeout(() => {
            setSuccessToast(true);
            setTimeout(() => {
              setSuccessToast(false);
            }, 2000);
          }, 1000);
        } else if (res.status_code === 402) {
          setErrMsg(res.data ? res.data : res.message);
          showAssignMD(false);
          setIsFilterApplied(false);
          showAssignHC(false);
          setTimeout(() => {
            showToast(true);
            setTimeout(() => {
              showToast(false);
            }, 1000);
          }, 500);
        }

        // setToastProps({
        //     appearance: 'success',
        //     message: 'Assigned Client Successfully'
        // })
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  async function getMDList(params: any = {}) {
    let key = params.filterkey ? params.filterkey : "";
    let search = params.clearSearch ? "" : searchValue;
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.mdAssignmentsApi.concat(
        "?search=" +
          search +
          "&page=" +
          pageNumber +
          "&perPage=" +
          perPage +
          "&sort=" +
          sort +
          "&column=" +
          sortkey +
          "&status=" +
          true +
          "&weekdays=" +
          key
      ),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        let mdObj: any = {};
        let mdAssignmentUsers: any = [];
        if(searchValue !== '' && res.data.count === 0){
          setNorecordFilterMsg("No user matched your filters. Please try changing the filters")
        }
        res.data.result.map((data: any) => {
          let weekday = "";
          // data.day_of_the_week && data.day_of_the_week.map((data: any) => {
          // console.log(data.day_of_the_week)
          weekday = data.day_of_the_week;
          // })
          mdObj = {
            // availability: data.available_hours ? data.available_hours : 0,
            availability: data.available ? data.available : 0,
            profilePicSrc: data.display_url ? data.display_url : "",
            title:
              (data.first_name ? data.first_name : "") +
              " " +
              (data.last_name ? data.last_name : ""),
            week: weekday,
            value: data._id,
          };
          mdAssignmentUsers.push(mdObj);
        });
        setMDData(mdAssignmentUsers);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }
  async function getHealthCoachList(params: any = {}) {
    let expKey = params.assignExpKey ? params.assignExpKey : "";
    let specKey = params.assignSpecKey ? params.assignSpecKey : "";
    let timeKey = params.assignTimeKey ? params.assignTimeKey : "";
    let search = params.clearSearch ? "" : hcSearchValue;
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthCoachAssignmentApi.concat(
        "?search=" +
          search +
          "&page=" +
          pageNumber +
          "&perPage=" +
          perPage +
          "&sort=" +
          sort +
          "&column=" +
          sortkey +
          "&status=" +
          true +
          "&experience=" +
          expKey +
          "&timezone=" +
          timeKey +
          "&specialists=" +
          specKey
      ),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if(hcSearchValue !== '' && res.data.count === 0){
          setNorecordFilterMsg("No user matched your filters. Please try changing the filters")
        }
        let hcObj: any = {};
        let hcAssignmentUsers: any = [];
        res.data.result.map((data: any) => {
          hcObj = {
            // availability: data.allocation ? data.allocation : 0,
            availability: data.available ? data.available : 0,
            profilePicSrc: data.display_url ? data.display_url : "",
            specializations: data.specialists ? data.specialists : "",
            status:
              data.experience && data.experience.label
                ? data.experience.label
                : "",
            timezone:
              data.time_zone && data.time_zone.code ? data.time_zone.code : "",
            title:
              (data.first_name ? data.first_name : "") +
              " " +
              (data.last_name ? data.last_name : ""),
            value: data._id,
          };
          hcAssignmentUsers.push(hcObj);
        });
        setHCData(hcAssignmentUsers);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }
  const intakeForn = () => {
	  if(clientDetails.client_intake === true){
		showIntakeForm(true);
		intakeFormData();
	  }else return
    
  };
  async function intakeFormData(data: any = {}) {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.intakeFormApi.concat(clientParam.id),
      // apiUrl: apiEndpoint.intakeFormApi.concat("622f8376310753237bcb95b7"),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setIntakeCount(res.data.count);
        setIntakeData(res.data.result);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }
  const symptomAnalysisData = () => {
	  if(clientDetails.client_msq === true){
		showSymptomAnalysis(true);
		symptomData();
	  }else return
    
  };
  async function symptomData(data: any = {}) {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.symptomAnalysisApi.concat(clientParam.id),
      // apiUrl: apiEndpoint.symptomAnalysisApi.concat("622f8387ce784623ac037a5d"),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setSymptomCount(res.data.count);
        setSymptomanalysisData(res.data.result);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }

  const mdBackdropClose = () => {
    setIsFilterApplied(false);
    showAssignMD(false);
    clearSearch();
    setSearchValue("");
  };
  const hcBackdropClose = () => {
    showAssignHC(false);
    clearSearch();
    setHcSearchValue("");
    setSelectedFilterValues({
      experience: [],
      timezone: [],
      specialization: [],
    });
  };
  const intakeBackdropClose = () => {
    showIntakeForm(false);
  };
  const symptomBackdropClose = () => {
    showSymptomAnalysis(false);
  };
  const docView = () => {
	  if(clientDetails.client_past_test === true){
    openDocViewer(true);
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.docviewer.concat(clientParam.id),
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setDockLink(res.data);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
	}else return
  };
  const rteBox = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.rteBox.concat(clientParam.id),
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setNotes(res.data);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const rteNote = (e: string, index: number) => {
    // console.log(e)
    let rtenotes: any = [...notes];
    let selectedItem: any = rtenotes[index];
    selectedItem = { ...selectedItem, description: e };
    // console.log(rtenotes[index], e)
    rtenotes[index] = selectedItem;
    // console.log(rtenotes)
    setNotes(rtenotes);
    current.notes = { ...selectedItem, description: e };
    if (current.timer) clearTimeout(current.timer);
    current.timer = window.setTimeout(() => {
      current.timer = 0;
      // setData(current.data);
      // console.log("Saving...", selectedItem, index);
      onRteBox(selectedItem, index);
    }, 1000);
  };

  const onRteBox = (data: object, index: number) => {
    sendNotes(rteNotes, data, index);
  };

  const sendNotes = (e: string, data: any, index: number) => {
    // console.log(notes[index].description)
    // console.log(data)
    const apiObject: PayloadProps = {
      payload: {
        client_id: clientParam.id,
        note_id: data.note_id,
        description: notes[index].description,
      },
      method: "POST",
      apiUrl: apiEndpoint.rteBox,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then(() => {
        // setIntervalID(false)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };
  const onEditProfile = () => {
    setOpenEditProfile(true);
  };
  const onBackdropClose = () => {
    openDocViewer(false);
  };

  const filterData = (e: any) => {
    let filterKey = e.join(",");
    getMDList({ filterkey: filterKey });
    setIsFilterApplied(true);
  };
  const hcFilterData = (e: any) => {
    let specKey = e.specialization;
    let expKey = e.experience;
    let timeKey = e.timezone;
    let assignSpecKey = specKey.join(",");
    let assignExpKey = expKey.join(",");
    let assignTimeKey = timeKey.join(",");
    setSelectedFilterValues({
      experience: e.experience,
      timezone: e.timezone,
      specialization: e.specialization,
    });
    getHealthCoachList({
      assignSpecKey: assignSpecKey,
      assignExpKey: assignExpKey,
      assignTimeKey: assignTimeKey,
    });
    setIsFilterApplied(true);
  };
  let specObj: any = {};
  let specArr: any = [];
  const getFilters = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.FilterApi.concat("?type=" + filterKey),
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setWeekdays(res.data.weekdays);
        setExperiences(res.data.experiences);
        let specialists = res.data.specialists;
        specialists.map((data: filterProps) => {
          specObj = {
            value: data.value,
            label: data.label,
            children: data.children ? formatChild(data.children) : [],
          };
          specArr.push(specObj);
        });
        setSpecialists(specArr);
        setTimezones(res.data.timezones);
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  function formatChild(data: any) {
    let newData: any = [];
    data.length > 0 &&
      data.map((child: UserListProps) => {
        newData.push({
          value: child.value,
          label: child.label,
        });
      });
    return newData;
  }

  function onKeyUpValue(e: any) {
    if (e.key === "Enter") {
      if (e.target.value.length >= 2 || isSearch) {
        // pageNumRefresh();
        setSearchValue(e.target.value);
        getMDList({ clearPageNumber: true });
      }
      if (e.target.value.length > 1) {
        setIsSearch(true);
      }
      if (e.target.value.length < 1) {
        setIsSearch(false);
      }
    }
  }
  function valueChanged(e: any) {
    setSearchValue(e.target.value);
    if (e.key === "Enter") {
      if (e.target.value.length >= 2) {
        // pageNumRefresh();
        setSearchValue(e.target.value);
        getMDList();
      }
    }
  }

  function clearSearch() {
    // pageNumRefresh();
    setSearchValue("");
    setHCData([]);
    getMDList({ clearSearch: true });
  }

  function onHCKeyUpValue(e: any) {
    if (e.key === "Enter") {
      if (e.target.value.length >= 2 || isSearch) {
        // pageNumRefresh();
        setHcSearchValue(e.target.value);
        getHealthCoachList({ clearPageNumber: true });
      }
      if (e.target.value.length > 1) {
        setIsSearch(true);
      }
      if (e.target.value.length < 1) {
        setIsSearch(false);
      }
    }
  }
  function hcValueChanged(e: any) {
    setHcSearchValue(e.target.value);
    if (e.key === "Enter") {
      if (e.target.value.length >= 2) {
        // pageNumRefresh();
        setHcSearchValue(e.target.value);
        getHealthCoachList();
      }
    }
  }

  function hcClearSearch() {
    // pageNumRefresh();
    setHcSearchValue("");
    setHCData([]);
    getHealthCoachList({ clearSearch: true });
  }

  const onBack = () => {
    history.replace("/office/clients");
  };

  return (
    <>
      {/* <Snackbar {...toastProps} /> */}
      {showSpinner ?  <Spinner /> :<>
      <Snackbar
        title="Error"
        appearance="error"
        message={errMsg}
        open={toast}
        close={() => showToast(false)}
      />
      <Snackbar
        title="Success"
        appearance="success"
        message={errMsg}
        open={successToast}
        close={() => setSuccessToast(false)}
      />
      <SecondaryHeaderCon>
        {clientDetails.email && <PiSecondaryHeader
          assignButtonText={
            clientDetails.hc_assigned === false
              ? "Assign Health Coach"
              : clientDetails.md_assigned === false
              ? "Assign MD"
              : "Assign Health Coach"
          }
          displayAssignButton={
            clientDetails.hc_assigned === false ||
            clientDetails.md_assigned === false
              ? true
              : false
          }
          backOptions={{
            name: firstName + " " + lastName,
            route: "/office/clients",
          }}
          onAssignClick={() => assigningHC()}
          profileChildren={
            <p>
              {clientDetails.gender ? clientDetails.gender + ", " : ""}
              {clientDetails.age ? clientDetails.age : ""}
            </p>
          }
          subscription={{
            plan: "6 months",
            week: "1",
          }}
          avatarProps={{ src: noUserImg, appearance: "circle" }}
          profileProps={{
            name: clientDetails.first_name +' '+ clientDetails.last_name,
            height: clientDetails.height && clientDetails.height + "’’",
            wieght: clientDetails.weight && clientDetails.weight + "lbs",
            age: clientDetails.age && clientDetails.age,
            gender: clientDetails.gender && clientDetails.gender,
          }}
          onBackButtonClick={onBack}
          onEditClick={onEditProfile}
        />}

        <PiTabGroup
          id="tab"
          onChange={(e: number) => setSelectedTab(e)}
          selected={selectedTab}
        >
          <PiTabHeaderPanel>
            <PiTabHeader>Overview</PiTabHeader>
            <PiTabHeader>Documents</PiTabHeader>
            <PiTabHeader>Health Profile </PiTabHeader>
          </PiTabHeaderPanel>

          <PiTabPanel>
            {/* {notes && notes.map((note: any, index: number) => {
							return <PiRteBox
								editorProps={{
									libraryType: 'atalskit',
									onChange: (e: any) => rteNote(e, index),
									// onBlur: (e: any) => onRteBox(note, index),
									placeholder: 'Text Here...',
									value: note.description
								}}
								libraryType="atalskit"
								onAddComment={function noRefCheck() { }}
								title={note.note_name}
								lastUpdated={DateFormats(note.last_modified_date)}
								modifiedByName={note.last_modified_by}
							/>
						})}   */}
            {clientDetails.assignment_details && <Overview 
            id={clientParam.id} 
            onAssignClick={() => assigningHC()}
            clientDetails={clientDetails}
            displayAssignButton={true}
            onEditHealthProfile={() => setSelectedTab(2)}
            assignButtonText={
              clientDetails.assignment_details && clientDetails.assignment_details.hc_assigned === false
                ? "Assign Health Coach"
                : clientDetails.assignment_details && clientDetails.assignment_details.md_assigned === false
                ? "Assign MD"
                : "MD Assigned"
            }
            isAssignButtonDisable={clientDetails.assignment_details &&  (clientDetails.assignment_details.hc_assigned === true && clientDetails.assignment_details.md_assigned === true) ? true : false}
            />}
          </PiTabPanel>
          <PiTabPanel>
            
            {/* <UserListContainer className="main"> */}
              {/* <ClientsLeftmenu email={clientDetails.email} phone={clientDetails.phone} onEditProfile={onEditProfile} /> */}
              {/* <RightContainer style={{ background: "#F5F7F7", padding: 0 }}>
                <ClientSummaryBlock>
                  <div className="clientSummary">
                    <div className="summaryHeader">
                      <PiTypography component="h5">Documents</PiTypography>
                    </div>
                    <div className="summaryDetails">
                      <div
                        className={
                          "linkBtn " +
                          (clientDetails.client_msq === true ? "" : "disabled")
                        }
                      >
                        <div className="linkText" onClick={symptomAnalysisData}>
                          
                          <SymptomAnalysisIcon />
                          <span>Symptom Analysis</span>
                        </div>
                      </div>
                      <div
                        className={
                          "linkBtn " +
                          (clientDetails.client_intake === true
                            ? ""
                            : "disabled")
                        }
                      >
                        <div className="linkText" onClick={intakeForn}>
                          
                          <IntakeFormIcon />
                          <span>Intake Form</span>
                        </div>
                      </div>
                      <div
                        className={
                          "linkBtn " +
                          (clientDetails.client_past_test === true
                            ? ""
                            : "disabled")
                        }
                      >
                        <div className="linkText" onClick={docView}>
                          
                          <PdfIcon />
                          <span>Historical Tests</span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* {notes && notes.map((note: any, index: number) => {
							return <PiRteBox
								editorProps={{
									libraryType: 'atalskit',
									onChange: (e: any) => rteNote(e, index),
									// onBlur: (e: any) => onRteBox(note, index),
									placeholder: 'Text Here...',
									value: note.description
								}}
								libraryType="atalskit"
								onAddComment={function noRefCheck() { }}
								title={note.note_name}
								lastUpdated={DateFormats(note.last_modified_date)}
								modifiedByName={note.last_modified_by}
							/>
						})}  */}
                  {/* <div className="clientSummary">
                            <div className="summaryHeader d-flex" >
                                <div className="d-flex align-items-center"><PiTypography component="h5">Sales Notes</PiTypography> &nbsp; <span className="statusBadge">Internal</span></div>
                                <div className="linkBtn" style={{margin: "0px"}}>
                                    <a href="#"> <MessageIcon/><span>Add Comment</span></a>
                                </div>
                            </div>
                            <div className="summaryDetails">
                                <PiTextArea
                                    libraryType="atalskit"
                                    minimumRows={3}
                                    name="textarea"
                                    placeholder="Text here..."
                                />
                            </div>
                        </div> */}
                {/* </ClientSummaryBlock>
              </RightContainer>
            </UserListContainer> */}
            <Document 
              symptomAnalysisData={symptomAnalysisData} 
              intakeForn={intakeForn} docView={docView} 
              clientDetails={clientDetails}
            />
          </PiTabPanel>
          <PiTabPanel>
            <HealthProfile />
          </PiTabPanel>
        </PiTabGroup>
      </SecondaryHeaderCon>

      {assignMD && (
        <PiAssignmentBoxMDSideDrawer
          isOpen={assignMD}
          assignmentData={mdData}
          buttonText="Assign"
          headerTitle="Select MD"
          libraryType="atalskit"
          onKeyUp={onKeyUpValue}
          OnDrawerClose={mdBackdropClose}
          onSubmitAssign={assignClient}
          onValueChange={valueChanged}
          OnSearchClear={() => clearSearch()}
          isFilterApplied={isFilterApplied}
          filterData={weekdays}
          selectedFilterValues={[]}
          onApply={filterData}
          searchValue={searchValue}
          noRecodsMsg={
            searchValue !== ""
              ? "No user matched your search. Try using a different keyword"
              : noRecordFilterMsg
          }
        />
      )}
      {assignHC && (
        <PiAssignmentBoxHcSideDrawer
          assignmentData={hcData}
          buttonText="Assign"
          headerTitle="Select Health Coach"
          libraryType="atalskit"
          onKeyUp={onHCKeyUpValue}
          onSubmitAssign={assignClient}
          onValueChange={hcValueChanged}
          OnDrawerClose={hcBackdropClose}
          isOpen={assignHC}
          OnSearchClear={() => hcClearSearch()}
          searchValue={hcSearchValue}
          selectedFilterValues={selectedFilterValues}
          experienceData={experiences}
          timezoneData={timezones}
          specializationData={specialists}
          onApply={hcFilterData}
          noRecodsMsg={
            hcSearchValue !== ""
              ? "No user matched your search. Try using a different keyword"
              : noRecordFilterMsg
          }
        />
      )}
      <PiIntakeFormSideDrawer
        isOpen={intakeForm}
        OnDrawerClose={intakeBackdropClose}
        headerTitle="Intake Form"
        libraryType="atalskit"
        questionData={intakeData}
        totalScore={intakeCount}
      />
      <PiSymptomAnalysisSideDrawer
        isOpen={symptomAnalysis}
        OnDrawerClose={symptomBackdropClose}
        headerTitle="Symptom Analysis"
        libraryType="atalskit"
        questionData={symptomanalysisData}
        totalScore={symptomCount}
      />

      <SideDrawerHolder>
        <PiSideDrawer
          isOpen={openEditProfile}
          onClose={() => setOpenEditProfile(false)}
          width="medium"
          onBackdropClose={() => setOpenEditProfile(false)}
        >
          {openEditProfile && (
            <EditClientprofile
              clientId={clientParam.id}
              setOpenEditProfile={setOpenEditProfile}
              clientName={firstName + " " + lastName}
              initialValues={initialValues}
              getClientList={getClientList}
            />
          )}
        </PiSideDrawer>
      </SideDrawerHolder>

      <SideDrawerHolder>
        {/* <PiSideDrawer isOpen={docViewer}
					onClose={() => openDocViewer(false)}
					width="full"
					onBackdropClose={() => openDocViewer(false)}
				> */}
        {/* <PiDrawerHeader
						libraryType="atalskit"
						OnClose={() => openDocViewer(false)}
						title="Historical Tests"
					/> */}
        {docLink && (
          <PiDocViewer
            isOpen={docViewer}
            source={docLink}
            onClose={() => openDocViewer(false)}
            onBackdropClose={onBackdropClose}
          />
        )}
        {/* </PiSideDrawer> */}
      </SideDrawerHolder>
</>}
      </>
    
  );
}
