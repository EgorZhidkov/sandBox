import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import treeView from "../views/treeView/treeView.vue";
import CheckBoxTest from "../views/checkboxTest/CheckBoxTest.vue";
import Table from "../views/TESTTABLE/Table.vue";
import Chart from "../views/ChartJs/Chart.vue";
import Main from "../views/d3Chart/Main.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/chart",
        name: "Home",
        component: Main,
    },
    {
        path: "/tree",
        name: "Home",
        component: treeView,
    },
    {
        path: "/checkbox",
        name: "Home",
        component: CheckBoxTest,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;