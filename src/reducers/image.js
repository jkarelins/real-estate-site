const initialState = {
  addedImages: []
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    // case "ADD_NEW_IMAGE":  -> runs in Advert Reducer
    // case "ADD_NEW_IMAGE": {
    //   return {
    //     ...state,
    //     addedImages: [...state.addedImages, action.image]
    //   };
    // }
    default: {
      return state;
    }
  }
}
