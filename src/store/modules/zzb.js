
const state = {
    book_no: ''
}

const mutations = {
    SET_BOOK_NO: (state,val)=>{
        state.book_no = val;
    }
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

