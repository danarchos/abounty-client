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

const SpeakerStep: FC = () => {
    const {
        speakerString,
        setSpeakers,
        decrementStep,
        checkSpeakers,
        error
    } = useCreateBountyPresenter();
    return (
        <StepContainer>
            <Text gutterBottom={3} size="small">
                SPEAKERS
            </Text>
            <StyledTextInput
                placeholder="The twitter usernames to speak. Choose up to 4. Seperate with commas"
                underlineColor="transparent"
                theme={{ colors: { primary: "black" } }}
                multiline
                numberOfLines={2}
                value={speakerString}
                onChangeText={setSpeakers}
            />
            <ButtonsContainer>
                <Button onPress={decrementStep}>Previous</Button>
                <Button onPress={checkSpeakers}>Next</Button>
            </ButtonsContainer>
            <Text color="red" size="small">
                {error && error}
            </Text>
        </StepContainer>
    );
};

export default observer(SpeakerStep);
