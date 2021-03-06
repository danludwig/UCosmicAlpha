///// <reference path="../../typings/jquery/jquery.d.ts" />
///// <reference path="../../typings/jqueryui/jqueryui.d.ts" />
///// <reference path="../../typings/knockout/knockout.d.ts" />
///// <reference path="../../typings/knockout.mapping/knockout.mapping.d.ts" />
///// <reference path="../../typings/knockout.validation/knockout.validation.d.ts" />
///// <reference path="../../typings/kendo/kendo.all.d.ts" />
///// <reference path="../../typings/sammyjs/sammyjs.d.ts" />
///// <reference path="../../app/Routes.ts" />
///// <reference path="../../app/Spinner.ts" />
///// <reference path="../../app/Flasher.ts" />
///// <reference path="ServerApiModel.d.ts" />
///// <reference path="../employees/ServerApiModel.d.ts" />
///// <reference path="../activities/Activities.ts" />
///// <reference path="../geographicExpertises/GeographicExpertises.ts" />
///// <reference path="../languageExpertises/LanguageExpertises.ts" />
///// <reference path="../degrees/Degrees.ts" />
///// <reference path="../internationalAffiliations/InternationalAffiliations.ts" />

//module ViewModels.My {

//    export class Affiliation {
//        id: KnockoutObservable<number> = ko.observable();
//        establishmentId: KnockoutObservable<number> = ko.observable();
//        establishment: KnockoutObservable<string> = ko.observable();
//        jobTitles: KnockoutObservable<number> = ko.observable();
//        isDefault: KnockoutObservable<boolean> = ko.observable(false);
//        isAcknowledged: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingStudent: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingEmployee: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingInternationalOffice: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingAdministrator: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingFaculty: KnockoutObservable<boolean> = ko.observable(false);
//        isClaimingStaff: KnockoutObservable<boolean> = ko.observable(false);
//        campusId: KnockoutObservable<any> = ko.observable(null);      // nullable
//        collegeId: KnockoutObservable<any> = ko.observable(null);     // nullable
//        departmentId: KnockoutObservable<any> = ko.observable(null);  // nullable
//        facultyRankId: KnockoutObservable<any> = ko.observable(null); // nullable

//        campus: string;
//        college: string;
//        department: string;
//        facultyRank: string;
//    }

//    export class Profile implements KnockoutValidationGroup {

//        private _sammy: Sammy.Application = Sammy();
//        //private _isInitialized: boolean = false;
//        private _originalValues: IServerProfileApiModel;
//        private _activitiesViewModel: Activities.ViewModels.ActivityList = null;
//        private _geographicExpertisesViewModel: ViewModels.GeographicExpertises.GeographicExpertiseList = null;
//        private _languageExpertisesViewModel: ViewModels.LanguageExpertises.LanguageExpertiseList = null;
//        private _degreesViewModel: ViewModels.Degrees.DegreeList = null;
//        private _internationalAffiliationsViewModel: ViewModels.InternationalAffiliations.InternationalAffiliationList = null;

//        hasPhoto: KnockoutObservable<boolean> = ko.observable();
//        photoUploadError: KnockoutObservable<string> = ko.observable();
//        static photoUploadUnexpectedErrorMessage = 'UCosmic experienced an unexpected error managing your photo, please try again. If you continue to experience this issue, please use the Feedback & Support link on this page to report it.';
//        photoSrc: KnockoutObservable<string> = ko.observable(
//            App.Routes.WebApi.My.Photo.get({ maxSide: 128, refresh: new Date().toUTCString() }));
//        photoUploadSpinner = new App.Spinner({ delay: 400, });
//        photoDeleteSpinner = new App.Spinner({ delay: 400, });

//        isDisplayNameDerived: KnockoutObservable<boolean> = ko.observable();
//        displayName: KnockoutObservable<string> = ko.observable();
//        private _userDisplayName: string = '';

//        campuses: any[];
//        colleges: any[];
//        departments: any[];

//        personId: number = 0;

//        salutation: KnockoutObservable<string> = ko.observable();
//        firstName: KnockoutObservable<string> = ko.observable();
//        middleName: KnockoutObservable<string> = ko.observable();
//        lastName: KnockoutObservable<string> = ko.observable();
//        suffix: KnockoutObservable<string> = ko.observable();

//        isFacultyRankEditable: () => boolean;
//        isFacultyRankVisible: () => boolean;
//        facultyRankText: () => string;
//        facultyRanks: KnockoutObservableArray<Employees.IServerFacultyRankApiModel> = ko.observableArray();
//        facultyRankId: KnockoutObservable<any> = ko.observable(null);

//        defaultEstablishmentHasCampuses: KnockoutObservable<boolean> = ko.observable(false);

//        preferredTitle: KnockoutObservable<string> = ko.observable();
//        affiliations: KnockoutObservableArray<any> = ko.observableArray();

