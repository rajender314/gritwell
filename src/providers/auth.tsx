import React, {useState} from 'react';
import {getLocalStorage} from '../core/localStorageService';

type AuthContextType = {
userInfo: any;
setUserInfo?: any;
};

type Props = {
children: any;
};

export const AuthContext = React.createContext<AuthContextType>({
  userInfo: null,
});

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
export function AuthProvider({children}: Props) {
 let user: any = getLocalStorage('userData');
 user = user ? JSON.parse(user) : null;
 const [userInfo, setUserInfo] = useState<any>(user);
 const value = {userInfo, setUserInfo};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
