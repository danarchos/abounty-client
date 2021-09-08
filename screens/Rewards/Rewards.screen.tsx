import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Text, View } from "react-native";

const Rewards: FC = () => {
  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>You have no rewards yet</Text>
    </View>
  );
};

export default observer(Rewards);
