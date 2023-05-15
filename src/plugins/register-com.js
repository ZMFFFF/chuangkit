import CKT_tabbar from "@/components/CKT_tabbar.vue";
import CKT_GoTop from "@/components/CKT_GoTop.vue";

let registerCom = {
    install(Vue, options) {
        Vue.component("CKT_tabbar", CKT_tabbar);
        Vue.component("CKT_GoTop", CKT_GoTop);
    },
};

export default registerCom;
