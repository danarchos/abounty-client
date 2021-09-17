import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { Bounty, Reward } from "../../model/types";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import AuthStore from "../AuthStore/AuthStore";

@injectable()
class RewardStore {
  @inject(AuthStore) private authStore!: AuthStore;

  @postConstruct() onInit() {
    makeAutoObservable(this);
  }

  @observable rewards: Reward[] = [];

  @action public getRewards = async () => {
    console.log(this.authStore.currentUser);
    if (this.authStore.currentUser) {
      const response = await API.getRewards(
        this.authStore.currentUser.user_metadata.user_name.toLowerCase()
      );
      this.rewards = response.data;
      console.log(this.rewards);
    }
  };

  @action public getReward = async (id: string) => {
    const response = await API.getReward(id);
    return response.data;
  };

  @action public getWithdrawRequest = async () => {
    const response = await API.getWithdrawRequest();
    return response;
  };
}

export const useRewardStore = () =>
  useClassStore<RewardStore>(getRootContainer().get(RewardStore));

export default RewardStore;
