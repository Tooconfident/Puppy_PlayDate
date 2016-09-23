// Constants to define action type
export const FETCH_DOGS = 'FETCH_DOGS';
export const FETCH_DOG = 'FETCH_DOG';

const REQUEST_URL = 'http://localhost:3000';

// Action creators
export function fetchDogs(userId) {
  const request = fetch(`${REQUEST_URL}/users/${userId}/dogs`);

  return {
    type: FETCH_DOGS,
    payload: request
  }
}

export function fetchDog(id) {
  const request = fetch(`${REQUEST_URL}/dogs/${id}`);

  // return the action
  return {
    type: FETCH_DOG,
    payload: request // redux-promise will take this and replace with the resolved promise
  };
}
