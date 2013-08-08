/// <reference path="../../jquery/jquery.d.ts" />
/// <reference path="../../jquery/jqueryui.d.ts" />
/// <reference path="../../ko/knockout.d.ts" />
/// <reference path="../../ko/knockout.mapping.d.ts" />
/// <reference path="../../ko/knockout.extensions.d.ts" />
/// <reference path="../../ko/knockout.validation.d.ts" />
/// <reference path="../../kendo/kendo.all.d.ts" />
/// <reference path="../../tinymce/tinymce.d.ts" />
/// <reference path="../../oss/moment.d.ts" />
/// <reference path="../../app/Routes.ts" />
/// <reference path="../degrees/ServiceApiModel.d.ts" />
/// <reference path="../../kendo/kendo.all.d.ts" />

module ViewModels.Degrees {
    // ================================================================================
    /* 
    */
    // ================================================================================
    export class Degree implements Service.ApiModels.Degree.IObservableDegree {
        /* Initialization errors. */
        inititializationErrors: string = "";

        /* True if any field changes. */
        dirtyFlag: KnockoutObservableBool = ko.observable( false );

        /* Element id of institution autocomplete */
        institutionSelectorId: string;

        /* IObservableDegree implemented */
        id: KnockoutObservableNumber;
        version: KnockoutObservableString;
        personId: KnockoutObservableNumber;
        whenLastUpdated: KnockoutObservableString;
        whoLastUpdated: KnockoutObservableString;
        title: KnockoutObservableString;
        fieldOfStudy: KnockoutObservableString;
        yearAwarded: KnockoutObservableAny;
        institutionId: KnockoutObservableAny;
        institutionOfficialName: KnockoutObservableString;
        institutionCountryOfficialName: KnockoutObservableString;
        errors: KnockoutValidationErrors;
        isValid: () => bool;
        isAnyMessageShown: () => bool;

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------
        _initialize( degreeId: number ): void {
            this.id = ko.observable(degreeId);
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------   
        setupWidgets( institutionSelectorId: string ): void {

            this.institutionSelectorId = institutionSelectorId;

            $( "#" + institutionSelectorId ).kendoAutoComplete( {
                minLength: 3,
                filter: "contains",
                ignoreCase: true,
                placeholder: "[Enter Institution]",
                dataTextField: "officialName",
                dataSource: new kendo.data.DataSource( {
                    serverFiltering: true,
                    transport: {
                        read: ( options: any ): void => {
                            $.ajax( {
                                url: App.Routes.WebApi.Establishments.get(),
                                data: {
                                    keyword: options.data.filter.filters[0].value,
                                    pageNumber: 1,
                                    pageSize: 2147483647 /* C# Int32.Max */
                                },
                                success: ( results: any ): void => {
                                    options.success( results.items );
                                }
                            } );
                        }
                    }
                } ),
                change: ( e: any ): void => {
                    this.checkInstitutionForNull();
                },
                select: ( e: any ): void => {
                    var me = $( "#" + institutionSelectorId ).data( "kendoAutoComplete" );
                    var dataItem = me.dataItem( e.item.index() );
                    this.institutionOfficialName(dataItem.officialName);
                    this.institutionId(dataItem.id);
                    if ( ( dataItem.countryName != null ) && ( dataItem.countryName.length > 0 ) ) {
                        this.institutionCountryOfficialName(dataItem.countryName);
                    }
                    else {
                        this.institutionCountryOfficialName(null);
                    }
                }
            } );
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------
        checkInstitutionForNull() {
            var me = $( "#" + this.institutionSelectorId ).data( "kendoAutoComplete" );
            var value = (me.value() != null) ? me.value().toString() : null;
            if (value != null) {
                value = $.trim(value);
            }
            if ((value == null) || (value.length == 0)) {
                me.value( null );
                this.institutionOfficialName( null );
                this.institutionId( null );
            }
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------
        setupValidation(): void {
            this.title.extend( { required: true, minLength: 1, maxLength: 256} );
            this.yearAwarded.extend( { min: 1900 } );

            ko.validation.group( this );
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------
        setupSubscriptions(): void {
            this.title.subscribe((newValue: any): void => { this.dirtyFlag(true); });
            this.fieldOfStudy.subscribe((newValue: any): void => { this.dirtyFlag(true); });
            this.yearAwarded.subscribe((newValue: any): void => { this.dirtyFlag(true); });
            this.institutionId.subscribe((newValue: any): void => { this.dirtyFlag(true); });
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------  
        constructor( educationId: number ) {
            this._initialize( educationId );
        }

        // --------------------------------------------------------------------------------
        /* 
        */
        // --------------------------------------------------------------------------------
        load(): JQueryPromise {
            var deferred: JQueryDeferred = $.Deferred();

            if ( this.id() == 0 ) {
                this.version = ko.observable( null );
                this.personId = ko.observable( 0 );
                this.title = ko.observable( null );
                this.fieldOfStudy = ko.observable( null );
                this.yearAwarded = ko.observable( null );
                this.whenLastUpdated = ko.observable( null );
                this.whoLastUpdated = ko.observable( null );
                this.institutionId = ko.observable( null );
                this.institutionOfficialName = ko.observable( null );
                this.institutionCountryOfficialName = ko.observable( null );
                deferred.resolve();
            }
            else {
                var dataPact = $.Deferred();

                $.ajax( {
                    type: "GET",
                    url: App.Routes.WebApi.My.Degrees.get( this.id() ),
                    success: function ( data: Service.ApiModels.Degree.IDegreePage, textStatus: string, jqXhr: JQueryXHR ): void
                        { dataPact.resolve( data ); },
                    error: function ( jqXhr: JQueryXHR, textStatus: string, errorThrown: string ): void
                        { dataPact.reject( jqXhr, textStatus, errorThrown ); },
                } );

                // only process after all requests have been resolved
                $.when( dataPact )
                              .done( ( data: Service.ApiModels.Degree.IObservableDegree ): void => {

                                  ko.mapping.fromJS( data, {}, this );

                                  deferred.resolve();
                              } )
                              .fail( ( xhr: JQueryXHR, textStatus: string, errorThrown: string ): void => {
                                  deferred.reject( xhr, textStatus, errorThrown );
                              } );
            }

            return deferred;
        }

        // --------------------------------------------------------------------------------
        /*
        */
        // --------------------------------------------------------------------------------
        save( viewModel: any, event: any ): void {
            if (!this.isValid()) {
                // TBD - need dialog here.
                this.errors.showAllMessages(); 
                return;
            }

            /* If there is no year, return as null, not 0 */
            if ( this.yearAwarded() != null ) {
                var yearAwaredStr = this.yearAwarded().toString();
                yearAwaredStr = $.trim(yearAwaredStr);
                if ( yearAwaredStr.length == 0 ) {
                    this.yearAwarded( null );
                }
            }

            /* If there is no institution, return institutionId as null, not 0 */
            this.checkInstitutionForNull();

            var mapSource = {
                id : this.id,
                version : this.version,
                personId : this.personId,
                whenLastUpdated : this.whenLastUpdated,
                whoLastUpdated : this.whoLastUpdated,
                title : this.title,
                fieldOfStudy : this.fieldOfStudy,
                yearAwarded : this.yearAwarded,
                institutionId : this.institutionId
            };

            var model = ko.mapping.toJS( mapSource );

            var url = (viewModel.id() == 0) ?
                        App.Routes.WebApi.My.Degrees.post() :
                        App.Routes.WebApi.My.Degrees.put( viewModel.id() );

            var type = (viewModel.id() == 0) ?  "POST" : "PUT";

            $.ajax( {
                type: type,
                async: false,
                url: url,
                data: model,
                success: ( data: any, textStatus: string, jqXhr: JQueryXHR ): void => {
                },
                error: (xhr: JQueryXHR): void => {
                    App.Failures.message(xhr, 'while trying to save your degree', true);
                },
                complete: ( jqXhr: JQueryXHR, textStatus: string ): void => {
                    location.href = App.Routes.Mvc.My.Profile.get() + '#/formal-education';
                }
            } );
        }

        // --------------------------------------------------------------------------------
        /*  
        */
        // --------------------------------------------------------------------------------
        cancel( item: any, event: any, mode: string ): void {
            if ( this.dirtyFlag() == true ) {
                $( "#cancelConfirmDialog" ).dialog( {
                    modal: true,
                    resizable: false,
                    width: 450,
                    buttons: {
                        "Do not cancel": function () {
                            $( this ).dialog( "close" );
                        },
                        "Cancel and lose changes": function () {
                            $( this ).dialog( "close" );
                            location.href = App.Routes.Mvc.My.Profile.get("formal-education");
                        }
                    }
                } );
            } else {
                //location.href = App.Routes.Mvc.My.Profile.get() + '#/formal-education';
                history.back();
            }
        }
    }
}
