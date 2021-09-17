import { inject, injectable, postConstruct } from "inversify";
import {
  observable,
  action,
  makeAutoObservable,
  runInAction,
  computed,
} from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";
import { Speaker } from "../../model/types";
import AuthStore from "../../stores/AuthStore/AuthStore";
import BountyStore from "../../stores/BountyStore/BountyStore";

import DiscoverStore from "../../stores/DiscoverStore/DiscoverStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class ViewBountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(BountyStore) private bountyStore!: BountyStore;
  @inject(DiscoverStore) private discoverStore!: DiscoverStore;
  @inject(AuthStore) private authStore!: AuthStore;

  @observable ws: WebSocket | null = null;

  @observable bountyId: string | null = null;
  @observable balance: number | null = null;
  @observable subject: string = "";
  @observable description: string = "";
  @observable speakers: Speaker[] = [];
  @observable expiry: number | null = null;

  @observable invoiceQR: {
    bountyId: string;
    payreq: string;
    hash: string;
    amount: number;
  } | null = null;

  @action public generateBountyInvoice = async (bountyId: string) => {
    const response = await this.bountyStore.createInvoice(bountyId);
    if (response) {
      runInAction(() => {
        this.invoiceQR = { ...response.data, bountyId };
        console.log({ response });
      });
    }
  };

  @action public initialiseViewBounty = async (bountyId: string) => {
    const currentBounty = await this.discoverStore.getBounty(bountyId);

    if (!currentBounty) return;
    const { balance, expiry, speakers, subject, description } = currentBounty;

    this.bountyId = bountyId;
    this.balance = balance ?? null;
    this.speakers = speakers;
    this.subject = subject;
    this.description = description;
    this.expiry = expiry ?? null;
  };

  @computed get isCurrentUserWanted() {
    const isInSpeakers = this.speakers.find(
      (speaker) =>
        speaker.username ===
        this.authStore.currentUser.user_metadata.user_name.toLowerCase()
    );
    if (isInSpeakers) return true;
    return false;
  }

  @action public updateSpeaker = async () => {
    if (!this.bountyId) return;
    const response = await this.bountyStore.updateSpeaker(
      this.speakers,
      this.authStore.currentUser.id,
      this.bountyId
    );
    this.speakers = response.data[0].speakers;
  };

  @action public handleEvent = (event: any) => {
    const data = JSON.parse(event.data);
    this.initialiseViewBounty(data.data.bountyId);
    this.invoiceQR = null;
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
  useClassStore<ViewBountyPresenter>(
    getRootContainer().get(ViewBountyPresenter)
  );

export default useViewBountyPresenter;
