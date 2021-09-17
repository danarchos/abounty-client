import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import { Speaker } from "../../model/types";
import AuthStore from "../AuthStore/AuthStore";

@injectable()
class BountyStore {
  @inject(AuthStore) private authStore!: AuthStore;
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }

  @action public checkSpeakers = async (users: string[]) => {
    const usernames = users.join(",").replace(/@/g, "");
    const response = await API.usernames(usernames);
    return response;
  };

  @action public updateSpeaker = async (
    speakers: Speaker[],
    userId: string,
    bountyId: string
  ) => {
    const response = await API.updateSpeaker(speakers, userId, bountyId);
    return response;
  };

  @action public createInvoice = async (bountyId: string) => {
    if (!this.authStore.currentUser) return;
    const response = await API.createInvoice(
      bountyId,
      this.authStore.currentUser.id,
      this.authStore.currentUser.user_metadata.user_name
    );
    return response;
  };
}

export const useBountyStore = () =>
  useClassStore<BountyStore>(getRootContainer().get(BountyStore));

export default BountyStore;
