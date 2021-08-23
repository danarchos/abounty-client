import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import BountyStore from "../../stores/BountyStore/BountyStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(BountyStore) private bountyStore!: BountyStore;
  @observable error: string | null = null;
  @observable subject: string = "Subjay";
  @observable description: string = "Bountay";
  @observable tags: string[] = ["testing"];
  @observable speakers: { username: string; confirmed: boolean }[] = [
    { username: "dannyjmac", confirmed: false },
    { username: "jackmallers", confirmed: false },
  ];

  @action public createBountySubmit = async () => {
    const response = await this.bountyStore.createBounty({
      subject: this.subject,
      description: this.description,
      tags: this.tags,
      speakers: this.speakers,
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });
    if (!response.success) this.error = response?.error ?? null;
  };
}

const useCreateBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useCreateBountyPresenter;
