import React from 'react';
import blockies from 'blockies-bmp';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import PureComponent from '../components/Component';
import styles from '../styles';

export default class WalletItem extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    wallet: PropTypes.string.isRequired,
  };

  onPress() {
    this.props.onPress(this.props.wallet);
  }

  render() {
    const { wallet } = this.props;
    const uri = blockies.createDataURL({ seed: wallet });
    return (
      <ListItem
        avatar={{ uri }}
        titleStyle={styles.addr}
        title={wallet}
        onPress={this.onPress}
      />
    );
  }
}
