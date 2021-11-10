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
        description,
        setDescription,
        decrementStep,
        incrementStep,
        error,
    } = useCreateBountyPresenter();
    return (
        <StepContainer>
            <Text gutterBottom={3} size="small">
                DESCRIPTION
            </Text>
            <StyledTextInput
                placeholder="What should be discussed?"
                multiline
                numberOfLines={4}
                underlineColor="transparent"
                theme={{ colors: { primary: "black" } }}
                value={description}
                onChangeText={setDescription}
            />
            <ButtonsContainer>
                <Button onPress={decrementStep}>Previous</Button>
                <Button onPress={incrementStep}>Next</Button>
            </ButtonsContainer>
            <Text size="small" color="red">
                {error && error}
            </Text>
        </StepContainer>
    );
};

export default observer(DescriptionStep);
