app.constant('APP_JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'LoginCtrl': '/bundles/biodyxpert/js/components/Auth/LoginCtrl.js',
        'LockScreenCtrl': '/bundles/biodyxpert/js/components/Auth/LockScreenCtrl.js',
        'RegisterCtrl': '/bundles/biodyxpert/js/components/Auth/RegisterCtrl.js',
        'EmailConfirmCtrl': '/bundles/biodyxpert/js/components/Auth/EmailConfirmCtrl.js',
        'ResetPasswordCtrl': '/bundles/biodyxpert/js/components/Auth/ResetPasswordCtrl.js',
        'ResetCtrl': '/bundles/biodyxpert/js/components/Auth/ResetCtrl.js',
        'ChangePasswordCtrl': '/bundles/biodyxpert/js/components/Auth/ChangePasswordCtrl.js',
        'ProfileCtrl': '/bundles/biodyxpert/js/components/Auth/ProfileCtrl.js',
        'DashboardCtrl': '/bundles/biodyxpert/js/components/Main/DashboardCtrl.js',
        'ReportingCtrl': '/bundles/biodyxpert/js/components/Reporting/ReportingCtrl.js',
        'AppointmentsCtrl': '/bundles/biodyxpert/js/components/Appointment/AppointmentsCtrl.js',
        'AppointmentFormCtrl': '/bundles/biodyxpert/js/components/Appointment/AppointmentFormCtrl.js',
        'AppointmentCtrl': '/bundles/biodyxpert/js/components/Appointment/AppointmentCtrl.js',
        'AuthorsCtrl': '/bundles/biodyxpert/js/components/Author/AuthorsCtrl.js',
        'AuthorFormCtrl': '/bundles/biodyxpert/js/components/Author/AuthorFormCtrl.js',
        'AuthorCtrl': '/bundles/biodyxpert/js/components/Author/AuthorCtrl.js',
        'CollectionsCtrl': '/bundles/biodyxpert/js/components/Collection/CollectionsCtrl.js',
        'CollectionFormCtrl': '/bundles/biodyxpert/js/components/Collection/CollectionFormCtrl.js',
        'CollectionCtrl': '/bundles/biodyxpert/js/components/Collection/CollectionCtrl.js',
        'CountriesCtrl': '/bundles/biodyxpert/js/components/Country/CountriesCtrl.js',
        'CountryFormCtrl': '/bundles/biodyxpert/js/components/Country/CountryFormCtrl.js',
        'CountryCtrl': '/bundles/biodyxpert/js/components/Country/CountryCtrl.js',
        'DeviceSerialNumbersCtrl': '/bundles/biodyxpert/js/components/DeviceSerialNumber/DeviceSerialNumbersCtrl.js',
        'DeviceSerialNumberFormCtrl': '/bundles/biodyxpert/js/components/DeviceSerialNumber/DeviceSerialNumberFormCtrl.js',
        'DeviceSerialNumberCtrl': '/bundles/biodyxpert/js/components/DeviceSerialNumber/DeviceSerialNumberCtrl.js',
        'UsersCtrl': '/bundles/biodyxpert/js/components/User/UsersCtrl.js',
        'UserFormCtrl': '/bundles/biodyxpert/js/components/User/UserFormCtrl.js',
        'UserCtrl': '/bundles/biodyxpert/js/components/User/UserCtrl.js',
        'DocumentsCtrl': '/bundles/biodyxpert/js/components/Document/DocumentsCtrl.js',
        'DocumentFormCtrl': '/bundles/biodyxpert/js/components/Document/DocumentFormCtrl.js',
        'DocumentCtrl': '/bundles/biodyxpert/js/components/Document/DocumentCtrl.js',
        'DocumentCategoriesCtrl': '/bundles/biodyxpert/js/components/DocumentCategory/DocumentCategoriesCtrl.js',
        'DocumentCategoryFormCtrl': '/bundles/biodyxpert/js/components/DocumentCategory/DocumentCategoryFormCtrl.js',
        'DocumentCategoryCtrl': '/bundles/biodyxpert/js/components/DocumentCategory/DocumentCategoryCtrl.js',
        'DocumentTypesCtrl': '/bundles/biodyxpert/js/components/DocumentType/DocumentTypesCtrl.js',
        'DocumentTypeFormCtrl': '/bundles/biodyxpert/js/components/DocumentType/DocumentTypeFormCtrl.js',
        'DocumentTypeCtrl': '/bundles/biodyxpert/js/components/DocumentType/DocumentTypeCtrl.js',
        'FaqsCtrl': '/bundles/biodyxpert/js/components/Faq/FaqsCtrl.js',
        'FaqFormCtrl': '/bundles/biodyxpert/js/components/Faq/FaqFormCtrl.js',
        'FaqCtrl': '/bundles/biodyxpert/js/components/Faq/FaqCtrl.js',
        'FaqCategoriesCtrl': '/bundles/biodyxpert/js/components/FaqCategory/FaqCategoriesCtrl.js',
        'FaqCategoryFormCtrl': '/bundles/biodyxpert/js/components/FaqCategory/FaqCategoryFormCtrl.js',
        'FaqCategoryCtrl': '/bundles/biodyxpert/js/components/FaqCategory/FaqCategoryCtrl.js',
        'GroupsCtrl': '/bundles/biodyxpert/js/components/Group/GroupsCtrl.js',
        'GroupFormCtrl': '/bundles/biodyxpert/js/components/Group/GroupFormCtrl.js',
        'GroupCtrl': '/bundles/biodyxpert/js/components/Group/GroupCtrl.js',
        'IndicatorsCtrl': '/bundles/biodyxpert/js/components/Indicator/IndicatorsCtrl.js',
        'IndicatorFormCtrl': '/bundles/biodyxpert/js/components/Indicator/IndicatorFormCtrl.js',
        'IndicatorCtrl': '/bundles/biodyxpert/js/components/Indicator/IndicatorCtrl.js',
        'IndicatorTypesCtrl': '/bundles/biodyxpert/js/components/IndicatorType/IndicatorTypesCtrl.js',
        'IndicatorTypeFormCtrl': '/bundles/biodyxpert/js/components/IndicatorType/IndicatorTypeFormCtrl.js',
        'IndicatorTypeCtrl': '/bundles/biodyxpert/js/components/IndicatorType/IndicatorTypeCtrl.js',
        'InstancesCtrl': '/bundles/biodyxpert/js/components/Instance/InstancesCtrl.js',
        'InstanceFormCtrl': '/bundles/biodyxpert/js/components/Instance/InstanceFormCtrl.js',
        'InstanceCtrl': '/bundles/biodyxpert/js/components/Instance/InstanceCtrl.js',
        'LanguagesCtrl': '/bundles/biodyxpert/js/components/Language/LanguagesCtrl.js',
        'LanguageFormCtrl': '/bundles/biodyxpert/js/components/Language/LanguageFormCtrl.js',
        'LanguageCtrl': '/bundles/biodyxpert/js/components/Language/LanguageCtrl.js',
        'LicencesCtrl': '/bundles/biodyxpert/js/components/Licence/LicencesCtrl.js',
        'LicenceFormCtrl': '/bundles/biodyxpert/js/components/Licence/LicenceFormCtrl.js',
        'LicenceCtrl': '/bundles/biodyxpert/js/components/Licence/LicenceCtrl.js',
        'LicenceTypesCtrl': '/bundles/biodyxpert/js/components/LicenceType/LicenceTypesCtrl.js',
        'LicenceTypeFormCtrl': '/bundles/biodyxpert/js/components/LicenceType/LicenceTypeFormCtrl.js',
        'LicenceTypeCtrl': '/bundles/biodyxpert/js/components/LicenceType/LicenceTypeCtrl.js',
        'LogsCtrl': '/bundles/biodyxpert/js/components/Log/LogsCtrl.js',
        'LogFormCtrl': '/bundles/biodyxpert/js/components/Log/LogFormCtrl.js',
        'LogCtrl': '/bundles/biodyxpert/js/components/Log/LogCtrl.js',
        'MeasurementsCtrl': '/bundles/biodyxpert/js/components/Measurement/MeasurementsCtrl.js',
        'MeasurementFormCtrl': '/bundles/biodyxpert/js/components/Measurement/MeasurementFormCtrl.js',
        'MeasurementCtrl': '/bundles/biodyxpert/js/components/Measurement/MeasurementCtrl.js',
        'NotesCtrl': '/bundles/biodyxpert/js/components/Note/NotesCtrl.js',
        'NoteFormCtrl': '/bundles/biodyxpert/js/components/Note/NoteFormCtrl.js',
        'NoteCtrl': '/bundles/biodyxpert/js/components/Note/NoteCtrl.js',
        'NotificationsCtrl': '/bundles/biodyxpert/js/components/Notification/NotificationsCtrl.js',
        'NotificationFormCtrl': '/bundles/biodyxpert/js/components/Notification/NotificationFormCtrl.js',
        'NotificationCtrl': '/bundles/biodyxpert/js/components/Notification/NotificationCtrl.js',
        'PathologiesCtrl': '/bundles/biodyxpert/js/components/Pathology/PathologiesCtrl.js',
        'PathologyFormCtrl': '/bundles/biodyxpert/js/components/Pathology/PathologyFormCtrl.js',
        'PathologyCtrl': '/bundles/biodyxpert/js/components/Pathology/PathologyCtrl.js',
        'PatientsCtrl': '/bundles/biodyxpert/js/components/Patient/PatientsCtrl.js',
        'PatientFormCtrl': '/bundles/biodyxpert/js/components/Patient/PatientFormCtrl.js',
        'PatientCtrl': '/bundles/biodyxpert/js/components/Patient/PatientCtrl.js',
        'PatientDashboardCtrl': '/bundles/biodyxpert/js/components/Patient/PatientDashboardCtrl.js',
        'PatientImportCtrl': '/bundles/biodyxpert/js/components/Patient/PatientImportCtrl.js',
        'PatientExportCtrl': '/bundles/biodyxpert/js/components/Patient/PatientExportCtrl.js',
        'PatientGroupsCtrl': '/bundles/biodyxpert/js/components/PatientGroup/PatientGroupsCtrl.js',
        'PatientGroupFormCtrl': '/bundles/biodyxpert/js/components/PatientGroup/PatientGroupFormCtrl.js',
        'PatientGroupCtrl': '/bundles/biodyxpert/js/components/PatientGroup/PatientGroupCtrl.js',
        'PhysicalActivitiesCtrl': '/bundles/biodyxpert/js/components/PhysicalActivity/PhysicalActivitiesCtrl.js',
        'PhysicalActivityFormCtrl': '/bundles/biodyxpert/js/components/PhysicalActivity/PhysicalActivityFormCtrl.js',
        'PhysicalActivityCtrl': '/bundles/biodyxpert/js/components/PhysicalActivity/PhysicalActivityCtrl.js',
        'SessionsCtrl': '/bundles/biodyxpert/js/components/Session/SessionsCtrl.js',
        'SessionFormCtrl': '/bundles/biodyxpert/js/components/Session/SessionFormCtrl.js',
        'SessionCtrl': '/bundles/biodyxpert/js/components/Session/SessionCtrl.js',
        'TemplatesCtrl': '/bundles/biodyxpert/js/components/Template/TemplatesCtrl.js',
        'TemplateFormCtrl': '/bundles/biodyxpert/js/components/Template/TemplateFormCtrl.js',
        'TemplateCtrl': '/bundles/biodyxpert/js/components/Template/TemplateCtrl.js',
        'TemplateAssignCtrl': '/bundles/biodyxpert/js/components/Template/TemplateAssignCtrl.js',
        'TranslationCountriesCtrl': '/bundles/biodyxpert/js/components/TranslationCountry/TranslationCountriesCtrl.js',
        'TranslationCountryFormCtrl': '/bundles/biodyxpert/js/components/TranslationCountry/TranslationCountryFormCtrl.js',
        'TranslationCountryCtrl': '/bundles/biodyxpert/js/components/TranslationCountry/TranslationCountryCtrl.js',
        'TranslationFaqsCtrl': '/bundles/biodyxpert/js/components/TranslationFaq/TranslationFaqsCtrl.js',
        'TranslationFaqFormCtrl': '/bundles/biodyxpert/js/components/TranslationFaq/TranslationFaqFormCtrl.js',
        'TranslationFaqCtrl': '/bundles/biodyxpert/js/components/TranslationFaq/TranslationFaqCtrl.js',
        'TranslationFaqCategoriesCtrl': '/bundles/biodyxpert/js/components/TranslationFaqCategory/TranslationFaqCategoriesCtrl.js',
        'TranslationFaqCategoryFormCtrl': '/bundles/biodyxpert/js/components/TranslationFaqCategory/TranslationFaqCategoryFormCtrl.js',
        'TranslationFaqCategoryCtrl': '/bundles/biodyxpert/js/components/TranslationFaqCategory/TranslationFaqCategoryCtrl.js',
        'TranslationIndicatorTypesCtrl': '/bundles/biodyxpert/js/components/TranslationIndicatorType/TranslationIndicatorTypesCtrl.js',
        'TranslationIndicatorTypeFormCtrl': '/bundles/biodyxpert/js/components/TranslationIndicatorType/TranslationIndicatorTypeFormCtrl.js',
        'TranslationIndicatorTypeCtrl': '/bundles/biodyxpert/js/components/TranslationIndicatorType/TranslationIndicatorTypeCtrl.js',
        'TranslationPathologiesCtrl': '/bundles/biodyxpert/js/components/TranslationPathology/TranslationPathologiesCtrl.js',
        'TranslationPathologyFormCtrl': '/bundles/biodyxpert/js/components/TranslationPathology/TranslationPathologyFormCtrl.js',
        'TranslationPathologyCtrl': '/bundles/biodyxpert/js/components/TranslationPathology/TranslationPathologyCtrl.js',
        'TranslationPatientGroupsCtrl': '/bundles/biodyxpert/js/components/TranslationPatientGroup/TranslationPatientGroupsCtrl.js',
        'TranslationPatientGroupFormCtrl': '/bundles/biodyxpert/js/components/TranslationPatientGroup/TranslationPatientGroupFormCtrl.js',
        'TranslationPatientGroupCtrl': '/bundles/biodyxpert/js/components/TranslationPatientGroup/TranslationPatientGroupCtrl.js',
        'TranslationPhysicalActivitiesCtrl': '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/TranslationPhysicalActivitiesCtrl.js',
        'TranslationPhysicalActivityFormCtrl': '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityFormCtrl.js',
        'TranslationPhysicalActivityCtrl': '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityCtrl.js',
        'TranslationTemplatesCtrl': '/bundles/biodyxpert/js/components/TranslationTemplate/TranslationTemplatesCtrl.js',
        'TranslationTemplateFormCtrl': '/bundles/biodyxpert/js/components/TranslationTemplate/TranslationTemplateFormCtrl.js',
        'TranslationTemplateCtrl': '/bundles/biodyxpert/js/components/TranslationTemplate/TranslationTemplateCtrl.js',
        'TranslationWordsCtrl': '/bundles/biodyxpert/js/components/TranslationWord/TranslationWordsCtrl.js',
        'TranslationWordFormCtrl': '/bundles/biodyxpert/js/components/TranslationWord/TranslationWordFormCtrl.js',
        'TranslationWordCtrl': '/bundles/biodyxpert/js/components/TranslationWord/TranslationWordCtrl.js',
        'VariablesCtrl': '/bundles/biodyxpert/js/components/Variable/VariablesCtrl.js',
        'VariableFormCtrl': '/bundles/biodyxpert/js/components/Variable/VariableFormCtrl.js',
        'VariableCtrl': '/bundles/biodyxpert/js/components/Variable/VariableCtrl.js',
        'WordsCtrl': '/bundles/biodyxpert/js/components/Word/WordsCtrl.js',
        'WordFormCtrl': '/bundles/biodyxpert/js/components/Word/WordFormCtrl.js',
        'WordCtrl': '/bundles/biodyxpert/js/components/Word/WordCtrl.js'
    },
    modules: [{
        name: 'LoginService',
        files: ['/bundles/biodyxpert/js/components/Auth/LoginService.js']
    },{
        name: 'RegisterService',
        files: ['/bundles/biodyxpert/js/components/Auth/RegisterService.js']
    },{
        name: 'ResetPasswordService',
        files: ['/bundles/biodyxpert/js/components/Auth/ResetPasswordService.js']
    },{
        name: 'ProfileService',
        files: ['/bundles/biodyxpert/js/components/Auth/ProfileService.js']
    },{
        name: 'DashboardService',
        files: ['/bundles/biodyxpert/js/components/Main/DashboardService.js']
    },{
        name: 'ReportingService',
        files: ['/bundles/biodyxpert/js/components/Reporting/ReportingService.js']
    },{
        name: 'appointmentService',
        files: ['/bundles/biodyxpert/js/components/Appointment/AppointmentService.js']
    },{
        name: 'authorService',
        files: ['/bundles/biodyxpert/js/components/Author/AuthorService.js']
    },{
        name: 'collectionService',
        files: ['/bundles/biodyxpert/js/components/Collection/CollectionService.js']
    },{
        name: 'countryService',
        files: ['/bundles/biodyxpert/js/components/Country/CountryService.js']
    },{
        name: 'deviceSerialNumberService',
        files: ['/bundles/biodyxpert/js/components/DeviceSerialNumber/DeviceSerialNumberService.js']
    },{
        name: 'userService',
        files: ['/bundles/biodyxpert/js/components/User/UserService.js']
    },{
        name: 'documentService',
        files: ['/bundles/biodyxpert/js/components/Document/DocumentService.js']
    },{
        name: 'documentCategoryService',
        files: ['/bundles/biodyxpert/js/components/DocumentCategory/DocumentCategoryService.js']
    },{
        name: 'documentTypeService',
        files: ['/bundles/biodyxpert/js/components/DocumentType/DocumentTypeService.js']
    },{
        name: 'faqService',
        files: ['/bundles/biodyxpert/js/components/Faq/FaqService.js']
    },{
        name: 'faqCategoryService',
        files: ['/bundles/biodyxpert/js/components/FaqCategory/FaqCategoryService.js']
    },{
        name: 'groupService',
        files: ['/bundles/biodyxpert/js/components/Group/GroupService.js']
    },{
        name: 'indicatorService',
        files: ['/bundles/biodyxpert/js/components/Indicator/IndicatorService.js']
    },{
        name: 'indicatorTypeService',
        files: ['/bundles/biodyxpert/js/components/IndicatorType/IndicatorTypeService.js']
    },{
        name: 'instanceService',
        files: ['/bundles/biodyxpert/js/components/Instance/InstanceService.js']
    },{
        name: 'languageService',
        files: ['/bundles/biodyxpert/js/components/Language/LanguageService.js']
    },{
        name: 'licenceService',
        files: ['/bundles/biodyxpert/js/components/Licence/LicenceService.js']
    },{
        name: 'licenceTypeService',
        files: ['/bundles/biodyxpert/js/components/LicenceType/LicenceTypeService.js']
    },{
        name: 'logService',
        files: ['/bundles/biodyxpert/js/components/Log/LogService.js']
    },{
        name: 'measurementService',
        files: ['/bundles/biodyxpert/js/components/Measurement/MeasurementService.js']
    },{
        name: 'noteService',
        files: ['/bundles/biodyxpert/js/components/Note/NoteService.js']
    },{
        name: 'notificationService',
        files: ['/bundles/biodyxpert/js/components/Notification/NotificationService.js']
    },{
        name: 'pathologyService',
        files: ['/bundles/biodyxpert/js/components/Pathology/PathologyService.js']
    },{
        name: 'patientService',
        files: ['/bundles/biodyxpert/js/components/Patient/PatientService.js']
    },{
        name: 'PatientImportService',
        files: ['/bundles/biodyxpert/js/components/Patient/PatientImportService.js']
    },{
        name: 'PatientExportService',
        files: ['/bundles/biodyxpert/js/components/Patient/PatientExportService.js']
    },{
        name: 'patientGroupService',
        files: ['/bundles/biodyxpert/js/components/PatientGroup/PatientGroupService.js']
    },{
        name: 'physicalActivityService',
        files: ['/bundles/biodyxpert/js/components/PhysicalActivity/PhysicalActivityService.js']
    },{
        name: 'sessionService',
        files: ['/bundles/biodyxpert/js/components/Session/SessionService.js']
    },{
        name: 'templateService',
        files: ['/bundles/biodyxpert/js/components/Template/TemplateService.js']
    },{
        name: 'TemplateAssignService',
        files: ['/bundles/biodyxpert/js/components/Template/TemplateAssignService.js']
    },{
        name: 'translationCountryService',
        files: ['/bundles/biodyxpert/js/components/TranslationCountry/TranslationCountryService.js']
    },{
        name: 'translationFaqService',
        files: ['/bundles/biodyxpert/js/components/TranslationFaq/TranslationFaqService.js']
    },{
        name: 'translationFaqCategoryService',
        files: ['/bundles/biodyxpert/js/components/TranslationFaqCategory/TranslationFaqCategoryService.js']
    },{
        name: 'translationIndicatorTypeService',
        files: ['/bundles/biodyxpert/js/components/TranslationIndicatorType/TranslationIndicatorTypeService.js']
    },{
        name: 'translationPathologyService',
        files: ['/bundles/biodyxpert/js/components/TranslationPathology/TranslationPathologyService.js']
    },{
        name: 'translationPatientGroupService',
        files: ['/bundles/biodyxpert/js/components/TranslationPatientGroup/TranslationPatientGroupService.js']
    },{
        name: 'translationPhysicalActivityService',
        files: ['/bundles/biodyxpert/js/components/TranslationPhysicalActivity/TranslationPhysicalActivityService.js']
    },{
        name: 'translationTemplateService',
        files: ['/bundles/biodyxpert/js/components/TranslationTemplate/TranslationTemplateService.js']
    },{
        name: 'translationWordService',
        files: ['/bundles/biodyxpert/js/components/TranslationWord/TranslationWordService.js']
    },{
        name: 'variableService',
        files: ['/bundles/biodyxpert/js/components/Variable/VariableService.js']
    },{
        name: 'wordService',
        files: ['/bundles/biodyxpert/js/components/Word/WordService.js']
    }]
});
