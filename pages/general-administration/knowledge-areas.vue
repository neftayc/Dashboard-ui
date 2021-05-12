<template>
  <div class="ed-container full">
    <div class="ed-item s-px-0">
      <el-card style="border-radius: 5px">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              {{ tableData.indexOf(scope.row) + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="Nombre">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Fecha Registro">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 5px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Acción"
            width="200"
            style="text-align: center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >Editar</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Eliminar</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'general-administration',
  data: () => ({
    tableData: [
      {
        date: '2016-05-03',
        name: 'Agencias Y Sociedades De Valores',
      },
      {
        date: '2016-05-02',
        name: '	Análisis Fundamental',
      },
      {
        date: '2016-05-04',
        name: 'Análisis Técnico',
      },
      {
        date: '2016-05-01',
        name: 'Areas de Conocimiento General',
      },
      {
        date: '2016-05-01',
        name: 'Aspectos Fiscales del Sector Financiero',
      },
      {
        date: '2016-05-01',
        name: '	Aspectos Legales del Sector Financiero',
      },
      {
        date: '2016-05-01',
        name: '	Auditoria',
      },
      {
        date: '2016-05-01',
        name: 'Banca de Empresas',
      },
      {
        date: '2016-05-01',
        name: 'BIG DATA',
      },
      {
        date: '2016-05-01',
        name: 'Cambio Climático',
      },
    ],
  }),
}
</script>
