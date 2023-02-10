import Vue from "vue";
import Vuex from 'vuex';
import styles from '../../uni.module.scss';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // tabbar当前选中额下标索引
        tabbarIndex: 0,
        // 用户信息
        userInfo: null,
    },
    mutations: {
        setTheme(state, themeObject){
            setThemeColor(themeObject);
        },
        setTabbarIndex(state, clickIndex) {
            state.tabbarIndex = clickIndex;
        }
    },
    getters: {
        getTabbarIndex(state) {
            return state.tabbarIndex;
        },
        getUserInfo(state) {
            return state.userInfo;
        }
    }
})

function setThemeColor(themeObject) {
    styles['themeBackgroundColor'] = themeObject.backgroundColor;
}