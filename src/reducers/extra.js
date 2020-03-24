const initialState = {
  fetchedExtras: []
};

export default function extraReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ALL_EXTRAS": {
      return {
        ...state,
        fetchedExtras: action.extras
      };
    }
    case "ONE_EXTRA_ADDED": {
      const fetchedExtras = state.fetchedExtras.filter(
        extra => extra.id !== action.extra.id
      );
      return {
        ...state,
        fetchedExtras
      };
    }
    case "ONE_EXTRA_REMOVED": {
      return {
        ...state,
        fetchedExtras: [...state.fetchedExtras, action.extra]
      };
    }
    default: {
      return state;
    }
  }
}
