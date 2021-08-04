export interface Bounty {
  subject: string;
  author: string;
  id: string;
  speakers: { username: string; confirmed: boolean }[];
  description: string;
  created?: Date;
  tags: string[];
  active?: boolean;
}
