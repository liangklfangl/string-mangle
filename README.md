## Install
```js
$ npm install --save string-mangle
```
## Usage
```js
const Smangle = require('./index.js');
const obj ={name:'liangklfangl',sex:'male'};
console.log(Smangle.stringify(obj));
```
Then you will get something bellow(A valid json):
```js
{
  "name": "liangklfangl",
  "sex": "male",
  "school": {
    "location": "DLUT",
    "age": 68
  }
}
```

## API

(1)stringify:func(obj):

This method will stringify an object as above

(2)stringifyTree:func(fileTree)

This method will stringify an [file tree object](https://www.npmjs.com/package/grob-files).

Input is:
```js
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
```
Then you get something bellow returned:
```js
{
  'filelists': {
    'hello': require('C:/Users/Administrator/Desktop/string-mangle/filelists/hello.md')
    'index': require('C:/Users/Administrator/Desktop/string-mangle/filelists/index.md')
    'md': {
      'fol': {
        'index': require('C:/Users/Administrator/Desktop/string-mangle/filelists/md/fol/index.md')
      }
      'index': require('C:/Users/Administrator/Desktop/string-mangle/filelists/md/index.md')
    }
  }
}
```