//        gender: KnockoutObservable<string> = ko.observable();
//        isActive: KnockoutObservable<boolean> = ko.observable();
//        genderText: () => string;
//        isActiveText: () => string;

//        $photo: KnockoutObservable<JQuery> = ko.observable();
//        $facultyRanks: KnockoutObservable<JQuery> = ko.observable();
//        $nameSalutation: KnockoutObservable<JQuery> = ko.observable();
//        $nameSuffix: KnockoutObservable<JQuery> = ko.observable();
//        $editSection: JQuery;
//        $confirmPurgeDialog: JQuery;

//        isValid: () => boolean;
//        errors: KnockoutValidationErrors;
//        editMode: KnockoutObservable<boolean> = ko.observable(false);
//        saveSpinner = new App.Spinner({ delay: 200, });

//        startInEdit: KnockoutObservable<boolean> = ko.observable(false);
//        startTabName: KnockoutObservable<string> = ko.observable("Activities");

//        private _initialize() {
//        }

//        constructor() {
//            this._initialize();

//            //this._setupRouting();
//            //this._setupValidation();
//            //this._setupKendoWidgets();
//            //this._setupDisplayNameDerivation();
//            //this._setupCardComputeds();

//            //this._sammy.run('#/activities');
//        }

//        load(startTab: string): JQueryPromise<any> {
//            var deferred: JQueryDeferred<void> = $.Deferred();

//            // start both requests at the same time
//            var facultyRanksPact = $.Deferred();
//            $.get(App.Routes.WebApi.Employees.ModuleSettings.FacultyRanks.get())
//                .done((data: Employees.IServerFacultyRankApiModel[], textStatus: string, jqXHR: JQueryXHR): void => {
//                    facultyRanksPact.resolve(data);
//                })
//                .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void => {
//                    facultyRanksPact.reject(jqXHR, textStatus, errorThrown);
//                });

//            var viewModelPact = $.Deferred();
//            $.get(App.Routes.WebApi.My.Profile.get())
//                .done((data: IServerProfileApiModel, textStatus: string, jqXHR: JQueryXHR): void => {
//                    viewModelPact.resolve(data);
//                })
//                .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void => {
//                    viewModelPact.reject(jqXHR, textStatus, errorThrown);
//                });

//            // only process after both requests have been resolved
//            $.when(facultyRanksPact, viewModelPact)
//            //.then(
//                .done(
//                (facultyRanks: Employees.IServerFacultyRankApiModel[], viewModel: IServerProfileApiModel): void => {

//                    this.facultyRanks(facultyRanks); // populate the faculty ranks menu
//                    if (facultyRanks.length == 0) {
//                        this.facultyRankId(null);
//                    }

//                    ko.mapping.fromJS(viewModel, { ignore: "personId" }, this); // populate the scalars
//                    this.personId = viewModel.personId;

//                    this._originalValues = viewModel;

//                    //if (!this._isInitialized) {
//                    //    $(this).trigger('ready'); // ready to apply bindings
//                    //    this._isInitialized = true; // bindings have been applied
//                    //    this.$facultyRanks().kendoDropDownList(); // kendoui dropdown for faculty ranks
//                    //}
//                    this._reloadAffiliations();
//                    this._setupValidation();
//                    this._setupKendoWidgets();
//                    this._setupDisplayNameDerivation();
//                    this._setupCardComputeds();

//                    //debugger;
//                    //if (this.startInEdit()) {
//                    //    this.startEditing();
//                    //}

//                    if (startTab === "") {
//                        this._setupRouting();
//                        this._sammy.run("#/activities");
//                    }
//                    else {
//                        var url = location.href;
//                        var index = url.lastIndexOf("?");
//                        if (index != -1) {
//                            this._startTab(startTab);
//                            this._setupRouting();
//                        } else {
//                            this._setupRouting();
//                            this._sammy.run("#/" + startTab);
//                        }
//                    }

//                    deferred.resolve();
//                })
//            //,
//            // one of the responses failed (never called more than once, even on multifailures)
//            //(xhr: JQueryXHR, textStatus: string, errorThrown: string): void => {
//            //    //alert('a GET API call failed :(');
//            //});
//                .fail((xhr: JQueryXHR, textStatus: string, errorThrown: string): void => {
//                    deferred.reject(xhr, textStatus, errorThrown);
//                });

//            return deferred;
//        }

//        private _startTab(tabName: string): void {
//            var viewModel: any;
//            var tabStrip = $("#tabstrip").data("kendoTabStrip");

