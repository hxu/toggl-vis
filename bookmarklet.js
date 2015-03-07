// Intended to be copy and pasted to a javascript bookmarklet in Chrome

(function() {
  var BASE_URL = "https://www.toggl.com/reports/api/v2/details?";
  // Change to your user agent
  var userAgent = "toggl-vis";
  // Change to your workspace
  var workspaceId = "687782";

  var getTotalPages = function(data) {
    var perPage = data.per_page;
    var totalCount = data.total_count;
    return Math.ceil(totalCount / perPage);
  };

  var fetchEntries = function(startDate, endDate) {
    var endpoint = BASE_URL + "user_agent=" + userAgent +
      "&workspace_id=" + workspaceId +
      "&since=" + startDate +
      "&until=" + endDate;

    return fetchEntryPage(endpoint, 1).then(function(data) {
      var totalPages = getTotalPages(data);
      console.log("Total of " + totalPages + " pages of data");

      if (totalPages == 1) {
        return data;
      }
    });
  };

  var fetchEntryPage = function(endpoint, page) {
    console.log("Fetching page " + page + " of " + endpoint);

    endpoint += "page=" + page;
    return $.ajax(endpoint);
  };

  var makeOverlay = function() {
  };

  fetchEntries("2015-03-01", "2015-03-06").then(function(data) { console.log(data); });

})();
