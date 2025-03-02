export const isRequire = (value, errMsg) => {
  return value ? undefined : errMsg;
};

export const isEmail = (value, errMsg) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? undefined : errMsg;
};

export const isLength = (min) => (value, errMsg) => {
  return value && value.length < min ? errMsg : undefined;
};
