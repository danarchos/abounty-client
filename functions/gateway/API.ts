import axios from "axios";
import Constants from "expo-constants";
import { Bounty } from "../../model/types";

class API {
  private apiUrl = Constants.manifest?.extra?.apiBaseUrl;
  private websocketUrl = Constants.manifest?.extra?.websocketUrl;

  public getEventsSocket() {
    return new WebSocket(this.websocketUrl);
  }

  public async createInvoice(
    bountyId: string,
    userId: string,
    username: string
  ) {
    const response = await axios.post(`${this.apiUrl}/create-bounty-invoice`, {
      amount: 50,
      userId,
      bountyId,
      username,
    });

    return response;
  }

  public async getAllBounties() {
    const response = await axios.get(`${this.apiUrl}/bounties`);
    return response;
  }

  public async getBounty(id: string) {
    const response = await axios.get(`${this.apiUrl}/bounty/${id}`);
    return response;
  }

  public async createBounty({
    user,
    subject,
    speakers,
    tags,
    description,
    active,
  }: Bounty) {
    const response = await axios.post(`${this.apiUrl}/create-bounty`, {
      description,
      active,
      subject,
      speakers,
      tags,
      user,
    });
    return response;
  }
}

export default new API();
