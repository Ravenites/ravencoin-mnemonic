# Examples

## Create Mnemonic Object

```javascript
const code = new Mnemonic();
```

## Get string phrase from Mnemonic Object

```javascript
const code = new Mnemonic();
code.toString();
```

## Set network as mainnet

```javascript
const code = new Mnemonic({ network: 'mainnet' });
code.toString();
```

## Check if Mnemonic Object is valid in Spanish

```javascript
const code = new Mnemonic({ language: 'spanish' });
const isValid = Mnemonic.isValid(code.toString());
```

## Generate a seed based on the code and optional passphrase.

```javascript
const code = new Mnemonic();
const passphrase = '';

const seedBuffer = code.toSeed({ passphrase });
```

## Get current HD Private Key

```javascript
const code = new Mnemonic();
const hdPrivateKey1 = code.getHDPrivateKey();
const hdPrivateKey2 = code.hdKey;
```

## Get word list in English

```javascript
const words = Mnemonic.words.english;
```

## Generate Addresses
```javascript
const code = new Mnemonic();
const addresses = code.generateAddresses()
```