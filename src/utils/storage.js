export const getLocalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error reading localStorage key:", key, err);
    return null;
  }
};

export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error writing localStorage key:", key, err);
  }
};
