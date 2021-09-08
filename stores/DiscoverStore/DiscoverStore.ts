import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { Bounty } from "../../model/types";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import AuthStore from "../AuthStore/AuthStore";

@injectable()
class DiscoverStore {
  @inject(AuthStore) private authStore!: AuthStore;

  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @observable allBounties: Bounty[] = [];

  @action public createInvoice = async (bountyId: string) => {
    if (!this.authStore.currentUser) return;
    console.log("hit create");
    const response = await API.createInvoice(
      bountyId,
      this.authStore.currentUser.id,
      this.authStore.currentUser.user_metadata.user_name
    );
    return response;
  };

  @action public getAllBounties = async () => {
    const response = await API.getAllBounties();

    this.allBounties = response?.data;
    return response;
  };

  @action public getBounty = async (id: string) => {
    const response = await API.getBounty(id);
    return response?.data;
  };

  @action public listenToBounty = async () => {
    // listen to the currently viewed  bounty
  };

  @action public removeListerForBounty = async () => {
    // undo listen to the currently viewed  bounty
  };

  @action public createBounty = async ({
    description,
    subject,
    speakers,
    tags,
    user,
  }: Bounty) => {
    const response: any = await API.createBounty({
      user,
      subject,
      description,
      speakers,
      tags,
    });

    if (response) {
      // optimise this to get back all bounties in one go
      this.getAllBounties();
    }
    return response;
  };
}

export const useDiscoverStore = () =>
  useClassStore<DiscoverStore>(getRootContainer().get(DiscoverStore));

export default DiscoverStore;
