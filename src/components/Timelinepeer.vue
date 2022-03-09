<template>
  <div>
    <div id="visualization"></div>
    <!-- <div class="vis-project-group">
      <span>5433</span>
      <span>Metrotramvia via Adriano...</span>
    </div> -->
  </div>
</template>

<script>
import { DataSet } from "vis-data/peer";
import { Timeline } from "vis-timeline/peer";
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
          content: "",
          className: "vis-item-project-scope",
          align: "left",
          start: "2022-03-01",
          end: "2022-04-30",
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
          console.log("hello timeline peer", e);
        }
      },
      timeline: null
    };
  },

  mounted() {
    const container = document.getElementById("visualization");
    const groups = new DataSet(this.groups);
    const items = new DataSet(this.items);
    this.timeline = new Timeline(container, items, groups, this.options);
  }
};
</script>

<style>
.vis-item-project-scope {
  background-color: #104272;
  color: white;
  border-color: #104272;
  border-radius: 10%;
  font-size: 10px;
  max-height: 10px;
}

.vis-project-group {
  display: flex;
  background-color: #2fa4ff;
  border-left: solid 3px #104272;
  max-width: 150px;
  text-align: center;
  align-content: center;
  color: white;
}

.vis-project-number {
  height: 100%;
}
</style>
