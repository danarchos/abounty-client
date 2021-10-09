import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable } from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import { Speaker } from "../../model/types";

import RewardStore from "../../stores/RewardStore/RewardStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class ViewRewardPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(RewardStore) private rewardStore!: RewardStore;

  @observable ws: WebSocket | null = null;

  @observable bountyId: string | null = null;
  @observable balance: number | null = null;
  @observable subject: string = "";
  @observable description: string = "";
  @observable speakers: Speaker[] = [];
  @observable expiry: number | null = null;

  @observable withdrawRequest: string | null = null;

  @observable invoiceQR: {
    bountyId: string;
    payreq: string;
    hash: string;
    amount: number;
  } | null = null;

  @action public initialiseViewReward = async (bountyId: string) => {
    const currentReward = await this.rewardStore.getReward(bountyId);

    this.bountyId = currentReward.bountyId;
    this.balance = currentReward.balance ?? null;
    this.speakers = currentReward.speakers;
    this.subject = currentReward.subject;
    this.description = currentReward.description;
    this.expiry = currentReward.expiry ?? null;
  };

  @action public handleWithdraw = async () => {
    const response = await this.rewardStore.getWithdrawRequest();
    this.withdrawRequest = response?.data.withdrawRequest;
  };
}

const useViewRewardPresenter = () =>
  useClassStore<ViewRewardPresenter>(
    getRootContainer().get(ViewRewardPresenter)
  );

export default useViewRewardPresenter;
