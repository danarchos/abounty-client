import { getRootContainer } from "../config/ioc/root";
import { useClassStore } from "../utils/useClassStore";

import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import AuthStore from "../stores/AuthStore/AuthStore";
import DashboardStore from "../stores/DashboardStore/DashboardStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(DashboardStore) private dashboardStore!: DashboardStore;

  @observable error: string | null = null;
  @observable invoiceQR: {
    bountyId: string;
    payreq: string;
    hash: string;
    amount: number;
  } | null = null;

  @action public generateBountyInvoice = async (bountyId: string) => {
    const response = await this.dashboardStore.createInvoice(bountyId);
    if (response) {
      runInAction(() => {
        this.invoiceQR = { ...response.data, bountyId };
        console.log({ response });
      });
    }
  };

  @action public getAllBounties = async () => {
    await this.dashboardStore.getAllBounties();
  };
}

const useBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useBountyPresenter;
