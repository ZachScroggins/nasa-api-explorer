const checkClient = callback => {
  if (typeof window !== 'undefined') {
    callback();
  }
};

export default checkClient;
