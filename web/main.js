var Buffer = require('buffer').Buffer;
window.Buffer = Buffer;
var BitcoinJS = require('bitcoinjs-lib');
import coinselect from 'coinselect';
/* global w69b:true */

w69b.qr.decoding.setWorkerUrl('node_modules/barcode.js/w69b.qrcode.decodeworker.min.js');

const SATOSHI = 1e8;
const state = {};

function getUtxos(addr) {
  addr = '13P4u7BWyqHaSywdRS5Hrn4aiJRjVyCt3B';
  return fetch(`https://blockchain.info/unspent?cors=true&active=${addr}`).then((res) => {
    if (!res.ok) throw new Error('Network error');
    return res.json();
  }).then(utxo =>
    utxo.unspent_outputs.map(({
      tx_hash, tx_output_n, value, // eslint-disable-line
    }) => ({
      txId: tx_hash,
      vout: tx_output_n,
      value,
    })));
}

export function broadcast() {
}

function $i(id) {
  return document.getElementById(id);
}

function setModal(elmId, show) {
  const elm = $i(elmId);
  elm.style.display = show ? 'block' : 'none';
  elm.classList.add(show ? 'show' : 'hide');
  elm.classList.remove(show ? 'hide' : 'show');
  const backdrop = $i('modal_backdrop');
  backdrop.classList.add(show ? 'show' : 'hide');
  backdrop.classList.remove(show ? 'hide' : 'show');
}

function showModal(elmId) {
  setModal(elmId, true);
}

function hideModal(elmId) {
  setModal(elmId, false);
}

function qrCode(fn) {
  showModal('barcode_modal');

  const scanner = new w69b.qr.ui.ContinuousScanner();
  state.scanner = scanner;
  scanner.setDecodedCallback((result) => {
    if (fn(result)) {
      scanner.dispose();
      hideModal('barcode_modal');
    }
  });
  scanner.render($i('scanner'));
}

$i('qr_modal_close').addEventListener('click', () => {
  state.scanner.dispose();
  hideModal('barcode_modal');
}, false);

export function qrCodeAddr(elm) {
  qrCode((addr) => {
    if (/1.{11,14}/.test(addr)) {
      $i(elm).value = addr;
      return true;
    }
    return false;
  });
}

export function addressConfirm(elm) {
  $i(`${elm}_form`).classList.add('hide');
  $i(`${elm}_placeholder`).firstChild.nodeValue = $i(elm).value;
  $i(`${elm}_result`).classList.remove('hide');
}

export function qrCodeTransaction() {
  qrCode((bs64tx) => {
    let tx;
    try {
      tx = BitcoinJS.Transaction.fromBuffer(Buffer.from(bs64tx, 'base64'));
    } catch (e) {
      return false;
    }
    state.tx = tx;
    $i('transaction_qr').classList.add('hide');
    $i('transaction_sign_ok').classList.remove('hide');
    $i('tx').value = tx.toHex();
    $i('submit_card').classList.remove('hide');

    return true;
  });
}

export function displayQRCode(value) {
  const canvas = $i('qrCode');
  w69b.qr.encoding.drawOnCanvas(value, canvas);
}

export function buildTransaction() {
  const fromAddress = $i('address').value;
  const amountBTC = parseFloat($i('amount').value);
  const txb = new BitcoinJS.TransactionBuilder();

  const feeRate = parseInt($i('fee').value, 10);
  if (feeRate > 10000) throw new Error('Fee too high');
  const targets = [
    {
      address: $i('address_to').value,
      value: Math.round(parseFloat(amountBTC, 10) * SATOSHI),
    },
  ];
  const { inputs, outputs } = coinselect(state.utxos, targets, feeRate);

  if(!inputs) return alert('Insufficient balance');
  inputs.forEach(({ txId, vout }) => txb.addInput(txId, vout));
  outputs.forEach(({ address, value }) => txb.addOutput(address || fromAddress, value));

  $i('amount_placeholder').firstChild.nodeValue = amountBTC;
  addressConfirm('address_to');
  $i('qr_card').classList.remove('hide');
  return displayQRCode([
    txb.tx.toBuffer().toString('base64'),
    fromAddress,
    ...inputs.map((_, i) => i),
  ].join(','));
}


export function loadUTXOS() {
  addressConfirm('address');
  $i('destination_card').classList.remove('hide');

  getUtxos($i('address').value).then((utxos) => {
    state.utxos = utxos;
    let sum = 0;
    for (let i = 0, len = utxos.length; i < len; i += 1) {
      sum += utxos[i].value;
    }
    $i('balance').firstChild.nodeValue = `${sum / SATOSHI}`;
  });
}
