import { getRootContainer } from "../config/ioc/root";
import { useClassStore } from "../utils/useClassStore";

import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable } from "mobx";
import AuthStore from "../stores/AuthStore/AuthStore";

@injectable()
class AuthPresenter {
  @inject(AuthStore) private authStore!: AuthStore;
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }

  @observable email: string = "";
  @observable password: string = "";
  @observable loginError: boolean = false;

  @action public setCurrentUser = (user: any) =>
    this.authStore.setCurrentUser(user);

  @action public setEmail = (value: string) => {
    this.email = value;
  };

  @action public setPassword = (value: string) => {
    this.password = value;
  };

  @action public setLoginError = (value: boolean) => {
    this.loginError = value;
  };

  @action public setSignUpError = (value: boolean) => {
    this.loginError = value;
  };

  performSignIn = async () => {
    this.setLoginError(false);
    const response = await this.authStore.signIn(this.email, this.password);
    if (!response) {
      this.setLoginError(true);
    }
  };

  performSignOut = async () => await this.authStore.signOut();

  performSignUp = async () => {
    this.setSignUpError(false);
    const response = await this.authStore.signUp(this.email, this.password);
    if (!response) {
      this.setSignUpError(true);
    }
  };
}

const useAuthPresenter = () =>
  useClassStore<AuthPresenter>(getRootContainer().get(AuthPresenter));

export default useAuthPresenter;
