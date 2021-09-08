export interface Bounty {
  subject: string;
  user: { id: string; username: string };
  id?: string;
  speakers: Speaker[];
  description: string;
  created?: Date;
  tags: string[];
  active?: boolean;
  balance?: number;
  expiry?: number;
}

export type Speaker = {
  id: string;
  name: string;
  username: string;
  description: string;
  profile_image_url: string;
  confirmed: boolean;
};

export enum ScreenSize {
  mobile = "mobile",
  tabletPortrait = "tabletPortrait",
  tabletLandscape = "tabletLandscape",
  desktop = "desktop",
  wideDesktop = "wideDesktop",
}
