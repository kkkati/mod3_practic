import { ACTION_TYPE } from "../actions";

const InitialAppState = {
  wasLogout: false,
  modal: {
    isOpen: false,
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const appReducer = (state = InitialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    case ACTION_TYPE.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },
      };
    case ACTION_TYPE.CLOSE_MODAL:
      return InitialAppState;
    default:
      return state;
  }
};