//            if (tabName === "activities") {
//                if (this._activitiesViewModel == null) {
//                    this._activitiesViewModel = new Activities.ViewModels.ActivityList();
//                    this._activitiesViewModel.load()
//                        .done((): void => {
//                            ko.applyBindings(this._activitiesViewModel, $("#activities")[0]);
//                        })
//                        .fail(function (jqXhr, textStatus, errorThrown) {
//                            alert(textStatus + "|" + errorThrown);
//                        });
//                }
//                if (tabStrip.select() != 0) {
//                    tabStrip.select(0);
//                }
//            } else if (tabName === "geographic-expertise") {
//                if (this._geographicExpertisesViewModel == null) {
//                    this._geographicExpertisesViewModel = new ViewModels.GeographicExpertises.GeographicExpertiseList(this.personId);
//                    this._geographicExpertisesViewModel.load()
//                        .done((): void => {
//                            ko.applyBindings(this._geographicExpertisesViewModel, $("#geographic-expertises")[0]);
//                        })
//                        .fail(function (jqXhr, textStatus, errorThrown) {
//                            alert(textStatus + "|" + errorThrown);
//                        });
//                }
//                if (tabStrip.select() != 1) {
//                    tabStrip.select(1);
//                }
//            } else if (tabName === "language-expertise") {
//                if (this._languageExpertisesViewModel == null) {
//                    this._languageExpertisesViewModel = new ViewModels.LanguageExpertises.LanguageExpertiseList(this.personId);
//                    this._languageExpertisesViewModel.load()
//                        .done((): void => {
//                            ko.applyBindings(this._languageExpertisesViewModel, $("#language-expertises")[0]);
//                        })
//                        .fail(function (jqXhr, textStatus, errorThrown) {
//                            alert(textStatus + "|" + errorThrown);
//                        });
//                }
//                if (tabStrip.select() != 2) {
//                    tabStrip.select(2);
//                }
//            } else if (tabName === "formal-education") {
//                if (this._degreesViewModel == null) {
//                    this._degreesViewModel = new ViewModels.Degrees.DegreeList(this.personId);
//                    this._degreesViewModel.load()
//                        .done((): void => {
//                            ko.applyBindings(this._degreesViewModel, $("#degrees")[0]);
//                        })
//                        .fail(function (jqXhr, textStatus, errorThrown) {
//                            alert(textStatus + "|" + errorThrown);
//                        });
//                }
//                if (tabStrip.select() != 3) {
//                    tabStrip.select(3);
//                }
//            } else if (tabName === "affiliations") {
//                if (this._internationalAffiliationsViewModel == null) {
//                    this._internationalAffiliationsViewModel = new ViewModels.InternationalAffiliations.InternationalAffiliationList(this.personId);
//                    this._internationalAffiliationsViewModel.load()
//                        .done((): void => {
//                            ko.applyBindings(this._internationalAffiliationsViewModel, $("#international-affiliations")[0]);
//                        })
//                        .fail(function (jqXhr, textStatus, errorThrown) {
//                            alert(textStatus + " |" + errorThrown);
//                        });
//                }
//                if (tabStrip.select() != 4) {
//                    tabStrip.select(4);
//                }
//            }
//        }

//        tabClickHandler(event: any): void {
//            var tabName = event.item.innerText; // IE
//            if (tabName == null) tabName = event.item.textContent; // FF
//            tabName = this.tabTitleToName(tabName);
//            //this._startTab( tabName );
//            location.href = "#/" + tabName;
//        }

//        tabTitleToName(title: string): string {
//            var tabName = null;
//            if (title === "Activities") tabName = "activities";
//            if (title === "Geographic Expertise") tabName = "geographic-expertise";
//            if (title === "Language Expertise") tabName = "language-expertise";
//            if (title === "Formal Education") tabName = "formal-education";
//            if (title === "Affiliations") tabName = "affiliations";
//            return tabName;
//        }

//        startEditing(): void { // show the editor
//            this.editMode(true);
//            if (this.$editSection.length) {
//                this.$editSection.slideDown();
//            }
//        }

//        stopEditing(): void { // hide the editor
//            this.editMode(false);
//            if (this.$editSection.length) {
//                this.$editSection.slideUp();
//            }
//        }

//        cancelEditing(): void {
//            ko.mapping.fromJS(this._originalValues, {}, this); // restore original values
//            this.stopEditing();
//        }

//        saveInfo(): void {

//            if (!this.isValid()) {
//                this.errors.showAllMessages();
//            }
//            else {
//                var apiModel = ko.mapping.toJS(this);

//                this.saveSpinner.start();
//                $.ajax({
//                    url: App.Routes.WebApi.My.Profile.put(),
//                    type: 'PUT',
//                    data: apiModel
//                })
//                    .done((responseText: string, statusText: string, xhr: JQueryXHR) => {
//                        App.flasher.flash(responseText);
//                        this.stopEditing();
//                        this._initialize(); // re-initialize original values
//                    })
//                    .fail(() => {
//                        //alert('a PUT API call failed :(');
//                    })
//                    .always((): void => {
//                        this.saveSpinner.stop();
//                    });
//            }
//        }

