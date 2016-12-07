app.constant('APP_JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'LoginCtrl': '/bundles/ubidelectricity/js/components/Auth/LoginCtrl.js',
        'LockScreenCtrl': '/bundles/ubidelectricity/js/components/Auth/LockScreenCtrl.js',
        'RegisterCtrl': '/bundles/ubidelectricity/js/components/Auth/RegisterCtrl.js',
        'EmailConfirmCtrl': '/bundles/ubidelectricity/js/components/Auth/EmailConfirmCtrl.js',
        'ResetPasswordCtrl': '/bundles/ubidelectricity/js/components/Auth/ResetPasswordCtrl.js',
        'ResetCtrl': '/bundles/ubidelectricity/js/components/Auth/ResetCtrl.js',
        'ChangePasswordCtrl': '/bundles/ubidelectricity/js/components/Auth/ChangePasswordCtrl.js',
        'ProfileCtrl': '/bundles/ubidelectricity/js/components/Auth/ProfileCtrl.js',
        'DashboardCtrl': '/bundles/ubidelectricity/js/components/Main/DashboardCtrl.js'
    },
    modules: [{
        name: 'LoginService',
        files: ['/bundles/ubidelectricity/js/components/Auth/LoginService.js']
    },{
        name: 'RegisterService',
        files: ['/bundles/ubidelectricity/js/components/Auth/RegisterService.js']
    },{
        name: 'ResetPasswordService',
        files: ['/bundles/ubidelectricity/js/components/Auth/ResetPasswordService.js']
    },{
        name: 'ProfileService',
        files: ['/bundles/ubidelectricity/js/components/Auth/ProfileService.js']
    },{
        name: 'DashboardService',
        files: ['/bundles/ubidelectricity/js/components/Main/DashboardService.js']
    }]
});
