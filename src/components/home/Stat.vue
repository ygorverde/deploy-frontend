<template>
  <div class="stat">
      <div class="stat-icon">
          <i :class="icon" :style="style"></i>
      </div>
      <div class="stat-info">
          <span class="stat-title">{{ title }}</span>
          <span v-show="value" class="stat-value">{{ value }}</span>
          <!-- <div v-show="!value">
          <b-spinner :variant="variant" label="Loading..." small></b-spinner>
          </div> -->
      </div>
  </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color', 'variant'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat {
        display: flex;
        flex: 1;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        /* justify-content: space-between; */
        /* align-items: center; */
        /* padding: 15px; */
    }

    .stat-title {
        font-size: 1.2rem;
    }

    .stat-value {
        font-size: 2.5rem;
    }
</style>