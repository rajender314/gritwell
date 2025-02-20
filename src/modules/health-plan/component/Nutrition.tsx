import { PiButton, PiCheckbox, PiModalPopup, PiReactTable, PiSelect, PiTextArea, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { Icon } from "../../../components";
import apiEndpoint from "../../../core/apiend_point";
import { getLocalStorage } from "../../../core/localStorageService";
import { ApiResponseProps, HealthPlanUrlParams, ModalProps } from "../../../core/schema";
import { PayloadProps, StatusProps } from "../../../schema/schema";
import { triggerApi } from "../../../services";
import {
  GWCStepperContent,
  GwcNoSuggestionsCard,
  NoSuggestionsCardTitle,
  FooterAction,
  HealthPlanNutritionSelect,
  CustomGWDataTable,
  GWDataTableRow,
  GWDataTableCell
} from "../../../styles/common-styles";
import Spinner from '../../../components/spinner'
import { useHistory, useParams } from "react-router";
import ConfirmBox from "./modals/ConfirmBox";
import { Roles } from "../../roles/component";
import reportWebVitals from "../../../reportWebVitals";

export type FinalDataProps = {
  increase: any
  decrease: any
  avoid: any
  notes: string
}

export type Item = {
  description: string
  name: string
  nutrition_id: string
  status: string
  type?: string
  _id: string
}

export type AddNutritions = {
  isOpen: boolean
  buttonAppearance: string
  headerTitle: string
  isRemoveSearch: boolean
  buttonText: string
  selectedValues: string[] | Item[],
  editDetails: boolean,
  showBackButton: boolean
  type: string
}

const Nutrition = ({ setSaveAndExit, ...props }: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  let urlParams = useParams<HealthPlanUrlParams>();
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [tableData, setTableData] = useState<Item[]>([]);
  const [nutritions, setSutritions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [increasedSelectedValues, setIncreasedSelectedValues] = useState<string[]>([]);
  const [decreasedSelectedValues, setDecreasedSelectedValues] = useState<string[]>([]);
  const [avoidSelectedValues, setAvoidSelectedValues] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [finalData, setFinalData] = useState<FinalDataProps>({
    increase: [],
    decrease: [],
    avoid: [],
    notes: ''
  })
  const [modal, setModal] = useState<AddNutritions>({
    isOpen: false,
    buttonText: 'Next',
    buttonAppearance: 'primary',
    headerTitle: 'Add Increase ',
    isRemoveSearch: false,
    selectedValues: [],
    editDetails: false,
    showBackButton: false,
    type: 'increase'
  });

  let defaultConfirm = {
    is_open: false,
    action: '',
    message: '',
    data: {},
    type: ''
  };
  const [conrfirmBox, setConrfirmBox] = useState<ModalProps>(defaultConfirm);

  let history = useHistory();
  useEffect(() => {
    getNutritions();
    getExistingNutritions();
    getStatus()
  }, [])


  const getStatus = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.nutritionStatuses,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // console.log(res.data.result)
        if (res.data.result.length > 0) {
          setStatusDropdown(res.data.result)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const getStatusByValue = (status: string | number, column: string = 'code') => {
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

  const getNutritions = async (params: any = {}) => {
    setIsLoading(true);
    let search = params.clearSearch ? '' : searchValue;
    const apiObject: PayloadProps = {
      payload: {
        type: 'health_plan'
      },
      method: "GET",
      apiUrl: apiEndpoint.nutritionApi.concat("?search=" + search+"&type=health_plan"),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setIsLoading(false);
        setSutritions(res.data.result)
      })
      .catch((err: object) => {
        console.log(err, "Error");
        setIsLoading(false);
      });
  };

  const getExistingNutritions = async () => {
    const apiObject: PayloadProps = {
      payload: {
        payload: {},
        notes: finalData.notes,
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "GET",
      apiUrl: apiEndpoint.healthPlanNutrition + '/' + urlParams.id,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data) {
          setIncreasedSelectedValues(res.data.nutritions.increase.map((value: Item) => value.nutrition_id))
          setDecreasedSelectedValues(res.data.nutritions.decrease.map((value: Item) => value.nutrition_id))
          setAvoidSelectedValues(res.data.nutritions.avoid.map((value: Item) => value.nutrition_id))
          setFinalData({
            increase: res.data.nutritions.increase,
            decrease: res.data.nutritions.decrease,
            avoid: res.data.nutritions.avoid,
            notes: res.data.notes
          })
          setNotes(res.data.notes)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const addNutritions = async () => {
    const apiObject: PayloadProps = {
      payload: {
        payload: {
          increase: finalData.increase,
          decrease: finalData.decrease,
          avoid: finalData.avoid,
        },
        notes: finalData.notes,
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "POST",
      apiUrl: apiEndpoint.healthPlanNutrition,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (setSaveAndExit) {
          history.push("/office/client/" + urlParams.id);
        } else {
          history.push("/office/health-plan/"+urlParams.health_plan_id+"/" + urlParams.id + "/" + "testing");
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };


  const refreshData =  (type: string = 'increase') => {
    // if (type === 'increase') {
    setModal({
      isOpen: false,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' + type,
      isRemoveSearch: false,
      selectedValues: [],
      editDetails: false,
      showBackButton: false,
      type: type
    })
     setTableData([])
    // }
  }

  const addIncrease = (type: string = 'increase') => {
    var selectedData: string[] = [];
    if (type === 'increase') {
      selectedData = increasedSelectedValues
    } else if (type === 'decrease') {
      selectedData = decreasedSelectedValues
    } else if (type === 'avoid') {
      selectedData = avoidSelectedValues
    }
    let activeState = {
      isOpen: true,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' + type,
      isRemoveSearch: false,
      selectedValues: selectedData,
      editDetails: false,
      showBackButton: false,
      type: type
    };
    // console.log(activeState.isOpen)
    setModal(activeState)
    // }
    setTableData([])
  }

  const updateIncrease = async (type: string = 'increase') => {
    let selectedValues = [];
    if (type === 'increase') {
      selectedValues = finalData.increase;
    } else if (type === 'decrease') {
      selectedValues = finalData.decrease;
    } else if (type === 'avoid') {
      selectedValues = finalData.avoid;
    }
    
    let activeState = {
      isOpen: true,
      buttonText: 'Save',
      buttonAppearance: 'primary',
      headerTitle: 'Edit details ',
      isRemoveSearch: true,
      selectedValues: selectedValues,
      editDetails: true,
      showBackButton: true,
      type: type
    };
    
    setTableData(selectedValues)
    setModal(activeState)
  }

  const deleteItem = (type: string = 'increase', nutrition_id: string, id: string) => {
    let activeFinalData = finalData;
    if (type === 'increase') {
      activeFinalData.increase = finalData.increase.filter((value: Item) => value.nutrition_id !== nutrition_id)
      setIncreasedSelectedValues(activeFinalData.increase.map((value: Item) => value.nutrition_id))
      id && deleteDbItem(id)
    } else if (type === 'decrease') {
      activeFinalData.decrease = finalData.decrease.filter((value: Item) => value.nutrition_id !== nutrition_id);
      setDecreasedSelectedValues(activeFinalData.decrease.map((value: Item) => value.nutrition_id))
      id && deleteDbItem(id)
    } else if (type === 'avoid') {
      activeFinalData.avoid = finalData.avoid.filter((value: Item) => value.nutrition_id !== nutrition_id);
      setAvoidSelectedValues(activeFinalData.avoid.map((value: Item) => value.nutrition_id))
      id && deleteDbItem(id)
    }
    setFinalData(activeFinalData);
  }

  const deleteDbItem = async (id: string) => {
    const apiObject: PayloadProps = {
      payload: {
        id: id
      },
      method: "DELETE",
      apiUrl: apiEndpoint.healthPlanNutritionDelete + '/' + id,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {

      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  }

  const closeIncrease = async (type: string = 'increase') => {
    refreshData()
    let activeState = {
      isOpen: false,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' ,
      isRemoveSearch: false,
      selectedValues: [],
      editDetails: false,
      showBackButton: false,
      type: type
    };
    
    setModal(activeState)
    setTableData([])
  }


  const onBackClick = (type: string = 'increase') => {
    // if (type === 'increase') {
    const existState = modal
    let activeState = {
      isOpen: true,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' + type,
      isRemoveSearch: false,
      selectedValues: existState.selectedValues,
      editDetails: false,
      showBackButton: false,
      type: type
    };
    // console.log(activeState.isOpen)
    setModal(activeState)
    // }
  }

  function updateDetails(e: any, index: number, type: string = '', popupType:string='') {
    let existingData = tableData;

    let newData: Item[] = existingData.map((value: Item, i) => {
      if (index === i) {
        if (type === 'status') {
          value.status = e.value
        } else {
          value.description = e.target.value

        }
      }
      return value;
    });

    setTableData(newData)
    // console.log(newData)

    let activeState = {
      isOpen: true,
      buttonText: 'Save',
      buttonAppearance: 'primary',
      headerTitle: 'Edit details ',
      isRemoveSearch: true,
      selectedValues: newData,
      editDetails: true,
      showBackButton: true,
      type: popupType
    };
    // console.log(activeState.isOpen)
    setModal(activeState)
  }


  function onKeyUpValue(e: any) {
    if (e.key === 'Enter') {
      if (e.target.value.length >= 2 || isSearch) {
        setSearchValue(e.target.value);
        getNutritions();

      }
      if (e.target.value.length > 1) {
        setIsSearch(true)
      }
      if (e.target.value.length < 1) {
        setIsSearch(true)
      }
    }
  }
  function valueChanged(e: any) {
    setSearchValue(e.target.value);
    if (e.key === 'Enter') {
      if (e.target.value.length >= 2) {
        setSearchValue(e.target.value);
        getNutritions();
      }
    }
  }

  function clearSearch() {
    setSearchValue("");
    getNutritions({ clearSearch: true });
  }

  const onIncreaseChecked = (e: any) => {
    // const currentStateData = increase
    var selectedValues = increasedSelectedValues;
    if (modal.type === 'increase') {
      var selectedValues = increasedSelectedValues;
    } else if (modal.type === 'decrease') {
      var selectedValues = decreasedSelectedValues;
    } else if (modal.type === 'avoid') {
      var selectedValues = avoidSelectedValues;
    }

    // console.log(selectedValues)
    const { value, checked } = e.target
    // console.log(value, checked)
    if (checked) {
      if (modal.type === 'increase') {
        setIncreasedSelectedValues([...selectedValues, value])
      } else if (modal.type === 'decrease') {
        setDecreasedSelectedValues([...selectedValues, value])
      } else if (modal.type === 'avoid') {
        setAvoidSelectedValues([...selectedValues, value])
      }

    } else {
      if (selectedValues.includes(value)) {
        const filterIndex = selectedValues.indexOf(value)
        const newData = [...selectedValues]
        newData.splice(filterIndex, 1)
        if (modal.type === 'increase') {
          setIncreasedSelectedValues([...newData])
        } else if (modal.type === 'decrease') {
          setDecreasedSelectedValues([...newData])
        } else if (modal.type === 'avoid') {
          setAvoidSelectedValues([...newData])
        }
      }
    }
    // console.log(currentStateData.selectedValues)
    // setModal(currentStateData);
  }


  const onDataSave = async (type: string = 'increase') => {
    // if (type === 'increase') {
    if (modal.showBackButton) {
      refreshData('increase')
      return;
    }
    var selectedValues = increasedSelectedValues;
    var finalExistingData: Item[] = [];
    if (modal.type === 'increase') {
      var selectedValues = increasedSelectedValues;
      finalExistingData = finalData.increase;
    } else if (modal.type === 'decrease') {
      var selectedValues = decreasedSelectedValues;
      finalExistingData = finalData.decrease;
    } else if (modal.type === 'avoid') {
      var selectedValues = avoidSelectedValues;
      finalExistingData = finalData.avoid;
    }
    // console.log(finalExistingData)

    let gridData: Item[] = [];
    let activeStatus = getStatusByValue('active', 'code');
    nutritions.filter((item: Item) => {
      if (selectedValues.includes(item._id)) {
        let data = finalExistingData.filter((existing: Item) => {
          if (item._id === existing.nutrition_id) {
            return existing;
          }
        })
        let newItem = {
          _id: data[0]?._id ? data[0]._id : '',
          nutrition_id: data[0]?.nutrition_id ? data[0].nutrition_id : item._id,
          name: data[0]?.name ? data[0].name : item.name,
          description: data[0]?.description ? data[0].description : item.description,
          status: data[0]?.status ? data[0].status : activeStatus[0] ? activeStatus[0]['value'] : ''
        }
        gridData.push(newItem);
      }
    });
    setTableData(gridData)
    // console.log(selectedValues,gridData)
    let activeState = {
      isOpen: true,
      buttonText: 'Save',
      buttonAppearance: 'primary',
      headerTitle: 'Edit details ',
      isRemoveSearch: true,
      selectedValues: gridData,
      editDetails: true,
      showBackButton: true,
      type: type
    };
    setModal(activeState)

    // if(modal.editDetails){
      let activeFinalData = finalData;
      if (modal.type === 'increase') {
        activeFinalData.increase = gridData;
      } else if (modal.type === 'decrease') {
        activeFinalData.decrease = gridData;
      } else if (modal.type === 'avoid') {
        activeFinalData.avoid = gridData;
      }
      setFinalData(activeFinalData);
    // }
    
  }

  function getCurrentSelectedData(){
    var selectedData: string[] = []
    if (modal.type === 'increase') {
      selectedData = increasedSelectedValues;
    } else if (modal.type === 'decrease') {
      selectedData = decreasedSelectedValues;
    } else if (modal.type === 'avoid') {
      selectedData = avoidSelectedValues;
    }
    return selectedData;
  }

  return (<>
    <GWCStepperContent>
      <div className="StepperContentHeader">
        <Icon name="nutritiontabicon" />
        <PiTypography component="h4">
          Nutrition
        </PiTypography>
      </div>
      {isLoading &&
        <Spinner />
      }

      {!isLoading && <div className="stepperContentBody">
        <GwcNoSuggestionsCard>
          <NoSuggestionsCardTitle>
            Increase
          </NoSuggestionsCardTitle>
          {finalData.increase.length === 0 && <div className="NoSuggestionsCardBody">
            <p>No suggestions yet </p>
            <p>Create a new suggestion from the add button below</p>
          </div>}
          <CustomGWDataTable>
            {finalData.increase?.map((item: any, index: number) => {
              let status: StatusProps[] = getStatusByValue(item.status, 'value')
              let disabled = (status[0] && status[0]['code'] === 'active') ? '' : 'disabled'
              let icon = (status[0] && status[0]['code'] === 'active') ? <Icon name="activeIcon" /> : <Icon name="inactiveIcon" />;
              return <GWDataTableRow key={`increas_${index}`}>
                <GWDataTableCell className={`flex1 ${disabled}`} title={item.description}>{item.name}</GWDataTableCell>
                <GWDataTableCell className={`activeStatus ${disabled}`}> {icon} {status[0] && status[0]['label']}  </GWDataTableCell>
                <GWDataTableCell className="BGTrans">
                  <span className="EditData pointer" onClick={() => updateIncrease('increase')}><Icon name="editicon" /></span>
                  <span className="DeleteData pointer" onClick={() => setConrfirmBox({
                    is_open: true,
                    data: item,
                    action: 'Delete',
                    message: 'Are you sure you want to delete the Nutrition  item?',
                    type: 'increase'
                  })}>
                    <Icon name="datadeleteicon" />
                  </span>
                </GWDataTableCell>
                {/* deleteItem('increase', item.nutrition_id, item._id) */}
              </GWDataTableRow>
            }
            )}
          </CustomGWDataTable>

          <PiButton
            appearance='link'
            label="add"
            onClick={() => addIncrease('increase')}
            iconBefore={<Icon name="plusicon" />}
            className="mt-2" />
        </GwcNoSuggestionsCard>

        <GwcNoSuggestionsCard>
          <NoSuggestionsCardTitle>
            Decrease
          </NoSuggestionsCardTitle>
          {finalData.decrease.length === 0 && <div className="NoSuggestionsCardBody">
            <p>No suggestions yet </p>
            <p>Create a new suggestion from the add button below</p>
          </div>}
          <CustomGWDataTable>
            {finalData.decrease?.map((item: any, index: number) => {
              let status: any = getStatusByValue(item.status, 'value')
              let disabled = (status[0] && status[0]['code'] === 'active') ? '' : 'disabled'
              let icon = (status[0] && status[0]['code'] === 'active') ? <Icon name="activeIcon" /> : <Icon name="inactiveIcon" />;
              return <GWDataTableRow key={`increas_${index}`}>
                <GWDataTableCell className={`flex1 ${disabled}`}>{item.name}</GWDataTableCell>
                <GWDataTableCell className={`activeStatus ${disabled}`}> {icon} {status[0] && status[0]['label']}  </GWDataTableCell>
                <GWDataTableCell className="BGTrans">
                  <span className="EditData pointer" onClick={() => updateIncrease('decrease')}><Icon name="editicon" /></span>
                  <span className="DeleteData pointer" onClick={() => setConrfirmBox({
                    is_open: true,
                    data: item,
                    action: 'Delete',
                    message: 'Are you sure you want to delete the Nutrition  item?',
                    type: 'decrease'
                  })}>
                    <Icon name="datadeleteicon" />
                  </span>
                </GWDataTableCell>
              </GWDataTableRow>
            }
            )}
          </CustomGWDataTable>
          <PiButton
            appearance='link'
            label="add"
            onClick={() => addIncrease('decrease')}
            iconBefore={<Icon name="plusicon" />}
            className="mt-2" />
        </GwcNoSuggestionsCard>

        <GwcNoSuggestionsCard>
          <NoSuggestionsCardTitle>
            Avoid
          </NoSuggestionsCardTitle>
          {finalData.avoid.length === 0 && <div className="NoSuggestionsCardBody">
            <p>No suggestions yet </p>
            <p>Create a new suggestion from the add button below</p>
          </div>}
          <CustomGWDataTable>
            {finalData.avoid?.map((item: any, index: number) => {
              let status: any = getStatusByValue(item.status, 'value')
              let disabled = (status[0] && status[0]['code'] === 'active') ? '' : 'disabled'
              let icon = (status[0] && status[0]['code'] === 'active') ? <Icon name="activeIcon" /> : <Icon name="inactiveIcon" />;
              return <GWDataTableRow key={`increas_${index}`}>
                <GWDataTableCell className={`flex1 ${disabled}`} title={item.name}>{item.name}</GWDataTableCell>
                <GWDataTableCell className={`activeStatus ${disabled}`}> {icon} {status[0] && status[0]['label']}  </GWDataTableCell>
                <GWDataTableCell className="BGTrans">
                  <span className="EditData pointer" onClick={() => updateIncrease('avoid')}><Icon name="editicon" /></span>
                  <span className="DeleteData pointer" onClick={() => setConrfirmBox({
                    is_open: true,
                    data: item,
                    action: 'Delete',
                    message: 'Are you sure you want to delete the Nutrition  item?',
                    type: 'avoid'
                  })}>
                    <Icon name="datadeleteicon" />
                  </span>
                </GWDataTableCell>
              </GWDataTableRow>
            }
            )}
          </CustomGWDataTable>
          <PiButton
            appearance='link'
            label="add"
            onClick={() => addIncrease('avoid')}
            iconBefore={<Icon name="plusicon" />}
            className="mt-2" />
        </GwcNoSuggestionsCard>

        <GwcNoSuggestionsCard className="internalTextArea">
          <NoSuggestionsCardTitle>
            Internal Note
          </NoSuggestionsCardTitle>
          <PiTextArea
            placeholder=''
            name=''
            className='TabsTextArea'
            minimumRows={4}
            onChange={(e: any) => {
              let activeData = finalData;
              activeData.notes = e.target.value; //.slice(0, 100);
              setNotes(activeData.notes)
              setFinalData(activeData)
            }}
            value={notes}
          />
          {/* <span className="text-limit">{notes.length}/100</span> */}
        </GwcNoSuggestionsCard>

      </div>}

      {modal.isOpen &&
        <PiModalPopup
          buttonText={modal.buttonText}
          buttonAppearance={'primary'}
          isOpen={modal.isOpen}
          headerTitle={modal.headerTitle}
          onKeyUp={(e: any) => onKeyUpValue(e)}
          onSearchClear={clearSearch}
          onBackDropClick={function noRefCheck() { }}
          onValueChange={valueChanged}
          isRemoveSearch={modal.isRemoveSearch}
          onClose={() => {closeIncrease(modal.type)}}
          onAddClick={() => onDataSave(modal.type)}
          searchValue={searchValue}
          showBackButton={modal.showBackButton}
          onBackClick={() => onBackClick(modal.type)}
          width="1000px"
          isButtonDisabled={getCurrentSelectedData().length <= 0}
          footerText={''}
        >
          <div className="popup-body">

            {!isLoading && !modal.editDetails && nutritions?.map((item: any, index) => {
              let selectedData = getCurrentSelectedData()
              const checked = !!(
                selectedData.length > 0 &&
                selectedData.includes(item._id)
              )
              return <HealthPlanNutritionSelect key={index}>
                <div className="item-checkbox">
                  <PiCheckbox
                    helpText=''
                    isChecked={checked}
                    label={''}
                    libraryType='atalskit'
                    name='experiance'
                    onChange={onIncreaseChecked}
                    size='large'
                    value={item._id}
                  />
                </div>
                <div className="content">
                  <p className="name">{item.name}</p>
                  <span className="description">{item.description}</span>
                </div>

              </HealthPlanNutritionSelect>
            })
            }
            {nutritions.length === 0 && <div className="no-data">
              No data found.
            </div>}

            {(tableData.length > 0 && modal.editDetails) &&
              <>
                <PiReactTable
                  pages={100}
                  selectedIndex={1}
                  infinitescroll={false}
                  fetchMoreData={() => { }}
                  onPageChange={(e: any) => console.log(e)}
                  onSortClick={() => { }}
                  tableData={tableData}
                  hasMore={false}
                  scrollableTarget="scrollableDiv"
                  column={[
                    {
                      Header: 'Item',
                      accessor: 'name', // accessor is the "key" in the data
                      disableSortBy: true,
                      width: "25%",
                      Cell: (props: any) => {
                        return <>
                          <div className="truncate">{props.value}</div>
                        </>
                      }
                    },
                    {
                      Header: 'Description',
                      accessor: 'description',
                      disableSortBy: true,
                      width: "50%",
                      Cell: (props: any) => {
                        return <>
                          <PiTextArea
                            helpText=""
                            label=""
                            libraryType="atalskit"
                            minimumRows={3}
                            name="textarea"
                            onChange={(e: any) => updateDetails(e, props.cell.row.index, 'description', modal.type)}
                            defaultValue={props.value}
                            autoFocus={false}
                          />
                          {/* {props.value} */}
                        </>
                      }
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
                      disableSortBy: true,
                      width: "25%",
                      Cell: (props: any) => {
                        return <>
                          <PiSelect
                            libraryType="atalskit"
                            name="Select"
                            onChange={(e: any) => {
                              updateDetails(e, props.cell.row.index, 'status', modal.type);
                            }}
                            options={statusDropdown}
                            placeholder="Select"
                            value={getStatusByValue(props.value, 'value')}
                          />
                        </>
                      }
                    }
                  ]}
                />
              </>
            }
          </div>
        </PiModalPopup>
      }

      {conrfirmBox.is_open && <ConfirmBox {...conrfirmBox}
        onModalClose={() => {
          setConrfirmBox(defaultConfirm)
        }}
        width="small"
        onConfirm={(item: Item, type: string) => {
          deleteItem(type, item.nutrition_id, item._id);
          setConrfirmBox(defaultConfirm)
        }}
      />}

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
          onClick={addNutritions}
        />
      </div>
    </FooterAction>



  </>
  );
};
export default Nutrition;
