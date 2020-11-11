//认证服务
const { EarthPromiseClient } = require('@/api/earth/earth_rpc_grpc_web_pb.js');

// const oauthOpts = {'unaryInterceptors' : [new OauthUnaryInterceptor()]};



const { OauthUnaryInterceptor,TokenUnaryInterceptor } = require('@/api/grpc_request');
const oauthOpts = {'unaryInterceptors' : [new OauthUnaryInterceptor()]};
// const tokenOpts = {'unaryInterceptors' : [new TokenUnaryInterceptor()]};
const earthClient = new EarthPromiseClient('http://localhost:8199',null, oauthOpts); 

export {earthClient};
