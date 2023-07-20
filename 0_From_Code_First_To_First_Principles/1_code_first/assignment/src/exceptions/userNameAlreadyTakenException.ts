const usernameAlreadyTakenException = () => {
  return { error: "UsernameAlreadyTaken", data: undefined, success: false };
};

export default usernameAlreadyTakenException;
