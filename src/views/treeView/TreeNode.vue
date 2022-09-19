<template>
  <div>
    <div>
      <TreeCell
        @open="nodeClicked"
        :name="node.name"
        :targetId="node.id"
        :parent_id="node.parent_id"
        :rotate="expanded"
        :hasChild="hasChildren()"
        @addNewGroup="addNewGroup"
        @renameGroup="renameGroup"
        @deleteGroup="deleteGroup"
      />
    </div>
    <div class="separator"></div>
    <ul v-if="expanded" class="ullist">
      <li class="list" v-for="child in node.children" :key="child.id">
        <TreeNode :node="child" @onClick="nodeWasClicked" />
      </li>
    </ul>
  </div>
</template>

<script>
import TreeCell from "./treeCell.vue";
export default {
  name: "TreeNode",
  data() {
    return {
      expanded: false,
      childrenNode: {
        id: 1000,
        name: "let",
        parent_id: 1,
      },
    };
  },
  components: {
    TreeCell,
  },
  props: {
    name: {},
    node: {
      type: Object,
    },
  },
  computed: {
    getName() {
      return this.node.name;
    },
  },
  watch: {
    node: {
      handler() {
        this.hasChildren();
      },
    },
  },
  methods: {
    hasChildren() {
      return this.node.children;
    },
    addNewGroup(data) {
      data.id = Math.floor(Math.random() * 300000);
      // Запрос на бэк чтобы все добавилось
      console.log(this.node);
      if (this.node.hasOwnProperty("children")) {
        this.node.children.push(data);
      } else {
        this.node.children = [];
        this.node.children.push(data);
      }
      // this.nodeClicked();
      this.$forceUpdate();
    },
    renameGroup(data) {
      console.log(this.node);
      this.node.name = data.name;
      this.$forceUpdate();
      console.log("rename", data);
    },
    deleteGroup(data) {
      console.log("before", typeof this.node);
      delete this.node;
      console.log("after", this.node);
      this.$forceUpdate();
      this.$emit("forceUpdate");
    },
    nodeWasClicked(node, elem) {
      if (elem != undefined && this.contain(node.children, elem) === false) {
        node.children.push(elem);
      }
      console.log("elem", elem);
      console.log("node", node);
    },
    contain(arr, elem) {
      let status = false;
      arr.find((i) => {
        if (i.id == elem.id) {
          status = true;
        }
      });
      return status;
    },
    nodeClicked() {
      this.expanded = !this.expanded;
      if (!this.hasChildren) {
        // this.$emit("onClick", this.node);
      }
      // this.$emit("onClick", this.node, this.childrenNode);
    },
    clg() {
      this.$emit("onClick", this.node);
    },
    addChild(data, array) {
      console.log("data", data);
      console.log("array", array);
      array.push(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
}
.ullist {
  padding-left: 20px;
  margin-bottom: 0px;
}
.separator {
  border-bottom: 0.5px solid #f5f5f5;
  position: absolute;
  width: 100%;
  right: 0;
}
</style>
