const ACTION_ERROR = "ACTION_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";

export const newError = error => ({
  type: ACTION_ERROR,
  error: error.data.message
});

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
