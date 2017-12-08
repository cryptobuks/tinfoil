import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Btn from '../components/Button';
import Component from '../components/Component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});

export default class Main extends Component {
  state = {
    wallets: [],
    qrOpen: false,
  }

  async componentWillMount() {
    const wallets = await AsyncStorage.getItem('wallets');
    this.setState({ wallets: wallets ? JSON.parse(wallets) : ['a'] });
  }

  openQRWallet() {
    this.props.navigation.navigate('QRReader', { onQR: this.addWallet });
  }

  openQRTransaction() {
    //this.props.navigation.navigate('QRReader', { onQR: this.signTransaction });
    //this.props.navigation.navigate('Sign', { transaction: '' });
    this.props.navigation.navigate('QR', { hexTx: 'FFFFFFFF' })
  }

  openWallets() {
    console.log(this.state);
    this.props.navigation.navigate('Wallets', this.state);
  }

  addWallet(data) {
    this.setState({ wallets: this.state.wallets.concat([data]) });
  }

  signTransaction(data) {
    this.props.navigation.navigate('SignTransaction', { data });
  }

  render() {
    const { wallets = [], qrOpen } = this.state;
        //{!!wallets.length && <Button onPress={this.openWallets} title="View wallets" />}


        //<Btn onPress={this.openQRWallet} title="Add Wallet" />
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>T I N F O I L</Text>

        <Btn onPress={this.openWallets} title="Wallets" />
        {!!wallets.length && <Btn onPress={this.openQRTransaction} title="Sign Transaction" />}
      </View>
    );
  }
}

