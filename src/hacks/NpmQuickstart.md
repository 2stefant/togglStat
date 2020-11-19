# Quick start guide how to create an npm package.
1. Create [npm](https://www.npmjs.com/) private account.
2. Create public [github](https://github.com/) repository.
3. Add _package.json_ file to repository root folder.
```
{
  "name": "@npm_account_name/howto",
  "version": "0.0.1",
  "description": "A description",
  "license": "MIT",
  "repository": "a_github_account_name/howto",
  "main": "index.js",
  "keywords": [
    "howto",
    "npm",
    "package",
    "a_github_account_name"
  ]
}
```
4. Add _index.js_ file in repository root folder.
``` javascript
module.exports = function howto() {
  return "Hello npm package howto";
};
```
5. Open npm command prompt, type:
``` 
$ npm adduser
``` 
   - Add your npm user account, password and associated email.

6. In the same npm command prompt, publish your package by typing:
``` 
$ npm publish --access=public
``` 
7. In your consumer application that shall use your npm package, type in the npm prompt:
``` 
$ npm install "@npm_account_name/howto"
``` 
8. In one of your javascript code files type:
``` javascript
const howto = require("@npm_account_name/howto");
console.log(howto());
```
9. When a new version of the npm package is available, type:

```
$ npm add "@npm_account_name/howto"
```
