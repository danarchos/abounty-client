import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";

import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import { Bounty } from "../../model/types";
import AuthStore from "../AuthStore/AuthStore";

@injectable()
class BountyStore {
  @inject(AuthStore) private authStore!: AuthStore;

  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @observable allBounties: Bounty[] = [];

  @action public createInvoice = async (bountyId: string) => {
    if (!this.authStore.currentUser) return;
    const response = await API.createInvoice(
      bountyId,
      this.authStore.currentUser.id,
      this.authStore.currentUser.user_metadata.user_name
    );
    return response;
  };

  @action public getAllBounties = async () => {
    console.log("called get all bounties");
    const response = await API.getAllBounties();

    this.allBounties = response?.data;
    console.log({ response });
    return response;
  };

  @action public createBounty = async () => {
    const response: any = await API.createBounty({
      userId: "123e4567-e89b-12d3-a456-426614174000",
      subject: "Test subject",
      description: "Test desc",
      speakers: [
        {
          username: "@testUser",
          confirmed: false,
        },
        {
          username: "@testUser2",
          confirmed: false,
        },
      ],
      tags: ["test"],
      active: false,
    });

    if (response) {
      // optimise this to get back all bounties in one go
      this.getAllBounties();
    }
    return response;
  };
}

export const useBountyStore = () =>
  useClassStore<BountyStore>(getRootContainer().get(BountyStore));

export default BountyStore;
