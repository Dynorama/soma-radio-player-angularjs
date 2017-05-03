const createId = obj => {
  let newObj = Object.assign({}, obj)

  newObj.id = btoa(JSON.stringify(newObj))

  return newObj
}

const tupleListToObj = tupleList => {
  return tupleList.reduce((obj, keyValue) => {
    if (keyValue[0] && keyValue[0] != undefined) {
      obj[keyValue[0]] = keyValue[1] || ''
    }
    return obj
  }, {})
}

const compose = (...fns) => {
  return function(args) {
    fns.reduceRight((composed, f) => f(composed), args);
  }
}

const styleElement = (elmName, styleStr) => {
  const applyStyle = style => elm => (elm.style = style, elm);
  const selectElm = name => document.querySelector(name);
  const styleElm = compose(
    applyStyle(styleStr),
    selectElm
  );

  return styleElm(elmName);
}
export default function utils() {
  'ngInject';

  return {
    createId,
    tupleListToObj,
    compose,
    styleElement,
    safeApply: (scope, fn) => {
      let phase = scope.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn !== undefined && (typeof fn === 'function')) {
          fn();
        }
      } else {
        scope.$apply();
      }
    }
  }
}

export {
  createId,
  tupleListToObj,
  compose,
  styleElement,
}
