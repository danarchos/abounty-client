import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";

import DashboardStore from "../../stores/DashboardStore/DashboardStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(DashboardStore) private dashboardStore!: DashboardStore;

  @observable ws: WebSocket | null = null;

  @observable bountyId: string | null = null;
  @observable balance: number | null = null;
  @observable subject: string = "";
  @observable description: string = "";
  @observable speakers: { username: string; confirmed: boolean }[] = [];
  @observable expiry: number | null = null;

  @action public initialiseViewBounty = async (bountyId: string) => {
    const currentBounty = await this.dashboardStore.getBounty(bountyId);

    if (!currentBounty) return;

    const { balance, expiry, speakers, subject, description } = currentBounty;

    this.bountyId = bountyId;
    this.balance = balance ?? null;
    this.speakers = speakers;
    this.subject = subject;
    this.description = description;
    this.expiry = expiry ?? null;
  };

  @action public handleEvent = (event: any) => {
    console.log("recieved payment", JSON.parse(event.data));
  };

  @action public listenForPayments = async (bountyId: string) => {
    this.ws = API.getEventsSocket(bountyId);
    this.ws.addEventListener("message", this.handleEvent, true);
  };

  @action public removeListener = () => {
    if (this.ws) {
      this.ws.removeEventListener("message", this.handleEvent, true);
    }
  };
}

const useViewBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useViewBountyPresenter;
