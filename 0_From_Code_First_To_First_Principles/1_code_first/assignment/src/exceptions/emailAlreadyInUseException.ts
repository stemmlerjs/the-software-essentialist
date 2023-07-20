const emailAlreadyInUseException = () => {
  return {
    error: "EmailAlreadyInUse",
    data: undefined,
    success: false,
  };
};

export default emailAlreadyInUseException;
