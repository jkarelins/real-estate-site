import axios from "axios";
const baseUrl = "http://localhost:4000";

const ADD_NEW_IMAGE = "ADD_NEW_IMAGE";

const uploadImageSuccess = image => ({
  type: ADD_NEW_IMAGE,
  image
});

export const uploadImage = data => (dispatch, getState) => {
  const { userReducer, advertReducer } = getState();
  const { jwt } = userReducer;
  const { selectedAdvert } = advertReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/image/upload/${selectedAdvert.id}`, data)
    .then(res => {
      dispatch(uploadImageSuccess(res.data));
    })
    .catch(console.error);
};
