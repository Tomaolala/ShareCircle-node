/**
 * 参数异常：适用于接口或者方法调用参数少传或者错传的情况
 */
export class ParamsError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'ParamsError';
    this.message = message || '参数异常';
  }
}
/**
 * 数据库异常：适用于数据库操作发生的异常
 */
export class DatabaseError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'DatabaseError';
    this.message = message || '数据库异常';
  }
}
/**
 * 鉴权异常：适用于鉴权失败情况
 */
export class AuthError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'AuthFailure';
    this.message = message || '鉴权失败';
  }
}

/**
 * 数据权限：适用于当前用户没有数据权限的情况
 */
export class DataAuthError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'DataAuthFailure';
    this.message = message || '当前用户没有该数据的权限';
  }
}

/**
 * 系统异常：适用于无法预估的异常
 * 使用示例：
 * ```
 * try{
 *  ...
 * } catch (error) {
    throw new SystemError(`${error.name}:${error.message}`);
  }
 * ```
 */
export class SystemError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'SystemError';
    this.message = message || '系统异常';
  }
}

/**
 * 自定义异常：需要自己定义CODE
 */
export class CustomError extends Error {
  constructor(code: string, message?: string) {
    super();
    this.name = code;
    this.message = message;
  }
}
