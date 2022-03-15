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
          type: 'project',
          projectCode: '544',
          className: `actual-project group-id-${1}`,
          showNested: false,
          visible: true,
          nestedGroups: [12, 13, 14]
        },
        {
          id: 12,
          content: 'Mirco',
          type: 'employee',
          isSupervisor: true,
          visible: true
        },
        {
          id: 13,
          content: 'Alan',
          type: 'employee',
          visible: true,
          isSupervisor: false
        },
        {
          id: 14,
          content: 'Paolo',
          type: 'employee',
          visible: true,
          isSupervisor: false
        },
        {
          id: 2,
          content: 'Project Name',
          type: 'project',
          projectCode: '533',
          className: `actual-project group-id-${2}`,
          showNested: false,
          visible: true,
          nestedGroups: [32, 33, 34]
        },
        {
          id: 32,
          content: 'Manuel',
          type: 'employee',
          isSupervisor: true,
          visible: true
        },
        {
          id: 33,
          content: 'Juan',
          type: 'employee',
          visible: true,
          isSupervisor: false
        },
        {
          id: 34,
          content: 'Pedro',
          type: 'employee',
          visible: true,
          isSupervisor: false
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
        },
        {
          group: 2,
          className: 'vis-item-project-scope',
          content: '',
          align: 'left',
          start: '2022-03-01',
          end: '2022-04-15',
          selectable: false,
          editable: false
        },
        {
          group: 32,
          className: 'vis-item-nested-project',
          content: '',
          align: 'left',
          start: '2022-03-01',
          end: '2022-03-15',
          selectable: true,
          editable: true
        },
        {
          group: 33,
          content: '',
          className: 'vis-item-nested-project',
          align: 'left',
          start: '2022-03-05',
          end: '2022-03-18',
          selectable: true,
          editable: true
        },
        {
          group: 34,
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
        timeAxis: { scale: 'day', step: 1 },
        groupTemplate: function(item, element, data) {
          if (item.type === 'project') {
            const wrapper = document.createElement('div');
            wrapper.classList.add(`actual-project`);
            wrapper.classList.add(`project-template`);
            wrapper.classList.add(`group-id-${item.id}`);
            wrapper.setAttribute('data-id', item.id);

            const projectCode = document.createElement('span');
            projectCode.classList.add('project-code-name');
            projectCode.setAttribute('data-id', item.id);
            projectCode.innerText = item.projectCode;

            const projectName = document.createElement('span');
            projectName.classList.add('project-code-name');
            projectName.setAttribute('data-id', item.id);
            projectName.innerText = item.content;

            wrapper.appendChild(projectCode);
            wrapper.appendChild(projectName);

            return wrapper;
          }

          const wrapper = document.createElement('div');
          wrapper.classList.add('group-template-items');

          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('id', `employee-${item.id}`);
          checkbox.style.marginRight = '8px';

          checkbox.addEventListener(
            'change',
            function(e) {
              const { checked } = e.target;
              const grandParent = e.target.parentNode.parentNode;
              if (checked) {
                grandParent.classList.remove('group-template-not-supervisor');
                grandParent.classList.add('group-template-is-supervisor');
              } else {
                grandParent.classList.remove('group-template-is-supervisor');
                grandParent.classList.add('group-template-not-supervisor');
              }
            },
            false
          );

          if (item.isSupervisor) {
            checkbox.setAttribute('checked', true);
          }

          const span = document.createElement('span');
          span.innerText = item.content;

          wrapper.appendChild(checkbox);
          wrapper.appendChild(span);

          element.classList.add('group-template');

          if (item.isSupervisor) {
            element.classList.add('group-template-is-supervisor');
          } else {
            element.classList.add('group-template-not-supervisor');
          }

          return wrapper;
        },

        onMove: item => {
          this.movingItem(item);
        }
      },
      dragGroups: [
        {
          id: 22,
          content: 'Angel',
          type: 'employee',
          visible: true,
          isSupervisor: false
        },
        {
          id: 23,
          content: 'Mario',
          type: 'employee',
          visible: true,
          isSupervisor: false
        },
        {
          id: 24,
          content: 'Solange',
          type: 'employee',
          visible: true,
          isSupervisor: false
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

      group.classList.add('project-wrapper');

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
    test(test) {
      console.log('test', test);
    },

    movingItem(item) {
      const { id, start, end } = item;

      const foundItem = this.items.find(item => item.id === id);

      foundItem.start = moment(start).format('YYYY-MM-DD');
      foundItem.end = moment(end).format('YYYY-MM-DD');
    },
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
      console.log(parentGroup);
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
      parentGroup.showNested = true;
      parentGroup.visible = true;
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

/* .vis-text.vis-minor {
  font-size: 12px;
} */

.vis-item.vis-range {
  border-radius: 5px !important;
}

.group-to-drag {
  padding: 4px;
  width: auto;
  display: flex;
  justify-content: start;
}

.group-template {
  width: 100%;
  padding: 4px !important;
}

.group-template-is-supervisor {
  background-color: #bfa200 !important;
}

.group-template-not-supervisor {
  background-color: #989898 !important;
}

.group-template-items {
  display: flex;
  align-items: center;
  justify-items: left;
  color: white;
}

.project-template {
  height: 100%;
  width: 100%;
  color: white;
  background-color: #005ab1;
  display: flex;
  align-items: center;
}

.project-code-name {
  margin: 12px 4px;
}

.vis-label.vis-nesting-group:before,
.vis-label.vis-nesting-group:before {
  display: none;
}

/* .project-wrapper .vis-inner {
  padding: 0px !important;
  height: 100%;
} */

.project-wrapper {
  border-left: 4px solid #104272;
  background-color: #005ab1;
  padding: 0px;
}

i {
  cursor: move;
  margin-right: 4px;
}

.vis-january:first-letter {
  text-transform: uppercase;
}
.vis-february:first-letter {
  text-transform: uppercase;
}
.vis-march:first-letter {
  text-transform: uppercase;
}
.vis-april:first-letter {
  text-transform: uppercase;
}
.vis-may:first-letter {
  text-transform: uppercase;
}
.vis-june:first-letter {
  text-transform: uppercase;
}
.vis-july:first-letter {
  text-transform: uppercase;
}
.vis-august:first-letter {
  text-transform: uppercase;
}
.vis-september:first-letter {
  text-transform: uppercase;
}
.vis-october:first-letter {
  text-transform: uppercase;
}
.vis-november:first-letter {
  text-transform: uppercase;
}
.vis-december:first-letter {
  text-transform: uppercase;
}
</style>
