export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);

export function CheckPropDoup(storeArray, propVal) {
  for (let i = 0, k = storeArray.length; i < k; i++) {
    if (storeArray[i] === propVal) return true;
  }
  return false;
}

export function saveStore(key, value) {
  if (typeof Storage !== 'undefined') {
    let prevStored = JSON.parse(localStorage.getItem(key)) || [];
    let obj = {};
    obj = Object.assign(obj, value);
    if (!CheckPropDoup(prevStored, value)) prevStored.push(obj);
    localStorage.setItem(key, JSON.stringify(prevStored));
  }
}

export function getStore(key) {
  if (typeof Storage !== 'undefined') {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

export function removeStore(key, value) {
  if (typeof Storage !== 'undefined') {
    let prevStored = JSON.parse(localStorage.getItem(key)) || [];
    prevStored.splice(prevStored.indexOf(value), 1);
    localStorage.setItem(key, JSON.stringify(prevStored));
  }
}

export function updateProduct(product) {
  let allProducts = getStore('productList');
  allProducts[product.id] = product;
  localStorage.setItem('productList', JSON.stringify(allProducts));
}

export function pushRecentList(product) {
  let recentList = getStore('recentViewed');
  const newList = recentList.filter((item) => item.id !== product.id);
  newList.push(product);
  localStorage.setItem('recentViewed', JSON.stringify(newList));
}

export function isExpired() {
  const expireDate = Number(localStorage.getItem('expireDate'));
  const date = new Date().getDate();

  if (!expireDate) {
    localStorage.setItem('expireDate', date);
    return false;
  } else if (expireDate !== date) {
    localStorage.clear();
    return true;
  }
}
