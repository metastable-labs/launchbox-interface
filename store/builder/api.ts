import { axiosInstance } from '@/utils/axios';

type IBuilder = {
  updateBuilderData: (data: FormData, id: string) => Promise<any>;
};

const builder: IBuilder = {
  updateBuilderData: async (data: FormData, id: string): Promise<any> => {
    const response = await axiosInstance.patch(`launchbox/tokens/${id}/website-builder`, data);

    return response.data.data;
  },
};

export default builder;
