import _ from 'lodash';
import BitcoinJS from 'bitcoinjs-lib';

export class TransactionFormatError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TransactionFormatError';
  }
}

export default function(request, wallets) {
  const [transaction, signAddress, ...inputsStr] = request.split(',');
  if (!transaction || !signAddress || !inputsStr.length) throw new TransactionFormatError('Invalid transaction');
  if (!wallets.includes(signAddress)) throw new TransactionFormatError('No such wallet');

  const tx = BitcoinJS.Transaction.fromBuffer(Buffer.from(transaction, 'base64'));
  const signInputs = _.uniq(inputsStr.map(input => parseInt(input, 10)));

  signInputs.forEach((i) => {
    if (i < 0 || i >= tx.ins.length) throw new TransactionFormatError('Invalid input number');
  });

  const outputs = tx.outs.map(({ script, value }) => {
    const address = BitcoinJS.address.fromOutputScript(script);
    return { value, address, isMine: wallets.includes(address) };
  });

  return {
    tx,
    outputs,
    signInputs,
    signAddress,
  };
}
