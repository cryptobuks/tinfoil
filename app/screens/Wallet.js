import React from 'react';
import { View, Text, Alert } from 'react-native';
import QRCode from '../components/QRCode';
import { Component, Button } from '../components/*.js';
import styles from '../styles';
import { deleteWallet } from '../modules/storage';

//  <View key={wallet} styles={styles.walletItem}>
//    <Blockies opts={{ seed: wallet }} style={{ backgroundColor: 'red', width: 48, height: 48 }} />
//    <Text style={styles.tabBarInfoText}>{wallet} - t</Text>
//  </View>

export default class Wallets extends Component {
  openWallet(wallet) {
    this.props.navigation.navigate('Wallet', { wallet });
  }

  delete() {
    const { wallet } = this.props.navigation.state.params;
    const remove = async() => {
      await deleteWallet(wallet);
      await this.props.navigation.state.params.onDelete();
      this.props.navigation.goBack();
    };
    Alert.alert('Delete Wallet', `Are you sure you want to delete ${wallet}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes, Delete', onPress: remove },
    ]);
  }

  render() {
    const { wallet } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.addr}>{wallet}</Text>
        <View style={styles.separator} />
        <View style={{ alignItems: 'center' }}>
          <QRCode size={200} value={wallet} />
        </View>
        <View style={styles.separator} />
        <Text style={styles.helptext}>This is the address of your wallet. You can share it to get paid.</Text>
        <View flex={1} />
        <Button title="DELETE THIS WALLET" onPress={this.delete} />
      </View>
    );
  }
}
