const emailValidator = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9]{1,4}\.){0,6}[a-zA-Z0-9]{1,4}$/;
  email = email?.trim().toLowerCase();
  if (!email) return false;
  return emailRegex.test(email);
};

export default emailValidator;
