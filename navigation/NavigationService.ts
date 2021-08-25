import { NavigationContainerRef, StackActions } from "@react-navigation/native";
import { observable } from "mobx";
import React from "react";

export enum authRoutes {
  SignUp = "SignUp",
  Login = "Login",
}

export enum mainRoutes {
  Main = "Main",
  Dashboard = "Dashboard",
  ViewBounty = "ViewBounty",
  CreateBounty = "CreateBounty",
}

export const authLinks = {
  [authRoutes.Login]: "login",
  [authRoutes.SignUp]: "sign-up",
};

export const mainLinks = {
  [mainRoutes.Dashboard]: "dashboard",
  [mainRoutes.ViewBounty]: "bounty/:id",
  [mainRoutes.CreateBounty]: "create-bounty",
  [mainRoutes.Main]: "",
};

export type AuthNavigatorParamList = {
  [authRoutes.SignUp]: undefined;
  [authRoutes.Login]: undefined;
};

export type MainNavigatorParamList = {
  [mainRoutes.Main]: undefined;
  [mainRoutes.ViewBounty]: { id: string };
  [mainRoutes.Dashboard]: undefined;
  [mainRoutes.CreateBounty]: undefined;
};

/* Web Linking */
export const mainLinking = {
  prefixes: [],
  config: {
    screens: {
      Main: {
        path: "",
        screens: {
          Dashboard: {
            path: "/dashboard",
          },
          CreateBounty: {
            path: "/create-bounty",
          },
          ViewBounty: {
            path: "bounty/:id",
          },
        },
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
