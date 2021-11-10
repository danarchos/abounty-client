import { observer } from "mobx-react-lite";
import { Text } from "../../components/common/Text";
import React, { FC } from "react";
import { TextInput } from "react-native-paper";

import Button from "../../components/common/Button";
import styled from "styled-components/native";
import useCreateBountyPresenter from "../../screens/CreateBounty/CreateBountyPresenter";

const ButtonsContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 30px;
`;

const StepContainer = styled.View`
  width: 500px;
`;

const SubjectStep: FC = () => {
    const {
        setSubject,
        subject,
        incrementStep,
        error,
    } = useCreateBountyPresenter();
    return (
        <StepContainer>
            <Text gutterBottom={8}>SUBJECT</Text>
            <StyledTextInput
                placeholder="Enter a suitable title for discussion"
                theme={{ colors: { primary: "black" } }}
                value={subject}
                underlineColor="transparent"
                onChangeText={setSubject}
            />
            <ButtonsContainer>
                <Button onPress={incrementStep}>Next</Button>
            </ButtonsContainer>
            <Text size="small" color="red">
                {error && error}
            </Text>
        </StepContainer>
    );
};

export default observer(SubjectStep);
