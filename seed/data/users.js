// NPM Modules
import { CryptoUtil } from '../../src/utils';

const user = {
  firstName: 'admin',
  lastName: 'admin',
  age: 50,
  role: 'admin',
  phone: '+37477620493',
  email: 'admin@gmail.com',
  password: CryptoUtil.createHash('admin123$')
};
export default user;
