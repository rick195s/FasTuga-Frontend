function getDiff(obj1, obj2) {
  const result = {};
  Object.keys(obj1).forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      result[key] = obj2[key];
    }
  });
  return result;
}

export default { getDiff };
