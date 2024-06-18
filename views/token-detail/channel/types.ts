import { Token } from '@/store/token/types';

interface IChannel {
  token?: Token;
  userRole: 'admin' | 'user';
}

export default IChannel;
