import React from 'react';
import { View, Text } from 'react-native';
import { } from 'react-native-elements';
import bip39 from 'bip39';
import _ from 'lodash';
import BitcoinJS from 'bitcoinjs-lib';
import { Component, Button } from '../components/*.js';
import styles from '../styles';
import csprng from '../modules/csprng';
import { addWallet } from '../modules/storage';

export default class Backup extends Component {
  constructor() {
    super();
    this.state = { mnemonic: '', loading: true };
    this.generateWords();
  }

  async generateWords() {
    this.setState({ loading: false, mnemonic: bip39.entropyToMnemonic(await csprng()) });
  }

  saveWallet() {
    const { mnemonic } = this.state;
    this.props.navigation.navigate('Pincode', {
      onFinish: async(pincode) => {
        this.setState({ loading: true });
        const seed = bip39.mnemonicToSeedHex(mnemonic, pincode);
        const address = BitcoinJS.HDNode.fromSeedHex(seed).keyPair.getAddress();
        await addWallet(seed, address);
        this.props.navigation.goBack();
        this.props.navigation.state.params.onFinish(address);
      },
    });
  }

  render() {
    const { mnemonic, loading } = this.state;
    const words = mnemonic.split(/\s/);
    return (
      <View style={styles.container}>
        <Text style={styles.helptext}>
          Please write down in a piece of paper your recovery seed, and keep it in a safe place.
          In case you lose this phone, you will need both the 12 words and your PIN code to recover the funds.
        </Text>
        {!loading &&
          <View style={styles.seed}>
            {words.map((w, i) => (
              <Text style={styles.seedWord} key={i}>{_.padStart(i + 1, 2)}: {w}</Text>
            ))}
          </View>}
        <View flex={1} />
        <Button disabled={loading} onPress={this.saveWallet} title="I've written it down" />
      </View>
    );
  }
}
