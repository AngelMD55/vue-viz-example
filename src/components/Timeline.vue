<template>
  <div style="height: 100%">
    <timeline ref="timeline" :items="items" :groups="groups" :options="options">
    </timeline>

    <div>
      <div style="max-width : 200px; display: inline-block">
        <div
          v-for="group in dragGroups"
          :id="`group-id-${group.id}`"
          :key="`item-to-drag-${group.id}`"
          class="group-to-drag"
          draggable="true"
          @dragstart="onDragStart"
        >
          <i class="fas fa-cloud"></i>
          <span>{{ group.content }}</span>
        </div>
      </div>

      <!-- <div
        @dragover="onDragOver"
        @drop="onDrop"
        style="width : 300px; display: inline-block; border: 1px solid red; height: 200px;"
      ></div> -->
    </div>
  </div>
</template>

<script>
import { Timeline } from 'vue2vis';
import moment from 'moment';

export default {
  name: 'TimelineVisu',
  components: {
    Timeline
  },
  data() {
    return {
      groups: [
        {
          id: 1,
          content: 'Project Name',
          showNested: false,
          nestedGroups: [12, 13, 14]
        },
        {
          id: 12,
          content: 'Mirco'
        },
        {
          id: 13,
          content: 'Alan'
        },
        {
          id: 14,
          content: 'Paolo'
        }
      ],
      items: [
        {
          group: 1,
          className: 'vis-item-project-scope',
          content: '',
          align: 'left',
          start: '2022-03-01',
          end: '2022-04-31',
          selectable: false,
          editable: false
        },
        {
          group: 12,
          content: 'Employee alocated time editable',
          align: 'left',
          start: '2022-03-01',
          end: '2022-03-15',
          selectable: true,
          editable: true
        },
        {
          group: 13,
          content: 'Employee alocated time editable',
          align: 'left',
          start: '2022-03-05',
          end: '2022-03-18',
          selectable: true,
          editable: true
        },
        {
          group: 14,
          content: 'Employee alocated time editable',
          align: 'left',
          start: '2022-03-15',
          end: '2022-03-30',
          selectable: true,
          editable: true
        }
      ],
      options: {
        editable: true,
        locale: 'it',
        align: 'left',
        autoResize: true,
        orientation: 'top',
        zoomable: false,
        start: '2022-03-01',
        showCurrentTime: false,
        timeAxis: { scale: 'day', step: 1 },

        onMove: function(e) {
          console.log('hello there', e);
        }
      },
      dragGroups: [
        {
          id: 22,
          content: 'Angel'
        },
        {
          id: 23,
          content: 'Mario'
        },
        {
          id: 24,
          content: 'Solange'
        }
      ]
    };
  },

  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      // e.currentTarget.style.backgroundColor = 'yellow';
    }

    // onDragOver(e) {
    //   e.preventDefault();
    // },

    // onDrop(e) {
    //   console.log('drop', e);
    //   const id = e.dataTransfer.getData('text');
    //   const draggableElement = document.getElementById(id);
    //   const dropzone = e.target;

    //   dropzone.appendChild(draggableElement);

    //   e.dataTransfer.clearData();
    // }
  }
};
</script>

<style>
@import 'vue2vis/dist/vue2vis.css';
.vis-item-project-scope {
  background-color: #104272;
  color: white;
  border-color: #104272;
  border-radius: 10%;
  font-size: 10px;
  max-height: 10px;
}
.vis-minor.vis-saturday {
  background-color: lightgrey;
}

.vis-minor.vis-sunday {
  background-color: lightgrey;
}

.vis-text.vis-minor.vis-saturday {
  background-color: #104272;
  color: white;
}

.vis-text.vis-minor.vis-sunday {
  background-color: #104272;
  color: white;
}

.group-to-drag {
  padding: 4px;
  width: auto;
  display: flex;
  justify-content: start;
}

i {
  cursor: move;
  margin-right: 4px;
}
</style>
