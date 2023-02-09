const host = 'http://testdata.api.jianlide.cn:1088/api';

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
