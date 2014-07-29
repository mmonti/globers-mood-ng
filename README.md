This file was created by JetBrains WebStorm 6.0.2 for binding GitHub repository

Handle Pagination.

-Inject pagination object through pagination-factory.js
-Define and initialize the pagination object.

$scope.pagination = pagination.init({ size : 3 });

-Watch for page changes:
$scope.$watch("pagination.selectedPage", function(selectedPage, oldPage) {
    var pageRequest = $scope.pagination.getPageRequest(selectedPage);
    campaignService.campaigns(pageRequest, campaignSuccessCallback, errorCallback);
});

-Fetch data set.
var fetchCampaigns = function() {
    var pageRequest = $scope.pagination.getPageRequest();
    campaignService.campaigns(pageRequest, campaignSuccessCallback, errorCallback);
}

-Update the data with the response.
var campaignSuccessCallback = function(data, status, headers, config) {
    console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
    $scope.campaigns = $scope.pagination.update(data);
};

-Markup
<pagination class="pagination-small" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" boundary-links="true"
    total-items="pagination.page.totalElements"
    page="pagination.page.number"
    items-per-page="pagination.page.size"
    num-pages="pagination.page.totalPages"
    on-select-page="pagination.setPage(page)">
</pagination>
