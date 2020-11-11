const grpc = {};
grpc.web = require('grpc-web');
import { MessageBox, Message } from 'element-ui'

/**  OAuth2.0 interceptor implementation */
const OauthUnaryInterceptor = function() {};

const TokenUnaryInterceptor = function() {};


OauthUnaryInterceptor.prototype.intercept = function(request, invoker) {

    let authKey = "basic TestClient:694f956fe6ccfbb2e2905f1da3f00ddc7cf72737a7bab7bfe09f8cf6b13178e679bb3e699d1a2709";
    request.getMetadata()['Authorization'] = authKey;

    // console.debug("metadata:",request.getMetadata());

    return invoker(request).catch(err=>{  
         Message({
                  message: err.message,
                  type: 'error',
                  duration: 5 * 1000
         });
     });
};

TokenUnaryInterceptor.prototype.intercept = function(request, invoker) {

    // console.debug("request:",request.getRequestMessage());
    
    // console.debug("metadata:",request.getMetadata());

    request.getMetadata()['Authorization'] = "Bearer "+ Cookies.get('TokenKey');

    // console.debug("metadata:",request.getMetadata());


    return invoker(request).catch(err=>{  
         Message({
                  message: err.message,
                  type: 'error',
                  duration: 5 * 1000
         });
     });
};


export { OauthUnaryInterceptor,TokenUnaryInterceptor };