const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc';
// console.log(crypto.randomBytes(32).toString('base64'));
const PASSWORD = 'x4nyjQL/8X+Nvyc5kvBSKnxGwYgMIXQ2qdW1++pOWl0='
// console.log(crypto.randomBytes(16).toString('base64'));
const SALT = '/2qUb0e1Yux8a9UovDZqBg=='

const encrypt = (algorithm, password, salt, data) => {
  const key = crypto.scryptSync(password, salt, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(data);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  return { iv, encryptedData };
};

const decrypt = (algorithm, password, salt, iv, encryptedData) => {
  const key = crypto.scryptSync(password, salt, 32);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  return decryptedData;
};
