/// <reference path="../../jquery/jquery-1.8.d.ts" />
/// <reference path="../../jquery/jqueryui-1.9.d.ts" />
/// <reference path="../../ko/knockout-2.2.d.ts" />
/// <reference path="../../ko/knockout.mapping-2.0.d.ts" />
/// <reference path="../../datacontext/iemployee.ts" />

module ViewModels.Employee {

	export class PersonalInfo {

		private _dataContext: DataContext.IEmployee;

		private _revisionId: number;
		get RevisionId() { return this._revisionId; }
		set RevisionId(inValue: number) { this._revisionId = inValue; }

		private _isActive: KnockoutObservableBool = ko.observable();
		get IsActive() { return this._isActive(); }
		set IsActive(inValue: bool) { this._isActive(inValue); }

		private _isDisplayNameDerived: KnockoutObservableBool = ko.observable();
		get IsDisplayNameDerived() { return this._isDisplayNameDerived(); }
		set IsDisplayNameDerived(inValue: bool) { this._isDisplayNameDerived(inValue); }

		private _displayName: KnockoutObservableString = ko.observable();
		get DisplayName() { return this._displayName(); }
		set DisplayName(inValue: string) { this._displayName(inValue); }

		private _salutations: KnockoutObservableArray = ko.observableArray();
		get Salutations() { return this._salutations(); }
		set Salutations(inValue: any[]) { this._salutations(inValue); }

		private _salutation: KnockoutObservableString = ko.observable();
		get Salutation() { return this._salutation(); }
		set Salutation(inValue: string) { this._salutation(inValue); }

		private _firstName: KnockoutObservableString = ko.observable();
		get FirstName() { return this._firstName(); }
		set FirstName(inValue: string) { this._firstName(inValue); }

		private _middleName: KnockoutObservableString = ko.observable();
		get MiddleName() { return this._middleName(); }
		set MiddleName(inValue: string) { this._middleName(inValue); }

		private _lastName: KnockoutObservableString = ko.observable();
		get LastName() { return this._lastName(); }
		set LastName(inValue: string) { this._lastName(inValue); }

		private _suffix: KnockoutObservableString = ko.observable();
		get Suffix() { return this._suffix(); }
		set Suffix(inValue: string) { this._suffix(inValue); }

		private _workingTitle: KnockoutObservableString = ko.observable();
		get WorkingTitle() { return this._workingTitle(); }
		set WorkingTitle(inValue: string) { this._workingTitle(inValue); }

		private _gender: KnockoutObservableString = ko.observable();
		get Gender() { return this._gender(); }
		set Gender(inValue: string) { this._gender(inValue); }

		private _facultyRanks: KnockoutObservableArray = ko.observableArray();
		get FacultyRanks() { return this._facultyRanks(); }
		set FacultyRanks(inValue: any[]) { this._facultyRanks(inValue); }
		FacultyRanks_Add(inRank: any): void { this._facultyRanks.push(inRank); }

		private _facultyRank: KnockoutObservableAny = ko.observable();
		get FacultyRank() { return this._facultyRank(); }
		set FacultyRank(inValue: any) { this._facultyRank(inValue); }

		private _administrativeAppointments: KnockoutObservableString = ko.observable();
		get AdministrativeAppointments() { return this._administrativeAppointments(); }
		set AdministrativeAppointments(inValue: string) { this._administrativeAppointments(inValue); }

		private _picture: KnockoutObservableAny = ko.observable();
		get Picture() { return this._picture(); }
		set Picture(inValue: any) { this._picture(inValue); }

		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		private _initialize(inDocumentElementId: String) {
			var me = this;

			/* We are going to start two asynch processes. One to load salutations and the other
			 * to load the faculty ranks.  We will then wait for both before continuing.
			 */
			var getSalutationsPact: JQueryPromise = me._dataContext.GetSalutations();
			getSalutationsPact.then(
			/* Success */
			function (salutations: any): void {
				for (var i = 0; i < salutations.length; i += 1) {
					me.Salutations.push(salutations[i]);
				}
			},
			/* Fail */
			function (error: any): void {
			});

			var getFacultyRanksPact = me._dataContext.GetFacultyRanks();
			getFacultyRanksPact.then(
			/* Success */
			function (facultyRanks: any): void {
				for (var i = 0; i < facultyRanks.length; i += 1) {
					me.FacultyRanks_Add(facultyRanks[i]);
				}
			},
			/* Fail */
			function (error: any): void {
			});

			// Wait for all loading of selector options before continuing.
			$.when(getSalutationsPact, getFacultyRanksPact)
					.then( /* Continue once selector data has been loaded */
							/* Success (selector data)*/
							function (data: any): void {
								me._dataContext.Get()
									.then( /* Load the viewmodel and apply bindings. */
										/* Success (load viewmodel data)*/
										function (data: any): void {
											me.ToViewModel(me, data);
											ko.applyBindings(me, $("#" + inDocumentElementId).get(0));
										},
										/* Fail (load viewmodel data)*/
										function (data): void {
										});
							},
								/* Fail (selector data)*/
							function (data: any): void { }
						);
		}

		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		constructor(inDocumentElementId: String, inDataContext: DataContext.IEmployee) {
			this._dataContext = inDataContext;
			this._initialize(inDocumentElementId);
		}

		// --------------------------------------------------------------------------------
		/*
				Map data returned from data context to the view model.
		*/
		// --------------------------------------------------------------------------------
		ToViewModel(inSelf: any, data: any): void {
			var me: PersonalInfo = inSelf;

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
			if (data.employeeFacultyRank != null) {
				var i: number = 0;
				while ((i < me.FacultyRanks.length) &&
						 (me.FacultyRanks[i].id != data.employeeFacultyRank.id))
				{ i += 1; }

				if (i < me.FacultyRanks.length) {
					me.FacultyRank = me.FacultyRanks[i];
				}
			}
			else {
				me.FacultyRank = null;
			}
			me.AdministrativeAppointments = (data.administrativeAppointments != null) ? data.administrativeAppointments : "";
			me.Picture = data.picture;
		}

		// --------------------------------------------------------------------------------
		/*
				Return an object for data context.
		*/
		// --------------------------------------------------------------------------------
		FromViewModel(inSelf: any): any {
			var me: PersonalInfo = inSelf;

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
				employeeFacultyRank: (me.FacultyRank != null) ?
					{ id: me.FacultyRank.id, rank: me.FacultyRank.rank } :
					null,
				administrativeAppointments: (me.AdministrativeAppointments.length > 0) ? me.AdministrativeAppointments : null,
				picture: me.Picture
			};
		}

		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		saveInfo(formElement: HTMLFormElement): void {
			this._dataContext.Put(this.FromViewModel(this))
					.then(  /* Success */ function (data: any): void { },
									/* Fail */ function (errorThrown: string): void { });

			$("#accordion").accordion('activate', 1);	// Open next panel
		}

		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		saveEmails(formElement: HTMLFormElement): void {
			$("#accordion").accordion('activate', 2);	// Open next panel
		}

		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		saveAffiliations(formElement: HTMLFormElement): void {
			$("#accordion").accordion('activate', 3);	// Open next panel
		}


		// --------------------------------------------------------------------------------
		/*
		*/
		// --------------------------------------------------------------------------------
		savePicture(formElement: HTMLFormElement): void {
			$("#accordion").accordion('activate', 0);	// Open next panel
		}


	} // class PersonalInfo

}

