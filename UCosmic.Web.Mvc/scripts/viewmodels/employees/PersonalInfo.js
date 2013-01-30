var ViewModels;
(function (ViewModels) {
    (function (Employee) {
        var PersonalInfo = (function () {
            function PersonalInfo(inDocumentElementId, inDataContext) {
                this._isActive = ko.observable();
                this._isDisplayNameDerived = ko.observable();
                this._displayName = ko.observable();
                this._salutations = ko.observableArray();
                this._salutation = ko.observable();
                this._firstName = ko.observable();
                this._middleName = ko.observable();
                this._lastName = ko.observable();
                this._suffix = ko.observable();
                this._workingTitle = ko.observable();
                this._gender = ko.observable();
                this._facultyRanks = ko.observableArray();
                this._facultyRank = ko.observable();
                this._administrativeAppointments = ko.observable();
                this._picture = ko.observable();
                this._dataContext = inDataContext;
                this._initialize(inDocumentElementId);
            }
            Object.defineProperty(PersonalInfo.prototype, "RevisionId", {
                get: function () {
                    return this._revisionId;
                },
                set: function (inValue) {
                    this._revisionId = inValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "IsActive", {
                get: function () {
                    return this._isActive();
                },
                set: function (inValue) {
                    this._isActive(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "IsDisplayNameDerived", {
                get: function () {
                    return this._isDisplayNameDerived();
                },
                set: function (inValue) {
                    this._isDisplayNameDerived(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "DisplayName", {
                get: function () {
                    return this._displayName();
                },
                set: function (inValue) {
                    this._displayName(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "Salutations", {
                get: function () {
                    return this._salutations();
                },
                set: function (inValue) {
                    this._salutations(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "Salutation", {
                get: function () {
                    return this._salutation();
                },
                set: function (inValue) {
                    this._salutation(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "FirstName", {
                get: function () {
                    return this._firstName();
                },
                set: function (inValue) {
                    this._firstName(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "MiddleName", {
                get: function () {
                    return this._middleName();
                },
                set: function (inValue) {
                    this._middleName(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "LastName", {
                get: function () {
                    return this._lastName();
                },
                set: function (inValue) {
                    this._lastName(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "Suffix", {
                get: function () {
                    return this._suffix();
                },
                set: function (inValue) {
                    this._suffix(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "WorkingTitle", {
                get: function () {
                    return this._workingTitle();
                },
                set: function (inValue) {
                    this._workingTitle(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "Gender", {
                get: function () {
                    return this._gender();
                },
                set: function (inValue) {
                    this._gender(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "FacultyRanks", {
                get: function () {
                    return this._facultyRanks();
                },
                set: function (inValue) {
                    this._facultyRanks(inValue);
                },
                enumerable: true,
                configurable: true
            });
            PersonalInfo.prototype.FacultyRanks_Add = function (inRank) {
                this._facultyRanks.push(inRank);
            };
            Object.defineProperty(PersonalInfo.prototype, "FacultyRank", {
                get: function () {
                    return this._facultyRank();
                },
                set: function (inValue) {
                    this._facultyRank(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "AdministrativeAppointments", {
                get: function () {
                    return this._administrativeAppointments();
                },
                set: function (inValue) {
                    this._administrativeAppointments(inValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PersonalInfo.prototype, "Picture", {
                get: function () {
                    return this._picture();
                },
                set: function (inValue) {
                    this._picture(inValue);
                },
                enumerable: true,
                configurable: true
            });
            PersonalInfo.prototype._initialize = function (inDocumentElementId) {
                var me = this;
                var getSalutationsPact = me._dataContext.GetSalutations();
                getSalutationsPact.then(function (salutations) {
                    for(var i = 0; i < salutations.length; i += 1) {
                        me.Salutations.push(salutations[i]);
                    }
                }, function (error) {
                });
                var getFacultyRanksPact = me._dataContext.GetFacultyRanks();
                getFacultyRanksPact.then(function (facultyRanks) {
                    for(var i = 0; i < facultyRanks.length; i += 1) {
                        me.FacultyRanks_Add(facultyRanks[i]);
                    }
                }, function (error) {
                });
                $.when(getSalutationsPact, getFacultyRanksPact).then(function (data) {
                    me._dataContext.Get().then(function (data) {
                        me.ToViewModel(me, data);
                        ko.applyBindings(me, $("#" + inDocumentElementId).get(0));
                    }, function (data) {
                    });
                }, function (data) {
                });
            };
            PersonalInfo.prototype.ToViewModel = function (inSelf, data) {
                var me = inSelf;
                me.RevisionId = data.revisionId;
                me.IsActive = data.isActive;
                me.IsDisplayNameDerived = data.isDisplayNameDerived;
                me.DisplayName = (data.displayName != null) ? data.displayName : "";
                me.Salutation = (data.salutation != null) ? data.salutation : "";
                me.FirstName = (data.firstName != null) ? data.firstName : "";
                me.MiddleName = (data.middleName != null) ? data.middleName : "";
                me.LastName = (data.lastName != null) ? data.lastName : "";
                me.Suffix = (data.suffix != null) ? data.suffix : "";
                me.WorkingTitle = (data.workingTitle != null) ? data.workingTitle : "";
                me.Gender = data.gender;
                if(data.employeeFacultyRank != null) {
                    var i = 0;
                    while((i < me.FacultyRanks.length) && (me.FacultyRanks[i].id != data.employeeFacultyRank.id)) {
                        i += 1;
                    }
                    if(i < me.FacultyRanks.length) {
                        me.FacultyRank = me.FacultyRanks[i];
                    }
                } else {
                    me.FacultyRank = null;
                }
                me.AdministrativeAppointments = (data.administrativeAppointments != null) ? data.administrativeAppointments : "";
                me.Picture = data.picture;
            };
            PersonalInfo.prototype.FromViewModel = function (inSelf) {
                var me = inSelf;
                return {
                    revisionId: me.RevisionId,
                    isActive: me.IsActive,
                    isDisplayNameDerived: me.IsDisplayNameDerived,
                    displayName: (me.DisplayName.length > 0) ? me.DisplayName : null,
                    salutation: (me.Salutation.length > 0) ? me.Salutation : null,
                    firstName: (me.FirstName.length > 0) ? me.FirstName : null,
                    middleName: (me.MiddleName.length > 0) ? me.MiddleName : null,
                    lastName: (me.LastName.length > 0) ? me.LastName : null,
                    suffix: (me.Suffix.length > 0) ? me.Suffix : null,
                    workingTitle: me.WorkingTitle,
                    gender: me.Gender,
                    employeeFacultyRank: (me.FacultyRank != null) ? {
                        id: me.FacultyRank.id,
                        rank: me.FacultyRank.rank
                    } : null,
                    administrativeAppointments: (me.AdministrativeAppointments.length > 0) ? me.AdministrativeAppointments : null,
                    picture: me.Picture
                };
            };
            PersonalInfo.prototype.saveInfo = function (formElement) {
                this._dataContext.Put(this.FromViewModel(this)).then(function (data) {
                }, function (errorThrown) {
                });
                $("#accordion").accordion('activate', 1);
            };
            PersonalInfo.prototype.saveEmails = function (formElement) {
                $("#accordion").accordion('activate', 2);
            };
            PersonalInfo.prototype.saveAffiliations = function (formElement) {
                $("#accordion").accordion('activate', 3);
            };
            PersonalInfo.prototype.savePicture = function (formElement) {
                $("#accordion").accordion('activate', 0);
            };
            return PersonalInfo;
        })();
        Employee.PersonalInfo = PersonalInfo;        
    })(ViewModels.Employee || (ViewModels.Employee = {}));
    var Employee = ViewModels.Employee;
})(ViewModels || (ViewModels = {}));
