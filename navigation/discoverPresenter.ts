import { getRootContainer } from "../config/ioc/root";
import { useClassStore } from "../utils/useClassStore";

import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import AuthStore from "../stores/AuthStore/AuthStore";
import DiscoverStore from "../stores/DiscoverStore/DiscoverStore";

@injectable()
class DiscoverPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(DiscoverStore) private discoverStore!: DiscoverStore;

  @observable error: string | null = null;

  @action public getAllBounties = async () => {
    await this.discoverStore.getAllBounties();
  };
}

const useDiscoverPresenter = () =>
  useClassStore<DiscoverPresenter>(getRootContainer().get(DiscoverPresenter));

export default useDiscoverPresenter;
