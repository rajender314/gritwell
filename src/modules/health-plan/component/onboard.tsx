import React, { useEffect, useState } from 'react'
import { OnboardContainer, OnboardLeftColumn, OnboardrRightColumn, OnboardCard, ExitButton } from '../../../styles/common-styles'
import heroBG from "../../../../src/assets/heroBg.png";
import { Icon } from "../../../components/index";
import { PiAvatar, PiButton, PiTypography } from 'pixel-kit';
import { useHistory } from 'react-router';
import { useParams } from "react-router";
import { ApiResponseProps, PayloadProps, UrlParams } from '../../../core/schema';
import apiEndpoint from '../../../core/apiend_point';
import { triggerApi } from '../../../services';
import { getLocalStorage } from '../../../core/localStorageService';

const Onboard = (props:any) => {
    const [startRecommendation, setStartRecommendation] = useState(false);
    let urlParams = useParams<UrlParams>();
    const token = getLocalStorage("token") ? getLocalStorage("token") : "";
    let history = useHistory();
    const [data, setData] = useState();

    useEffect(() => {
        if(props.startRecomendation && props.startRecomendation === true ){
            setStartRecommendation(true);
        }
        getOnBoardDetails();
    }, [urlParams, props]);

    const onStartClick = () => {
        // if(startRecommendation === false){
        //     history.push("/office/health-plan/"+urlParams.id+"/"+"phases");
        // }else{
        //     setStartRecommendation(true);
        //     history.push("/office/health-plan/"+urlParams.id+"/"+"phases");
        // }
        createHealthPlan();
    }

    const createHealthPlan = () => {
        const apiObject: PayloadProps = {
          payload: {
            client_id:urlParams.id
          },
          method: "POST",
          apiUrl: apiEndpoint.createHealthPlan,
          headers: {
            Authorization: token,
          },
        };
        triggerApi(apiObject)
          .then((res: ApiResponseProps) => {
            console.log(res.data)
            if(startRecommendation === false){
                history.push("/office/health-plan/"+res.data._id+"/"+urlParams.id+"/"+"phases");
            }else{
                setStartRecommendation(true);
                history.push("/office/health-plan/"+res.data._id+"/"+urlParams.id+"/"+"phases");
            }
          })
          .catch((err: object) => {
            console.log(err, "Error");
          });
      };

    const getOnBoardDetails = () => {
        const apiObject: PayloadProps = {
          payload: {},
          method: "GET",
          apiUrl: apiEndpoint.healthPlanPhases + urlParams.id,
          headers: {
            Authorization: token,
          },
        };
        triggerApi(apiObject)
          .then((res: ApiResponseProps) => {
            console.log(res.data)
            setData(res.data.data)
          })
          .catch((err: object) => {
            console.log(err, "Error");
          });
      };

    return (
    <OnboardContainer>
        <OnboardLeftColumn>
        <img src={heroBG} alt="heroBg" />
        </OnboardLeftColumn>

        <OnboardrRightColumn>
        <div className="RightContentHolder">
        <div className='logoHolder text-center' ><Icon name='gritwell' />
            <ExitButton className="exitButton top50" onClick={()=>history.push("/office/client/"+urlParams.id)}>Exit</ExitButton>
        </div>
        <div className="OnboardWrapper">
        {startRecommendation === false ? <PiTypography component="h2">
                Create health plan
                </PiTypography>
            :
                <PiTypography component="h2">
                Create recommendation 
                </PiTypography>
            }
            <OnboardCard>
                <div className="CardBadge">First appointment</div>
                <div className="AvatarHolder"><PiAvatar /></div>
                <div className="CardContent">
                    <p>Alex Martin</p>
                    <p>Mar 23, 2022 14:00-14:45 PM</p>
                </div>

            </OnboardCard>
            <PiButton
                appearance='primary'
                label= 'Start'
                shouldFitContainer
                size= 'extraLarge'
                className='mt-4'
                onClick={onStartClick}
            />

        </div>
        </div>

        </OnboardrRightColumn>

         </OnboardContainer>
         )
}
export default Onboard