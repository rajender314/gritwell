import { useContext } from "react";
import { __RouterContext as RouterContext } from "react-router";

export function useLocation() {
  const { location, history } = useContext(RouterContext);

  function navigate(to: string, { replace = false } = {}) {
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }

  return {
    location,
    navigate,
  };
}