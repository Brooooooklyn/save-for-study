/// <reference path="../node_modules/teambition-sdk/teambition.d.ts" />

interface NodeRequire {
  ensure<T = any>(...args: any[]): Promise<T>
}
