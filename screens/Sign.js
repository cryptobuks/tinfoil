import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';
import { Button, Component } from '../components/*.js';
import { Card } from 'react-native-elements'
import BitcoinJS from '../modules/bitcoin';
import Blockies from 'blockies-bmp/react-native-component';
import { NavigationActions } from 'react-navigation'


const formatSatoshis = (satoshis) => {
  if(satoshis > 1e7) {
    return `${satoshis / 1e8} BTC`;
  } else if (satoshis > 1e5) {
    return `${satoshis / 1e6} bits`;
  } else {
    return `${satoshis} satoshis`
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  headerText: {
    fontWeight: 'bold',
    color: '#4f9deb',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  amountText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  addr: {
    fontFamily: 'monospace',
    fontSize: 12,
    textAlign: 'center',
  }

});

export default class SignScreen extends Component {
  state = {
    hexTx: '01000000016a026829df121fa06b25e632f3bb0898f1d26801c23516947c60957b090569a90100000000ffffffff0180aad603000000001976a9146b7bd2cb4aaa908a83c557a13d2ed25575aa3b1088ac00000000',
    wallets: [],
  };

  transactionOutputs(){
    const tx = BitcoinJS.Transaction.fromHex(this.state.hexTx);
    return tx.outs.map(({ script, value }) => ({
      value: value,
      address: BitcoinJS.address.fromOutputScript(script),
    }));
  }

  sign() {
    const tx = BitcoinJS.Transaction.fromHex(this.state.hexTx);
    const network = BitcoinJS.networks.bitcoin;
    const builder = BitcoinJS.TransactionBuilder.fromTransaction(tx, network);
    const ecPair = BitcoinJS.ECPair.fromWIF('5HzMRZ1YJgLuNHxxjHMUFHQ2xtpnHtndbmSXLNJNQhS2mvbNsh7', network);
    builder.sign(0, ecPair);
    this.props.navigation.navigate('QR', { hexTx: builder.build().toHex() });
  }

  render() {
    const outs = this.transactionOutputs();
    const sent = _.sumBy(outs, 'value')

    const output = ({value, address}, i) => (
      <View key={i}>
        <Text style={styles.amountText}>{formatSatoshis(sent)}</Text>
        <Text style={{textAlign: 'center'}}>to</Text>
        <View style={{flexDirection: 'row'}}>
          <Blockies opts={{seed: address}} />
          <View flex={1} style={{justifyContent: 'center'}}>
            <Text style={styles.addr}>{address}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sending</Text>
        {outs.map(output)}
        <View flex={1} />
        <Button onPress={this.sign} icon={{name:"lock-outline"}} title="SIGN TRANSACTION" />
      </View>
    );
  }

}


