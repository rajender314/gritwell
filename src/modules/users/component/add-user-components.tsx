import styled from 'styled-components'
import { boldColor, dangerColor, greyColor, primaryColor, whiteColor } from '../../../styles/index'
import { interfont, poppinsfont } from '../../../styles/font-styles'


export const DialogForm = styled.form`
display: flex;
flex-direction: column;
`

export const DialogFormContent = styled.div`
flex: 1;
min-height: 200px;
// max-height: 100%;
max-width: 600px;
display: flex;
// margin: 32px;
padding: 32px;
overflow: auto;
position: relative;
margin-top: 0;
&.col-layout{
  flex-direction: column;
}
&.user-form{
  max-width: 100vw;
  height: 100%;
    max-height: 100%;

}
`
export const RecommendationFormContent = styled.div`
width: 100%;
flex: 1;
padding: 32px;
overflow: auto;
position: relative;
margin-top: 0;
&.col-layout{
  flex-direction: column;
}
`
export const ProfileForm = styled.div`
    // padding: 40px;
    width:100%;
    max-width: 85%;
    margin: 0 auto;
    padding: 32px;
    // overflow-y: auto;
    position: relative;
    @media (max-width: 600px) {
      width:100%;
      max-width: 100%;
    }

`


export const FormInnerContainer = styled.div`
  // width: 40vw;
  // margin-right: 20px;
  // display: flex;
  // flex-direction: column;
  &.w-60{
    // width: 60%;
  }
`
export const UserDataInfo = styled.div`
  width:100%;
  .css-re7y6x{
      font-size: 16px;
      font-family: ${interfont} !important;
      font-weight: 500;
      color: #111A1C !important;

  }
  .css-1igrix4 input{
    border: none;
    border: 1px solid #BBC7CA;
    border-radius: 10px;
    ::placeholder{
      color: ${boldColor};
      font-size: 14px;
    }
}
.css-1mxwzzc{
  background-color: transparent;
}
.css-1mxwzzc::hover{
  background-color: transparent;
}
.css-1mxwzzc  input{
  // border: 1px solid #d0daec;
  // border-radius: 10px;
  // margin: 6px 0 4px 0;
  // font-family: "Inter", sans-serif;
}
.css-1mxwzzc input:focus{
  // border: 1px solid ${primaryColor};
  // background-color: transparent !important;
}
.css-1mxwzzc input:hover{
  // background-color: #F5F7F7 !important;
}
.css-1ae6ett  textarea{
  // border: 1px solid #d0daec;
  // border-radius: 10px;
  // margin: 6px 0 4px 0;
  // font-family: "Inter", sans-serif;
}
.css-1ae6ett textarea:focus{
  // border: 2px solid ${primaryColor}  !important;
  // background-color: transparent !important;
}
.css-1ae6ett textarea:hover{
  // background-color: #F5F7F7 !important;
}
// .css-1bx7l6n-control {
//   background: transparent;
//   border: 2px solid #d0daec !important;
//   // height: 48px;
//   border-radius: 12px;
//   margin: 6px 0 4px 0;
//   font-size: 14px;
  
// }
// .css-11v79b0-control:hover{
//   background-color: #F5F7F7 !important;
//   border-color: ${primaryColor} !important;
//   border-radius: 12px;
// }
// .css-11v79b0-control{
//   background-color: #F5F7F7 !important;
//   border-color: ${primaryColor} !important;
//   border-radius: 12px;
// }
// .css-1bx7l6n-control::focus{
//   border: 2px solid ${primaryColor};
// }
// .css-rij6sy-ValueContainer{
//   font-family: "Inter", sans-serif;
//   padding: 11px 12px 11px 14px!important;
//   line-height: 1;
// }


.css-1igrix4 input:hover{
    background: ${greyColor} !important;
    border: 1px solid #BBC7CA;
    border-radius: 10px;
}
.css-1igrix4 input:focus{
    background: ${greyColor} !important;
    border: 1px solid #BBC7CA;
    border-radius: 10px;
}
.css-s0bv5z{
  background: none;
}
.css-153mtwd .css-1a7rm5r-control{
  border-radius: 10px;
}
.css-153mtwd .css-1a7rm5r-control:focus{
  border:  1px solid #BBC7CA;
}
`
export const FormFlexWrapper = styled.div`
display: flex;
align-items: flex-start;
// margin: 0 -10px 25px 0;
margin-bottom: 6px;
&:not(:last-child){
  // margin-bottom: 20px;
}
.maxW-50{
  max-width: 50%;
  @media screen and (max-width: 900px){
    width: 100%;
  }
}
&.mb-4{
  // margin-bottom: 24px;
}
// .css-1onv3cz,.css-6gaa56{
//   color: ${dangerColor}
// }
.gw-required label{
	&:first-child{
		&:after {
			content: " *";
			color: ${primaryColor};
			font-size: 16px;
		  }
	}
} 
`
export const FormField = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin: 0 10px;
&.one-sibling{
  // width:100%;
}
&.two-siblings{
  width: calc(100%/3 - 20px)
}
&.only-child{
  width: calc(100% - 20px);
}
&.custom-mat-datepicker{
  .MuiFormControl-root{
    width: 100%;
    margin: 0 0 20px !important;
    display: flex;
    flex-direction: column;
  }
  .MuiInputLabel-formControl{
    position: unset !important;
    transform: unset !important;
    display: block !important;
    font-weight: 500 !important;
    color: #838383 !important;
    font-size: 14px !important;
    font-family: 'Saira',sans-serif !important;
    line-height: 1 !important;
    margin-bottom: 8px !important;    
  }
  label + .MuiInput-formControl{
    margin-top: unset !important;
    width: 100%;
    border: 1px solid #DFE1E6 !important;
    padding: 6px 12px !important;
    color: #000000 !important;
    box-sizing: border-box !important;
    border-radius: 3px !important;
    background: #FAFBFC !important;
    font-weight: 400 !important;
    transition: all 0.2s ease-in-out;
    font-size: 14px !important; 
    font-family: 'Saira',sans-serif !important;
    line-height: 1 !important;
    height: 40px !important;
  }
  .MuiInput-underline::after, .MuiInput-underline::before, .MuiInput-underline:hover:not(.Mui-disabled):before{
    display: none !important;
  }
  .MuiIconButton-root{
    padding: 0 !important;
  }
  .MuiPickersDay-daySelected{
  }
}
.css-153mtwd{
    width: 100% !important;
}
.react-tel-input .form-control{
  width: 100%;
  height: 46px;
  border-radius: 10px;
}
.phone{
    font-size: 16px;
    font-weight: 400;
    color: #111A1C !important;
}
.react-tel-input{
 height: 46px;
 border-radius: 10px;
}
.react-tel-input .flag-dropdown {
  border-radius: 10px 0 0 10px;
}
.form-control{
  border: 1px solid #BBC7CA;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
}
label{
    // font-size: 16px;
    // font-family: ${interfont} !important;
    // font-weight: 500;
    // color: #111A1C !important;
    // line-height: 1.5;
}
// label:after {
//   content: " *";
//   color: ${primaryColor};
//   font-size: 16px;
// }
// input{
//   border: 2px solid #d0daec;
//   border-radius: 12px;
//   margin: 6px 0 4px 0;
//   font-family: "Inter",sans-serif;
//   padding: 11px 12px 11px 14px;
// }
// .css-1xpo9qs-multiValue{
//   border: 1px solid ${primaryColor};
//   background: #fff !important;
//   border-radius: 4px;
// }
// .css-13qj0ki{
//   color: ${primaryColor};
// }
// .css-1xpo9qs-multiValue svg {
//   fill: ${primaryColor};
// }
// .custom-multi-select .css-1nkod3n-indicatorContainer .css-1ym3ssn-Icon,.custom-multi-select .css-1bhtqla-indicatorContainer,.custom-multi-select .css-xji0fq-IndicatorsContainer {
//   display: none !important;
// }
// .css-xji0fq-IndicatorsContainer .css-1888n6y-indicatorContainer {
//   display: none !important;
// }
// .css-1888n6y-indicatorContainer{
//   display: none !important;
// }
// .css-1mxwzzc[data-disabled]{
//   background-color: transparent !important;
// }
// .css-1mxwzzc[data-disabled] input{
//   background-color: #fafbfc !important;
// }
`

export const FooterDiv = styled.div`
width:100%;
height:64px;
min-height: 64px;
align-items: center;
// position: absolute;
bottom: 0;
background: #fff;
border-top: 1px solid #E6EDEF;
padding: 0 32px;
display: flex;
// align-items: center;
.buttons-div{
  display: flex;
  align-items: center;
  button:not(:last-child){
    margin-right: 10px;
  }
}
 .mr-3{
   margin-right: 24px;
 }
