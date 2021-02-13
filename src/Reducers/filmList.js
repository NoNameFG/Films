const filmList = (state = [], action) => {
  switch (action.type) {
    case 'GET_FILM_LIST':
      return action.payload
    default:
      return state
  }
}

export default filmList
