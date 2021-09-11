import { NavigationContainerRef, StackActions } from "@react-navigation/native";
import { observable } from "mobx";
import React from "react";

export enum authRoutes {
  SignUp = "SignUp",
  Login = "Login",
}

export enum mainRoutes {
  Main = "Main",
  Discover = "Discover",
  ViewBounty = "ViewBounty",
  ViewReward = "ViewReward",
  CreateBounty = "CreateBounty",
  Rewards = "Rewards",
}

export const authLinks = {
  [authRoutes.Login]: "login",
  [authRoutes.SignUp]: "sign-up",
};

export const mainLinks = {
  [mainRoutes.Discover]: "/discover",
  [mainRoutes.ViewBounty]: "/bounty/:id",
  [mainRoutes.ViewReward]: "/reward/:id",
  [mainRoutes.CreateBounty]: "/create-bounty",
  [mainRoutes.Rewards]: "/rewards",
  [mainRoutes.Main]: "",
};

export type AuthNavigatorParamList = {
  [authRoutes.SignUp]: undefined;
  [authRoutes.Login]: undefined;
};

export type MainNavigatorParamList = {
  [mainRoutes.Main]: undefined;
  [mainRoutes.ViewBounty]: { id: string };
  [mainRoutes.ViewReward]: { id: string };
  [mainRoutes.Discover]: undefined;
  [mainRoutes.Rewards]: undefined;
  [mainRoutes.CreateBounty]: undefined;
};

/* Web Linking */
export const mainLinking = {
  prefixes: [],
  config: {
    screens: {
      Discover: {
        path: "/discover",
      },
      CreateBounty: {
        path: "/create-bounty",
      },
      ViewBounty: {
        path: "/bounty/:id",
      },
      Rewards: {
        path: "/rewards",
      },
      ViewReward: {
        path: "/reward",
      },
    },
  },
};

export const authLinking = {
  prefixes: [],
  config: {
    screens: {
      ...authLinks,
    },
  },
};

class NavigationService {
  @observable navigationRef = React.createRef<NavigationContainerRef>();

  navigate(name: authRoutes | mainRoutes, params?: object) {
    return this.navigationRef.current?.navigate(name, params);
  }

  popToTop = () => {
    return this.navigationRef.current?.dispatch(StackActions.popToTop());
  };

  goBack = () => {
    return this.navigationRef.current?.goBack();
  };
}

const navigationService = new NavigationService();

export default navigationService;
