import axios from '../axios/http';
import {PayloadProps} from '../schema/schema';
const apiBaseUrl = process.env.REACT_APP_API_URL;
// import json from '../core/tempApi'
/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */
/**
 * @param {PayloadProps} params required params
 * @return {object} params
 */
export async function triggerApi(params: PayloadProps) {
  return getResponse(params);
}

// export async function triggerApiFake(response: any) {
//   return new Promise((resolve, reject) => {
//     // console.log(response)
//     if (response) {
//       resolve(response);
//     } else {
//       reject("Something went wrong");
//     }
//   });
// }

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */
/**
 * @param {any} params required params
 * @return {object} params
 */
async function getResponse(params: any) {
  // const bodyFormData = new FormData();
  // console.log(bodyFormData);
  // for (const key in params.payload) {
  //   bodyFormData.append(key, params.payload[key]);
  // }
  const methodTypes = ['GET', 'POST', 'PUT', 'DELETE'];

  if (methodTypes.indexOf(params.method.toUpperCase()) !== -1) {
    params.method = params.method;
  } else {
    params.method = 'GET';
  }
  return await axios({
    method: params.method,
    url: apiBaseUrl + params.apiUrl,
    data: params.payload,
    headers: params.headers ? params.headers : {},

  })
      .then((res: any) => {
        const response = res.data;
        return response;
      })
      .catch((err: any) => {
        console.log(err, 'Error');
      });
}
