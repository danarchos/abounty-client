import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { useClassStore } from "../../utils/useClassStore";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import { Speaker } from "../../model/types";

@injectable()
class BountyStore {
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
}

export const useBountyStore = () =>
  useClassStore<BountyStore>(getRootContainer().get(BountyStore));

export default BountyStore;
