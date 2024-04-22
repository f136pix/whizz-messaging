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

export const checkStatus = (response, errMsg) => {
  if (![200, 204, 201].includes(response.status)) {
    throw new Error(`${errMsg}`);
  }
};
