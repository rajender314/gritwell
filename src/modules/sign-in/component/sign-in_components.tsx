import style from 'styled-components'
import { primaryColor, secondaryColor, whiteColor, boldColor, greyColor, dangerColor, poppinsfont } from '../../../styles/index'

export const LoginWrapper = style.div`
flex: 1;
width: 100%;
background: ${whiteColor};
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-webkit-justify-content: center;
-ms-flex-pack: center;
justify-content: center;
z-index: 999;
 `

export const LoginContentWrapper = style.div`
min-width: 400px;
max-width: 400px;
background-color: ${whiteColor};
border-radius: 12px;
padding: 48px 24px;
box-shadow: 0px 0px 32px rgba(136, 152, 170, 0.15);
overflow: hidden;
position: relative;
z-index: 999;
@media screen and (max-width: 600px){
    width: 100%;
    min-width: 250px;
    overflow-x: hidden;
    // margin: 16px;
}
.logoHolder{
    margin-bottom: 18px;
}

.css-s0bv5z{
    border-radius: 10px;
    background: none;
}

.css-re7y6x{
    color: ${boldColor};
    font-family: ${poppinsfont};
    font-size: 16px;
    font-weight: 500;
}

.css-1us7xzt{
    border-radius: 10px;
    background-color: ${greyColor};
}

.css-956okt{
    color: ${secondaryColor};
}
p{
    font-size: 16px;
    line-height: 24px;
    color: #1B2324 !important;
}

.css-z18c5e-ButtonBase{
  width:100%;
}
// .css-ktf46p{
//     background: ${primaryColor} !important;
//     border-radius: 10px;
// }

//   input wrapping div

.css-1mxwzzc,.css-1bx7l6n-control{
    background-color: transparent !important;
}
.css-1mxwzzc:hover{
    background-color: transparent !important;
}
// .css-1m8y81g input{
//     border: 2px solid #d0daec;
//     // background: #EEF0F4;
// border-radius: 12px;
// margin: 6px 0 4px 0;
// }
// .css-1m8y81g input:hover{
//     background-color: #F5F7F7 !important;
//    // border: none;
// }
// .css-1m8y81g input:focus{
//     // background: ${greyColor} !important;
//     border: 2px solid ${primaryColor};
// }
css-1bx7l6n-control {
    background: transparent;
    border: 1px solid #d0daec !important;
}
.formContainer{
    margin-top: 24px;
}

`
export const LoginTitle = style.div`
  color: ${boldColor};
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  padding: 0px 0px 10px 0px;
  text-align: center;
//   border-bottom: 1px solid ${greyColor};
  padding-bottom: 12px;
  font-family: ${poppinsfont};
`
export const ForgotCancel = style.div`
// .css-ktf46p{
//     background: #E6EDEF !important;
//     border-radius: 4px;
//     // border: 1px solid ${primaryColor};
//     width: 100%;
//     height: auto;
//     // padding: 14px;
//     padding: 10px 44px;
//     font-weight: 600;
//     font-size: 16px;
//     line-height: 24px;
//     font-family: ${poppinsfont};

//     span{
//         // color: #68787A !important;
//     }
    
// }
`
export const LoginContent = style.div`
 .css-956okt{
     cursor:pointer;
     font-weight: 600;
 }
 .forgot-text{
    cursor:pointer;
    font-weight: 500;
    color: ${secondaryColor};
    font-size: 13px;
    
 }
 .icon-styles{
    position: absolute;
    right: 21px;
    top: 42px;
    cursor: pointer;
 }
//  .css-13pz9xx{
//      color: ${boldColor};
//      font-weight: 500;
//      font-size: 16px;

//  }
// .css-1mjh81d {
//     width: 100%;
//     margin: 24px 0;
// }

 
 .list{
     padding: 0;
     list-style: none;
 }
 .list li svg{
     margin-right: 8px;
 }
 .li-con{
     display: flex;
     
 }
 .fill{
    svg path{
        fill: #278C71;
    }
 }
//  .css-1onv3cz,.css-6gaa56{
//     color: ${dangerColor}
//  }
 .text-styles{
    color: #111A1C;
    font-weight: normal;
    font-size: 12px;
    // margin-top: 4px;
 }
 
 .para{
    color: #111A1C;
    font-weight: 500;
    font-size: 16px;
    font-style: normal;
 }
 
 .css-ktf46p{
     width: 100%;
    background: ${primaryColor} !important;
    border-radius: 4px;
    height: auto;
    // padding: 14px;
    padding: 10px 44px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    font-family: ${poppinsfont};
}

`

export const LogoContainer = style.div`
margin-bottom: 32px;
`

export const SectionHolder = style.div`
width: 100%;
margin: 6px 25%;
max-width: 424px;
`

export const ExpiredPasswordSection = style.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`