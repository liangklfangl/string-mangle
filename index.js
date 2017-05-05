const path = require("path");
const R = require("ramda");

function stringify(node, depth = 0) {
  const indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return `[\n` +
      node.map(item => `${indent}  ${stringify(item, depth + 1)}`).join(',\n') +
      `\n${indent}]`;
  }
  if (
    typeof node === 'object' &&
      node !== null &&
      !(node instanceof Date)
  ) {
    return `{\n` +
      Object.keys(node).map((key) => {
        const value = node[key];
        return `${indent}  "${key}": ${stringify(value, depth + 1)}`;
      }).join(',\n') +
      `\n${indent}}`;
  }
  return JSON.stringify(node, null, 2);
}
/**
 * [Stringify file tree]
 * @param  {[type]}  filesTree [description]
 * @param  {[type]}  lazyLoad  [description]
 */
function stringifyTree(filesTree){
  return stringifyPattern('/', filesTree, 0);
}
 
 /**
  * @param  {[type]} nodePath  [description]
  * @param  {[type]} nodeValue [File tree object]
  * @param  {[type]} depth     [description]
  * @return {[type]}           [description]
  */
function stringifyPattern(nodePath, nodeValue, depth) {
  const indent = '  '.repeat(depth);
  return R.cond([
    [(n) => typeof n === 'object', (obj) => {
      return `{\n${stringifyObject(nodePath, obj, depth)}\n${indent}}`;
    }],
    [R.T, (filename) => {
      //We already get absolute filename 
      const filePath = path.join(process.cwd(), filename).split(path.sep).join("/");
      return `require('${filePath}')`;
    }]
  ])(nodeValue);
}

/**
 * [stringify Object]
 * @param  {[type]}  nodePath [description]
 * @param  {[type]}  obj      [description]
 */
function stringifyObject(nodePath, obj, depth) {
  let keyLength = R.keys(obj).length;
  const indent = '  '.repeat(depth);
  const pairs = R.toPairs(obj);
  //R.toPairs({a: 1, b: 2, c: 3}); 
  //=> [['a', 1], ['b', 2], ['c', 3]]
  const kvStrings = pairs.map((kv,index)=>{
    const comma = (index+1) == keyLength ? "" : ",";
    return `${indent}  '${kv[0]}': ${stringifyPattern(nodePath + '/' + kv[0], kv[1],  depth + 1)}${comma}`;
  });
 
  return kvStrings.join('\n');
}
module.exports = {
  stringify,
  stringifyTree
}