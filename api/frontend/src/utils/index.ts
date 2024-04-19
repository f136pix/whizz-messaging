export const resFormatter = (data: any) => {
  const res = {
    status: data.response.status,
    data: data.response.data
  };

  if (typeof res.data === 'string') {
    return {
      status: res.status,
      data: {
        message: res.data
      }
    };
  } else {
    return res;
  }
};
