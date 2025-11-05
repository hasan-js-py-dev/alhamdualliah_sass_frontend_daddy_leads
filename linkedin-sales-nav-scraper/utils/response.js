const successResponse = (message, data = null) => {
  const response = { success: true, message };
  if (data) response.data = data;
  return response;
};

const errorResponse = (message, error = null) => {
  const response = { success: false, message };
  if (error) response.error = error;
  return response;
};

module.exports = { successResponse, errorResponse };
