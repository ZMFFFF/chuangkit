import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: localStorage, // 选择持久化方案 localStorage本地存储，永久存储，sessionStorage会话存储。
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        keyword_his: [],
    },
    getters: {},
    mutations: {
        keyword_push(state, keyword) {
            if (keyword && state.keyword_his.indexOf(keyword) == -1) {
                state.keyword_his.unshift(keyword);
            }
            if (state.keyword_his.length > 6) {
                state.keyword_his.pop();
            }
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
