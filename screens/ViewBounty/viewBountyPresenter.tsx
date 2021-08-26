import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { getRootContainer } from "../../config/ioc/root";

import BountyStore from "../../stores/BountyStore/BountyStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(BountyStore) private bountyStore!: BountyStore;
  @observable bountyId: string | null = null;
  @observable balance: number | null = null;
  @observable subject: string = "";
  @observable description: string = "";
  @observable speakers: { username: string; confirmed: boolean }[] = [];
  @observable expiry: number | null = null;

  @action public initialiseViewBounty = async (bountyId: string) => {
    const currentBounty = await this.bountyStore.getBounty(bountyId);

    if (!currentBounty) return;

    const { balance, expiry, speakers, subject, description } = currentBounty;

    this.bountyId = bountyId;
    this.balance = balance ?? null;
    this.speakers = speakers;
    this.subject = subject;
    this.description = description;
    this.expiry = expiry ?? null;
  };
}

const useViewBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useViewBountyPresenter;
