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
      draggingElement: null,
      groups: [
        {
          id: 1,
          content: 'Project Name',
          className: `actual-project group-id-${1}`,
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
          className: 'vis-item-nested-project',
          content: '',
          align: 'left',
          start: '2022-03-01',
          end: '2022-03-15',
          selectable: true,
          editable: true
        },
        {
          group: 13,
          content: '',
          className: 'vis-item-nested-project',
          align: 'left',
          start: '2022-03-05',
          end: '2022-03-18',
          selectable: true,
          editable: true
        },
        {
          group: 14,
          content: '',
          className: 'vis-item-nested-project',
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
        timeAxis: { scale: 'day', step: 1 }
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

  mounted() {
    const groups = document.getElementsByClassName('vis-label actual-project');
    groups.forEach(group => {
      // allow element to be draggable
      group.setAttribute('draggable', true);

      // get class attribute
      const classAttribute = group.getAttribute('class').split(' ');
      let groupId = classAttribute
        .find(attr => attr.includes('group-id'))
        .split('-');
      groupId = Number(groupId[groupId.length - 1]);

      group.setAttribute('id', `group-${groupId}`);
      // set data-id and also to child nodes
      group.setAttribute('data-id', groupId);

      let childList = group.childNodes;

      childList.forEach(child => {
        child.setAttribute('data-id', groupId);
      });

      // add event listeners on project container
      group.addEventListener('dragover', function(event) {
        event.preventDefault();
      });
      group.addEventListener('drop', this.handleProjectDrop, false);
    });
  },

  methods: {
    // At the time draging starts
    onDragStart(event) {
      const dragSrcEl = event.target;
      const draggingId = dragSrcEl.id.split('-');
      this.draggingElement = Number(draggingId[draggingId.length - 1]);
      event.dataTransfer.effectAllowed = 'move';
      const item = {
        group: 22,
        id: dragSrcEl.id,
        type: 'range',
        content: 'new dragged item',
        editable: true,
        start: '2022-03-11',
        end: '2022-03-17'
      };
      event.target.id = dragSrcEl.id;
      event.dataTransfer.setData('text', JSON.stringify(item));
    },

    handleProjectDrop(event, id) {
      event.preventDefault();
      // id of group being dragged into
      const groupId = event.target.getAttribute('data-id');

      const nestedGroup = this.dragGroups.find(
        dg => dg.id === this.draggingElement
      );

      const parentGroup = this.groups.find(group => group.id == groupId);

      parentGroup.nestedGroups.push(this.draggingElement);

      this.groups.push(nestedGroup);

      const item = {
        group: this.draggingElement,
        content: '',
        className: 'vis-item-nested-project',
        align: 'left',
        start: '2022-03-30',
        end: '2022-04-05',
        selectable: true,
        editable: true
      };

      this.items.push(item);
    }
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
  font-size: 8px;
  max-height: 8px;
}

.vis-item-nested-project {
  background-color: green;
  color: white;
  border-color: green;
  border-radius: 10%;
  font-size: 8px;
  max-height: 8px;
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

.vis-item.vis-range {
  border-radius: 5px !important;
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
