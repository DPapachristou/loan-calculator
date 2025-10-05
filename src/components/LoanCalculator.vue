<template>
  <div class="backdrop">
    <div class="loan-calculator">
      <button class="close-button" @click="$emit('close')">x</button>
      <div class="calculator-container">
      <div class="calculator-header">
      <h1>Υπολογισμός δόσης</h1>
      <p>Επίλεξε την προκαταβολή και την διάρκεια που σε συμφέρει</p>
      </div>
      <div class="calculator-body">
        <div class="calculator-downpayment">
        <span class="downpayment-label">Προκαταβολή</span>
        <span class="downpayment-value">{{ amount }} €</span>
        <input class="range" type="range" min="0" max="20000" step="100" v-model.number="amount"/>
        <div class="downpayment-minmax">
        <span class="mindownpayment">{{ minDownpayment }} €</span>
        <span class="maxdownpayment">{{ maxDownpayment }} €</span>
        </div>
        </div>
        <div class="calculator-duration">
        <p class="duration-label">Διάρκεια</p>
        <p class="duration-value">{{ duration }} μήνες</p>
        <input class="range" type="range" min="3" max="72" step="1" v-model.number="duration"/>
        <div class="duration-minmax">
        <span class="duration-min">{{ minDuration }} μήνες</span>
        <span class="duration-max">{{maxDuration}} μήνες</span>
        </div>
        </div>
        <p>Μηνιαία Δόση: {{monthlyInstallment}} €</p>
      </div>
      </div>
      <div class="calculator-footer">
        <div class="phone-instructions">
        <p>Συμπλήρωσε εδώ το τηλέφωνο σου.</p>
        <p>Θα σε καλέσουμε άμεσα.</p>
        </div>
        <div class="phone-input-group">
        <input class="input-phone" type="tel" placeholder="Αριθμός Τηλεφώνου..." v-model="phone" inputmode="numeric"/>
        <button type="button" class="phone-button" @click="handleSubmit">
            ΚΑΛΕΣΤΕ
        </button>
        </div>
        <div class="result-message">
        <span v-if="errorMessage">{{errorMessage}}</span>
        <span v-else-if="successMessage">{{successMessage}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'LoanCalculator',
  emits: ['close'],
    setup() {
        const finalPrice = 20000
        const minDuration = 3
        const maxDuration = 72
        const minDownpayment = 0
        const maxDownpayment = 20000
        const amount = ref(0)
        const duration = ref(3)

        const phone = ref('')
        const errorMessage = ref('')
        const successMessage = ref('')
        
        
        const handleSubmit = () => {
            errorMessage.value = ''
            successMessage.value = ''
            const phoneTrim = phone.value.trim()

            if (!/^\d+$/.test(phoneTrim)) {
                return errorMessage.value = 'Επιτρέπονται μόνο αριθμοί (0–9).'
            }
            if (phoneTrim.length !== 10) {
                return errorMessage.value = 'O αριθμός πρέπει να περιέχει 10 ψηφία'
            } else {
                return successMessage.value = 'Ευχαριστούμε! Θα επικοινωνήσουμε άμεσα μαζί σας.'
            }  
        }

        const monthlyInstallment = computed(() => {
            const principal = finalPrice - amount.value
            const numberOfPayments = duration.value
            return Math.round(principal / numberOfPayments)
        });

        return {
            finalPrice,
            minDuration,
            maxDuration,
            minDownpayment,
            maxDownpayment,
            amount,
            duration,
            monthlyInstallment,
            phone,
            handleSubmit,
            errorMessage,
            successMessage
        }
    }
}
</script>

<style scoped lang="scss">

.backdrop {
  position: fixed; 
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; 
  align-items: center; 
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}


.loan-calculator {
  position: relative;
  width: 100%; 
  max-width: 720px;
  background: #fff; 
  border: 1px solid; 
  border-radius: 5px;
  box-shadow: 0 12px 32px rgba(0,0,0,.14);
  overflow: hidden;
}


.close-button {
  position: absolute; 
  top: 10px; 
  right: 12px;
  width: 28px; 
  height: 28px;
  border: none;
  font-size: 15px;
  color: grey;
  background: #fff; 
  cursor: pointer;
}

.calculator-header {
  background: white; 
  color: black; 
  text-align: center; 
  padding: 45px 24px 12px 24px;
  font-size: 13px;
}

.calculator.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 30px;
  margin-right: 30px;
}


.calculator-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 130px 18px;

  p:last-child {
    align-self: center;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #111;
  }
}


.calculator-downpayment {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 6px;
  padding: 14px 0;
}



.downpayment-label {
  flex: 1 1 50%;
  align-items: flex-end;
  text-align: left;
  margin: 0;
  font-weight: 700;
  font-size: 14px;
  color: #111;
}

.downpayment-value {
  flex: 1 1 50%;
  align-self: flex-end;
  margin: 0;
  text-align: right;
  font-size: 20px;
  font-weight: 800;
  color: #111;
}

.range {
  flex: 0 0 100%;
  width: 100%;
  margin: 10px 0 2px;
  accent-color: #01aed8;
}


.range::-webkit-slider-thumb{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.2);
  cursor: pointer;
}

.downpayment-minmax {
  flex: 0 0 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.calculator-duration {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 6px;
  padding: 14px 0;
}
.duration-label {
  flex: 1 1 50%;
  align-self: center;
  text-align: left;
  margin: 0;
  font-weight: 700;
  font-size: 14px;
  color: #111;
}

.duration-value {
  flex: 1 1 50%;
  align-self: flex-end;
  margin: 0;
  text-align: right;
  font-size: 20px;
  font-weight: 800;
  color: #111;
}
.duration-range {
  flex: 0 0 100%;
  width: 100%;
  margin: 10px 0 2px;
  accent-color: #01aed8;
}
.duration-minmax {
  flex: 0 0 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.calculator-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #223657;
  color: white;
  padding: 16px;
}

.phone-instructions {
  margin: 0;
  padding-left: 40px;
  font-size: 14px;
  opacity: .9;
  flex: 0 0 320px;
  text-align: left;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-size: 16px;
  font-stretch: expanded;
  color: white;
}

.phone-input-group{
   display: flex;
   align-items: stretch;
   gap: 0;
   margin-left: auto;
   padding-right: 5px;
}

.input-phone{
  flex: 1 1 auto;
  padding: 10px;
  padding-left: 50px;
  justify-self: center;
  border-radius: 4px 0 0 4px ;
  border: 1px solid rgba(255,255,255,.25);
  background: rgba(255,255,255,.92)
              url('/src/assets/phone.svg') no-repeat 8px 25%;
  color: #0f172a;
  font-size: 14px;
  &::placeholder { color: #64748b; }
}

.phone-button{
  flex: 0 0 auto;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 0 4px 4px 0;
  background: #55ac36;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
}

.result-message {
  flex: 0 0 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
  color: white;
}

</style>
