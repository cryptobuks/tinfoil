import { SecureStore } from 'expo';
import _ from 'lodash';

async function setWallets(wallets) {
  await SecureStore.setItemAsync('wallets', JSON.stringify(wallets));
}

export async function getWallets() {
  return JSON.parse(await SecureStore.getItemAsync('wallets') || '[]');
}

export async function addWallet(mnemonic, address) {
  await setWallets(_.union(await getWallets(), [address]));
  await SecureStore.setItemAsync(address, mnemonic, { keychainAccessible: SecureStore.WHEN_UNLOCKED });
}

export async function getMnemonic(address) {
  await SecureStore.getItemAsync(address);
}

export async function deleteWallet(address) {
  await setWallets(_.difference(await getWallets(), [address]));
  await SecureStore.deleteItemAsync(address);
}
