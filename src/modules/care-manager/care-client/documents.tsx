import { PiBreadCrumb, PiTypography } from "pixel-kit";
import React from "react";
import { Icon } from "../../../components";
import {
  ReadinessIcon,
  FoodDiaryIcon,
  HealthHistoryIcon,
  SymptomIcon,
  RightIcon,
} from "../../../components/icon/icons";
import PostSessionIcon from "../../../components/icon/icons/post_session_icon";
import PresessionIcon from "../../../components/icon/icons/pre_session_icon";
import {
  GwDocumentCard,
  GwDocumentsCardHolder,
  GwDocumentInnerContainer,
  GwDocumentContainer,
} from "../../../styles/common-styles";

export default function Documents(props:any) {
  return (
    <GwDocumentContainer>
      <PiBreadCrumb
        items={[
          {
            href: "",
            label: "All Documents",
          },
          // {
          //   href: "",
          //   label: "Pre-session Survey",
          // },
        ]}
      />

      <GwDocumentInnerContainer className="GwDocumentInnerContainer">
        <div className="leftDocumentContainer">
          <GwDocumentsCardHolder>
            <PiTypography component="h5">Health Intake Forms</PiTypography>
            <GwDocumentCard>
              <div className="DocumentTitle">
                <ReadinessIcon />
                Readiness Assessment
              </div>
              <RightIcon />
            </GwDocumentCard>

            <GwDocumentCard onClick={props.symptomAnalysisData} className={props.clientDetails.client_msq === true ? "" : 'disableDoc'}>
              <div className="DocumentTitle" >
                <SymptomIcon />
                Symptom Analysis
              </div>
              <RightIcon />
            </GwDocumentCard>

            <GwDocumentCard onClick={props.intakeForn} className={props.clientDetails.client_intake === true ? "" : 'disableDoc'}>
              <div className="DocumentTitle">
                <HealthHistoryIcon />
                Health History
              </div>
              <RightIcon />
            </GwDocumentCard>

            <GwDocumentCard onClick={props.docView} className={props.clientDetails.client_past_test === true ? "" : 'disableDoc'}>
              <div className="DocumentTitle">
                <Icon name="Pdf" />
                Historical Tests
              </div>
              <RightIcon />
            </GwDocumentCard>

            <GwDocumentCard>
              <div className="DocumentTitle">
                <FoodDiaryIcon />
                Food Diary
              </div>
              <RightIcon />
            </GwDocumentCard>
          </GwDocumentsCardHolder>
        </div>
        <div className="rightDocumentContainer">
          <GwDocumentsCardHolder>
            <PiTypography component="h5">Feedback Forms</PiTypography>
            <GwDocumentCard>
              <div className="DocumentTitle">
                <PresessionIcon />
                Pre-session Survey
              </div>
              <RightIcon />
            </GwDocumentCard>

            <GwDocumentCard>
              <div className="DocumentTitle">
                <PostSessionIcon />
                Post-session Checkin 
              </div>
              <RightIcon />
            </GwDocumentCard>
          </GwDocumentsCardHolder>
        </div>
      </GwDocumentInnerContainer>
    </GwDocumentContainer>
  );
}
