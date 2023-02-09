import {Buffer} from 'buffer';
export default function jwtdecode(jwt) {
  if (!jwt) {
    return;
  }
  return JSON.parse(new Buffer.from(jwt.split('.')[1], 'base64').toString());
}
