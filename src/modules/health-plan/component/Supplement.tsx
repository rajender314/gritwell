import { PiButton, PiCheckbox, PiInput, PiModalPopup, PiReactTable, PiSelect, PiTextArea, PiTypography } from "pixel-kit";
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
  GWDataTableCell,
  GridEditDetails
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
  supplement_id: string
  brand: string
  link: string
  price: number | string
  status: string
  // type: string
  quantity: number | string
  unit_id: string
  duration: string | number
  dosage: string | number
  _id: string
}

export type AddSupplements = {
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

export const Duration = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 6,
    label: "6"
  },
];

const Supplement = ({ setSaveAndExit, ...props }: any) => {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  let urlParams = useParams<HealthPlanUrlParams>();
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [durationDropdown, setDurationDropdown] = useState(Duration);
  const [unitsDropdown, setUnitsDropdown] = useState([]);
  const [tableData, setTableData] = useState<Item[]>([]);
  const [supplements, setSupplements] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [footerText, setFooterText] = useState<any>()

  let defaultConfirm = {
    is_open: false,
    action: '',
    message: '',
    data: {},
    type: ''
  };

  const [conrfirmBox, setConrfirmBox] = useState<ModalProps>(defaultConfirm);
  const [notes, setNotes] = useState("");
  const [itemsSelectedValues, setItemsSelectedValues] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<FinalDataProps>({
    items: [],
    notes: ''
  })
  const [modal, setModal] = useState<AddSupplements>({
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
    getSupplements();
    getExistingSupplements();
    getStatus()
    getUnits()
    setDurationDropdown(Duration)
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

  const getUnits = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.healthPlanUnits,
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        // console.log(res.data.result)
        if (res.data.result.length > 0) {
          setUnitsDropdown(res.data.result)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const getStatusByValue = (status: string | number, column: string = 'code', dropdownType: string = 'status') => {
    let dropdown: any = statusDropdown;
    if (dropdownType === 'units') {
      dropdown = unitsDropdown;
    } else if (dropdownType === 'duration') {
      dropdown = durationDropdown;
    }
    return dropdown.filter((value: StatusProps, i: number) => {
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

  const getSupplements = async (params: any = {}) => {
    setIsLoading(true);
    let search = params.clearSearch ? '' : searchValue;
    const apiObject: PayloadProps = {
      payload: {
        type: 'health_plan'
      },
      method: "GET",
      apiUrl: apiEndpoint.supplementsApi.concat("?search=" + search + "&type=health_plan"),
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        setIsLoading(false);
        setSupplements(res.data.result)
      })
      .catch((err: object) => {
        console.log(err, "Error");
        setIsLoading(false);
      });
  };

  const getExistingSupplements = async () => {
    const apiObject: PayloadProps = {
      payload: {
        client_id: urlParams.id,
        health_plan_id: urlParams.health_plan_id
      },
      method: "GET",
      apiUrl: apiEndpoint.healthPlanSuplement + '/' + urlParams.id,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (res.data) {
          setItemsSelectedValues(res.data.supplements.map((value: Item) => value.supplement_id))
          setFinalData({
            items: res.data.supplements,
            notes: res.data.notes
          })
          setNotes(res.data.notes)
        }
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };

  const addSupplements = async () => {
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
      apiUrl: apiEndpoint.healthPlanSuplement,
      headers: {
        Authorization: token,
      },
    };
    await triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        if (setSaveAndExit) {
          history.push("/office/client/" + urlParams.id);
        } else {
          history.push("/office/health-plan/" + urlParams.health_plan_id + "/" + urlParams.id + "/" + "lifestyle");
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

  const deleteItem = (type: string = 'items', supplement_id: string, id: string) => {
    let activeFinalData = finalData;
    if (type === 'items') {
      activeFinalData.items = finalData.items.filter((value: Item) => value.supplement_id !== supplement_id)
      setItemsSelectedValues(activeFinalData.items.map((value: Item) => value.supplement_id))
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
      apiUrl: apiEndpoint.healthPlanSuplementDelete + '/' + id,
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
        } else if (type === 'units') {
          value.unit_id = e.value
        } else if (type === 'duration') {
          value.duration = e.value
        } else if (type === 'quantity') {
          value.quantity = e.target.value
        } else if (type === 'description') {
          value.description = e.target.value
        }
      }
      return value;
    });

    setTableData(newData)

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
        getSupplements();

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
        getSupplements();
      }
    }
  }

  function clearSearch() {
    setSearchValue("");
    getSupplements({ clearSearch: true });
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

    var selectedValues = itemsSelectedValues;
    var finalExistingData: Item[] = [];
    if (modal.type === 'items') {
      var selectedValues = itemsSelectedValues;
      finalExistingData = finalData.items;
    }

    let activeStatus = getStatusByValue('active', 'code');
    var error_unit_id = false;
    var error_duration = false;
    var error_quantity = false;
    setFooterText('')

    if (modal.showBackButton) {
      finalExistingData.filter((existing: Item) => {
        if (existing.unit_id === '' || existing.duration === '' || existing.quantity === '') {
          error_quantity = true;
          return false;
        }
      })

      if (error_quantity || error_unit_id || error_duration) {
        setFooterText(<span className='error'>Required fields should be filled.</span>);
        return;
      }
      refreshData('items')
      return;
    }

    // console.log(finalExistingData)

    let gridData: Item[] = [];

    supplements.filter((item: Item) => {
      if (selectedValues.includes(item._id)) {
        let data = finalExistingData.filter((existing: Item) => {
          if (item._id === existing.supplement_id) {
            return existing;
          }
        })
        let newItem = {
          _id: data[0]?._id ? data[0]._id : '',
          supplement_id: data[0]?.supplement_id ? data[0].supplement_id : item._id,
          name: data[0]?.name ? data[0].name : item.name,
          description: data[0]?.description ? data[0].description : item.description,
          brand: data[0]?.brand ? data[0].brand : item.brand,
          // type: data[0]?.type ? data[0].type : item.type,
          link: data[0]?.link ? data[0].link : item.link,
          price: data[0]?.price ? data[0].price : item.price,
          unit_id: data[0]?.unit_id ? data[0].unit_id : '',
          duration: data[0]?.duration ? data[0].duration : '',
          dosage: data[0]?.dosage ? data[0].dosage : item.dosage,
          quantity: data[0]?.quantity ? data[0].quantity : 0,
          status: data[0]?.status ? data[0].status : activeStatus[0] ? activeStatus[0]['value'] : ''
        }
        gridData.push(newItem)
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
        <Icon name="supplimentstabicon" />
        <PiTypography component="h4">
          Supplement
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
                    message: 'Are you sure you want to delete the Supplement  item?',
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
          width='1100px'
          footerText={modal.editDetails ? footerText : ''}
        isButtonDisabled={itemsSelectedValues.length <= 0}
        >
          <div className="popup-body">

            {!isLoading && !modal.editDetails && supplements?.map((item: any, index) => {
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
                  {checked}
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
                  <div className="footerInfo"><span>{item.dosage}</span> <span>
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
            {supplements.length === 0 && <div className="no-data">
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
                      width: "15%",
                      Cell: (props: any) => {
                        return <GridEditDetails id={`row_${props.row.id}`}>
                          <div className="content">
                            <div className="headerInfo">
                              <PiButton
                                appearance="link"
                                label={props.value}
                                onClick={() => window.open(props.row.original.link, "_blank")}
                              />
                              <div className="extraInfo">
                                <span>{props.row.original.brand}</span>
                                <span>{props.row.original.dosage}</span>
                                <span>{props.row.original.price}</span>
                              </div>
                            </div>
                            {/* <div className="footerInfo"><span>{props.row.original.dosage}</span>
                            </div> */}
                          </div>
                        </GridEditDetails>
                      }
                    },
                    {
                      Header: 'Description',
                      accessor: 'description',
                      disableSortBy: true,
                      width: "25%",
                      Cell: (props: any) => {
                        return <>
                          <PiTextArea
                            helpText=""
                            label=""
                            libraryType="atalskit"
                            minimumRows={3}
                            name={`description-${props.row.id}`}
                            onChange={(e: any) => updateDetails(e, props.cell.row.index, 'description', modal.type)}
                            defaultValue={props.value}
                            autoFocus={false}
                          />
                          {/* {props.value} */}
                        </>
                      }
                    },
                    {
                      Header: '*Quantity',
                      accessor: 'quantity',
                      disableSortBy: true,
                      width: "10%",
                      Cell: (props: any) => {
                        return <>
                          <PiInput
                            type="number"
                            min={0}
                            helpText=""
                            label=""
                            libraryType="atalskit"
                            name={`quantity-${props.row.id}`}
                            // onKeyDown={() => {}}
                            onChange={(e: any) => console.log(e)}
                            defaultValue={props.value}
                            className='health-plan-grid-input'
                            onKeyDown={(e: any) => console.log(e)}
                          />
                        </>
                      }
                    },
                    {
                      Header: '*Units',
                      accessor: 'unit_id',
                      disableSortBy: true,
                      width: "10%",
                      Cell: (props: any) => {
                        return <>
                          <PiSelect
                            libraryType="atalskit"
                            name={`units-${props.row.id}`}
                            onChange={(e: any) => {
                              updateDetails(e, props.cell.row.index, 'units', modal.type);
                            }}
                            options={unitsDropdown}
                            placeholder="Select"
                            value={getStatusByValue(props.value, 'value', 'units')}
                          />
                        </>
                      }
                    },
                    {
                      Header: '*Duration',
                      accessor: 'duration',
                      disableSortBy: true,
                      width: "10%",
                      Cell: (props: any) => {
                        return <>
                          <PiSelect
                            libraryType="atalskit"
                            name={`duration-${props.row.id}`}
                            onChange={(e: any) => {
                              updateDetails(e, props.cell.row.index, 'duration', modal.type);
                            }}
                            options={durationDropdown}
                            placeholder="Day"
                            value={getStatusByValue(props.value, 'value', 'duration')}
                          />
                        </>
                      }
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
                      disableSortBy: true,
                      width: "10%",
                      Cell: (props: any) => {
                        return <>
                          <PiSelect
                            libraryType="atalskit"
                            name="status"
                            onChange={(e: any) => {
                              updateDetails(e, props.cell.row.index, 'status', modal.type);
                            }}
                            options={statusDropdown}
                            placeholder="Select Status"
                            value={getStatusByValue(props.value, 'value', 'status')}
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
          deleteItem(type, item.supplement_id, item._id);
          setConrfirmBox(defaultConfirm)
        }}
      />}

    </GWCStepperContent>

    <FooterAction className="d-flex align-items-center  justify-content-between">
      <div className="FooterActionWidth d-flex align-items-center  justify-content-between">
        <div className="d-flex align-items-center BackBlock" onClick={() => props.setTabChange('testing')}>
          <Icon name="back" />
          &nbsp; Back
        </div>
        <PiButton
          appearance="primary"
          label="Save and continue"
          size="extraLarge"
          onClick={addSupplements}
        />
      </div>
    </FooterAction>



  </>
  );
};
export default Supplement;
