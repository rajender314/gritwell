
// import { useAppDispatch } from '../store/hooks';
// import { globalData } from '../store/modules/globalData'
import apiEndpoint from '../core/apiend_point';
import {ApiResponseProps, PayloadProps} from '../core/schema';
import {triggerApi} from '../services';
import {getLocalStorage} from '../core/localStorageService';
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
export async function GetGlobalData() {
  // const dispatch = useAppDispatch();
  const apiObject: PayloadProps = {
    payload: {},
    method: "GET",
    apiUrl: apiEndpoint.getGlobalData,
    headers: { Authorization: getLocalStorage('token') }
  };
  return await triggerApi(apiObject)
      .then((response: ApiResponseProps) => {
        if (response.status_code == 200) {
          // dispatch(globalData(response.data))
          return response.data;
        } 
      })
      .catch((err: object) => {
        console.log(err);
      });
}
