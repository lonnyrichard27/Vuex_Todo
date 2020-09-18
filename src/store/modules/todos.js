import axios from 'axios'

const state = {
  todos: []
}

const getters = {
 allTodos: (state) => state.todos
}

const mutations = {
  setTodos: (state, todos) =>{
    state.todos = todos
  },
  newTodo: (state, todo) => {
// not using push because i want it to be at the beginning
    state.todos.unshift(todo)
  },
  deleteTodo: (state, id) => {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
}

const actions = {
  async fetchTodos({ commit }) {
  let response = await axios.get("https://jsonplaceholder.typicode.com/todos")

    commit('setTodos',response.data);
  },
  async addTodo({ commit }, title) {
    let response = await axios.post("https://jsonplaceholder.typicode.com/todos",
    {title, completed: false});

    commit('newTodo', response.data)
  },
  async deleteTodo({commit}, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    commit('deleteTodo', id)
  },
  async filterTodo({commit}, e)  {
    // cget seleccted number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
  
     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      commit('setTodos', response.data) 
  },
  async updateTodo({commit}, updTodo) {

    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
    commit('updateTodo', response.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}