import {
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiModalTitle,
  PiButton,
  PiModalHeader,
} from "pixel-kit";
import { Icon } from "../../../../components";
import {
  ModalTitle,
  ModalBodyContainer,
  ModalFooterContainer
} from "../../../../styles/common-styles";

const ConfirmBox = (props: any) => {
  return (
    <>
      <PiModal isOpen={props.is_open} onClose={props.onModalClose} width={props.width}>
        <PiModalHeader>
          <ModalTitle>
                  {/* {props.action}  */}
                  <span onClick={props.onModalClose} className="closeBlock"><Icon name="modalcloseicon" /></span>
          </ModalTitle>
        </PiModalHeader>
        <PiModalBody>
          <ModalBodyContainer className="d-flex align-items-center gap-2">
            <span>
              <Icon name="modalwarningicon" />
            </span>
            {props.message}
          </ModalBodyContainer>
        </PiModalBody>
        <PiModalFooter>
          <ModalFooterContainer className="d-flex justify-content-between align-items-center flex1 gap-2">
            <PiButton
              appearance="link"
              label="Cancel"
              onClick={props.onModalClose}
              
            />
            <PiButton
              appearance="primary"
              label="Continue"
              onClick={() => props.onConfirm(props.data, props.type)}
              autoFocus
              
            /></ModalFooterContainer>
        </PiModalFooter>
      </PiModal>
    </>
  );
};

export default ConfirmBox;
