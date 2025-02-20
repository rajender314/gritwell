import React, { useEffect, useState } from "react";
import {
  GWCStepper,
  GWCStepperItem,
  GWCStepperTitle
} from "../../../styles/common-styles";
import { useHistory } from 'react-router';

export type Menu = {
  label: string
  key: string
}

const HealthPlanHeaderMenu = (props: any) => {
  let history = useHistory();
  const [selectedTab, setSelectedTab] = useState(props.selectedTab);
  const menuItems = [
    {
      label: 'Phases of Care',
      key: 'phases'
    },
    {
      label: 'Nutrition',
      key: 'nutrition'
    },
    {
      label: 'Testing',
      key: 'testing'
    },
    {
      label: 'Supplement',
      key: 'supplement'
    },
    {
      label: 'Lifestyle',
      key: 'lifestyle'
    },
    {
      label: 'Message',
      key: 'message'
    },
    // {
    //   label: 'Preview',
    //   key: 'preview'
    // },
  ];

  useEffect(() => {
    setSelectedTab(props.selectedTab)
  }, [props]);

  const onMenuClick = (menu:Menu) =>{
    setSelectedTab(menu.key);
    // props.onTabChange(menu);
    history.replace("/office/health-plan/"+props.urlParams.health_plan_id+"/"+props.urlParams.id+"/"+ menu.key)
  }

  return (
    <GWCStepper className="gwc-stepper">
      {menuItems && menuItems.map((menu: Menu, index: number) => {

        return <GWCStepperItem key={`healthplan_memu_${index}`} className="gwc-stepper__item" onClick={() => onMenuClick(menu)}>
          <GWCStepperTitle className={selectedTab === menu.key ? 'gwc-stepper__title completed' : 'gwc-stepper__title'}>
            {menu.label}
          </GWCStepperTitle>
        </GWCStepperItem>
      })}
    </GWCStepper>
  );
};
export default HealthPlanHeaderMenu;
