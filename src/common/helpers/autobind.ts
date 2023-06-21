//====================================================================
//
//    ###    ##   ##  ######   #####   #####   ##  ##     ##  ####
//   ## ##   ##   ##    ##    ##   ##  ##  ##  ##  ####   ##  ##  ##
//  ##   ##  ##   ##    ##    ##   ##  #####   ##  ##  ## ##  ##  ##
//  #######  ##   ##    ##    ##   ##  ##  ##  ##  ##    ###  ##  ##
//  ##   ##   #####     ##     #####   #####   ##  ##     ##  ####
//
//====================================================================

/**
 * This function can bind class to itself
 * It can be useful to bind class to itself when we use it in router
 * 1. Import autobind into class
 * 2. call it and pass this in constructor
 *
 * @param {*} instance
 */
function autobind(instance) {
  const proto = Object.getPrototypeOf(instance)
  const propertyNames = Object.getOwnPropertyNames(proto)

  for (const name of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name)

    if (descriptor)
      if (typeof descriptor.value === 'function' && name !== 'constructor') {
        Object.defineProperty(instance, name, {
          value: descriptor.value.bind(instance),
          configurable: true,
          enumerable: false,
          writable: true,
        })
      }
  }
}

export default autobind
