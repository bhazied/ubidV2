
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/login.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/register.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/reset_password.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/email_confirm.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/reset.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/lock_screen.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/biodyxpert/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/biodyxpert/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('DashboardCtrl', 'DashboardService')
    }).state('app.reporting', {
        url: '/reporting',
        templateUrl: '/bundles/biodyxpert/js/components/Reporting/reporting.html',
        title: 'content.list.REPORTING',
        ncyBreadcrumb: {
            label: 'content.list.REPORTING'
        },
        resolve: loadSequence('ReportingCtrl', 'ReportingService')
    }).state('app.patientmanager', {
        url: '/patient-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.patientmanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.patientmanager.MAIN'
        }
    }).state('app.patientmanager.patients', {
        url: '/patients',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patients.html',
        title: 'content.list.PATIENTS',
        ncyBreadcrumb: {
            label: 'content.list.PATIENTS'
        },
        params: {
            'patientsIsFiltersVisible': null,
            'patientsPage': null,
            'patientsCount': null,
            'patientsSorting': null,
            'patientsFilter': null
        },
        resolve: loadSequence('PatientsCtrl', 'patientService', 'countryService', 'physicalActivityService', 'pathologyService', 'templateService', 'userService', 'patientGroupService')
    }).state('app.patientmanager.patientsnew', {
        url: '/patients/new',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient_form.html',
        title: 'content.list.NEWPATIENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWPATIENT'
        },
        params: {
            'patient_country': null,
            'patient_physical_activity': null,
            'patient_primary_pathology': null,
            'patient_secondary_pathology': null,
            'patient_template': null,
            'patient_temporary_template': null
        },
        resolve: loadSequence('PatientFormCtrl', 'patientService', 'countryService', 'physicalActivityService', 'pathologyService', 'templateService', 'userService', 'patientGroupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.patientsedit', {
        url: '/patients/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient_form.html',
        title: 'content.list.EDITPATIENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITPATIENT'
        },
        resolve: loadSequence('PatientFormCtrl', 'patientService', 'countryService', 'physicalActivityService', 'pathologyService', 'templateService', 'userService', 'patientGroupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.patientsdetails', {
        url: '/patients/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient.html',
        ncyBreadcrumb: {
            label: 'content.list.PATIENTDETAILS'
        },
        resolve: loadSequence('PatientCtrl', 'patientService')
    }).state('app.patientmanager.patientsdashboard', {
        url: '/patients/dashboard/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient_dashboard.html',
        ncyBreadcrumb: {
            label: 'content.list.PATIENTDASHBOARD'
        },
        resolve: loadSequence('PatientDashboardCtrl', 'measurementService', 'indicatorService', 'indicatorTypeService', 'templateService', 'patientService')
    }).state('app.patientmanager.patientsimport', {
        url: '/patients/import',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient_import.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPORTPATIENTS'
        },
        resolve: loadSequence('PatientImportCtrl', 'PatientImportService', 'patientService', 'touchspin-plugin', 'countryService', 'physicalActivityService', 'pathologyService', 'templateService', 'userService')
    }).state('app.patientmanager.patientsexport', {
        url: '/patients/export',
        templateUrl: '/bundles/biodyxpert/js/components/Patient/patient_export.html',
        ncyBreadcrumb: {
            label: 'content.list.IMPORTPATIENTS'
        },
        resolve: loadSequence('PatientExportCtrl', 'PatientExportService', 'patientService', 'countryService', 'physicalActivityService', 'pathologyService', 'templateService', 'userService')
    }).state('app.patientmanager.measurements', {
        url: '/measurements',
        templateUrl: '/bundles/biodyxpert/js/components/Measurement/measurements.html',
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
        resolve: loadSequence('MeasurementsCtrl', 'measurementService', 'patientService', 'physicalActivityService', 'userService')
    }).state('app.patientmanager.measurementsnew', {
        url: '/measurements/new',
        templateUrl: '/bundles/biodyxpert/js/components/Measurement/measurement_form.html',
        title: 'content.list.NEWMEASUREMENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWMEASUREMENT'
        },
        params: {
            'measurement_patient': null,
            'measurement_physical_activity': null
        },
        resolve: loadSequence('MeasurementFormCtrl', 'measurementService', 'patientService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.measurementsedit', {
        url: '/measurements/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Measurement/measurement_form.html',
        title: 'content.list.EDITMEASUREMENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITMEASUREMENT'
        },
        resolve: loadSequence('MeasurementFormCtrl', 'measurementService', 'patientService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.measurementsdetails', {
        url: '/measurements/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Measurement/measurement_custom.html',
        ncyBreadcrumb: {
            label: 'content.list.MEASUREMENTDETAILS'
        },
        resolve: loadSequence('MeasurementCtrl', 'measurementService')
    }).state('app.patientmanager.patientgroups', {
        url: '/patient-groups',
        templateUrl: '/bundles/biodyxpert/js/components/PatientGroup/patient_groups.html',
        title: 'content.list.PATIENTGROUPS',
        ncyBreadcrumb: {
            label: 'content.list.PATIENTGROUPS'
        },
        params: {
            'patientGroupsIsFiltersVisible': null,
            'patientGroupsPage': null,
            'patientGroupsCount': null,
            'patientGroupsSorting': null,
            'patientGroupsFilter': null
        },
        resolve: loadSequence('PatientGroupsCtrl', 'patientGroupService', 'userService')
    }).state('app.patientmanager.patientgroupsnew', {
        url: '/patient-groups/new',
        templateUrl: '/bundles/biodyxpert/js/components/PatientGroup/patient_group_form.html',
        title: 'content.list.NEWPATIENTGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWPATIENTGROUP'
        },
        params: {
        },
        resolve: loadSequence('PatientGroupFormCtrl', 'patientGroupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.patientgroupsedit', {
        url: '/patient-groups/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/PatientGroup/patient_group_form.html',
        title: 'content.list.EDITPATIENTGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITPATIENTGROUP'
        },
        resolve: loadSequence('PatientGroupFormCtrl', 'patientGroupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.patientgroupsdetails', {
        url: '/patient-groups/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/PatientGroup/patient_group.html',
        ncyBreadcrumb: {
            label: 'content.list.PATIENTGROUPDETAILS'
        },
        resolve: loadSequence('PatientGroupCtrl', 'patientGroupService')
    }).state('app.patientmanager.appointments', {
        url: '/appointments',
        templateUrl: '/bundles/biodyxpert/js/components/Appointment/appointments.html',
        title: 'content.list.APPOINTMENTS',
        ncyBreadcrumb: {
            label: 'content.list.APPOINTMENTS'
        },
        params: {
            'appointmentsIsFiltersVisible': null,
            'appointmentsPage': null,
            'appointmentsCount': null,
            'appointmentsSorting': null,
            'appointmentsFilter': null
        },
        resolve: loadSequence('AppointmentsCtrl', 'appointmentService', 'patientService', 'userService')
    }).state('app.patientmanager.appointmentsnew', {
        url: '/appointments/new',
        templateUrl: '/bundles/biodyxpert/js/components/Appointment/appointment_form.html',
        title: 'content.list.NEWAPPOINTMENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWAPPOINTMENT'
        },
        params: {
            'appointment_patient': null
        },
        resolve: loadSequence('AppointmentFormCtrl', 'appointmentService', 'patientService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.appointmentsedit', {
        url: '/appointments/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Appointment/appointment_form.html',
        title: 'content.list.EDITAPPOINTMENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITAPPOINTMENT'
        },
        resolve: loadSequence('AppointmentFormCtrl', 'appointmentService', 'patientService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.appointmentsdetails', {
        url: '/appointments/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Appointment/appointment.html',
        ncyBreadcrumb: {
            label: 'content.list.APPOINTMENTDETAILS'
        },
        resolve: loadSequence('AppointmentCtrl', 'appointmentService')
    }).state('app.patientmanager.notes', {
        url: '/notes',
        templateUrl: '/bundles/biodyxpert/js/components/Note/notes.html',
        title: 'content.list.NOTES',
        ncyBreadcrumb: {
            label: 'content.list.NOTES'
        },
        params: {
            'notesIsFiltersVisible': null,
            'notesPage': null,
            'notesCount': null,
            'notesSorting': null,
            'notesFilter': null
        },
        resolve: loadSequence('NotesCtrl', 'noteService', 'patientService', 'userService')
    }).state('app.patientmanager.notesnew', {
        url: '/notes/new',
        templateUrl: '/bundles/biodyxpert/js/components/Note/note_form.html',
        title: 'content.list.NEWNOTE',
        ncyBreadcrumb: {
            label: 'content.list.NEWNOTE'
        },
        params: {
            'note_patient': null
        },
        resolve: loadSequence('NoteFormCtrl', 'noteService', 'patientService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.notesedit', {
        url: '/notes/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Note/note_form.html',
        title: 'content.list.EDITNOTE',
        ncyBreadcrumb: {
            label: 'content.list.EDITNOTE'
        },
        resolve: loadSequence('NoteFormCtrl', 'noteService', 'patientService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.patientmanager.notesdetails', {
        url: '/notes/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Note/note.html',
        ncyBreadcrumb: {
            label: 'content.list.NOTEDETAILS'
        },
        resolve: loadSequence('NoteCtrl', 'noteService')
    }).state('app.documentmanager', {
        url: '/document-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.documentmanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.documentmanager.MAIN'
        }
    }).state('app.documentmanager.documents', {
        url: '/documents',
        templateUrl: '/bundles/biodyxpert/js/components/Document/documents.html',
        title: 'content.list.DOCUMENTS',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTS'
        },
        params: {
            'documentsIsFiltersVisible': null,
            'documentsPage': null,
            'documentsCount': null,
            'documentsSorting': null,
            'documentsFilter': null
        },
        resolve: loadSequence('DocumentsCtrl', 'documentService', 'documentTypeService', 'authorService', 'collectionService', 'userService', 'documentCategoryService')
    }).state('app.documentmanager.documentsnew', {
        url: '/documents/new',
        templateUrl: '/bundles/biodyxpert/js/components/Document/document_form.html',
        title: 'content.list.NEWDOCUMENT',
        ncyBreadcrumb: {
            label: 'content.list.NEWDOCUMENT'
        },
        params: {
            'document_document_type': null,
            'document_author': null,
            'document_collection': null
        },
        resolve: loadSequence('DocumentFormCtrl', 'documentService', 'documentTypeService', 'authorService', 'collectionService', 'userService', 'documentCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documentsedit', {
        url: '/documents/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Document/document_form.html',
        title: 'content.list.EDITDOCUMENT',
        ncyBreadcrumb: {
            label: 'content.list.EDITDOCUMENT'
        },
        resolve: loadSequence('DocumentFormCtrl', 'documentService', 'documentTypeService', 'authorService', 'collectionService', 'userService', 'documentCategoryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documentsdetails', {
        url: '/documents/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Document/document.html',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTDETAILS'
        },
        resolve: loadSequence('DocumentCtrl', 'documentService')
    }).state('app.documentmanager.documentcategories', {
        url: '/document-categories',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentCategory/document_categories.html',
        title: 'content.list.DOCUMENTCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTCATEGORIES'
        },
        params: {
            'documentCategoriesIsFiltersVisible': null,
            'documentCategoriesPage': null,
            'documentCategoriesCount': null,
            'documentCategoriesSorting': null,
            'documentCategoriesFilter': null
        },
        resolve: loadSequence('DocumentCategoriesCtrl', 'documentCategoryService', 'documentTypeService', 'userService')
    }).state('app.documentmanager.documentcategoriesnew', {
        url: '/document-categories/new',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentCategory/document_category_form.html',
        title: 'content.list.NEWDOCUMENTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWDOCUMENTCATEGORY'
        },
        params: {
            'document_category_parent': null,
            'document_category_document_type': null
        },
        resolve: loadSequence('DocumentCategoryFormCtrl', 'documentCategoryService', 'documentTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documentcategoriesedit', {
        url: '/document-categories/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentCategory/document_category_form.html',
        title: 'content.list.EDITDOCUMENTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITDOCUMENTCATEGORY'
        },
        resolve: loadSequence('DocumentCategoryFormCtrl', 'documentCategoryService', 'documentTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documentcategoriesdetails', {
        url: '/document-categories/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentCategory/document_category.html',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTCATEGORYDETAILS'
        },
        resolve: loadSequence('DocumentCategoryCtrl', 'documentCategoryService')
    }).state('app.documentmanager.documenttypes', {
        url: '/document-types',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentType/document_types.html',
        title: 'content.list.DOCUMENTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTTYPES'
        },
        params: {
            'documentTypesIsFiltersVisible': null,
            'documentTypesPage': null,
            'documentTypesCount': null,
            'documentTypesSorting': null,
            'documentTypesFilter': null
        },
        resolve: loadSequence('DocumentTypesCtrl', 'documentTypeService', 'userService')
    }).state('app.documentmanager.documenttypesnew', {
        url: '/document-types/new',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentType/document_type_form.html',
        title: 'content.list.NEWDOCUMENTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWDOCUMENTTYPE'
        },
        params: {
        },
        resolve: loadSequence('DocumentTypeFormCtrl', 'documentTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documenttypesedit', {
        url: '/document-types/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentType/document_type_form.html',
        title: 'content.list.EDITDOCUMENTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITDOCUMENTTYPE'
        },
        resolve: loadSequence('DocumentTypeFormCtrl', 'documentTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.documenttypesdetails', {
        url: '/document-types/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DocumentType/document_type.html',
        ncyBreadcrumb: {
            label: 'content.list.DOCUMENTTYPEDETAILS'
        },
        resolve: loadSequence('DocumentTypeCtrl', 'documentTypeService')
    }).state('app.documentmanager.authors', {
        url: '/authors',
        templateUrl: '/bundles/biodyxpert/js/components/Author/authors.html',
        title: 'content.list.AUTHORS',
        ncyBreadcrumb: {
            label: 'content.list.AUTHORS'
        },
        params: {
            'authorsIsFiltersVisible': null,
            'authorsPage': null,
            'authorsCount': null,
            'authorsSorting': null,
            'authorsFilter': null
        },
        resolve: loadSequence('AuthorsCtrl', 'authorService', 'userService')
    }).state('app.documentmanager.authorsnew', {
        url: '/authors/new',
        templateUrl: '/bundles/biodyxpert/js/components/Author/author_form.html',
        title: 'content.list.NEWAUTHOR',
        ncyBreadcrumb: {
            label: 'content.list.NEWAUTHOR'
        },
        params: {
        },
        resolve: loadSequence('AuthorFormCtrl', 'authorService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.authorsedit', {
        url: '/authors/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Author/author_form.html',
        title: 'content.list.EDITAUTHOR',
        ncyBreadcrumb: {
            label: 'content.list.EDITAUTHOR'
        },
        resolve: loadSequence('AuthorFormCtrl', 'authorService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.authorsdetails', {
        url: '/authors/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Author/author.html',
        ncyBreadcrumb: {
            label: 'content.list.AUTHORDETAILS'
        },
        resolve: loadSequence('AuthorCtrl', 'authorService')
    }).state('app.documentmanager.collections', {
        url: '/collections',
        templateUrl: '/bundles/biodyxpert/js/components/Collection/collections.html',
        title: 'content.list.COLLECTIONS',
        ncyBreadcrumb: {
            label: 'content.list.COLLECTIONS'
        },
        params: {
            'collectionsIsFiltersVisible': null,
            'collectionsPage': null,
            'collectionsCount': null,
            'collectionsSorting': null,
            'collectionsFilter': null
        },
        resolve: loadSequence('CollectionsCtrl', 'collectionService', 'userService')
    }).state('app.documentmanager.collectionsnew', {
        url: '/collections/new',
        templateUrl: '/bundles/biodyxpert/js/components/Collection/collection_form.html',
        title: 'content.list.NEWCOLLECTION',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOLLECTION'
        },
        params: {
        },
        resolve: loadSequence('CollectionFormCtrl', 'collectionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.collectionsedit', {
        url: '/collections/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Collection/collection_form.html',
        title: 'content.list.EDITCOLLECTION',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOLLECTION'
        },
        resolve: loadSequence('CollectionFormCtrl', 'collectionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.documentmanager.collectionsdetails', {
        url: '/collections/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Collection/collection.html',
        ncyBreadcrumb: {
            label: 'content.list.COLLECTIONDETAILS'
        },
        resolve: loadSequence('CollectionCtrl', 'collectionService')
    }).state('app.systemsettings', {
        url: '/system-settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.systemsettings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.systemsettings.MAIN'
        }
    }).state('app.systemsettings.instances', {
        url: '/instances',
        templateUrl: '/bundles/biodyxpert/js/components/Instance/instances.html',
        title: 'content.list.INSTANCES',
        ncyBreadcrumb: {
            label: 'content.list.INSTANCES'
        },
        params: {
            'instancesIsFiltersVisible': null,
            'instancesPage': null,
            'instancesCount': null,
            'instancesSorting': null,
            'instancesFilter': null
        },
        resolve: loadSequence('InstancesCtrl', 'instanceService', 'userService')
    }).state('app.systemsettings.instancesnew', {
        url: '/instances/new',
        templateUrl: '/bundles/biodyxpert/js/components/Instance/instance_form.html',
        title: 'content.list.NEWINSTANCE',
        ncyBreadcrumb: {
            label: 'content.list.NEWINSTANCE'
        },
        params: {
        },
        resolve: loadSequence('InstanceFormCtrl', 'instanceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.instancesedit', {
        url: '/instances/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Instance/instance_form.html',
        title: 'content.list.EDITINSTANCE',
        ncyBreadcrumb: {
            label: 'content.list.EDITINSTANCE'
        },
        resolve: loadSequence('InstanceFormCtrl', 'instanceService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.instancesdetails', {
        url: '/instances/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Instance/instance.html',
        ncyBreadcrumb: {
            label: 'content.list.INSTANCEDETAILS'
        },
        resolve: loadSequence('InstanceCtrl', 'instanceService')
    }).state('app.systemsettings.pathologies', {
        url: '/pathologies',
        templateUrl: '/bundles/biodyxpert/js/components/Pathology/pathologies.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Pathology/pathology_form.html',
        title: 'content.list.NEWPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPATHOLOGY'
        },
        params: {
        },
        resolve: loadSequence('PathologyFormCtrl', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.pathologiesedit', {
        url: '/pathologies/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Pathology/pathology_form.html',
        title: 'content.list.EDITPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPATHOLOGY'
        },
        resolve: loadSequence('PathologyFormCtrl', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.pathologiesdetails', {
        url: '/pathologies/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Pathology/pathology.html',
        ncyBreadcrumb: {
            label: 'content.list.PATHOLOGYDETAILS'
        },
        resolve: loadSequence('PathologyCtrl', 'pathologyService')
    }).state('app.systemsettings.physicalactivities', {
        url: '/physical-activities',
        templateUrl: '/bundles/biodyxpert/js/components/PhysicalActivity/physical_activities.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/PhysicalActivity/physical_activity_form.html',
        title: 'content.list.NEWPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPHYSICALACTIVITY'
        },
        params: {
        },
        resolve: loadSequence('PhysicalActivityFormCtrl', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.physicalactivitiesedit', {
        url: '/physical-activities/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/PhysicalActivity/physical_activity_form.html',
        title: 'content.list.EDITPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPHYSICALACTIVITY'
        },
        resolve: loadSequence('PhysicalActivityFormCtrl', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.physicalactivitiesdetails', {
        url: '/physical-activities/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/PhysicalActivity/physical_activity.html',
        ncyBreadcrumb: {
            label: 'content.list.PHYSICALACTIVITYDETAILS'
        },
        resolve: loadSequence('PhysicalActivityCtrl', 'physicalActivityService')
    }).state('app.systemsettings.countries', {
        url: '/countries',
        templateUrl: '/bundles/biodyxpert/js/components/Country/countries.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        params: {
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('CountryFormCtrl', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.systemsettings.variables', {
        url: '/variables',
        templateUrl: '/bundles/biodyxpert/js/components/Variable/variables.html',
        title: 'content.list.VARIABLES',
        ncyBreadcrumb: {
            label: 'content.list.VARIABLES'
        },
        params: {
            'variablesIsFiltersVisible': null,
            'variablesPage': null,
            'variablesCount': null,
            'variablesSorting': null,
            'variablesFilter': null
        },
        resolve: loadSequence('VariablesCtrl', 'variableService', 'userService')
    }).state('app.systemsettings.variablesnew', {
        url: '/variables/new',
        templateUrl: '/bundles/biodyxpert/js/components/Variable/variable_form.html',
        title: 'content.list.NEWVARIABLE',
        ncyBreadcrumb: {
            label: 'content.list.NEWVARIABLE'
        },
        params: {
        },
        resolve: loadSequence('VariableFormCtrl', 'variableService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.variablesedit', {
        url: '/variables/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Variable/variable_form.html',
        title: 'content.list.EDITVARIABLE',
        ncyBreadcrumb: {
            label: 'content.list.EDITVARIABLE'
        },
        resolve: loadSequence('VariableFormCtrl', 'variableService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.systemsettings.variablesdetails', {
        url: '/variables/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Variable/variable.html',
        ncyBreadcrumb: {
            label: 'content.list.VARIABLEDETAILS'
        },
        resolve: loadSequence('VariableCtrl', 'variableService')
    }).state('app.licencemanager', {
        url: '/licence-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.licencemanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.licencemanager.MAIN'
        }
    }).state('app.licencemanager.licences', {
        url: '/licences',
        templateUrl: '/bundles/biodyxpert/js/components/Licence/licences.html',
        title: 'content.list.LICENCES',
        ncyBreadcrumb: {
            label: 'content.list.LICENCES'
        },
        params: {
            'licencesIsFiltersVisible': null,
            'licencesPage': null,
            'licencesCount': null,
            'licencesSorting': null,
            'licencesFilter': null
        },
        resolve: loadSequence('LicencesCtrl', 'licenceService', 'licenceTypeService', 'userService')
    }).state('app.licencemanager.licencesnew', {
        url: '/licences/new',
        templateUrl: '/bundles/biodyxpert/js/components/Licence/licence_form.html',
        title: 'content.list.NEWLICENCE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLICENCE'
        },
        params: {
            'licence_licence_type': null,
            'licence_used_by_user': null
        },
        resolve: loadSequence('LicenceFormCtrl', 'licenceService', 'licenceTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.licencesedit', {
        url: '/licences/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Licence/licence_form.html',
        title: 'content.list.EDITLICENCE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLICENCE'
        },
        resolve: loadSequence('LicenceFormCtrl', 'licenceService', 'licenceTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.licencesdetails', {
        url: '/licences/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Licence/licence.html',
        ncyBreadcrumb: {
            label: 'content.list.LICENCEDETAILS'
        },
        resolve: loadSequence('LicenceCtrl', 'licenceService')
    }).state('app.licencemanager.deviceserialnumbers', {
        url: '/device-serial-numbers',
        templateUrl: '/bundles/biodyxpert/js/components/DeviceSerialNumber/device_serial_numbers.html',
        title: 'content.list.DEVICESERIALNUMBERS',
        ncyBreadcrumb: {
            label: 'content.list.DEVICESERIALNUMBERS'
        },
        params: {
            'deviceSerialNumbersIsFiltersVisible': null,
            'deviceSerialNumbersPage': null,
            'deviceSerialNumbersCount': null,
            'deviceSerialNumbersSorting': null,
            'deviceSerialNumbersFilter': null
        },
        resolve: loadSequence('DeviceSerialNumbersCtrl', 'deviceSerialNumberService', 'licenceService', 'userService', 'userService')
    }).state('app.licencemanager.deviceserialnumbersnew', {
        url: '/device-serial-numbers/new',
        templateUrl: '/bundles/biodyxpert/js/components/DeviceSerialNumber/device_serial_number_form.html',
        title: 'content.list.NEWDEVICESERIALNUMBER',
        ncyBreadcrumb: {
            label: 'content.list.NEWDEVICESERIALNUMBER'
        },
        params: {
            'device_serial_number_licence': null
        },
        resolve: loadSequence('DeviceSerialNumberFormCtrl', 'deviceSerialNumberService', 'licenceService', 'userService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.deviceserialnumbersedit', {
        url: '/device-serial-numbers/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DeviceSerialNumber/device_serial_number_form.html',
        title: 'content.list.EDITDEVICESERIALNUMBER',
        ncyBreadcrumb: {
            label: 'content.list.EDITDEVICESERIALNUMBER'
        },
        resolve: loadSequence('DeviceSerialNumberFormCtrl', 'deviceSerialNumberService', 'licenceService', 'userService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.deviceserialnumbersdetails', {
        url: '/device-serial-numbers/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/DeviceSerialNumber/device_serial_number.html',
        ncyBreadcrumb: {
            label: 'content.list.DEVICESERIALNUMBERDETAILS'
        },
        resolve: loadSequence('DeviceSerialNumberCtrl', 'deviceSerialNumberService')
    }).state('app.licencemanager.licencetypes', {
        url: '/licence-types',
        templateUrl: '/bundles/biodyxpert/js/components/LicenceType/licence_types.html',
        title: 'content.list.LICENCETYPES',
        ncyBreadcrumb: {
            label: 'content.list.LICENCETYPES'
        },
        params: {
            'licenceTypesIsFiltersVisible': null,
            'licenceTypesPage': null,
            'licenceTypesCount': null,
            'licenceTypesSorting': null,
            'licenceTypesFilter': null
        },
        resolve: loadSequence('LicenceTypesCtrl', 'licenceTypeService', 'templateService', 'userService', 'indicatorTypeService')
    }).state('app.licencemanager.licencetypesnew', {
        url: '/licence-types/new',
        templateUrl: '/bundles/biodyxpert/js/components/LicenceType/licence_type_form.html',
        title: 'content.list.NEWLICENCETYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLICENCETYPE'
        },
        params: {
            'licence_type_default_template': null
        },
        resolve: loadSequence('LicenceTypeFormCtrl', 'licenceTypeService', 'templateService', 'userService', 'indicatorTypeService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.licencetypesedit', {
        url: '/licence-types/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/LicenceType/licence_type_form.html',
        title: 'content.list.EDITLICENCETYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLICENCETYPE'
        },
        resolve: loadSequence('LicenceTypeFormCtrl', 'licenceTypeService', 'templateService', 'userService', 'indicatorTypeService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.licencemanager.licencetypesdetails', {
        url: '/licence-types/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/LicenceType/licence_type.html',
        ncyBreadcrumb: {
            label: 'content.list.LICENCETYPEDETAILS'
        },
        resolve: loadSequence('LicenceTypeCtrl', 'licenceTypeService')
    }).state('app.accesscontrol', {
        url: '/access-control',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.accesscontrol.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.accesscontrol.MAIN'
        }
    }).state('app.accesscontrol.users', {
        url: '/users',
        templateUrl: '/bundles/biodyxpert/js/components/User/users.html',
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
        resolve: loadSequence('UsersCtrl', 'userService', 'countryService', 'licenceService', 'deviceSerialNumberService', 'languageService', 'groupService')
    }).state('app.accesscontrol.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/biodyxpert/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        params: {
            'user_country': null,
            'user_licence': null,
            'user_device_serial_number': null,
            'user_language': null
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'countryService', 'licenceService', 'deviceSerialNumberService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('UserFormCtrl', 'userService', 'countryService', 'licenceService', 'deviceSerialNumberService', 'languageService', 'groupService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.accesscontrol.groups', {
        url: '/groups',
        templateUrl: '/bundles/biodyxpert/js/components/Group/groups.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Group/group_form.html',
        title: 'content.list.NEWGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWGROUP'
        },
        params: {
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.groupsedit', {
        url: '/groups/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Group/group_form.html',
        title: 'content.list.EDITGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITGROUP'
        },
        resolve: loadSequence('GroupFormCtrl', 'groupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.groupsdetails', {
        url: '/groups/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Group/group.html',
        ncyBreadcrumb: {
            label: 'content.list.GROUPDETAILS'
        },
        resolve: loadSequence('GroupCtrl', 'groupService')
    }).state('app.accesscontrol.sessions', {
        url: '/sessions',
        templateUrl: '/bundles/biodyxpert/js/components/Session/sessions.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Session/session_form.html',
        title: 'content.list.NEWSESSION',
        ncyBreadcrumb: {
            label: 'content.list.NEWSESSION'
        },
        params: {
        },
        resolve: loadSequence('SessionFormCtrl', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.sessionsedit', {
        url: '/sessions/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Session/session_form.html',
        title: 'content.list.EDITSESSION',
        ncyBreadcrumb: {
            label: 'content.list.EDITSESSION'
        },
        resolve: loadSequence('SessionFormCtrl', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.sessionsdetails', {
        url: '/sessions/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Session/session.html',
        ncyBreadcrumb: {
            label: 'content.list.SESSIONDETAILS'
        },
        resolve: loadSequence('SessionCtrl', 'sessionService')
    }).state('app.accesscontrol.logs', {
        url: '/logs',
        templateUrl: '/bundles/biodyxpert/js/components/Log/logs.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Log/log_form.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Log/log_form.html',
        title: 'content.list.EDITLOG',
        ncyBreadcrumb: {
            label: 'content.list.EDITLOG'
        },
        resolve: loadSequence('LogFormCtrl', 'logService', 'sessionService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.logsdetails', {
        url: '/logs/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Log/log.html',
        ncyBreadcrumb: {
            label: 'content.list.LOGDETAILS'
        },
        resolve: loadSequence('LogCtrl', 'logService')
    }).state('app.accesscontrol.notifications', {
        url: '/notifications',
        templateUrl: '/bundles/biodyxpert/js/components/Notification/notifications.html',
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
    }).state('app.accesscontrol.notificationsnew', {
        url: '/notifications/new',
        templateUrl: '/bundles/biodyxpert/js/components/Notification/notification_form.html',
        title: 'content.list.NEWNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWNOTIFICATION'
        },
        params: {
        },
        resolve: loadSequence('NotificationFormCtrl', 'notificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.notificationsedit', {
        url: '/notifications/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Notification/notification_form.html',
        title: 'content.list.EDITNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITNOTIFICATION'
        },
        resolve: loadSequence('NotificationFormCtrl', 'notificationService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.accesscontrol.notificationsdetails', {
        url: '/notifications/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Notification/notification.html',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONDETAILS'
        },
        resolve: loadSequence('NotificationCtrl', 'notificationService')
    }).state('app.faqmanager', {
        url: '/faq-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.faqmanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.faqmanager.MAIN'
        }
    }).state('app.faqmanager.faqs', {
        url: '/faqs',
        templateUrl: '/bundles/biodyxpert/js/components/Faq/faqs.html',
        title: 'content.list.FAQS',
        ncyBreadcrumb: {
            label: 'content.list.FAQS'
        },
        params: {
            'faqsIsFiltersVisible': null,
            'faqsPage': null,
            'faqsCount': null,
            'faqsSorting': null,
            'faqsFilter': null
        },
        resolve: loadSequence('FaqsCtrl', 'faqService', 'faqCategoryService', 'userService')
    }).state('app.faqmanager.faqsnew', {
        url: '/faqs/new',
        templateUrl: '/bundles/biodyxpert/js/components/Faq/faq_form.html',
        title: 'content.list.NEWFAQ',
        ncyBreadcrumb: {
            label: 'content.list.NEWFAQ'
        },
        params: {
            'faq_faq_category': null
        },
        resolve: loadSequence('FaqFormCtrl', 'faqService', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.faqmanager.faqsedit', {
        url: '/faqs/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Faq/faq_form.html',
        title: 'content.list.EDITFAQ',
        ncyBreadcrumb: {
            label: 'content.list.EDITFAQ'
        },
        resolve: loadSequence('FaqFormCtrl', 'faqService', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.faqmanager.faqsdetails', {
        url: '/faqs/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Faq/faq.html',
        ncyBreadcrumb: {
            label: 'content.list.FAQDETAILS'
        },
        resolve: loadSequence('FaqCtrl', 'faqService')
    }).state('app.faqmanager.faqcategories', {
        url: '/faq-categories',
        templateUrl: '/bundles/biodyxpert/js/components/FaqCategory/faq_categories.html',
        title: 'content.list.FAQCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.FAQCATEGORIES'
        },
        params: {
            'faqCategoriesIsFiltersVisible': null,
            'faqCategoriesPage': null,
            'faqCategoriesCount': null,
            'faqCategoriesSorting': null,
            'faqCategoriesFilter': null
        },
        resolve: loadSequence('FaqCategoriesCtrl', 'faqCategoryService', 'userService')
    }).state('app.faqmanager.faqcategoriesnew', {
        url: '/faq-categories/new',
        templateUrl: '/bundles/biodyxpert/js/components/FaqCategory/faq_category_form.html',
        title: 'content.list.NEWFAQCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWFAQCATEGORY'
        },
        params: {
        },
        resolve: loadSequence('FaqCategoryFormCtrl', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.faqmanager.faqcategoriesedit', {
        url: '/faq-categories/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/FaqCategory/faq_category_form.html',
        title: 'content.list.EDITFAQCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITFAQCATEGORY'
        },
        resolve: loadSequence('FaqCategoryFormCtrl', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.faqmanager.faqcategoriesdetails', {
        url: '/faq-categories/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/FaqCategory/faq_category.html',
        ncyBreadcrumb: {
            label: 'content.list.FAQCATEGORYDETAILS'
        },
        resolve: loadSequence('FaqCategoryCtrl', 'faqCategoryService')
    }).state('app.templatemanager', {
        url: '/template-manager',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.templatemanager.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.templatemanager.MAIN'
        }
    }).state('app.templatemanager.indicatortypes', {
        url: '/indicator-types',
        templateUrl: '/bundles/biodyxpert/js/components/IndicatorType/indicator_types.html',
        title: 'content.list.INDICATORTYPES',
        ncyBreadcrumb: {
            label: 'content.list.INDICATORTYPES'
        },
        params: {
            'indicatorTypesIsFiltersVisible': null,
            'indicatorTypesPage': null,
            'indicatorTypesCount': null,
            'indicatorTypesSorting': null,
            'indicatorTypesFilter': null
        },
        resolve: loadSequence('IndicatorTypesCtrl', 'indicatorTypeService', 'userService')
    }).state('app.templatemanager.indicatortypesnew', {
        url: '/indicator-types/new',
        templateUrl: '/bundles/biodyxpert/js/components/IndicatorType/indicator_type_form.html',
        title: 'content.list.NEWINDICATORTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWINDICATORTYPE'
        },
        params: {
        },
        resolve: loadSequence('IndicatorTypeFormCtrl', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.indicatortypesedit', {
        url: '/indicator-types/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/IndicatorType/indicator_type_form.html',
        title: 'content.list.EDITINDICATORTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITINDICATORTYPE'
        },
        resolve: loadSequence('IndicatorTypeFormCtrl', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.indicatortypesdetails', {
        url: '/indicator-types/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/IndicatorType/indicator_type.html',
        ncyBreadcrumb: {
            label: 'content.list.INDICATORTYPEDETAILS'
        },
        resolve: loadSequence('IndicatorTypeCtrl', 'indicatorTypeService')
    }).state('app.templatemanager.indicators', {
        url: '/indicators',
        templateUrl: '/bundles/biodyxpert/js/components/Indicator/indicators.html',
        title: 'content.list.INDICATORS',
        ncyBreadcrumb: {
            label: 'content.list.INDICATORS'
        },
        params: {
            'indicatorsIsFiltersVisible': null,
            'indicatorsPage': null,
            'indicatorsCount': null,
            'indicatorsSorting': null,
            'indicatorsFilter': null
        },
        resolve: loadSequence('IndicatorsCtrl', 'indicatorService', 'templateService', 'indicatorTypeService', 'userService')
    }).state('app.templatemanager.indicatorsnew', {
        url: '/indicators/new',
        templateUrl: '/bundles/biodyxpert/js/components/Indicator/indicator_form.html',
        title: 'content.list.NEWINDICATOR',
        ncyBreadcrumb: {
            label: 'content.list.NEWINDICATOR'
        },
        params: {
            'indicator_template': null,
            'indicator_indicator_type': null
        },
        resolve: loadSequence('IndicatorFormCtrl', 'indicatorService', 'templateService', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.indicatorsedit', {
        url: '/indicators/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Indicator/indicator_form.html',
        title: 'content.list.EDITINDICATOR',
        ncyBreadcrumb: {
            label: 'content.list.EDITINDICATOR'
        },
        resolve: loadSequence('IndicatorFormCtrl', 'indicatorService', 'templateService', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.indicatorsdetails', {
        url: '/indicators/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Indicator/indicator.html',
        ncyBreadcrumb: {
            label: 'content.list.INDICATORDETAILS'
        },
        resolve: loadSequence('IndicatorCtrl', 'indicatorService')
    }).state('app.templatemanager.templates', {
        url: '/templates',
        templateUrl: '/bundles/biodyxpert/js/components/Template/templates.html',
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
        resolve: loadSequence('TemplatesCtrl', 'templateService', 'licenceTypeService', 'userService')
    }).state('app.templatemanager.templatesnew', {
        url: '/templates/new',
        templateUrl: '/bundles/biodyxpert/js/components/Template/template_form.html',
        title: 'content.list.NEWTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTEMPLATE'
        },
        params: {
            'template_licence_type': null
        },
        resolve: loadSequence('TemplateFormCtrl', 'templateService', 'licenceTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.templatesedit', {
        url: '/templates/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Template/template_form.html',
        title: 'content.list.EDITTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTEMPLATE'
        },
        resolve: loadSequence('TemplateFormCtrl', 'templateService', 'licenceTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.templatemanager.templatesdetails', {
        url: '/templates/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Template/template.html',
        ncyBreadcrumb: {
            label: 'content.list.TEMPLATEDETAILS'
        },
        resolve: loadSequence('TemplateCtrl', 'templateService')
    }).state('app.templatemanager.templatesassign',{
        url: '/assign',
        templateUrl: '/bundles/biodyxpert/js/components/Template/assign.html',
        title: 'content.list.ASSIGN',
        ncyBreadcrumb: {
            label:'content.list.ASSIGN'
        },
        resolve: loadSequence('TemplateAssignCtrl', 'TemplateServiceCtrl', 'patientGroupService', 'templateService')
    })
.state('app.translation', {
        url: '/translation',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.translation.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.translation.MAIN'
        }
    }).state('app.translation.languages', {
        url: '/languages',
        templateUrl: '/bundles/biodyxpert/js/components/Language/languages.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        params: {
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('LanguageFormCtrl', 'languageService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.translation.words', {
        url: '/words',
        templateUrl: '/bundles/biodyxpert/js/components/Word/words.html',
        title: 'content.list.WORDS',
        ncyBreadcrumb: {
            label: 'content.list.WORDS'
        },
        params: {
            'wordsIsFiltersVisible': null,
            'wordsPage': null,
            'wordsCount': null,
            'wordsSorting': null,
            'wordsFilter': null
        },
        resolve: loadSequence('WordsCtrl', 'wordService', 'userService')
    }).state('app.translation.wordsnew', {
        url: '/words/new',
        templateUrl: '/bundles/biodyxpert/js/components/Word/word_form.html',
        title: 'content.list.NEWWORD',
        ncyBreadcrumb: {
            label: 'content.list.NEWWORD'
        },
        params: {
        },
        resolve: loadSequence('WordFormCtrl', 'wordService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.wordsedit', {
        url: '/words/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Word/word_form.html',
        title: 'content.list.EDITWORD',
        ncyBreadcrumb: {
            label: 'content.list.EDITWORD'
        },
        resolve: loadSequence('WordFormCtrl', 'wordService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.wordsdetails', {
        url: '/words/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/Word/word.html',
        ncyBreadcrumb: {
            label: 'content.list.WORDDETAILS'
        },
        resolve: loadSequence('WordCtrl', 'wordService')
    }).state('app.translation.translationwords', {
        url: '/translation-words',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationWord/translation_words.html',
        title: 'content.list.TRANSLATIONWORDS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONWORDS'
        },
        params: {
            'translationWordsIsFiltersVisible': null,
            'translationWordsPage': null,
            'translationWordsCount': null,
            'translationWordsSorting': null,
            'translationWordsFilter': null
        },
        resolve: loadSequence('TranslationWordsCtrl', 'translationWordService', 'wordService', 'userService')
    }).state('app.translation.translationwordsnew', {
        url: '/translation-words/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationWord/translation_word_form.html',
        title: 'content.list.NEWTRANSLATIONWORD',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONWORD'
        },
        params: {
            'translation_word_word': null
        },
        resolve: loadSequence('TranslationWordFormCtrl', 'translationWordService', 'wordService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationwordsedit', {
        url: '/translation-words/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationWord/translation_word_form.html',
        title: 'content.list.EDITTRANSLATIONWORD',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONWORD'
        },
        resolve: loadSequence('TranslationWordFormCtrl', 'translationWordService', 'wordService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationwordsdetails', {
        url: '/translation-words/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationWord/translation_word.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONWORDDETAILS'
        },
        resolve: loadSequence('TranslationWordCtrl', 'translationWordService')
    }).state('app.translation.translationphysicalactivities', {
        url: '/translation-physical-activities',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/translation_physical_activities.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/translation_physical_activity_form.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/translation_physical_activity_form.html',
        title: 'content.list.EDITTRANSLATIONPHYSICALACTIVITY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPHYSICALACTIVITY'
        },
        resolve: loadSequence('TranslationPhysicalActivityFormCtrl', 'translationPhysicalActivityService', 'physicalActivityService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationphysicalactivitiesdetails', {
        url: '/translation-physical-activities/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPhysicalActivity/translation_physical_activity.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPHYSICALACTIVITYDETAILS'
        },
        resolve: loadSequence('TranslationPhysicalActivityCtrl', 'translationPhysicalActivityService')
    }).state('app.translation.translationtemplates', {
        url: '/translation-templates',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationTemplate/translation_templates.html',
        title: 'content.list.TRANSLATIONTEMPLATES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONTEMPLATES'
        },
        params: {
            'translationTemplatesIsFiltersVisible': null,
            'translationTemplatesPage': null,
            'translationTemplatesCount': null,
            'translationTemplatesSorting': null,
            'translationTemplatesFilter': null
        },
        resolve: loadSequence('TranslationTemplatesCtrl', 'translationTemplateService', 'templateService', 'userService')
    }).state('app.translation.translationtemplatesnew', {
        url: '/translation-templates/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationTemplate/translation_template_form.html',
        title: 'content.list.NEWTRANSLATIONTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONTEMPLATE'
        },
        params: {
            'translation_template_template': null
        },
        resolve: loadSequence('TranslationTemplateFormCtrl', 'translationTemplateService', 'templateService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationtemplatesedit', {
        url: '/translation-templates/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationTemplate/translation_template_form.html',
        title: 'content.list.EDITTRANSLATIONTEMPLATE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONTEMPLATE'
        },
        resolve: loadSequence('TranslationTemplateFormCtrl', 'translationTemplateService', 'templateService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationtemplatesdetails', {
        url: '/translation-templates/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationTemplate/translation_template.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONTEMPLATEDETAILS'
        },
        resolve: loadSequence('TranslationTemplateCtrl', 'translationTemplateService')
    }).state('app.translation.translationindicatortypes', {
        url: '/translation-indicator-types',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationIndicatorType/translation_indicator_types.html',
        title: 'content.list.TRANSLATIONINDICATORTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONINDICATORTYPES'
        },
        params: {
            'translationIndicatorTypesIsFiltersVisible': null,
            'translationIndicatorTypesPage': null,
            'translationIndicatorTypesCount': null,
            'translationIndicatorTypesSorting': null,
            'translationIndicatorTypesFilter': null
        },
        resolve: loadSequence('TranslationIndicatorTypesCtrl', 'translationIndicatorTypeService', 'indicatorTypeService', 'userService')
    }).state('app.translation.translationindicatortypesnew', {
        url: '/translation-indicator-types/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationIndicatorType/translation_indicator_type_form.html',
        title: 'content.list.NEWTRANSLATIONINDICATORTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONINDICATORTYPE'
        },
        params: {
            'translation_indicator_type_indicator_type': null
        },
        resolve: loadSequence('TranslationIndicatorTypeFormCtrl', 'translationIndicatorTypeService', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationindicatortypesedit', {
        url: '/translation-indicator-types/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationIndicatorType/translation_indicator_type_form.html',
        title: 'content.list.EDITTRANSLATIONINDICATORTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONINDICATORTYPE'
        },
        resolve: loadSequence('TranslationIndicatorTypeFormCtrl', 'translationIndicatorTypeService', 'indicatorTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationindicatortypesdetails', {
        url: '/translation-indicator-types/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationIndicatorType/translation_indicator_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONINDICATORTYPEDETAILS'
        },
        resolve: loadSequence('TranslationIndicatorTypeCtrl', 'translationIndicatorTypeService')
    }).state('app.translation.translationfaqcategories', {
        url: '/translation-faq-categories',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaqCategory/translation_faq_categories.html',
        title: 'content.list.TRANSLATIONFAQCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONFAQCATEGORIES'
        },
        params: {
            'translationFaqCategoriesIsFiltersVisible': null,
            'translationFaqCategoriesPage': null,
            'translationFaqCategoriesCount': null,
            'translationFaqCategoriesSorting': null,
            'translationFaqCategoriesFilter': null
        },
        resolve: loadSequence('TranslationFaqCategoriesCtrl', 'translationFaqCategoryService', 'faqCategoryService', 'userService')
    }).state('app.translation.translationfaqcategoriesnew', {
        url: '/translation-faq-categories/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaqCategory/translation_faq_category_form.html',
        title: 'content.list.NEWTRANSLATIONFAQCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONFAQCATEGORY'
        },
        params: {
            'translation_faq_category_faq_category': null
        },
        resolve: loadSequence('TranslationFaqCategoryFormCtrl', 'translationFaqCategoryService', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationfaqcategoriesedit', {
        url: '/translation-faq-categories/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaqCategory/translation_faq_category_form.html',
        title: 'content.list.EDITTRANSLATIONFAQCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONFAQCATEGORY'
        },
        resolve: loadSequence('TranslationFaqCategoryFormCtrl', 'translationFaqCategoryService', 'faqCategoryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationfaqcategoriesdetails', {
        url: '/translation-faq-categories/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaqCategory/translation_faq_category.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONFAQCATEGORYDETAILS'
        },
        resolve: loadSequence('TranslationFaqCategoryCtrl', 'translationFaqCategoryService')
    }).state('app.translation.translationfaqs', {
        url: '/translation-faqs',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaq/translation_faqs.html',
        title: 'content.list.TRANSLATIONFAQS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONFAQS'
        },
        params: {
            'translationFaqsIsFiltersVisible': null,
            'translationFaqsPage': null,
            'translationFaqsCount': null,
            'translationFaqsSorting': null,
            'translationFaqsFilter': null
        },
        resolve: loadSequence('TranslationFaqsCtrl', 'translationFaqService', 'faqService', 'userService')
    }).state('app.translation.translationfaqsnew', {
        url: '/translation-faqs/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaq/translation_faq_form.html',
        title: 'content.list.NEWTRANSLATIONFAQ',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONFAQ'
        },
        params: {
            'translation_faq_faq': null
        },
        resolve: loadSequence('TranslationFaqFormCtrl', 'translationFaqService', 'faqService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationfaqsedit', {
        url: '/translation-faqs/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaq/translation_faq_form.html',
        title: 'content.list.EDITTRANSLATIONFAQ',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONFAQ'
        },
        resolve: loadSequence('TranslationFaqFormCtrl', 'translationFaqService', 'faqService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationfaqsdetails', {
        url: '/translation-faqs/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationFaq/translation_faq.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONFAQDETAILS'
        },
        resolve: loadSequence('TranslationFaqCtrl', 'translationFaqService')
    }).state('app.translation.translationpathologies', {
        url: '/translation-pathologies',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPathology/translation_pathologies.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPathology/translation_pathology_form.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPathology/translation_pathology_form.html',
        title: 'content.list.EDITTRANSLATIONPATHOLOGY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPATHOLOGY'
        },
        resolve: loadSequence('TranslationPathologyFormCtrl', 'translationPathologyService', 'pathologyService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationpathologiesdetails', {
        url: '/translation-pathologies/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPathology/translation_pathology.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPATHOLOGYDETAILS'
        },
        resolve: loadSequence('TranslationPathologyCtrl', 'translationPathologyService')
    }).state('app.translation.translationcountries', {
        url: '/translation-countries',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationCountry/translation_countries.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationCountry/translation_country_form.html',
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
        templateUrl: '/bundles/biodyxpert/js/components/TranslationCountry/translation_country_form.html',
        title: 'content.list.EDITTRANSLATIONCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONCOUNTRY'
        },
        resolve: loadSequence('TranslationCountryFormCtrl', 'translationCountryService', 'countryService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationcountriesdetails', {
        url: '/translation-countries/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationCountry/translation_country.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONCOUNTRYDETAILS'
        },
        resolve: loadSequence('TranslationCountryCtrl', 'translationCountryService')
    }).state('app.translation.translationpatientgroups', {
        url: '/translation-patient-groups',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPatientGroup/translation_patient_groups.html',
        title: 'content.list.TRANSLATIONPATIENTGROUPS',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPATIENTGROUPS'
        },
        params: {
            'translationPatientGroupsIsFiltersVisible': null,
            'translationPatientGroupsPage': null,
            'translationPatientGroupsCount': null,
            'translationPatientGroupsSorting': null,
            'translationPatientGroupsFilter': null
        },
        resolve: loadSequence('TranslationPatientGroupsCtrl', 'translationPatientGroupService', 'patientGroupService', 'userService')
    }).state('app.translation.translationpatientgroupsnew', {
        url: '/translation-patient-groups/new',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPatientGroup/translation_patient_group_form.html',
        title: 'content.list.NEWTRANSLATIONPATIENTGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWTRANSLATIONPATIENTGROUP'
        },
        params: {
            'translation_patient_group_patient_group': null
        },
        resolve: loadSequence('TranslationPatientGroupFormCtrl', 'translationPatientGroupService', 'patientGroupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationpatientgroupsedit', {
        url: '/translation-patient-groups/edit/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPatientGroup/translation_patient_group_form.html',
        title: 'content.list.EDITTRANSLATIONPATIENTGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITTRANSLATIONPATIENTGROUP'
        },
        resolve: loadSequence('TranslationPatientGroupFormCtrl', 'translationPatientGroupService', 'patientGroupService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
    }).state('app.translation.translationpatientgroupsdetails', {
        url: '/translation-patient-groups/details/:id',
        templateUrl: '/bundles/biodyxpert/js/components/TranslationPatientGroup/translation_patient_group.html',
        ncyBreadcrumb: {
            label: 'content.list.TRANSLATIONPATIENTGROUPDETAILS'
        },
        resolve: loadSequence('TranslationPatientGroupCtrl', 'translationPatientGroupService')
    });

}]);
