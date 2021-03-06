module ViewModels.InternationalAffiliations {

    export class InternationalAffiliationSearchInput {
        personId: number;
        orderBy: string;
        pageSize: number;
        pageNumber: number;
    }

    export class InternationalAffiliationList {
        personId: number;
        orderBy: string;
        pageSize: number;
        pageNumber: number;
        items: KnockoutObservableArray<any>;

        constructor(personId: number) {
            this.personId = personId;
        }

        load(): JQueryPromise<any> {
            var deferred: JQueryDeferred<void> = $.Deferred();
            var affiliationSearchInput: InternationalAffiliationSearchInput = new InternationalAffiliationSearchInput();

            affiliationSearchInput.personId = this.personId;
            affiliationSearchInput.orderBy = "";
            affiliationSearchInput.pageNumber = 1;
            affiliationSearchInput.pageSize = App.Constants.int32Max;

            $.get(App.Routes.WebApi.InternationalAffiliations.get(), affiliationSearchInput)
                .done((data: any, textStatus: string, jqXHR: JQueryXHR): void => {
                    {
                        ko.mapping.fromJS(data, {}, this);
                        deferred.resolve();
                    }
                })
                .fail((jqXhr: JQueryXHR, textStatus: string, errorThrown: string): void => {
                    {
                        deferred.reject(jqXhr, textStatus, errorThrown);
                    }
                });

            return deferred;
        }

        deleteAffiliationById(affiliationId: number): void {
            $.ajax({
                async: false,
                type: "DELETE",
                url: App.Routes.WebApi.InternationalAffiliations.del(affiliationId),
                success: (data: any, textStatus: string, jqXHR: JQueryXHR): void =>
                { },
                error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void =>
                {
                    alert(textStatus);
                }
            });
        }

        deleteAffiliation(data: any, event: any, viewModel: any): void {
            $("#confirmInternationalAffiliationDeleteDialog").dialog({
                dialogClass: 'jquery-ui',
                width: 'auto',
                resizable: false,
                modal: true,
                buttons: [
                            {
                                text: "Yes, confirm delete", click: function (): void {
                                    viewModel.deleteAffiliationById(data.id());
                                    $(this).dialog("close");

                                    /* TBD - Don't reload page. */
                                    location.href = App.Routes.Mvc.My.Profile.get("international-affiliation");
                                }
                            },
                            {
                                text: "No, cancel delete", click: function (): void {
                                    $(this).dialog("close");
                                }
                            },
                ]
            });
        }

        editUrl(affiliationId: number): string {
            return App.Routes.Mvc.My.InternationalAffiliations.edit(affiliationId);
        }

        formatLocations(locations: any): string {
            var formattedLocations: string = "";

            for (var i = 0; i < locations.length; i += 1)
            {
                if (i > 0) { formattedLocations += ", "; }
                formattedLocations += locations[i].placeOfficialName();
            }

            return formattedLocations;
        }

        formatDates(from: number, to: number, onGoing: boolean): string {
            var formattedDateRange: string = from.toString();

            if (onGoing) {
                formattedDateRange += " (Ongoing)";
            } else if (to != null)
            {
                formattedDateRange += " - " + to.toString();
            }

            if (formattedDateRange.length > 0)
            {
                formattedDateRange += "\xa0\xa0";
            }

            return formattedDateRange;
        }
    }
}
