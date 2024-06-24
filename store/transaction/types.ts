type Transaction = {
  name: string;
  description: string;
  channel_id: string;
  image_url: string;
  lead_ids: string[];
  dapp_name: string;
  url: string;
  follower_count: number;
  created_at: string;
};

export type { Transaction };
