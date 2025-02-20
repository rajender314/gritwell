import {useTranslation} from 'react-i18next';

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
      }
}] */
/**
 * @param {string} params required params
 * @return {string} params
 */
function GetLanguage(label: string, lang?: string) {
  const {t, i18n} = useTranslation();
  t(label);
lang ? i18n.changeLanguage(lang) : i18n.changeLanguage('eng');
return t(label);
}

export default GetLanguage;
