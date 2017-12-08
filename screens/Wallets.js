import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Component from '../components/Component';

const WalletItem = (wallet) => (
  <View key={wallet}>
    <Text style={styles.tabBarInfoText}>{wallet}</Text>
    <Button onPress={() => true} title="Remove" />
  </View>
);

export default class Wallets extends Component {
  render() {
    const { wallets = [] } = this.props.navigation.state;
    console.log(wallets);
    return (
      <View style={styles.container}>
        { WalletItem('a') }
        { wallets.map(WalletItem) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
