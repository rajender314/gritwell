import { PiButton, PiReactTable } from "pixel-kit";
import React, { useEffect, useState } from "react";
import { GridHolder } from "../../../components/login-commonlayout/login-layout-components";
import apiEndpoint from "../../../core/apiend_point";
import { DateFormats } from "../../../core/dateFormats";
import { getLocalStorage } from "../../../core/localStorageService";
import { ApiResponseProps, PayloadProps } from "../../../core/schema";
import { triggerApi } from "../../../services";
import { RightContainer,  } from "../../../styles/common-styles";

export default function Appointments(props:any) {
  const token = getLocalStorage("token") ? getLocalStorage("token") : "";
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    getRecentActivity()
  }, []);

  const getRecentActivity = () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: "GET",
      apiUrl: apiEndpoint.getAppointments+'/'+props.id.concat("?search=&page=1&perPage=200&sort=asc&column=start_date"),
      headers: {
        Authorization: token,
      },
    };
    triggerApi(apiObject)
      .then((res: ApiResponseProps) => {
        res.data.result = [
          {
              "acuity_appointment_status": "PENDING",
              "client_attendance_status": "NOTATTENDED",
              "_id": "627b97149ba53455ee0c9aba",
              "start_date": "2022-05-02T13:07:28.427Z"
          },
          {
              "acuity_appointment_status": "PENDING",
              "client_attendance_status": "NOTATTENDED",
              "_id": "627ba68e954a1a15bb703625",
              "start_date": "2022-05-11T12:05:33.311Z"
          },
          {
              "acuity_appointment_status": "PENDING",
              "client_attendance_status": "NOTATTENDED",
              "_id": "627ba6bd038a6b16050becc8",
              "start_date": "2022-05-11T12:06:19.901Z"
          }
      ];
        setAppointmentData(res.data.result)
      })
      .catch((err: object) => {
        console.log(err, "Error");
      });
  };
  return (
    // <RightContainer style={{padding: "0px"}}>
				// <div className="inner-container">
					

					<GridHolder className="spinner-container" style={{overflow:'hidden'}}>
						{/* {spinner ? <PiSpinner color='primary' size={50} /> : */}
						<>
								{appointmentData.length > 0 && <PiReactTable
									pages={1}
									selectedIndex={1}
									infinitescroll={true}
									fetchMoreData={() => {}}
									onPageChange={(e: any) => {}}
									tableData={appointmentData}
									hasMore={false}
									onSortClick={(e:object) => {console.log(e)}}
									column={[
										{
											Header: 'Date',
											accessor: 'start_date', 
											width: '100px',
											Cell: (props: any) => {
												return <span >{DateFormats(props.value, 'MMM d YYYY')}</span>
											}
										},
										{
											Header: 'Type',
											accessor: 'acuity_appointment_status',
											width: '100px',
											Cell: (props: any) => {
												return <span >Session 1</span>
											}
										},
										{
											Header: 'Note',
											accessor: 'client_attendance_status', 
											width: '100px',
											Cell: (props: any) => {
												return <PiButton
												appearance="link"
												label="View Notes"
												size="medium"
												onClick={() => console.log()}
											  />
											}
										},
										{
											Header: 'Check-In',
											accessor: '',
											width: '150px',
											Cell: (props: any) => {
												return <span ><PiButton
												appearance="link"
												label="Pre-session Survey"
												size="medium"
												onClick={() => console.log()}
											  />
											 <PiButton
												appearance="link"
												label="Post-session Survey"
												size="medium"
												onClick={() => console.log()}
											  />
											  </span>
											}
										},
                    {
											Header: '',
											accessor: '_id',
											Cell: (props: any) => {
												return <span >
													<PiButton
														appearance="cancel"
														label="Edit Appointment"
														size="large"
														onClick={() => console.log()}
													/>
												</span>
											}
										},
									]}
								/>}
                {appointmentData.length === 0 && <div className="noUser">No appointments scheduled.</div>}
						</>
					</GridHolder>
				// </div>

			// </RightContainer>
  );
}
