export interface Bounty {
  author: string;
  subject: string;
  heads: { username: string; accepted: boolean }[];
  tags: string[];
}