//        startDeletingPhoto(): void {
//            if (this.$confirmPurgeDialog && this.$confirmPurgeDialog.length) {
//                this.$confirmPurgeDialog.dialog({
//                    dialogClass: 'jquery-ui',
//                    width: 'auto',
//                    resizable: false,
//                    modal: true,
//                    buttons: [
//                        {
//                            text: 'Yes, confirm delete',
//                            click: (): void => {
//                                this.$confirmPurgeDialog.dialog('close');
//                                this._deletePhoto();
//                            }
//                        },
//                        {
//                            text: 'No, cancel delete',
//                            click: (): void => {
//                                this.$confirmPurgeDialog.dialog('close');
//                                this.photoDeleteSpinner.stop();
//                            },
//                            'data-css-link': true
//                        }
//                    ]
//                });
//            }
//            else if (confirm('Are you sure you want to delete your profile photo?')) {
//                this._deletePhoto();
//            }
//        }

//        private _deletePhoto(): void {
//            this.photoDeleteSpinner.start();
//            this.photoUploadError(undefined);
//            $.ajax({ // submit ajax DELETE request
//                url: App.Routes.WebApi.My.Photo.del(),
//                type: 'DELETE'
//            })
//                .always((): void => {
//                    this.photoDeleteSpinner.stop();
//                })
//                .done((response: string, statusText: string, xhr: JQueryXHR): void => {
//                    if (typeof response === 'string') App.flasher.flash(response);
//                    this.hasPhoto(false);
//                    this.photoSrc(App.Routes.WebApi.My.Photo
//                        .get({ maxSide: 128, refresh: new Date().toUTCString() }));
//                })
//                .fail((): void => {
//                    this.photoUploadError(Profile.photoUploadUnexpectedErrorMessage);
//                });
//        }

//        private _setupRouting(): void {
//            this._sammy.route('get', '#/', (): void => { this._startTab('activities'); });
//            this._sammy.route('get', '#/activities', (): void => { this._startTab('activities'); });
//            this._sammy.route('get', '#/geographic-expertise', (): void => { this._startTab('geographic-expertise'); });
//            this._sammy.route('get', '#/language-expertise', (): void => { this._startTab('language-expertise'); });
//            this._sammy.route('get', '#/formal-education', (): void => { this._startTab('formal-education'); });
//            this._sammy.route('get', '#/affiliations', (): void => { this._startTab('affiliations'); });
//        }

//        // client validation rules
//        private _setupValidation(): void {
//            this.displayName.extend({
//                required: {
//                    message: 'Display name is required.'
//                },
//                maxLength: 200
//            });

//            this.salutation.extend({
//                maxLength: 50
//            });

//            this.firstName.extend({
//                maxLength: 100
//            });

//            this.middleName.extend({
//                maxLength: 100
//            });

//            this.lastName.extend({
//                maxLength: 100
//            });

//            this.suffix.extend({
//                maxLength: 50
//            });

//            this.preferredTitle.extend({
//                maxLength: 500
//            });

//            ko.validation.group(this);
//        }

//        // comboboxes for salutation & suffix
//        private _setupKendoWidgets(): void {

//            var tabstrip = $('#tabstrip');
//            tabstrip.kendoTabStrip({
//                select: (e: any): void => { this.tabClickHandler(e); },
//                animation: false
//            }).show();

//            // when the $element observables are bound, they will have length
//            // use this opportinity to apply kendo extensions
//            this.$nameSalutation.subscribe((newValue: JQuery): void => {
//                if (newValue && newValue.length)
//                    newValue.kendoComboBox({
//                        dataTextField: "text",
//                        dataValueField: "value",
//                        dataSource: new kendo.data.DataSource({
//                            transport: {
//                                read: {
//                                    url: App.Routes.WebApi.People.Names.Salutations.get()
//                                }
//                            }
//                        })
//                    });
//            });
//            this.$nameSuffix.subscribe((newValue: JQuery): void => {
//                if (newValue && newValue.length)
//                    newValue.kendoComboBox({
//                        dataTextField: "text",
//                        dataValueField: "value",
//                        dataSource: new kendo.data.DataSource({
//                            transport: {
//                                read: {
//                                    url: App.Routes.WebApi.People.Names.Suffixes.get()
//                                }
//                            }
//                        })
//                    });
//            });

