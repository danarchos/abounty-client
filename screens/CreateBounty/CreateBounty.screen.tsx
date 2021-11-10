import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import styled from "styled-components/native";
import useCreateBountyPresenter from "./CreateBountyPresenter";
import SubjectStep from "../../components/CreateBounty/SubjectStep";
import DescriptionStep from "../../components/CreateBounty/DescriptionStep";
import SpeakerStep from "../../components/CreateBounty/SpeakerStep";
import HashtagStep from "../../components/CreateBounty/HashtagStep";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CreateBounty: FC = () => {
  const { step } = useCreateBountyPresenter();
  return (
    <Container>
      {step === 0 && <SubjectStep />}
      {step === 1 && <DescriptionStep />}
      {step === 2 && <SpeakerStep />}
      {step === 3 && <HashtagStep />}
    </Container>
  );
};

export default observer(CreateBounty);
