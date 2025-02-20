import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getLocalStorage} from '../core/localStorageService';
/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
      }
}] */
/**
 * @return {void}
 */
export function PrivateRoute({children, ...rest}: any) {
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  return (
    <Route
      {...rest}
      render={({location}: any) =>
token ? (
children
) : (
  window.location.reload()
)
      }
    />
  );
}
