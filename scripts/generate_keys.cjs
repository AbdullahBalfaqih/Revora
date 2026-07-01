const fs = require('fs');
const { Keys } = require('casper-js-sdk');

const keyPair = Keys.Ed25519.new();
const publicKey = keyPair.publicKey.toHex();

const folderPath = './casper_keys';
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

fs.writeFileSync(`${folderPath}/public_key_hex`, publicKey);
fs.writeFileSync(`${folderPath}/secret_key.pem`, keyPair.exportPrivateKeyInPem());
fs.writeFileSync(`${folderPath}/public_key.pem`, keyPair.exportPublicKeyInPem());

console.log('Casper Account Keys Generated Successfully!');
console.log('Public Key (Hex):', publicKey);
console.log('\nPlease go to https://testnet.cspr.live/tools/faucet and request funds using the Public Key above.');
