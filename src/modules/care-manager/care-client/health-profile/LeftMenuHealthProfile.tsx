import { useEffect, useState } from "react";

import { Icon } from "../../../../components";
import { HealthProfileLeftContainer } from "../../../../styles/common-styles";

export type Menu = {
  label: string
  key: string
}

const LeftMenuHealthProfile = (props: any) => {
  const [selectedTab, setSelectedTab] = useState(props.selectedTab);
  const menuItems = [
    {
      label: 'Goals',
      key: 'goals'
    },
    {
      label: 'Timeline',
      key: 'timeline'
    },
    {
      label: 'Medications',
      key: 'medications'
    },
    {
      label: 'Supplements',
      key: 'supplements'
    },
    {
      label: 'Hypothesis',
      key: 'hypothesis'
    },
  ];

  useEffect(() => {
    setSelectedTab(props.selectedTab)
  }, [props]);

  const onMenuClick = (menu:Menu) =>{
    setSelectedTab(menu.key);
    props.onTabChange(menu.key);
  }

  return (
    <HealthProfileLeftContainer>
        <div className="HealthProfileMenu" >
        {menuItems && menuItems.map((menu: Menu, index: number) => {
            return <div key={`healthprofile_memu_${index}`} className={selectedTab === menu.key ? 'HealthProfileMenuItem active' : 'HealthProfileMenuItem'} onClick={() => onMenuClick(menu)} >
            <Icon name="menudoticon" /> {menu.label}
          </div>
        })}
        </div>
      </HealthProfileLeftContainer>
  )
};
export default LeftMenuHealthProfile;
