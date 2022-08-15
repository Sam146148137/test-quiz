// NPM Modules
import { CryptoUtil } from '../../src/utils';

const user = {
  firstName: 'admin',
  lastName: 'admin',
  age: 100,
  role: 'admin',
  email: 'admin@gmail.com',
  password: CryptoUtil.createHash('admin123$')
};
export default user;
