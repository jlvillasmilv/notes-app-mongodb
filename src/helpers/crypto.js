const AesEncryption = require('aes-encryption');

const key = '11122233344455566677788822244455555555555555555231231321313aaaff';

const aes = new AesEncryption()
aes.setSecretKey(process.env.NOTES_APP_KEY || key)
// Note: secretKey must be 64 length of only valid HEX characters, 0-9, A, B, C, D, E and F

const crypted = {};

crypted.encrypted = (text) => {
    const  encrypted = aes.encrypt(text);
    return encrypted;
}

crypted.decrypted  = (text) => {
    const  decrypted  = aes.decrypt(text);
    return decrypted;
}

module.exports = crypted;
