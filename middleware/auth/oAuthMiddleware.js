'use strict';


const superagent = require('superagent');
const tokenUrl = 'URL FROM DOCS FOR YOUR TOKEN ACCESS';
const userModel = require('./users/users-model');
const remoteUserUrl = 'URL TO REQUEST USER DATA';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const apiServer = 'http://localhost:3000/api/oauth';

module.exports = async function authorize(req, res, next){
  let code = req.query.code;

  try {
    let access_token = await codeForToken(code);
    console.log('Access Token ' + access_token);

    let user = await getRemoteUserInfo(access_token);
    console.log('USER ' + user);

    let appUser = await getUser(user);
    console.log('APP USER ', appUser);

    req.user = appUser.user;
    req.token = appUser.token;
    next();
  }  catch(e) {
    console.log(e);
    next(e);
  }



};


// service provides a code, change into  token
async function codeForToken(){
  let token_response = await superagent.post(tokenUrl).send({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_client: apiServer ,
    grant_type: 'authorization_code',
  });
  let access_token = token_response.body.access_token;

  return access_token;
}


// exchange token for User info
async function getRemoteUserInfo(token){
  let userResponse = await superagent.get(remoteUserUrl)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  let user = userResponse.body;

  return user;
}


// do proprietary (use our own server resources) user stuff
async function getUser(user){
  let userObject = {
    username: user.login,
    password: 'oauthuserpassword',
  };


  // this does UserModel methods to save/create and generate a token
  let User = await userModel.save(userObject);
  let token = userModel.generateToken(User);

  return {user: User, token};
}