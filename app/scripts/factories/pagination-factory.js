'use strict';

angular.module('globersMoodApp').factory('pagination',
    [
        function () {

    var pagination = {
        selectedPage : 0,
        page : {
            content: [],
            firstPage: true,
            lastPage: false,
            number: 0,
            numberOfElements: 0,
            size: 2,
            sort: null,
            totalElements: 0,
            totalPages: 1
        },
        init : function(options) {
            angular.extend(this.page, options);
            return this;
        },
        getTotalPages : function() {
            return (this.page.totalPages === 0) ? 1 : this.page.totalPages;
        },
        getPageNumber : function() {
            return this.page.number;
        },
        getTotalElements : function() {
            return this.page.totalElements;
        },
        setPage : function(page) {
            this.selectedPage = page
        },
        getPage : function(pageInformation) {
            var resolvePageNumber = function(page) {
                return (page == 0) ? 0 : (page - 1);
            }
            if (angular.isUndefined(pageInformation)) {
                return resolvePageNumber(this.page.number);
            }
            return resolvePageNumber(pageInformation);
        },
        getPageSize : function() {
            return this.page.size;
        },
        getContent : function() {
            return this.page.content;
        },
        update : function(page) {
            angular.extend(this.page, page);
            this.page.number++;

            return this.getContent();
        },
        getPageRequest : function(selectedPage, pageSize) {
            var currentPage = this.getPage(selectedPage);
            var currentSize = (angular.isUndefined(pageSize)) ? this.getPageSize() : pageSize;
            return {
                page: currentPage,
                size: currentSize
            };
        },
        getSelectedPage : function() {
            return this.selectedPage;
        }
    };
    return pagination;
}]);
