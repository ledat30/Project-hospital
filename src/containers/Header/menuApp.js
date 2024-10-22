export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [

            { //quản lý kế hoạch khám bệnh của doctor
                name: 'menu.admin.manage-schedule',
                subMenus: [
                    { name: 'menu.admin.list_schedule', link: '/system/manage-schedule' },
                    { name: 'menu.admin.creat_schedule', link: '/system/create-schedule' }
                ]
            },

            {
                name: 'menu.admin.manage-doctor',
                subMenus: [
                    { name: 'menu.admin.list', link: '/system/manage-doctor' },
                    { name: 'menu.admin.creat_edit', link: '/system/create_edit' }
                ]

            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },

        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-category_handbook', link: '/system/manage-categoryhandbook',
            },
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },
    { //quản lý chính sách
        name: 'menu.admin.policy',
        menus: [
            {
                name: 'menu.admin.manage-policy', link: '/system/manage-policy',
            },
        ]
    },
    { //quản lý câu hỏi
        name: 'menu.admin.question',
        menus: [
            {
                name: 'menu.admin.manage-question', link: '/system/manage-question',
            },
        ]
    },
    { //quản contact
        name: 'menu.admin.contact',
        menus: [
            {
                name: 'menu.admin.manage-contact', link: '/system/manage-contact',
            },
        ]
    },
    { //quản lý thống kê
        name: 'menu.admin.statistical',
        menus: [
            {
                name: 'menu.admin.manage-statistical', link: '/system/manage-statistical',
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-schdele&patinet',
        menus: [
            {//quan ly ke hoach cua bac si
                // name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
                name: 'menu.doctor.manage-schedule',
                subMenus: [
                    { name: 'menu.doctor.list_schedule', link: '/doctor/manage-schedule' },
                    { name: 'menu.doctor.creat_schedule', link: '/doctor/create-schedule' }
                ]
            },
            {// quản lý bệnh nhân khám bệnh của bac si
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient',
            },
        ]
    },
    {
        name: 'menu.admin.manage-user',
        menus: [
            {// quản lý hồ sơ
                name: 'menu.doctor.manage-profile', link: '/doctor/manage-profile',
            },
        ]
    },
];