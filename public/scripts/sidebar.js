$(document).ready(function () {
  let stringBuilder = "";

  Promise.all([$.getJSON("/api/categories"), $.getJSON("/api/sidebar")])
    .then(data => {
      data[0].forEach(category => {
        stringBuilder += `
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#${category.name}" role="button" aria-expanded="false" aria-controls="collapseExample">${category.name}</a>
        <div class="collapse" id="${category.name}">
        <ul class="list-group bg-secondary">`;
        const currentCategoryCredentials = data[1][0].filter(credential => credential.category_id === category.id);
        currentCategoryCredentials.forEach(credential => {
          stringBuilder += `
          <li class="list-group-item bg-secondary">
          <a href="/passwords/${credential.id}">
          ${credential.app_list_name}</a></li>`;
        })
        stringBuilder += `</ul></div></li>`;
      });
      stringBuilder += `
      <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#shared" role="button" aria-expanded="false" aria-controls="collapseExample">shared</a>
      <div class="collapse" id="shared">
      <ul class="list-group bg-secondary">`;
      data[1][1].forEach(shared => {
        stringBuilder += `
          <li class="list-group-item bg-secondary">
          <a href="/passwords/${shared.shared_access_credential_id}/view">
          ${shared.user_name}: ${shared.app_list_name}</a></li>`;
      })
      stringBuilder += `</ul></div></li>`;
      $("#category-container").prepend(stringBuilder);
    }).catch(e => console.log("Error loading sidebar"));
});
