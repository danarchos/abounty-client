import { inject, injectable, postConstruct } from "inversify";
import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { getRootContainer } from "../../config/ioc/root";
import navigationService, {
  mainRoutes,
} from "../../navigation/NavigationService";
import AuthStore from "../../stores/AuthStore/AuthStore";
import DashboardStore from "../../stores/DashboardStore/DashboardStore";
import { useClassStore } from "../../utils/useClassStore";

@injectable()
class BountyPresenter {
  @postConstruct() onInit() {
    makeAutoObservable(this);
  }
  @inject(DashboardStore) private dashboardStore!: DashboardStore;
  @inject(AuthStore) private authStore!: AuthStore;
  @observable error: string | null = null;
  @observable subject: string = "Subjay";
  @observable description: string = "Bountay";
  @observable tags: string[] = ["testing"];
  @observable speakers: { username: string; confirmed: boolean }[] = [
    { username: "dannyjmac", confirmed: false },
    { username: "jackmallers", confirmed: false },
  ];

  @action public createBountySubmit = async () => {
    console.log({ user: this.authStore.currentUser });
    const response = await this.dashboardStore.createBounty({
      subject: this.subject,
      description: this.description,
      tags: this.tags,
      speakers: this.speakers,
      user: {
        id: this.authStore.currentUser.id,
        username:
          this.authStore.currentUser.user_metadata.user_name.toLowerCase(),
      },
    });
    if (response) {
      navigationService.navigate(mainRoutes.Dashboard);
    }
  };
}

const useCreateBountyPresenter = () =>
  useClassStore<BountyPresenter>(getRootContainer().get(BountyPresenter));

export default useCreateBountyPresenter;
