export type Network = 'mainnet' | 'testnet';

export type Options = {
  mnemonic?: string;
  network?: Network | string;
  passphrase?: string;
  language?: string;
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
