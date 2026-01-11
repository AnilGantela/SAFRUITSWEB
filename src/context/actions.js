export const setCity = (dispatch, city) =>
  dispatch({ type: "SET_CITY", payload: city });

export const setTheme = (dispatch, theme) =>
  dispatch({ type: "SET_THEME", payload: theme });

export const setPrimaryColor = (dispatch, color) =>
  dispatch({ type: "SET_PRIMARY_COLOR", payload: color });

export const setSecondaryColor = (dispatch, color) =>
  dispatch({ type: "SET_SECONDARY_COLOR", payload: color });
