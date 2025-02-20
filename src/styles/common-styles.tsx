import style from "styled-components";
import {
    primaryColor,
    secondaryColor,
    commonTextColor,
    whiteColor,
    primaryBtnColor,
} from "./colors";
import { poppinsfont } from "./font-styles";

export const MainContainer = style.div`
 

`;

export const LeftMenuContainer = style.div`
    display: flex;
    flex-direction: row;
    width: 30%;
    width: 300px;
    max-width: 300px;
    height: 100%;
    background-color: #F5F7F7;
`;
export const PermissionsBox = style.div`
  flex: 1;
  display: flex;
  flex-direction: column;

.permission-container{
    overflow-y: scroll;
    padding: 16px 16px 0 16px;
    margin: 16px 0;
    max-width: 100vw;
    height: 100%;
    max-height: 100%;
    

    // h5{
    //     color:${commonTextColor};
    //     margin: 24px 0 16px;
    // }
}
.disablePermission{
    padding: 16px 16px 0 16px;
    opacity: 0.7;
    pointer-events: none;

}
// .toggle-button div[role="radiogroup"] label input[type="radio"]:checked+span{
//     background-color : ${secondaryColor}  !important;
// }
// input[type=radio]:checked {
//     --radio-background-color: ${secondaryColor} !important;
//     --radio-border-color: ${secondaryColor} !important;
//     --radio-dot-opacity: 1;
// }

// input[type=radio]:checked:focus{
//     --radio-border-color: ${secondaryColor}  !important;
// }
// input[type=radio]:checked:hover{
//     --radio-background-color: ${secondaryColor}  !important;
//     --radio-border-color: ${secondaryColor}  !important;  
// }
// input[type=radio]:focus {
//     --radio-border-color: ${secondaryColor}  !important;
// }

// .css-1vcvkmv-Checkbox.css-1vcvkmv-Checkbox:focus + svg,
//  .css-1vcvkmv-Checkbox.css-1vcvkmv-Checkbox:checked:focus + svg {
//     --checkbox-border-color: ${secondaryColor} !important;
// }
// input[type=checkbox]{
//     --checkbox-border-color: ${secondaryColor} !important;
// }
// input[type=checkbox]:focus{
//     --checkbox-border-color: ${secondaryColor} !important;
// }
// input[type=checkbox]:checked + svg{
//     --checkbox-background-color: ${secondaryColor} !important;
//     --checkbox-border-color: ${secondaryColor} !important;
//     --checkbox-tick-color: var(--local-tick-checked);
// }
// .css-1vcvkmv-Checkbox:checked + svg{
//     --checkbox-background-color: ${secondaryColor} !important;
//     --checkbox-border-color: ${secondaryColor} !important;
//     --checkbox-tick-color: var(--local-tick-checked);
// }
// .css-ewpks6[data-checked]{
//     background-color: ${secondaryColor} !important;
// }
// .css-1r2a680 label[data-size]:focus-within {
//     border: 2px solid ${secondaryColor} !important;
// }
.permissions-box{
    margin-bottom: 24px !important;
    border: 1px solid #E6EDEF;
    border-radius: 8px;
}
.permission{
    background-color: transparent !important;
    box-sizing: border-box;
    border-radius: 8px;
    border-bottom: 1px solid transparent !important;
  
}



`;
export const LeftMenuHeader = style.div`
    // display: flex;
    // align-items: center;
    // padding: 16px 24px;

    // .custom-icon{
    //     margin-right: 10px !important;
    //     display: flex;
    //     align-items: center;
    // }
    // svg  path {
    //     fill: ${commonTextColor} !important;
    // }
    // svg  g {
    //     fill: ${commonTextColor} !important;
    // }

    // h4{
    // margin: 0;
    // font-weight: 700;
    // font-size: 20px;
    // line-height: 30px;
    // color: ${commonTextColor};
    // }
    // h5{
    //     margin: 3px 0;
    //     font-weight: 500;
    //     font-size: 22px;
    // }
`;
export const FormContainer = style.div`
    // max-width: 85%;
    margin: 0 auto;

&.form-box-container{
    background: #FFFFFF;
    border: 1px solid #E6EDEF;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    max-width: 690px;
    margin: 0 auto;
    box-shadow: 0px 2px 30px rgba(123, 156, 207, 0.2);
}
&.withBg-container{
    position: relative;
    .backdrop {
        position: absolute;
        &.bg1{
            top: 0;
            left: 0;
            @media screen and (max-width: 991px){
                svg{
                    width: 500px;
                }
            }
        }
        &.bg2{
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            @media screen and (max-width: 991px){
                width: 450px;
            }
        }
        &.bg3{
            bottom: 0;
            right: 0;
            @media screen and (max-width: 991px){
                svg{
                    width: 500px;
                }
            }
        }
        &.bg4{
            bottom: 0%;
            right: 0;
            @media screen and (max-width: 991px){
                width: 450px;
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
}
`;
export const ProfileHeader = style.div`
    border-bottom: 1px solid #EEF0F4;
    padding-bottom: 12px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    h2{
        margin: 0;
        font-weight: 600;
        font-size: 22px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: ${commonTextColor};
        font-family: ${poppinsfont};
    }
    svg{
        margin-right: 16px;
        cursor: pointer;
    }
    .dropdownContainer{
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: flex-end;
        .dropdown{
            position: absolute;
            top: 100%;
            left: 0;
            width: 300px;
            z-index: 2;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              li {
                padding: 8px 12px;
              }
              
              li:hover {
                background-color: rgba(0, 0, 0, 0.14);
                cursor: pointer;
              }
        }
    }
`;

