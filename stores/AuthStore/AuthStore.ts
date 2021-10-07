import {
  signUp,
  signOut,
  signIn,
  updateCurrentUser,
  fetchCurrentUser,
} from "../../functions/gateway/SupabaseGateway";
import { injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable } from "mobx";
import { persist } from "mobx-persist";

import navigationService, {
  mainRoutes,
} from "../../navigation/NavigationService";
import { definitions } from "../../types/supabase";
import { Session } from "@supabase/supabase-js";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";

export type AuthData = {
  user: definitions["users"] | null | undefined;
  session: Session | null;
};

@injectable()
class AuthStore {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }

  @persist @observable AuthData: AuthData = {
    user: null,
    session: null,
  };
  @persist @observable currentUser: any = null;
  @observable signUpError: boolean = false;
  @observable loginError: boolean = false;
  @observable hasOnboarded: boolean = false;

  @action public setCurrentUser = (user: any) => {
    this.currentUser = user;
  };

  @action public setAuthData = (value: AuthData) => {
    this.AuthData = value;
  };

  @action public setSignUpError = (value: boolean) => {
    this.signUpError = value;
  };

  @action public setLoginError = (value: boolean) => {
    this.loginError = value;
  };

  @action public setHasOnboarded = (value: boolean) => {
    this.hasOnboarded = value;
  };

  fetchCurrentUser = async () => {
    return await fetchCurrentUser();
  };

  updateUserName = async (name: string) => {
    const response = await updateCurrentUser(name);
    const { data, error } = response ?? {};
    if (error) {
      console.log(error);
      return null;
    }

    this.setHasOnboarded(true);
    await this.checkIfOnboarded();
    return data;
  };

  signUp = async (email: string, password: string) => {
    const response = await signUp(email, password);
    const { session, error } = response;

    if (error) {
      console.log(error);
      return null;
    } else {
      // 'user' is fetched using a different query
      this.setAuthData({ user: null, session });
      this.setCurrentUserDetails();
      return true;
    }
  };

  signIn = async (email: string, password: string) => {
    const response = await signIn(email, password);
    const { user, session, error } = response;

    if (error) {
      console.log(error);
      return null;
    } else {
      this.setAuthData({ user: null, session });
      if (user) {
        this.checkIfOnboarded();
      }

      return true;
    }
  };

  setCurrentUserDetails = async () => {
    const currentUser = await this.fetchCurrentUser();
    this.setAuthData({ ...this.AuthData, user: currentUser });
    return currentUser;
  };

  checkIfOnboarded = async () => {
    await this.setCurrentUserDetails();
    navigationService.navigate(mainRoutes.Main);
  };

  signOut = async () => {
    const response = await signOut();
    if (!response) {
      this.setAuthData({ user: null, session: null });
    } else {
    }
  };
}

export const useAuthStore = () =>
  useClassStore<AuthStore>(getRootContainer().get(AuthStore));

export default AuthStore;
