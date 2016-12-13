
/**
 * Config for the app router
 */
app.config(['$stateProvider',
function ($stateProvider) {

    $stateProvider.state('auth', {
        url: '/auth',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        title: 'sidebar.nav.auth.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.auth.MAIN'
        }
    }).state('auth.login', {
        url: '/login',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/login.html',
        title: 'content.list.LOGIN',
        ncyBreadcrumb: {
            label: 'content.list.LOGIN'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('LoginCtrl', 'LoginService')
    }).state('auth.register', {
        url: '/register',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/register.html',
        title: 'content.list.REGISTER',
        ncyBreadcrumb: {
            label: 'content.list.REGISTER'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterCtrl', 'RegisterService')
    }).state('auth.resetpassword', {
        url: '/reset-password',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/reset_password.html',
        title: 'content.list.RESETPAWSSWORD',
        ncyBreadcrumb: {
            label: 'content.list.RESETPAWSSWORD'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('ResetPasswordCtrl', 'ResetPasswordService')
    }).state('auth.emailconfirm', {
        url: '/email-confirm/:token/:language',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/email_confirm.html',
        title: 'content.list.EMAILCONFIRM',
        ncyBreadcrumb: {
            label: 'content.list.EMAILCONFIRM'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('EmailConfirmCtrl', 'RegisterService')
    }).state('auth.reset', {
        url: '/reset/:token/:language',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/reset.html',
        title: 'content.list.RESET',
        ncyBreadcrumb: {
            label: 'content.list.RESET'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('ResetCtrl', 'ResetPasswordService')
    }).state('auth.lockscreen', {
        url: '/lock-screen',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/lock_screen.html',
        title: 'content.list.LOCKSCREEN',
        ncyBreadcrumb: {
            label: 'content.list.LOCKSCREEN'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('LockScreenCtrl', 'LoginService')
    }).state('app.profile', {
        url: '/profile',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/ubidelectricity/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('DashboardCtrl', 'DashboardService')
    }).state('app.access', {
        url: '/access',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.access.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.access.MAIN'
        }
    }).state('app.access.notifications', {
        url: '/notifications',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notifications.html',
        title: 'content.list.NOTIFICATIONS',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONS'
        },
        params: {
            'notificationsIsFiltersVisible': null,
            'notificationsPage': null,
            'notificationsCount': null,
            'notificationsSorting': null,
            'notificationsFilter': null
        },
        resolve: loadSequence('NotificationsCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsnew', {
        url: '/notifications/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification_form.html',
        title: 'content.list.NEWNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWNOTIFICATION'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'NotificationFormCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsedit', {
        url: '/notifications/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification_form.html',
        title: 'content.list.EDITNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITNOTIFICATION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'NotificationFormCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsdetails', {
        url: '/notifications/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification.html',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONDETAILS'
        },
        resolve: loadSequence('NotificationCtrl', 'notificationService')
    }).state('app.access.users', {
        url: '/users',
        templateUrl: '/bundles/ubidelectricity/js/components/User/users.html',
        title: 'content.list.USERS',
        ncyBreadcrumb: {
            label: 'content.list.USERS'
        },
        params: {
            'usersIsFiltersVisible': null,
            'usersPage': null,
            'usersCount': null,
            'usersSorting': null,
            'usersFilter': null
        },
        resolve: loadSequence('UsersCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        params: {
            'user_country': null,
            'user_language': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.access.alerts', {
        url: '/alerts',
        templateUrl: '/bundles/ubidelectricity/js/components/Alert/alerts.html',
        title: 'content.list.ALERTS',
        ncyBreadcrumb: {
            label: 'content.list.ALERTS'
        },
        params: {
            'alertsIsFiltersVisible': null,
            'alertsPage': null,
            'alertsCount': null,
            'alertsSorting': null,
            'alertsFilter': null
        },
        resolve: loadSequence('AlertsCtrl', 'alertService', 'categoryService', 'userService')
    }).state('app.access.alertsnew', {
        url: '/alerts/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Alert/alert_form.html',
        title: 'content.list.NEWALERT',
        ncyBreadcrumb: {
            label: 'content.list.NEWALERT'
        },
        params: {
            'alert_category': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'AlertFormCtrl', 'alertService', 'categoryService', 'userService')
    }).state('app.access.alertsedit', {
        url: '/alerts/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Alert/alert_form.html',
        title: 'content.list.EDITALERT',
        ncyBreadcrumb: {
            label: 'content.list.EDITALERT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'AlertFormCtrl', 'alertService', 'categoryService', 'userService')
    }).state('app.access.alertsdetails', {
        url: '/alerts/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Alert/alert.html',
        ncyBreadcrumb: {
            label: 'content.list.ALERTDETAILS'
        },
        resolve: loadSequence('AlertCtrl', 'alertService')
    }).state('app.access.messages', {
        url: '/messages',
        templateUrl: '/bundles/ubidelectricity/js/components/Message/messages.html',
        title: 'content.list.MESSAGES',
        ncyBreadcrumb: {
            label: 'content.list.MESSAGES'
        },
        params: {
            'messagesIsFiltersVisible': null,
            'messagesPage': null,
            'messagesCount': null,
            'messagesSorting': null,
            'messagesFilter': null
        },
        resolve: loadSequence('MessagesCtrl', 'messageService', 'userService', 'buyerService', 'supplierService')
    }).state('app.access.messagesnew', {
        url: '/messages/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Message/message_form.html',
        title: 'content.list.NEWMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWMESSAGE'
        },
        params: {
            'message_from_user': null,
            'message_from_buyer': null,
            'message_from_supplier': null,
            'message_to_user': null,
            'message_to_buyer': null,
            'message_to_supplier': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MessageFormCtrl', 'messageService', 'userService', 'buyerService', 'supplierService')
    }).state('app.access.messagesedit', {
        url: '/messages/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Message/message_form.html',
        title: 'content.list.EDITMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITMESSAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MessageFormCtrl', 'messageService', 'userService', 'buyerService', 'supplierService')
    }).state('app.access.messagesdetails', {
        url: '/messages/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Message/message.html',
        ncyBreadcrumb: {
            label: 'content.list.MESSAGEDETAILS'
        },
        resolve: loadSequence('MessageCtrl', 'messageService')
    }).state('app.access.groups', {
        url: '/groups',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/groups.html',
        title: 'content.list.GROUPS',
        ncyBreadcrumb: {
            label: 'content.list.GROUPS'
        },
        params: {
            'groupsIsFiltersVisible': null,
            'groupsPage': null,
            'groupsCount': null,
            'groupsSorting': null,
            'groupsFilter': null
        },
        resolve: loadSequence('GroupsCtrl', 'groupService', 'userService')
    }).state('app.access.groupsnew', {
        url: '/groups/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group_form.html',
        title: 'content.list.NEWGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWGROUP'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GroupFormCtrl', 'groupService', 'userService')
    }).state('app.access.groupsedit', {
        url: '/groups/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group_form.html',
        title: 'content.list.EDITGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITGROUP'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GroupFormCtrl', 'groupService', 'userService')
    }).state('app.access.groupsdetails', {
        url: '/groups/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group.html',
        ncyBreadcrumb: {
            label: 'content.list.GROUPDETAILS'
        },
        resolve: loadSequence('GroupCtrl', 'groupService')
    }).state('app.access.logs', {
        url: '/logs',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/logs.html',
        title: 'content.list.LOGS',
        ncyBreadcrumb: {
            label: 'content.list.LOGS'
        },
        params: {
            'logsIsFiltersVisible': null,
            'logsPage': null,
            'logsCount': null,
            'logsSorting': null,
            'logsFilter': null
        },
        resolve: loadSequence('LogsCtrl', 'logService', 'userService')
    }).state('app.access.logsnew', {
        url: '/logs/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log_form.html',
        title: 'content.list.NEWLOG',
        ncyBreadcrumb: {
            label: 'content.list.NEWLOG'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LogFormCtrl', 'logService', 'userService')
    }).state('app.access.logsedit', {
        url: '/logs/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log_form.html',
        title: 'content.list.EDITLOG',
        ncyBreadcrumb: {
            label: 'content.list.EDITLOG'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LogFormCtrl', 'logService', 'userService')
    }).state('app.access.logsdetails', {
        url: '/logs/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log.html',
        ncyBreadcrumb: {
            label: 'content.list.LOGDETAILS'
        },
        resolve: loadSequence('LogCtrl', 'logService')
    }).state('app.access.usersettings', {
        url: '/user-settings',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_settings.html',
        title: 'content.list.USERSETTINGS',
        ncyBreadcrumb: {
            label: 'content.list.USERSETTINGS'
        },
        params: {
            'userSettingsIsFiltersVisible': null,
            'userSettingsPage': null,
            'userSettingsCount': null,
            'userSettingsSorting': null,
            'userSettingsFilter': null
        },
        resolve: loadSequence('UserSettingsCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsnew', {
        url: '/user-settings/new',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.NEWUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSERSETTING'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserSettingFormCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsedit', {
        url: '/user-settings/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.EDITUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSERSETTING'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserSettingFormCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsdetails', {
        url: '/user-settings/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting.html',
        ncyBreadcrumb: {
            label: 'content.list.USERSETTINGDETAILS'
        },
        resolve: loadSequence('UserSettingCtrl', 'userSettingService')
    }).state('app.adserving', {
        url: '/adserving',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.adserving.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.adserving.MAIN'
        }
    }).state('app.adserving.banners', {
        url: '/banners',
        templateUrl: '/bundles/ubidelectricity/js/components/Banner/banners.html',
        title: 'content.list.BANNERS',
        ncyBreadcrumb: {
            label: 'content.list.BANNERS'
        },
        params: {
            'bannersIsFiltersVisible': null,
            'bannersPage': null,
            'bannersCount': null,
            'bannersSorting': null,
            'bannersFilter': null
        },
        resolve: loadSequence('BannersCtrl', 'bannerService', 'bannerTypeService', 'userService', 'bannerPositionService')
    }).state('app.adserving.bannersnew', {
        url: '/banners/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Banner/banner_form.html',
        title: 'content.list.NEWBANNER',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNER'
        },
        params: {
            'banner_banner_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerFormCtrl', 'bannerService', 'bannerTypeService', 'userService', 'bannerPositionService')
    }).state('app.adserving.bannersedit', {
        url: '/banners/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Banner/banner_form.html',
        title: 'content.list.EDITBANNER',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerFormCtrl', 'bannerService', 'bannerTypeService', 'userService', 'bannerPositionService')
    }).state('app.adserving.bannersdetails', {
        url: '/banners/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Banner/banner.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERDETAILS'
        },
        resolve: loadSequence('BannerCtrl', 'bannerService')
    }).state('app.adserving.bannertypes', {
        url: '/banner-types',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerType/banner_types.html',
        title: 'content.list.BANNERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.BANNERTYPES'
        },
        params: {
            'bannerTypesIsFiltersVisible': null,
            'bannerTypesPage': null,
            'bannerTypesCount': null,
            'bannerTypesSorting': null,
            'bannerTypesFilter': null
        },
        resolve: loadSequence('BannerTypesCtrl', 'bannerTypeService', 'userService')
    }).state('app.adserving.bannertypesnew', {
        url: '/banner-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerType/banner_type_form.html',
        title: 'content.list.NEWBANNERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNERTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerTypeFormCtrl', 'bannerTypeService', 'userService')
    }).state('app.adserving.bannertypesedit', {
        url: '/banner-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerType/banner_type_form.html',
        title: 'content.list.EDITBANNERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerTypeFormCtrl', 'bannerTypeService', 'userService')
    }).state('app.adserving.bannertypesdetails', {
        url: '/banner-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerType/banner_type.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERTYPEDETAILS'
        },
        resolve: loadSequence('BannerTypeCtrl', 'bannerTypeService')
    }).state('app.adserving.bannerpositions', {
        url: '/banner-positions',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerPosition/banner_positions.html',
        title: 'content.list.BANNERPOSITIONS',
        ncyBreadcrumb: {
            label: 'content.list.BANNERPOSITIONS'
        },
        params: {
            'bannerPositionsIsFiltersVisible': null,
            'bannerPositionsPage': null,
            'bannerPositionsCount': null,
            'bannerPositionsSorting': null,
            'bannerPositionsFilter': null
        },
        resolve: loadSequence('BannerPositionsCtrl', 'bannerPositionService', 'userService')
    }).state('app.adserving.bannerpositionsnew', {
        url: '/banner-positions/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerPosition/banner_position_form.html',
        title: 'content.list.NEWBANNERPOSITION',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNERPOSITION'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerPositionFormCtrl', 'bannerPositionService', 'userService')
    }).state('app.adserving.bannerpositionsedit', {
        url: '/banner-positions/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerPosition/banner_position_form.html',
        title: 'content.list.EDITBANNERPOSITION',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNERPOSITION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerPositionFormCtrl', 'bannerPositionService', 'userService')
    }).state('app.adserving.bannerpositionsdetails', {
        url: '/banner-positions/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BannerPosition/banner_position.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERPOSITIONDETAILS'
        },
        resolve: loadSequence('BannerPositionCtrl', 'bannerPositionService')
    }).state('app.adserving.clicks', {
        url: '/clicks',
        templateUrl: '/bundles/ubidelectricity/js/components/Click/clicks.html',
        title: 'content.list.CLICKS',
        ncyBreadcrumb: {
            label: 'content.list.CLICKS'
        },
        params: {
            'clicksIsFiltersVisible': null,
            'clicksPage': null,
            'clicksCount': null,
            'clicksSorting': null,
            'clicksFilter': null
        },
        resolve: loadSequence('ClicksCtrl', 'clickService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.clicksnew', {
        url: '/clicks/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Click/click_form.html',
        title: 'content.list.NEWCLICK',
        ncyBreadcrumb: {
            label: 'content.list.NEWCLICK'
        },
        params: {
            'click_visit': null,
            'click_banner': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ClickFormCtrl', 'clickService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.clicksedit', {
        url: '/clicks/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Click/click_form.html',
        title: 'content.list.EDITCLICK',
        ncyBreadcrumb: {
            label: 'content.list.EDITCLICK'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ClickFormCtrl', 'clickService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.clicksdetails', {
        url: '/clicks/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Click/click.html',
        ncyBreadcrumb: {
            label: 'content.list.CLICKDETAILS'
        },
        resolve: loadSequence('ClickCtrl', 'clickService')
    }).state('app.adserving.impressions', {
        url: '/impressions',
        templateUrl: '/bundles/ubidelectricity/js/components/Impression/impressions.html',
        title: 'content.list.IMPRESSIONS',
        ncyBreadcrumb: {
            label: 'content.list.IMPRESSIONS'
        },
        params: {
            'impressionsIsFiltersVisible': null,
            'impressionsPage': null,
            'impressionsCount': null,
            'impressionsSorting': null,
            'impressionsFilter': null
        },
        resolve: loadSequence('ImpressionsCtrl', 'impressionService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.impressionsnew', {
        url: '/impressions/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Impression/impression_form.html',
        title: 'content.list.NEWIMPRESSION',
        ncyBreadcrumb: {
            label: 'content.list.NEWIMPRESSION'
        },
        params: {
            'impression_visit': null,
            'impression_banner': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ImpressionFormCtrl', 'impressionService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.impressionsedit', {
        url: '/impressions/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Impression/impression_form.html',
        title: 'content.list.EDITIMPRESSION',
        ncyBreadcrumb: {
            label: 'content.list.EDITIMPRESSION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ImpressionFormCtrl', 'impressionService', 'visitService', 'bannerService', 'userService')
    }).state('app.adserving.impressionsdetails', {
        url: '/impressions/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Impression/impression.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPRESSIONDETAILS'
        },
        resolve: loadSequence('ImpressionCtrl', 'impressionService')
    }).state('app.marketplace', {
        url: '/marketplace',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.marketplace.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.marketplace.MAIN'
        }
    }).state('app.marketplace.suppliers', {
        url: '/suppliers',
        templateUrl: '/bundles/ubidelectricity/js/components/Supplier/suppliers.html',
        title: 'content.list.SUPPLIERS',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERS'
        },
        params: {
            'suppliersIsFiltersVisible': null,
            'suppliersPage': null,
            'suppliersCount': null,
            'suppliersSorting': null,
            'suppliersFilter': null
        },
        resolve: loadSequence('SuppliersCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.suppliersnew', {
        url: '/suppliers/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Supplier/supplier_form.html',
        title: 'content.list.NEWSUPPLIER',
        ncyBreadcrumb: {
            label: 'content.list.NEWSUPPLIER'
        },
        params: {
            'supplier_supplier_type': null,
            'supplier_country': null,
            'supplier_language': null,
            'supplier_first_market_region': null,
            'supplier_second_market_region': null,
            'supplier_third_market_region': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.suppliersedit', {
        url: '/suppliers/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Supplier/supplier_form.html',
        title: 'content.list.EDITSUPPLIER',
        ncyBreadcrumb: {
            label: 'content.list.EDITSUPPLIER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.suppliersdetails', {
        url: '/suppliers/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Supplier/supplier.html',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERDETAILS'
        },
        resolve: loadSequence('SupplierCtrl', 'supplierService')
    }).state('app.marketplace.supplierproducts', {
        url: '/supplier-products',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierProduct/supplier_products.html',
        title: 'content.list.SUPPLIERPRODUCTS',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERPRODUCTS'
        },
        params: {
            'supplierProductsIsFiltersVisible': null,
            'supplierProductsPage': null,
            'supplierProductsCount': null,
            'supplierProductsSorting': null,
            'supplierProductsFilter': null
        },
        resolve: loadSequence('SupplierProductsCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
    }).state('app.marketplace.supplierproductsnew', {
        url: '/supplier-products/new',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierProduct/supplier_product_form.html',
        title: 'content.list.NEWSUPPLIERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.NEWSUPPLIERPRODUCT'
        },
        params: {
            'supplier_product_supplier': null,
            'supplier_product_category': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
    }).state('app.marketplace.supplierproductsedit', {
        url: '/supplier-products/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierProduct/supplier_product_form.html',
        title: 'content.list.EDITSUPPLIERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.EDITSUPPLIERPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
    }).state('app.marketplace.supplierproductsdetails', {
        url: '/supplier-products/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierProduct/supplier_product.html',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERPRODUCTDETAILS'
        },
        resolve: loadSequence('SupplierProductCtrl', 'supplierProductService')
    }).state('app.marketplace.buyers', {
        url: '/buyers',
        templateUrl: '/bundles/ubidelectricity/js/components/Buyer/buyers.html',
        title: 'content.list.BUYERS',
        ncyBreadcrumb: {
            label: 'content.list.BUYERS'
        },
        params: {
            'buyersIsFiltersVisible': null,
            'buyersPage': null,
            'buyersCount': null,
            'buyersSorting': null,
            'buyersFilter': null
        },
        resolve: loadSequence('BuyersCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.buyersnew', {
        url: '/buyers/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Buyer/buyer_form.html',
        title: 'content.list.NEWBUYER',
        ncyBreadcrumb: {
            label: 'content.list.NEWBUYER'
        },
        params: {
            'buyer_buyer_type': null,
            'buyer_country': null,
            'buyer_language': null,
            'buyer_first_market_region': null,
            'buyer_second_market_region': null,
            'buyer_third_market_region': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.buyersedit', {
        url: '/buyers/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Buyer/buyer_form.html',
        title: 'content.list.EDITBUYER',
        ncyBreadcrumb: {
            label: 'content.list.EDITBUYER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService')
    }).state('app.marketplace.buyersdetails', {
        url: '/buyers/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Buyer/buyer.html',
        ncyBreadcrumb: {
            label: 'content.list.BUYERDETAILS'
        },
        resolve: loadSequence('BuyerCtrl', 'buyerService')
    }).state('app.marketplace.tenderproducts', {
        url: '/tender-products',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_products.html',
        title: 'content.list.TENDERPRODUCTS',
        ncyBreadcrumb: {
            label: 'content.list.TENDERPRODUCTS'
        },
        params: {
            'tenderProductsIsFiltersVisible': null,
            'tenderProductsPage': null,
            'tenderProductsCount': null,
            'tenderProductsSorting': null,
            'tenderProductsFilter': null
        },
        resolve: loadSequence('TenderProductsCtrl', 'tenderProductService', 'tenderService', 'categoryService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsnew', {
        url: '/tender-products/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product_form.html',
        title: 'content.list.NEWTENDERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDERPRODUCT'
        },
        params: {
            'tender_product_tender': null,
            'tender_product_category': null,
            'tender_product_product_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderProductFormCtrl', 'tenderProductService', 'tenderService', 'categoryService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsedit', {
        url: '/tender-products/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product_form.html',
        title: 'content.list.EDITTENDERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDERPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderProductFormCtrl', 'tenderProductService', 'tenderService', 'categoryService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsdetails', {
        url: '/tender-products/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERPRODUCTDETAILS'
        },
        resolve: loadSequence('TenderProductCtrl', 'tenderProductService')
    }).state('app.marketplace.bids', {
        url: '/bids',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bids.html',
        title: 'content.list.BIDS',
        ncyBreadcrumb: {
            label: 'content.list.BIDS'
        },
        params: {
            'bidsIsFiltersVisible': null,
            'bidsPage': null,
            'bidsCount': null,
            'bidsSorting': null,
            'bidsFilter': null
        },
        resolve: loadSequence('BidsCtrl', 'bidService', 'tenderService', 'supplierService', 'userService')
    }).state('app.marketplace.bidsnew', {
        url: '/bids/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid_form.html',
        title: 'content.list.NEWBID',
        ncyBreadcrumb: {
            label: 'content.list.NEWBID'
        },
        params: {
            'bid_tender': null,
            'bid_supplier': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidFormCtrl', 'bidService', 'tenderService', 'supplierService', 'userService')
    }).state('app.marketplace.bidsedit', {
        url: '/bids/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid_form.html',
        title: 'content.list.EDITBID',
        ncyBreadcrumb: {
            label: 'content.list.EDITBID'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidFormCtrl', 'bidService', 'tenderService', 'supplierService', 'userService')
    }).state('app.marketplace.bidsdetails', {
        url: '/bids/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDDETAILS'
        },
        resolve: loadSequence('BidCtrl', 'bidService')
    }).state('app.marketplace.bidproducts', {
        url: '/bid-products',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_products.html',
        title: 'content.list.BIDPRODUCTS',
        ncyBreadcrumb: {
            label: 'content.list.BIDPRODUCTS'
        },
        params: {
            'bidProductsIsFiltersVisible': null,
            'bidProductsPage': null,
            'bidProductsCount': null,
            'bidProductsSorting': null,
            'bidProductsFilter': null
        },
        resolve: loadSequence('BidProductsCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'supplierProductService', 'userService')
    }).state('app.marketplace.bidproductsnew', {
        url: '/bid-products/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product_form.html',
        title: 'content.list.NEWBIDPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.NEWBIDPRODUCT'
        },
        params: {
            'bid_product_tender_product': null,
            'bid_product_bid': null,
            'bid_product_supplier_product': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidProductFormCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'supplierProductService', 'userService')
    }).state('app.marketplace.bidproductsedit', {
        url: '/bid-products/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product_form.html',
        title: 'content.list.EDITBIDPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.EDITBIDPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidProductFormCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'supplierProductService', 'userService')
    }).state('app.marketplace.bidproductsdetails', {
        url: '/bid-products/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDPRODUCTDETAILS'
        },
        resolve: loadSequence('BidProductCtrl', 'bidProductService')
    }).state('app.marketplace.tenders', {
        url: '/tenders',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tenders.html',
        title: 'content.list.TENDERS',
        ncyBreadcrumb: {
            label: 'content.list.TENDERS'
        },
        params: {
            'tendersIsFiltersVisible': null,
            'tendersPage': null,
            'tendersCount': null,
            'tendersSorting': null,
            'tendersFilter': null
        },
        resolve: loadSequence('TendersCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
    }).state('app.marketplace.tendersnew', {
        url: '/tenders/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.NEWTENDER',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDER'
        },
        params: {
            'tender_buyer': null,
            'tender_region': null,
            'tender_country': null,
            'tender_sector': null,
            'tender_tender_type': null,
            'tender_bidding_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
    }).state('app.marketplace.tendersedit', {
        url: '/tenders/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.EDITTENDER',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
    }).state('app.marketplace.tendersdetails', {
        url: '/tenders/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERDETAILS'
        },
        resolve: loadSequence('TenderCtrl', 'tenderService')
    }).state('app.lists', {
        url: '/lists',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.lists.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.lists.MAIN'
        }
    }).state('app.lists.sectors', {
        url: '/sectors',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sectors.html',
        title: 'content.list.SECTORS',
        ncyBreadcrumb: {
            label: 'content.list.SECTORS'
        },
        params: {
            'sectorsIsFiltersVisible': null,
            'sectorsPage': null,
            'sectorsCount': null,
            'sectorsSorting': null,
            'sectorsFilter': null
        },
        resolve: loadSequence('SectorsCtrl', 'sectorService', 'userService')
    }).state('app.lists.sectorsnew', {
        url: '/sectors/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector_form.html',
        title: 'content.list.NEWSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.NEWSECTOR'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SectorFormCtrl', 'sectorService', 'userService')
    }).state('app.lists.sectorsedit', {
        url: '/sectors/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector_form.html',
        title: 'content.list.EDITSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.EDITSECTOR'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SectorFormCtrl', 'sectorService', 'userService')
    }).state('app.lists.sectorsdetails', {
        url: '/sectors/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector.html',
        ncyBreadcrumb: {
            label: 'content.list.SECTORDETAILS'
        },
        resolve: loadSequence('SectorCtrl', 'sectorService')
    }).state('app.lists.buyertypes', {
        url: '/buyer-types',
        templateUrl: '/bundles/ubidelectricity/js/components/BuyerType/buyer_types.html',
        title: 'content.list.BUYERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.BUYERTYPES'
        },
        params: {
            'buyerTypesIsFiltersVisible': null,
            'buyerTypesPage': null,
            'buyerTypesCount': null,
            'buyerTypesSorting': null,
            'buyerTypesFilter': null
        },
        resolve: loadSequence('BuyerTypesCtrl', 'buyerTypeService', 'userService')
    }).state('app.lists.buyertypesnew', {
        url: '/buyer-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BuyerType/buyer_type_form.html',
        title: 'content.list.NEWBUYERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWBUYERTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerTypeFormCtrl', 'buyerTypeService', 'userService')
    }).state('app.lists.buyertypesedit', {
        url: '/buyer-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BuyerType/buyer_type_form.html',
        title: 'content.list.EDITBUYERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITBUYERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerTypeFormCtrl', 'buyerTypeService', 'userService')
    }).state('app.lists.buyertypesdetails', {
        url: '/buyer-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BuyerType/buyer_type.html',
        ncyBreadcrumb: {
            label: 'content.list.BUYERTYPEDETAILS'
        },
        resolve: loadSequence('BuyerTypeCtrl', 'buyerTypeService')
    }).state('app.lists.suppliertypes', {
        url: '/supplier-types',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierType/supplier_types.html',
        title: 'content.list.SUPPLIERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERTYPES'
        },
        params: {
            'supplierTypesIsFiltersVisible': null,
            'supplierTypesPage': null,
            'supplierTypesCount': null,
            'supplierTypesSorting': null,
            'supplierTypesFilter': null
        },
        resolve: loadSequence('SupplierTypesCtrl', 'supplierTypeService', 'userService')
    }).state('app.lists.suppliertypesnew', {
        url: '/supplier-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierType/supplier_type_form.html',
        title: 'content.list.NEWSUPPLIERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWSUPPLIERTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierTypeFormCtrl', 'supplierTypeService', 'userService')
    }).state('app.lists.suppliertypesedit', {
        url: '/supplier-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierType/supplier_type_form.html',
        title: 'content.list.EDITSUPPLIERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITSUPPLIERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierTypeFormCtrl', 'supplierTypeService', 'userService')
    }).state('app.lists.suppliertypesdetails', {
        url: '/supplier-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/SupplierType/supplier_type.html',
        ncyBreadcrumb: {
            label: 'content.list.SUPPLIERTYPEDETAILS'
        },
        resolve: loadSequence('SupplierTypeCtrl', 'supplierTypeService')
    }).state('app.lists.categories', {
        url: '/categories',
        templateUrl: '/bundles/ubidelectricity/js/components/Category/categories.html',
        title: 'content.list.CATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.CATEGORIES'
        },
        params: {
            'categoriesIsFiltersVisible': null,
            'categoriesPage': null,
            'categoriesCount': null,
            'categoriesSorting': null,
            'categoriesFilter': null
        },
        resolve: loadSequence('CategoriesCtrl', 'categoryService', 'productTypeService', 'userService')
    }).state('app.lists.categoriesnew', {
        url: '/categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Category/category_form.html',
        title: 'content.list.NEWCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCATEGORY'
        },
        params: {
            'category_parent': null,
            'category_product_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CategoryFormCtrl', 'categoryService', 'productTypeService', 'userService')
    }).state('app.lists.categoriesedit', {
        url: '/categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Category/category_form.html',
        title: 'content.list.EDITCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CategoryFormCtrl', 'categoryService', 'productTypeService', 'userService')
    }).state('app.lists.categoriesdetails', {
        url: '/categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Category/category.html',
        ncyBreadcrumb: {
            label: 'content.list.CATEGORYDETAILS'
        },
        resolve: loadSequence('CategoryCtrl', 'categoryService')
    }).state('app.lists.tendertypes', {
        url: '/tender-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_types.html',
        title: 'content.list.TENDERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TENDERTYPES'
        },
        params: {
            'tenderTypesIsFiltersVisible': null,
            'tenderTypesPage': null,
            'tenderTypesCount': null,
            'tenderTypesSorting': null,
            'tenderTypesFilter': null
        },
        resolve: loadSequence('TenderTypesCtrl', 'tenderTypeService', 'userService')
    }).state('app.lists.tendertypesnew', {
        url: '/tender-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type_form.html',
        title: 'content.list.NEWTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDERTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderTypeFormCtrl', 'tenderTypeService', 'userService')
    }).state('app.lists.tendertypesedit', {
        url: '/tender-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type_form.html',
        title: 'content.list.EDITTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderTypeFormCtrl', 'tenderTypeService', 'userService')
    }).state('app.lists.tendertypesdetails', {
        url: '/tender-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERTYPEDETAILS'
        },
        resolve: loadSequence('TenderTypeCtrl', 'tenderTypeService')
    }).state('app.lists.producttypes', {
        url: '/product-types',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_types.html',
        title: 'content.list.PRODUCTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.PRODUCTTYPES'
        },
        params: {
            'productTypesIsFiltersVisible': null,
            'productTypesPage': null,
            'productTypesCount': null,
            'productTypesSorting': null,
            'productTypesFilter': null
        },
        resolve: loadSequence('ProductTypesCtrl', 'productTypeService', 'userService')
    }).state('app.lists.producttypesnew', {
        url: '/product-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type_form.html',
        title: 'content.list.NEWPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPRODUCTTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductTypeFormCtrl', 'productTypeService', 'userService')
    }).state('app.lists.producttypesedit', {
        url: '/product-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type_form.html',
        title: 'content.list.EDITPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPRODUCTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductTypeFormCtrl', 'productTypeService', 'userService')
    }).state('app.lists.producttypesdetails', {
        url: '/product-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type.html',
        ncyBreadcrumb: {
            label: 'content.list.PRODUCTTYPEDETAILS'
        },
        resolve: loadSequence('ProductTypeCtrl', 'productTypeService')
    }).state('app.lists.biddingtypes', {
        url: '/bidding-types',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_types.html',
        title: 'content.list.BIDDINGTYPES',
        ncyBreadcrumb: {
            label: 'content.list.BIDDINGTYPES'
        },
        params: {
            'biddingTypesIsFiltersVisible': null,
            'biddingTypesPage': null,
            'biddingTypesCount': null,
            'biddingTypesSorting': null,
            'biddingTypesFilter': null
        },
        resolve: loadSequence('BiddingTypesCtrl', 'biddingTypeService', 'userService')
    }).state('app.lists.biddingtypesnew', {
        url: '/bidding-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type_form.html',
        title: 'content.list.NEWBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWBIDDINGTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BiddingTypeFormCtrl', 'biddingTypeService', 'userService')
    }).state('app.lists.biddingtypesedit', {
        url: '/bidding-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type_form.html',
        title: 'content.list.EDITBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITBIDDINGTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BiddingTypeFormCtrl', 'biddingTypeService', 'userService')
    }).state('app.lists.biddingtypesdetails', {
        url: '/bidding-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDDINGTYPEDETAILS'
        },
        resolve: loadSequence('BiddingTypeCtrl', 'biddingTypeService')
    }).state('app.settings', {
        url: '/settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.settings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.settings.MAIN'
        }
    }).state('app.settings.languages', {
        url: '/languages',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/languages.html',
        title: 'content.list.LANGUAGES',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGES'
        },
        params: {
            'languagesIsFiltersVisible': null,
            'languagesPage': null,
            'languagesCount': null,
            'languagesSorting': null,
            'languagesFilter': null
        },
        resolve: loadSequence('LanguagesCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesnew', {
        url: '/languages/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.settings.countries', {
        url: '/countries',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/countries.html',
        title: 'content.list.COUNTRIES',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRIES'
        },
        params: {
            'countriesIsFiltersVisible': null,
            'countriesPage': null,
            'countriesCount': null,
            'countriesSorting': null,
            'countriesFilter': null
        },
        resolve: loadSequence('CountriesCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesnew', {
        url: '/countries/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        params: {
            'country_region': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.settings.regions', {
        url: '/regions',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/regions.html',
        title: 'content.list.REGIONS',
        ncyBreadcrumb: {
            label: 'content.list.REGIONS'
        },
        params: {
            'regionsIsFiltersVisible': null,
            'regionsPage': null,
            'regionsCount': null,
            'regionsSorting': null,
            'regionsFilter': null
        },
        resolve: loadSequence('RegionsCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsnew', {
        url: '/regions/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region_form.html',
        title: 'content.list.NEWREGION',
        ncyBreadcrumb: {
            label: 'content.list.NEWREGION'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'RegionFormCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsedit', {
        url: '/regions/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region_form.html',
        title: 'content.list.EDITREGION',
        ncyBreadcrumb: {
            label: 'content.list.EDITREGION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'RegionFormCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsdetails', {
        url: '/regions/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region.html',
        ncyBreadcrumb: {
            label: 'content.list.REGIONDETAILS'
        },
        resolve: loadSequence('RegionCtrl', 'regionService')
    }).state('app.settings.menus', {
        url: '/menus',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menus.html',
        title: 'content.list.MENUS',
        ncyBreadcrumb: {
            label: 'content.list.MENUS'
        },
        params: {
            'menusIsFiltersVisible': null,
            'menusPage': null,
            'menusCount': null,
            'menusSorting': null,
            'menusFilter': null
        },
        resolve: loadSequence('MenusCtrl', 'menuService', 'userService')
    }).state('app.settings.menusnew', {
        url: '/menus/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu_form.html',
        title: 'content.list.NEWMENU',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENU'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuFormCtrl', 'menuService', 'userService')
    }).state('app.settings.menusedit', {
        url: '/menus/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu_form.html',
        title: 'content.list.EDITMENU',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENU'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuFormCtrl', 'menuService', 'userService')
    }).state('app.settings.menusdetails', {
        url: '/menus/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu.html',
        ncyBreadcrumb: {
            label: 'content.list.MENUDETAILS'
        },
        resolve: loadSequence('MenuCtrl', 'menuService')
    }).state('app.settings.menulinks', {
        url: '/menu-links',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_links.html',
        title: 'content.list.MENULINKS',
        ncyBreadcrumb: {
            label: 'content.list.MENULINKS'
        },
        params: {
            'menuLinksIsFiltersVisible': null,
            'menuLinksPage': null,
            'menuLinksCount': null,
            'menuLinksSorting': null,
            'menuLinksFilter': null
        },
        resolve: loadSequence('MenuLinksCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksnew', {
        url: '/menu-links/new',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.NEWMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENULINK'
        },
        params: {
            'menu_link_menu': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksedit', {
        url: '/menu-links/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.EDITMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENULINK'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksdetails', {
        url: '/menu-links/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link.html',
        ncyBreadcrumb: {
            label: 'content.list.MENULINKDETAILS'
        },
        resolve: loadSequence('MenuLinkCtrl', 'menuLinkService')
    }).state('app.statistics', {
        url: '/statistics',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.statistics.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.statistics.MAIN'
        }
    }).state('app.statistics.hits', {
        url: '/hits',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hits.html',
        title: 'content.list.HITS',
        ncyBreadcrumb: {
            label: 'content.list.HITS'
        },
        params: {
            'hitsIsFiltersVisible': null,
            'hitsPage': null,
            'hitsCount': null,
            'hitsSorting': null,
            'hitsFilter': null
        },
        resolve: loadSequence('HitsCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsnew', {
        url: '/hits/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit_form.html',
        title: 'content.list.NEWHIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWHIT'
        },
        params: {
            'hit_visit': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'HitFormCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsedit', {
        url: '/hits/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit_form.html',
        title: 'content.list.EDITHIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITHIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'HitFormCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsdetails', {
        url: '/hits/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit.html',
        ncyBreadcrumb: {
            label: 'content.list.HITDETAILS'
        },
        resolve: loadSequence('HitCtrl', 'hitService')
    }).state('app.statistics.visits', {
        url: '/visits',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visits.html',
        title: 'content.list.VISITS',
        ncyBreadcrumb: {
            label: 'content.list.VISITS'
        },
        params: {
            'visitsIsFiltersVisible': null,
            'visitsPage': null,
            'visitsCount': null,
            'visitsSorting': null,
            'visitsFilter': null
        },
        resolve: loadSequence('VisitsCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsnew', {
        url: '/visits/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit_form.html',
        title: 'content.list.NEWVISIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWVISIT'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'VisitFormCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsedit', {
        url: '/visits/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit_form.html',
        title: 'content.list.EDITVISIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITVISIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'VisitFormCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsdetails', {
        url: '/visits/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit.html',
        ncyBreadcrumb: {
            label: 'content.list.VISITDETAILS'
        },
        resolve: loadSequence('VisitCtrl', 'visitService')
    }).state('app.news', {
        url: '/news',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.news.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.news.MAIN'
        }
    }).state('app.news.posts', {
        url: '/posts',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/posts.html',
        title: 'content.list.POSTS',
        ncyBreadcrumb: {
            label: 'content.list.POSTS'
        },
        params: {
            'postsIsFiltersVisible': null,
            'postsPage': null,
            'postsCount': null,
            'postsSorting': null,
            'postsFilter': null
        },
        resolve: loadSequence('PostsCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsnew', {
        url: '/posts/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post_form.html',
        title: 'content.list.NEWPOST',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOST'
        },
        params: {
            'post_post_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsedit', {
        url: '/posts/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post_form.html',
        title: 'content.list.EDITPOST',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOST'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsdetails', {
        url: '/posts/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTDETAILS'
        },
        resolve: loadSequence('PostCtrl', 'postService')
    }).state('app.news.postcategories', {
        url: '/post-categories',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_categories.html',
        title: 'content.list.POSTCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.POSTCATEGORIES'
        },
        params: {
            'postCategoriesIsFiltersVisible': null,
            'postCategoriesPage': null,
            'postCategoriesCount': null,
            'postCategoriesSorting': null,
            'postCategoriesFilter': null
        },
        resolve: loadSequence('PostCategoriesCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesnew', {
        url: '/post-categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category_form.html',
        title: 'content.list.NEWPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTCATEGORY'
        },
        params: {
            'post_category_parent': null,
            'post_category_post_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesedit', {
        url: '/post-categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category_form.html',
        title: 'content.list.EDITPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesdetails', {
        url: '/post-categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTCATEGORYDETAILS'
        },
        resolve: loadSequence('PostCategoryCtrl', 'postCategoryService')
    }).state('app.news.posttypes', {
        url: '/post-types',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_types.html',
        title: 'content.list.POSTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.POSTTYPES'
        },
        params: {
            'postTypesIsFiltersVisible': null,
            'postTypesPage': null,
            'postTypesCount': null,
            'postTypesSorting': null,
            'postTypesFilter': null
        },
        resolve: loadSequence('PostTypesCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesnew', {
        url: '/post-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type_form.html',
        title: 'content.list.NEWPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTTYPE'
        },
        params: {
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostTypeFormCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesedit', {
        url: '/post-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type_form.html',
        title: 'content.list.EDITPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostTypeFormCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesdetails', {
        url: '/post-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTTYPEDETAILS'
        },
        resolve: loadSequence('PostTypeCtrl', 'postTypeService')
    }).state('app.translation', {
        url: '/translation',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.translation.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.translation.MAIN'
        }
    }).state('app.translation.translationproducttypes', {
        url: '/translation-product-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationProductType/translation_product_types.html',
        title: 'content.list.TRANSLATIONPRODUCTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPRODUCTTYPES'
        },
        params: {
            'translationProductTypesIsFiltersVisible': null,
            'translationProductTypesPage': null,
            'translationProductTypesCount': null,
            'translationProductTypesSorting': null,
            'translationProductTypesFilter': null
        },
        resolve: loadSequence('TranslationProductTypesCtrl', 'translationProductTypeService', 'productTypeService', 'userService')
    }).state('app.translation.translationproducttypesnew', {
        url: '/translation-product-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationProductType/translation_product_type_form.html',
        title: 'content.list.NEWTRANSLATIONPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPRODUCTTYPE'
        },
        params: {
            'translation_product_type_product_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationProductTypeFormCtrl', 'translationProductTypeService', 'productTypeService', 'userService')
    }).state('app.translation.translationproducttypesedit', {
        url: '/translation-product-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationProductType/translation_product_type_form.html',
        title: 'content.list.EDITTRANSLATIONPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPRODUCTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationProductTypeFormCtrl', 'translationProductTypeService', 'productTypeService', 'userService')
    }).state('app.translation.translationproducttypesdetails', {
        url: '/translation-product-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationProductType/translation_product_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPRODUCTTYPEDETAILS'
        },
        resolve: loadSequence('TranslationProductTypeCtrl', 'translationProductTypeService')
    }).state('app.translation.translationposttypes', {
        url: '/translation-post-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostType/translation_post_types.html',
        title: 'content.list.TRANSLATIONPOSTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTTYPES'
        },
        params: {
            'translationPostTypesIsFiltersVisible': null,
            'translationPostTypesPage': null,
            'translationPostTypesCount': null,
            'translationPostTypesSorting': null,
            'translationPostTypesFilter': null
        },
        resolve: loadSequence('TranslationPostTypesCtrl', 'translationPostTypeService', 'postTypeService', 'userService')
    }).state('app.translation.translationposttypesnew', {
        url: '/translation-post-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostType/translation_post_type_form.html',
        title: 'content.list.NEWTRANSLATIONPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPOSTTYPE'
        },
        params: {
            'translation_post_type_post_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostTypeFormCtrl', 'translationPostTypeService', 'postTypeService', 'userService')
    }).state('app.translation.translationposttypesedit', {
        url: '/translation-post-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostType/translation_post_type_form.html',
        title: 'content.list.EDITTRANSLATIONPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPOSTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostTypeFormCtrl', 'translationPostTypeService', 'postTypeService', 'userService')
    }).state('app.translation.translationposttypesdetails', {
        url: '/translation-post-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostType/translation_post_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTTYPEDETAILS'
        },
        resolve: loadSequence('TranslationPostTypeCtrl', 'translationPostTypeService')
    }).state('app.translation.translationregions', {
        url: '/translation-regions',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationRegion/translation_regions.html',
        title: 'content.list.TRANSLATIONREGIONS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONREGIONS'
        },
        params: {
            'translationRegionsIsFiltersVisible': null,
            'translationRegionsPage': null,
            'translationRegionsCount': null,
            'translationRegionsSorting': null,
            'translationRegionsFilter': null
        },
        resolve: loadSequence('TranslationRegionsCtrl', 'translationRegionService', 'regionService', 'userService')
    }).state('app.translation.translationregionsnew', {
        url: '/translation-regions/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationRegion/translation_region_form.html',
        title: 'content.list.NEWTRANSLATIONREGION',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONREGION'
        },
        params: {
            'translation_region_region': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationRegionFormCtrl', 'translationRegionService', 'regionService', 'userService')
    }).state('app.translation.translationregionsedit', {
        url: '/translation-regions/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationRegion/translation_region_form.html',
        title: 'content.list.EDITTRANSLATIONREGION',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONREGION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationRegionFormCtrl', 'translationRegionService', 'regionService', 'userService')
    }).state('app.translation.translationregionsdetails', {
        url: '/translation-regions/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationRegion/translation_region.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONREGIONDETAILS'
        },
        resolve: loadSequence('TranslationRegionCtrl', 'translationRegionService')
    }).state('app.translation.translationsectors', {
        url: '/translation-sectors',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSector/translation_sectors.html',
        title: 'content.list.TRANSLATIONSECTORS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONSECTORS'
        },
        params: {
            'translationSectorsIsFiltersVisible': null,
            'translationSectorsPage': null,
            'translationSectorsCount': null,
            'translationSectorsSorting': null,
            'translationSectorsFilter': null
        },
        resolve: loadSequence('TranslationSectorsCtrl', 'translationSectorService', 'sectorService', 'userService')
    }).state('app.translation.translationsectorsnew', {
        url: '/translation-sectors/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSector/translation_sector_form.html',
        title: 'content.list.NEWTRANSLATIONSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONSECTOR'
        },
        params: {
            'translation_sector_sector': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationSectorFormCtrl', 'translationSectorService', 'sectorService', 'userService')
    }).state('app.translation.translationsectorsedit', {
        url: '/translation-sectors/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSector/translation_sector_form.html',
        title: 'content.list.EDITTRANSLATIONSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONSECTOR'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationSectorFormCtrl', 'translationSectorService', 'sectorService', 'userService')
    }).state('app.translation.translationsectorsdetails', {
        url: '/translation-sectors/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSector/translation_sector.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONSECTORDETAILS'
        },
        resolve: loadSequence('TranslationSectorCtrl', 'translationSectorService')
    }).state('app.translation.translationtendertypes', {
        url: '/translation-tender-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationTenderType/translation_tender_types.html',
        title: 'content.list.TRANSLATIONTENDERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONTENDERTYPES'
        },
        params: {
            'translationTenderTypesIsFiltersVisible': null,
            'translationTenderTypesPage': null,
            'translationTenderTypesCount': null,
            'translationTenderTypesSorting': null,
            'translationTenderTypesFilter': null
        },
        resolve: loadSequence('TranslationTenderTypesCtrl', 'translationTenderTypeService', 'tenderTypeService', 'userService')
    }).state('app.translation.translationtendertypesnew', {
        url: '/translation-tender-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationTenderType/translation_tender_type_form.html',
        title: 'content.list.NEWTRANSLATIONTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONTENDERTYPE'
        },
        params: {
            'translation_tender_type_tender_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationTenderTypeFormCtrl', 'translationTenderTypeService', 'tenderTypeService', 'userService')
    }).state('app.translation.translationtendertypesedit', {
        url: '/translation-tender-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationTenderType/translation_tender_type_form.html',
        title: 'content.list.EDITTRANSLATIONTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONTENDERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationTenderTypeFormCtrl', 'translationTenderTypeService', 'tenderTypeService', 'userService')
    }).state('app.translation.translationtendertypesdetails', {
        url: '/translation-tender-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationTenderType/translation_tender_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONTENDERTYPEDETAILS'
        },
        resolve: loadSequence('TranslationTenderTypeCtrl', 'translationTenderTypeService')
    }).state('app.translation.translationsuppliertypes', {
        url: '/translation-supplier-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSupplierType/translation_supplier_types.html',
        title: 'content.list.TRANSLATIONSUPPLIERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONSUPPLIERTYPES'
        },
        params: {
            'translationSupplierTypesIsFiltersVisible': null,
            'translationSupplierTypesPage': null,
            'translationSupplierTypesCount': null,
            'translationSupplierTypesSorting': null,
            'translationSupplierTypesFilter': null
        },
        resolve: loadSequence('TranslationSupplierTypesCtrl', 'translationSupplierTypeService', 'supplierTypeService', 'userService')
    }).state('app.translation.translationsuppliertypesnew', {
        url: '/translation-supplier-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSupplierType/translation_supplier_type_form.html',
        title: 'content.list.NEWTRANSLATIONSUPPLIERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONSUPPLIERTYPE'
        },
        params: {
            'translation_supplier_type_supplier_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationSupplierTypeFormCtrl', 'translationSupplierTypeService', 'supplierTypeService', 'userService')
    }).state('app.translation.translationsuppliertypesedit', {
        url: '/translation-supplier-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSupplierType/translation_supplier_type_form.html',
        title: 'content.list.EDITTRANSLATIONSUPPLIERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONSUPPLIERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationSupplierTypeFormCtrl', 'translationSupplierTypeService', 'supplierTypeService', 'userService')
    }).state('app.translation.translationsuppliertypesdetails', {
        url: '/translation-supplier-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationSupplierType/translation_supplier_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONSUPPLIERTYPEDETAILS'
        },
        resolve: loadSequence('TranslationSupplierTypeCtrl', 'translationSupplierTypeService')
    }).state('app.translation.translationpostcategories', {
        url: '/translation-post-categories',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostCategory/translation_post_categories.html',
        title: 'content.list.TRANSLATIONPOSTCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTCATEGORIES'
        },
        params: {
            'translationPostCategoriesIsFiltersVisible': null,
            'translationPostCategoriesPage': null,
            'translationPostCategoriesCount': null,
            'translationPostCategoriesSorting': null,
            'translationPostCategoriesFilter': null
        },
        resolve: loadSequence('TranslationPostCategoriesCtrl', 'translationPostCategoryService', 'postCategoryService', 'userService')
    }).state('app.translation.translationpostcategoriesnew', {
        url: '/translation-post-categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostCategory/translation_post_category_form.html',
        title: 'content.list.NEWTRANSLATIONPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPOSTCATEGORY'
        },
        params: {
            'translation_post_category_post_category': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostCategoryFormCtrl', 'translationPostCategoryService', 'postCategoryService', 'userService')
    }).state('app.translation.translationpostcategoriesedit', {
        url: '/translation-post-categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostCategory/translation_post_category_form.html',
        title: 'content.list.EDITTRANSLATIONPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPOSTCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostCategoryFormCtrl', 'translationPostCategoryService', 'postCategoryService', 'userService')
    }).state('app.translation.translationpostcategoriesdetails', {
        url: '/translation-post-categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPostCategory/translation_post_category.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTCATEGORYDETAILS'
        },
        resolve: loadSequence('TranslationPostCategoryCtrl', 'translationPostCategoryService')
    }).state('app.translation.translationposts', {
        url: '/translation-posts',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPost/translation_posts.html',
        title: 'content.list.TRANSLATIONPOSTS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTS'
        },
        params: {
            'translationPostsIsFiltersVisible': null,
            'translationPostsPage': null,
            'translationPostsCount': null,
            'translationPostsSorting': null,
            'translationPostsFilter': null
        },
        resolve: loadSequence('TranslationPostsCtrl', 'translationPostService', 'postService', 'userService')
    }).state('app.translation.translationpostsnew', {
        url: '/translation-posts/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPost/translation_post_form.html',
        title: 'content.list.NEWTRANSLATIONPOST',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPOST'
        },
        params: {
            'translation_post_post': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostFormCtrl', 'translationPostService', 'postService', 'userService')
    }).state('app.translation.translationpostsedit', {
        url: '/translation-posts/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPost/translation_post_form.html',
        title: 'content.list.EDITTRANSLATIONPOST',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPOST'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationPostFormCtrl', 'translationPostService', 'postService', 'userService')
    }).state('app.translation.translationpostsdetails', {
        url: '/translation-posts/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationPost/translation_post.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPOSTDETAILS'
        },
        resolve: loadSequence('TranslationPostCtrl', 'translationPostService')
    }).state('app.translation.translationcategories', {
        url: '/translation-categories',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCategory/translation_categories.html',
        title: 'content.list.TRANSLATIONCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCATEGORIES'
        },
        params: {
            'translationCategoriesIsFiltersVisible': null,
            'translationCategoriesPage': null,
            'translationCategoriesCount': null,
            'translationCategoriesSorting': null,
            'translationCategoriesFilter': null
        },
        resolve: loadSequence('TranslationCategoriesCtrl', 'translationCategoryService', 'categoryService', 'userService')
    }).state('app.translation.translationcategoriesnew', {
        url: '/translation-categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCategory/translation_category_form.html',
        title: 'content.list.NEWTRANSLATIONCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONCATEGORY'
        },
        params: {
            'translation_category_category': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationCategoryFormCtrl', 'translationCategoryService', 'categoryService', 'userService')
    }).state('app.translation.translationcategoriesedit', {
        url: '/translation-categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCategory/translation_category_form.html',
        title: 'content.list.EDITTRANSLATIONCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationCategoryFormCtrl', 'translationCategoryService', 'categoryService', 'userService')
    }).state('app.translation.translationcategoriesdetails', {
        url: '/translation-categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCategory/translation_category.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCATEGORYDETAILS'
        },
        resolve: loadSequence('TranslationCategoryCtrl', 'translationCategoryService')
    }).state('app.translation.translationbuyertypes', {
        url: '/translation-buyer-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBuyerType/translation_buyer_types.html',
        title: 'content.list.TRANSLATIONBUYERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONBUYERTYPES'
        },
        params: {
            'translationBuyerTypesIsFiltersVisible': null,
            'translationBuyerTypesPage': null,
            'translationBuyerTypesCount': null,
            'translationBuyerTypesSorting': null,
            'translationBuyerTypesFilter': null
        },
        resolve: loadSequence('TranslationBuyerTypesCtrl', 'translationBuyerTypeService', 'buyerTypeService', 'userService')
    }).state('app.translation.translationbuyertypesnew', {
        url: '/translation-buyer-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBuyerType/translation_buyer_type_form.html',
        title: 'content.list.NEWTRANSLATIONBUYERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONBUYERTYPE'
        },
        params: {
            'translation_buyer_type_buyer_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationBuyerTypeFormCtrl', 'translationBuyerTypeService', 'buyerTypeService', 'userService')
    }).state('app.translation.translationbuyertypesedit', {
        url: '/translation-buyer-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBuyerType/translation_buyer_type_form.html',
        title: 'content.list.EDITTRANSLATIONBUYERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONBUYERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationBuyerTypeFormCtrl', 'translationBuyerTypeService', 'buyerTypeService', 'userService')
    }).state('app.translation.translationbuyertypesdetails', {
        url: '/translation-buyer-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBuyerType/translation_buyer_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONBUYERTYPEDETAILS'
        },
        resolve: loadSequence('TranslationBuyerTypeCtrl', 'translationBuyerTypeService')
    }).state('app.translation.translationcountries', {
        url: '/translation-countries',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCountry/translation_countries.html',
        title: 'content.list.TRANSLATIONCOUNTRIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCOUNTRIES'
        },
        params: {
            'translationCountriesIsFiltersVisible': null,
            'translationCountriesPage': null,
            'translationCountriesCount': null,
            'translationCountriesSorting': null,
            'translationCountriesFilter': null
        },
        resolve: loadSequence('TranslationCountriesCtrl', 'translationCountryService', 'countryService', 'userService')
    }).state('app.translation.translationcountriesnew', {
        url: '/translation-countries/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCountry/translation_country_form.html',
        title: 'content.list.NEWTRANSLATIONCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONCOUNTRY'
        },
        params: {
            'translation_country_country': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationCountryFormCtrl', 'translationCountryService', 'countryService', 'userService')
    }).state('app.translation.translationcountriesedit', {
        url: '/translation-countries/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCountry/translation_country_form.html',
        title: 'content.list.EDITTRANSLATIONCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationCountryFormCtrl', 'translationCountryService', 'countryService', 'userService')
    }).state('app.translation.translationcountriesdetails', {
        url: '/translation-countries/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationCountry/translation_country.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCOUNTRYDETAILS'
        },
        resolve: loadSequence('TranslationCountryCtrl', 'translationCountryService')
    }).state('app.translation.translationmenus', {
        url: '/translation-menus',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenu/translation_menus.html',
        title: 'content.list.TRANSLATIONMENUS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONMENUS'
        },
        params: {
            'translationMenusIsFiltersVisible': null,
            'translationMenusPage': null,
            'translationMenusCount': null,
            'translationMenusSorting': null,
            'translationMenusFilter': null
        },
        resolve: loadSequence('TranslationMenusCtrl', 'translationMenuService', 'menuService', 'userService')
    }).state('app.translation.translationmenusnew', {
        url: '/translation-menus/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenu/translation_menu_form.html',
        title: 'content.list.NEWTRANSLATIONMENU',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONMENU'
        },
        params: {
            'translation_menu_menu': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationMenuFormCtrl', 'translationMenuService', 'menuService', 'userService')
    }).state('app.translation.translationmenusedit', {
        url: '/translation-menus/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenu/translation_menu_form.html',
        title: 'content.list.EDITTRANSLATIONMENU',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONMENU'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationMenuFormCtrl', 'translationMenuService', 'menuService', 'userService')
    }).state('app.translation.translationmenusdetails', {
        url: '/translation-menus/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenu/translation_menu.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONMENUDETAILS'
        },
        resolve: loadSequence('TranslationMenuCtrl', 'translationMenuService')
    }).state('app.translation.translationmenulinks', {
        url: '/translation-menu-links',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenuLink/translation_menu_links.html',
        title: 'content.list.TRANSLATIONMENULINKS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONMENULINKS'
        },
        params: {
            'translationMenuLinksIsFiltersVisible': null,
            'translationMenuLinksPage': null,
            'translationMenuLinksCount': null,
            'translationMenuLinksSorting': null,
            'translationMenuLinksFilter': null
        },
        resolve: loadSequence('TranslationMenuLinksCtrl', 'translationMenuLinkService', 'menuLinkService', 'userService')
    }).state('app.translation.translationmenulinksnew', {
        url: '/translation-menu-links/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenuLink/translation_menu_link_form.html',
        title: 'content.list.NEWTRANSLATIONMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONMENULINK'
        },
        params: {
            'translation_menu_link_menu_link': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationMenuLinkFormCtrl', 'translationMenuLinkService', 'menuLinkService', 'userService')
    }).state('app.translation.translationmenulinksedit', {
        url: '/translation-menu-links/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenuLink/translation_menu_link_form.html',
        title: 'content.list.EDITTRANSLATIONMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONMENULINK'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationMenuLinkFormCtrl', 'translationMenuLinkService', 'menuLinkService', 'userService')
    }).state('app.translation.translationmenulinksdetails', {
        url: '/translation-menu-links/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationMenuLink/translation_menu_link.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONMENULINKDETAILS'
        },
        resolve: loadSequence('TranslationMenuLinkCtrl', 'translationMenuLinkService')
    }).state('app.translation.translationbiddingtypes', {
        url: '/translation-bidding-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBiddingType/translation_bidding_types.html',
        title: 'content.list.TRANSLATIONBIDDINGTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONBIDDINGTYPES'
        },
        params: {
            'translationBiddingTypesIsFiltersVisible': null,
            'translationBiddingTypesPage': null,
            'translationBiddingTypesCount': null,
            'translationBiddingTypesSorting': null,
            'translationBiddingTypesFilter': null
        },
        resolve: loadSequence('TranslationBiddingTypesCtrl', 'translationBiddingTypeService', 'biddingTypeService', 'userService')
    }).state('app.translation.translationbiddingtypesnew', {
        url: '/translation-bidding-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBiddingType/translation_bidding_type_form.html',
        title: 'content.list.NEWTRANSLATIONBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONBIDDINGTYPE'
        },
        params: {
            'translation_bidding_type_bidding_type': null
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationBiddingTypeFormCtrl', 'translationBiddingTypeService', 'biddingTypeService', 'userService')
    }).state('app.translation.translationbiddingtypesedit', {
        url: '/translation-bidding-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBiddingType/translation_bidding_type_form.html',
        title: 'content.list.EDITTRANSLATIONBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONBIDDINGTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TranslationBiddingTypeFormCtrl', 'translationBiddingTypeService', 'biddingTypeService', 'userService')
    }).state('app.translation.translationbiddingtypesdetails', {
        url: '/translation-bidding-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TranslationBiddingType/translation_bidding_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONBIDDINGTYPEDETAILS'
        },
        resolve: loadSequence('TranslationBiddingTypeCtrl', 'translationBiddingTypeService')
    });

}]);
