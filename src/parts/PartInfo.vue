<template>
    <div>
        <h1>{{ part.title }}</h1>
        <p>{{ part.description }}</p>
    </div>
</template>
<script>
import parts from '../data/parts';

export default {
  name: 'PartInfo',
  computed: {
    part() {
      /* eslint arrow-parems: 0 */
      const { partType, id } = this.$route.params;
      return parts[partType].find(part => part.id === +id);
    },
  },
};
</script>
