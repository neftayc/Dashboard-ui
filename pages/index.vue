<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Fecha" min-width="150">
    </el-table-column>
    <el-table-column prop="name" label="Nombre" min-width="120">
    </el-table-column>
    <el-table-column prop="state" label="Estado" min-width="120">
    </el-table-column>
    <el-table-column prop="city" label="Ciudad" min-width="120">
    </el-table-column>
    <el-table-column prop="address" label="Dirección" min-width="300">
    </el-table-column>
    <el-table-column prop="zip" label="Código postal" min-width="120">
    </el-table-column>
    <el-table-column fixed="right" label="Operaciones" min-width="120">
      <template slot-scope>
        <el-button type="text" size="small">Detalle</el-button>
        <el-button type="text" size="small">Editar</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office',
        },
      ],
    }
  },
}
</script>