//            // this is getting a little long, can probably factor out event handlers / validation stuff
//            this.$photo.subscribe((newValue: JQuery): void => {
//                if (newValue && newValue.length) {
//                    newValue.kendoUpload({
//                        multiple: false,
//                        showFileList: false,
//                        localization: {
//                            select: 'Choose a photo to upload...'
//                        },
//                        async: {
//                            saveUrl: App.Routes.WebApi.My.Photo.post()
//                        },
//                        select: (e: kendo.ui.UploadSelectEvent): void => {
//                            this.photoUploadSpinner.start(); // display async wait message
//                            $.ajax({
//                                type: 'POST',
//                                async: false,
//                                url: App.Routes.WebApi.My.Photo.validate(),
//                                data: {
//                                    name: e.files[0].name,
//                                    length: e.files[0].size
//                                }
//                            })
//                                .done((): void => {
//                                    this.photoUploadError(undefined);
//                                })
//                                .fail((xhr: JQueryXHR): void => {
//                                    this.photoUploadError(xhr.responseText);
//                                    e.preventDefault();
//                                    this.photoUploadSpinner.stop(); // hide async wait message
//                                });
//                        },
//                        complete: (): void => {
//                            this.photoUploadSpinner.stop(); // hide async wait message
//                        },
//                        success: (e: any): void => {
//                            // this event is triggered by both upload and remove requests
//                            // ignore remove operations becuase they don't actually do anything
//                            if (e.operation == 'upload') {
//                                if (e.response && e.response.message) {
//                                    App.flasher.flash(e.response.message);
//                                }
//                                this.hasPhoto(true);
//                                this.photoSrc(App.Routes.WebApi.My.Photo
//                                    .get({ maxSide: 128, refresh: new Date().toUTCString() }));
//                            }
//                        },
//                        error: (e: kendo.ui.UploadErrorEvent): void => {
//                            if (e.XMLHttpRequest.responseText &&
//                                e.XMLHttpRequest.responseText.length < 1000) {
//                                this.photoUploadError(e.XMLHttpRequest.responseText);
//                            }
//                            else {
//                                this.photoUploadError(Profile.photoUploadUnexpectedErrorMessage);
//                            }
//                        }
//                    });
//                }
//            });
//        }

//        // logic to derive display name
//        private _setupDisplayNameDerivation(): void {
//            this.displayName.subscribe((newValue: string): void => {
//                if (!this.isDisplayNameDerived()) {
//                    // stash user-entered display name only when it is not derived
//                    this._userDisplayName = newValue;
//                }
//            });

//            ko.computed((): void => {
//                // generate display name if it has been API-initialized
//                if (this.isDisplayNameDerived() /* && this._isInitialized */) {
//                    var mapSource = {
//                        id: this.personId,
//                        isDisplayNameDerived: this.isDisplayNameDerived(),
//                        displayName: this.displayName(),
//                        salutation: this.salutation(),
//                        firstName: this.firstName(),
//                        middleName: this.middleName(),
//                        lastName: this.lastName(),
//                        suffix: this.suffix()
//                    };
//                    var data = ko.mapping.toJS(mapSource);

//                    $.ajax({
//                        url: App.Routes.WebApi.People.Names.DeriveDisplayName.get(),
//                        type: 'GET',
//                        cache: false,
//                        data: data,
//                    }).done((result: string): void => {
//                            this.displayName(result);
//                        });
//                }
//                else /* if (this._isInitialized) */ {
//                    // prevent user display name from being blank
//                    if (!this._userDisplayName)
//                        this._userDisplayName = this.displayName();
//                    // restore user-entered display name
//                    this.displayName(this._userDisplayName);
//                }
//            }).extend({ throttle: 400 }); // wait for observables to stop changing
//        }

//        private _setupCardComputeds(): void {

//            // text translation for gender codes
//            this.genderText = ko.computed((): string => {
//                var genderCode = this.gender();
//                if (genderCode === 'M') return 'Male';
//                if (genderCode === 'F') return 'Female';
//                if (genderCode === 'P') return 'Gender Undisclosed';
//                return 'Gender Unknown';
//            });

//            // friendly string for isActive boolean
//            this.isActiveText = ko.computed((): string => {
//                return this.isActive() ? 'Active' : 'Inactive';
//            });

//            // do not display faculty rank editor for tenants that do not have
//            // employee module settings or faculty rank options
//            this.isFacultyRankEditable = ko.computed((): boolean => {
//                return this.facultyRanks() && this.facultyRanks().length > 0;
//            });

//            // compute the selected faculty rank text
//            if (this.facultyRankId() != null) {
//                this.facultyRankText = ko.computed((): string => {
//                    var id = this.facultyRankId();
//                    for (var i = 0; i < this.facultyRanks().length; i++) {
//                        var facultyRank: Employees.IServerFacultyRankApiModel = this.facultyRanks()[i];
//                        if (id === facultyRank.id) {
//                            return facultyRank.rank;
//                        }
//                    }
//                    return undefined;
//                });
//            }
//            else {
//                this.facultyRankText = undefined;
//            }

//            // do not display faculty rank on the form card when it is not set
//            // or when it is set to other
//            this.isFacultyRankVisible = ko.computed((): boolean => {
//                return this.isFacultyRankEditable() &&
//                    this.facultyRankId() &&
//                    this.facultyRankText() &&
//                    this.facultyRankText().toLowerCase() !== 'other';
//            });

//        }

