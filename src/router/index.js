import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Timeline from "@/components/Timeline";
import Timelinepeer from "@/components/Timelinepeer";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   name: "Timeline",
    //   component: Timeline
    // }
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld
    // },
    {
      path: "/",
      name: "Timelinepeer",
      component: Timelinepeer
    }
  ]
});
