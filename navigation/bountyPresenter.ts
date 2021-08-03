import { getRootContainer } from "../config/ioc/root";
import { useClassStore } from "../utils/useClassStore";

import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable } from "mobx";
import AuthStore from "../stores/AuthStore/AuthStore";
import BountyStore from "../stores/BountyStore/BountyStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(BountyStore) private bountyStore!: BountyStore;

  @observable error: string | null = null;

  @action public generateBountyInvoice = async () => {
    // const response = await axios.post(
    //   `http://localhost:4000/create-bounty-invoice`,
    //   {
    //     amount: 20,
    //     user: "",
    //   }
    // );
  };

  @action public getAllBounties = async () => {
    await this.bountyStore.getAllBounties();
  };

  @action public createBountyPress = async () => {
    const response = await this.bountyStore.createBounty();
    if (!response.success) this.error = response?.error ?? null;
  };
}

const useBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useBountyPresenter;
