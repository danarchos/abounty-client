import axios from "axios";
import Constants from "expo-constants";
import { Bounty } from "../../model/types";

class API {
  private apiUrl = Constants.manifest?.extra?.apiBaseUrl;

  public async getAllBounties() {
    const response = await axios.get(`${this.apiUrl}/bounties`);
    return response;
  }

  public async createBounty({ author, subject, heads, tags }: Bounty) {
    const response = await axios.post(`${this.apiUrl}/create-bounty`, {
      author,
      subject,
      heads,
      tags,
    });
    return response;
  }
}

export default new API();
