//=======================================================================================================
//
//  #####   ##  ##     ##  ####          ##  ##     ##   ####  ######    ###    ##     ##   ####  #####
//  ##  ##  ##  ####   ##  ##  ##        ##  ####   ##  ##       ##     ## ##   ####   ##  ##     ##
//  #####   ##  ##  ## ##  ##  ##        ##  ##  ## ##   ###     ##    ##   ##  ##  ## ##  ##     #####
//  ##  ##  ##  ##    ###  ##  ##        ##  ##    ###     ##    ##    #######  ##    ###  ##     ##
//  #####   ##  ##     ##  ####          ##  ##     ##  ####     ##    ##   ##  ##     ##   ####  #####
//
//=======================================================================================================

/**
 * This decorator use on top of class to inject and use it in router
 * It is just like autobind and bind class to each method
 * 1. Import this decorator on top of class
 * 2. use it like @BindInstance before class name
 *
 * @template T
 * @param {T} constructor
 * @return {*}
 */
function BindInstance<T extends { new (...args: any[]): any }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      Object.getOwnPropertyNames(constructor.prototype)
        .filter((key) => typeof this[key] === 'function')
        .forEach((key) => {
          this[key] = this[key].bind(this)
        })
    }
  }
}

export default BindInstance
