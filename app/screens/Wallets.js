import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-elements';
import { Component, WalletItem } from '../components/*.js';
import { getWallets } from '../modules/storage';

//  <View key={wallet} styles={styles.walletItem}>
//    <Blockies opts={{ seed: wallet }} style={{ backgroundColor: 'red', width: 48, height: 48 }} />
//    <Text style={styles.tabBarInfoText}>{wallet} - t</Text>
//  </View>

export default class Wallets extends Component {
  static headerRightLabel() {
    return 'Add Wallet';
  }

  constructor() {
    super();
    this.state = { wallets: [] };
  }

  async componentWillMount() {
    await this.refresh();
  }

  componentDidMount() {
    this.props.navigation.setParams({ onHeaderRight: this.onHeaderRight });
  }

  onHeaderRight() {
    this.props.navigation.navigate('Backup', {
      onFinish: (wallet) => {
        this.openWallet(wallet);
        this.refresh();
      },
    });
  }

  async refresh() {
    this.setState({ wallets: await getWallets() });
  }

  openWallet(wallet) {
    this.props.navigation.navigate('Wallet', { wallet, onDelete: this.refresh });
  }

  render() {
    const { wallets } = this.state;
    const res = (
      <ScrollView>
        <List containerStyle={{ marginTop: 0 }}>
          { wallets.map(w => (<WalletItem wallet={w} key={w} onPress={this.openWallet} />)) }
        </List>
      </ScrollView>
    );
    return res;
  }
}
