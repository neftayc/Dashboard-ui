<template>
  <el-card style="border-radius: 5px">
    <p>{{ title }}</p>
    <div class="s-mb-2 header">
      <el-button type="primary" @click="$emit('add')">
        {{ addBtnText }}
      </el-button>
      <div class="search">
        <small class="s-pr-2">Search</small>
        <slot name="search"></slot>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="items"
      style="width: 100%"
      :default-sort="{ prop: 'height', order: 'descending' }"
    >
      <slot name="columns"> </slot>
      <el-table-column
        fixed="right"
        align="center"
        label="Acciones"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            circle
            @click="$emit('edit', scope)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="$emit('delete', scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="s-pt-3 footer">
      <div class="size">
        <small class="s-pr-1">Rows per page</small>
        <slot name="size"> </slot>
        <small class="s-pl-1"> Total {{ total }}</small>
      </div>
      <slot name="pagination"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Crud demo',
    },
    addBtnText: {
      type: String,
      default: 'Agregar',
    },
    loading: {
      type: Boolean,
      default: false,
    },

    items: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    display: flex;
    align-items: center;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .size {
    display: flex;
    align-items: center;
  }
}
</style>