// .css-1h65th5-ButtonBase{
//   border-radius:4px ;
//   padding: 12px 44px;
//   font-weight: 600;
//   font-family: "Inter", sans-serif;
//   height: unset;  
//   line-height: unset;
//   background-color: ${primaryColor} !important;
// }
// .cancelBtn.css-1h65th5-ButtonBase{
//   background: #E6EDEF !important;
 
// }
// .cancelBtn.css-1h65th5-ButtonBase.css-ktf46p span{
//   color:  #68787A !important;
// }
// .css-z18c5e-ButtonBase:focus{
//     box-shadow: none !important;
//     border-radius: 10px !important;
//     margin-right: 16px !important;
// }
mr-2{
    margin-right: 16px;
}
&.hideFooter{
  transition-property: all;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  max-height: 0;
  height: 0;
  opacity: 0;
  // display: none;
}
&.showFooter{
  overflow-y: hidden;
  max-height: 64px;
  transition-property: all;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  // display: flex;
  align-items: center;
  opacity: 1;
}
`

export const PopupHeader = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 height: 64px;
 padding: 0 32px;
 border-bottom: 1px solid #E6EDEF;
 .d-flex{
  display: flex;
  align-items: center;
 }
  svg{
    // margin-top: 10px;
    margin-right: 16px;
    cursor: pointer;
    // margin-left: 45px;
  }
  h2{
    text-transform: capitalize;
    font-family: ${poppinsfont};
    margin : 0;
    width: 250px;
    font-size: 22px;
    white-space: nowrap;
    font-weight:500;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button{
    background: ${primaryColor} !important;
    color: ${whiteColor} !important;
    margin-right: 12%;
    padding: 6px 12px;
    height: unset;
    font-weight: 600;
    font-family: 'Inter';
    :hover{
      background: ${primaryColor} !important;
    }
  }
  a.resetLink {
    cursor: pointer;
    color:  ${primaryColor} !important;
    font-size: 14px;
    letter-spacing: 0;
    :hover{
      text-decoration: underline;
    }
}

 `
