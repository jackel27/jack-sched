<style>
  body.noScroll { /* ...or body.dialogShowing */
    overflow: hidden;
  }
  #previous-date {
    position: fixed;
      top: 0%;
      width: 100vw;
      /* color: red; */
      left: -101.1%;
  }
  #next-date {
    position: fixed;
      top: 0%;
      width: 100vw;
      /* color: red; */
      left: 101.1%;
  }
  #current-date {
    position: fixed;
    top:  0%;
    width:  100vw;
    left: 0%;
  }
   #app {
    /* position: fixed; */
    height: 100vh;
    width: 100vw;
   }
</style>
<template>
    <div id='app' >
  <v-touch   v-on:pan="onPan" v-on:panstart="onPanStart" v-on:panend="onPanEnd" v-bind:pan-options="{ direction: 'horizontal', threshold: 100 }">
      <!-- Previous Month... -->
      <calendar id='previous-date' v-on:panstart="onPanStart"  :style="{ top: '0', left: prevMonthPos + '%', transition: 'left ' + myTransition + 's' }" :date='prevDate' :startWeekday='weekdayStart(prevDate, "prev")' :totaldays='daysInMonth(prevDate)'></calendar>
      <!-- Current Month... -->
      <calendar id='current-date' v-on:panstart="onPanStart"   :style="{ top: '0', left: currentMonthPos + '%', transition: 'left ' + myTransition + 's' }" :date='date' :startWeekday='weekdayStart(date, null)' :totaldays='daysInMonth(date)'></calendar>
      <!-- Next Month... -->
      <calendar id='next-date' v-on:panstart="onPanStart"      :style="{ top: '0', left: nextMonthPos + '%', transition: 'left ' + myTransition + 's' }" :date='nextDate' :startWeekday='weekdayStart(nextDate, "next")' :totaldays='daysInMonth(nextDate)'></calendar>
  </v-touch>
    </div>
</template>
<script>
import Calendar from './components/Calendar'
export default {
  name: 'app',
  data () {
    return {
      checkTransition: 0,
      cycle: 0,
      panAmt: 0,
      myTransition: 1.5,
      prevMonthPos: -101.1,
      nextMonthPos: 101.1,
      currentMonthPos: 0,
      prevDate: new Date(),
      nextDate: new Date(),
      date: new Date(),
      dateref: new Date(),
      nextStartWeekday: 0,
      prevStartWeekday: 0,
      startWeekday: 0,
      timeout: null
    }
  },
  components: {
    Calendar
  },
  methods: {
    onPanStart () {
      this.nextMonth()
      clearTimeout(this.timer)
      this.timer = null
      this.myTransition = 1.5
    },
    onPan (e) {
      this.panAmt = e.deltaX / 4
      if (this.panAmt > 101.1) {
        this.panAmt = 101.1
      } else if (this.panAmt < -101.1) {
        this.panAmt = -101.1
      }
      this.prevMonthPos = -101 + this.panAmt
      this.nextMonthPos = 101 + this.panAmt
      this.currentMonthPos = this.panAmt
    },
    onPanEnd (e) {
      clearTimeout(this.timer)
      this.timer = null
      if (this.panAmt > 75 || this.panAmt < -75) {
        if (this.panAmt > 75) {
          this.prevMonthPos = 0
          this.currentMonthPos = 101.1
        } else {
          this.nextMonthPos = 0
          this.currentMonthPos = -101.1
        }
        this.timeout = setTimeout(this.panEndTimeout, 1500)
      } else {
        this.prevMonthPos = -101.1
        this.currentMonthPos = 0
        this.nextMonthPos = 101.1
      }
    },
    stopBodyScrolling (bool) {
      let freezeVp = (e) => {
        e.preventDefault()
      }
      if (bool === true) {
        document.body.addEventListener('touchmove', freezeVp, false)
      } else {
        document.body.removeEventListener('touchmove', freezeVp, false)
      }
    },
    panEndTimeout () {
      this.myTransition = 0
      if (this.panAmt > 75) {
        this.prevMonthPos = -101.1
        this.currentMonthPos = 0
        this.nextMonthPos = 101.1
        this.date = this.prevDate
      } else if (this.panAmt < -75) {
        this.prevMonthPos = -101.1
        this.currentMonthPos = 0
        this.nextMonthPos = 101.1
        this.date = this.nextDate
      }
    },
    nextMonth () {
      let nextDate = new Date()
      if (this.date.getMonth() === 11) {
        nextDate.setFullYear(this.date.getFullYear() + 1, 0, 1)
      } else {
        nextDate.setFullYear(this.date.getFullYear(), this.date.getMonth() + 1, 1)
      }
      this.nextDate = nextDate
      this.weekdayStart(this.nextDate, 'next')
    },
    prevMonth () {
      // this.prevMonth()
      let prevDate = new Date()
      if (this.date.getMonth() === 0) {
        prevDate.setFullYear(this.date.getFullYear() - 1, 11, 1)
      } else {
        prevDate.setFullYear(this.date.getFullYear(), this.date.getMonth() - 1, 1)
      }
      this.prevDate = prevDate
      this.weekdayStart(this.prevDate, 'prev')
    },
    daysInMonth (date) {
      return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
    },
    daysBetween (dateNow, referenceDate) {
      let oneDay = 24 * 60 * 60 * 1000
      return (Math.round(Math.abs((dateNow.getTime() - referenceDate.getTime()) / (oneDay))))
    },
    test () {
      console.log('yup it werks!')
    },
    weekdayStart (arg, dir) {
      let temp = new Date()
      temp.setFullYear(arg.getFullYear(), arg.getMonth(), 0)
      if (temp.getDay() < 6) {
        if (dir === 'prev') {
          this.prevStartWeekday = temp.getDay()
          return this.prevStartWeekday
        } else if (dir === 'next') {
          this.nextStartWeekday = temp.getDay()
          return this.nextStartWeekday
        } else {
          this.startWeekday = temp.getDay()
          return this.startWeekday
        }
      } else {
        return -1
      }
    }
  },
  mounted () {
    this.stopBodyScrolling(true)
    this.nextMonth()
    this.prevMonth()
    this.weekdayStart(this.date)
  }
}
</script>
