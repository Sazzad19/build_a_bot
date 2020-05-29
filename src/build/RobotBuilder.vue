<template>
 <div class="content">
       <div class="preview">
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedRobot.head.src"/>
        </div>
        <div class="middle-row">
          <img :src="selectedRobot.leftarm.src" class="rotate-left"/>
          <img :src="selectedRobot.torso.src"/>
          <img :src="selectedRobot.rightarm.src" class="rotate-right"/>
        </div>
        <div class="bottom-row">
          <img :src="selectedRobot.base.src"/>
        </div>
      </div>
      <button class="add-to-cart" @click="addToCart()">Add To Cart</button>
    </div>
    <div class="top-row">
       <!-- <div class="robot-name">
        {{selectedRobot.head.title}}<span v-show="selectedRobot.head.onSale" class="sale">sale!</span>
       </div> -->
       <PartSelector
         :parts="availableParts.heads"
         position="top"
         @partSelected="part => selectedRobot.head = part"/>
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        position="left"
        @partSelected="part => selectedRobot.leftarm = part"/>
      <PartSelector
        :parts="availableParts.torsos"
        @partSelected="part => selectedRobot.torso = part"/>
      <PartSelector
        :parts="availableParts.arms"
        position="right"
        @partSelected="part => selectedRobot.rightarm = part"/>
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        position="bottom"
        @partSelected="part => selectedRobot.base = part"/>
    </div>
    <div>
      <h1>CART</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{ robot.head.title }}</td>
            <td class="cost">{{ robot.cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
import availableParts from '../data/parts';
import PartSelector from './PartSelector.vue';

export default {
  components: { PartSelector },
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /*  eslint no-restricted-globals: 0 */
      const response = confirm('You have not added your Robot to your cart yet. Are you sure to leave?');
      next(response);
    }
  },
  data() {
    return {
      availableParts,
      addedToCart: false,
      cart: [],
      selectedRobot: {
        head: {},
        leftarm: {},
        torso: {},
        rightarm: {},
        base: {},
      },


    };
  },
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },

  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = this.selectedRobot.head.cost
      + this.selectedRobot.leftarm.cost
      + this.selectedRobot.torso.cost
      + this.selectedRobot.rightarm.cost
      + this.selectedRobot.base.cost;
      this.cart.push({ ...{}, ...robot, ...{ cost } });
      this.addedToCart = true;
    },
  },
};
</script>
<style scoped>
.content{
  position: relative;
}
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.sale-border{
  border: solid red 3px;
}
.part img {
  width:165px;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
.add-to-cart{
  position: absolute;
  right: 30px;
  widows: 220px;
  padding: 5px;
  font-size: 16px;
}
td th{
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost{
  text-align: right;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.robot-name {
position: absolute;
top: -25px;
text-align: center;
widows: 100%;
}
.sale{
  color:red;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
</style>
