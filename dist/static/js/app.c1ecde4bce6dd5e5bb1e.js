webpackJsonp([0],[,,function(t,e,n){"use strict";var a=n(1),s=n(19),o=n(15),r=n.n(o);a.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"Home",component:r.a}]})},function(t,e){},function(t,e,n){function a(t){n(11)}var s=n(0)(n(7),n(17),a,null,null);t.exports=s.exports},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),s=n(4),o=n.n(s),r=n(2),i=n(3),d=(n.n(i),n(5));a.a.use(d,{name:"v-touch"}),a.a.config.productionTip=!1,new a.a({el:"#app",router:r.a,template:"<App/>",components:{App:o.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(14),s=n.n(a);e.default={name:"app",data:function(){return{checkTransition:0,cycle:0,panAmt:0,myTransition:1.5,prevMonthPos:-101.1,nextMonthPos:101.1,currentMonthPos:0,prevDate:new Date,nextDate:new Date,date:new Date,dateref:new Date,nextStartWeekday:0,prevStartWeekday:0,startWeekday:0,timeout:null}},components:{Calendar:s.a},methods:{onPanStart:function(){this.nextMonth(),clearTimeout(this.timer),this.timer=null,this.myTransition=1.5},onPan:function(t){this.panAmt=t.deltaX/4,this.panAmt>101.1?this.panAmt=101.1:this.panAmt<-101.1&&(this.panAmt=-101.1),this.prevMonthPos=-101+this.panAmt,this.nextMonthPos=101+this.panAmt,this.currentMonthPos=this.panAmt},onPanEnd:function(t){clearTimeout(this.timer),this.timer=null,this.panAmt>75||this.panAmt<-75?(this.panAmt>75?(this.prevMonthPos=0,this.currentMonthPos=101.1):(this.nextMonthPos=0,this.currentMonthPos=-101.1),this.timeout=setTimeout(this.panEndTimeout,1500)):(this.prevMonthPos=-101.1,this.currentMonthPos=0,this.nextMonthPos=101.1)},stopBodyScrolling:function(t){var e=function(t){t.preventDefault()};!0===t?document.body.addEventListener("touchmove",e,!1):document.body.removeEventListener("touchmove",e,!1)},panEndTimeout:function(){this.myTransition=0,this.panAmt>75?(this.prevMonthPos=-101.1,this.currentMonthPos=0,this.nextMonthPos=101.1,this.date=this.prevDate):this.panAmt<-75&&(this.prevMonthPos=-101.1,this.currentMonthPos=0,this.nextMonthPos=101.1,this.date=this.nextDate)},nextMonth:function(){var t=new Date;11===this.date.getMonth()?t.setFullYear(this.date.getFullYear()+1,0,1):t.setFullYear(this.date.getFullYear(),this.date.getMonth()+1,1),this.nextDate=t,this.weekdayStart(this.nextDate,"next")},prevMonth:function(){var t=new Date;0===this.date.getMonth()?t.setFullYear(this.date.getFullYear()-1,11,1):t.setFullYear(this.date.getFullYear(),this.date.getMonth()-1,1),this.prevDate=t,this.weekdayStart(this.prevDate,"prev")},daysInMonth:function(t){return new Date(t.getYear(),t.getMonth()+1,0).getDate()},daysBetween:function(t,e){return Math.round(Math.abs((t.getTime()-e.getTime())/864e5))},test:function(){console.log("yup it werks!")},weekdayStart:function(t,e){var n=new Date;return n.setFullYear(t.getFullYear(),t.getMonth(),0),n.getDay()<6?"prev"===e?(this.prevStartWeekday=n.getDay(),this.prevStartWeekday):"next"===e?(this.nextStartWeekday=n.getDay(),this.nextStartWeekday):(this.startWeekday=n.getDay(),this.startWeekday):-1}},mounted:function(){this.stopBodyScrolling(!0),this.nextMonth(),this.prevMonth(),this.weekdayStart(this.date)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Calendar",components:{},props:["date","totaldays","startWeekday"],data:function(){return{referencePoint:new Date,test:"testing",months:["January","February","March","April","May","June","July","August","September","October","November","December"],dow:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},mounted:function(){console.log("hi, im mounted now!"),console.log(this.$parent.$parent.cycle)},updated:function(){console.log("hi, im updated now!"),console.log(this.$parent.$parent.cycle)},methods:{checkday:function(t){if(t===(new Date).getDate()&&this.date.getMonth()===(new Date).getMonth())return!0},isWorkday:function(t){this.referencePoint.setFullYear(2017,4,27);var e=this.date;e.setFullYear(this.date.getFullYear(),this.date.getMonth(),t);var n=this.daysBetween(e,this.referencePoint);return n%8==0||(n-1)%8==0?"Day":(n-2)%8==0||(n-3)%8==0?"Grave":void 0},daysBetween:function(t,e){return Math.round(Math.abs((t.getTime()-e.getTime())/864e5))}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Hello",components:{},mounted:function(){},data:function(){return{}},methods:{}}},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){function a(t){n(10)}var s=n(0)(n(8),n(16),a,"data-v-3a94327c",null);t.exports=s.exports},function(t,e,n){function a(t){n(12)}var s=n(0)(n(9),n(18),a,"data-v-f71392c6",null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Calendar"},[n("div",{staticClass:"calendar-month"},[n("p",{staticClass:"title is-1 is-spaced",attrs:{id:"month-title"}},[t._v(" "+t._s(t.months[t.date.getMonth()])+", "+t._s(t.date.getFullYear()))])]),t._v(" "),n("div",{staticClass:"calendar-head"},t._l(t.dow,function(e){return n("div",{staticClass:"day-of-week"},[t._v("\n  "+t._s(e)+"\n  ")])})),t._v(" "),n("div",{staticClass:"calendar-container"},[t._l(t.startWeekday+1,function(t){return n("div",{staticClass:"day empty-day"})}),t._v(" "),t._l(t.totaldays,function(e){return n("div",{staticClass:"day"},[t.checkday(e)?n("div",{staticClass:"currentday days",attrs:{id:e}},[t._v("\n       "+t._s(e)+"\n       "+t._s(t.isWorkday(e))+"\n     ")]):n("div",{staticClass:"days",attrs:{id:e}},[t._v("\n       "+t._s(e)+"\n       "+t._s(t.isWorkday(e))+"\n     ")])])})],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-touch",{attrs:{"pan-options":{direction:"horizontal",threshold:100}},on:{pan:t.onPan,panstart:t.onPanStart,panend:t.onPanEnd}},[n("calendar",{style:{top:"0",left:t.prevMonthPos+"%",transition:"left "+t.myTransition+"s"},attrs:{id:"previous-date",date:t.prevDate,startWeekday:t.weekdayStart(t.prevDate,"prev"),totaldays:t.daysInMonth(t.prevDate)},on:{panstart:t.onPanStart}}),t._v(" "),n("calendar",{style:{top:"0",left:t.currentMonthPos+"%",transition:"left "+t.myTransition+"s"},attrs:{id:"current-date",date:t.date,startWeekday:t.weekdayStart(t.date,null),totaldays:t.daysInMonth(t.date)},on:{panstart:t.onPanStart}}),t._v(" "),n("calendar",{style:{top:"0",left:t.nextMonthPos+"%",transition:"left "+t.myTransition+"s"},attrs:{id:"next-date",date:t.nextDate,startWeekday:t.weekdayStart(t.nextDate,"next"),totaldays:t.daysInMonth(t.nextDate)},on:{panstart:t.onPanStart}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"'Hello'"})},staticRenderFns:[]}}],[6]);
//# sourceMappingURL=app.c1ecde4bce6dd5e5bb1e.js.map