export function getLocalStorageItem(key) {
  let result;
  try {
    result = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    result = null;
  }
  return result;
}

export function setLocalStorageItem(key, value) {
  const savedValue = JSON.stringify(value);
  return localStorage.setItem(key, savedValue);
}
