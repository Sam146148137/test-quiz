// Local Modules
import AuthService from './auth.service';
import { ErrorsUtil } from '../utils';

const { UnauthorizedError, PermissionError } = ErrorsUtil;

export default class AuthMiddlaware {
  static authenticate(req, res, next) {
    try {
      const authorizationHeader = req.header.authorization;
      if (!authorizationHeader) throw new UnauthorizedError();

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) throw new UnauthorizedError();

      if (!req.cookies.userCookie || req.cookies.userCookie === undefined) {
        throw new UnauthorizedError();
      }

      const { refreshToken } = req.cookies.userCookie;
      if (!refreshToken) throw new UnauthorizedError();

      const user = AuthService.validateAccessToken(accessToken);
      if (!user) throw new UnauthorizedError();

      res.locals.auth = { user };
      next();
    } catch (error) {
      next(error);
    }
  }

  static authenticateFor(accessScopes) {
    const access = accessScopes.map((r) => `access:${r}`);
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw new UnauthorizedError('1');

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new UnauthorizedError('2');

        // if (!req.cookies.userCookie || req.cookies.userCookie === undefined) {
        //   throw new UnauthorizedError('3');
        // }
        //
        // const { refreshToken, scope } = JSON.parse(req.cookies.userCookie);
        // if (!refreshToken) throw new UnauthorizedError('4');

        const user = AuthService.validateAccessToken(accessToken);

        if (!user) throw new UnauthorizedError('5');

        const scope = `access:${user.role}`;

        if (!(access.includes(scope))) throw new PermissionError('6');
        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
