import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import API from "../../functions/gateway/API";

import DashboardStore from "../../stores/DashboardStore/DashboardStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class ViewBountyPresenter {
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

  @observable invoiceQR: {
    bountyId: string;
    payreq: string;
    hash: string;
    amount: number;
  } | null = null;

  @action public generateBountyInvoice = async (bountyId: string) => {
    const response = await this.dashboardStore.createInvoice(bountyId);
    if (response) {
      runInAction(() => {
        this.invoiceQR = { ...response.data, bountyId };
        console.log({ response });
      });
    }
  };

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
    const data = JSON.parse(event.data);
    console.log({ data });
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
