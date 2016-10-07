
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
        }).state('front.login', {
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
        }).state('front.register', {
            url: '/register',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/register.html',
            title: 'content.list.REGISTER',
            ncyBreadcrumb: {
                label: 'content.list.REGISTER'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterFrontCtrl', 'RegisterService', 'countryService', 'groupService', 'languageService', 'userService', 'RegisterService')
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
        }).state('front.profile', {
            url: '/profile',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/profile.html',
            title: 'topbar.user.PROFILE',
            ncyBreadcrumb: {
                label: 'topbar.user.PROFILE'
            },
            resolve: loadSequence('jquery-sparkline', 'ProfileCtrl', 'ProfileService', 'countryService')
        }).state('front.changepassword', {
            url: '/change-password',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/change_password.html',
            title: 'topbar.user.CHANGEPASSWORD',
            ncyBreadcrumb: {
                label: 'topbar.user.CHANGEPASSWORD'
            },
            resolve: loadSequence('jquery-sparkline', 'ChangePasswordCtrl', 'ProfileService')
        }).state('front.home', {
            url:'/',
            templateUrl : '/bundles/ubidelectricity/js/front/Home/home.html',
            title: "HOME PAGE UBID",
            resolve: loadSequence()
        }).state('front.contact', {
            url:'/contact',
            template : "<div>this is a contact page</div>",
            title: "Contact page",
            resolve: loadSequence()
        }).state('front.about', {
            url:'/about-us',
            template : "<div>this is about us page</div>",
            title: "about us page",
            resolve: loadSequence()
        })

    }]);
