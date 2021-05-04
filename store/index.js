import createLogger from 'vuex/dist/logger'

export const plugins = [createLogger()]
export const strict = true

export const state = () => ({
  itemsMenu: [
    {
      name: 'Administración del Sistema',
      path: '/',
      icon: 'el-icon-s-grid',
      children: [
        {
          name: 'Aplicaciones',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Administración General',
      path: '/',
      icon: 'el-icon-menu',
      children: [
        {
          name: 'Áreas de Conocimiento',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Administración Alumnos',
      path: '/',
      icon: 'el-icon-user-solid',
      children: [
        {
          name: 'Alumnos',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Planificación del Calendario',
      path: '/',
      icon: 'el-icon-date',
      children: [
        {
          name: 'Calendario',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Vacaciones',
      path: '/',
      icon: 'el-icon-connection',
      children: [
        {
          name: 'Administración',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Facturación Profesores',
      path: '/',
      icon: 'el-icon-s-custom',
      children: [
        {
          name: 'Alarmas Profesores',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
    {
      name: 'Cuestionarios de Calidad',
      path: '/',
      icon: 'el-icon-document-copy',
      children: [
        {
          name: 'Consultar Cuestionarios',
          path: '/',
          icon: 'el-icon-s-management',
        },
      ],
    },
  ],
})
