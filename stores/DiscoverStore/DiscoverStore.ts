import { injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { Bounty } from "../../model/types";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";

@injectable()
class DiscoverStore {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @observable allBounties: Bounty[] = [];

  @action public getAllBounties = async () => {
    const response = await API.getAllBounties();

    this.allBounties = response?.data;
    return response;
  };

  @action public getBounty = async (id: string) => {
    const response = await API.getBounty(id);
    return response?.data;
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
      this.getAllBounties();
    }
    return response;
  };
}

export const useDiscoverStore = () =>
  useClassStore<DiscoverStore>(getRootContainer().get(DiscoverStore));

export default DiscoverStore;
