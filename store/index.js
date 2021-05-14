import createLogger from 'vuex/dist/logger'

export const plugins = [createLogger()]
export const strict = true

export const state = () => ({
  itemsMenu: [
    {
      name: 'Administración del Sistema',
      path: 'system-administration',
      icon: 'el-icon-s-grid',
      children: [
        {
          name: 'Aplicaciones',
          path: '/system-administration/apps',
          icon: 'el-icon-s-platform',
        },
        {
          name: 'Avisos Profesores',
          path: '/system-administration/notifications-teachers',
          icon: 'el-icon-s-check',
        },
        {
          name: 'Configuración',
          path: '/system-administration/settings',
          icon: 'el-icon-setting',
        },
        {
          name: 'Control de Versiones',
          path: '/system-administration/version-control',
          icon: 'el-icon-loading',
        },
      ],
    },
    {
      name: 'Administración General',
      path: '/general-administration/knowledge-areas',
      icon: 'el-icon-menu',
      children: [
        {
          name: 'Áreas de Conocimiento',
          path: '/general-administration/knowledge-areas',
          icon: 'el-icon-magic-stick',
        },
        {
          name: 'Áreas de Impartición',
          path: '/general-administration/teaching-areas',
          icon: 'el-icon-s-platform',
        },
        {
          name: 'Aulas',
          path: '/general-administration/classrooms',
          icon: 'el-icon-school',
        },
        {
          name: 'Departamentos',
          path: '/general-administration/departments',
          icon: 'el-icon-notebook-1',
        },
        {
          name: 'Entidades',
          path: '/general-administration/entities',
          icon: 'el-icon-s-ticket',
        },
        {
          name: 'Temas',
          path: '/general-administration/themes',
          icon: 'el-icon-s-open',
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

  notification: {
    title: '',
    message: '',
    type: 'SUCCESS',
  },
})