export const FormContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
 .css-1n5qp4j{
  font-size: 22px;
  font-weight: 600;
  color: #000000;
  // margin-top: 28px;
  // margin-bottom: 0;
}
form{
    flex: 1;
    display: flex;
    flex-direction: column;
}
 `
export const ImgUploadDiv = styled.div`
    width: 160px;
    height: 160px;
    background: #F5F7F7;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    border: 0.5px solid #F5F7F7;
    h4{
      margin: 0;
      font-size: 16px;
      color: #68787A;
     font-weight: 500;
    }
    .css-s32gra{
      background: transparent;
      position: absolute;
      width: 160px;
      height: 160px;
      z-index: 99;
    }
    .upload-container{
      top: 0;
      border: 0;
      padding: 0;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      color: #68787A;
      outline: none;
      position: absolute;
      z-index: 999;
      cursor: pointer;
      height: 100%;
      width: 100%;
    }
    .files-list li{
      padding: 6px;
      font-weight: 500;
      font-size: 12px;
      color: #68787A;
      display: none;
    }
`
// export const UserListContainer = styled.div`
// display: flex;
// overflow: hidden;
// flex: 1;
// height: 100%; //added style
// `
// export const RightContainer = styled.div`
//   flex: 1;
//   // display: flex; //new styles
//   padding: 80px 46px;
//   margin: 0 auto;
//   position: relative;
//   // height: 100%;
//   overflow-y: auto;
//    .hVYqzy {
//     /* position: absolute; */
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
// }
// `
