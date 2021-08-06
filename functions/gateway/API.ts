import axios from "axios";
import Constants from "expo-constants";
import { Bounty } from "../../model/types";

class API {
  private apiUrl = Constants.manifest?.extra?.apiBaseUrl;

  public async createInvoice(bountyId: string) {
    const response = await axios.post(
      `http://localhost:4000/create-bounty-invoice`,
      {
        amount: 50,
        userId: "123e4567-e89b-12d3-a456-426614174000",
        bountyId,
      }
    );

    return response;
  }

  public async getAllBounties() {
    const response = await axios.get(`${this.apiUrl}/bounties`);
    return response;
  }

  public async createBounty({
    userId,
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
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });
    return response;
  }
}

export default new API();
