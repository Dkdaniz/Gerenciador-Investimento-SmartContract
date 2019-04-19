<<<<<<< HEAD
#Invest Manager SMART CONTRACTS

## System Example

![Alt Text](/markdown/plataform.gif)

![Alt Text](/markdown/home.png)

![Alt Text](/markdown/etherscan.png)


=======
# INVEST MANAGER SMART CONTRACTS
>>>>>>> 7dd0be9bd2a4619f7e6a6d62a0ef805c680c3541
### Development Scripts

```bash
# Install yarn
npm i -g yarn

# Install dependencies
yarn

# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```

### Error building
```
Uncaught Error: More than one instance of bitcore-lib found. Please make sure to require bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.
```
#### 1- node_modules\bitcore-lib\index.js
#### 2- node_modules\bitcore-mnemonic\node_modules\bitcore-lib\index.js

Before
```
// module information
bitcore.version = 'v' + require('./package.json').version;
bitcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of bitcore-lib found. ' +
      'Please make sure to require bitcore-lib and check that submodules do' +
      ' not also include their own bitcore-lib dependency.';
    throw new Error(message);
  }
};
```

After
```
// module information
bitcore.version = 'v' + require('./package.json').version;
bitcore.versionGuard = function(version) {
return;
  if (version !== undefined) {
    var message = 'More than one instance of bitcore-lib found. ' +
      'Please make sure to require bitcore-lib and check that submodules do' +
      ' not also include their own bitcore-lib dependency.';
    throw new Error(message);
  }
};
```
