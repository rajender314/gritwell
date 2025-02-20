import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  PhasesOfMainContainer,
  PhasesOfCareContainer,
  ExitButton,
} from "../../../styles/common-styles";
import HealthPlanHeaderMenu from "./HealthPlanHeaderMenu";
import LifeStyle from "./LifeStyle";
import Message from "./Message";
import Nutrition from "./Nutrition";
import PhasesOfCare from "./PhasesOfCare";
import Preview from "./Preview";
import Supplement from "./Supplement";
import Testing from "./Testing";

import { useHistory } from 'react-router';

export type Tab = {
  id:string
  tab: string
  health_plan_id:string
}

const HealthPlan = (props: any) => {
  const [selectedTab, setSelectedTab] = useState('');
  const [saveAndExit, setSaveAndExit] = useState(false);
  let urlParams = useParams<Tab>();
  let history = useHistory();
  useEffect(() => {
    setSelectedTab(urlParams.tab)
  }, [urlParams, selectedTab]);

  const onBackClick = (tab:string) =>{
    history.push('/office/health-plan/'+urlParams.health_plan_id+'/'+urlParams.id+'/'+tab) 
  }
  return (
    <PhasesOfMainContainer>
      <PhasesOfCareContainer>
        <div className="PhasesOfCareContentWrapp">
          <div className="buttonWrap">
            {/* <ExitButton onClick={()=>setSaveAndExit(true)}>Save and exit</ExitButton> */}
          </div>
          {selectedTab && <HealthPlanHeaderMenu
            selectedTab={selectedTab}
            urlParams={urlParams}
          // onTabChange={(menu: any) => {setSelectedTab(menu.key)}}
          />}
          {selectedTab === 'phases' && <PhasesOfCare setSaveAndExit={saveAndExit} setTabChange={() => { 
            // onBackClick('')
            history.push('/office/client/'+urlParams.id) 
            }} />}
          {selectedTab === 'nutrition' && <Nutrition setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }}
          />}
          {selectedTab === 'testing' && <Testing setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }}
          />}
          {selectedTab === 'supplement' && <Supplement  setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }} />}
          {selectedTab === 'lifestyle' && <LifeStyle  setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }} />}
          {selectedTab === 'message' && <Message  setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }} />}
          {selectedTab === 'preview' && <Preview  setTabChange={(tab: string) => {
            setSaveAndExit(false)
            setSelectedTab(tab);
            onBackClick(tab)
          }} />}

        </div>
      </PhasesOfCareContainer>


    </PhasesOfMainContainer>
  );
};
export default HealthPlan;