//        // --------------------------------------------------------------------------------
//        /*
//         *  Affiliations
//        */
//        // --------------------------------------------------------------------------------
//        private _reloadAffiliations(): void {
//            $.ajax({
//                async: true,
//                url: App.Routes.WebApi.My.Affiliations.get(),
//                data: { isDefault: false }, // do not load the default affiliation
//                type: 'GET'
//            })
//                .done((data: any[], statusText: string, xhr: JQueryXHR): void => {
//                    ko.mapping.fromJS(data, {}, this.affiliations);
//                })
//                .fail((xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
//                    App.Failures.message(xhr, 'while trying to load your affiliations', true)
//            });
//        }

//        public editAffiliation(data: Affiliation, event: any) {
//            var me = this;

//            /* Get default affiliation */
//            var defaultAffiliation = null;
//            $.ajax({
//                type: 'GET',
//                url: App.Routes.WebApi.My.Affiliations.getDefault(),
//                async: false,
//            })
//                .done((response: any): void => {
//                    defaultAffiliation = response;
//                })
//                .fail((xhr: JQueryXHR): void => {
//                    App.Failures.message(xhr, 'while trying to determine your default affiliation', true)
//            });
//            if (!defaultAffiliation) return;

//            $("#editAffiliationDepartmentDropList").kendoDropDownList({
//                dataTextField: "officialName",
//                dataValueField: "id",
//                change: function (e) {
//                    //var item = this.dataItem[e.sender.selectedIndex];
//                },
//                dataBound: function (e) {
//                    if ((this.selectedIndex != null) && (this.selectedIndex != -1)) {
//                        var item = this.dataItem(this.selectedIndex);
//                        if (item == null) {
//                            this.text("");
//                            $("#editAffiliationDepartmenDiv").hide();
//                        }
//                        else {
//                            $("#editAffiliationDepartmenDiv").show();
//                        }
//                    }
//                    else {
//                        $("#editAffiliationDepartmenDiv").hide();
//                    }
//                }
//            });

//            var collegeDropListDataSource = null;

//            if (!this.defaultEstablishmentHasCampuses()) {
//                collegeDropListDataSource = new kendo.data.DataSource({
//                    transport: {
//                        read: {
//                            url: App.Routes.WebApi.Establishments.getChildren(defaultAffiliation.establishmentId),
//                            data: { orderBy: ['rank-asc', 'name-asc'] }
//                        }
//                    }
//                });
//            }

//            $("#editAffiliationCollegeDropList").kendoDropDownList({
//                dataTextField: "officialName",
//                dataValueField: "id",
//                dataSource: collegeDropListDataSource,
//                change: function (e) {
//                    var selectedIndex = e.sender.selectedIndex;
//                    if (selectedIndex != -1) {
//                        var item = this.dataItem(selectedIndex);
//                        if (item != null) {
//                            var dataSource = new kendo.data.DataSource({
//                                transport: {
//                                    read: {
//                                        url: App.Routes.WebApi.Establishments.getChildren(item.id),
//                                        data: { orderBy: ['rank-asc', 'name-asc'] }
//                                    }
//                                }
//                            });

//                            $("#editAffiliationDepartmentDropList").data("kendoDropDownList").setDataSource(dataSource);
//                        }
//                    }
//                },
//                dataBound: function (e) {
//                    if ((this.selectedIndex != null) && (this.selectedIndex != -1)) {
//                        var item = this.dataItem(this.selectedIndex);
//                        if (item != null) {
//                            var collegeId = item.id;
//                            if (collegeId != null) {
//                                var dataSource = new kendo.data.DataSource({
//                                    transport: {
//                                        read: {
//                                            url: App.Routes.WebApi.Establishments.getChildren(collegeId),
//                                            data: { orderBy: ['rank-asc', 'name-asc'] }
//                                        }
//                                    }
//                                });

//                                $("#editAffiliationDepartmentDropList").data("kendoDropDownList").setDataSource(dataSource);
//                            }
//                        }
//                    }
//                }
//            });

//            if (this.defaultEstablishmentHasCampuses()) {
//                $("#editAffiliationCampusDropList").kendoDropDownList({
//                    dataTextField: "officialName",
//                    dataValueField: "id",
//                    dataSource: new kendo.data.DataSource({
//                        transport: {
//                            read: {
//                                url: App.Routes.WebApi.Establishments.getChildren(defaultAffiliation.establishmentId),
//                                data: { orderBy: ['rank-asc', 'name-asc'] }
//                            }
//                        }
//                    }),
//                    change: function (e) {
//                        var selectedIndex = e.sender.selectedIndex;
//                        if ((selectedIndex != null) && (selectedIndex != -1)) {
//                            var item = this.dataItem(selectedIndex);
//                            if (item != null) {
//                                var dataSource = new kendo.data.DataSource({
//                                    transport: {
//                                        read: {
//                                            url: App.Routes.WebApi.Establishments.getChildren(item.id),
//                                            data: { orderBy: ['rank-asc', 'name-asc'] }
//                                        }
//                                    }
//                                });

