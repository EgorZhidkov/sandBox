<template>
  <div class="center">
    <b-card
      class="treeView"
      header-class="treeView-header"
      body-class="treeView-body"
    >
      <template #header>
        <div class="treeView-header__groups">
          <span>Группы</span>
          <b-button class="treeView-header__groups__add">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 5.23077C8.26146 5.23077 5.23077 8.26146 5.23077 12C5.23077 15.7385 8.26146 18.7692 12 18.7692C15.7385 18.7692 18.7692 15.7385 18.7692 12C18.7692 8.26146 15.7385 5.23077 12 5.23077ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                fill="#616293"
              />
              <path
                d="M12.6152 8.92316C12.6152 8.5833 12.3397 8.30778 11.9998 8.30778C11.6599 8.30778 11.3844 8.5833 11.3844 8.92316V11.3853H8.9229C8.58303 11.3853 8.30752 11.6608 8.30752 12.0006C8.30752 12.3405 8.58303 12.616 8.9229 12.616H11.3844V15.077C11.3844 15.4169 11.6599 15.6924 11.9998 15.6924C12.3397 15.6924 12.6152 15.4169 12.6152 15.077V12.616H15.0767C15.4166 12.616 15.6921 12.3405 15.6921 12.0006C15.6921 11.6608 15.4166 11.3853 15.0767 11.3853H12.6152V8.92316Z"
                fill="#616293"
              />
            </svg>
          </b-button>
        </div>
        <div class="treeView-header__status">
          <span class="treeView-header__status__count">28</span>
          <b-button class="treeView-header__status__all">Показать все</b-button>
        </div>
      </template>
      <!-- <ul class="list padding">
        <li v-for="node in tree" :key="node.id">
          <TreeCell
            :name="node.name"
            :targetId="node.id"
            :parentid="node.parent_id"
          />
          <div class="separator"></div>
        </li>
      </ul> -->
      <TreeNode
        @forceUpdate="forceUpdate"
        v-for="node in tree"
        :key="node.id"
        :node="node"
      />
    </b-card>
  </div>
</template>

<script>
import TreeCell from "./treeCell.vue";
import tree from "./tree";
import TreeNode from "./TreeNode.vue";
export default {
  name: "treeView",
  components: { TreeCell, TreeNode },
  data() {
    return {
      tree: null,
    };
  },
  methods: {
    forceUpdate() {
      console.log(tree);
    },
  },
  mounted() {
    this.tree = tree;
  },
};
</script>

<style lang="scss" scoped>
.center {
  margin: auto auto;
}
.padding {
  padding-left: 0px;
}
.list {
  list-style: none;

  margin-bottom: 0px;
}
.treeView {
  max-width: 400px;
  margin: auto auto;
  background: #ffffff;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    &__groups {
      display: flex;
      & span {
        margin-right: 8px;
        font-family: "Monteserrat-SemiBold";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #242424;
      }
      &__add {
        border-color: white;
        background-color: unset;
        padding: 0px;
        border: none;
        &:hover {
          border-color: white !important;
          background-color: unset !important;
        }
        &:active {
          border-color: white !important;
          background-color: unset !important;
        }
        &:focus {
          box-shadow: none !important;
          border-color: white !important;
          background-color: unset !important;
        }
      }
    }
    &__status {
      display: flex;
      &__count {
        font-family: "Monteserrat-Regular";
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.5px;
        color: #000000;
      }
      &__all {
        font-family: "Monteserrat-Medium";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.5px;
        color: #9e9e9e;
        margin-left: 16px;
        border-color: white;
        background-color: unset;
        padding: 0px;
        border: none;
        &:hover {
          border-color: white !important;
          background-color: unset !important;
        }
        &:active {
          color: #9e9e9e !important;
          border-color: white !important;
          background-color: unset !important;
        }
        &:focus {
          box-shadow: none !important;
          border-color: white !important;
          background-color: unset !important;
        }
      }
    }
  }
  &-body {
    padding: 0px;
    position: relative;
  }
}
.separator {
  border-bottom: 0.5px solid #f5f5f5;
  position: absolute;
  width: 100%;
  right: 0;
}
</style>
