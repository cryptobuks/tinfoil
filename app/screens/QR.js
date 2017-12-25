import {
  Dimensions,
  Text,
  View,
} from 'react-native';
import React from 'react';
import QRCode from '../components/QRCode';
import { Button, Component } from '../components/*.js';
import styles from '../styles';


export default class QR extends Component {
  constructor() {
    super();
    this.state = { loading: true };
    setTimeout(() => this.setState({ loading: false }), 100);
  }

  close() {
    this.props.navigation.goBack();
  }

  render() {
    const { loading } = this.state;
    const { hexTx } = this.props.navigation.state.params;
    const rawTx = Buffer.from(hexTx, 'hex').toString('base64');
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.tight_container}>
        <Text>
          This QR code contains the signed transaction.
          Scan it with an online-connected device to boardcast it to
          the internet.
        </Text>
        <View flex={1} />
        <View>
          { loading
            ? <Text>Loading...</Text>
            : <QRCode size={width - 20} value={rawTx} />
          }
        </View>
        <View flex={1} />
        <Button onPress={this.close} title="CLOSE" />
      </View>
    );
  }
}
