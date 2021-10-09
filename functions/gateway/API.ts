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
    try {
      const response = await axios.get(`${this.apiUrl}/withdraw-request`);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async usernames(speakers: string) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/usernames?users=${speakers}`
      );
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async getAllBounties() {
    try {
      const response = await axios.get(`${this.apiUrl}/live-bounties`);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async getBounty(id: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/bounty/${id}`);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async expireBounty(id: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/expire-bounty`, {
        id,
      });
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async getRewards(username: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/rewards/${username}`);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async getReward(id: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/reward/${id}`);
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async updateSpeaker(
    speakers: Speaker[],
    userId: string,
    bountyId: string
  ) {
    try {
      const response = await axios.post(`${this.apiUrl}/update-speaker`, {
        speakers,
        userId,
        bountyId,
      });
      return response;
    } catch (error) {
      console.log({ error });
    }
  }

  public async createBounty({
    user,
    subject,
    speakers,
    tags,
    description,
    active,
  }: Bounty) {
    try {
      const response = await axios.post(`${this.apiUrl}/create-bounty`, {
        description,
        active,
        subject,
        speakers,
        tags,
        user,
      });
      return response;
    } catch (error) {
      console.log({ error });
    }
  }
}

export default new API();
