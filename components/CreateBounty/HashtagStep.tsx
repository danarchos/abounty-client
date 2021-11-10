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

const DescriptionStep: FC = () => {
    const {
        decrementStep,
        tagString,
        createBountySubmit,
        setTags
    } = useCreateBountyPresenter();
    return (
        <StepContainer>
            <Text gutterBottom={3} size="small">
                HASHTAGS
            </Text>
            <StyledTextInput
                placeholder="To help your bounty get discovered. Choose up to 2. Seperate with
        commas"
                underlineColor="transparent"
                theme={{ colors: { primary: "black" } }}
                multiline
                numberOfLines={2}
                value={tagString}
                onChangeText={setTags}
            />
            <ButtonsContainer>
                <Button onPress={decrementStep}>Previous</Button>
                <Button onPress={createBountySubmit}>Create Bounty</Button>
            </ButtonsContainer>
        </StepContainer>
    );
};

export default observer(DescriptionStep);
