let lastSelectedTab;


$("#sidebar button").on("click", function() {
  // turn the last "active" tab back to default
  $(lastSelectedTab).removeClass("btn-primary");
  $(lastSelectedTab).addClass("btn-outline-secondary");

  // make the tab that was clicked become new "active"
  lastSelectedTab = $(this);
  $(this).removeClass("btn-outline-secondary");
  $(this).addClass("btn-primary");
})
