<template>
  <div id="visualization"></div>
</template>

<script>
import { Timeline } from "vis-timeline/standalone";
export default {
  name: "visualization",

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
          end: "2022-04-30",
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
        locale: "it",
        align: "left",
        autoResize: true,
        orientation: "top",
        zoomable: false,
        start: "2022-03-01",
        showCurrentTime: false,
        timeAxis: { scale: "day", step: 1 },
        itemsAlwaysDraggable: true,
        onMove: function(e) {
          console.log("hello there", e);
        }
      },
      timeline: null
    };
  },

  mounted() {
    this.timeline = new Timeline(document.getElementById("visualization"));
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.items);
    this.timeline.setOptions(this.options);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
