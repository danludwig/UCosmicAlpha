/// <reference path="../../typings/knockout/knockout.d.ts" />

declare module Employees.ApiModels {

    export interface ActivityPlaceApiModel {
        placeId: number;
        placeName: string;
        isCountry: boolean;
        countryCode: string;
        activityIds: number[];
    }

    export interface ActivityPlacesInputModel {
        countries?: boolean;
        placeIds?: number[];
    }

    export interface ActivitiesSummary {
        personCount: number;
        activityCount: number;
        locationCount: number;
    }
}

declare module Employees.KoModels {

    export interface ActivitiesSummary {
        personCount: KnockoutObservable<string>;
        activityCount: KnockoutObservable<string>;
        locationCount: KnockoutObservable<string>;
    }

}
