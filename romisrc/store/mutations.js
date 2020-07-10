import {
    SET_TOP_STATE,
    SET_BOTTOM_STATE,
    SET_LOGIN_USER,
    SET_SHOPPING_CART,
    SET_USER_NAME,
    SET_SEARCH_SECTION,
    SET_VIDEO,
    SET_HTTP_URL,
    SET_PSW,
    SET_USER_INFOS,
    SET_TEACHER_INFOS
} from "./mutation-type";

export const mutations = {
    [SET_TOP_STATE](state, isshow) {
        state.showTOP = isshow
    },
    [SET_BOTTOM_STATE](state, isshow) {
        state.showBOTTOM = isshow
    },
    [SET_LOGIN_USER](state, loginUser) {
        state.loginUser = loginUser
    },
    [SET_SHOPPING_CART](state, shoppingCart) {
        state.shoppingCart = shoppingCart
    },
    [SET_USER_NAME](state, username) {
        state.username = username
    },
    [SET_SEARCH_SECTION](state, chapter) {
        state.chapter = chapter
    },
    [SET_VIDEO](state, video) {
        state.video = video
    },
    [SET_HTTP_URL](state, httpUrl) {
        state.httpUrl = httpUrl
    },
    [SET_PSW](state, item) {
        state.item = item
    },
    [SET_USER_INFOS](state, info) {
        state.info = info
    },
    [SET_TEACHER_INFOS](state, teacher) {
        state.teacher = teacher
    }
}