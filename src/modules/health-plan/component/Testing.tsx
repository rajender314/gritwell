import { PiButton, PiCheckbox, PiModalPopup, PiReactTable, PiSelect, PiTextArea, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { Icon } from "../../../components";
import apiEndpoint from "../../../core/apiend_point";
import { getLocalStorage } from "../../../core/localStorageService";
import { ApiResponseProps, HealthPlanUrlParams } from "../../../core/schema";
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

export type FinalDataProps = {
  items: any
  notes: string
}

export type Item = {
  description: string
  name: string
  test_id: string
  brand: string
  link: string
  price: number | string
  status: string
  type: string
  _id: string
}

export type AddTests = {
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

export type ModalProps = {
  is_open: boolean
  action: string
  message: string
  data: any
  type: string
}

const Nutrition = ({ setSaveAndExit, ...props }: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  let urlParams = useParams<HealthPlanUrlParams>();
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [tableData, setTableData] = useState<Item[]>([]);
  const [tests, setTests] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState("");

  let defaultConfirm = {
    is_open: false,
    action: '',
    message: '',
    data: {},
    type: ''
  };
  const [conrfirmBox, setConrfirmBox] = useState<ModalProps>(defaultConfirm);

  const [itemsSelectedValues, setItemsSelectedValues] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<FinalDataProps>({
    items: [],
    notes: ''
  })
  const [modal, setModal] = useState<AddTests>({
    isOpen: false,
    buttonText: 'Next',
    buttonAppearance: 'primary',
    headerTitle: 'Add Increase ',
    isRemoveSearch: false,
    selectedValues: [],
    editDetails: false,
    showBackButton: false,
    type: 'items'
  });
  let history = useHistory();
  useEffect(() => {
    getTests();
    getExistingTests();
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

  const getTests = async (params: any = {}) => {
    setIsLoading(true);
    let search = params.clearSearch ? '' : searchValue;
    const apiObject: PayloadProps = {
      payload: {
        type: 'health_plan'
      },
      method: "GET",
      apiUrl: apiEndpoint.testingApi.concat("?search=" + search + "&type=health_plan"),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setIsLoading(false);
        setTests(res.data.result)
      })
      .catch((err: object) => {
        console.log(err, "Error");
        setIsLoading(false);
      });
  };

  const getExistingTests = async () => {
    const apiObject: PayloadProps = {
      payload: {
        payload: {},
        notes: finalData.notes,
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "GET",
      apiUrl: apiEndpoint.healthPlanTesting + '/' + urlParams.id,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data) {
          setItemsSelectedValues(res.data.tests.map((value: Item) => value.test_id))
          setFinalData({
            items: res.data.tests,
            notes: res.data.notes
          })
          setNotes(res.data.notes)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const addTests = async () => {
    const apiObject: PayloadProps = {
      payload: {
        payload: {
          items: finalData.items
        },
        notes: finalData.notes,
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "POST",
      apiUrl: apiEndpoint.healthPlanTesting,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (setSaveAndExit) {
          history.push("/office/client/" + urlParams.id);
        } else {
          history.push("/office/health-plan/" + urlParams.health_plan_id + "/" + urlParams.id + "/" + "supplement");
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };


  const refreshData = async (type: string = 'items') => {
    // if (type === 'items') {
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
    await setTableData([])
    // }
  }

  const addIncrease = (type: string = 'items') => {
    let activeState = {
      isOpen: true,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' + type,
      isRemoveSearch: false,
      selectedValues: [],
      editDetails: false,
      showBackButton: false,
      type: type
    };
    // console.log(activeState.isOpen)
    setModal(activeState)
    // }
    setTableData([])
  }

  const updateIncrease = async (type: string = 'items') => {
    let selectedValues = [];
    if (type === 'items') {
      selectedValues = finalData.items;
    }
    setTableData(selectedValues)
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
    setModal(activeState)

  }

  const deleteItem = (type: string = 'items', test_id: string, id: string) => {
    let activeFinalData = finalData;
    if (type === 'items') {
      activeFinalData.items = finalData.items.filter((value: Item) => value.test_id !== test_id)
      setItemsSelectedValues(activeFinalData.items.map((value: Item) => value.test_id))
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
      apiUrl: apiEndpoint.healthPlanTestingDelete + '/' + id,
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

  const closeIncrease = async (type: string = 'items') => {
    await refreshData()
    let activeState = {
      isOpen: false,
      buttonText: 'Next',
      buttonAppearance: 'primary',
      headerTitle: 'Add ' + type,
      isRemoveSearch: false,
      selectedValues: [],
      editDetails: false,
      showBackButton: false,
      type: type
    };
    await setTableData([])
    // console.log(activeState.isOpen)
    setModal(activeState)
  }


  const onBackClick = (type: string = 'items') => {
    // if (type === 'items') {
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

  function updateDetails(e: any, index: number, type: string = '', popupType: string = '') {
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
        getTests();

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
        getTests();
      }
    }
  }

  function clearSearch() {
    setSearchValue("");
    getTests({ clearSearch: true });
  }

  const onIncreaseChecked = (e: any) => {
    var selectedValues = itemsSelectedValues;
    if (modal.type === 'items') {
      var selectedValues = itemsSelectedValues;
    }

    // console.log(selectedValues)
    const { value, checked } = e.target
    // console.log(value, checked)
    if (checked) {
      if (modal.type === 'items') {
        setItemsSelectedValues([...selectedValues, value])
      }

    } else {
      if (selectedValues.includes(value)) {
        const filterIndex = selectedValues.indexOf(value)
        const newData = [...selectedValues]
        newData.splice(filterIndex, 1)
        if (modal.type === 'items') {
          setItemsSelectedValues([...newData])
        }
      }
    }
    // console.log(currentStateData.selectedValues)
    // setModal(currentStateData);
  }


  const onDataSave = async (type: string = 'items') => {
    // if (type === 'items') {
    if (modal.showBackButton) {
      refreshData('items')
      return;
    }
    var selectedValues = itemsSelectedValues;
    var finalExistingData: Item[] = [];
    if (modal.type === 'items') {
      var selectedValues = itemsSelectedValues;
      finalExistingData = finalData.items;
    }
    // console.log(finalExistingData)

    let gridData: Item[] = [];
    let activeStatus = getStatusByValue('active', 'code');
    tests.filter((item: Item) => {
      if (selectedValues.includes(item._id)) {
        let data = finalExistingData.filter((existing: Item) => {
          if (item._id === existing.test_id) {
            return existing;
          }
        })
        let newItem = {
          _id: data[0]?._id ? data[0]._id : '',
          test_id: data[0]?.test_id ? data[0].test_id : item._id,
          name: data[0]?.name ? data[0].name : item.name,
          description: data[0]?.description ? data[0].description : item.description,
          brand: data[0]?.brand ? data[0].brand : item.brand,
          link: data[0]?.link ? data[0].link : item.link,
          type: data[0]?.type ? data[0].type : item.type,
          price: data[0]?.price ? data[0].price : item.price,

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

    // if (modal.editDetails) {
      let activeFinalData = finalData;
      if (modal.type === 'items') {
        activeFinalData.items = gridData;
      }
      setFinalData(activeFinalData);
    // }
  }

  return (<>
    <GWCStepperContent>
      <div className="StepperContentHeader">
        <Icon name="testingtabicon" />
        <PiTypography component="h4">
          Testing
        </PiTypography>
      </div>
      {isLoading && 
        <Spinner />
      }

      {!isLoading && <div className="stepperContentBody">
        <GwcNoSuggestionsCard>
          <NoSuggestionsCardTitle>
            Items
          </NoSuggestionsCardTitle>
          {finalData.items.length === 0 && <div className="NoSuggestionsCardBody">
            <p>No suggestions yet </p>
            <p>Create a new suggestion from the add button below</p>
          </div>}
          <CustomGWDataTable>
            {finalData.items?.map((item: any, index: number) => {
              let status: StatusProps[] = getStatusByValue(item.status, 'value')
              let disabled = (status[0] && status[0]['code'] === 'active') ? '' : 'disabled'
              let icon = (status[0] && status[0]['code'] === 'active') ? <Icon name="activeIcon" /> : <Icon name="inactiveIcon" />;
              return <GWDataTableRow key={`increas_${index}`}>
                <GWDataTableCell className={`flex1 ${disabled}`} title={item.description}>{item.name}</GWDataTableCell>
                <GWDataTableCell className={`activeStatus ${disabled}`}> {icon} {status[0] && status[0]['label']}  </GWDataTableCell>
                <GWDataTableCell className="BGTrans">
                  <span className="EditData pointer" onClick={() => updateIncrease('items')}><Icon name="editicon" /></span>
                  <span className="DeleteData pointer" onClick={() => setConrfirmBox({
                    is_open: true,
                    data: item,
                    action: 'Delete',
                    message: 'Are you sure you want to delete the Testing  item?',
                    type: 'items'
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
            onClick={() => addIncrease('items')}
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
          onClose={() => closeIncrease(modal.type)}
          onAddClick={() => onDataSave(modal.type)}
          searchValue={searchValue}
          showBackButton={modal.showBackButton}
          onBackClick={() => onBackClick(modal.type)}
          width="1000px"
          isButtonDisabled={itemsSelectedValues.length <= 0}
          footerText={''}
        >
          <div className="popup-body">

            {!isLoading && !modal.editDetails && tests?.map((item: any, index) => {
              var selectedData: string[] = []
              if (modal.type === 'items') {
                selectedData = itemsSelectedValues;
              }
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
                  <div className="headerInfo"> <p className="name">{item.name}</p><div className="extraInfo"><span>{item.brand}</span> <span>{item.price_with_symbol}</span></div>
                  </div>
                  <span className="description">{item.description}</span>
                  <div className="footerInfo"><span>{item.type}</span> <span>
                    <PiButton
                      appearance="link"
                      label='View details'
                      onClick={() => window.open(item.link, "_blank")}
                    /> </span>
                  </div>
                </div>

              </HealthPlanNutritionSelect>
            })
            }
            {tests.length === 0 && <div className="no-data">
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
                      width: '70px',
                      Cell: (props: any) => {
                        return <>
                          {props.value}
                        </>
                      }
                    },
                    {
                      Header: 'Description',
                      accessor: 'description',
                      disableSortBy: true,
                      width: "200px",
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
                      width: "70px",
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
          deleteItem(type, item.test_id, item._id);
          setConrfirmBox(defaultConfirm)
        }}
      />}

    </GWCStepperContent>

    <FooterAction className="d-flex align-items-center  justify-content-between">
      <div className="FooterActionWidth d-flex align-items-center  justify-content-between">
        <div className="d-flex align-items-center BackBlock" onClick={() => props.setTabChange('nutrition')}>
          <Icon name="back" />
          &nbsp; Back
        </div>
        <PiButton
          appearance="primary"
          label="Save and continue"
          size="extraLarge"
          onClick={addTests}
        />
      </div>
    </FooterAction>



  </>
  );
};
export default Nutrition;
