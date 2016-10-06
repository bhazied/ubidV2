app.constant('APP_JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'LoginCtrl': '/bundles/buckshunter/js/components/Auth/LoginCtrl.js',
        'LockScreenCtrl': '/bundles/buckshunter/js/components/Auth/LockScreenCtrl.js',
        'RegisterCtrl': '/bundles/buckshunter/js/components/Auth/RegisterCtrl.js',
        'EmailConfirmCtrl': '/bundles/buckshunter/js/components/Auth/EmailConfirmCtrl.js',
        'ResetPasswordCtrl': '/bundles/buckshunter/js/components/Auth/ResetPasswordCtrl.js',
        'ResetCtrl': '/bundles/buckshunter/js/components/Auth/ResetCtrl.js',
        'ChangePasswordCtrl': '/bundles/buckshunter/js/components/Auth/ChangePasswordCtrl.js',
        'ProfileCtrl': '/bundles/buckshunter/js/components/Auth/ProfileCtrl.js',
        'DashboardCtrl': '/bundles/buckshunter/js/components/Main/DashboardCtrl.js',
        'BannersCtrl': '/bundles/buckshunter/js/components/Banner/BannersCtrl.js',
        'BannerFormCtrl': '/bundles/buckshunter/js/components/Banner/BannerFormCtrl.js',
        'BannerCtrl': '/bundles/buckshunter/js/components/Banner/BannerCtrl.js',
        'CountriesCtrl': '/bundles/buckshunter/js/components/Country/CountriesCtrl.js',
        'CountryFormCtrl': '/bundles/buckshunter/js/components/Country/CountryFormCtrl.js',
        'CountryCtrl': '/bundles/buckshunter/js/components/Country/CountryCtrl.js',
        'GamesCtrl': '/bundles/buckshunter/js/components/Game/GamesCtrl.js',
        'GameFormCtrl': '/bundles/buckshunter/js/components/Game/GameFormCtrl.js',
        'GameCtrl': '/bundles/buckshunter/js/components/Game/GameCtrl.js',
        'LanguagesCtrl': '/bundles/buckshunter/js/components/Language/LanguagesCtrl.js',
        'LanguageFormCtrl': '/bundles/buckshunter/js/components/Language/LanguageFormCtrl.js',
        'LanguageCtrl': '/bundles/buckshunter/js/components/Language/LanguageCtrl.js',
        'PushDevicesCtrl': '/bundles/buckshunter/js/components/PushDevice/PushDevicesCtrl.js',
        'PushDeviceFormCtrl': '/bundles/buckshunter/js/components/PushDevice/PushDeviceFormCtrl.js',
        'PushDeviceCtrl': '/bundles/buckshunter/js/components/PushDevice/PushDeviceCtrl.js',
        'PushMessagesCtrl': '/bundles/buckshunter/js/components/PushMessage/PushMessagesCtrl.js',
        'PushMessageFormCtrl': '/bundles/buckshunter/js/components/PushMessage/PushMessageFormCtrl.js',
        'PushMessageCtrl': '/bundles/buckshunter/js/components/PushMessage/PushMessageCtrl.js',
        'PushMessageSenderCtrl': '/bundles/buckshunter/js/components/PushMessage/PushMessageSenderCtrl.js',
        'PushNotificationsCtrl': '/bundles/buckshunter/js/components/PushNotification/PushNotificationsCtrl.js',
        'PushNotificationFormCtrl': '/bundles/buckshunter/js/components/PushNotification/PushNotificationFormCtrl.js',
        'PushNotificationCtrl': '/bundles/buckshunter/js/components/PushNotification/PushNotificationCtrl.js',
        'PushNotificationSenderCtrl': '/bundles/buckshunter/js/components/PushNotification/PushNotificationSenderCtrl.js',
        'PuzzlesCtrl': '/bundles/buckshunter/js/components/Puzzle/PuzzlesCtrl.js',
        'PuzzleFormCtrl': '/bundles/buckshunter/js/components/Puzzle/PuzzleFormCtrl.js',
        'PuzzleCtrl': '/bundles/buckshunter/js/components/Puzzle/PuzzleCtrl.js',
        'ScoresCtrl': '/bundles/buckshunter/js/components/Score/ScoresCtrl.js',
        'ScoreFormCtrl': '/bundles/buckshunter/js/components/Score/ScoreFormCtrl.js',
        'ScoreCtrl': '/bundles/buckshunter/js/components/Score/ScoreCtrl.js',
        'SessionsCtrl': '/bundles/buckshunter/js/components/Session/SessionsCtrl.js',
        'SessionFormCtrl': '/bundles/buckshunter/js/components/Session/SessionFormCtrl.js',
        'SessionCtrl': '/bundles/buckshunter/js/components/Session/SessionCtrl.js',
        'UsersCtrl': '/bundles/buckshunter/js/components/User/UsersCtrl.js',
        'UserFormCtrl': '/bundles/buckshunter/js/components/User/UserFormCtrl.js',
        'UserCtrl': '/bundles/buckshunter/js/components/User/UserCtrl.js'
    },
    modules: [{
        name: 'LoginService',
        files: ['/bundles/buckshunter/js/components/Auth/LoginService.js']
    },{
        name: 'RegisterService',
        files: ['/bundles/buckshunter/js/components/Auth/RegisterService.js']
    },{
        name: 'ResetPasswordService',
        files: ['/bundles/buckshunter/js/components/Auth/ResetPasswordService.js']
    },{
        name: 'ProfileService',
        files: ['/bundles/buckshunter/js/components/Auth/ProfileService.js']
    },{
        name: 'DashboardService',
        files: ['/bundles/buckshunter/js/components/Main/DashboardService.js']
    },{
        name: 'bannerService',
        files: ['/bundles/buckshunter/js/components/Banner/BannerService.js']
    },{
        name: 'countryService',
        files: ['/bundles/buckshunter/js/components/Country/CountryService.js']
    },{
        name: 'gameService',
        files: ['/bundles/buckshunter/js/components/Game/GameService.js']
    },{
        name: 'languageService',
        files: ['/bundles/buckshunter/js/components/Language/LanguageService.js']
    },{
        name: 'pushDeviceService',
        files: ['/bundles/buckshunter/js/components/PushDevice/PushDeviceService.js']
    },{
        name: 'pushMessageService',
        files: ['/bundles/buckshunter/js/components/PushMessage/PushMessageService.js']
    },{
        name: 'PushMessageSenderService',
        files: ['/bundles/buckshunter/js/components/PushMessage/PushMessageSenderService.js']
    },{
        name: 'pushNotificationService',
        files: ['/bundles/buckshunter/js/components/PushNotification/PushNotificationService.js']
    },{
        name: 'PushNotificationSenderService',
        files: ['/bundles/buckshunter/js/components/PushNotification/PushNotificationSenderService.js']
    },{
        name: 'puzzleService',
        files: ['/bundles/buckshunter/js/components/Puzzle/PuzzleService.js']
    },{
        name: 'scoreService',
        files: ['/bundles/buckshunter/js/components/Score/ScoreService.js']
    },{
        name: 'sessionService',
        files: ['/bundles/buckshunter/js/components/Session/SessionService.js']
    },{
        name: 'userService',
        files: ['/bundles/buckshunter/js/components/User/UserService.js']
    }]
});
