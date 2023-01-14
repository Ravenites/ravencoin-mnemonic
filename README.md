![Ravenite Mnemonic Banner](https://github.com/Ravenites/ravencoin-mnemonic/raw/main/media/repo-banner.png)

# Ravenite - Ravencoin Mnemonic

[![NPM Package](https://img.shields.io/npm/v/@ravenite/ravencoin-mnemonic.svg?style=flat-square)](https://www.npmjs.org/package/@ravenite/ravencoin-mnemonic)

**A Ravenite module for [ravencoin](https://github.com/RavenProject/Ravencoin) that implements Mnemonic code for generating deterministic keys.**

## Getting Started

```sh
# Using npm
npm install @ravenite/ravencoin-mnemonic

# Using yarn
yarn add @ravenite/ravencoin-mnemonic
```

## Usage

```javascript
import { Mnemonic } from '@ravenite/ravencoin-mnemonic';

const code = new Mnemonic({ network: 'mainnet' });

code.toString();
```

## Parameters

| Name       | Type   | Default Value | Description                                                                       |
| ---------- | ------ | ------------- | --------------------------------------------------------------------------------- |
| mnemonic   | string | undefined     | Seed phrase (e.g. job shop small, etc...)                                         |
| network    | string | testnet       | Blockchain network you are generating for                                         |
| passphrase | string | undefined     | String to strengthen encryption with the seed phrase                              |
| language   | string | english       | Language to generate seed phrase in                                               |
| account    | number | undefined     | If you would like to start the receive and change path from a number other than 0 |

## Examples

See [EXAMPLES.md](https://github.com/Ravenites/ravencoin-mnemonic/blob/main/EXAMPLES.md) for developer guides.

## Available Mnemonic Languages

- chinese_simplified
- chinese_traditional
- czech
- english
- french
- italian
- japanese
- korean
- portuguese
- spanish

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) at base of repo for information about how to contribute.

## License

Code released under [the MIT license](./LICENSE.md).
