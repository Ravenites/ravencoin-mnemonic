export type Options = {
  mnemonic?: string;
  network?: 'mainnet' | 'main' | 'testnet' | 'test';
  passphrase?: string;
  language?:
    | 'chinese_simplified'
    | 'chinese_traditional'
    | 'czech'
    | 'english'
    | 'french'
    | 'italian'
    | 'japanese'
    | 'korean'
    | 'portuguese'
    | 'spanish';
  account?: number;
};

export type ToSeedOptions = {
  mnemonic?: string;
  passphrase?: string;
};

export type GenerateAddressSet = {
  recieveAddress: GeneratedAddress;
  changeAddress: GeneratedAddress;
};

export type GeneratedAddress = {
  privateKey: string;
  address: string;
  path: string;
  wif: string;
};

export type Inspect = {
  mnemonic: string;
  seed: Buffer;
  hexString: string;
  entropy: string;
};
