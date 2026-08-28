import { createStore } from 'vuex'

// No global UI state currently needed — page-local state (e.g. AppNavbar's drawer)
// lives in its own component. Add modules here only when state genuinely spans views.
export default createStore({})