export const Comingsoon = style.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
h2{
    color: ${primaryColor};
    font-weight: 600;
}


`;

export const SecondaryHeaderCon = style.div`
padding: 16px 140px;
height: 100%;
overflow: auto;
@media screen and (max-width: 1200px){
    padding: 16px 100px;
}
h5{
    margin: 0;
}
p{
    margin: 0;
}

`;
export const ClientName = style.div`
  cursor:pointer;
  display: flex;
  align-items: center;
//   justify-content: space-between;
  .alphaProfile{
    width:  36px;
    height: 36px;
    border-radius: 50%;
    background: #97CCC0;
    color: ${commonTextColor};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    text-transform: uppercase;
  }
  .clientName{
    font-family:  ${poppinsfont};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;   
    display: flex;
    align-items: center;
    text-transform: capitalize;
    color: ${commonTextColor};
    // display:block;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
`;
export const ClientNamePic = style.div`
cursor: pointer;
.pictureProfile{
    margin-right: 8px;
    &.custom-width58{
        button{
            height: 36px;
            width: 36px;
            svg{
                height: 36px;
                width: 36px;
            }
        }
    }
    button{
        height: 36px;
        width: 36px;
        border: 1px solid #f3f1f1;
        svg{
            height: 36px;
        width: 36px;
        }
    }
}
.clientName{
    font-family:  ${poppinsfont};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;   
    display: flex;
    align-items: center;
    color: ${commonTextColor};
    color: #1B2324 ;
    // display:block;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
  .clientNameGroup{
    overflow: hidden;
    p{
        margin: 0;
        &:first-child{
          font-family: ${poppinsfont};
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.3;
          color: #1B2324;
        }
        font-family: ${poppinsfont};
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #1B2324;
        // display:block;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
    }
  }
  
`;
export const ClientID = style.span`
color: #1B2324;
cursor: pointer;
`;

export const ClientSummaryBlock = style.div`
    background: #FFFFFF;
    border-radius: 8px;
    min-height: 250px;
    padding: 16px 0;
.clientSummary{
    .summaryHeader{
        border-bottom: 1px solid #F5F7F7;
        padding: 12px 0;
        margin-bottom: 24px;
        h5{
            margin: 0;
            font-family: ${poppinsfont};
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 25px;
            align-items: center;
            color: #494F50;
        }
        .statusBadge{
            background: #FFFFFF;
            border: 1px solid #1596B7;
            box-sizing: border-box;
            border-radius: 4px;
            font-family: ${poppinsfont};
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;isplay: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #1596B7;
            padding: 4px;
        }
       
    }
    .summaryDetails{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    &:not(:last-child){
        padding: 0 16px 32px;
        border-bottom: 2px solid #E6EDEF;
        margin-bottom: 16px;
    }
        .linkBtn{
            display: inline-block;
            cursor: pointer;
            margin-bottom: 16px;
            .linkText{
                font-family: ${poppinsfont};
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                display: flex;
                align-items: center;
                color: #278C71;
                text-decoration: none;
                span{
                    margin-left: 6px;
                }
            }
        }
}
`;

export const UserListContainer = style.div`
    display: flex;
    overflow: hidden;
    flex: 1;
    height: 100%; //added style
    `;

export const RightContainer = style.div`
  flex: 1;
  // display: flex; //new styles
  padding: 32px 32px 16px;
  margin: 0 auto;
  position: relative;
  // height: 100%;
  overflow-y: auto;
   .hVYqzy {
    /* position: absolute; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
`;

export const SideDrawerHolder = style.div`
.css-1yf273i .side-drawer{
    height: 95%;
    top: 52px;
}
.agzCT .css-1yf273i .side-drawer{
    padding: 32px;
}
`;
export const ButtonGroup = style.div`
width: 100%;
// margin: 0 10px;
// margin-top: 24px;
// padding: 0 32px;

&.hideFooter{
  transition-property: all;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  max-height: 0;
  height: 0;
  // display: none;
  opacity: 0;
}
&.showFooter{
  overflow-y: hidden;
  // max-height: 72px;
  transition-property: all;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  // display: flex;
  align-items: center;
  vertical-align: top;
  transition: opacity 0.3s;
  -webkit-transition: opacity 0.3s;
  opacity: 1;
}
`;
export const SecondaryHeaderContainer = style.div`
    max-width: 100%;
    .css-15pswuj{
        width: 30%;
        padding: 0px 14px;
    }
    .css-283000 {
        width: 80%;
    }
    display:flex;
//    border-bottom: 2px solid #eaeaea;
//    padding: 8px 24px;
//    margin-top: 16px;
`;
export const GridStatus = style.div`
font-size: 16px;
 color: #1B2324;
 font-size: 16px;
line-height: 24px;
color: #1B2324;
font-family: ${poppinsfont};
display: flex;
align-items: center;
font-weight: 600;
.active{
  color: ${primaryColor}
}
.inactive{
  color: #95A1A2
}
svg{
  margin-right: 10px;
}
`;
export const RightContent = style.div`
display: flex;
align-items: center;
justify-content: space-between;
flex:1;
padding-bottom: 18px;
p{
font-family: ${poppinsfont};
font-weight: 500;
font-size: 24px;
line-height: 36px;
color: #1B2324;
margin: 0;
}
// .css-283000{
//     background-color: #fff !important;
// }
// .css-1mxwzzc{
//     background-color: transparent !important;
// }
// .css-1mxwzzc:hover{
//     background-color: transparent !important;
// }
// .css-1us7xzt{
//     border-bottom: 0.125rem solid #e3eaf6 !important;
//     border: none;
//     background: ${whiteColor};
// }
// .css-1us7xzt::placeholder{
//     color: #6F7381;
//     font-size: 14px;
//     font-family: ${poppinsfont}
//     font-weight: 500;
// }
// .css-1mxwzzc  input{
//     border-color: transparent ;
//     background: #ECF4F6;
//     box-shadow: none;
//     outline: 0;
//     border-radius: 10px;
//     max-width: 95%;
//     min-width: 400px;
//     min-height: 48px;
// }
// .css-1mxwzzc input:focus{
//     border-color: ${primaryColor};
// }


//old//
// .css-1mxwzzc input:hover{
//     background-color: #F5F7F7 !important;
// }
// .css-1ya7m8d .css-1mxwzzc input:hover{
//     background-color: transparent !important;
// }
.css-1mxwzzc input{
    margin: 0;
}
// .Search-svg {
//     position: absolute;
//     left: 12px;
//     top: calc(50% - 0.5em);
//     color: #5c5f73;
// }
// svg{
//     width: 14px;
//     height: 14px;
//     // margin-right: 6px;
//     fill: #6F7381;
// }
// .Cross-svg {
//     position: absolute;
//     right: 15px;
//     top: calc(50% - 0.5em);
//     color: #5c5f73;
//     cursor: pointer;
//     svg{
//         width: 12px;
//         height: 12px;
//         // margin-right: 6px;
//         fill: #6F7381;
//     }
//   }

// .Search-svg {
//     top: calc(50% - 0.5em);
// }
//old end// 

.searchBlock{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;

    @media only screen and (max-width: 900px){
        width: 100%;
    }
}
`;
export const SecondaryBtn = style.div`
// .css-ktf46p{
//     background: ${primaryBtnColor} !important;
//     padding: 5px 16px;
//     height: unset;
//     font-weight: 600;
//     font-size: 14px;
//     display: flex;
// }
// .css-z18c5e-ButtonBase{
//     border-radius:4px ;
//     padding: 6px 24px;
//     height: unset;
//     line-height: unset;
// }
`;

export const ProfileInner = style.div`
    width: 100%;
`;
export const DeleteWrap = style.div`
 position: absolute;
 bottom: 0;
 right: 0;
 background: linear-gradient(360deg, 
    rgba(0, 0, 0, 0.5) 13.1%, rgba(0, 0, 0, 0) 100%);
 border-radius: 4px;
 z-index: 999999;
 width: 28px;
 height: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 width: 100%;
 height: 40px;
 display: none;
 transition: opacity 0.3s;
 -webkit-transition: opacity 0.3s;
 opacity: 0;
span{
margin: 0 8px;
}
`;
export const SpinnerOverlay = style.div`
  // width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  // background: #00000045;
background: white;
position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`;

export const SupplementLink = style.div`
  text-decoration: none;
  color: #51B89C;
`;

export const OverviewContainer = style.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 100%;
`;
export const OverviewRightContainer = style.div`
   min-width: 280px;
   max-width: 280px;
   height: 100%;
   padding-left: 32px;
    .RightColumnHeader{
        display: flex;
        align-items: center;
            h3{
                margin: 0;
                font-size: 20px;
            }
            .ToDoCount{
                background-color: #EEF0F4;
                border: none;
                padding: 6px 16px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 20px;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                color: #1B2324;
                margin-left: 22px;
            }
    }
    .ToDoSubTitle {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.01em;
        color: #666666;
        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 16px 0;
    }
`;

export const OverviewleftContainer = style.div`
   flex: 1;
   padding-right: 32px;
`;

export const GwOverviewCard = style.div`

margin-bottom: 44px;
&:last-child{
    margin-bottom: 0;
}
.GwCardHeader{
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    h3{
        margin: 0px;
        font-size: 20px;
        margin-right: 24px;
    }
}
.clientName{
    font-weight: 500;
    font-size: 14px;
  }
.GwCardBody{
    background: #FFFFFF;
    border: 1px dashed #E0E0E0;
    border-radius: 10px;
    min-height: 160px;
    margin: 24px 0;
    display: flex;
    align-items: center;
    justify-content: center;
        .GwCardBodyContentHolder {
            padding: 24px;
            text-align: center;
            .GwCardContent{
                span{
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 160%;
                    text-align: center;
                    color: #333333;
                    display: block;
                    &:last-child{
                      font-weight: 400 !important;
                      color: #BDBDBD;
                    }
                }
            }
        }
}
`;
export const ToDoCard = style.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgb(37 42 49 / 16%), 0px 1px 4px rgb(37 42 49 / 12%);
    border-radius: 3px;
    min-width: 150px;
    min-height: 200px;
    margin: 20px 0;
    padding: 24px;
    display: flex;
        &:last-child {
            margin-bottom:  0;
        }
    .ToDoCardContent{
        flex: 1;
        .ToDoCardInnerContent{
            .ToDoCardTitle{
                font-weight: 400;
                font-size: 16px;
                line-height: 1.5;
                color: #1B2324;
                display: block;
            }
            .ToDoCardTimeStamp{
                font-style: normal;
                font-weight: 400;
                font-size: 11px;
                line-height: 1.5;
                color: #717171;
            }
        }
    }
`;
export const GwDocumentContainer = style.div`
    width: 100%;
    height: 100%;
`;
export const GwDocumentInnerContainer = style.div`
    display: flex;
    margin: 24px 0;
    .leftDocumentContainer{
        width: 50%;
        padding-right: 16px;
    }
    .rightDocumentContainer{
        width: 50%;
        padding-left:16px;
    }
`;

export const GwDocumentsCardHolder = style.div`

    h5{
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        letter-spacing: 0.01em;
        color: #1B2324;
    }
`;
export const GwDocumentCard = style.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgb(37 42 49 / 16%), 0px 1px 4px rgb(37 42 49 / 12%);
    border-radius: 3px;
    width: 100%;
    max-width: 440px;
    min-height: 72px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin:20px 0;
    &::first-child{
        margin-top: 20px;
    }
    &:active {
            -webkit-transform: scale(0.99);
    -moz-transform: scale(0.99);
    -ms-transform: scale(0.99);
    transform: scale(0.99);
        -webkit-transition-duration: 0s,0s;
        transition-duration: 0s,0s;
    }
    .DocumentTitle {
        display: flex;
        align-items: flex-start;
        flex: 1;
        flex-direction:row;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #1B2324;
        svg{
            margin-right: 12px;
        }
        span{
            font-weight: 400;
            font-size: 12px;
            color: #68787A;
        }
    }

    &.disableDoc{
        filter: grayscale(1);
    //    pointer-events: none;
       cursor: not-allowed;
       background: #a0a0a01c;
    }
`;

export const ExitButton = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background: #F5F7F7;
    border-radius: 17px;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.003em;
    color: #1B2324;
    font-weight: 500;
    cursor: pointer;-webkit-transition: background 0.15s ease-out!important;
    transition: background 0.15s ease-out!important;
    &:hover{
        background: #1B2324;
        color: #F5F7F7;
    }
`;
export const OnboardContainer = style.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
export const OnboardLeftColumn = style.div`
    width: 100%;
    max-width: 50%;
    height: 100%;
    img{
        width: 100%;
        object-fit: cover;
        height: 100%;
    }
`;
export const OnboardrRightColumn = style.div`
    flex: 1;
    padding: 80px;
    
    .RightContentHolder{
        .logoHolder{
            position: relative;
            margin-bottom: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            .top50{
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);                                                    
            }
        }
        .OnboardWrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 327px;
            margin: 0 auto;
                h2{
                    margin: 0;
                    margin-bottom: 46px;
                }
        }
    }
`;

export const OnboardCard = style.div`
    min-width: 327px;
    min-height: 303px;
    background: #FFFFFF;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.11);
    border-radius: 16px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .CardBadge{
        padding: 8px 16px;
        background: #F0F0F0;
        border-radius: 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;        
        color: #067356;
    }
    .AvatarHolder{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 68px;
        height: 68px;
        margin: 20px 0;
        span{
            width: 100%;
            height: 100%;
            max-height: 68px;
            &[class$="-AvatarImage"]{
                svg{
                    width: 68px;
                    height: 68px;
                }
            }
        }
    }
    .CardContent {
        text-align: center;
        p{
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #1B2324;
            margin-top: 0;
            &:last-child{
                color: #717171;
                font-size: 18px;    
                line-height: 26px;                
            }
        }
    }
`;

export const PhasesOfMainContainer = style.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;
export const PhasesOfCareContainer = style.div`
    
    overflow-y: auto;
    height: 100%;
    margin-bottom: 84px;
    .PhasesOfCareContentWrapp{
        max-width: 953px;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        .error{
            color:#e24444!important
        }
        }
    .buttonWrap{
        display: flex;
        justify-content: flex-end;
    }
`;
export const GWCStepper = style.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 16px 0;
`;
export const GWCStepperItem = style.div`
    list-style-type: none;
    display: inline-block;
    margin: 5px 10px;
    min-width: 116px;
    cursor: pointer;
`;
export const GWCStepperTitle = style.div`
    color : #B0B0B0;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    &::after {
        content: "";
        display: block;
        margin: auto;
        height: 3px;
        width: 100%;
        margin-top: 8px;
        transition: all 0.3s;
        background: #B0B0B0;
    }
    &:hover{
        color: #067356;
        &::after {
            width: 100%;
            background: #067356;
        }
    }
    &.active {
        color:  #51B89C;
        font-weight: 500;
        &::after {
            width: 100%;
            color:  #51B89C;
            background: #51B89C;
        }
    }
    &.completed {
        color:  #067356;
        font-weight: 500;
        &::after {
            width: 100%;
            color:  #067356;
            background: #067356;
        }
    }
`;

export const GWCStepperContent = style.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(37, 42, 49, 0.16), 0px 1px 4px rgba(37, 42, 49, 0.12);
    border-radius: 8px;
    max-width: 100%;
    min-height: 250px;
    margin: 32px 0;
    padding: 24px;
    position: relative;
    .StepperContentHeader{
        margin: 32px 0;
        display: flex;
        align-items: center;
        margin-top: 0;
        h4{
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 140%;
            color: #1B2324;
            margin: 0;
            margin-left: 8px;
        }
    }
    .delete-icon{
        cursor:pointer;
    }

    .popup-body{
        min-height:200px;
    }
    .no-data{
        min-height:200px;
        display:flex;
        align-items: center;
        justify-content: center;
        color:#717171;
        font-size: 16px;
    }
    .react-select__control{
        min-height:35px !important;
    }
    .health-plan-grid-input{
        input{
            height:40px !important;
        }
    }
`;
export const StepperContentBody = style.div`
`
export const PreviewTabContainer = style.div`
    max-width: 100%;
    min-height: 250px;
    margin: 0;
    padding: 24px;
    .preview-header{
        display:flex;
        align-items:center;
        flex-direction: row;
        padding: 10px;
        h2{
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 20px;
            color: #1B2324;
            margin-left: 13px;
        }

    }
`
export const FooterAction = style.div`
    background: #FFFFFF;    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14), 0px -2px 12px 2px rgba(0, 0, 0, 0.08);
    min-height: 84px;
    width: 100%;    
    position: fixed;
    bottom: 0;
    left:0;
    .FooterActionWidth{
        max-width: 953px;
        width: 100%;
        margin: 0 auto;
        padding: 0 0;
    }
    .BackBlock{
        cursor: pointer;
    }
`;

export const PhaseCard = style.div`
    border-bottom: 1px solid #E0E0E0;
    margin-bottom: 32px;
    &:last-child{
        margin-bottom: 24px;
    }
    .SelectBlock{
        // min-width: 200px;
        margin: 0 16px;
        width:150px;
        .react-select__control{
            min-height:35px !important;
        }
    }
    .PhaseCardHeader{
        h5{
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 160%;
            color: #1B2324;
            margin: 0;
        }
    }
    .PhaseCardBody{
        // padding-bottom: 24px;
        p{
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 160%;
            color: #717171;
            margin: 0;
        }
    }
    .editabel-text{
        padding: 6px 5px 0px 5px;;
        color: #717171;
        width:100%;
        border: 1px solid transparent !important;
        font-family:  ${poppinsfont};
        font-size:16px;
        &:focus {
            border: 1px solid #0A0D0D !important;
        }
        &:focus-visible {
            border: 1px solid transparent !important;
            outline: none;
        }

    }
    .editabel-text:focus{
        border: 1px solid #0A0D0D !important;
    }
    .before-edit{
        padding: 4px;
        min-height:25px;
    }
    .after-edit{
        .editable-text{
            padding: 4px;
            min-height:60px;
            transition: visibility 0s, opacity 0.5s linear;
        }
    }
`;
export const HealthProfileContainer = style.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 100%;
`;
export const HealthProfileLeftContainer = style.div`
    min-width: 280px;
   max-width: 280px;
   width: 30%;
   height: 100%;
   padding-right: 32px;

   .HealthProfileMenu{
        display: flex;
        flex-direction: column;
        align-items: flex-start;

       .HealthProfileMenuItem{

        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: #1B2324;
        margin-bottom: 16px;
        display: inline-block;
        cursor: pointer;
        display: flex;
        align-items: center;
        svg{
            margin-right: 12px;
            width: 16px;
            height: 16px;
        } 
        &.active{
            color:  #067356;
            svg{
                path{
                    fill: #067356;
                }
            } 
        }       
       }
   }
`;
export const HealthProfileRightContainerBorder = style.div`
    min-height: 250px;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(37, 42, 49, 0.16), 0px 1px 4px rgba(37, 42, 49, 0.12);
        border-radius: 8px;
    padding: 40px;
    position: relative;
`
export const HealthProfileRightContainer = style.div`
    flex: 1;
    padding-left: 0;
    width: 100%;
    min-height: 250px;
    // background: #FFFFFF;
    // box-shadow: 0px 0px 2px rgba(37, 42, 49, 0.16), 0px 1px 4px rgba(37, 42, 49, 0.12);
        .HealthProfileContentTitle{
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            h3{
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 20px;
                color: #1B2324;
                margin: 0;
                margin-left: 8px;
            }
        }
        .HealthProfileContentEditor{
            .HealthProfileTitle{
                font-style: normal;
                font-weight: 500;
                font-size: 20px;
                line-height: 160%;
                color: #1B2324;
                margin-bottom: 20px;
            }
            .ql-editor{
                min-height:200px;
            }
        }
`;
export const HealthProfileEditorContainer = style.div`
        margin: 32px 0;
        .note-text{
            font-weight: 400;
            font-size: 14px;
            color: #B0B0B0;
        }
`;
export const NoSuggestionsCardTitle = style.div`
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #1B2324;
margin: 0;
margin-bottom: 20px;
&.ColorCara{
    color: #E09B07;
}
`
export const GwcNoSuggestionsCard = style.div`
margin-top: 32px;
 &:first-child{
     margin-top: 0;
 }
.NoSuggestionsCardTitle{
    h5{
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #1B2324;
        margin: 0;
        margin-bottom: 20px;
    }
}
.NoSuggestionsCardBody{
    min-height: 76px;
    background: #FFFFFF;
    border: 1px dashed #E0E0E0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        p{
            margin: 0;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
            color: #333333; 
            &:last-child{
                font-weight: 400;
                color: #b5b5b5;
            }
        }
    }
   .text-limit{
        display:flex;
        align-items:center;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #BDBDBD;
        justify-content: flex-end;
        position: relative;
        top: -45px;
        right: 24px;
   } 
`;

export const HealthPlanNutritionSelect = style.div`
    background: #FFFFFF;
    border: 1px solid #E6EDEF;
    border-radius: 6px;
    padding: 16px;
    margin-top:16px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content:flex-start;

    .content{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content:flex-start;
        flex: 1;

        .headerInfo{
            display: flex;
            width: 100%;

            .extraInfo{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 1;
                padding: 0 16px;
                span{
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 21px;
                    display: flex;
                    align-items: center;
                    color: #717171;
                }
            }
        }
        .footerInfo{
                display: flex;
                gap: 16px;
            span{
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;
                display: flex;
                align-items: center;
                color: #484848;
            }
            button{
                span{
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 18px;
                    color: #278c71;
                }
            }
        }
    }
    .name{
        padding:0px;
        margin:0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        color: #252A31;
    }
    .description{
        padding:0px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #717171;
        margin: 4px 0;
    }
`;

export const GridEditDetails = style.div`
        // display: flex;
        // flex-direction: column;
        // align-items: center;
    .content{
        display:flex;
        flex-direction: column;
        .headerInfo{
            // display: flex;
            // flex-direction: column;
            .extraInfo{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                gap: 16px;
                span{
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 21px;
                    display: flex;
                    align-items: center;
                    color: #717171;
                }
            }
        }
        .footerInfo{
                display: flex;
                gap: 16px;
            span{
                font-weight: 400;
                font-size: 12px;
                line-height: 18px;
                display: flex;
                align-items: center;
                color: #484848;
            }
            button{
                span{
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 18px;
                    color: #278c71;
                }
            }
        }
    }
`;

export const CustomGWDataTable = style.div`
`
export const GWDataTableRow = style.div`
    display: flex;
    gap: 8px;
    margin: 16px 0;
`
export const GWDataTableCell = style.div`
    background: #F8FAFC;
    border: 1px solid #F8FAFC;
    border-radius: 3px;
    min-height: 48px;
    padding: 0 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #333333;
    &.disabled{
        background: #E8E8E8;
      }
    &.BGTrans{
        background: #FFFFFF;
        border: none;
    }
    span{
        display: flex;
        margin-right: 24px;
        &:last-child{
            margin-right: 0;
        }
        &.pointer{
            cursor: pointer;
        }
    }
    &.activeStatus{
        min-width: 110px;
        weight: 400;
        size: 14px;
        line height: 20px;
    }
`
export const ModalTitle = style.div `
    font-size: 16px;
    font-weight: 500;
    // display: flex;
    position: relative;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .closeBlock{
        cursor: pointer;
    }
}
`
export const ModalBodyContainer = style.div `
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        display: flex;
        align-items: center;
        color: #1B2324;
`
export const ModalFooterContainer = style.div`
`