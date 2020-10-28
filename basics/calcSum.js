"use strict";
const addNums = (...a) => a.reduce((acc, val) => acc + val);
const nums = [5, 6, 7, 8, 9, 8, 7, 7];
console.log(addNums(...nums));
