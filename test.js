const string = require('./index.js');
// const obj ={name:'liangklfangl',sex:'male',school:{location:"DLUT",age:68}};
// console.log(string.stringify(obj));

const filetree = { filelists:
   { hello: 'filelists/hello.md',
     index: 'filelists/index.md',
     md:
      { fol: { 
        index: 'filelists/md/fol/index.md'
         },
        index: 'filelists/md/index.md' 
     }
 }
}
console.log("stringifyTree return:",string.stringifyTree(filetree));