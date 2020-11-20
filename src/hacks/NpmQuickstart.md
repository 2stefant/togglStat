# Quick start guide how to create an npm package.
### Create [npm](https://www.npmjs.com/) private account.
### Create public [github](https://github.com/) repository.
### Add _package.json_ file to repository root folder.
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
Add _index.js_ file in repository root folder.
``` javascript
module.exports = function howto() {
  return "Hello npm package howto";
};
```
Login user versus npm

` npm adduser`
   - Add your npm user account, password and associated email.

Publish package

`npm publish --access=public`

Consume package (application that shall use your npm package)

`npm install "@npm_account_name/howto"`

Reference package (in your javascript code file)
``` javascript
const howto = require("@npm_account_name/howto");
console.log(howto());
```
Update package (when a new version is available)

`npm update "@npm_account_name/howto"` 

