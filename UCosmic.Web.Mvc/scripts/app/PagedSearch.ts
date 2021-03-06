module App {
    export class PagedSearch {

        // paging observables
        pageSize = ko.observable<number>();
        pageNumber = ko.observable<number>();
        transitionedPageNumber = ko.observable<number>();
        itemTotal = ko.observable<number>();
        nextForceDisabled: KnockoutObservable<boolean> = ko.observable(false);
        prevForceDisabled: KnockoutObservable<boolean> = ko.observable(false);

        // paging computeds
        pageCount: KnockoutComputed<number>;
        pageIndex: KnockoutComputed<number>;
        firstIndex: KnockoutComputed<number>;
        firstNumber: KnockoutComputed<number>;
        lastNumber: KnockoutComputed<number>;
        lastIndex: KnockoutComputed<number>;
        nextEnabled: KnockoutComputed<boolean>;
        prevEnabled: KnockoutComputed<boolean>;

        // paging methods
        nextPage(): void {
            if (this.nextEnabled()) {
                var pageNumber = Number(this.pageNumber()) + 1;
                this.pageNumber(pageNumber);
            }
        }
        prevPage(): void {
            if (this.prevEnabled())
                history.back();
        }
        getPageHash(pageNumber: any): string {
            return '#/page/{0}/'.replace('{0}', pageNumber)
        }

        // results
        items: KnockoutObservableArray<any> = ko.observableArray();
        hasItems: KnockoutComputed<boolean>;
        hasNoItems: KnockoutComputed<boolean>;
        hasManyItems: KnockoutComputed<boolean>;
        hasManyPages: KnockoutComputed<boolean>;
        showStatus: KnockoutComputed<boolean>;

        // filtering
        orderBy = ko.observable<string>();
        keyword: KnockoutObservable<string> =
            ko.observable($('input[type=hidden][data-bind="value: keyword"]').val());
        throttledKeyword: KnockoutComputed<string>;

        // spinner component
        spinner: Spinner = new Spinner({ delay: 400, runImmediately: true, });

        constructor () {

            // paging computeds
            this.pageCount = ko.computed((): number => {
                return Math.ceil(this.itemTotal() / this.pageSize());
            });
            this.pageIndex = ko.computed((): number => {
                return Number(this.transitionedPageNumber()) - 1;
            });
            this.firstIndex = ko.computed((): number => {
                return this.pageIndex() * this.pageSize();
            });
            this.firstNumber = ko.computed((): number => {
                return this.firstIndex() + 1;
            });
            this.lastNumber = ko.computed((): number => {
                if (!this.items) return 0;
                return this.firstIndex() + this.items().length;
            });
            this.lastIndex = ko.computed((): number => {
                return this.lastNumber() - 1;
            });
            this.nextEnabled = ko.computed((): boolean => {
                return this.pageNumber() < this.pageCount() && !this.nextForceDisabled();
            });
            this.prevEnabled = ko.computed((): boolean => {
                return this.pageNumber() > 1 && !this.prevForceDisabled();
            });

            // paging subscriptions
            this.pageCount.subscribe((newValue: number) => {
                if (this.pageNumber() && this.pageNumber() > newValue)
                    this.pageNumber(1);
            });

            // result computeds
            this.hasItems = ko.computed((): boolean => {
                return this.items() && this.items().length > 0;
            });
            this.hasManyItems = ko.computed((): boolean => {
                return this.lastNumber() > this.firstNumber();
            });
            this.hasNoItems = ko.computed((): boolean => {
                return !this.spinner.isVisible() && !this.hasItems();
            });
            this.hasManyPages = ko.computed((): boolean => {
                return this.pageCount() > 1;
            });
            this.showStatus = ko.computed((): boolean => {
                return this.hasItems() && !this.spinner.isVisible();
            });

            // filtering computeds
            this.throttledKeyword = ko.computed<string>(this.keyword)
                .extend({ throttle: 400 });
        }

    }
}