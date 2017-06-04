<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100i');
  @media only screen
  and (orientation: portrait) {

  }
  .dayClass {
    color: #DFDFDF;
     background: linear-gradient(to bottom, #fe8c00, #f83600); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .NightClass {
    background: linear-gradient(to top, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #DFDFDF;
  }
  .day {
    width: calc(100% / 7);
    background: linear-gradient(to bottom, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border: 1px solid black;
    height: calc(100vh / 7);
    /* font-weight: bolder; */
  }
  .days {
    font-size: 2em;
  }
  .calendar {
    height: 100vh;
    width: 100vw;
  }
  .calendar-month, #month-title {
    text-align: center;
/*     margin-top: 20px;
    margin-bottom: 60px; */
    font-size: 3em;
    color: ghostwhite;
  }
  .day-number {
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
  }
  .calendar-container, .calendar-head {
    width:  100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px 0 20px;
  }
  .empty-day {
    background: linear-gradient(#414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .day-of-week {
    width: calc(100% / 7);
    /* height: calc(100vh / 30); */
    color: rgba(215, 221, 232, .3);
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
    /* background-color: rgba(0, 68, 60, 0.6)!important; */
    background: linear-gradient(to bottom, #26a0da, #314755)!important;
  }
  .day-workday {
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    text-align: center;
  }
   @media only screen
  and (orientation: landscape) {
    .day-workday {
      color: transparent!important;
    }
    .day {
      height: calc(100vh / 7.23);
    }
    .calendar-month, #month-title {
      text-align: center;
  /*     margin-top: 20px;
      margin-bottom: 60px; */
      font-size: 1.5em;
      color: ghostwhite;
    }
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
       <div v-if="checkday(day)" class="currentday days" :class="{'dayClass': isWorkday(day) === 'Day', 'NightClass': isWorkday(day) === 'Night'}" :id="day">
         <p class='day-number'>{{ day }}</p>
         <p class='day-workday'>{{ isWorkday(day) }}</p>
       </div>
       <div v-else class="days" :class="{'dayClass': isWorkday(day) === 'Day', 'NightClass': isWorkday(day) === 'Night'}" :id="day">
         <p class='day-number'>{{ day }}</p>
        <p class='day-workday'>{{ isWorkday(day) }}</p>
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
        return ('Night')
      }
    },
    daysBetween (dateNow, referenceDate) {
      let oneDay = 24 * 60 * 60 * 1000
      return (Math.round(Math.abs((dateNow.getTime() - referenceDate.getTime()) / (oneDay))))
    }
  }
}
</script>