//                                $("#editAffiliationCollegeDropList").data("kendoDropDownList").setDataSource(dataSource);
//                            }
//                        }
//                    },
//                    dataBound: function (e) {
//                        if ((this.selectedIndex != null) && (this.selectedIndex != -1)) {
//                            var item = this.dataItem(this.selectedIndex);
//                            if (item != null) {
//                                var campusId = item.id;
//                                if (campusId != null) {
//                                    var dataSource = new kendo.data.DataSource({
//                                        transport: {
//                                            read: {
//                                                url: App.Routes.WebApi.Establishments.getChildren(campusId),
//                                                data: { orderBy: ['rank-asc', 'name-asc'] }
//                                            }
//                                        }
//                                    });

//                                    $("#editAffiliationCollegeDropList").data("kendoDropDownList").setDataSource(dataSource);
//                                }
//                            }
//                            else {
//                                $("#editAffiliationCollegeDropList").data("kendoDropDownList").setDataSource(null);
//                            }
//                        }
//                    }
//                });
//            }

//            if ((this.facultyRanks() != null) && (this.facultyRanks().length > 0)) {
//                $("#editAffiliationFacultyRankDropList").kendoDropDownList({
//                    dataTextField: "rank",
//                    dataValueField: "id",
//                    dataSource: new kendo.data.DataSource({
//                        transport: {
//                            read: {
//                                url: App.Routes.WebApi.Employees.ModuleSettings.FacultyRanks.get()
//                            }
//                        }
//                    })
//                });
//            }

//            var dialogHeight: number = 300;
//            dialogHeight -= this.defaultEstablishmentHasCampuses() ? 0 : 40;
//            dialogHeight -= (this.facultyRanks() != null) && (this.facultyRanks().length > 0) ? 0 : 40;

//            $("#editAffiliationDialog").dialog({
//                dialogClass: "no-close",
//                title: (data == null) ? "Create Affiliation" : "Edit Affiliation",
//                width: 750,
//                height: dialogHeight,
//                resizable: false,
//                draggable: true,
//                modal: true,
//                buttons: [
//                    {
//                        text: "Save",
//                        click: function (item, event) {
//                            me.saveAffiliation((data == null) ? null : data.id(), defaultAffiliation.establishmentId);
//                        }
//                    },
//                    {
//                        text: "Cancel",
//                        click: function () {
//                            $("#editAffiliationDialog").dialog("close");
//                        }
//                    }
//                ],
//                open: function (event, ui) {
//                    if (data != null) {
//                        var deleteButton = { text: "Delete", click: function (item, event) { me.deleteAffiliation(data.id()); } }
//                        var buttons = $(this).dialog('option', 'buttons');
//                        buttons.push(deleteButton);
//                        $(this).dialog('option', 'buttons', buttons);

//                        if (me.defaultEstablishmentHasCampuses() && data.campusId() != null) {
//                            $("#editAffiliationCampusDropList").data("kendoDropDownList").value(data.campusId());
//                        }
//                        if (data.collegeId() != null) {
//                            $("#editAffiliationCollegeDropList").data("kendoDropDownList").value(data.collegeId());
//                        }
//                        if (data.departmentId() != null) {
//                            $("#editAffiliationDepartmentDropList").data("kendoDropDownList").value(data.departmentId());
//                        }
//                        if (me.isFacultyRankVisible() && data.facultyRankId() != null) {
//                            $("#editAffiliationFacultyRankDropList").data("kendoDropDownList").value(data.facultyRankId());
//                        }
//                    }
//                }
//            });
//        }

//        private GetDropListSelectedItem(dropListId: string): any {
//            var item = null;

//            var dropList = $("#" + dropListId).data("kendoDropDownList");
//            if (dropList != null) {
//                var selectedIndex = dropList.selectedIndex;
//                if ((selectedIndex != null) && (selectedIndex != -1)) {
//                    item = dropList.dataItem(selectedIndex);
//                }
//            }

//            return item;
//        }

//        private saveAffiliation(affiliationId: number, establishmentId: number): void {
//            var me = this;
//            var campusId1 = null;
//            var collegeId1 = null;
//            var departmentId1 = null;
//            var facultyRankId1 = null;

//            if (this.defaultEstablishmentHasCampuses()) {
//                var item1 = me.GetDropListSelectedItem("editAffiliationCampusDropList")
//                if (item1 != null)
//                { campusId1 = item1.id; }
//            }

//            item1 = me.GetDropListSelectedItem("editAffiliationCollegeDropList")
//            if (item1 != null) { collegeId1 = item1.id; }

//            item1 = me.GetDropListSelectedItem("editAffiliationDepartmentDropList")
//            if (item1 != null) { departmentId1 = item1.id; }

//            if ((this.facultyRanks() != null) && (this.facultyRanks().length > 0)) {
//                item1 = me.GetDropListSelectedItem("editAffiliationFacultyRankDropList")
//                if (item1 != null) { facultyRankId1 = item1.id; }
//            }

