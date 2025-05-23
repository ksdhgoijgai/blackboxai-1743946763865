import { v4 as uuid } from "uuid";

const defaultAddress = {
  id: uuid(),
  name: "Sai Pranav",
  flatName: "110 Bhoomatha Saidurga Enclave",
  area: "",
  landmark: "",
  city: "Visakhapatnam",
  pincode: "530041",
  state: "Andhra Pradesh",
  country: "India",
  contact: "9567560230",
};

export const addressInitialState = {
  addressList: [defaultAddress],
  setEditBox: "hide-edit-box",
  isEditing: false,
  editData: null,
  addressSelectedId: null,
};

export const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD-NEW-ADDRESS":
      return {
        ...state,
        setEditBox: "hide-edit-box",
        addressList: [...state.addressList, payload],
      };
    case "DELETE-ADDRESS":
      return {
        ...state,
        addressList: state.addressList.filter(
          (address) => address.id != payload
        ),
      };
    case "TOGGLE-ADDRESS-MODAL":
      return {
        ...state,
        setEditBox: payload,
      };
    case "OPEN-EDIT-ADDRESS":
      return {
        ...state,
        isEditing: true,
        setEditBox: "show-edit-box",
        editData: payload,
        addressList: updateAddress(state, payload),
      };
    case "UPDATE-EDIT-ADDRESS":
      return {
        ...state,
        isEditing: false,
        setEditBox: "hide-edit-box",
        addressList: updateAddress(state, payload),
      };
    case "SET-EDIT-STATUS":
      return {
        ...state,
        isEditing: payload,
      };
    case "SET-ADDRESS-ID":
      return {
        ...state,
        addressSelectedId: payload,
      };
    case "CLEAR-ADDRESS":
      return addressInitialState;

    default:
      state;
  }
};

function updateAddress(state, payload) {
  let indexOfAddress = state.addressList.findIndex(
    (address) => address.id == payload.id
  );
  state.addressList[indexOfAddress] = payload;
  return state.addressList;
}
