import React from 'react';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
import Btn from '../components/Button';
import Component from '../components/Component';
import styles from '../styles';
import { getWallets } from '../modules/storage';
import decodeTransactionRequest from '../modules/decodeTransactionRequest';
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';

export default class Main extends Component {
  state = {
    wallets: [],
  }

  async componentWillMount() {
    this.setState({ wallets: await getWallets() });
  }

  openQRTransaction() {
    this.props.navigation.navigate('QRReader', { onQR: this.signTransaction });
  }

  signTransaction(transactionRequest) {
    const txInfo = decodeTransactionRequest(transactionRequest, this.state.wallets);
    this.props.navigation.navigate('Sign', {
      txInfo,
      onSign: this.openResultQR,
    });
  }

  openResultQR(hexTx) {
    this.props.navigation.navigate('QR', { hexTx });
  }

  openWallets() {
    this.props.navigation.navigate('Wallets', this.state);
  }

  newWallet() {
    this.props.navigation.navigate('Backup', {
      onFinish: (wallet) => {
        this.setState({ wallets: [wallet, ...this.state.wallets] });
      },
    });
  }

  render() {
    const { wallets } = this.state;
    const dimensions = Dimensions.get('window');

    const imageWidth = Math.round(dimensions.width * 0.8);
    const imageHeight = 0.1105 * imageWidth;
    return (

      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.hbox}>
          <View flex={1} />
          <Image source={icon} style={{ width: imageWidth / 2, height: imageWidth / 2 }} />
          <View flex={1} />
        </View>
        <View style={styles.separator} />
        <View style={styles.separator} />
        <View style={styles.separator} />
        <View style={[styles.hbox, styles.separator]}>
          <View flex={1} />
          <Image source={logo} style={{ width: imageWidth, height: imageHeight }} />
          <View flex={1} />
        </View>
        <View style={styles.separator} />
        <View style={styles.separator} />
        <View style={styles.separator} />
        {!wallets.length && <Btn onPress={this.newWallet} title="Create wallet" />}
        {!!wallets.length && <Btn onPress={this.openWallets} title="Wallets" />}
        {!!wallets.length && <Btn onPress={this.openQRTransaction} title="Sign Transaction" />}
      </View>
    );
  }
}

