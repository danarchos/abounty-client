import { injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable } from "mobx";

import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import { Bounty } from "../../model/types";
import axios from "axios";

@injectable()
class BountyStore {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @observable allBounties: Bounty[] = [];

  @action public getAllBounties = async () => {
    const response = await axios.get(`http://localhost:4000/bounties`);
    this.allBounties = response?.data;
    return response;
  };

  @action public createBounty = async () => {
    const response: any = await API.createBounty({
      author: "@author",
      subject: "Test subject",
      heads: [
        {
          username: "@testUser",
          accepted: false,
        },
        {
          username: "@testUser2",
          accepted: false,
        },
      ],
      tags: ["test"],
    });

    if (response?.success) {
      this.allBounties = response?.bounties;
    }
    return response;
  };
}

export const useBountyStore = () =>
  useClassStore<BountyStore>(getRootContainer().get(BountyStore));

export default BountyStore;