//            var affiliation = {
//                id: affiliationId,
//                personId: me.personId,
//                establishmentId: establishmentId,
//                campusId: campusId1,
//                collegeId: collegeId1,
//                departmentId: departmentId1,
//                facultyRankId: facultyRankId1
//            };

//            var model = ko.mapping.toJS(affiliation);

//            $.ajax({
//                async: false,
//                url: (affiliationId == null) ?
//                App.Routes.WebApi.My.Affiliations.post() :
//                App.Routes.WebApi.My.Affiliations.put(model.id),
//                type: (affiliationId == null) ? 'POST' : 'PUT',
//                data: model
//            })
//                .done(function (responseText, statusText, xhr) {
//                    if (statusText === "success") {
//                        $("#editAffiliationDialog").dialog("close");

//                        //debugger;
//                        //var tab = $("#tabstrip").data("kendoTabStrip").select()[0];
//                        //var tabName = tab.innerText; // IE
//                        //if (tabName == null) tabName = tab.textContent; // FF
//                        //tabName = me.tabTitleToName(tabName);                                   
//                        //location.href = App.Routes.Mvc.My.Profile.post(true,tabName);

//                        //location.href = App.Routes.Mvc.My.Profile.get();

//                        me._reloadAffiliations();
//                    }
//                    else {
//                        $("#affiliationErrorDialog").dialog({
//                            title: xhr.statusText,
//                            width: 400,
//                            height: 250,
//                            modal: true,
//                            resizable: false,
//                            draggable: false,
//                            buttons: {
//                                Ok: function () {
//                                    $("#affiliationErrorDialog").dialog("close");
//                                }
//                            },
//                            open: function (event, ui) {
//                                $("#affiliationErrorDialogMessage").text(xhr.responseText);
//                            }
//                        });
//                    }
//                })
//                .fail((xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
//                    $("#editAffiliationDialog").dialog("close");
//                    var info = xhr.responseText && xhr.responseText.length < 1000
//                        ? xhr.responseText
//                        : 'An unexpected error occurred, please try again. If you continue to experience this issue, use the Feedback & Support link on this page to report it.';
//                    alert(info);
//                });
//        }

//        private deleteAffiliation(affiliationId: number): void {
//            var me = this;
//            $("#confirmAffiliationDeleteDialog").dialog({
//                width: 300,
//                height: 200,
//                modal: true,
//                resizable: false,
//                draggable: false,
//                buttons: {
//                    "Delete": function () {
//                        $(this).dialog("close");

//                        var affiliation = {
//                            id: affiliationId,
//                            personId: me.personId,
//                            establishmentId: null,
//                            campusId: null,
//                            collegeId: null,
//                            departmentId: null,
//                            facultyRankId: null
//                        };

//                        var model = ko.mapping.toJS(affiliation);

//                        $.ajax({
//                            type: "DELETE",
//                            url: App.Routes.WebApi.My.Affiliations.del(model.id)
//                        })
//                            .done((data: any, statusText: string, xhr: JQueryXHR): void => {
//                                if (statusText !== "success") {
//                                    $("#affiliationErrorDialog").dialog({
//                                        title: xhr.statusText,
//                                        width: 400,
//                                        height: 250,
//                                        modal: true,
//                                        resizable: false,
//                                        draggable: false,
//                                        buttons: {
//                                            Ok: function () {
//                                                $("#affiliationErrorDialog").dialog("close");
//                                            }
//                                        },
//                                        open: function (event, ui) {
//                                            $("#affiliationErrorDialogMessage").text(xhr.responseText);
//                                        }
//                                    });
//                                }

//                                $("#editAffiliationDialog").dialog("close");
//                                me._reloadAffiliations();
//                            })
//                            .fail((xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
//                                alert(xhr.responseText);
//                                $("#editAffiliationDialog").dialog("close");
//                            });
//                    },

//                    "Cancel": function () {
//                        $(this).dialog("close");
//                    }
//                }
//            });
//        }


//        deleteProfile(data: any, event: any) {
//            var me = this;
//            $("#confirmProfileDeleteDialog").dialog({
//                width: 300,
//                height: 200,
//                modal: true,
//                resizable: false,
//                draggable: false,
//                buttons: {
//                    "Delete": function () {
//                        $.ajax({
//                            async: false,
//                            type: "DELETE",
//                            url: App.Routes.WebApi.People.del(me.personId),
//                            success: function (data, statusText, jqXHR) {
//                                alert(jqXHR.statusText);
//                            },
//                            error: function (jqXHR, statusText, errorThrown) {
//                                alert(statusText);
//                            },
//                            complete: function (jqXHR, statusText) {
//                                $("#confirmProfileDeleteDialog").dialog("close");
//                            }
//                        });
//                    },

//                    "Cancel": function () {
//                        $(this).dialog("close");
//                    }
//                }
//            });
//        }
//    }

//}

