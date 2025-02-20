import { PiLeftMenu } from 'pixel-kit'
import React, { useState } from 'react'
import { LeftMenuContainer } from '../../styles/common-styles';
import Icon from '../icon';
import { SideMenuContainer, TableListContainer } from '../secondaryheader/secondaryheader-components'
import { SideMenuList } from '../secondaryheader/secondaryheader-components'
import { useHistory } from 'react-router-dom'
import { SidenavProps } from '../../core/schema';

export default function CustomerLeftMenu() {
    // const [active, setActive] = useState("admin");
    const [headerLinkactive, setHeaderLinkactive] = useState("user");
    let history = useHistory()
    function onItemClick(obj: SidenavProps) {
        setHeaderLinkactive(obj.key)
    }
    return (
        <LeftMenuContainer>
            <TableListContainer>
                {/* <LeftMenuHeader className="text-center headerBorder">
                    <span className="custom-icon"><Icon name="clients" /></span>
                    <PiTypography component="h4">Customer</PiTypography>
                </LeftMenuHeader> */}
                <SideMenuContainer>
                    <SideMenuList className="menu-list">
                        {/* <PiThemeContextProvider value={leftContainer}> */}
                        <PiLeftMenu
                            activeKey={headerLinkactive}
                            onMenuClick={e => onItemClick(e)}
                            options={[
                                // {
                                //     icon: <Icon name="leftMenuIcon" />,
                                //     key: "client",
                                //     label: "Client",
                                //     children: []
                                // },
                                {
                                    icon: <Icon name="leftMenuIcon" />,
                                    key: "customer",
                                    label: "Customer Plans",
                                    children: []
                                },
                                {
                                    icon: <Icon name="leftMenuIcon" />,
                                    key: "customeritems",
                                    label: "Customer Actions Items",
                                    children: []
                                },
                                {
                                    icon: <Icon name="leftMenuIcon" />,
                                    key: "customerupplements",
                                    label: "Customer Supplements",
                                    children: []
                                },
                                {
                                    icon: <Icon name="leftMenuIcon" />,
                                    key: "customervideos",
                                    label: "Customer Videos",
                                    children: []
                                },
                                {
                                    icon: <Icon name="leftMenuIcon" />,
                                    key: "customersettings",
                                    label: "Customer Settings",
                                    children: []
                                },

                            ]

                                // sideList
                                // sidemenuList

                            }
                        />
                        {/* </PiThemeContextProvider> */}
                    </SideMenuList>
                </SideMenuContainer>
            </TableListContainer>
        </LeftMenuContainer>
    )

}
