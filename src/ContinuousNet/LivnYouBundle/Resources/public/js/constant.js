app.constant('APP_JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'LoginCtrl': '/bundles/livnyou/js/components/Auth/LoginCtrl.js',
        'LockScreenCtrl': '/bundles/livnyou/js/components/Auth/LockScreenCtrl.js',
        'RegisterCtrl': '/bundles/livnyou/js/components/Auth/RegisterCtrl.js',
        'EmailConfirmCtrl': '/bundles/livnyou/js/components/Auth/EmailConfirmCtrl.js',
        'ResetPasswordCtrl': '/bundles/livnyou/js/components/Auth/ResetPasswordCtrl.js',
        'ResetCtrl': '/bundles/livnyou/js/components/Auth/ResetCtrl.js',
        'ChangePasswordCtrl': '/bundles/livnyou/js/components/Auth/ChangePasswordCtrl.js',
        'ProfileCtrl': '/bundles/livnyou/js/components/Auth/ProfileCtrl.js',
        'DashboardCtrl': '/bundles/livnyou/js/components/Main/DashboardCtrl.js',
        'ReportingCtrl': '/bundles/livnyou/js/components/Reporting/ReportingCtrl.js',
        'CountriesCtrl': '/bundles/livnyou/js/components/Country/CountriesCtrl.js',
        'CountryFormCtrl': '/bundles/livnyou/js/components/Country/CountryFormCtrl.js',
        'CountryCtrl': '/bundles/livnyou/js/components/Country/CountryCtrl.js',
        'GroupsCtrl': '/bundles/livnyou/js/components/Group/GroupsCtrl.js',
        'GroupFormCtrl': '/bundles/livnyou/js/components/Group/GroupFormCtrl.js',
        'GroupCtrl': '/bundles/livnyou/js/components/Group/GroupCtrl.js',
        'LanguagesCtrl': '/bundles/livnyou/js/components/Language/LanguagesCtrl.js',
        'LanguageFormCtrl': '/bundles/livnyou/js/components/Language/LanguageFormCtrl.js',
        'LanguageCtrl': '/bundles/livnyou/js/components/Language/LanguageCtrl.js',
        'LogsCtrl': '/bundles/livnyou/js/components/Log/LogsCtrl.js',
        'LogFormCtrl': '/bundles/livnyou/js/components/Log/LogFormCtrl.js',
        'LogCtrl': '/bundles/livnyou/js/components/Log/LogCtrl.js',
        'MeasurementsCtrl': '/bundles/livnyou/js/components/Measurement/MeasurementsCtrl.js',
        'MeasurementFormCtrl': '/bundles/livnyou/js/components/Measurement/MeasurementFormCtrl.js',
        'MeasurementCtrl': '/bundles/livnyou/js/components/Measurement/MeasurementCtrl.js',
        'PathologiesCtrl': '/bundles/livnyou/js/components/Pathology/PathologiesCtrl.js',
        'PathologyFormCtrl': '/bundles/livnyou/js/components/Pathology/PathologyFormCtrl.js',
        'PathologyCtrl': '/bundles/livnyou/js/components/Pathology/PathologyCtrl.js',
        'PhysicalActivitiesCtrl': '/bundles/livnyou/js/components/PhysicalActivity/PhysicalActivitiesCtrl.js',
        'PhysicalActivityFormCtrl': '/bundles/livnyou/js/components/PhysicalActivity/PhysicalActivityFormCtrl.js',
        'PhysicalActivityCtrl': '/bundles/livnyou/js/components/PhysicalActivity/PhysicalActivityCtrl.js',
        'SessionsCtrl': '/bundles/livnyou/js/components/Session/SessionsCtrl.js',
        'SessionFormCtrl': '/bundles/livnyou/js/components/Session/SessionFormCtrl.js',
        'SessionCtrl': '/bundles/livnyou/js/components/Session/SessionCtrl.js',
        'TemplatesCtrl': '/bundles/livnyou/js/components/Template/TemplatesCtrl.js',
        'TemplateFormCtrl': '/bundles/livnyou/js/components/Template/TemplateFormCtrl.js',
        'TemplateCtrl': '/bundles/livnyou/js/components/Template/TemplateCtrl.js',
        'TemplateAssignCtrl': '/bundles/livnyou/js/components/Template/TemplateAssignCtrl.js',
        'TranslationCountriesCtrl': '/bundles/livnyou/js/components/TranslationCountry/TranslationCountriesCtrl.js',
        'TranslationCountryFormCtrl': '/bundles/livnyou/js/components/TranslationCountry/TranslationCountryFormCtrl.js',
        'TranslationCountryCtrl': '/bundles/livnyou/js/components/TranslationCountry/TranslationCountryCtrl.js',
        'TranslationPathologiesCtrl': '/bundles/livnyou/js/components/TranslationPathology/TranslationPathologiesCtrl.js',
        'TranslationPathologyFormCtrl': '/bundles/livnyou/js/components/TranslationPathology/TranslationPathologyFormCtrl.js',
        'TranslationPathologyCtrl': '/bundles/livnyou/js/components/TranslationPathology/TranslationPathologyCtrl.js',
        'TranslationPhysicalActivitiesCtrl': '/bundles/livnyou/js/components/TranslationPhysicalActivity/TranslationPhysicalActivitiesCtrl.js',
        'TranslationPhysicalActivityFormCtrl': '/bundles/livnyou/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityFormCtrl.js',
        'TranslationPhysicalActivityCtrl': '/bundles/livnyou/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityCtrl.js',
        'UsersCtrl': '/bundles/livnyou/js/components/User/UsersCtrl.js',
        'UserFormCtrl': '/bundles/livnyou/js/components/User/UserFormCtrl.js',
        'UserCtrl': '/bundles/livnyou/js/components/User/UserCtrl.js'
    },
    modules: [{
        name: 'LoginService',
        files: ['/bundles/livnyou/js/components/Auth/LoginService.js']
    },{
        name: 'RegisterService',
        files: ['/bundles/livnyou/js/components/Auth/RegisterService.js']
    },{
        name: 'ResetPasswordService',
        files: ['/bundles/livnyou/js/components/Auth/ResetPasswordService.js']
    },{
        name: 'ProfileService',
        files: ['/bundles/livnyou/js/components/Auth/ProfileService.js']
    },{
        name: 'DashboardService',
        files: ['/bundles/livnyou/js/components/Main/DashboardService.js']
    },{
        name: 'ReportingService',
        files: ['/bundles/livnyou/js/components/Reporting/ReportingService.js']
    },{
        name: 'countryService',
        files: ['/bundles/livnyou/js/components/Country/CountryService.js']
    },{
        name: 'groupService',
        files: ['/bundles/livnyou/js/components/Group/GroupService.js']
    },{
        name: 'languageService',
        files: ['/bundles/livnyou/js/components/Language/LanguageService.js']
    },{
        name: 'logService',
        files: ['/bundles/livnyou/js/components/Log/LogService.js']
    },{
        name: 'measurementService',
        files: ['/bundles/livnyou/js/components/Measurement/MeasurementService.js']
    },{
        name: 'pathologyService',
        files: ['/bundles/livnyou/js/components/Pathology/PathologyService.js']
    },{
        name: 'physicalActivityService',
        files: ['/bundles/livnyou/js/components/PhysicalActivity/PhysicalActivityService.js']
    },{
        name: 'sessionService',
        files: ['/bundles/livnyou/js/components/Session/SessionService.js']
    },{
        name: 'templateService',
        files: ['/bundles/livnyou/js/components/Template/TemplateService.js']
    },{
        name: 'TemplateAssignService',
        files: ['/bundles/livnyou/js/components/Template/TemplateAssignService.js']
    },{
        name: 'translationCountryService',
        files: ['/bundles/livnyou/js/components/TranslationCountry/TranslationCountryService.js']
    },{
        name: 'translationPathologyService',
        files: ['/bundles/livnyou/js/components/TranslationPathology/TranslationPathologyService.js']
    },{
        name: 'translationPhysicalActivityService',
        files: ['/bundles/livnyou/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityService.js']
    },{
        name: 'userService',
        files: ['/bundles/livnyou/js/components/User/UserService.js']
    }]
});
