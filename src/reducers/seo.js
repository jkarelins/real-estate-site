const initialState = {
  fetchedCities: []
};

export default function extraReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ALL_CITIES": {
      return {
        ...state,
        fetchedCities: action.cities.sort((a, b) => b.advertCount - a.advertCount).filter((advert, i) => i < 20)
      };
    }
    default: {
      return state;
    }
  }
}
