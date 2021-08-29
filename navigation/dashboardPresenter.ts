import { getRootContainer } from "../config/ioc/root";
import { useClassStore } from "../utils/useClassStore";

import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import AuthStore from "../stores/AuthStore/AuthStore";
import DashboardStore from "../stores/DashboardStore/DashboardStore";

@injectable()
class DashboardPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(DashboardStore) private dashboardStore!: DashboardStore;

  @observable error: string | null = null;

  @action public getAllBounties = async () => {
    await this.dashboardStore.getAllBounties();
  };
}

const useDashboardPresenter = () =>
  useClassStore<DashboardPresenter>(getRootContainer().get(DashboardPresenter));

export default useDashboardPresenter;
