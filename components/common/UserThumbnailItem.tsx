import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Image } from "react-native";

interface IUserThumbnailProps {
  source: string;
  leftPosition: number;
}

const UserThumbnailItem: FC<IUserThumbnailProps> = ({
  leftPosition,
  source,
}) => {
  return (
    <Image
      style={{
        borderWidth: 2,
        position: "relative",
        left: leftPosition,
        height: 45,
        width: 45,
        marginRight: 5,
        borderRadius: 50,
        alignItems: "center",
      }}
      source={{ uri: source }}
    />
  );
};

export default observer(UserThumbnailItem);
