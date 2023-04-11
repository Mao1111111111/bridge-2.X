const host = 'http://testdata.api.jianlide.cn:1088/api';
const testHost = 'http://114.116.196.47:10808'

// 获取授权，得到access_token
export const fetchAuthorize = credentials =>
  new Promise((resolve, reject) => {
    fetch(host + '/auth/authorize', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });
// 获取用户信息
export const fetchUsersProfile = access_token =>
  new Promise((resolve, reject) => {
    fetch(host + '/v1/org/users/profile', {
      headers: {
        access_token_cookie: access_token,
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });


//1、获取应用注册初始化令牌
export const fetchInitAccessToken = credentials => 
  new Promise((resolve, reject) => {
    fetch(testHost + '/oauth2/initial-access-token', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });

//2、注册应用
export const fetchRegisterApplication = (access_token,body) => 
  new Promise((resolve, reject) => {
    fetch(testHost + '/oauth2/dcr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body:JSON.stringify(body)
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });

//3、获取访问令牌
export const fetchoOtainAccessToken = (clientInfo,body) => 
  new Promise((resolve, reject) => {
    fetch(testHost + '/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${clientInfo}`,
      },
      body:body
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });

//4、获取用户信息
export const fetchObtainUserInfo = access_token => 
  new Promise((resolve, reject) => {
    fetch(testHost + '/oauth2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
      .then(res => res.json())
      .then(resolve)
      .catch(err => reject(err.response));
  });