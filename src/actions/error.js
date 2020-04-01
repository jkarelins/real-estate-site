const ACTION_ERROR = "ACTION_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const CLEAR_SUCCESS = "CLEAR_SUCCESS";

export const newError = error => ({
  type: ACTION_ERROR,
  error: error.data.message
});

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearSuccess = () => dispatch => {
  dispatch({ type: CLEAR_SUCCESS });
};
