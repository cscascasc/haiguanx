

import JSEncrypt from 'jsencrypt'
const publickey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6o2XM2Ax8rMt+k0qrQkkVdD9Hr8oV9OrGGnPj8MN1U8CDSJjxRbekjXSOZr5vaSTfox0oPw+ZSct8a3jXEoC8+ZnxhqxqPikRw8dlG1R/ayGhtbSAtPS67G/8baqRD3KORvYd5C90N2FarkbG1xYajI09JvTt8mT9mnIb1/5FzF/60pd4vOSxqMrlVrO2IiUhowlD2HRjDiAZTl1n0n1BNys64uUOOTvh4pHLmkhul5vK05/fJBwNyZtn+ApnyPL0CdcRW+3y5RQ3BVk8QcwFO1FmVnbC1hilwyPBc+0Ur6AyDk4t+t8/CBj2Nh8NlXtCt8m7+bwJeTXdX6L8GyiRwIDAQAB';

const privateKey = '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDqjZczYDHysy36TSqtCSRV0P0evyhX06sYac+Pww3VTwINImPFFt6SNdI5mvm9pJN+jHSg/D5lJy3xreNcSgLz5mfGGrGo+KRHDx2UbVH9rIaG1tIC09Lrsb/xtqpEPco5G9h3kL3Q3YVquRsbXFhqMjT0m9O3yZP2achvX/kXMX/rSl3i85LGoyuVWs7YiJSGjCUPYdGMOIBlOXWfSfUE3Kzri5Q45O+HikcuaSG6Xm8rTn98kHA3Jm2f4CmfI8vQJ1xFb7fLlFDcFWTxBzAU7UWZWdsLWGKXDI8Fz7RSvoDIOTi363z8IGPY2Hw2Ve0K3ybv5vAl5Nd1fovwbKJHAgMBAAECggEAO6k0Uo8fZVqKUWabelQe9+0m1VFOU7i1hoozj5/PvvhPz0N2GUXN62bhSGHRMJnSIphbei9vN4+VsinG8UyqH5v1vYBAvHgyYRjJL133Qw1FUrsFxE5ZEjauWi9ac+07qPcaQp+AiMYwD4tyB62fl7OZoLaaTd9qUX1qzFmfJHSoGU2JSYRxb2Bps6vJCizk8gGXDewh2vW4DSO5ieczR5cTtbeAbJ3NS9OYIpmCKbvC/KDwmnITzz2P3Btgyxkktakbn6gv/aVjK4dQF+7D0xSJ2/EtzMwgvWiQ1e9IzAC7lQPF8rmGU3TskHFT1+nFl5cAmzm7dWwClantajntIQKBgQD9JHIAGY3TSQOZneIsDpk1+H+B25xf9QnXXc/Nw9jjC79Y5PiWkDbtKKVBUr8QgS2ClsxfrBC8QGEdxao1iqdVSHftZ0ZbRhEIwBIszTxvzENiiy+bGLn2AvAg6hT11+NZ0dO3FdckQ3l1dYqcQ8IkjFQ+BheW02FBBErEeBB6zwKBgQDtM2yc8u0+MCpRnq9y/6eS6H5S7HdXf2qRRiJEKm0mwRZGWIfmpwSIEuUVu/FAEtyC6x9cPPBjYZprIaHWX1Y6KjnPW+gxJ/fMKjnF3XmMIlPAN+uBXl05yPMV4/OF0uOitmYTPWhVNHDAa0LAghvqIsKu5C8iirKkJUUN9MLfCQKBgGHpp+Kb/7x6oFbZt7K8zswOWxtaW2jOOclAsvDu0MQ5NgDnR7PNAkHHF+xlWhvDK1w4gcJ7pll6OVYvr39YKxMUnbaI3LDPMCWHTUBg/gBsLKBAH+DItp0OU90XTZYts/V48H//haC0LJWfKkb4+m3yjV8UMimXhyWDyHunyRAHAoGAcQ3Fgri2IqHKScScUu9O61Isg1F5QBbWsA8BXgPqqkH1X+nqPCD2o/R9g3JkdemHeE6gT9IrsPJgKxeIjyg5bNebXh2r+WHXVVP63TfGKuhhiogckzhqrpP8aD6RXwM4w+Czng/ynkm0Q8Hbuu1IaLvQlpLjdE8u/dVVqGU0TCECgYAFIw3jYZg3W5ZwxPr9p+UnteY+Id4tzwcH1rJCjsj7gXXBPRgPZPm0miSX/l7dg3EFQhjmKZLl4ySSu+HQyFQ9vQf4ue+QJPTEiOTY7fXRXhLZ69kK9op0PUoPYjt/X4tOllpMzYapfgl+Xj2Fu1FutSlJeHpqIcH1d9a1UQpYSQ==-----END PRIVATE KEY-----';

