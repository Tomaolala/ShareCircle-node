import { Request, Response, NextFunction, Router } from 'express';
import { getAllFiles } from '../utils';
import { RouteDefinition } from '../types';
import { getInjectionsPerRequest, Injector } from '../decorators/injector';
import { META_KEYS } from '../decorators/constants';
import { errorLog, requestLog, resopseLog } from '../../logger/httpLogger';

const app = Router();

export function useController(controllerDir: string) {
  const controllers = getAllFiles(controllerDir, []);

  controllers.forEach((c) => {
    const obj = require(c.path);
    const controller = obj.default || class {};

    // register api routes
    const prefix = Reflect.getMetadata(META_KEYS.PREFIX, controller) || c.name;
    const apiRoutes: Array<RouteDefinition> = Reflect.getMetadata(META_KEYS.ROUTES, controller) || [];
    apiRoutes.forEach(({ methodName, requestMethod, path }) => {
      const instance = Injector.resolve(controller);
      const route = `${prefix}${path}`;
      app[requestMethod](route, async (req: Request, res: Response, next: NextFunction) => {
        try {
          const startTime = requestLog(req, controller.name, methodName);
          const injections = getInjectionsPerRequest({ instance, methodName, req, res, next });
          const data = await instance[methodName](...injections);
          res.json({ code: 200, data });
          resopseLog(req, data, startTime);
        } catch (error) {
          const statusCode = error?.code || 500;
          res.status(statusCode);
          res.json({
            code: statusCode,
            message: error?.message || 'system error',
          });
          errorLog(req, error);
        }
      });
    });
  });

  return app;
}
