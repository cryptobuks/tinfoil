import {
  Text,
  View,
} from 'react-native';
import React from 'React';
import Blockies from 'blockies-bmp/react-native-component';
import bip39 from 'bip39';
import { Button, Component } from '../components/*.js';
import BitcoinJS from '../modules/bitcoin';
import styles from '../styles';
import { getMnemonic } from '../modules/storage';


const formatSatoshis = (satoshis) => {
  if (satoshis > 1e7) {
    return `${satoshis / 1e8} BTC`;
  } else if (satoshis > 1e5) {
    return `${satoshis / 1e6} bits`;
  }
  return `${satoshis} satoshis`;
};


export default class SignScreen extends Component {
  async sign() {
    const { tx, signAddress, signInputs } = this.props.navigation.state.params.txInfo;
    const network = BitcoinJS.networks.bitcoin;
    const builder = BitcoinJS.TransactionBuilder.fromTransaction(tx, network);

    this.props.navigation.navigate('Pincode', {
      wallet: signAddress,
      onFinish: async(pincode) => {
        const hexSeed = bip39.mnemonicToSeedHex(await getMnemonic(signAddress), pincode);
        const ecPair = BitcoinJS.HDNode.fromSeedHex(hexSeed).keyPair;
        signInputs.forEach(i => builder.sign(i, ecPair));
        this.props.navigation.navigate('QR', { hexTx: builder.build().toHex() });
      },
    });
  }


  render() {
    const { outputs } = this.props.navigation.state.params.txInfo;

    const output = ({ value, address }, i) => (
      <View key={i}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Blockies opts={{ seed: address }} />
          <View flex={1}>
            <Text style={styles.amountText}>{formatSatoshis(value)}</Text>
            <Text style={{ textAlign: 'center' }}>to</Text>
            <Text style={styles.addr}>{address}</Text>
          </View>
        </View>
      </View>
    );

    const myOutputs = outputs.filter(o => o.isMine);
    const otherOutputs = outputs.filter(o => !o.isMine);

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sending</Text>
        {(otherOutputs.length ? otherOutputs : myOutputs).map(output)}
        <View flex={1} />
        <Button onPress={this.sign} icon={{ name: 'lock-outline' }} title="SIGN TRANSACTION" />
      </View>
    );
  }
}
