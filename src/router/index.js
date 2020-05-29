import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../Home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotBases from '../parts/RobotBases.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotArms from '../parts/RobotArms.vue';
import SidebarStandard from '../sidebar/SidebarStandard.vue';
import SidebarBuild from '../sidebar/SidebarBuild.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      sidebar: SidebarStandard,
    },
  },
  {
    path: '/build',
    name: 'Build',
    components: {
      default: RobotBuilder,
      sidebar: SidebarBuild,
    },
  },
  {
    path: '/partinfo/:partType/:id',
    name: 'Partinfo',
    component: PartInfo,
    beforeEnter(to, from, next) {
      const isValidId = Number.isInteger(Number(to.params.id));
      next(isValidId);
    },
  },
  {
    path: '/browse/parts',
    name: 'Browseparts',
    component: BrowseParts,
    children: [
      {
        path: '/heads',
        name: 'BrowseHeads',
        component: RobotHeads,
      },
      {
        path: '/bases',
        name: 'BrowseBases',
        component: RobotBases,
      },
      {
        path: '/torsos',
        name: 'BrowseTorsos',
        component: RobotTorsos,
      },
      {
        path: '/arms',
        name: 'BrowseArms',
        component: RobotArms,
      },
    ],
  }],
});
