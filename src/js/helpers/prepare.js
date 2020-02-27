/* Clearing variables */

import { getPositionIn, getPositionOut } from './offsetCalculator';
import getInlineOption from './getInlineOption';

const disable = function(el, options) {
  el.node.setAttribute('data-aos', '');
  el.node.removeAttribute('data-aos-easing');
  el.node.removeAttribute('data-aos-duration');
  el.node.removeAttribute('data-aos-delay');   
  if (options.initClassName) {
    el.node.classList.remove(options.initClassName);
  }    
  if (options.animatedClassName) {
    el.node.classList.remove(options.animatedClassName);
  }
};

const prepare = function($elements, options) {
  $elements.forEach((el, i) => {
    const mirror = getInlineOption(el.node, 'mirror', options.mirror);
    const once = getInlineOption(el.node, 'once', options.once);
    const id = getInlineOption(el.node, 'id');
    const disableAnimation = getInlineOption(el.node, 'disable-animation');
    const customClassNames = options.useClassNames && el.node.getAttribute('data-aos');

    const animatedClassNames = [options.animatedClassName]
      .concat(customClassNames ? customClassNames.split(' ') : [])
      .filter(className => typeof className === 'string');

    if(disableAnimation){
        disable(el, options)
    }

    if (options.initClassName) {
      el.node.classList.add(options.initClassName);
    }

    el.position = {
      in: getPositionIn(el.node, options.offset, options.anchorPlacement),
      out: mirror && getPositionOut(el.node, options.offset)
    };

    el.options = {
      once,
      mirror,
      animatedClassNames,
      id,
      disableAnimation
    };
  });

  return $elements;
};

export default prepare;
