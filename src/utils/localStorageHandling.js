export const setItem = (key, body) => {
  localStorage.setItem(key, JSON.stringify(body));
};

export const getItem = (key) => JSON.parse(localStorage.getItem(key) || 'null');

export const getLocalStorage = (key) => {
  if (!getItem(key)) setItem(key, []);
  const item = getItem(key);
  return item;
};

export const setStorageArray = (array, newItem, key) => {
  const oldInfoToPersist = array.filter((item) => item.id !== newItem.id);
  let newArray = [...oldInfoToPersist, newItem];
  if (newItem.quantity === 0) newArray = [...oldInfoToPersist];
  setItem(key, newArray);
  return newArray;
};
