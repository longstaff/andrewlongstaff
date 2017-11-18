export const CODE_REDUCE = 'com.andrewlongstaff.game.code.reduce';
export const CODE_ADD = 'com.andrewlongstaff.game.code.add';

export function addCodeLines(count) {
  return {
    type: CODE_ADD,
    count
  };
}
export function reduceCodeLines(count) {
  return {
    type: CODE_REDUCE,
    count
  };
}
