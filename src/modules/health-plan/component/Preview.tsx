import {
  PiAccordian,
  PiAccordianHeader,
  PiAccordianItem,
  PiAccordianPanel,
  PiButton,
  PiTextArea,
  PiTypography,
} from "pixel-kit";
import { Icon } from "../../../components";
import {
  GwcNoSuggestionsCard,
  GWCStepperContent,
  NoSuggestionsCardTitle,
  StepperContentBody,
  PreviewTabContainer
} from "../../../styles/common-styles";

const Preview = (props:any) => {
  
  return (
    <PreviewTabContainer>
      <PiAccordian allowMultipleExpanded allowZeroExpanded onChange={() => {}}>
        <PiAccordianItem>
          <PiAccordianHeader className="preview-header">
          <Icon name="flagicon" />
            <h2>Phases of Care</h2>
            <PiButton
              appearance="link"
              label="Edit"
              className="ml-2"
              onClick={() => {}}
            /> 
          </PiAccordianHeader>
          <PiAccordianPanel>
            <StepperContentBody className="stepperContentBody">
              <GwcNoSuggestionsCard>
                <NoSuggestionsCardTitle>Increase</NoSuggestionsCardTitle>
                <div className="NoSuggestionsCardBody">
                  <p>No suggestions yet </p>
                  <p>Create a new suggestion from the add button below</p>
                </div>
              </GwcNoSuggestionsCard>

              <GwcNoSuggestionsCard>
                <NoSuggestionsCardTitle>Decrease</NoSuggestionsCardTitle>
                <div className="NoSuggestionsCardBody">
                  <p>No suggestions yet </p>
                  <p>Create a new suggestion from the add button below</p>
                </div>
                {/* <PiButton
                  appearance="link"
                  label="add"
                  iconBefore={<Icon name="plusicon" />}
                  className="mt-2"
                /> */}
              </GwcNoSuggestionsCard>

              <GwcNoSuggestionsCard className="internalTextArea">
                <NoSuggestionsCardTitle>Internal Note</NoSuggestionsCardTitle>
                <PiTextArea
                  placeholder=""
                  name=""
                  className="TabsTextArea"
                  minimumRows={4}
                />
              </GwcNoSuggestionsCard>
            </StepperContentBody>
          </PiAccordianPanel>
        </PiAccordianItem>
      </PiAccordian>

      <PiAccordian  allowZeroExpanded onChange={() => {}}>
        <PiAccordianItem>
          <PiAccordianHeader>Nutrition</PiAccordianHeader>
          <PiAccordianPanel>
            <StepperContentBody className="stepperContentBody">
              <GwcNoSuggestionsCard>
                <NoSuggestionsCardTitle>Increase</NoSuggestionsCardTitle>
                <div className="NoSuggestionsCardBody">
                  <p>No suggestions yet </p>
                  <p>Create a new suggestion from the add button below</p>
                </div>
                {/* <PiButton
                  appearance="link"
                  label="add"
                  iconBefore={<Icon name="plusicon" />}
                  className="mt-2"
                /> */}
              </GwcNoSuggestionsCard>

              <GwcNoSuggestionsCard>
                <NoSuggestionsCardTitle>Decrease</NoSuggestionsCardTitle>
                <div className="NoSuggestionsCardBody">
                  <p>No suggestions yet </p>
                  <p>Create a new suggestion from the add button below</p>
                </div>
                {/* <PiButton
                  appearance="link"
                  label="add"
                  iconBefore={<Icon name="plusicon" />}
                  className="mt-2"
                /> */}
              </GwcNoSuggestionsCard>

              <GwcNoSuggestionsCard className="internalTextArea">
                <NoSuggestionsCardTitle>Internal Note</NoSuggestionsCardTitle>
                <PiTextArea
                  placeholder=""
                  name=""
                  className="TabsTextArea"
                  minimumRows={4}
                  isDisabled={true}
                />
              </GwcNoSuggestionsCard>
            </StepperContentBody>
          </PiAccordianPanel>
        </PiAccordianItem>
      </PiAccordian>


      <PiAccordian  allowZeroExpanded onChange={() => {}}>
        <PiAccordianItem>
          <PiAccordianHeader>Testing</PiAccordianHeader>
          <PiAccordianPanel>
            <StepperContentBody className="stepperContentBody">
              <GwcNoSuggestionsCard>
                <NoSuggestionsCardTitle>Items</NoSuggestionsCardTitle>
                <div className="NoSuggestionsCardBody">
                  <p>No suggestions yet </p>
                  <p>Create a new suggestion from the add button below</p>
                </div>
                {/* <PiButton
                  appearance="link"
                  label="add"
                  iconBefore={<Icon name="plusicon" />}
                  className="mt-2"
                /> */}
              </GwcNoSuggestionsCard>

              <GwcNoSuggestionsCard className="internalTextArea">
                <NoSuggestionsCardTitle>Internal Note</NoSuggestionsCardTitle>
                <PiTextArea
                  placeholder=""
                  name=""
                  className="TabsTextArea"
                  minimumRows={4}
                  isDisabled={true}
                />
              </GwcNoSuggestionsCard>
            </StepperContentBody>
          </PiAccordianPanel>
        </PiAccordianItem>
      </PiAccordian>

      
      
    </PreviewTabContainer>
  );
};
export default Preview;
