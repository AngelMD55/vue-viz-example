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
          content: "Group 1",
          showNested: true
          // nestedGroups: [
          //   {
          //     id: 12,
          //     content: "Mirco"
          //   }
          // ]
        },
        {
          id: 2,
          content: "Group 2"
        }
      ],
      items: [
        {
          group: 1,
          content: "",
          align: "left",
          start: "2022-03-01",
          end: "2022-03-15",
          selectable: true,
          editable: true
        },
        {
          group: 1,
          content: "",
          start: "2022-03-01",
          end: "2022-03-05",
          selectable: true,
          editable: true,
          type: "range"
        },
        {
          group: 1,
          content: "",
          start: "2022-03-05",
          end: "2022-03-10",
          selectable: true,
          editable: true,
          type: "range"
        },
        {
          group: 2,
          content: "",
          start: "2022-03-16",
          end: "2022-04-01",
          selectable: true,
          editable: true,
          type: "range"
        },
        {
          group: 2,
          content: "",
          start: "2022-03-25",
          end: "2022-04-01",
          selectable: true,
          editable: true,
          type: "range"
        },
        {
          group: 2,
          content: "",
          start: "2022-03-27",
          end: "2022-04-01",
          selectable: true,
          editable: true,
          type: "range"
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
        onMove: function(e) {
          console.log("hello there", e);
        }
      },
      timeline: null
    };
  },

  mounted() {
    this.timeline = new Timeline(document.getElementById("visualization"));
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.items);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
