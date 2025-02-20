import style from 'styled-components'
import { poppinsfont, primaryBtnColor, whiteColor } from '../../styles'


export const GridHolder = style.div`
height: 100%;
flex: 1;
overflow: hidden;
.ag-theme-alpine .ag-root-wrapper{
border: none;
}
.ag-header-viewport {
    display: none;
}
.ag-side-buttons{
   display: none;
}
.ag-theme-alpine{
    height: 100% !important;
}
.ag-theme-alpine .ag-rtl .ag-side-bar-left, .ag-theme-alpine .ag-ltr .ag-side-bar-right{
    border: none;
}
.ag-theme-alpine .ag-header{
 border: none ;
 background: #fff;
}
.ag-theme-alpine .ag-row{
    border: none; 
}
ag-center-cols-container{
    height: 100vh !important;    
}
.ag-body-viewport.ag-layout-normal {
    // overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}


// .faVosM .ag-theme-alpine .ag-row {
//     box-shadow: 0px 0px 15px rgb(136 152 170 / 15%) !important ;
//     backgrounf: red;
// }
.ag-theme-alpine .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected){
border: none;

}
.ag-theme-alpine .ag-ltr .ag-cell {
//   height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
//   justify-content: center;
}
.ag-row{
    border-bottom: 6px solid white !important;
    border-radius: 10px;
    background: #f5f7f7;
    
}
.firstName{
    margin: 0;
    line-height: 1;
    text-transform: capitalize;
    font-family: ${poppinsfont};
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #1B2324;
}
.email{
    margin: 0;
     height: 20px;
     font-size: 16px;
     color: #68787A;
     text-transform: lowercase
     font-size: 16px;
    line-height: 24px;
    color: #68787A;
    font-family: Inter;
}
button span{
    // display: flex;
    // align-items: center;
    // justify-content: center;
}
.css-1p2626p-InnerPagination{
    margin-top: 24px;
    padding-bottom: 16px;
    .css-8bqj7o-ButtonBase{
        background: ${primaryBtnColor} !important;
    }
}
.CustomAvatar button{
    margin: 0 !important;
    width: 54px;
    height: 54px;
}
.CustomAvatar button:focus {
    outline: none !important;
    box-shadow: unset !important;
}
.CustomAvatar button:active {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
}
.CustomAvatar > div{
    display: flex;
    align-items: center;
    justify-content: center;
}
.noUser{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

`

export const NoUserSpan = style.div`
height: 54px;
width: 54px;
-webkit-align-items: stretch;
-webkit-box-align: stretch;
-ms-flex-align: stretch;
align-items: stretch;
background-color: var(--ds-background-overlay,#FFFFFF);
border-radius: 50%;
box-sizing: content-box;
cursor: inherit;
display: -webkit-box;
display: flex;
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
outline: none;
overflow: hidden;
position: static;
transform: translateZ(0);
transition: transform 200ms,opacity 200ms;
box-shadow: 0 0 0 2px var(--ds-background-overlay,#FFFFFF);
border: none;
margin: 2px;
padding: 0;
font-size: inherit;
font-family: inherit;
margin-right: 20px;
`
export const RoleDiv = style.div`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #1B2324;
    font-family: 'Inter';
    margin-left: 20%;

`

export const InnerSpan = style.span`
display: block;
width: 100%;
height: 100%;
background-color: #B6C1D6;
`
export const IconSpan = style.span`
display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
flex-shrink: 0;
line-height: 1;
--icon-primary-color: var(--ds-text-onBold, var(--ds-background-default, #FFFFFF));
    --icon-secondary-color: var(--ds-text-lowEmphasis, #8993A4);
    svg  path {
        fill: ${whiteColor} !important;
    }
    svg  g {
        fill: ${whiteColor} !important;
    }
    svg{
        width: 52px;
        height: 52px;
    }
`
