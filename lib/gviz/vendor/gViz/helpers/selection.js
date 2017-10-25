"use strict";

// https://github.com/wbkd/d3-extended

d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    return this.parentNode.appendChild(this);
  });
};
