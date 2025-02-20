const disableLogs = function() {
  if (process.env.REACT_APP_PRODUCTION === 'true') {
    const console: any = (function(oldCons) {
      return {
        log: () => { },
        info: () => { },
        warn: () => { },
        error: () => { },
      };
    })(window.console);
    window.console = console;
  }
};
export default disableLogs;
