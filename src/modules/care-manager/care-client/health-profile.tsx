import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UrlParams } from "../../../core/schema";
import {
  HealthProfileContainer,
  HealthProfileRightContainer
} from "../../../styles/common-styles";
import Goals from "./health-profile/Goals";
import Hypothesis from "./health-profile/Hypothesis";
import LeftMenuHealthProfile from "./health-profile/LeftMenuHealthProfile";
import Medications from "./health-profile/Medications";
import Supplements from "./health-profile/Supplements";
import TimeLine from "./health-profile/TimeLine";

export default function HealthProfile({...props}) {
  const [selectedTab, setSelectedTab] = useState('goals');
  let urlParams = useParams<UrlParams>();
  useEffect(() =>{
    setSelectedTab('goals')
  }, [])
  return (
    <HealthProfileContainer>
      <LeftMenuHealthProfile selectedTab={selectedTab} onTabChange={(tab:string) => {setSelectedTab(tab)}} />
      <HealthProfileRightContainer>
        {selectedTab === 'goals' && <Goals id={urlParams.id} />}
        {selectedTab === 'timeline' && <TimeLine id={urlParams.id} />}
        {selectedTab === 'medications' && <Medications id={urlParams.id} />}
        {selectedTab === 'supplements' && <Supplements id={urlParams.id} />}
        {selectedTab === 'hypothesis' && <Hypothesis id={urlParams.id} />}
      </HealthProfileRightContainer>
    </HealthProfileContainer>
  );
}
