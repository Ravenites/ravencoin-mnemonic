import * as bip39 from 'bip39';
import CoinKey from 'coinkey';
import HDKey from 'hdkey';
import { rvn } from '@hyperbitjs/chains';

import {
  GenerateAddressSet,
  GeneratedAddress,
  Inspect,
  Options,
  ToSeedOptions,
} from './types';

export class Mnemonic {
  mnemonic: string;
  passphrase?: string;
  seed: Buffer;
  network: Record<string, any> | undefined = undefined;
  hdKey: HDKey | undefined = undefined;
  static words: any = bip39.wordlists;
  account: number = 0;
  receiveAddresses = new Map();
  changeAddresses = new Map();

  constructor(options: Options = {}) {
    if (options.language) {
      bip39.setDefaultWordlist(options.language);
    }

    this.mnemonic = options.mnemonic
      ? options.mnemonic
      : bip39.generateMnemonic();
    this.account = options.account || 0;
    this.passphrase = options.passphrase;
    this.seed = this.toSeed({
      mnemonic: this.mnemonic,
      passphrase: this.passphrase,
    });
    Mnemonic.isValid(this.mnemonic);

    this.network = this._getNetwork(options.network);
    this.hdKey = this.toHDPrivateKey(this.mnemonic, options.network);
  }

  private _getNetwork(name?: string): Record<string, any> {
    if (this.network) {
      return this.network;
    }
    if (name === 'mainnet' || name === 'main') {
      return rvn.main;
    }
    return rvn.test;
  }

  public toSeed(options: ToSeedOptions): Buffer {
    const mn = options.mnemonic || this.mnemonic;
    const p = options.passphrase || this.passphrase;
    if (mn) {
      this.seed = bip39.mnemonicToSeedSync(mn, p);
      return this.seed;
    } else {
      throw new Error('Invalid arguments: mnemonic');
    }
  }

  public getHDPrivateKey(): HDKey {
    return this.hdKey as HDKey;
  }

  public toHDPrivateKey(mnemonic?: string, network?: string): HDKey {
    const mn = mnemonic || (this.mnemonic as string);
    const nw = this.network || this._getNetwork(network);
    const seed = this.toHexString(bip39.mnemonicToSeedSync(mn));

    const hDPrivateKey = HDKey.fromMasterSeed(
      Buffer.from(seed, 'hex'),
      nw.bip32
    );

    return hDPrivateKey;
  }

  public toString(): string {
    return this.mnemonic as string;
  }

  public toHexString(seed?: Buffer): string {
    if (!seed) {
      throw new Error('Seed Buffer not provided');
    }
    return seed.toString('hex');
  }

  static isValid(mnemonic?: string): boolean {
    if (!mnemonic) {
      throw new Error('Mnemonic not provided');
    }
    return bip39.validateMnemonic(mnemonic);
  }

  public inspect(): Inspect {
    return {
      mnemonic: this.mnemonic,
      seed: this.seed,
      hexString: this.toHexString(this.seed),
      entropy: bip39.mnemonicToEntropy(this.mnemonic as string),
    };
  }

  public toJSON(): Inspect {
    return this.inspect();
  }

  /**
   * Generate and store a receive and change address for the submitted index.
   *
   * If not specified, index will be autogenerated from the last highest index.
   *
   * If index is defined, it is expected that the user wants to generate or retrieve an existing addresses information.
   * @param {number=} index Address index to generate.
   * @return {GenerateAddressSet}
   */
  public generateAddresses(index?: number): GenerateAddressSet {
    // Get sorted receive addresses.
    const receiveAddressArr = Array.from(this.receiveAddresses).sort(
      (a, b) => a[0] - b[0]
    );

    // Find last receive address and its' index.
    const lastReceiveAddress = receiveAddressArr[receiveAddressArr.length - 1];
    const lastIndex = lastReceiveAddress?.[0];

    // If index is user defined, skip, and honor the request.
    // If index is undefined and there is a lastIndex, increment to generate new address.
    if (index === undefined) {
      if (typeof lastIndex === 'number') {
        index = lastIndex + 1;
      } else {
        index = 0;
      }
    }

    const bip44Version =
      this.network?.versions?.bip44 || rvn.test.versions.bip44;

    const recievePath = `m/44'/${bip44Version}'/${this.account}'/0/${index}`;
    const changePath = `m/44'/${bip44Version}'/${this.account}'/1/${index}`;

    const recieveAddress = this.generateAddress(recievePath);
    const changeAddress = this.generateAddress(changePath);

    const mappedReceiveAddress = this.receiveAddresses.get(index);
    if (!mappedReceiveAddress) {
      this.receiveAddresses.set(index, recieveAddress);
    }

    const mappedChangeAddress = this.changeAddresses.get(index);
    if (!mappedChangeAddress) {
      this.changeAddresses.set(index, changeAddress);
    }

    return {
      recieveAddress,
      changeAddress,
    };
  }

  /**
   * Generate a single address for receive or change.
   *
   * Is not automatically stored in the class.
   * @example
   * // First Wallet Receive Address
   * mnemonic.generateAddress('`m/44'/175'/0'/0/0`)
   * @example
   * // First Wallet Change Address
   * mnemonic.generateAddress('`m/44'/175'/0'/1/0`)
   * @param path The derive path of the address.
   * @returns {GeneratedAddress}
   */
  public generateAddress(path: string): GeneratedAddress {
    const derived = this.hdKey!.derive(path);
    const ck = new CoinKey(derived.privateKey, this.network);

    return {
      privateKey: ck.privateKey.toString('hex'),
      address: ck.publicAddress,
      path,
      wif: ck.privateWif,
    };
  }
}
