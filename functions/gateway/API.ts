import axios from "axios";
import Constants from "expo-constants";
import { Bounty, Speaker } from "../../model/types";

class API {
  private apiUrl = Constants.manifest?.extra?.apiBaseUrl;
  private websocketUrl = Constants.manifest?.extra?.websocketUrl;

  public getEventsSocket(bountyId: string) {
    return new WebSocket(`${this.websocketUrl}/?bountyId=${bountyId}`);
  }

  public async createInvoice(
    bountyId: string,
    userId: string,
    username: string
  ) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/create-bounty-invoice`,
        {
          amount: 50,
          userId,
          bountyId,
          username,
        }
      );
      return response;
    } catch (err) {
      console.log({ err });
    }
    return null;
  }

  public async getWithdrawRequest() {
    const response = await axios.get(`${this.apiUrl}/withdraw-request`);
    return response;
  }

  public async usernames(speakers: string) {
    const response = await axios.get(
      `${this.apiUrl}/usernames?users=${speakers}`
    );
    return response;
  }

  public async getAllBounties() {
    const response = await axios.get(`${this.apiUrl}/live-bounties`);
    return response;
  }

  public async getBounty(id: string) {
    const response = await axios.get(`${this.apiUrl}/bounty/${id}`);
    return response;
  }

  public async getRewards(username: string) {
    const response = await axios.get(`${this.apiUrl}/rewards/${username}`);
    console.log("called get rewards");
    return response;
  }

  public async getReward(id: string) {
    console.log("api get reward");
    const response = await axios.get(`${this.apiUrl}/reward/${id}`);
    console.log("called get reward");
    return response;
  }

  public async updateSpeaker(
    speakers: Speaker[],
    userId: string,
    bountyId: string
  ) {
    const response = await axios.post(`${this.apiUrl}/update-speaker`, {
      speakers,
      userId,
      bountyId,
    });
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
