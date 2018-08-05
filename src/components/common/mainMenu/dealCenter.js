export default {
    activeIndex:'deal-center',
    items: [
        {
            icon: 'el-icon-setting',
            index: '/dashboard',
            title: '数据看板',
        },
        {
            icon: 'el-icon-tickets',
            index: '/table',
            title: '基础表格'
        },
        {
            icon: 'el-icon-message',
            index: '/tabs',
            title: 'tab选项卡'
        },
        {
            icon: 'el-icon-date',
            index: '/test',
            title: '表单相关',
            subItems: [
                {
                    icon:'el-icon-tickets',
                    index: '/form',
                    title: '基本表单'
                },
                {
                    icon:'el-icon-tickets',
                    index: '/editor',
                    title: '富文本编辑器'
                },
                {
                    icon:'el-icon-tickets',
                    index: '/markdown',
                    title: 'markdown编辑器'
                },
                {
                    icon:'el-icon-tickets',
                    index: '/upload',
                    title: '文件上传'
                }
            ]
        },
        // {
        //     icon: 'el-icon-star-on',
        //     index: '/charts',
        //     title: 'schart图表'
        // },
        {
            icon: 'el-icon-rank',
            index: '/drag',
            title: '拖拽列表'
        },
        {
            icon: 'el-icon-warning',
            index: '/permission',
            title: '权限测试'
        },
        {
            icon: 'el-icon-error',
            index: '/404',
            title: '404页面'
        }
    ]
}