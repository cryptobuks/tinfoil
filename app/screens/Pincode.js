import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { Component, Button } from '../components/*.js';
import styles from '../styles';

const PIN_LENGTH = 8;

export default class Pincode extends Component {
  constructor(props) {
    super(props);
    this.state = { pincode: '', loading: false };
  }

  onBtnPress(num) {
    this.setState({ pincode: this.state.pincode + num });
  }

  onFinish() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.navigation.state.params.onFinish(this.pincode);
      this.props.navigation.goBack();
    }, 100);
  }

  backSpace() {
    const { pincode } = this.state;
    this.setState({ pincode: pincode.substr(0, pincode.length - 1) });
  }

  render() {
    const { pincode, loading } = this.state;
    const { wallet } = this.props.navigation.state.params;
    const btn = props => (<Button containerViewStyle={{ width: 60 }} borderRadius={0} {...props} />);
    const numberBtn = n => btn({
      disabled: pincode.length >= PIN_LENGTH,
      title: n.toString(),
      onPress: () => this.onBtnPress(n),
    });

    return (
      <View style={styles.container}>
        <Text style={styles.helptext}>
          {
            wallet
            ? (<Text style={styles.helptext}>Please input your pincode for the wallet {wallet}</Text>)
            : (<Text style={styles.helptext}>
                Please provide a pincode to encrypt your wallet. This pincode will be asked every time you want to make a transaction, since private keys are stored encrypted.
               </Text>)
          }
        </Text>
        <Text style={styles.pincode}>
          {_.range(PIN_LENGTH).map(i => (pincode.length <= i ? '_' : '*')).join(' ')}
        </Text>
        <View style={styles.hbox}>
          { numberBtn(1) }
          { numberBtn(2) }
          { numberBtn(3) }
        </View>
        <View style={styles.hbox}>
          { numberBtn(4) }
          { numberBtn(5) }
          { numberBtn(6) }
        </View>
        <View style={styles.hbox}>
          { numberBtn(7) }
          { numberBtn(8) }
          { numberBtn(9) }
        </View>
        <View style={styles.hbox}>
          { btn({ containerViewStyle: { opacity: 0, width: 60 }, title: '0' }) /* For padding */}
          { numberBtn(0) }
          { btn({ disabled: pincode.length === 0, title: '⌫', onPress: this.backSpace }) }
        </View>
        <View flex={1} />
        { pincode.length < PIN_LENGTH
          ? <Button disabled title={wallet ? 'Please enter your PIN code' : 'Please write a PIN code'} />
          : <Button
            onPress={this.onFinish}
            disabled={loading}
            title={wallet ? 'Sign Transaction' : 'I will remember my PIN code'}
          />
        }
      </View>
    );
  }
}
