const CryptoJS = require('crypto-js');

const encryptKey = (key) => {
  // Key ko trim karke encrypt karo
  return CryptoJS.AES.encrypt(key.trim(), process.env.ENCRYPTION_SECRET).toString();
};

const decryptKey = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, process.env.ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptKey, decryptKey };