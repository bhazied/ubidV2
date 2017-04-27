
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
        templateUrl: '/bundles/livnyou/js/components/Auth/login.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/register.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/reset_password.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/email_confirm.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/reset.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/lock_screen.html',
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
        templateUrl: '/bundles/livnyou/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/livnyou/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/livnyou/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('DashboardCtrl', 'DashboardService')
    }).state('app.reporting', {
        url: '/reporting',
        templateUrl: '/bundles/livnyou/js/components/Reporting/reporting.html',
        title: 'content.list.REPORTING',
        ncyBreadcrumb: {
            label: 'content.list.REPORTING'
        },
        resolve: loadSequence('ReportingCtrl', 'ReportingService')
    }).state('app.systemsettings', {
        url: '/system-settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.systemsettings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.systemsettings.MAIN'
        }
    }).state('app.systemsettings.pathologies', {
        url: '/pathologies',
        templateUrl: '/bundles/livnyou/js/components/Pathology/pathologies.html',
        title: 'content.list.PATHOLOGIES',
        ncyBreadcrumb: {
            label: 'content.list.PATHOLOGIES'
        },
        params: {
            'pathologiesIsFiltersVisible': null,
            'pathologiesPage': null,
            'pathologiesCount': null,
            'pathologiesSorting': null,
            'pathologiesFilter': null
        },
        resolve: loadSequence('PathologiesCtrl', 'pathologyService', 'userService')
    }).state('app.systemsettings.pathologiesnew', {
        url: '/pathologies/new',
        templateUrl: '/bundles/livnyou/js/components/Pathology/pathology_form.html',
        title: 'content.list.NEWPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPATHOLOGY'
        },
        params: {
        },
        resolve: loadSequence('PathologyFormCtrl', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.pathologiesedit', {
        url: '/pathologies/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Pathology/pathology_form.html',
        title: 'content.list.EDITPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPATHOLOGY'
        },
        resolve: loadSequence('PathologyFormCtrl', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.pathologiesdetails', {
        url: '/pathologies/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Pathology/pathology.html',
        ncyBreadcrumb: {
            label: 'content.list.PATHOLOGYDETAILS'
        },
        resolve: loadSequence('PathologyCtrl', 'pathologyService')
    }).state('app.systemsettings.physicalactivities', {
        url: '/physical-activities',
        templateUrl: '/bundles/livnyou/js/components/PhysicalActivity/physical_activities.html',
        title: 'content.list.PHYSICALACTIVITIES',
        ncyBreadcrumb: {
            label: 'content.list.PHYSICALACTIVITIES'
        },
        params: {
            'physicalActivitiesIsFiltersVisible': null,
            'physicalActivitiesPage': null,
            'physicalActivitiesCount': null,
            'physicalActivitiesSorting': null,
            'physicalActivitiesFilter': null
        },
        resolve: loadSequence('PhysicalActivitiesCtrl', 'physicalActivityService', 'userService')
    }).state('app.systemsettings.physicalactivitiesnew', {
        url: '/physical-activities/new',
        templateUrl: '/bundles/livnyou/js/components/PhysicalActivity/physical_activity_form.html',
        title: 'content.list.NEWPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPHYSICALACTIVITY'
        },
        params: {
        },
        resolve: loadSequence('PhysicalActivityFormCtrl', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.physicalactivitiesedit', {
        url: '/physical-activities/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/PhysicalActivity/physical_activity_form.html',
        title: 'content.list.EDITPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPHYSICALACTIVITY'
        },
        resolve: loadSequence('PhysicalActivityFormCtrl', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.physicalactivitiesdetails', {
        url: '/physical-activities/details/:id',
        templateUrl: '/bundles/livnyou/js/components/PhysicalActivity/physical_activity.html',
        ncyBreadcrumb: {
            label: 'content.list.PHYSICALACTIVITYDETAILS'
        },
        resolve: loadSequence('PhysicalActivityCtrl', 'physicalActivityService')
    }).state('app.systemsettings.countries', {
        url: '/countries',
        templateUrl: '/bundles/livnyou/js/components/Country/countries.html',
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
        resolve: loadSequence('CountriesCtrl', 'countryService', 'userService')
    }).state('app.systemsettings.countriesnew', {
        url: '/countries/new',
        templateUrl: '/bundles/livnyou/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        params: {
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.accesscontrol', {
        url: '/access-control',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.accesscontrol.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.accesscontrol.MAIN'
        }
    }).state('app.accesscontrol.users', {
        url: '/users',
        templateUrl: '/bundles/livnyou/js/components/User/users.html',
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
    }).state('app.accesscontrol.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/livnyou/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        params: {
            'user_country': null,
            'user_language': null
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/livnyou/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.accesscontrol.groups', {
        url: '/groups',
        templateUrl: '/bundles/livnyou/js/components/Group/groups.html',
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
    }).state('app.accesscontrol.groupsnew', {
        url: '/groups/new',
        templateUrl: '/bundles/livnyou/js/components/Group/group_form.html',
        title: 'content.list.NEWGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWGROUP'
        },
        params: {
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.groupsedit', {
        url: '/groups/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Group/group_form.html',
        title: 'content.list.EDITGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITGROUP'
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.groupsdetails', {
        url: '/groups/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Group/group.html',
        ncyBreadcrumb: {
            label: 'content.list.GROUPDETAILS'
        },
        resolve: loadSequence('GroupCtrl', 'groupService')
    }).state('app.accesscontrol.sessions', {
        url: '/sessions',
        templateUrl: '/bundles/livnyou/js/components/Session/sessions.html',
        title: 'content.list.SESSIONS',
        ncyBreadcrumb: {
            label: 'content.list.SESSIONS'
        },
        params: {
            'sessionsIsFiltersVisible': null,
            'sessionsPage': null,
            'sessionsCount': null,
            'sessionsSorting': null,
            'sessionsFilter': null
        },
        resolve: loadSequence('SessionsCtrl', 'sessionService', 'userService')
    }).state('app.accesscontrol.sessionsnew', {
        url: '/sessions/new',
        templateUrl: '/bundles/livnyou/js/components/Session/session_form.html',
        title: 'content.list.NEWSESSION',
        ncyBreadcrumb: {
            label: 'content.list.NEWSESSION'
        },
        params: {
        },
        resolve: loadSequence('SessionFormCtrl', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.sessionsedit', {
        url: '/sessions/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Session/session_form.html',
        title: 'content.list.EDITSESSION',
        ncyBreadcrumb: {
            label: 'content.list.EDITSESSION'
        },
        resolve: loadSequence('SessionFormCtrl', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.sessionsdetails', {
        url: '/sessions/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Session/session.html',
        ncyBreadcrumb: {
            label: 'content.list.SESSIONDETAILS'
        },
        resolve: loadSequence('SessionCtrl', 'sessionService')
    }).state('app.accesscontrol.logs', {
        url: '/logs',
        templateUrl: '/bundles/livnyou/js/components/Log/logs.html',
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
        resolve: loadSequence('LogsCtrl', 'logService', 'sessionService', 'userService')
    }).state('app.accesscontrol.logsnew', {
        url: '/logs/new',
        templateUrl: '/bundles/livnyou/js/components/Log/log_form.html',
        title: 'content.list.NEWLOG',
        ncyBreadcrumb: {
            label: 'content.list.NEWLOG'
        },
        params: {
            'log_session': null
        },
        resolve: loadSequence('LogFormCtrl', 'logService', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.logsedit', {
        url: '/logs/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Log/log_form.html',
        title: 'content.list.EDITLOG',
        ncyBreadcrumb: {
            label: 'content.list.EDITLOG'
        },
        resolve: loadSequence('LogFormCtrl', 'logService', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.logsdetails', {
        url: '/logs/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Log/log.html',
        ncyBreadcrumb: {
            label: 'content.list.LOGDETAILS'
        },
        resolve: loadSequence('LogCtrl', 'logService')
    }).state('app.translation', {
        url: '/translation',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.translation.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.translation.MAIN'
        }
    }).state('app.translation.languages', {
        url: '/languages',
        templateUrl: '/bundles/livnyou/js/components/Language/languages.html',
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
    }).state('app.translation.languagesnew', {
        url: '/languages/new',
        templateUrl: '/bundles/livnyou/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        params: {
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.translation.translationphysicalactivities', {
        url: '/translation-physical-activities',
        templateUrl: '/bundles/livnyou/js/components/TranslationPhysicalActivity/translation_physical_activities.html',
        title: 'content.list.TRANSLATIONPHYSICALACTIVITIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPHYSICALACTIVITIES'
        },
        params: {
            'translationPhysicalActivitiesIsFiltersVisible': null,
            'translationPhysicalActivitiesPage': null,
            'translationPhysicalActivitiesCount': null,
            'translationPhysicalActivitiesSorting': null,
            'translationPhysicalActivitiesFilter': null
        },
        resolve: loadSequence('TranslationPhysicalActivitiesCtrl', 'translationPhysicalActivityService', 'physicalActivityService', 'userService')
    }).state('app.translation.translationphysicalactivitiesnew', {
        url: '/translation-physical-activities/new',
        templateUrl: '/bundles/livnyou/js/components/TranslationPhysicalActivity/translation_physical_activity_form.html',
        title: 'content.list.NEWTRANSLATIONPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPHYSICALACTIVITY'
        },
        params: {
            'translation_physical_activity_physical_activity': null
        },
        resolve: loadSequence('TranslationPhysicalActivityFormCtrl', 'translationPhysicalActivityService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationphysicalactivitiesedit', {
        url: '/translation-physical-activities/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationPhysicalActivity/translation_physical_activity_form.html',
        title: 'content.list.EDITTRANSLATIONPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPHYSICALACTIVITY'
        },
        resolve: loadSequence('TranslationPhysicalActivityFormCtrl', 'translationPhysicalActivityService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationphysicalactivitiesdetails', {
        url: '/translation-physical-activities/details/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationPhysicalActivity/translation_physical_activity.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPHYSICALACTIVITYDETAILS'
        },
        resolve: loadSequence('TranslationPhysicalActivityCtrl', 'translationPhysicalActivityService')
    }).state('app.translation.translationcountries', {
        url: '/translation-countries',
        templateUrl: '/bundles/livnyou/js/components/TranslationCountry/translation_countries.html',
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
        templateUrl: '/bundles/livnyou/js/components/TranslationCountry/translation_country_form.html',
        title: 'content.list.NEWTRANSLATIONCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONCOUNTRY'
        },
        params: {
            'translation_country_country': null
        },
        resolve: loadSequence('TranslationCountryFormCtrl', 'translationCountryService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationcountriesedit', {
        url: '/translation-countries/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationCountry/translation_country_form.html',
        title: 'content.list.EDITTRANSLATIONCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONCOUNTRY'
        },
        resolve: loadSequence('TranslationCountryFormCtrl', 'translationCountryService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationcountriesdetails', {
        url: '/translation-countries/details/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationCountry/translation_country.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCOUNTRYDETAILS'
        },
        resolve: loadSequence('TranslationCountryCtrl', 'translationCountryService')
    }).state('app.translation.translationpathologies', {
        url: '/translation-pathologies',
        templateUrl: '/bundles/livnyou/js/components/TranslationPathology/translation_pathologies.html',
        title: 'content.list.TRANSLATIONPATHOLOGIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPATHOLOGIES'
        },
        params: {
            'translationPathologiesIsFiltersVisible': null,
            'translationPathologiesPage': null,
            'translationPathologiesCount': null,
            'translationPathologiesSorting': null,
            'translationPathologiesFilter': null
        },
        resolve: loadSequence('TranslationPathologiesCtrl', 'translationPathologyService', 'pathologyService', 'userService')
    }).state('app.translation.translationpathologiesnew', {
        url: '/translation-pathologies/new',
        templateUrl: '/bundles/livnyou/js/components/TranslationPathology/translation_pathology_form.html',
        title: 'content.list.NEWTRANSLATIONPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPATHOLOGY'
        },
        params: {
            'translation_pathology_pathology': null
        },
        resolve: loadSequence('TranslationPathologyFormCtrl', 'translationPathologyService', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationpathologiesedit', {
        url: '/translation-pathologies/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationPathology/translation_pathology_form.html',
        title: 'content.list.EDITTRANSLATIONPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPATHOLOGY'
        },
        resolve: loadSequence('TranslationPathologyFormCtrl', 'translationPathologyService', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationpathologiesdetails', {
        url: '/translation-pathologies/details/:id',
        templateUrl: '/bundles/livnyou/js/components/TranslationPathology/translation_pathology.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPATHOLOGYDETAILS'
        },
        resolve: loadSequence('TranslationPathologyCtrl', 'translationPathologyService')
    }).state('app.measurementmanager', {
        url: '/measurement-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.measurementmanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.measurementmanager.MAIN'
        }
    }).state('app.measurementmanager.measurements', {
        url: '/measurements',
        templateUrl: '/bundles/livnyou/js/components/Measurement/measurements.html',
        title: 'content.list.MEASUREMENTS',
        ncyBreadcrumb: {
            label: 'content.list.MEASUREMENTS'
        },
        params: {
            'measurementsIsFiltersVisible': null,
            'measurementsPage': null,
            'measurementsCount': null,
            'measurementsSorting': null,
            'measurementsFilter': null
        },
        resolve: loadSequence('MeasurementsCtrl', 'measurementService', 'countryService', 'physicalActivityService', 'userService')
    }).state('app.measurementmanager.measurementsnew', {
        url: '/measurements/new',
        templateUrl: '/bundles/livnyou/js/components/Measurement/measurement_form.html',
        title: 'content.list.NEWMEASUREMENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWMEASUREMENT'
        },
        params: {
            'measurement_country': null,
            'measurement_physical_activity': null
        },
        resolve: loadSequence('MeasurementFormCtrl', 'measurementService', 'countryService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.measurementmanager.measurementsedit', {
        url: '/measurements/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Measurement/measurement_form.html',
        title: 'content.list.EDITMEASUREMENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITMEASUREMENT'
        },
        resolve: loadSequence('MeasurementFormCtrl', 'measurementService', 'countryService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.measurementmanager.measurementsdetails', {
        url: '/measurements/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Measurement/measurement_custom.html',
        ncyBreadcrumb: {
            label: 'content.list.MEASUREMENTDETAILS'
        },
        resolve: loadSequence('MeasurementCtrl', 'measurementService')
    }).state('app.templatemanager', {
        url: '/template-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.templatemanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.templatemanager.MAIN'
        }
    }).state('app.templatemanager.templates', {
        url: '/templates',
        templateUrl: '/bundles/livnyou/js/components/Template/templates.html',
        title: 'content.list.TEMPLATES',
        ncyBreadcrumb: {
            label: 'content.list.TEMPLATES'
        },
        params: {
            'templatesIsFiltersVisible': null,
            'templatesPage': null,
            'templatesCount': null,
            'templatesSorting': null,
            'templatesFilter': null
        },
        resolve: loadSequence('TemplatesCtrl', 'templateService', 'userService')
    }).state('app.templatemanager.templatesnew', {
        url: '/templates/new',
        templateUrl: '/bundles/livnyou/js/components/Template/template_form.html',
        title: 'content.list.NEWTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTEMPLATE'
        },
        params: {
        },
        resolve: loadSequence('TemplateFormCtrl', 'templateService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.templatesedit', {
        url: '/templates/edit/:id',
        templateUrl: '/bundles/livnyou/js/components/Template/template_form.html',
        title: 'content.list.EDITTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTEMPLATE'
        },
        resolve: loadSequence('TemplateFormCtrl', 'templateService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.templatesdetails', {
        url: '/templates/details/:id',
        templateUrl: '/bundles/livnyou/js/components/Template/template.html',
        ncyBreadcrumb: {
            label: 'content.list.TEMPLATEDETAILS'
        },
        resolve: loadSequence('TemplateCtrl', 'templateService')
    }).state('app.templatemanager.templatesassign',{
        url: '/assign',
        templateUrl: '/bundles/livnyou/js/components/Template/assign.html',
        title: 'content.list.ASSIGN',
        ncyBreadcrumb: {
            label:'content.list.ASSIGN'
        },
        resolve: loadSequence('TemplateAssignCtrl', 'TemplateServiceCtrl', 'patientGroupService', 'templateService')
    })
;

}]);
