<template>
  <div class="demo-page-container">
    <div class="demo-page-content">
      <h1>Open Loan Calculator</h1>
      <button @click="handleClick">Click here</button>
      <div v-if="showCalculator">
        <LoanCalculator @close="closeCalculator" />
      </div>
    </div>
  </div>
</template>

<script>
import LoanCalculator from '@/components/LoanCalculator.vue';
import { ref } from 'vue';

export default {
  name: 'DemoPage',
  components: { LoanCalculator },
  setup() {

    const showCalculator = ref(false)

    const handleClick = () => {
      showCalculator.value = true
    };

    const closeCalculator = () => {
      showCalculator.value = false
    };

    return {
      handleClick,
      closeCalculator,
      showCalculator
    };
  }
}
</script>

<style>
.demo-page-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    font-family: Arial, sans-serif;
}

.demo-page-content {
    color: #223657;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
}

</style>
