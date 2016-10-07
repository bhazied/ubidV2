
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/login.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/register.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/reset_password.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/email_confirm.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/reset.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/lock_screen.html',
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
        templateUrl: '/bundles/buckshunter/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('jquery-sparkline', 'ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/buckshunter/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('jquery-sparkline', 'ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/buckshunter/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('jquery-sparkline', 'DashboardCtrl', 'DashboardService')
    }).state('app.content', {
        url: '/content',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.content.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.content.MAIN'
        }
    }).state('app.content.puzzles', {
        url: '/puzzles',
        templateUrl: '/bundles/buckshunter/js/components/Puzzle/puzzles.html',
        title: 'content.list.PUZZLES',
        ncyBreadcrumb: {
            label: 'content.list.PUZZLES'
        },
        resolve: loadSequence('PuzzlesCtrl', 'puzzleService', 'countryService', 'userService')
    }).state('app.content.puzzlesnew', {
        url: '/puzzles/new',
        templateUrl: '/bundles/buckshunter/js/components/Puzzle/puzzle_form.html',
        title: 'content.list.NEWPUZZLE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUZZLE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PuzzleFormCtrl', 'puzzleService', 'countryService', 'userService')
    }).state('app.content.puzzlesedit', {
        url: '/puzzles/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Puzzle/puzzle_form.html',
        title: 'content.list.EDITPUZZLE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUZZLE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PuzzleFormCtrl', 'puzzleService', 'countryService', 'userService')
    }).state('app.content.puzzlesdetails', {
        url: '/puzzles/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Puzzle/puzzle.html',
        ncyBreadcrumb: {
            label: 'content.list.PUZZLEDETAILS'
        },
        resolve: loadSequence('PuzzleCtrl', 'puzzleService')
    }).state('app.content.banners', {
        url: '/banners',
        templateUrl: '/bundles/buckshunter/js/components/Banner/banners.html',
        title: 'content.list.BANNERS',
        ncyBreadcrumb: {
            label: 'content.list.BANNERS'
        },
        resolve: loadSequence('BannersCtrl', 'bannerService', 'countryService', 'userService')
    }).state('app.content.bannersnew', {
        url: '/banners/new',
        templateUrl: '/bundles/buckshunter/js/components/Banner/banner_form.html',
        title: 'content.list.NEWBANNER',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerFormCtrl', 'bannerService', 'countryService', 'userService')
    }).state('app.content.bannersedit', {
        url: '/banners/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Banner/banner_form.html',
        title: 'content.list.EDITBANNER',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BannerFormCtrl', 'bannerService', 'countryService', 'userService')
    }).state('app.content.bannersdetails', {
        url: '/banners/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Banner/banner.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERDETAILS'
        },
        resolve: loadSequence('BannerCtrl', 'bannerService')
    }).state('app.settings', {
        url: '/settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.settings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.settings.MAIN'
        }
    }).state('app.settings.languages', {
        url: '/languages',
        templateUrl: '/bundles/buckshunter/js/components/Language/languages.html',
        title: 'content.list.LANGUAGES',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGES'
        },
        resolve: loadSequence('LanguagesCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesnew', {
        url: '/languages/new',
        templateUrl: '/bundles/buckshunter/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.settings.countries', {
        url: '/countries',
        templateUrl: '/bundles/buckshunter/js/components/Country/countries.html',
        title: 'content.list.COUNTRIES',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRIES'
        },
        resolve: loadSequence('CountriesCtrl', 'countryService', 'userService')
    }).state('app.settings.countriesnew', {
        url: '/countries/new',
        templateUrl: '/bundles/buckshunter/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'userService')
    }).state('app.settings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'userService')
    }).state('app.settings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.gaming', {
        url: '/gaming',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.gaming.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.gaming.MAIN'
        }
    }).state('app.gaming.games', {
        url: '/games',
        templateUrl: '/bundles/buckshunter/js/components/Game/games.html',
        title: 'content.list.GAMES',
        ncyBreadcrumb: {
            label: 'content.list.GAMES'
        },
        resolve: loadSequence('GamesCtrl', 'gameService', 'userService', 'puzzleService')
    }).state('app.gaming.gamesnew', {
        url: '/games/new',
        templateUrl: '/bundles/buckshunter/js/components/Game/game_form.html',
        title: 'content.list.NEWGAME',
        ncyBreadcrumb: {
            label: 'content.list.NEWGAME'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GameFormCtrl', 'gameService', 'userService', 'puzzleService')
    }).state('app.gaming.gamesedit', {
        url: '/games/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Game/game_form.html',
        title: 'content.list.EDITGAME',
        ncyBreadcrumb: {
            label: 'content.list.EDITGAME'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GameFormCtrl', 'gameService', 'userService', 'puzzleService')
    }).state('app.gaming.gamesdetails', {
        url: '/games/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Game/game.html',
        ncyBreadcrumb: {
            label: 'content.list.GAMEDETAILS'
        },
        resolve: loadSequence('GameCtrl', 'gameService')
    }).state('app.gaming.scores', {
        url: '/scores',
        templateUrl: '/bundles/buckshunter/js/components/Score/scores.html',
        title: 'content.list.SCORES',
        ncyBreadcrumb: {
            label: 'content.list.SCORES'
        },
        resolve: loadSequence('ScoresCtrl', 'scoreService', 'gameService', 'userService')
    }).state('app.gaming.scoresnew', {
        url: '/scores/new',
        templateUrl: '/bundles/buckshunter/js/components/Score/score_form.html',
        title: 'content.list.NEWSCORE',
        ncyBreadcrumb: {
            label: 'content.list.NEWSCORE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ScoreFormCtrl', 'scoreService', 'gameService', 'userService')
    }).state('app.gaming.scoresedit', {
        url: '/scores/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Score/score_form.html',
        title: 'content.list.EDITSCORE',
        ncyBreadcrumb: {
            label: 'content.list.EDITSCORE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ScoreFormCtrl', 'scoreService', 'gameService', 'userService')
    }).state('app.gaming.scoresdetails', {
        url: '/scores/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Score/score.html',
        ncyBreadcrumb: {
            label: 'content.list.SCOREDETAILS'
        },
        resolve: loadSequence('ScoreCtrl', 'scoreService')
    }).state('app.mobile', {
        url: '/mobile',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.mobile.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.mobile.MAIN'
        }
    }).state('app.mobile.pushnotifications', {
        url: '/push-notifications',
        templateUrl: '/bundles/buckshunter/js/components/PushNotification/push_notifications.html',
        title: 'content.list.PUSHNOTIFICATIONS',
        ncyBreadcrumb: {
            label: 'content.list.PUSHNOTIFICATIONS'
        },
        resolve: loadSequence('PushNotificationsCtrl', 'pushNotificationService', 'gameService', 'userService')
    }).state('app.mobile.pushnotificationsnew', {
        url: '/push-notifications/new',
        templateUrl: '/bundles/buckshunter/js/components/PushNotification/push_notification_form.html',
        title: 'content.list.NEWPUSHNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHNOTIFICATION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushNotificationFormCtrl', 'pushNotificationService', 'gameService', 'userService')
    }).state('app.mobile.pushnotificationsedit', {
        url: '/push-notifications/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushNotification/push_notification_form.html',
        title: 'content.list.EDITPUSHNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHNOTIFICATION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushNotificationFormCtrl', 'pushNotificationService', 'gameService', 'userService')
    }).state('app.mobile.pushnotificationsdetails', {
        url: '/push-notifications/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushNotification/push_notification.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHNOTIFICATIONDETAILS'
        },
        resolve: loadSequence('PushNotificationCtrl', 'pushNotificationService')
    }).state('app.mobile.pushnotificationssend', {
        url: '/push-notifications/send/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushNotification/push_notification_sender.html',
        ncyBreadcrumb: {
            label: 'content.list.SENDPUSHNOTIFICATION'
        },
        resolve: loadSequence('PushNotificationSenderCtrl', 'PushNotificationSenderService', 'pushNotificationService')
    }).state('app.mobile.pushdevices', {
        url: '/push-devices',
        templateUrl: '/bundles/buckshunter/js/components/PushDevice/push_devices.html',
        title: 'content.list.PUSHDEVICES',
        ncyBreadcrumb: {
            label: 'content.list.PUSHDEVICES'
        },
        resolve: loadSequence('PushDevicesCtrl', 'pushDeviceService', 'userService')
    }).state('app.mobile.pushdevicesnew', {
        url: '/push-devices/new',
        templateUrl: '/bundles/buckshunter/js/components/PushDevice/push_device_form.html',
        title: 'content.list.NEWPUSHDEVICE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHDEVICE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushDeviceFormCtrl', 'pushDeviceService', 'userService')
    }).state('app.mobile.pushdevicesedit', {
        url: '/push-devices/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushDevice/push_device_form.html',
        title: 'content.list.EDITPUSHDEVICE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHDEVICE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushDeviceFormCtrl', 'pushDeviceService', 'userService')
    }).state('app.mobile.pushdevicesdetails', {
        url: '/push-devices/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushDevice/push_device.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHDEVICEDETAILS'
        },
        resolve: loadSequence('PushDeviceCtrl', 'pushDeviceService')
    }).state('app.mobile.pushmessages', {
        url: '/push-messages',
        templateUrl: '/bundles/buckshunter/js/components/PushMessage/push_messages.html',
        title: 'content.list.PUSHMESSAGES',
        ncyBreadcrumb: {
            label: 'content.list.PUSHMESSAGES'
        },
        resolve: loadSequence('PushMessagesCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService')
    }).state('app.mobile.pushmessagesnew', {
        url: '/push-messages/new',
        templateUrl: '/bundles/buckshunter/js/components/PushMessage/push_message_form.html',
        title: 'content.list.NEWPUSHMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHMESSAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushMessageFormCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService')
    }).state('app.mobile.pushmessagesedit', {
        url: '/push-messages/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushMessage/push_message_form.html',
        title: 'content.list.EDITPUSHMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHMESSAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PushMessageFormCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService')
    }).state('app.mobile.pushmessagesdetails', {
        url: '/push-messages/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushMessage/push_message.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHMESSAGEDETAILS'
        },
        resolve: loadSequence('PushMessageCtrl', 'pushMessageService')
    }).state('app.mobile.pushmessagessend', {
        url: '/push-messages/send/:id',
        templateUrl: '/bundles/buckshunter/js/components/PushMessage/push_message_sender.html',
        ncyBreadcrumb: {
            label: 'content.list.SENDPUSHMESSAGE'
        },
        resolve: loadSequence('PushMessageSenderCtrl', 'PushMessageSenderService', 'pushMessageService')
    }).state('app.access', {
        url: '/access',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.access.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.access.MAIN'
        }
    }).state('app.access.users', {
        url: '/users',
        templateUrl: '/bundles/buckshunter/js/components/User/users.html',
        title: 'content.list.USERS',
        ncyBreadcrumb: {
            label: 'content.list.USERS'
        },
        resolve: loadSequence('UsersCtrl', 'userService', 'countryService', 'languageService')
    }).state('app.access.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/buckshunter/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService')
    }).state('app.access.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService')
    }).state('app.access.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.access.sessions', {
        url: '/sessions',
        templateUrl: '/bundles/buckshunter/js/components/Session/sessions.html',
        title: 'content.list.SESSIONS',
        ncyBreadcrumb: {
            label: 'content.list.SESSIONS'
        },
        resolve: loadSequence('SessionsCtrl', 'sessionService', 'userService')
    }).state('app.access.sessionsnew', {
        url: '/sessions/new',
        templateUrl: '/bundles/buckshunter/js/components/Session/session_form.html',
        title: 'content.list.NEWSESSION',
        ncyBreadcrumb: {
            label: 'content.list.NEWSESSION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SessionFormCtrl', 'sessionService', 'userService')
    }).state('app.access.sessionsedit', {
        url: '/sessions/edit/:id',
        templateUrl: '/bundles/buckshunter/js/components/Session/session_form.html',
        title: 'content.list.EDITSESSION',
        ncyBreadcrumb: {
            label: 'content.list.EDITSESSION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SessionFormCtrl', 'sessionService', 'userService')
    }).state('app.access.sessionsdetails', {
        url: '/sessions/details/:id',
        templateUrl: '/bundles/buckshunter/js/components/Session/session.html',
        ncyBreadcrumb: {
            label: 'content.list.SESSIONDETAILS'
        },
        resolve: loadSequence('SessionCtrl', 'sessionService')
    });

}]);
