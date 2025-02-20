import { whiteColor } from '../../styles/colors'
import styled from 'styled-components'

export const ModelBackDrop = styled.div`
    z-index: 1200;
    position: fixed;  
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .15s linear;
`
export const ModelDialogInner = styled.div`
  background-color: #fff;
  border-radius: 8px;
  min-width: 600px;
  max-width: 70vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
height: 60px;
line-height: 60px;
padding: 0 20px;
display: flex;
align-items: center;
`

export const ModalTitle = styled.div`
flex: 1;
display: flex;
align-items: center;
margin-right: 10px;
h2{
  line-height: 1;
  font-size: 16px;
  font-weight: 600;
}
`

export const ModalHeaderActions = styled.div`
display: flex;
align-items: center;
&.no-close-icon{
  display: none;
}
`

export const ModalContent = styled.div`
min-height: 150px;
max-height: 70vh;
overflow: auto;
display: flex;
flex-direction: column;
`

export const ModalContentContainer = styled.div`
padding: 20px;
height: 100%;
display: flex;  
flex-direction: column;
position: relative;
&.confirmation-box{
  height: 150px;
}
&.success-dialog{
  max-width: 50vw;
  align-items: center;
}
`

export const IconDiv = styled.div`
  width:14px;
  height:14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const FooterDiv = styled.div`
background: #EFF2F5;
width:100%;
height:60px;
display:flex;
justify-content:space-between;
align-items:center;
padding: 0 20px;
.buttons-div{
  display: flex;
  align-items: center;
  button:not(:last-child){
    margin-right: 10px;
  }
}
`

export const SelectContainer = styled.div`
display: flex;
flex-direction: column;
label{
  font-size: 14px;
  color: rgba(131,131,131,0.76);
  margin: 0 0 8px;
}
&.disabled{
  pointer-events: none;
  cursor: not-allowed;
}
`

export const LoadingMsgContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;
  color: #8490a9;
  transform: translate(-50%, -50%);
  .loading-msg{
    font-size: 16px;
    margin: 10px 0;
    &.white-text{
      color: ${whiteColor}
    }
  }
`

export const Message = styled.p`
font-size: 16px;
text-align: center;
margin: 0;
`