

export const setLocalStorage = (key:string, item:any) => {
  localStorage.setItem(key, item);
};

export const getLocalStorage = (item:any) => {
  return localStorage.getItem(item) ? localStorage.getItem(item) : '';
};


export const clearLocalStorage = () => {
  localStorage.clear();
};

