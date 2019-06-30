import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },
    {
      path: "/destination/:location",
      name: "destinationDetails",
      props: true,
      component: () =>
        import(/* webpackChunkName: "DestinationDetails" */ "./views/DestinationDetails.vue"),
      children: [
        {
          path: ":experience",
          name: "experienceDetails",
          props: true,
          component: () =>
            import(/* webpackChunkName: "ExperienceDetails" */ "./views/ExperienceDetails.vue"),
        }
      ],
      beforeEnter: (to, from, next) => {
        const slug = to.params.location;
        if (store.destinations.find(destination => destination.slug === slug)) {
          next();
        } else {
          next({ name: "notFound" });
        }
      }
    },
    
    {
      path: "*",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "NotFound" */ "./views/NotFound.vue")
    }
  ]
});
