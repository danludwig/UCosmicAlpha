/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../app/Routes.ts" />
/// <reference path="../../typings/kendo/kendo.all.d.ts" />
/// <reference path="../establishments/Url.ts" />
/// <reference path="../establishments/SearchResult.ts" />
/// <reference path="../establishments/Search.ts" />
/// <reference path="../establishments/Name.ts" />
/// <reference path="../establishments/Item.ts" />
module agreements {

    export class InstitutionalAgreementParticipantModel {
        constructor(isOwner: any, establishmentId: number, establishmentOfficialName: string,
            establishmentTranslatedName: string) {
            this.isOwner = ko.observable(isOwner);
            this.establishmentId = ko.observable(establishmentId);
            this.establishmentOfficialName = ko.observable(establishmentOfficialName);
            this.establishmentTranslatedName = ko.observable(establishmentTranslatedName);
        }
        isOwner;
        establishmentId;
        establishmentOfficialName;
        establishmentTranslatedName;
    };

    export class establishmentSearchNav {
        constructor(editOrNewUrl, participantsClass, agreementIsEdit, agreementId, scrollBody, dfdPageFadeIn) {
            this.editOrNewUrl = editOrNewUrl;
            this.participantsClass = participantsClass;
            this.agreementIsEdit = agreementIsEdit;
            this.agreementId = agreementId;
            this.scrollBody = scrollBody;
            this.dfdPageFadeIn = dfdPageFadeIn;
        }

        //imported vars
        editOrNewUrl;
        participantsClass;
        agreementIsEdit;
        agreementId;
        scrollBody;
        dfdPageFadeIn;

        //search vars
        establishmentSearchViewModel = new Establishments.ViewModels.Search();
        establishmentItemViewModel;
        hasBoundSearch = { does: false };
        hasBoundItem = false;
        
        SearchPageBind(parentOrParticipant: string): void {
            var $cancelAddParticipant = $("#cancelAddParticipant");
            var $searchSideBarAddNew = $("#searchSideBarAddNew");
            this.establishmentSearchViewModel.detailTooltip = (): string => {
                return 'Choose this establishment as a ' + parentOrParticipant;
            }
        $cancelAddParticipant.off();
            $searchSideBarAddNew.off();
            $searchSideBarAddNew.on("click", (e) => {
                this.establishmentSearchViewModel.sammy.setLocation('#/new/');
                e.preventDefault();
                return false;
            });
            if (parentOrParticipant === "parent") {
                $cancelAddParticipant.on("click", (e) => {
                    this.establishmentSearchViewModel.sammy.setLocation('#/new/');
                    e.preventDefault();
                    return false;
                });
            } else {
                $cancelAddParticipant.on("click", (e) => {
                    this.establishmentSearchViewModel.sammy.setLocation('#/index');
                    e.preventDefault();
                    return false;
                });
            }
            var dfd = $.Deferred();
            var dfd2 = $.Deferred();
            var $obj = $("#allParticipants");
            var $obj2 = $("#addEstablishment");
            var time = 500;
            this.fadeModsOut(dfd, dfd2, $obj, $obj2, time);
            $.when(dfd, dfd2)
                .done(function () {
                    $("#estSearch").fadeIn(500);
                });
        }

        //fade non active modules out
        fadeModsOut(dfd, dfd2, $obj, $obj2, time): void {
            if ($obj.css("display") !== "none") {
                $obj.fadeOut(time, function () {
                    dfd.resolve();
                });
            }
            else {
                dfd.resolve();
            }
            if ($obj2.css("display") !== "none") {
                $obj2.fadeOut(time, function () {
                    dfd2.resolve();
                });
            }
            else {
                dfd2.resolve();
            }
        }

