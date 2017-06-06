interface NodeRequire {
  ensure<T = any>(...args: any[]): Promise<T>
}
