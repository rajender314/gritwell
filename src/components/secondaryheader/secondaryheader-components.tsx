import style from "styled-components";
import { primaryColor, whiteColor, secondaryColor } from '../../styles/colors'


export const LeftContent = style.div`
   width:300px;
   display: flex;
   align-items: center;
   .css-15pswuj{
    font-size: 22px;
    color: #111A1C;
    font-weight: 600;
   }
`
export const SearchDiv = style.div`
  width:42%;                                                                                                                                        
`
export const IconDiv = style.div`
`

export const TableListContainer = style.div`
  display: flex;
  width: 100%;
  flex-direction: column; 
  background: #F5F7F7;
  .css-15pswuj{
    font-size: 22px;
    color: #111A1C;
    font-weight: 600;
                                                                                                                                                                                                                                                                                                        }
   .headerBorder{
    border-bottom: 1px solid #BBC7CA;
   }
   .css-gtsbif .menu-option {
       margin-top: 16px;
   }
   .css-gtsbif .menu-option .menu-item-single{
       background: #F5F7F7;
       padding: 14px 16px;
       color: #1B2324;
       font-size: 16px;
       font-weight: 400;
    //    margin: 0 7px;
   }
    .css-gtsbif .menu-option .menu-item-single:hover{
       background: ${secondaryColor};
       color: ${whiteColor};
       border-radius: 6px;
    //    margin: 0 7px;
   }
   .css-gtsbif .menu-option .menu-item-single:hover{
    background: ${secondaryColor};
    color: ${whiteColor};
    border-radius: 6px;
 //    margin: 0 7px;
}
.css-gtsbif .menu-option .menu-item-single.active{
    background: ${primaryColor};
    color: ${whiteColor};
    border-radius: 6px;
 //    margin: 0 7px;
}
   .css-gtsbif .menu-option .menu-item-single .custom-icon{
       margin-right: 10px;
   }

   .css-keezun {
     padding: 0;   
   }
`;

export const RoleTableListContainer = style.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #ECF4F7;
  .css-15pswuj{
    font-size: 22px;
    color: #111A1C;
    font-weight: 600;
                                                                                                                                                                                                                                                                                                        }
   .headerBorder{
    border-bottom: 1px solid #BBC7CA;
   }
   .css-gtsbif{
    background: transparent;
   }
   .css-gtsbif .menu-option {
       margin-top: 24px;
   }
   .css-gtsbif .menu-option .menu-item-single{
        background: transparent;
       padding: 14px 16px;
       color: #1B2324;
       font-size: 16px;
       font-weight: 400;
    //    margin: 0 7px;
   }
    .css-gtsbif .menu-option .menu-item-single:hover{
       background: ${secondaryColor};
       color: ${whiteColor};
       border-radius:6px;
    //    margin: 0 7px;
   }
   .css-gtsbif .menu-option .menu-item-single:hover{
    background: ${secondaryColor};
    color: ${whiteColor};
    border-radius:6px;
 //    margin: 0 7px;
}
.css-gtsbif .menu-option .menu-item-single.active{
    background: ${primaryColor};
    color: ${whiteColor};
    border-radius:6px;
 //    margin: 0 7px;
}
   .css-gtsbif .menu-option .menu-item-single .custom-icon{
       margin-right: 10px;
   }
   .css-1ya7m8d .css-1mxwzzc input:hover{
    background-color: #ECF4F7 !important;
    border: none;
}
.css-1ya7m8d input{
    margin: 0;
    background: #ECF4F7;
}

`;

export const SideMenuContainer = style.div`
padding: 14px 14px;
height: 100%;
overflow-y: auto;
.css-gtsbif .menu-option .menu-item-single:hover{
    svg path {
        fill: ${whiteColor};
    }
    color: ${whiteColor};
}
.css-gtsbif .menu-option .menu-item-single.active{
    svg path {
        fill: ${whiteColor};
    }
    color: ${whiteColor};
}
`;

export const SideMenuList = style.div`
    .active_item {
        color: blue
    }
}
`;
export const TableContainer = style.div`
  width: 84%;
`;

// export const SideDrawerHolder = style.div`
// .css-1yf273i .side-drawer{
//     height: 95%;
//     top: 52px;
// }
// .agzCT .css-1yf273i .side-drawer{
//     padding: 32px;
// }
// `
