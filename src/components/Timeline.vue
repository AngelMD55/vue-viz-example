<template>
  <div>
    <timeline ref="timeline" :items="items" :groups="groups" :options="options">
    </timeline>
  </div>
</template>

<script>
import { Timeline } from "vue2vis";
// import "vue2vis/dist/vue2vis.css";
export default {
  name: "TimelineVisu",
  components: {
    Timeline
  },
  data() {
    return {
      groups: [
        {
          id: 1,
          content: "Project Name",
          showNested: false,
          nestedGroups: [12, 13, 14]
        },
        {
          id: 12,
          content: "Mirco"
        },
        {
          id: 13,
          content: "Alan"
        },
        {
          id: 14,
          content: "Paolo"
        }
      ],
      items: [
        {
          group: 1,
          content: "Project Scope of work Non editable",
          align: "left",
          start: "2022-03-01",
          end: "2022-04-31",
          selectable: false,
          editable: false
        },
        {
          group: 12,
          content: "Employee alocated time editable",
          align: "left",
          start: "2022-03-01",
          end: "2022-03-15",
          selectable: true,
          editable: true
        },
        {
          group: 13,
          content: "Employee alocated time editable",
          align: "left",
          start: "2022-03-05",
          end: "2022-03-18",
          selectable: true,
          editable: true
        },
        {
          group: 14,
          content: "Employee alocated time editable",
          align: "left",
          start: "2022-03-15",
          end: "2022-03-30",
          selectable: true,
          editable: true
        }
      ],
      options: {
        locale: "it_IT",
        align: "left",
        autoResize: true,
        orientation: "top",
        zoomable: false,
        start: "2022-03-01",
        showCurrentTime: false,
        timeAxis: { scale: "day", step: 1 },

        onMove: function(e) {
          console.log("hello there", e);
        }
      }
    };
  },
  created() {}
};
</script>
