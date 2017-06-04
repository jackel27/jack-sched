<style scoped>
  .days {
    font-size: 2em;
  }
  .calendar {
    height: 100vh;
    width: 100vw;
  }
  .calendar-month, #month-title {
    text-align: center;
    font-size: 2em;
  }
  .calendar-container, .calendar-head {
    width:  100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px 0 20px;
  }
  .day {
    width: calc(100% / 7);
    background-color: white;
    border: 1px solid black;
    height: calc(100vh / 7);
    font-weight: bolder;
  }
  .empty-day {
    background-color: grey;
  }
  .day-of-week {
    width: calc(100% / 7);
    height: calc(100vh / 20);
    background-color: aliceblue;
  }
  .calendar-head {
    /* margin-bottom: -45px; */
    font-size: 1.5em;
    text-align: center;
    color: black;
    font-weight: bold;
  }
  .days {
    width: 100%;
    height: 100%;
  }
  .currentday {
    background-color: rgba(0, 68, 60, 0.6);
  }
</style>

<template>
  <div class="Calendar">
  <div class="calendar-month">
    <p class="title is-1 is-spaced" id='month-title'> {{ months[date.getMonth()] }}, {{ date.getFullYear() }}</p>
  </div>
  <div class="calendar-head">
    <div class="day-of-week" v-for="weekday in dow">
    {{ weekday }}
    </div>
  </div>
   <div class="calendar-container">
    <div class="day empty-day" v-for="wd in startWeekday + 1">

    </div>
     <div class="day" v-for="day in totaldays">
       <div v-if="checkday(day)" class="currentday days" :id="day">
         {{ day }}
         {{ isWorkday(day) }}
       </div>
       <div v-else class="days" :id="day">
         {{ day }}
         {{ isWorkday(day) }}
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  components: {
  },
  props: [
    'date',
    'totaldays',
    'startWeekday'
  ],
  data () {
    return {
      referencePoint: new Date(),
      test: 'testing',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      dow: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  },
  mounted () {
    console.log('hi, im mounted now!')
    console.log(this.$parent.$parent.cycle)
  },
  updated () {
    console.log('hi, im updated now!')
    console.log(this.$parent.$parent.cycle)
  },
  methods: {
    checkday (day) {
      if (day === new Date().getDate() && this.date.getMonth() === new Date().getMonth()) {
        return true
      }
    },
    isWorkday (day) {
      // start of 1st day shift...
      this.referencePoint.setFullYear(2017, 4, 27)
      let refDate = this.date
      refDate.setFullYear(this.date.getFullYear(), this.date.getMonth(), day)
      // days since start of 1st day shift...
      let diffDays = this.daysBetween(refDate, this.referencePoint)
      if (diffDays % 8 === 0 || (diffDays - 1) % 8 === 0) {
        return ('Day')
      } else if ((diffDays - 2) % 8 === 0 || (diffDays - 3) % 8 === 0) {
        return ('Grave')
      }
    },
    daysBetween (dateNow, referenceDate) {
      let oneDay = 24 * 60 * 60 * 1000
      return (Math.round(Math.abs((dateNow.getTime() - referenceDate.getTime()) / (oneDay))))
    }
  }
}
</script>
