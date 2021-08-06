export interface Bounty {
  subject: string;
  userId: string;
  id: string;
  speakers: { username: string; confirmed: boolean }[];
  description: string;
  created?: Date;
  tags: string[];
  active?: boolean;
}