export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publickey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

//解密
export function decrypt(content) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)//设置私钥
  return encryptor.decrypt(content)// 对数据进行解密
}
//分段解密
export function decryptlong(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decryptlong(base64ToArrayBuffer2(txt))
}
//分段解密
// export function decryptlong(txt) {
//   const encryptor = new JSEncrypt()
//   encryptor.setPrivateKey(privateKey)
//   return encryptor.decrypt(base64ToArrayBuffer(txt))
// }
//
// export function decryptlong2(txt) {
//   const decrypt = new Encrypt()
//   decrypt.setPrivateKey(privateKey)
//   return decrypt.decryptLong(base64ToArrayBuffer(txt))
// }

JSEncrypt.prototype.decryptlong = async function (string) {
  // console.log(string)
  //第一种解密方式
  // var k = this.getKey();
  // //解密长度=key size.hex2b64结果是每字节每两字符，所以直接*2
  // var maxLength = ((k.n.bitLength() + 7) >> 3) * 2;
  // try {
  //   var hexString = bytesToHex(string);
  //   var decryptedString = "";
  //   var rexStr = ".{1," + maxLength + "}";
  //   var rex = new RegExp(rexStr, 'g');
  //   var subStrArray = hexString.match(rex);
  //   if (subStrArray) {
  //     subStrArray.forEach(function (entry) {
  //       decryptedString += k.decrypt(entry);
  //     });
  //     console.log(decryptedString)
  //     return decryptedString;
  //   }
  // } catch (ex) {
  //   console.log("RSA分段解密失败", ex)
  //   return false;
  // }
  // 第二种解密方式
  let k = this.getKey();
  let MAX_DECRYPT_BLOCK = 256;//分段解密最大长度限制为128字节
  // 标题
  try {
    let ct = "";
    let t1;
    let bufTmp;
    let hexTmp;
    let inputLen = string.length;
    //开始长度
    let offSet = 0;
    //结束长度
    let endOffSet = MAX_DECRYPT_BLOCK;
    //分段解密
    while (inputLen - offSet > 0) {
      if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
        bufTmp = string.slice(offSet, endOffSet);
        hexTmp = bytesToHex(bufTmp);
        t1 = await k.decrypt(hexTmp);
        ct += t1;
      } else {
        bufTmp = string.slice(offSet, inputLen);
        hexTmp = bytesToHex(bufTmp);
        t1 = await k.decrypt(hexTmp);
        ct += t1;
      }
      offSet += MAX_DECRYPT_BLOCK;
      endOffSet += MAX_DECRYPT_BLOCK;
    }
    console.log(ct)
    const b = JSON.parse(ct)
    return b;
  } catch (ex) {
    console.log("RSA分段解密失败", ex)
    return false;
  }
}
function hexToBytes(hex) {
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// /**
// * byte数组转16进制
// * @param bytes
// * @returns {string}
// */
function bytesToHex(bytes) {
  let hex = [];
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

// /**
// * base64转btye数组
// * @param base64  
// * @returns {Uint8Array}
// */
function base64ToArrayBuffer(base64) {
  let binary_string = window.atob(base64);
  // let binary_string = decodeURIComponent(escape(atob(base64)))
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  console.log(bytes ,'bytes')
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

function base64ToArrayBuffer2(Bese64) {
  const binary_string = window.atob(Bese64)
  return new Uint8Array(Array.from(binary_string, char =>
    char.charCodeAt(0)
  ))
}
