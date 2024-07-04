import axios from 'axios';

type Response = {
  token: string;
  expire: number;
  user: {
    id: string;
    auth_id: string;
    auth_type: string;
    wallet_address: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

type IAuth = {
  login: (token: string) => Promise<Response>;
};

const auth: IAuth = {
  login: async (token: string): Promise<Response> => {
    const response = await axios.post(
      `https://api.supermigrate.xyz/v1/launchbox/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data?.data;
  },
};

export default auth;
