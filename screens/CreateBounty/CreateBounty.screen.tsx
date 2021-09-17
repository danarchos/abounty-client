import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Text } from "../../components/common/Text";
import React, { FC, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-qr-code";
import { TextInput } from "react-native-paper";

import SignOutButton from "../../components/SignOutButton";
import {
  MainNavigatorParamList,
  mainRoutes,
} from "../../navigation/NavigationService";
import Button from "../../components/common/Button";
import useCreateBountyPresenter from "./createBountyPresenter";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

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

const CreateBounty: FC = () => {
  const {
    createBountySubmit,
    setDescription,
    setSubject,
    subject,
    description,
    step,
    updateStep,
    setSpeakers,
    checkSpeakers,
    speakerString,
    setTags,
    tagString,
    error,
    handleStepThree,
  } = useCreateBountyPresenter();
  return (
    <Container>
      {step === 0 && (
        <StepContainer>
          <Text gutterBottom={8}>SUBJECT</Text>
          <StyledTextInput
            placeholder="Enter a suitable title for discussion"
            theme={{ colors: { primary: "black" } }}
            value={subject}
            underlineColor="transparent"
            onChangeText={(text) => setSubject(text)}
          />
          <ButtonsContainer>
            <Button onPress={() => updateStep(step + 1)}>Next</Button>
          </ButtonsContainer>
          <Text size="small" color="red">
            {error && error}
          </Text>
        </StepContainer>
      )}

      {step === 1 && (
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
            onChangeText={(text) => setDescription(text)}
          />
          <ButtonsContainer>
            <Button onPress={() => updateStep(step - 1)}>Previous</Button>
            <Button onPress={() => updateStep(step + 1)}>Next</Button>
          </ButtonsContainer>
          <Text size="small" color="red">
            {error && error}
          </Text>
        </StepContainer>
      )}

      {step === 2 && (
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
            onChangeText={(text) => setSpeakers(text)}
          />
          <ButtonsContainer>
            <Button onPress={() => updateStep(step - 1)}>Previous</Button>
            <Button onPress={checkSpeakers}>Next</Button>
          </ButtonsContainer>
          <Text color="red" size="small">
            {error && error}
          </Text>
        </StepContainer>
      )}

      {step === 3 && (
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
            onChangeText={(text) => setTags(text)}
          />
          <ButtonsContainer>
            <Button onPress={() => updateStep(step - 1)}>Previous</Button>
            <Button onPress={handleStepThree}>Create Bounty</Button>
          </ButtonsContainer>
        </StepContainer>
      )}
      {step === 4 && (
        <StepContainer>
          <Text gutterBottom={3} size="small">
            PAY BOUNTY
          </Text>

          <ButtonsContainer>
            <Button onPress={() => updateStep(step - 1)}>Previous</Button>
            <Button onPress={createBountySubmit}>Create Bounty</Button>
          </ButtonsContainer>
        </StepContainer>
      )}
    </Container>
  );
};

export default observer(CreateBounty);

const styles = StyleSheet.create({
  bountyContainer: {
    borderWidth: 1,
    padding: 20,
  },
  pageContainer: {
    marginHorizontal: 45,
    marginVertical: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
