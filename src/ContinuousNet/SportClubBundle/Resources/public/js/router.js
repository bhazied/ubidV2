
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
        templateUrl: '/bundles/sportclub/js/components/Auth/login.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/register.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/reset_password.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/email_confirm.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/reset.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/lock_screen.html',
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
        templateUrl: '/bundles/sportclub/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/sportclub/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/sportclub/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('DashboardCtrl', 'DashboardService')
    }).state('app.webradio', {
        url: '/web-radio',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.webradio.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.webradio.MAIN'
        }
    }).state('app.webradio.audios', {
        url: '/audios',
        templateUrl: '/bundles/sportclub/js/components/Audio/audios.html',
        title: 'content.list.AUDIOS',
        ncyBreadcrumb: {
            label: 'content.list.AUDIOS'
        },
        params: {
            'audiosIsFiltersVisible': null,
            'audiosPage': null,
            'audiosCount': null,
            'audiosSorting': null,
            'audiosFilter': null
        },
        resolve: loadSequence('AudiosCtrl', 'audioService', 'audioTypeService', 'priceService', 'sharingService', 'albumService', 'userService', 'audioCategoryService')
    }).state('app.webradio.audiosnew', {
        url: '/audios/new',
        templateUrl: '/bundles/sportclub/js/components/Audio/audio_form.html',
        title: 'content.list.NEWAUDIO',
        ncyBreadcrumb: {
            label: 'content.list.NEWAUDIO'
        },
        params: {
            'audio_audio_type': null,
            'audio_price': null,
            'audio_sharing': null,
            'audio_album': null
        },
        resolve: loadSequence('AudioFormCtrl', 'audioService', 'audioTypeService', 'priceService', 'sharingService', 'albumService', 'userService', 'audioCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiosedit', {
        url: '/audios/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Audio/audio_form.html',
        title: 'content.list.EDITAUDIO',
        ncyBreadcrumb: {
            label: 'content.list.EDITAUDIO'
        },
        resolve: loadSequence('AudioFormCtrl', 'audioService', 'audioTypeService', 'priceService', 'sharingService', 'albumService', 'userService', 'audioCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiosdetails', {
        url: '/audios/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Audio/audio.html',
        ncyBreadcrumb: {
            label: 'content.list.AUDIODETAILS'
        },
        resolve: loadSequence('AudioCtrl', 'audioService')
    }).state('app.webradio.audiosconvert', {
        url: '/audios/convert/:id',
        templateUrl: '/bundles/sportclub/js/components/Audio/audio_converter.html',
        ncyBreadcrumb: {
            label: 'content.list.CONVERTAUDIO'
        },
        resolve: loadSequence('AudioConverterCtrl', 'AudioConverterService', 'audioService')
    }).state('app.webradio.audiocategories', {
        url: '/audio-categories',
        templateUrl: '/bundles/sportclub/js/components/AudioCategory/audio_categories.html',
        title: 'content.list.AUDIOCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.AUDIOCATEGORIES'
        },
        params: {
            'audioCategoriesIsFiltersVisible': null,
            'audioCategoriesPage': null,
            'audioCategoriesCount': null,
            'audioCategoriesSorting': null,
            'audioCategoriesFilter': null
        },
        resolve: loadSequence('AudioCategoriesCtrl', 'audioCategoryService', 'audioTypeService', 'userService')
    }).state('app.webradio.audiocategoriesnew', {
        url: '/audio-categories/new',
        templateUrl: '/bundles/sportclub/js/components/AudioCategory/audio_category_form.html',
        title: 'content.list.NEWAUDIOCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWAUDIOCATEGORY'
        },
        params: {
            'audio_category_parent': null,
            'audio_category_audio_type': null
        },
        resolve: loadSequence('AudioCategoryFormCtrl', 'audioCategoryService', 'audioTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiocategoriesedit', {
        url: '/audio-categories/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/AudioCategory/audio_category_form.html',
        title: 'content.list.EDITAUDIOCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITAUDIOCATEGORY'
        },
        resolve: loadSequence('AudioCategoryFormCtrl', 'audioCategoryService', 'audioTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiocategoriesdetails', {
        url: '/audio-categories/details/:id',
        templateUrl: '/bundles/sportclub/js/components/AudioCategory/audio_category.html',
        ncyBreadcrumb: {
            label: 'content.list.AUDIOCATEGORYDETAILS'
        },
        resolve: loadSequence('AudioCategoryCtrl', 'audioCategoryService')
    }).state('app.webradio.audiotypes', {
        url: '/audio-types',
        templateUrl: '/bundles/sportclub/js/components/AudioType/audio_types.html',
        title: 'content.list.AUDIOTYPES',
        ncyBreadcrumb: {
            label: 'content.list.AUDIOTYPES'
        },
        params: {
            'audioTypesIsFiltersVisible': null,
            'audioTypesPage': null,
            'audioTypesCount': null,
            'audioTypesSorting': null,
            'audioTypesFilter': null
        },
        resolve: loadSequence('AudioTypesCtrl', 'audioTypeService', 'userService')
    }).state('app.webradio.audiotypesnew', {
        url: '/audio-types/new',
        templateUrl: '/bundles/sportclub/js/components/AudioType/audio_type_form.html',
        title: 'content.list.NEWAUDIOTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWAUDIOTYPE'
        },
        params: {
        },
        resolve: loadSequence('AudioTypeFormCtrl', 'audioTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiotypesedit', {
        url: '/audio-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/AudioType/audio_type_form.html',
        title: 'content.list.EDITAUDIOTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITAUDIOTYPE'
        },
        resolve: loadSequence('AudioTypeFormCtrl', 'audioTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.audiotypesdetails', {
        url: '/audio-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/AudioType/audio_type.html',
        ncyBreadcrumb: {
            label: 'content.list.AUDIOTYPEDETAILS'
        },
        resolve: loadSequence('AudioTypeCtrl', 'audioTypeService')
    }).state('app.webradio.albums', {
        url: '/albums',
        templateUrl: '/bundles/sportclub/js/components/Album/albums.html',
        title: 'content.list.ALBUMS',
        ncyBreadcrumb: {
            label: 'content.list.ALBUMS'
        },
        params: {
            'albumsIsFiltersVisible': null,
            'albumsPage': null,
            'albumsCount': null,
            'albumsSorting': null,
            'albumsFilter': null
        },
        resolve: loadSequence('AlbumsCtrl', 'albumService', 'userService')
    }).state('app.webradio.albumsnew', {
        url: '/albums/new',
        templateUrl: '/bundles/sportclub/js/components/Album/album_form.html',
        title: 'content.list.NEWALBUM',
        ncyBreadcrumb: {
            label: 'content.list.NEWALBUM'
        },
        params: {
        },
        resolve: loadSequence('AlbumFormCtrl', 'albumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.albumsedit', {
        url: '/albums/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Album/album_form.html',
        title: 'content.list.EDITALBUM',
        ncyBreadcrumb: {
            label: 'content.list.EDITALBUM'
        },
        resolve: loadSequence('AlbumFormCtrl', 'albumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webradio.albumsdetails', {
        url: '/albums/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Album/album.html',
        ncyBreadcrumb: {
            label: 'content.list.ALBUMDETAILS'
        },
        resolve: loadSequence('AlbumCtrl', 'albumService')
    }).state('app.adserving', {
        url: '/adserving',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.adserving.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.adserving.MAIN'
        }
    }).state('app.adserving.banners', {
        url: '/banners',
        templateUrl: '/bundles/sportclub/js/components/Banner/banners.html',
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
        templateUrl: '/bundles/sportclub/js/components/Banner/banner_form.html',
        title: 'content.list.NEWBANNER',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNER'
        },
        params: {
            'banner_banner_type': null
        },
        resolve: loadSequence('BannerFormCtrl', 'bannerService', 'bannerTypeService', 'userService', 'bannerPositionService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannersedit', {
        url: '/banners/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Banner/banner_form.html',
        title: 'content.list.EDITBANNER',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNER'
        },
        resolve: loadSequence('BannerFormCtrl', 'bannerService', 'bannerTypeService', 'userService', 'bannerPositionService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannersdetails', {
        url: '/banners/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Banner/banner.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERDETAILS'
        },
        resolve: loadSequence('BannerCtrl', 'bannerService')
    }).state('app.adserving.bannertypes', {
        url: '/banner-types',
        templateUrl: '/bundles/sportclub/js/components/BannerType/banner_types.html',
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
        templateUrl: '/bundles/sportclub/js/components/BannerType/banner_type_form.html',
        title: 'content.list.NEWBANNERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNERTYPE'
        },
        params: {
        },
        resolve: loadSequence('BannerTypeFormCtrl', 'bannerTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannertypesedit', {
        url: '/banner-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/BannerType/banner_type_form.html',
        title: 'content.list.EDITBANNERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNERTYPE'
        },
        resolve: loadSequence('BannerTypeFormCtrl', 'bannerTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannertypesdetails', {
        url: '/banner-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/BannerType/banner_type.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERTYPEDETAILS'
        },
        resolve: loadSequence('BannerTypeCtrl', 'bannerTypeService')
    }).state('app.adserving.bannerpositions', {
        url: '/banner-positions',
        templateUrl: '/bundles/sportclub/js/components/BannerPosition/banner_positions.html',
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
        templateUrl: '/bundles/sportclub/js/components/BannerPosition/banner_position_form.html',
        title: 'content.list.NEWBANNERPOSITION',
        ncyBreadcrumb: {
            label: 'content.list.NEWBANNERPOSITION'
        },
        params: {
        },
        resolve: loadSequence('BannerPositionFormCtrl', 'bannerPositionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannerpositionsedit', {
        url: '/banner-positions/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/BannerPosition/banner_position_form.html',
        title: 'content.list.EDITBANNERPOSITION',
        ncyBreadcrumb: {
            label: 'content.list.EDITBANNERPOSITION'
        },
        resolve: loadSequence('BannerPositionFormCtrl', 'bannerPositionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.bannerpositionsdetails', {
        url: '/banner-positions/details/:id',
        templateUrl: '/bundles/sportclub/js/components/BannerPosition/banner_position.html',
        ncyBreadcrumb: {
            label: 'content.list.BANNERPOSITIONDETAILS'
        },
        resolve: loadSequence('BannerPositionCtrl', 'bannerPositionService')
    }).state('app.adserving.clicks', {
        url: '/clicks',
        templateUrl: '/bundles/sportclub/js/components/Click/clicks.html',
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
        templateUrl: '/bundles/sportclub/js/components/Click/click_form.html',
        title: 'content.list.NEWCLICK',
        ncyBreadcrumb: {
            label: 'content.list.NEWCLICK'
        },
        params: {
            'click_visit': null,
            'click_banner': null
        },
        resolve: loadSequence('ClickFormCtrl', 'clickService', 'visitService', 'bannerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.clicksedit', {
        url: '/clicks/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Click/click_form.html',
        title: 'content.list.EDITCLICK',
        ncyBreadcrumb: {
            label: 'content.list.EDITCLICK'
        },
        resolve: loadSequence('ClickFormCtrl', 'clickService', 'visitService', 'bannerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.clicksdetails', {
        url: '/clicks/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Click/click.html',
        ncyBreadcrumb: {
            label: 'content.list.CLICKDETAILS'
        },
        resolve: loadSequence('ClickCtrl', 'clickService')
    }).state('app.adserving.impressions', {
        url: '/impressions',
        templateUrl: '/bundles/sportclub/js/components/Impression/impressions.html',
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
        templateUrl: '/bundles/sportclub/js/components/Impression/impression_form.html',
        title: 'content.list.NEWIMPRESSION',
        ncyBreadcrumb: {
            label: 'content.list.NEWIMPRESSION'
        },
        params: {
            'impression_visit': null,
            'impression_banner': null
        },
        resolve: loadSequence('ImpressionFormCtrl', 'impressionService', 'visitService', 'bannerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.impressionsedit', {
        url: '/impressions/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Impression/impression_form.html',
        title: 'content.list.EDITIMPRESSION',
        ncyBreadcrumb: {
            label: 'content.list.EDITIMPRESSION'
        },
        resolve: loadSequence('ImpressionFormCtrl', 'impressionService', 'visitService', 'bannerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.adserving.impressionsdetails', {
        url: '/impressions/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Impression/impression.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPRESSIONDETAILS'
        },
        resolve: loadSequence('ImpressionCtrl', 'impressionService')
    }).state('app.settings', {
        url: '/settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.settings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.settings.MAIN'
        }
    }).state('app.settings.languages', {
        url: '/languages',
        templateUrl: '/bundles/sportclub/js/components/Language/languages.html',
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
        templateUrl: '/bundles/sportclub/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        params: {
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.settings.countries', {
        url: '/countries',
        templateUrl: '/bundles/sportclub/js/components/Country/countries.html',
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
    }).state('app.settings.countriesnew', {
        url: '/countries/new',
        templateUrl: '/bundles/sportclub/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        params: {
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.settings.cities', {
        url: '/cities',
        templateUrl: '/bundles/sportclub/js/components/City/cities.html',
        title: 'content.list.CITIES',
        ncyBreadcrumb: {
            label: 'content.list.CITIES'
        },
        params: {
            'citiesIsFiltersVisible': null,
            'citiesPage': null,
            'citiesCount': null,
            'citiesSorting': null,
            'citiesFilter': null
        },
        resolve: loadSequence('CitiesCtrl', 'cityService', 'countryService', 'userService')
    }).state('app.settings.citiesnew', {
        url: '/cities/new',
        templateUrl: '/bundles/sportclub/js/components/City/city_form.html',
        title: 'content.list.NEWCITY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCITY'
        },
        params: {
            'city_country': null
        },
        resolve: loadSequence('CityFormCtrl', 'cityService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.citiesedit', {
        url: '/cities/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/City/city_form.html',
        title: 'content.list.EDITCITY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCITY'
        },
        resolve: loadSequence('CityFormCtrl', 'cityService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.citiesdetails', {
        url: '/cities/details/:id',
        templateUrl: '/bundles/sportclub/js/components/City/city.html',
        ncyBreadcrumb: {
            label: 'content.list.CITYDETAILS'
        },
        resolve: loadSequence('CityCtrl', 'cityService')
    }).state('app.settings.menus', {
        url: '/menus',
        templateUrl: '/bundles/sportclub/js/components/Menu/menus.html',
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
        templateUrl: '/bundles/sportclub/js/components/Menu/menu_form.html',
        title: 'content.list.NEWMENU',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENU'
        },
        params: {
        },
        resolve: loadSequence('MenuFormCtrl', 'menuService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.menusedit', {
        url: '/menus/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Menu/menu_form.html',
        title: 'content.list.EDITMENU',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENU'
        },
        resolve: loadSequence('MenuFormCtrl', 'menuService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.menusdetails', {
        url: '/menus/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Menu/menu.html',
        ncyBreadcrumb: {
            label: 'content.list.MENUDETAILS'
        },
        resolve: loadSequence('MenuCtrl', 'menuService')
    }).state('app.settings.menulinks', {
        url: '/menu-links',
        templateUrl: '/bundles/sportclub/js/components/MenuLink/menu_links.html',
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
        templateUrl: '/bundles/sportclub/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.NEWMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENULINK'
        },
        params: {
            'menu_link_menu': null
        },
        resolve: loadSequence('MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.menulinksedit', {
        url: '/menu-links/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.EDITMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENULINK'
        },
        resolve: loadSequence('MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.settings.menulinksdetails', {
        url: '/menu-links/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MenuLink/menu_link.html',
        ncyBreadcrumb: {
            label: 'content.list.MENULINKDETAILS'
        },
        resolve: loadSequence('MenuLinkCtrl', 'menuLinkService')
    }).state('app.activities', {
        url: '/activities',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.activities.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.activities.MAIN'
        }
    }).state('app.activities.comments', {
        url: '/comments',
        templateUrl: '/bundles/sportclub/js/components/Comment/comments.html',
        title: 'content.list.COMMENTS',
        ncyBreadcrumb: {
            label: 'content.list.COMMENTS'
        },
        params: {
            'commentsIsFiltersVisible': null,
            'commentsPage': null,
            'commentsCount': null,
            'commentsSorting': null,
            'commentsFilter': null
        },
        resolve: loadSequence('CommentsCtrl', 'commentService', 'cityService', 'userService')
    }).state('app.activities.commentsnew', {
        url: '/comments/new',
        templateUrl: '/bundles/sportclub/js/components/Comment/comment_form.html',
        title: 'content.list.NEWCOMMENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOMMENT'
        },
        params: {
            'comment_city': null
        },
        resolve: loadSequence('CommentFormCtrl', 'commentService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.commentsedit', {
        url: '/comments/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Comment/comment_form.html',
        title: 'content.list.EDITCOMMENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOMMENT'
        },
        resolve: loadSequence('CommentFormCtrl', 'commentService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.commentsdetails', {
        url: '/comments/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Comment/comment.html',
        ncyBreadcrumb: {
            label: 'content.list.COMMENTDETAILS'
        },
        resolve: loadSequence('CommentCtrl', 'commentService')
    }).state('app.activities.likes', {
        url: '/likes',
        templateUrl: '/bundles/sportclub/js/components/Like/likes.html',
        title: 'content.list.LIKES',
        ncyBreadcrumb: {
            label: 'content.list.LIKES'
        },
        params: {
            'likesIsFiltersVisible': null,
            'likesPage': null,
            'likesCount': null,
            'likesSorting': null,
            'likesFilter': null
        },
        resolve: loadSequence('LikesCtrl', 'likeService', 'userService')
    }).state('app.activities.likesnew', {
        url: '/likes/new',
        templateUrl: '/bundles/sportclub/js/components/Like/like_form.html',
        title: 'content.list.NEWLIKE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLIKE'
        },
        params: {
        },
        resolve: loadSequence('LikeFormCtrl', 'likeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.likesedit', {
        url: '/likes/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Like/like_form.html',
        title: 'content.list.EDITLIKE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLIKE'
        },
        resolve: loadSequence('LikeFormCtrl', 'likeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.likesdetails', {
        url: '/likes/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Like/like.html',
        ncyBreadcrumb: {
            label: 'content.list.LIKEDETAILS'
        },
        resolve: loadSequence('LikeCtrl', 'likeService')
    }).state('app.activities.ratings', {
        url: '/ratings',
        templateUrl: '/bundles/sportclub/js/components/Rating/ratings.html',
        title: 'content.list.RATINGS',
        ncyBreadcrumb: {
            label: 'content.list.RATINGS'
        },
        params: {
            'ratingsIsFiltersVisible': null,
            'ratingsPage': null,
            'ratingsCount': null,
            'ratingsSorting': null,
            'ratingsFilter': null
        },
        resolve: loadSequence('RatingsCtrl', 'ratingService', 'userService')
    }).state('app.activities.ratingsnew', {
        url: '/ratings/new',
        templateUrl: '/bundles/sportclub/js/components/Rating/rating_form.html',
        title: 'content.list.NEWRATING',
        ncyBreadcrumb: {
            label: 'content.list.NEWRATING'
        },
        params: {
        },
        resolve: loadSequence('RatingFormCtrl', 'ratingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.ratingsedit', {
        url: '/ratings/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Rating/rating_form.html',
        title: 'content.list.EDITRATING',
        ncyBreadcrumb: {
            label: 'content.list.EDITRATING'
        },
        resolve: loadSequence('RatingFormCtrl', 'ratingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.activities.ratingsdetails', {
        url: '/ratings/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Rating/rating.html',
        ncyBreadcrumb: {
            label: 'content.list.RATINGDETAILS'
        },
        resolve: loadSequence('RatingCtrl', 'ratingService')
    }).state('app.access', {
        url: '/access',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.access.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.access.MAIN'
        }
    }).state('app.access.notifications', {
        url: '/notifications',
        templateUrl: '/bundles/sportclub/js/components/Notification/notifications.html',
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
        templateUrl: '/bundles/sportclub/js/components/Notification/notification_form.html',
        title: 'content.list.NEWNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWNOTIFICATION'
        },
        params: {
        },
        resolve: loadSequence('NotificationFormCtrl', 'notificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.notificationsedit', {
        url: '/notifications/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Notification/notification_form.html',
        title: 'content.list.EDITNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITNOTIFICATION'
        },
        resolve: loadSequence('NotificationFormCtrl', 'notificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.notificationsdetails', {
        url: '/notifications/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Notification/notification.html',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONDETAILS'
        },
        resolve: loadSequence('NotificationCtrl', 'notificationService')
    }).state('app.access.users', {
        url: '/users',
        templateUrl: '/bundles/sportclub/js/components/User/users.html',
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
        resolve: loadSequence('UsersCtrl', 'userService', 'companyService', 'countryService', 'cityService', 'languageService', 'groupService')
    }).state('app.access.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/sportclub/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        params: {
            'user_company': null,
            'user_country': null,
            'user_city': null,
            'user_language': null
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'companyService', 'countryService', 'cityService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'companyService', 'countryService', 'cityService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/sportclub/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.access.groups', {
        url: '/groups',
        templateUrl: '/bundles/sportclub/js/components/Group/groups.html',
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
        templateUrl: '/bundles/sportclub/js/components/Group/group_form.html',
        title: 'content.list.NEWGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWGROUP'
        },
        params: {
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.groupsedit', {
        url: '/groups/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Group/group_form.html',
        title: 'content.list.EDITGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITGROUP'
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.groupsdetails', {
        url: '/groups/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Group/group.html',
        ncyBreadcrumb: {
            label: 'content.list.GROUPDETAILS'
        },
        resolve: loadSequence('GroupCtrl', 'groupService')
    }).state('app.access.logs', {
        url: '/logs',
        templateUrl: '/bundles/sportclub/js/components/Log/logs.html',
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
        templateUrl: '/bundles/sportclub/js/components/Log/log_form.html',
        title: 'content.list.NEWLOG',
        ncyBreadcrumb: {
            label: 'content.list.NEWLOG'
        },
        params: {
        },
        resolve: loadSequence('LogFormCtrl', 'logService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.logsedit', {
        url: '/logs/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Log/log_form.html',
        title: 'content.list.EDITLOG',
        ncyBreadcrumb: {
            label: 'content.list.EDITLOG'
        },
        resolve: loadSequence('LogFormCtrl', 'logService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.logsdetails', {
        url: '/logs/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Log/log.html',
        ncyBreadcrumb: {
            label: 'content.list.LOGDETAILS'
        },
        resolve: loadSequence('LogCtrl', 'logService')
    }).state('app.access.usersettings', {
        url: '/user-settings',
        templateUrl: '/bundles/sportclub/js/components/UserSetting/user_settings.html',
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
        templateUrl: '/bundles/sportclub/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.NEWUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSERSETTING'
        },
        params: {
        },
        resolve: loadSequence('UserSettingFormCtrl', 'userSettingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.usersettingsedit', {
        url: '/user-settings/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.EDITUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSERSETTING'
        },
        resolve: loadSequence('UserSettingFormCtrl', 'userSettingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.usersettingsdetails', {
        url: '/user-settings/details/:id',
        templateUrl: '/bundles/sportclub/js/components/UserSetting/user_setting.html',
        ncyBreadcrumb: {
            label: 'content.list.USERSETTINGDETAILS'
        },
        resolve: loadSequence('UserSettingCtrl', 'userSettingService')
    }).state('app.access.companies', {
        url: '/companies',
        templateUrl: '/bundles/sportclub/js/components/Company/companies.html',
        title: 'content.list.COMPANIES',
        ncyBreadcrumb: {
            label: 'content.list.COMPANIES'
        },
        params: {
            'companiesIsFiltersVisible': null,
            'companiesPage': null,
            'companiesCount': null,
            'companiesSorting': null,
            'companiesFilter': null
        },
        resolve: loadSequence('CompaniesCtrl', 'companyService', 'userService')
    }).state('app.access.companiesnew', {
        url: '/companies/new',
        templateUrl: '/bundles/sportclub/js/components/Company/company_form.html',
        title: 'content.list.NEWCOMPANY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOMPANY'
        },
        params: {
        },
        resolve: loadSequence('CompanyFormCtrl', 'companyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.companiesedit', {
        url: '/companies/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Company/company_form.html',
        title: 'content.list.EDITCOMPANY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOMPANY'
        },
        resolve: loadSequence('CompanyFormCtrl', 'companyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.access.companiesdetails', {
        url: '/companies/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Company/company.html',
        ncyBreadcrumb: {
            label: 'content.list.COMPANYDETAILS'
        },
        resolve: loadSequence('CompanyCtrl', 'companyService')
    }).state('app.events', {
        url: '/events',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.events.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.events.MAIN'
        }
    }).state('app.events.sports', {
        url: '/sports',
        templateUrl: '/bundles/sportclub/js/components/Sport/sports.html',
        title: 'content.list.SPORTS',
        ncyBreadcrumb: {
            label: 'content.list.SPORTS'
        },
        params: {
            'sportsIsFiltersVisible': null,
            'sportsPage': null,
            'sportsCount': null,
            'sportsSorting': null,
            'sportsFilter': null
        },
        resolve: loadSequence('SportsCtrl', 'sportService', 'userService')
    }).state('app.events.sportsnew', {
        url: '/sports/new',
        templateUrl: '/bundles/sportclub/js/components/Sport/sport_form.html',
        title: 'content.list.NEWSPORT',
        ncyBreadcrumb: {
            label: 'content.list.NEWSPORT'
        },
        params: {
        },
        resolve: loadSequence('SportFormCtrl', 'sportService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.sportsedit', {
        url: '/sports/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Sport/sport_form.html',
        title: 'content.list.EDITSPORT',
        ncyBreadcrumb: {
            label: 'content.list.EDITSPORT'
        },
        resolve: loadSequence('SportFormCtrl', 'sportService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.sportsdetails', {
        url: '/sports/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Sport/sport.html',
        ncyBreadcrumb: {
            label: 'content.list.SPORTDETAILS'
        },
        resolve: loadSequence('SportCtrl', 'sportService')
    }).state('app.events.sportevents', {
        url: '/sport-events',
        templateUrl: '/bundles/sportclub/js/components/SportEvent/sport_events.html',
        title: 'content.list.SPORTEVENTS',
        ncyBreadcrumb: {
            label: 'content.list.SPORTEVENTS'
        },
        params: {
            'sportEventsIsFiltersVisible': null,
            'sportEventsPage': null,
            'sportEventsCount': null,
            'sportEventsSorting': null,
            'sportEventsFilter': null
        },
        resolve: loadSequence('SportEventsCtrl', 'sportEventService', 'sportService', 'seasonService', 'postTypeService', 'postCategoryService', 'countryService', 'userService', 'teamService')
    }).state('app.events.sporteventsnew', {
        url: '/sport-events/new',
        templateUrl: '/bundles/sportclub/js/components/SportEvent/sport_event_form.html',
        title: 'content.list.NEWSPORTEVENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWSPORTEVENT'
        },
        params: {
            'sport_event_sport': null,
            'sport_event_season': null,
            'sport_event_post_type': null,
            'sport_event_post_category': null,
            'sport_event_country': null
        },
        resolve: loadSequence('SportEventFormCtrl', 'sportEventService', 'sportService', 'seasonService', 'postTypeService', 'postCategoryService', 'countryService', 'userService', 'teamService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.sporteventsedit', {
        url: '/sport-events/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/SportEvent/sport_event_form.html',
        title: 'content.list.EDITSPORTEVENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITSPORTEVENT'
        },
        resolve: loadSequence('SportEventFormCtrl', 'sportEventService', 'sportService', 'seasonService', 'postTypeService', 'postCategoryService', 'countryService', 'userService', 'teamService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.sporteventsdetails', {
        url: '/sport-events/details/:id',
        templateUrl: '/bundles/sportclub/js/components/SportEvent/sport_event.html',
        ncyBreadcrumb: {
            label: 'content.list.SPORTEVENTDETAILS'
        },
        resolve: loadSequence('SportEventCtrl', 'sportEventService')
    }).state('app.events.seasons', {
        url: '/seasons',
        templateUrl: '/bundles/sportclub/js/components/Season/seasons.html',
        title: 'content.list.SEASONS',
        ncyBreadcrumb: {
            label: 'content.list.SEASONS'
        },
        params: {
            'seasonsIsFiltersVisible': null,
            'seasonsPage': null,
            'seasonsCount': null,
            'seasonsSorting': null,
            'seasonsFilter': null
        },
        resolve: loadSequence('SeasonsCtrl', 'seasonService', 'userService')
    }).state('app.events.seasonsnew', {
        url: '/seasons/new',
        templateUrl: '/bundles/sportclub/js/components/Season/season_form.html',
        title: 'content.list.NEWSEASON',
        ncyBreadcrumb: {
            label: 'content.list.NEWSEASON'
        },
        params: {
        },
        resolve: loadSequence('SeasonFormCtrl', 'seasonService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.seasonsedit', {
        url: '/seasons/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Season/season_form.html',
        title: 'content.list.EDITSEASON',
        ncyBreadcrumb: {
            label: 'content.list.EDITSEASON'
        },
        resolve: loadSequence('SeasonFormCtrl', 'seasonService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.seasonsdetails', {
        url: '/seasons/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Season/season.html',
        ncyBreadcrumb: {
            label: 'content.list.SEASONDETAILS'
        },
        resolve: loadSequence('SeasonCtrl', 'seasonService')
    }).state('app.events.days', {
        url: '/days',
        templateUrl: '/bundles/sportclub/js/components/Day/days.html',
        title: 'content.list.DAYS',
        ncyBreadcrumb: {
            label: 'content.list.DAYS'
        },
        params: {
            'daysIsFiltersVisible': null,
            'daysPage': null,
            'daysCount': null,
            'daysSorting': null,
            'daysFilter': null
        },
        resolve: loadSequence('DaysCtrl', 'dayService', 'sportEventService', 'userService')
    }).state('app.events.daysnew', {
        url: '/days/new',
        templateUrl: '/bundles/sportclub/js/components/Day/day_form.html',
        title: 'content.list.NEWDAY',
        ncyBreadcrumb: {
            label: 'content.list.NEWDAY'
        },
        params: {
            'day_sport_event': null
        },
        resolve: loadSequence('DayFormCtrl', 'dayService', 'sportEventService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.daysedit', {
        url: '/days/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Day/day_form.html',
        title: 'content.list.EDITDAY',
        ncyBreadcrumb: {
            label: 'content.list.EDITDAY'
        },
        resolve: loadSequence('DayFormCtrl', 'dayService', 'sportEventService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.daysdetails', {
        url: '/days/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Day/day.html',
        ncyBreadcrumb: {
            label: 'content.list.DAYDETAILS'
        },
        resolve: loadSequence('DayCtrl', 'dayService')
    }).state('app.events.teams', {
        url: '/teams',
        templateUrl: '/bundles/sportclub/js/components/Team/teams.html',
        title: 'content.list.TEAMS',
        ncyBreadcrumb: {
            label: 'content.list.TEAMS'
        },
        params: {
            'teamsIsFiltersVisible': null,
            'teamsPage': null,
            'teamsCount': null,
            'teamsSorting': null,
            'teamsFilter': null
        },
        resolve: loadSequence('TeamsCtrl', 'teamService', 'countryService', 'stadiumService', 'userService')
    }).state('app.events.teamsnew', {
        url: '/teams/new',
        templateUrl: '/bundles/sportclub/js/components/Team/team_form.html',
        title: 'content.list.NEWTEAM',
        ncyBreadcrumb: {
            label: 'content.list.NEWTEAM'
        },
        params: {
            'team_country': null,
            'team_stadium': null
        },
        resolve: loadSequence('TeamFormCtrl', 'teamService', 'countryService', 'stadiumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.teamsedit', {
        url: '/teams/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Team/team_form.html',
        title: 'content.list.EDITTEAM',
        ncyBreadcrumb: {
            label: 'content.list.EDITTEAM'
        },
        resolve: loadSequence('TeamFormCtrl', 'teamService', 'countryService', 'stadiumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.teamsdetails', {
        url: '/teams/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Team/team.html',
        ncyBreadcrumb: {
            label: 'content.list.TEAMDETAILS'
        },
        resolve: loadSequence('TeamCtrl', 'teamService')
    }).state('app.events.playerstats', {
        url: '/player-stats',
        templateUrl: '/bundles/sportclub/js/components/PlayerStat/player_stats.html',
        title: 'content.list.PLAYERSTATS',
        ncyBreadcrumb: {
            label: 'content.list.PLAYERSTATS'
        },
        params: {
            'playerStatsIsFiltersVisible': null,
            'playerStatsPage': null,
            'playerStatsCount': null,
            'playerStatsSorting': null,
            'playerStatsFilter': null
        },
        resolve: loadSequence('PlayerStatsCtrl', 'playerStatService', 'playerService', 'seasonService', 'userService')
    }).state('app.events.playerstatsnew', {
        url: '/player-stats/new',
        templateUrl: '/bundles/sportclub/js/components/PlayerStat/player_stat_form.html',
        title: 'content.list.NEWPLAYERSTAT',
        ncyBreadcrumb: {
            label: 'content.list.NEWPLAYERSTAT'
        },
        params: {
            'player_stat_player': null,
            'player_stat_season': null
        },
        resolve: loadSequence('PlayerStatFormCtrl', 'playerStatService', 'playerService', 'seasonService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.playerstatsedit', {
        url: '/player-stats/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PlayerStat/player_stat_form.html',
        title: 'content.list.EDITPLAYERSTAT',
        ncyBreadcrumb: {
            label: 'content.list.EDITPLAYERSTAT'
        },
        resolve: loadSequence('PlayerStatFormCtrl', 'playerStatService', 'playerService', 'seasonService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.playerstatsdetails', {
        url: '/player-stats/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PlayerStat/player_stat.html',
        ncyBreadcrumb: {
            label: 'content.list.PLAYERSTATDETAILS'
        },
        resolve: loadSequence('PlayerStatCtrl', 'playerStatService')
    }).state('app.events.players', {
        url: '/players',
        templateUrl: '/bundles/sportclub/js/components/Player/players.html',
        title: 'content.list.PLAYERS',
        ncyBreadcrumb: {
            label: 'content.list.PLAYERS'
        },
        params: {
            'playersIsFiltersVisible': null,
            'playersPage': null,
            'playersCount': null,
            'playersSorting': null,
            'playersFilter': null
        },
        resolve: loadSequence('PlayersCtrl', 'playerService', 'countryService', 'teamService', 'userService')
    }).state('app.events.playersnew', {
        url: '/players/new',
        templateUrl: '/bundles/sportclub/js/components/Player/player_form.html',
        title: 'content.list.NEWPLAYER',
        ncyBreadcrumb: {
            label: 'content.list.NEWPLAYER'
        },
        params: {
            'player_birth_country': null,
            'player_nationality_country': null,
            'player_team_club': null,
            'player_team_national': null
        },
        resolve: loadSequence('PlayerFormCtrl', 'playerService', 'countryService', 'teamService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.playersedit', {
        url: '/players/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Player/player_form.html',
        title: 'content.list.EDITPLAYER',
        ncyBreadcrumb: {
            label: 'content.list.EDITPLAYER'
        },
        resolve: loadSequence('PlayerFormCtrl', 'playerService', 'countryService', 'teamService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.playersdetails', {
        url: '/players/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Player/player.html',
        ncyBreadcrumb: {
            label: 'content.list.PLAYERDETAILS'
        },
        resolve: loadSequence('PlayerCtrl', 'playerService')
    }).state('app.events.prizewinners', {
        url: '/prize-winners',
        templateUrl: '/bundles/sportclub/js/components/PrizeWinner/prize_winners.html',
        title: 'content.list.PRIZEWINNERS',
        ncyBreadcrumb: {
            label: 'content.list.PRIZEWINNERS'
        },
        params: {
            'prizeWinnersIsFiltersVisible': null,
            'prizeWinnersPage': null,
            'prizeWinnersCount': null,
            'prizeWinnersSorting': null,
            'prizeWinnersFilter': null
        },
        resolve: loadSequence('PrizeWinnersCtrl', 'prizeWinnerService', 'sportEventService', 'teamService', 'countryService', 'userService')
    }).state('app.events.prizewinnersnew', {
        url: '/prize-winners/new',
        templateUrl: '/bundles/sportclub/js/components/PrizeWinner/prize_winner_form.html',
        title: 'content.list.NEWPRIZEWINNER',
        ncyBreadcrumb: {
            label: 'content.list.NEWPRIZEWINNER'
        },
        params: {
            'prize_winner_sport_event': null,
            'prize_winner_team_home': null,
            'prize_winner_team_away': null,
            'prize_winner_country': null
        },
        resolve: loadSequence('PrizeWinnerFormCtrl', 'prizeWinnerService', 'sportEventService', 'teamService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.prizewinnersedit', {
        url: '/prize-winners/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PrizeWinner/prize_winner_form.html',
        title: 'content.list.EDITPRIZEWINNER',
        ncyBreadcrumb: {
            label: 'content.list.EDITPRIZEWINNER'
        },
        resolve: loadSequence('PrizeWinnerFormCtrl', 'prizeWinnerService', 'sportEventService', 'teamService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.prizewinnersdetails', {
        url: '/prize-winners/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PrizeWinner/prize_winner.html',
        ncyBreadcrumb: {
            label: 'content.list.PRIZEWINNERDETAILS'
        },
        resolve: loadSequence('PrizeWinnerCtrl', 'prizeWinnerService')
    }).state('app.events.scorers', {
        url: '/scorers',
        templateUrl: '/bundles/sportclub/js/components/Scorer/scorers.html',
        title: 'content.list.SCORERS',
        ncyBreadcrumb: {
            label: 'content.list.SCORERS'
        },
        params: {
            'scorersIsFiltersVisible': null,
            'scorersPage': null,
            'scorersCount': null,
            'scorersSorting': null,
            'scorersFilter': null
        },
        resolve: loadSequence('ScorersCtrl', 'scorerService', 'teamService', 'playerService', 'sportEventService', 'userService')
    }).state('app.events.scorersnew', {
        url: '/scorers/new',
        templateUrl: '/bundles/sportclub/js/components/Scorer/scorer_form.html',
        title: 'content.list.NEWSCORER',
        ncyBreadcrumb: {
            label: 'content.list.NEWSCORER'
        },
        params: {
            'scorer_team': null,
            'scorer_player': null,
            'scorer_sport_event': null
        },
        resolve: loadSequence('ScorerFormCtrl', 'scorerService', 'teamService', 'playerService', 'sportEventService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.scorersedit', {
        url: '/scorers/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Scorer/scorer_form.html',
        title: 'content.list.EDITSCORER',
        ncyBreadcrumb: {
            label: 'content.list.EDITSCORER'
        },
        resolve: loadSequence('ScorerFormCtrl', 'scorerService', 'teamService', 'playerService', 'sportEventService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.scorersdetails', {
        url: '/scorers/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Scorer/scorer.html',
        ncyBreadcrumb: {
            label: 'content.list.SCORERDETAILS'
        },
        resolve: loadSequence('ScorerCtrl', 'scorerService')
    }).state('app.events.stadia', {
        url: '/stadia',
        templateUrl: '/bundles/sportclub/js/components/Stadium/stadia.html',
        title: 'content.list.STADIA',
        ncyBreadcrumb: {
            label: 'content.list.STADIA'
        },
        params: {
            'stadiaIsFiltersVisible': null,
            'stadiaPage': null,
            'stadiaCount': null,
            'stadiaSorting': null,
            'stadiaFilter': null
        },
        resolve: loadSequence('StadiaCtrl', 'stadiumService', 'sportEventService', 'countryService', 'cityService', 'userService')
    }).state('app.events.stadianew', {
        url: '/stadia/new',
        templateUrl: '/bundles/sportclub/js/components/Stadium/stadium_form.html',
        title: 'content.list.NEWSTADIUM',
        ncyBreadcrumb: {
            label: 'content.list.NEWSTADIUM'
        },
        params: {
            'stadium_sport_event': null,
            'stadium_country': null,
            'stadium_city': null
        },
        resolve: loadSequence('StadiumFormCtrl', 'stadiumService', 'sportEventService', 'countryService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.stadiaedit', {
        url: '/stadia/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Stadium/stadium_form.html',
        title: 'content.list.EDITSTADIUM',
        ncyBreadcrumb: {
            label: 'content.list.EDITSTADIUM'
        },
        resolve: loadSequence('StadiumFormCtrl', 'stadiumService', 'sportEventService', 'countryService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.stadiadetails', {
        url: '/stadia/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Stadium/stadium.html',
        ncyBreadcrumb: {
            label: 'content.list.STADIUMDETAILS'
        },
        resolve: loadSequence('StadiumCtrl', 'stadiumService')
    }).state('app.events.stats', {
        url: '/stats',
        templateUrl: '/bundles/sportclub/js/components/Stat/stats.html',
        title: 'content.list.STATS',
        ncyBreadcrumb: {
            label: 'content.list.STATS'
        },
        params: {
            'statsIsFiltersVisible': null,
            'statsPage': null,
            'statsCount': null,
            'statsSorting': null,
            'statsFilter': null
        },
        resolve: loadSequence('StatsCtrl', 'statService', 'tableService', 'teamService', 'userService')
    }).state('app.events.statsnew', {
        url: '/stats/new',
        templateUrl: '/bundles/sportclub/js/components/Stat/stat_form.html',
        title: 'content.list.NEWSTAT',
        ncyBreadcrumb: {
            label: 'content.list.NEWSTAT'
        },
        params: {
            'stat_table': null,
            'stat_team': null
        },
        resolve: loadSequence('StatFormCtrl', 'statService', 'tableService', 'teamService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.statsedit', {
        url: '/stats/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Stat/stat_form.html',
        title: 'content.list.EDITSTAT',
        ncyBreadcrumb: {
            label: 'content.list.EDITSTAT'
        },
        resolve: loadSequence('StatFormCtrl', 'statService', 'tableService', 'teamService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.statsdetails', {
        url: '/stats/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Stat/stat.html',
        ncyBreadcrumb: {
            label: 'content.list.STATDETAILS'
        },
        resolve: loadSequence('StatCtrl', 'statService')
    }).state('app.events.statsimport', {
        url: '/stats/import',
        templateUrl: '/bundles/sportclub/js/components/Stat/stat_import.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPORTSTATS'
        },
        resolve: loadSequence('StatImportCtrl', 'StatImportService', 'statService', 'touchspin-plugin', 'tableService', 'teamService', 'userService', 'dayService')
    }).state('app.events.statsexport', {
        url: '/stats/export',
        templateUrl: '/bundles/sportclub/js/components/Stat/stat_export.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPORTSTATS'
        },
        resolve: loadSequence('StatExportCtrl', 'StatExportService', 'statService', 'tableService', 'teamService', 'userService', 'dayService')
    }).state('app.events.tables', {
        url: '/tables',
        templateUrl: '/bundles/sportclub/js/components/Table/tables.html',
        title: 'content.list.TABLES',
        ncyBreadcrumb: {
            label: 'content.list.TABLES'
        },
        params: {
            'tablesIsFiltersVisible': null,
            'tablesPage': null,
            'tablesCount': null,
            'tablesSorting': null,
            'tablesFilter': null
        },
        resolve: loadSequence('TablesCtrl', 'tableService', 'dayService', 'userService')
    }).state('app.events.tablesnew', {
        url: '/tables/new',
        templateUrl: '/bundles/sportclub/js/components/Table/table_form.html',
        title: 'content.list.NEWTABLE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTABLE'
        },
        params: {
            'table_day': null
        },
        resolve: loadSequence('TableFormCtrl', 'tableService', 'dayService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.tablesedit', {
        url: '/tables/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Table/table_form.html',
        title: 'content.list.EDITTABLE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTABLE'
        },
        resolve: loadSequence('TableFormCtrl', 'tableService', 'dayService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.events.tablesdetails', {
        url: '/tables/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Table/table.html',
        ncyBreadcrumb: {
            label: 'content.list.TABLEDETAILS'
        },
        resolve: loadSequence('TableCtrl', 'tableService')
    }).state('app.events.tablesstats', {
        url: '/tables/stats/:id',
        templateUrl: '/bundles/sportclub/js/components/Table/table_stats.html',
        ncyBreadcrumb: {
            label: 'content.list.TABLESTATS'
        },
        resolve: loadSequence('TableStatsCtrl', 'TableStatsService', 'tableService')
    }).state('app.photos', {
        url: '/photos',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.photos.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.photos.MAIN'
        }
    }).state('app.photos.images', {
        url: '/images',
        templateUrl: '/bundles/sportclub/js/components/Image/images.html',
        title: 'content.list.IMAGES',
        ncyBreadcrumb: {
            label: 'content.list.IMAGES'
        },
        params: {
            'imagesIsFiltersVisible': null,
            'imagesPage': null,
            'imagesCount': null,
            'imagesSorting': null,
            'imagesFilter': null
        },
        resolve: loadSequence('ImagesCtrl', 'imageService', 'imageTypeService', 'priceService', 'sharingService', 'galleryService', 'userService', 'imageCategoryService')
    }).state('app.photos.imagesnew', {
        url: '/images/new',
        templateUrl: '/bundles/sportclub/js/components/Image/image_form.html',
        title: 'content.list.NEWIMAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWIMAGE'
        },
        params: {
            'image_image_type': null,
            'image_price': null,
            'image_sharing': null,
            'image_gallery': null
        },
        resolve: loadSequence('ImageFormCtrl', 'imageService', 'imageTypeService', 'priceService', 'sharingService', 'galleryService', 'userService', 'imageCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagesedit', {
        url: '/images/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Image/image_form.html',
        title: 'content.list.EDITIMAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITIMAGE'
        },
        resolve: loadSequence('ImageFormCtrl', 'imageService', 'imageTypeService', 'priceService', 'sharingService', 'galleryService', 'userService', 'imageCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagesdetails', {
        url: '/images/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Image/image.html',
        ncyBreadcrumb: {
            label: 'content.list.IMAGEDETAILS'
        },
        resolve: loadSequence('ImageCtrl', 'imageService')
    }).state('app.photos.imagecategories', {
        url: '/image-categories',
        templateUrl: '/bundles/sportclub/js/components/ImageCategory/image_categories.html',
        title: 'content.list.IMAGECATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.IMAGECATEGORIES'
        },
        params: {
            'imageCategoriesIsFiltersVisible': null,
            'imageCategoriesPage': null,
            'imageCategoriesCount': null,
            'imageCategoriesSorting': null,
            'imageCategoriesFilter': null
        },
        resolve: loadSequence('ImageCategoriesCtrl', 'imageCategoryService', 'imageTypeService', 'userService')
    }).state('app.photos.imagecategoriesnew', {
        url: '/image-categories/new',
        templateUrl: '/bundles/sportclub/js/components/ImageCategory/image_category_form.html',
        title: 'content.list.NEWIMAGECATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWIMAGECATEGORY'
        },
        params: {
            'image_category_parent': null,
            'image_category_image_type': null
        },
        resolve: loadSequence('ImageCategoryFormCtrl', 'imageCategoryService', 'imageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagecategoriesedit', {
        url: '/image-categories/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/ImageCategory/image_category_form.html',
        title: 'content.list.EDITIMAGECATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITIMAGECATEGORY'
        },
        resolve: loadSequence('ImageCategoryFormCtrl', 'imageCategoryService', 'imageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagecategoriesdetails', {
        url: '/image-categories/details/:id',
        templateUrl: '/bundles/sportclub/js/components/ImageCategory/image_category.html',
        ncyBreadcrumb: {
            label: 'content.list.IMAGECATEGORYDETAILS'
        },
        resolve: loadSequence('ImageCategoryCtrl', 'imageCategoryService')
    }).state('app.photos.imagetypes', {
        url: '/image-types',
        templateUrl: '/bundles/sportclub/js/components/ImageType/image_types.html',
        title: 'content.list.IMAGETYPES',
        ncyBreadcrumb: {
            label: 'content.list.IMAGETYPES'
        },
        params: {
            'imageTypesIsFiltersVisible': null,
            'imageTypesPage': null,
            'imageTypesCount': null,
            'imageTypesSorting': null,
            'imageTypesFilter': null
        },
        resolve: loadSequence('ImageTypesCtrl', 'imageTypeService', 'userService')
    }).state('app.photos.imagetypesnew', {
        url: '/image-types/new',
        templateUrl: '/bundles/sportclub/js/components/ImageType/image_type_form.html',
        title: 'content.list.NEWIMAGETYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWIMAGETYPE'
        },
        params: {
        },
        resolve: loadSequence('ImageTypeFormCtrl', 'imageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagetypesedit', {
        url: '/image-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/ImageType/image_type_form.html',
        title: 'content.list.EDITIMAGETYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITIMAGETYPE'
        },
        resolve: loadSequence('ImageTypeFormCtrl', 'imageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.imagetypesdetails', {
        url: '/image-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/ImageType/image_type.html',
        ncyBreadcrumb: {
            label: 'content.list.IMAGETYPEDETAILS'
        },
        resolve: loadSequence('ImageTypeCtrl', 'imageTypeService')
    }).state('app.photos.galleries', {
        url: '/galleries',
        templateUrl: '/bundles/sportclub/js/components/Gallery/galleries.html',
        title: 'content.list.GALLERIES',
        ncyBreadcrumb: {
            label: 'content.list.GALLERIES'
        },
        params: {
            'galleriesIsFiltersVisible': null,
            'galleriesPage': null,
            'galleriesCount': null,
            'galleriesSorting': null,
            'galleriesFilter': null
        },
        resolve: loadSequence('GalleriesCtrl', 'galleryService', 'userService')
    }).state('app.photos.galleriesnew', {
        url: '/galleries/new',
        templateUrl: '/bundles/sportclub/js/components/Gallery/gallery_form.html',
        title: 'content.list.NEWGALLERY',
        ncyBreadcrumb: {
            label: 'content.list.NEWGALLERY'
        },
        params: {
        },
        resolve: loadSequence('GalleryFormCtrl', 'galleryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.galleriesedit', {
        url: '/galleries/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Gallery/gallery_form.html',
        title: 'content.list.EDITGALLERY',
        ncyBreadcrumb: {
            label: 'content.list.EDITGALLERY'
        },
        resolve: loadSequence('GalleryFormCtrl', 'galleryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.photos.galleriesdetails', {
        url: '/galleries/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Gallery/gallery.html',
        ncyBreadcrumb: {
            label: 'content.list.GALLERYDETAILS'
        },
        resolve: loadSequence('GalleryCtrl', 'galleryService')
    }).state('app.statistics', {
        url: '/statistics',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.statistics.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.statistics.MAIN'
        }
    }).state('app.statistics.hits', {
        url: '/hits',
        templateUrl: '/bundles/sportclub/js/components/Hit/hits.html',
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
        templateUrl: '/bundles/sportclub/js/components/Hit/hit_form.html',
        title: 'content.list.NEWHIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWHIT'
        },
        params: {
            'hit_visit': null
        },
        resolve: loadSequence('HitFormCtrl', 'hitService', 'visitService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.statistics.hitsedit', {
        url: '/hits/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Hit/hit_form.html',
        title: 'content.list.EDITHIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITHIT'
        },
        resolve: loadSequence('HitFormCtrl', 'hitService', 'visitService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.statistics.hitsdetails', {
        url: '/hits/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Hit/hit.html',
        ncyBreadcrumb: {
            label: 'content.list.HITDETAILS'
        },
        resolve: loadSequence('HitCtrl', 'hitService')
    }).state('app.statistics.visits', {
        url: '/visits',
        templateUrl: '/bundles/sportclub/js/components/Visit/visits.html',
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
        templateUrl: '/bundles/sportclub/js/components/Visit/visit_form.html',
        title: 'content.list.NEWVISIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWVISIT'
        },
        params: {
        },
        resolve: loadSequence('VisitFormCtrl', 'visitService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.statistics.visitsedit', {
        url: '/visits/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Visit/visit_form.html',
        title: 'content.list.EDITVISIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITVISIT'
        },
        resolve: loadSequence('VisitFormCtrl', 'visitService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.statistics.visitsdetails', {
        url: '/visits/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Visit/visit.html',
        ncyBreadcrumb: {
            label: 'content.list.VISITDETAILS'
        },
        resolve: loadSequence('VisitCtrl', 'visitService')
    }).state('app.webtv', {
        url: '/web-t-v',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.webtv.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.webtv.MAIN'
        }
    }).state('app.webtv.videos', {
        url: '/videos',
        templateUrl: '/bundles/sportclub/js/components/Video/videos.html',
        title: 'content.list.VIDEOS',
        ncyBreadcrumb: {
            label: 'content.list.VIDEOS'
        },
        params: {
            'videosIsFiltersVisible': null,
            'videosPage': null,
            'videosCount': null,
            'videosSorting': null,
            'videosFilter': null
        },
        resolve: loadSequence('VideosCtrl', 'videoService', 'videoTypeService', 'priceService', 'sharingService', 'showService', 'userService', 'videoCategoryService')
    }).state('app.webtv.videosnew', {
        url: '/videos/new',
        templateUrl: '/bundles/sportclub/js/components/Video/video_form.html',
        title: 'content.list.NEWVIDEO',
        ncyBreadcrumb: {
            label: 'content.list.NEWVIDEO'
        },
        params: {
            'video_video_type': null,
            'video_price': null,
            'video_sharing': null,
            'video_show': null
        },
        resolve: loadSequence('VideoFormCtrl', 'videoService', 'videoTypeService', 'priceService', 'sharingService', 'showService', 'userService', 'videoCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videosedit', {
        url: '/videos/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Video/video_form.html',
        title: 'content.list.EDITVIDEO',
        ncyBreadcrumb: {
            label: 'content.list.EDITVIDEO'
        },
        resolve: loadSequence('VideoFormCtrl', 'videoService', 'videoTypeService', 'priceService', 'sharingService', 'showService', 'userService', 'videoCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videosdetails', {
        url: '/videos/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Video/video.html',
        ncyBreadcrumb: {
            label: 'content.list.VIDEODETAILS'
        },
        resolve: loadSequence('VideoCtrl', 'videoService')
    }).state('app.webtv.videosconvert', {
        url: '/videos/convert/:id',
        templateUrl: '/bundles/sportclub/js/components/Video/video_converter.html',
        ncyBreadcrumb: {
            label: 'content.list.CONVERTVIDEO'
        },
        resolve: loadSequence('VideoConverterCtrl', 'VideoConverterService', 'videoService')
    }).state('app.webtv.videocategories', {
        url: '/video-categories',
        templateUrl: '/bundles/sportclub/js/components/VideoCategory/video_categories.html',
        title: 'content.list.VIDEOCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.VIDEOCATEGORIES'
        },
        params: {
            'videoCategoriesIsFiltersVisible': null,
            'videoCategoriesPage': null,
            'videoCategoriesCount': null,
            'videoCategoriesSorting': null,
            'videoCategoriesFilter': null
        },
        resolve: loadSequence('VideoCategoriesCtrl', 'videoCategoryService', 'videoTypeService', 'userService')
    }).state('app.webtv.videocategoriesnew', {
        url: '/video-categories/new',
        templateUrl: '/bundles/sportclub/js/components/VideoCategory/video_category_form.html',
        title: 'content.list.NEWVIDEOCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWVIDEOCATEGORY'
        },
        params: {
            'video_category_parent': null,
            'video_category_video_type': null
        },
        resolve: loadSequence('VideoCategoryFormCtrl', 'videoCategoryService', 'videoTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videocategoriesedit', {
        url: '/video-categories/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/VideoCategory/video_category_form.html',
        title: 'content.list.EDITVIDEOCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITVIDEOCATEGORY'
        },
        resolve: loadSequence('VideoCategoryFormCtrl', 'videoCategoryService', 'videoTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videocategoriesdetails', {
        url: '/video-categories/details/:id',
        templateUrl: '/bundles/sportclub/js/components/VideoCategory/video_category.html',
        ncyBreadcrumb: {
            label: 'content.list.VIDEOCATEGORYDETAILS'
        },
        resolve: loadSequence('VideoCategoryCtrl', 'videoCategoryService')
    }).state('app.webtv.videotypes', {
        url: '/video-types',
        templateUrl: '/bundles/sportclub/js/components/VideoType/video_types.html',
        title: 'content.list.VIDEOTYPES',
        ncyBreadcrumb: {
            label: 'content.list.VIDEOTYPES'
        },
        params: {
            'videoTypesIsFiltersVisible': null,
            'videoTypesPage': null,
            'videoTypesCount': null,
            'videoTypesSorting': null,
            'videoTypesFilter': null
        },
        resolve: loadSequence('VideoTypesCtrl', 'videoTypeService', 'userService')
    }).state('app.webtv.videotypesnew', {
        url: '/video-types/new',
        templateUrl: '/bundles/sportclub/js/components/VideoType/video_type_form.html',
        title: 'content.list.NEWVIDEOTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWVIDEOTYPE'
        },
        params: {
        },
        resolve: loadSequence('VideoTypeFormCtrl', 'videoTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videotypesedit', {
        url: '/video-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/VideoType/video_type_form.html',
        title: 'content.list.EDITVIDEOTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITVIDEOTYPE'
        },
        resolve: loadSequence('VideoTypeFormCtrl', 'videoTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.videotypesdetails', {
        url: '/video-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/VideoType/video_type.html',
        ncyBreadcrumb: {
            label: 'content.list.VIDEOTYPEDETAILS'
        },
        resolve: loadSequence('VideoTypeCtrl', 'videoTypeService')
    }).state('app.webtv.shows', {
        url: '/shows',
        templateUrl: '/bundles/sportclub/js/components/Show/shows.html',
        title: 'content.list.SHOWS',
        ncyBreadcrumb: {
            label: 'content.list.SHOWS'
        },
        params: {
            'showsIsFiltersVisible': null,
            'showsPage': null,
            'showsCount': null,
            'showsSorting': null,
            'showsFilter': null
        },
        resolve: loadSequence('ShowsCtrl', 'showService', 'userService')
    }).state('app.webtv.showsnew', {
        url: '/shows/new',
        templateUrl: '/bundles/sportclub/js/components/Show/show_form.html',
        title: 'content.list.NEWSHOW',
        ncyBreadcrumb: {
            label: 'content.list.NEWSHOW'
        },
        params: {
        },
        resolve: loadSequence('ShowFormCtrl', 'showService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.showsedit', {
        url: '/shows/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Show/show_form.html',
        title: 'content.list.EDITSHOW',
        ncyBreadcrumb: {
            label: 'content.list.EDITSHOW'
        },
        resolve: loadSequence('ShowFormCtrl', 'showService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.showsdetails', {
        url: '/shows/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Show/show.html',
        ncyBreadcrumb: {
            label: 'content.list.SHOWDETAILS'
        },
        resolve: loadSequence('ShowCtrl', 'showService')
    }).state('app.webtv.livechannels', {
        url: '/live-channels',
        templateUrl: '/bundles/sportclub/js/components/LiveChannel/live_channels.html',
        title: 'content.list.LIVECHANNELS',
        ncyBreadcrumb: {
            label: 'content.list.LIVECHANNELS'
        },
        params: {
            'liveChannelsIsFiltersVisible': null,
            'liveChannelsPage': null,
            'liveChannelsCount': null,
            'liveChannelsSorting': null,
            'liveChannelsFilter': null
        },
        resolve: loadSequence('LiveChannelsCtrl', 'liveChannelService', 'priceService', 'sharingService', 'userService')
    }).state('app.webtv.livechannelsnew', {
        url: '/live-channels/new',
        templateUrl: '/bundles/sportclub/js/components/LiveChannel/live_channel_form.html',
        title: 'content.list.NEWLIVECHANNEL',
        ncyBreadcrumb: {
            label: 'content.list.NEWLIVECHANNEL'
        },
        params: {
            'live_channel_price': null,
            'live_channel_sharing': null
        },
        resolve: loadSequence('LiveChannelFormCtrl', 'liveChannelService', 'priceService', 'sharingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.livechannelsedit', {
        url: '/live-channels/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/LiveChannel/live_channel_form.html',
        title: 'content.list.EDITLIVECHANNEL',
        ncyBreadcrumb: {
            label: 'content.list.EDITLIVECHANNEL'
        },
        resolve: loadSequence('LiveChannelFormCtrl', 'liveChannelService', 'priceService', 'sharingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.webtv.livechannelsdetails', {
        url: '/live-channels/details/:id',
        templateUrl: '/bundles/sportclub/js/components/LiveChannel/live_channel.html',
        ncyBreadcrumb: {
            label: 'content.list.LIVECHANNELDETAILS'
        },
        resolve: loadSequence('LiveChannelCtrl', 'liveChannelService')
    }).state('app.matchday', {
        url: '/matchday',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.matchday.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.matchday.MAIN'
        }
    }).state('app.matchday.matches', {
        url: '/matches',
        templateUrl: '/bundles/sportclub/js/components/Match/matches.html',
        title: 'content.list.MATCHES',
        ncyBreadcrumb: {
            label: 'content.list.MATCHES'
        },
        params: {
            'matchesIsFiltersVisible': null,
            'matchesPage': null,
            'matchesCount': null,
            'matchesSorting': null,
            'matchesFilter': null
        },
        resolve: loadSequence('MatchesCtrl', 'matchService', 'galleryService', 'showService', 'dayService', 'teamService', 'countryService', 'cityService', 'stadiumService', 'userService')
    }).state('app.matchday.matchesnew', {
        url: '/matches/new',
        templateUrl: '/bundles/sportclub/js/components/Match/match_form.html',
        title: 'content.list.NEWMATCH',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCH'
        },
        params: {
            'match_gallery': null,
            'match_show': null,
            'match_day': null,
            'match_team_home': null,
            'match_team_away': null,
            'match_country': null,
            'match_city': null,
            'match_stadium': null
        },
        resolve: loadSequence('MatchFormCtrl', 'matchService', 'galleryService', 'showService', 'dayService', 'teamService', 'countryService', 'cityService', 'stadiumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchesedit', {
        url: '/matches/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Match/match_form.html',
        title: 'content.list.EDITMATCH',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCH'
        },
        resolve: loadSequence('MatchFormCtrl', 'matchService', 'galleryService', 'showService', 'dayService', 'teamService', 'countryService', 'cityService', 'stadiumService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchesdetails', {
        url: '/matches/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Match/match.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHDETAILS'
        },
        resolve: loadSequence('MatchCtrl', 'matchService')
    }).state('app.matchday.matchlineups', {
        url: '/match-line-ups',
        templateUrl: '/bundles/sportclub/js/components/MatchLineUp/match_line_ups.html',
        title: 'content.list.MATCHLINEUPS',
        ncyBreadcrumb: {
            label: 'content.list.MATCHLINEUPS'
        },
        params: {
            'matchLineUpsIsFiltersVisible': null,
            'matchLineUpsPage': null,
            'matchLineUpsCount': null,
            'matchLineUpsSorting': null,
            'matchLineUpsFilter': null
        },
        resolve: loadSequence('MatchLineUpsCtrl', 'matchLineUpService', 'matchService', 'teamService', 'playerService', 'userService')
    }).state('app.matchday.matchlineupsnew', {
        url: '/match-line-ups/new',
        templateUrl: '/bundles/sportclub/js/components/MatchLineUp/match_line_up_form.html',
        title: 'content.list.NEWMATCHLINEUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCHLINEUP'
        },
        params: {
            'match_line_up_match': null,
            'match_line_up_team': null,
            'match_line_up_player': null
        },
        resolve: loadSequence('MatchLineUpFormCtrl', 'matchLineUpService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchlineupsedit', {
        url: '/match-line-ups/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchLineUp/match_line_up_form.html',
        title: 'content.list.EDITMATCHLINEUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCHLINEUP'
        },
        resolve: loadSequence('MatchLineUpFormCtrl', 'matchLineUpService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchlineupsdetails', {
        url: '/match-line-ups/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchLineUp/match_line_up.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHLINEUPDETAILS'
        },
        resolve: loadSequence('MatchLineUpCtrl', 'matchLineUpService')
    }).state('app.matchday.matchcommentaries', {
        url: '/match-commentaries',
        templateUrl: '/bundles/sportclub/js/components/MatchCommentary/match_commentaries.html',
        title: 'content.list.MATCHCOMMENTARIES',
        ncyBreadcrumb: {
            label: 'content.list.MATCHCOMMENTARIES'
        },
        params: {
            'matchCommentariesIsFiltersVisible': null,
            'matchCommentariesPage': null,
            'matchCommentariesCount': null,
            'matchCommentariesSorting': null,
            'matchCommentariesFilter': null
        },
        resolve: loadSequence('MatchCommentariesCtrl', 'matchCommentaryService', 'matchService', 'userService')
    }).state('app.matchday.matchcommentariesnew', {
        url: '/match-commentaries/new',
        templateUrl: '/bundles/sportclub/js/components/MatchCommentary/match_commentary_form.html',
        title: 'content.list.NEWMATCHCOMMENTARY',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCHCOMMENTARY'
        },
        params: {
            'match_commentary_match': null
        },
        resolve: loadSequence('MatchCommentaryFormCtrl', 'matchCommentaryService', 'matchService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchcommentariesedit', {
        url: '/match-commentaries/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchCommentary/match_commentary_form.html',
        title: 'content.list.EDITMATCHCOMMENTARY',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCHCOMMENTARY'
        },
        resolve: loadSequence('MatchCommentaryFormCtrl', 'matchCommentaryService', 'matchService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchcommentariesdetails', {
        url: '/match-commentaries/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchCommentary/match_commentary.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHCOMMENTARYDETAILS'
        },
        resolve: loadSequence('MatchCommentaryCtrl', 'matchCommentaryService')
    }).state('app.matchday.matchgoals', {
        url: '/match-goals',
        templateUrl: '/bundles/sportclub/js/components/MatchGoal/match_goals.html',
        title: 'content.list.MATCHGOALS',
        ncyBreadcrumb: {
            label: 'content.list.MATCHGOALS'
        },
        params: {
            'matchGoalsIsFiltersVisible': null,
            'matchGoalsPage': null,
            'matchGoalsCount': null,
            'matchGoalsSorting': null,
            'matchGoalsFilter': null
        },
        resolve: loadSequence('MatchGoalsCtrl', 'matchGoalService', 'matchService', 'teamService', 'playerService', 'userService')
    }).state('app.matchday.matchgoalsnew', {
        url: '/match-goals/new',
        templateUrl: '/bundles/sportclub/js/components/MatchGoal/match_goal_form.html',
        title: 'content.list.NEWMATCHGOAL',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCHGOAL'
        },
        params: {
            'match_goal_match': null,
            'match_goal_team': null,
            'match_goal_player': null
        },
        resolve: loadSequence('MatchGoalFormCtrl', 'matchGoalService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchgoalsedit', {
        url: '/match-goals/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchGoal/match_goal_form.html',
        title: 'content.list.EDITMATCHGOAL',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCHGOAL'
        },
        resolve: loadSequence('MatchGoalFormCtrl', 'matchGoalService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchgoalsdetails', {
        url: '/match-goals/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchGoal/match_goal.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHGOALDETAILS'
        },
        resolve: loadSequence('MatchGoalCtrl', 'matchGoalService')
    }).state('app.matchday.matchcards', {
        url: '/match-cards',
        templateUrl: '/bundles/sportclub/js/components/MatchCard/match_cards.html',
        title: 'content.list.MATCHCARDS',
        ncyBreadcrumb: {
            label: 'content.list.MATCHCARDS'
        },
        params: {
            'matchCardsIsFiltersVisible': null,
            'matchCardsPage': null,
            'matchCardsCount': null,
            'matchCardsSorting': null,
            'matchCardsFilter': null
        },
        resolve: loadSequence('MatchCardsCtrl', 'matchCardService', 'matchService', 'teamService', 'playerService', 'userService')
    }).state('app.matchday.matchcardsnew', {
        url: '/match-cards/new',
        templateUrl: '/bundles/sportclub/js/components/MatchCard/match_card_form.html',
        title: 'content.list.NEWMATCHCARD',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCHCARD'
        },
        params: {
            'match_card_match': null,
            'match_card_team': null,
            'match_card_player': null
        },
        resolve: loadSequence('MatchCardFormCtrl', 'matchCardService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchcardsedit', {
        url: '/match-cards/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchCard/match_card_form.html',
        title: 'content.list.EDITMATCHCARD',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCHCARD'
        },
        resolve: loadSequence('MatchCardFormCtrl', 'matchCardService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchcardsdetails', {
        url: '/match-cards/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchCard/match_card.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHCARDDETAILS'
        },
        resolve: loadSequence('MatchCardCtrl', 'matchCardService')
    }).state('app.matchday.matchsubstitutions', {
        url: '/match-substitutions',
        templateUrl: '/bundles/sportclub/js/components/MatchSubstitution/match_substitutions.html',
        title: 'content.list.MATCHSUBSTITUTIONS',
        ncyBreadcrumb: {
            label: 'content.list.MATCHSUBSTITUTIONS'
        },
        params: {
            'matchSubstitutionsIsFiltersVisible': null,
            'matchSubstitutionsPage': null,
            'matchSubstitutionsCount': null,
            'matchSubstitutionsSorting': null,
            'matchSubstitutionsFilter': null
        },
        resolve: loadSequence('MatchSubstitutionsCtrl', 'matchSubstitutionService', 'matchService', 'teamService', 'playerService', 'userService')
    }).state('app.matchday.matchsubstitutionsnew', {
        url: '/match-substitutions/new',
        templateUrl: '/bundles/sportclub/js/components/MatchSubstitution/match_substitution_form.html',
        title: 'content.list.NEWMATCHSUBSTITUTION',
        ncyBreadcrumb: {
            label: 'content.list.NEWMATCHSUBSTITUTION'
        },
        params: {
            'match_substitution_match': null,
            'match_substitution_team': null,
            'match_substitution_player_in': null,
            'match_substitution_player_out': null
        },
        resolve: loadSequence('MatchSubstitutionFormCtrl', 'matchSubstitutionService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchsubstitutionsedit', {
        url: '/match-substitutions/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchSubstitution/match_substitution_form.html',
        title: 'content.list.EDITMATCHSUBSTITUTION',
        ncyBreadcrumb: {
            label: 'content.list.EDITMATCHSUBSTITUTION'
        },
        resolve: loadSequence('MatchSubstitutionFormCtrl', 'matchSubstitutionService', 'matchService', 'teamService', 'playerService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.matchday.matchsubstitutionsdetails', {
        url: '/match-substitutions/details/:id',
        templateUrl: '/bundles/sportclub/js/components/MatchSubstitution/match_substitution.html',
        ncyBreadcrumb: {
            label: 'content.list.MATCHSUBSTITUTIONDETAILS'
        },
        resolve: loadSequence('MatchSubstitutionCtrl', 'matchSubstitutionService')
    }).state('app.offer', {
        url: '/offer',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.offer.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.offer.MAIN'
        }
    }).state('app.offer.subscriptions', {
        url: '/subscriptions',
        templateUrl: '/bundles/sportclub/js/components/Subscription/subscriptions.html',
        title: 'content.list.SUBSCRIPTIONS',
        ncyBreadcrumb: {
            label: 'content.list.SUBSCRIPTIONS'
        },
        params: {
            'subscriptionsIsFiltersVisible': null,
            'subscriptionsPage': null,
            'subscriptionsCount': null,
            'subscriptionsSorting': null,
            'subscriptionsFilter': null
        },
        resolve: loadSequence('SubscriptionsCtrl', 'subscriptionService', 'visitService', 'packageService', 'priceService', 'userService')
    }).state('app.offer.subscriptionsnew', {
        url: '/subscriptions/new',
        templateUrl: '/bundles/sportclub/js/components/Subscription/subscription_form.html',
        title: 'content.list.NEWSUBSCRIPTION',
        ncyBreadcrumb: {
            label: 'content.list.NEWSUBSCRIPTION'
        },
        params: {
            'subscription_visit': null,
            'subscription_package': null,
            'subscription_price': null
        },
        resolve: loadSequence('SubscriptionFormCtrl', 'subscriptionService', 'visitService', 'packageService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.subscriptionsedit', {
        url: '/subscriptions/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Subscription/subscription_form.html',
        title: 'content.list.EDITSUBSCRIPTION',
        ncyBreadcrumb: {
            label: 'content.list.EDITSUBSCRIPTION'
        },
        resolve: loadSequence('SubscriptionFormCtrl', 'subscriptionService', 'visitService', 'packageService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.subscriptionsdetails', {
        url: '/subscriptions/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Subscription/subscription.html',
        ncyBreadcrumb: {
            label: 'content.list.SUBSCRIPTIONDETAILS'
        },
        resolve: loadSequence('SubscriptionCtrl', 'subscriptionService')
    }).state('app.offer.packages', {
        url: '/packages',
        templateUrl: '/bundles/sportclub/js/components/Package/packages.html',
        title: 'content.list.PACKAGES',
        ncyBreadcrumb: {
            label: 'content.list.PACKAGES'
        },
        params: {
            'packagesIsFiltersVisible': null,
            'packagesPage': null,
            'packagesCount': null,
            'packagesSorting': null,
            'packagesFilter': null
        },
        resolve: loadSequence('PackagesCtrl', 'packageService', 'packageTypeService', 'priceService', 'userService')
    }).state('app.offer.packagesnew', {
        url: '/packages/new',
        templateUrl: '/bundles/sportclub/js/components/Package/package_form.html',
        title: 'content.list.NEWPACKAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPACKAGE'
        },
        params: {
            'package_package_type': null,
            'package_price': null
        },
        resolve: loadSequence('PackageFormCtrl', 'packageService', 'packageTypeService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.packagesedit', {
        url: '/packages/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Package/package_form.html',
        title: 'content.list.EDITPACKAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPACKAGE'
        },
        resolve: loadSequence('PackageFormCtrl', 'packageService', 'packageTypeService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.packagesdetails', {
        url: '/packages/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Package/package.html',
        ncyBreadcrumb: {
            label: 'content.list.PACKAGEDETAILS'
        },
        resolve: loadSequence('PackageCtrl', 'packageService')
    }).state('app.offer.packagetypes', {
        url: '/package-types',
        templateUrl: '/bundles/sportclub/js/components/PackageType/package_types.html',
        title: 'content.list.PACKAGETYPES',
        ncyBreadcrumb: {
            label: 'content.list.PACKAGETYPES'
        },
        params: {
            'packageTypesIsFiltersVisible': null,
            'packageTypesPage': null,
            'packageTypesCount': null,
            'packageTypesSorting': null,
            'packageTypesFilter': null
        },
        resolve: loadSequence('PackageTypesCtrl', 'packageTypeService', 'userService')
    }).state('app.offer.packagetypesnew', {
        url: '/package-types/new',
        templateUrl: '/bundles/sportclub/js/components/PackageType/package_type_form.html',
        title: 'content.list.NEWPACKAGETYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPACKAGETYPE'
        },
        params: {
        },
        resolve: loadSequence('PackageTypeFormCtrl', 'packageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.packagetypesedit', {
        url: '/package-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PackageType/package_type_form.html',
        title: 'content.list.EDITPACKAGETYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPACKAGETYPE'
        },
        resolve: loadSequence('PackageTypeFormCtrl', 'packageTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.packagetypesdetails', {
        url: '/package-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PackageType/package_type.html',
        ncyBreadcrumb: {
            label: 'content.list.PACKAGETYPEDETAILS'
        },
        resolve: loadSequence('PackageTypeCtrl', 'packageTypeService')
    }).state('app.offer.prices', {
        url: '/prices',
        templateUrl: '/bundles/sportclub/js/components/Price/prices.html',
        title: 'content.list.PRICES',
        ncyBreadcrumb: {
            label: 'content.list.PRICES'
        },
        params: {
            'pricesIsFiltersVisible': null,
            'pricesPage': null,
            'pricesCount': null,
            'pricesSorting': null,
            'pricesFilter': null
        },
        resolve: loadSequence('PricesCtrl', 'priceService', 'userService')
    }).state('app.offer.pricesnew', {
        url: '/prices/new',
        templateUrl: '/bundles/sportclub/js/components/Price/price_form.html',
        title: 'content.list.NEWPRICE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPRICE'
        },
        params: {
        },
        resolve: loadSequence('PriceFormCtrl', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.pricesedit', {
        url: '/prices/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Price/price_form.html',
        title: 'content.list.EDITPRICE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPRICE'
        },
        resolve: loadSequence('PriceFormCtrl', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.pricesdetails', {
        url: '/prices/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Price/price.html',
        ncyBreadcrumb: {
            label: 'content.list.PRICEDETAILS'
        },
        resolve: loadSequence('PriceCtrl', 'priceService')
    }).state('app.offer.vouchers', {
        url: '/vouchers',
        templateUrl: '/bundles/sportclub/js/components/Voucher/vouchers.html',
        title: 'content.list.VOUCHERS',
        ncyBreadcrumb: {
            label: 'content.list.VOUCHERS'
        },
        params: {
            'vouchersIsFiltersVisible': null,
            'vouchersPage': null,
            'vouchersCount': null,
            'vouchersSorting': null,
            'vouchersFilter': null
        },
        resolve: loadSequence('VouchersCtrl', 'voucherService', 'priceService', 'userService')
    }).state('app.offer.vouchersnew', {
        url: '/vouchers/new',
        templateUrl: '/bundles/sportclub/js/components/Voucher/voucher_form.html',
        title: 'content.list.NEWVOUCHER',
        ncyBreadcrumb: {
            label: 'content.list.NEWVOUCHER'
        },
        params: {
            'voucher_price': null,
            'voucher_user': null
        },
        resolve: loadSequence('VoucherFormCtrl', 'voucherService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.vouchersedit', {
        url: '/vouchers/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Voucher/voucher_form.html',
        title: 'content.list.EDITVOUCHER',
        ncyBreadcrumb: {
            label: 'content.list.EDITVOUCHER'
        },
        resolve: loadSequence('VoucherFormCtrl', 'voucherService', 'priceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.vouchersdetails', {
        url: '/vouchers/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Voucher/voucher.html',
        ncyBreadcrumb: {
            label: 'content.list.VOUCHERDETAILS'
        },
        resolve: loadSequence('VoucherCtrl', 'voucherService')
    }).state('app.offer.sharings', {
        url: '/sharings',
        templateUrl: '/bundles/sportclub/js/components/Sharing/sharings.html',
        title: 'content.list.SHARINGS',
        ncyBreadcrumb: {
            label: 'content.list.SHARINGS'
        },
        params: {
            'sharingsIsFiltersVisible': null,
            'sharingsPage': null,
            'sharingsCount': null,
            'sharingsSorting': null,
            'sharingsFilter': null
        },
        resolve: loadSequence('SharingsCtrl', 'sharingService', 'userService')
    }).state('app.offer.sharingsnew', {
        url: '/sharings/new',
        templateUrl: '/bundles/sportclub/js/components/Sharing/sharing_form.html',
        title: 'content.list.NEWSHARING',
        ncyBreadcrumb: {
            label: 'content.list.NEWSHARING'
        },
        params: {
        },
        resolve: loadSequence('SharingFormCtrl', 'sharingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.sharingsedit', {
        url: '/sharings/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Sharing/sharing_form.html',
        title: 'content.list.EDITSHARING',
        ncyBreadcrumb: {
            label: 'content.list.EDITSHARING'
        },
        resolve: loadSequence('SharingFormCtrl', 'sharingService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.offer.sharingsdetails', {
        url: '/sharings/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Sharing/sharing.html',
        ncyBreadcrumb: {
            label: 'content.list.SHARINGDETAILS'
        },
        resolve: loadSequence('SharingCtrl', 'sharingService')
    }).state('app.news', {
        url: '/news',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.news.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.news.MAIN'
        }
    }).state('app.news.posts', {
        url: '/posts',
        templateUrl: '/bundles/sportclub/js/components/Post/posts.html',
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
        templateUrl: '/bundles/sportclub/js/components/Post/post_form.html',
        title: 'content.list.NEWPOST',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOST'
        },
        params: {
            'post_post_type': null
        },
        resolve: loadSequence('PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.postsedit', {
        url: '/posts/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Post/post_form.html',
        title: 'content.list.EDITPOST',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOST'
        },
        resolve: loadSequence('PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.postsdetails', {
        url: '/posts/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Post/post.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTDETAILS'
        },
        resolve: loadSequence('PostCtrl', 'postService')
    }).state('app.news.postcategories', {
        url: '/post-categories',
        templateUrl: '/bundles/sportclub/js/components/PostCategory/post_categories.html',
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
        templateUrl: '/bundles/sportclub/js/components/PostCategory/post_category_form.html',
        title: 'content.list.NEWPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTCATEGORY'
        },
        params: {
            'post_category_parent': null,
            'post_category_post_type': null
        },
        resolve: loadSequence('PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.postcategoriesedit', {
        url: '/post-categories/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PostCategory/post_category_form.html',
        title: 'content.list.EDITPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTCATEGORY'
        },
        resolve: loadSequence('PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.postcategoriesdetails', {
        url: '/post-categories/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PostCategory/post_category.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTCATEGORYDETAILS'
        },
        resolve: loadSequence('PostCategoryCtrl', 'postCategoryService')
    }).state('app.news.posttypes', {
        url: '/post-types',
        templateUrl: '/bundles/sportclub/js/components/PostType/post_types.html',
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
        templateUrl: '/bundles/sportclub/js/components/PostType/post_type_form.html',
        title: 'content.list.NEWPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTTYPE'
        },
        params: {
        },
        resolve: loadSequence('PostTypeFormCtrl', 'postTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.posttypesedit', {
        url: '/post-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PostType/post_type_form.html',
        title: 'content.list.EDITPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTTYPE'
        },
        resolve: loadSequence('PostTypeFormCtrl', 'postTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.news.posttypesdetails', {
        url: '/post-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PostType/post_type.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTTYPEDETAILS'
        },
        resolve: loadSequence('PostTypeCtrl', 'postTypeService')
    }).state('app.mobile', {
        url: '/mobile',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.mobile.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.mobile.MAIN'
        }
    }).state('app.mobile.pushnotifications', {
        url: '/push-notifications',
        templateUrl: '/bundles/sportclub/js/components/PushNotification/push_notifications.html',
        title: 'content.list.PUSHNOTIFICATIONS',
        ncyBreadcrumb: {
            label: 'content.list.PUSHNOTIFICATIONS'
        },
        params: {
            'pushNotificationsIsFiltersVisible': null,
            'pushNotificationsPage': null,
            'pushNotificationsCount': null,
            'pushNotificationsSorting': null,
            'pushNotificationsFilter': null
        },
        resolve: loadSequence('PushNotificationsCtrl', 'pushNotificationService', 'matchService', 'matchSubstitutionService', 'matchGoalService', 'postService', 'videoService', 'audioService', 'galleryService', 'userService')
    }).state('app.mobile.pushnotificationsnew', {
        url: '/push-notifications/new',
        templateUrl: '/bundles/sportclub/js/components/PushNotification/push_notification_form.html',
        title: 'content.list.NEWPUSHNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHNOTIFICATION'
        },
        params: {
            'push_notification_match': null,
            'push_notification_match_substitution': null,
            'push_notification_match_goal': null,
            'push_notification_post': null,
            'push_notification_video': null,
            'push_notification_audio': null,
            'push_notification_gallery': null
        },
        resolve: loadSequence('PushNotificationFormCtrl', 'pushNotificationService', 'matchService', 'matchSubstitutionService', 'matchGoalService', 'postService', 'videoService', 'audioService', 'galleryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushnotificationsedit', {
        url: '/push-notifications/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PushNotification/push_notification_form.html',
        title: 'content.list.EDITPUSHNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHNOTIFICATION'
        },
        resolve: loadSequence('PushNotificationFormCtrl', 'pushNotificationService', 'matchService', 'matchSubstitutionService', 'matchGoalService', 'postService', 'videoService', 'audioService', 'galleryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushnotificationsdetails', {
        url: '/push-notifications/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PushNotification/push_notification.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHNOTIFICATIONDETAILS'
        },
        resolve: loadSequence('PushNotificationCtrl', 'pushNotificationService')
    }).state('app.mobile.pushnotificationssend', {
        url: '/push-notifications/send/:id',
        templateUrl: '/bundles/sportclub/js/components/PushNotification/push_notification_sender.html',
        ncyBreadcrumb: {
            label: 'content.list.SENDPUSHNOTIFICATION'
        },
        resolve: loadSequence('PushNotificationSenderCtrl', 'PushNotificationSenderService', 'pushNotificationService')
    }).state('app.mobile.pushdevices', {
        url: '/push-devices',
        templateUrl: '/bundles/sportclub/js/components/PushDevice/push_devices.html',
        title: 'content.list.PUSHDEVICES',
        ncyBreadcrumb: {
            label: 'content.list.PUSHDEVICES'
        },
        params: {
            'pushDevicesIsFiltersVisible': null,
            'pushDevicesPage': null,
            'pushDevicesCount': null,
            'pushDevicesSorting': null,
            'pushDevicesFilter': null
        },
        resolve: loadSequence('PushDevicesCtrl', 'pushDeviceService', 'userService')
    }).state('app.mobile.pushdevicesnew', {
        url: '/push-devices/new',
        templateUrl: '/bundles/sportclub/js/components/PushDevice/push_device_form.html',
        title: 'content.list.NEWPUSHDEVICE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHDEVICE'
        },
        params: {
        },
        resolve: loadSequence('PushDeviceFormCtrl', 'pushDeviceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushdevicesedit', {
        url: '/push-devices/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PushDevice/push_device_form.html',
        title: 'content.list.EDITPUSHDEVICE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHDEVICE'
        },
        resolve: loadSequence('PushDeviceFormCtrl', 'pushDeviceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushdevicesdetails', {
        url: '/push-devices/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PushDevice/push_device.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHDEVICEDETAILS'
        },
        resolve: loadSequence('PushDeviceCtrl', 'pushDeviceService')
    }).state('app.mobile.pushmessages', {
        url: '/push-messages',
        templateUrl: '/bundles/sportclub/js/components/PushMessage/push_messages.html',
        title: 'content.list.PUSHMESSAGES',
        ncyBreadcrumb: {
            label: 'content.list.PUSHMESSAGES'
        },
        params: {
            'pushMessagesIsFiltersVisible': null,
            'pushMessagesPage': null,
            'pushMessagesCount': null,
            'pushMessagesSorting': null,
            'pushMessagesFilter': null
        },
        resolve: loadSequence('PushMessagesCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService')
    }).state('app.mobile.pushmessagesnew', {
        url: '/push-messages/new',
        templateUrl: '/bundles/sportclub/js/components/PushMessage/push_message_form.html',
        title: 'content.list.NEWPUSHMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPUSHMESSAGE'
        },
        params: {
            'push_message_push_device': null,
            'push_message_push_notification': null
        },
        resolve: loadSequence('PushMessageFormCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushmessagesedit', {
        url: '/push-messages/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/PushMessage/push_message_form.html',
        title: 'content.list.EDITPUSHMESSAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPUSHMESSAGE'
        },
        resolve: loadSequence('PushMessageFormCtrl', 'pushMessageService', 'pushDeviceService', 'pushNotificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.mobile.pushmessagesdetails', {
        url: '/push-messages/details/:id',
        templateUrl: '/bundles/sportclub/js/components/PushMessage/push_message.html',
        ncyBreadcrumb: {
            label: 'content.list.PUSHMESSAGEDETAILS'
        },
        resolve: loadSequence('PushMessageCtrl', 'pushMessageService')
    }).state('app.mobile.pushmessagessend', {
        url: '/push-messages/send/:id',
        templateUrl: '/bundles/sportclub/js/components/PushMessage/push_message_sender.html',
        ncyBreadcrumb: {
            label: 'content.list.SENDPUSHMESSAGE'
        },
        resolve: loadSequence('PushMessageSenderCtrl', 'PushMessageSenderService', 'pushMessageService')
    }).state('app.quizzesmanager', {
        url: '/quizzes-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.quizzesmanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.quizzesmanager.MAIN'
        }
    }).state('app.quizzesmanager.quizzes', {
        url: '/quizzes',
        templateUrl: '/bundles/sportclub/js/components/Quiz/quizzes.html',
        title: 'content.list.QUIZZES',
        ncyBreadcrumb: {
            label: 'content.list.QUIZZES'
        },
        params: {
            'quizzesIsFiltersVisible': null,
            'quizzesPage': null,
            'quizzesCount': null,
            'quizzesSorting': null,
            'quizzesFilter': null
        },
        resolve: loadSequence('QuizzesCtrl', 'quizService', 'quizTypeService', 'userService')
    }).state('app.quizzesmanager.quizzesnew', {
        url: '/quizzes/new',
        templateUrl: '/bundles/sportclub/js/components/Quiz/quiz_form.html',
        title: 'content.list.NEWQUIZ',
        ncyBreadcrumb: {
            label: 'content.list.NEWQUIZ'
        },
        params: {
            'quiz_quiz_type': null
        },
        resolve: loadSequence('QuizFormCtrl', 'quizService', 'quizTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quizzesedit', {
        url: '/quizzes/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Quiz/quiz_form.html',
        title: 'content.list.EDITQUIZ',
        ncyBreadcrumb: {
            label: 'content.list.EDITQUIZ'
        },
        resolve: loadSequence('QuizFormCtrl', 'quizService', 'quizTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quizzesdetails', {
        url: '/quizzes/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Quiz/quiz.html',
        ncyBreadcrumb: {
            label: 'content.list.QUIZDETAILS'
        },
        resolve: loadSequence('QuizCtrl', 'quizService')
    }).state('app.quizzesmanager.quizanswers', {
        url: '/quiz-answers',
        templateUrl: '/bundles/sportclub/js/components/QuizAnswer/quiz_answers.html',
        title: 'content.list.QUIZANSWERS',
        ncyBreadcrumb: {
            label: 'content.list.QUIZANSWERS'
        },
        params: {
            'quizAnswersIsFiltersVisible': null,
            'quizAnswersPage': null,
            'quizAnswersCount': null,
            'quizAnswersSorting': null,
            'quizAnswersFilter': null
        },
        resolve: loadSequence('QuizAnswersCtrl', 'quizAnswerService', 'quizService', 'userService')
    }).state('app.quizzesmanager.quizanswersnew', {
        url: '/quiz-answers/new',
        templateUrl: '/bundles/sportclub/js/components/QuizAnswer/quiz_answer_form.html',
        title: 'content.list.NEWQUIZANSWER',
        ncyBreadcrumb: {
            label: 'content.list.NEWQUIZANSWER'
        },
        params: {
            'quiz_answer_quiz': null
        },
        resolve: loadSequence('QuizAnswerFormCtrl', 'quizAnswerService', 'quizService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quizanswersedit', {
        url: '/quiz-answers/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/QuizAnswer/quiz_answer_form.html',
        title: 'content.list.EDITQUIZANSWER',
        ncyBreadcrumb: {
            label: 'content.list.EDITQUIZANSWER'
        },
        resolve: loadSequence('QuizAnswerFormCtrl', 'quizAnswerService', 'quizService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quizanswersdetails', {
        url: '/quiz-answers/details/:id',
        templateUrl: '/bundles/sportclub/js/components/QuizAnswer/quiz_answer.html',
        ncyBreadcrumb: {
            label: 'content.list.QUIZANSWERDETAILS'
        },
        resolve: loadSequence('QuizAnswerCtrl', 'quizAnswerService')
    }).state('app.quizzesmanager.quiztypes', {
        url: '/quiz-types',
        templateUrl: '/bundles/sportclub/js/components/QuizType/quiz_types.html',
        title: 'content.list.QUIZTYPES',
        ncyBreadcrumb: {
            label: 'content.list.QUIZTYPES'
        },
        params: {
            'quizTypesIsFiltersVisible': null,
            'quizTypesPage': null,
            'quizTypesCount': null,
            'quizTypesSorting': null,
            'quizTypesFilter': null
        },
        resolve: loadSequence('QuizTypesCtrl', 'quizTypeService', 'userService')
    }).state('app.quizzesmanager.quiztypesnew', {
        url: '/quiz-types/new',
        templateUrl: '/bundles/sportclub/js/components/QuizType/quiz_type_form.html',
        title: 'content.list.NEWQUIZTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWQUIZTYPE'
        },
        params: {
        },
        resolve: loadSequence('QuizTypeFormCtrl', 'quizTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quiztypesedit', {
        url: '/quiz-types/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/QuizType/quiz_type_form.html',
        title: 'content.list.EDITQUIZTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITQUIZTYPE'
        },
        resolve: loadSequence('QuizTypeFormCtrl', 'quizTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.quizzesmanager.quiztypesdetails', {
        url: '/quiz-types/details/:id',
        templateUrl: '/bundles/sportclub/js/components/QuizType/quiz_type.html',
        ncyBreadcrumb: {
            label: 'content.list.QUIZTYPEDETAILS'
        },
        resolve: loadSequence('QuizTypeCtrl', 'quizTypeService')
    }).state('app.storelocator', {
        url: '/store-locator',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.storelocator.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.storelocator.MAIN'
        }
    }).state('app.storelocator.stores', {
        url: '/stores',
        templateUrl: '/bundles/sportclub/js/components/Store/stores.html',
        title: 'content.list.STORES',
        ncyBreadcrumb: {
            label: 'content.list.STORES'
        },
        params: {
            'storesIsFiltersVisible': null,
            'storesPage': null,
            'storesCount': null,
            'storesSorting': null,
            'storesFilter': null
        },
        resolve: loadSequence('StoresCtrl', 'storeService', 'countryService', 'cityService', 'userService')
    }).state('app.storelocator.storesnew', {
        url: '/stores/new',
        templateUrl: '/bundles/sportclub/js/components/Store/store_form.html',
        title: 'content.list.NEWSTORE',
        ncyBreadcrumb: {
            label: 'content.list.NEWSTORE'
        },
        params: {
            'store_country': null,
            'store_city': null
        },
        resolve: loadSequence('StoreFormCtrl', 'storeService', 'countryService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.storelocator.storesedit', {
        url: '/stores/edit/:id',
        templateUrl: '/bundles/sportclub/js/components/Store/store_form.html',
        title: 'content.list.EDITSTORE',
        ncyBreadcrumb: {
            label: 'content.list.EDITSTORE'
        },
        resolve: loadSequence('StoreFormCtrl', 'storeService', 'countryService', 'cityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.storelocator.storesdetails', {
        url: '/stores/details/:id',
        templateUrl: '/bundles/sportclub/js/components/Store/store.html',
        ncyBreadcrumb: {
            label: 'content.list.STOREDETAILS'
        },
        resolve: loadSequence('StoreCtrl', 'storeService')
    });

}]);