        //sammy navigation
        bindSearch(): void {
            if (!this.hasBoundSearch.does) {
            this.establishmentSearchViewModel.sammyBeforeRoute = /\#\/index\/(.*)\//;
            this.establishmentSearchViewModel.sammyGetPageRoute = '#/index';
            this.establishmentSearchViewModel.sammyDefaultPageRoute = '/agreements[\/]?';
            ko.applyBindings(this.establishmentSearchViewModel, $('#estSearch')[0]);
            var lastURL = "asdf";
            if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf("#") === -1) {
                if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf("" + this.editOrNewUrl.val + "") === -1) {
                    this.establishmentSearchViewModel.sammy.setLocation("/agreements/" + this.editOrNewUrl.val + "#/index");
                } else {
                    this.establishmentSearchViewModel.sammy.setLocation('#/index');
                }
            }
            if (sessionStorage.getItem("addest") == undefined) {
                sessionStorage.setItem("addest", "no");
            }
            //Check the url for changes
            this.establishmentSearchViewModel.sammy.bind("location-changed", () => {
                if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf(lastURL) < 0) {
                    var $asideRootSearch = $("#asideRootSearch");
                    var $asideParentSearch = $("#asideParentSearch");
                    if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf("" + this.editOrNewUrl.val + "#/new/") > 0) {
                        var $addEstablishment = $("#addEstablishment");
                        var dfd = $.Deferred();
                        var dfd2 = $.Deferred();
                        var $obj = $("#estSearch");
                        var $obj2 = $("#allParticipants");
                        var time = 500;
                        this.fadeModsOut(dfd, dfd2, $obj, $obj2, time);
                        $.when(dfd, dfd2)
                            .done(() => {
                                $addEstablishment.css("visibility", "").hide().fadeIn(500, () => {
                                    if (!this.hasBoundItem) {
                                        this.establishmentItemViewModel = new Establishments.ViewModels.Item();
                                        this.establishmentItemViewModel.goToSearch = () => {
                                            sessionStorage.setItem("addest", "yes");
                                            this.establishmentSearchViewModel.sammy.setLocation('#/page/1/');
                                        }
                                        this.establishmentItemViewModel.submitToCreate = (formElement: HTMLFormElement): boolean => {
                                            if (!this.establishmentItemViewModel.id || this.establishmentItemViewModel.id === 0) {
                                                var me = this.establishmentItemViewModel;
                                                this.establishmentItemViewModel.validatingSpinner.start();
                                                // reference the single name and url
                                                var officialName: Establishments.ViewModels.Name = this.establishmentItemViewModel.names()[0];
                                                var officialUrl: Establishments.ViewModels.Url = this.establishmentItemViewModel.urls()[0];
                                                var location = this.establishmentItemViewModel.location;
                                                // wait for async validation to stop
                                                if (officialName.text.isValidating() || officialUrl.value.isValidating() ||
                                                    this.establishmentItemViewModel.ceebCode.isValidating() || this.establishmentItemViewModel.uCosmicCode.isValidating()) {
                                                    setTimeout((): boolean => {
                                                        var waitResult = this.establishmentItemViewModel.submitToCreate(formElement);
                                                        return false;
                                                    }, 50);
                                                    return false;
                                                }
                                                // check validity
                                                this.establishmentItemViewModel.isValidationSummaryVisible(true);
                                                if (!this.establishmentItemViewModel.isValid()) {
                                                    this.establishmentItemViewModel.errors.showAllMessages();
                                                }
                                                if (!officialName.isValid()) {
                                                    officialName.errors.showAllMessages();
                                                }
                                                if (!officialUrl.isValid()) {
                                                    officialUrl.errors.showAllMessages();
                                                }
                                                this.establishmentItemViewModel.validatingSpinner.stop();

                                                if (officialName.isValid() && officialUrl.isValid() && this.establishmentItemViewModel.isValid()) {
                                                    var $LoadingPage = $("#LoadingPage").find("strong")
                                                    var url = App.Routes.WebApi.Establishments.post();
                                                    var data = this.establishmentItemViewModel.serializeData();
                                                    $LoadingPage.text("Creating Establishment...");
                                                    data.officialName = officialName.serializeData();
                                                    data.officialUrl = officialUrl.serializeData();
                                                    data.location = location.serializeData();
                                                    this.establishmentItemViewModel.createSpinner.start();
                                                    $.post(url, data)
                                                        .done((response: any, statusText: string, xhr: JQueryXHR): void => {
                                                            this.establishmentItemViewModel.createSpinner.stop();
                                                            $LoadingPage.text("Establishment created, you are being redirected to previous page...");
                                                            $("#addEstablishment").fadeOut(500, () => {
                                                                $("#LoadingPage").fadeIn(500);
                                                                setTimeout(() => {
                                                                    $("#LoadingPage").fadeOut(500, function () {
                                                                        $LoadingPage.text("Loading Page...");
                                                                    });
                                                                    this.establishmentSearchViewModel.sammy.setLocation('#/page/1/');
                                                                }, 5000);
                                                            });

                                                        })
                                                        .fail((xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
                                                            if (xhr.status === 400) { // validation message will be in xhr response text...
                                                                this.establishmentItemViewModel.$genericAlertDialog.find('p.content')
                                                                    .html(xhr.responseText.replace('\n', '<br /><br />'));
                                                                this.establishmentItemViewModel.$genericAlertDialog.dialog({
                                                                    title: 'Alert Message',
                                                                    dialogClass: 'jquery-ui',
                                                                    width: 'auto',
                                                                    resizable: false,
                                                                    modal: true,
                                                                    buttons: {
                                                                        'Ok': (): void => { this.establishmentItemViewModel.$genericAlertDialog.dialog('close'); }
                                                                    }
                                                                });
                                                            }
                                                        });
                                                }
                                            }
                                            return false;
                                        }
                                        ko.applyBindings(this.establishmentItemViewModel, $addEstablishment[0]);
                                        var $cancelAddEstablishment = $("#cancelAddEstablishment");
                                        $cancelAddEstablishment.on("click", (e) => {
                                            sessionStorage.setItem("addest", "no");
                                            this.establishmentSearchViewModel.sammy.setLocation('#/page/1/');
                                            e.preventDefault();
                                            return false;
                                        });
                                        this.hasBoundItem = true;
                                    }
                                });
                            })
                        scrollBody.scrollMyBody(0);
                        lastURL = "#/new/";
                    } else if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf("" + this.editOrNewUrl.val + "#/page/") > 0) {
                        if (sessionStorage.getItem("addest") === "yes") {
                            this.establishmentSearchViewModel.clickAction = (context): boolean => {
                                this.establishmentItemViewModel.parentEstablishment(context);
                                this.establishmentItemViewModel.parentId(context.id());
                                this.establishmentSearchViewModel.sammy.setLocation('#/new/');
                                return false;
                            }
                            this.establishmentSearchViewModel.header("Choose a parent establishment");
                            $asideRootSearch.hide();
                            $asideParentSearch.show();
                            this.SearchPageBind("parent");
                            this.establishmentSearchViewModel.header("Choose a parent establishment");
                        }
                        else {
                            $asideRootSearch.show();
                            $asideParentSearch.hide();
                            this.SearchPageBind("participant");
                            this.establishmentSearchViewModel.header("Choose a participant");
                            this.establishmentSearchViewModel.clickAction = (context): boolean => {
                                var myParticipant = new InstitutionalAgreementParticipantModel(
                                    false,
                                    context.id(),
                                    context.officialName(),
                                    context.translatedName()
                                    );
                                var alreadyExist = false;
                                for (var i = 0; i < this.participantsClass.participants().length; i++) {
                                    if (this.participantsClass.participants()[i].establishmentId() === myParticipant.establishmentId()) {
                                        alreadyExist = true;
                                        break;
                                    }
                                }
                                if (alreadyExist !== true) {
                                    $.ajax({
                                        url: App.Routes.WebApi.Agreements.Participants.isOwner(myParticipant.establishmentId()),
                                        type: 'GET',
                                        async: false
                                    })
                                        .done((response) => {
                                            myParticipant.isOwner(response);
                                            if (this.agreementIsEdit()) {
                                                var url = App.Routes.WebApi.Agreements.Participants.put(this.agreementId.val, myParticipant.establishmentId());
                                                $.ajax({
                                                    type: 'PUT',
                                                    url: url,
                                                    data: myParticipant,
                                                    success: (response: any, statusText: string, xhr: JQueryXHR): void => {
                                                        this.participantsClass.participants.push(myParticipant);
                                                    },
                                                    error: (xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
                                                        alert(xhr.responseText);
                                                    }
                                                });
                                            } else {
                                                this.participantsClass.participants.push(myParticipant);
                                            }
                                            this.establishmentSearchViewModel.sammy.setLocation("agreements/" + this.editOrNewUrl.val + "");
                                            $("body").css("min-height", ($(window).height() + $("body").height() - ($(window).height() * .85)));
                                        })
                                        .fail(() => {
                                            if (this.agreementIsEdit()) {
                                                var url = App.Routes.WebApi.Agreements.Participants.put(this.agreementId.val, myParticipant.establishmentId());
                                                $.ajax({
                                                    type: 'PUT',
                                                    url: url,
                                                    data: myParticipant,
                                                    success: (response: any, statusText: string, xhr: JQueryXHR): void => {
                                                        this.participantsClass.participants.push(myParticipant);
                                                    },
                                                    error: (xhr: JQueryXHR, statusText: string, errorThrown: string): void => {
                                                        alert(xhr.responseText);
                                                    }
                                                });
                                            } else {
                                                this.participantsClass.participants.push(myParticipant);
                                            }
                                            this.establishmentSearchViewModel.sammy.setLocation("agreements/" + this.editOrNewUrl.val + "");
                                        });
                                } else {
                                    alert("This Participant has already been added.")
                                }
                                return false;
                            }
                        }
                        scrollBody.scrollMyBody(0);
                        lastURL = "#/page/";
                    } else if (this.establishmentSearchViewModel.sammy.getLocation().toLowerCase().indexOf("agreements/" + this.editOrNewUrl.val + "") > 0) {
                        sessionStorage.setItem("addest", "no");
                        lastURL = "#/index";
                        this.establishmentSearchViewModel.sammy.setLocation('#/index');
                        var dfd = $.Deferred();
                        var dfd2 = $.Deferred();
                        var $obj = $("#estSearch");
                        var $obj2 = $("#addEstablishment");
                        var time = 500;
                        this.fadeModsOut(dfd, dfd2, $obj, $obj2, time);
                        $.when(dfd, dfd2)
                            .done(() => {
                                $("#allParticipants").fadeIn(500).promise().done(() => {
                                    $(this).show();
                                    scrollBody.scrollMyBody(0);
                                    this.dfdPageFadeIn.resolve();
                                });
                            });
                    } else {
                        window.location.replace(this.establishmentSearchViewModel.sammy.getLocation());
                    }
                }
            });
            this.establishmentSearchViewModel.sammy.run();
            }
        }
    }
}