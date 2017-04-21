### Install
```js
$ npm install --save string-mangle
```
### Usage
```js
const string = require('./index.js');
const obj ={name:'liangklfangl',sex:'male'};
console.log(string.stringify(obj));
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
