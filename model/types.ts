export interface Bounty {
  subject: string;
  user: { id: string; username: string };
  id?: string;
  speakers: { username: string; confirmed: boolean }[];
  description: string;
  created?: Date;
  tags: string[];
  active?: boolean;
  balance?: number;
  expiry?: number;
}
