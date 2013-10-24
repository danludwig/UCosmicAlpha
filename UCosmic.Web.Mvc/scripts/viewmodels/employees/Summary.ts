/// <reference path="../../app/Spinner.ts" />
/// <reference path="../../typings/googlecharts/google.charts.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/linq/linq.d.ts" />
/// <reference path="../../google/GeoChart.ts" />
/// <reference path="Server.ts" />
/// <reference path="ApiModels.d.ts" />
/// <reference path="../../app/App.ts" />

module Employees.ViewModels {

    export interface SummarySettings {
        geoChartElementId: string;
        tenantDomain: string;
    }

    export class ImageSwapper {
        private _state: KnockoutObservable<string> = ko.observable('up');

        isUp = ko.computed((): boolean => {
            return this._state() == 'up';
        });

        isHover = ko.computed((): boolean => {
            return this._state() == 'hover';
        });

        mouseover(self: ImageSwapper, e: JQueryEventObject): void {
            this._state('hover');
        }

        mouseout(self: ImageSwapper, e: JQueryEventObject): void {
            this._state('up');
        }
    }

    export class DataCacher<T> {
        constructor(public loader: () => JQueryPromise<T>) { }

        private _response: T;
        private _promise: JQueryDeferred<T> = $.Deferred();
        ready(): JQueryPromise<T> {
            if (!this._response) {
                this.loader()
                    .done((data: T): void => {
                        this._response = data;
                        this._promise.resolve(this._response);
                    })
                    .fail((xhr: JQueryXHR): void => {
                        this._promise.reject();
                    });
            }
            return this._promise;
        }
    }

    export class Summary {
        //#region Static Google Visualization Library Loading

        private static _googleVisualizationLoadedPromise = $.Deferred();

        static loadGoogleVisualization(): JQueryPromise<void> {
            // this is necessary to load all of the google visualization API's used by this
            // viewmodel. additionally, https://www.google.com/jsapi script must be present
            google.load('visualization', '1', { 'packages': ['corechart', 'geochart'] });

            google.setOnLoadCallback((): void => {
                this._googleVisualizationLoadedPromise.resolve();
            });
            return this._googleVisualizationLoadedPromise;
        }

        //#endregion
        //#region Construction

        constructor(public settings: SummarySettings) {
            // CONSTRUCTOR
            this.geoChart = new App.Google.GeoChart(document.getElementById(this.settings.geoChartElementId));
            this._drawGeoChart();
        }

        //#endregion
        //#region Google GeoChart

        geoChart: App.Google.GeoChart;
        geoChartSpinner = new App.Spinner(new App.SpinnerOptions(400, true));
        isGeoChartReady: KnockoutObservable<boolean> = ko.observable(false);
        activityPlaceData: DataCacher<ApiModels.ActivityPlaceApiModel[]> = new DataCacher(
            (): JQueryPromise<ApiModels.ActivityPlaceApiModel[]> => {
                return this._loadActivityPlaceData();
            });

        private _loadActivityPlaceData(): JQueryPromise<ApiModels.ActivityPlaceApiModel[]> {
            var promise: JQueryDeferred<ApiModels.ActivityPlaceApiModel[]> = $.Deferred();
            var request: ApiModels.ActivityPlacesInputModel = {
                countries: true,
            };
            var settings: JQueryAjaxSettings = {
                data: request,
            };
            this.geoChartSpinner.start();
            Servers.ActivityPlaces(this.settings.tenantDomain, settings)
                .done((places: ApiModels.ActivityPlaceApiModel[]): void => {
                    promise.resolve(places);
                })
                .fail((xhr: JQueryXHR): void => {
                    App.Failures.message(xhr, 'while trying to load activity location summary data.', true);
                    promise.reject();
                })
                .always((): void => {
                    this.geoChartSpinner.stop();
                });
            return promise;
        }

        private _drawGeoChart(): void {

            // options passed when drawing geochart
            var options: google.visualization.GeoChartOptions = {
                displayMode: 'regions',
                region: 'world',
                keepAspectRatio: false,
                colorAxis: {
                    minValue: 1,
                    colors: ['#dceadc', '#006400', ],
                },
                backgroundColor: '#acccfd', // google maps water color is a5bfdd, Doug's bg color is acccfd
            };

            // create data table schema
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Place');
            dataTable.addColumn('number', 'Total Activities');

            // go ahead and draw the chart with empty data to make sure its ready
            this.geoChart.draw(dataTable, options).then((): void => {
                this.isGeoChartReady(true);

                // now hit the server up for data and redraw
                this.activityPlaceData.ready()
                    .done((places: ApiModels.ActivityPlaceApiModel[]): void => {
                        $.each(places, (i: number, dataPoint: ApiModels.ActivityPlaceApiModel): void=> {
                            dataTable.addRow([dataPoint.placeName, dataPoint.activityIds.length]);
                        });

                        this.geoChart.draw(dataTable, options);
                    });
            });
        }

        //#endregion
        //#region Extra Text Images

        pacificOceanSwapper: ImageSwapper = new ImageSwapper();
        gulfOfMexicoSwapper: ImageSwapper = new ImageSwapper();
        caribbeanSeaSwapper: ImageSwapper = new ImageSwapper();
        atlanticOceanSwapper: ImageSwapper = new ImageSwapper();
        southernOceanSwapper: ImageSwapper = new ImageSwapper();
        arcticOceanSwapper: ImageSwapper = new ImageSwapper();
        indianOceanSwapper: ImageSwapper = new ImageSwapper();
        antarcticaSwapper: ImageSwapper = new ImageSwapper();

        //#endregion
    }
}