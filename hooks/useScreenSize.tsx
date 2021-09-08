import { useDimensions } from "@react-native-community/hooks";
import { useEffect, useState } from "react";
import { ScreenSize } from "../model/types";

export const MAX_MOBILE = 800;
export const MAX_TABLET_PORTRAIT = 1000;
export const MAX_TABLET_LANDSCAPE = 1200;

type SizeHook = () => [ScreenSize];

const getSize = (width: number) => {
  if (width < MAX_MOBILE) {
    return ScreenSize.mobile;
  }
  if (width < MAX_TABLET_PORTRAIT) {
    return ScreenSize.tabletPortrait;
  }
  if (width >= MAX_TABLET_PORTRAIT && width < MAX_TABLET_LANDSCAPE) {
    return ScreenSize.tabletLandscape;
  }
  return ScreenSize.desktop;
};

export const useScreenSize: SizeHook = () => {
  const { window } = useDimensions();
  const width = window.width;

  const [size, setSize] = useState<ScreenSize>(getSize(width));

  useEffect(() => {
    const newSize = getSize(width);
    setSize(newSize);
  }, [width]);

  return [size];
};
