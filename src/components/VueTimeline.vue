<template>
  <timeline v-bind:items="items" v-bind:groups="groups"></timeline>
</template>

<script>
import timeline from "vue-visjs-timeline";

export default {
  name: "vue-timeline",
  components: {
    timeline
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
        },
        {
          id: 2,
          content: "Project Name",
          showNested: false,
          nestedGroups: [22, 23, 24]
        },
        {
          id: 22,
          content: "Angel"
        },
        {
          id: 23,
          content: "Solange"
        },
        {
          id: 24,
          content: "Mario"
        }
      ],
      items: [
        {
          group: 1,
          content: "",
          className: "vis-item-project-scope",
          align: "left",
          start: "2022-03-01",
          end: "2022-04-30",
          type: "range",
          selectable: false,
          editable: false
        },
        {
          group: 12,
          content: "Mirco alocated time editable",
          align: "left",
          start: "2022-03-01",
          end: "2022-03-15",
          selectable: true,
          editable: true
        },
        {
          group: 13,
          content: "Alan alocated time editable",
          align: "left",
          start: "2022-03-05",
          end: "2022-03-18",
          selectable: true,
          editable: true
        },
        {
          group: 14,
          content: "Paolo alocated time editable",
          align: "left",
          start: "2022-03-15",
          end: "2022-03-30",
          selectable: true,
          editable: true
        },
        {
          group: 2,
          content: "",
          className: "vis-item-project-scope",
          align: "left",
          start: "2022-03-15",
          end: "2022-04-15",
          selectable: false,
          editable: false
        },
        {
          group: 22,
          content: "Angel alocated time editable",
          align: "left",
          start: "2022-03-15",
          end: "2022-03-30",
          selectable: true,
          editable: true
        },
        {
          group: 23,
          content: "Solange alocated time editable",
          align: "left",
          start: "2022-03-15",
          end: "2022-03-22",
          selectable: true,
          editable: true
        },
        {
          group: 24,
          content: "Mario alocated time editable",
          align: "left",
          start: "2022-03-15",
          end: "2022-04-05",
          selectable: true,
          editable: true
        }
      ]
    };
  }
};
</script>

<style>
@import "../../node_modules/vue-visjs-timeline/dist/vue-visjs-timeline.css";
</style>
