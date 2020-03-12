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
          <a href="/passwords/${shared.shared_access_credential_id} ">
          ${shared.user_name}: ${shared.app_list_name}</a></li>`;
      })
      stringBuilder += `</ul></div></li>`;
      $("#category-container").prepend(stringBuilder);
    }).catch(e => console.log("Error loading sidebar"));
});



/*
<ul id="category-container" class="navbar-nav mr-auto d-flex flex-column">
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#work" role="button" aria-expanded="false" aria-controls="collapseExample">
      Work
          </a>
    <div class="collapse" id="work">
      <ul class="list-group bg-secondary">
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
        <li class="list-group-item bg-secondary"><a href="#">Gmail</a></li>
      </ul>
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#entertainment" role="button" aria-expanded="false" aria-controls="collapseExample">
      Entertainment
          </a>
    <div class="collapse" id="entertainment">
      <ul class="list-group bg-secondary">
        <li class="list-group-item bg-secondary"><a href="#">Netflix</a></li>
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-youtube"></i> Youtube</a></li>
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-spotify"></i> Spotify</a></li>
      </ul>
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="collapse" href="#social" role="button" aria-expanded="false" aria-controls="collapseExample">
      Social
          </a>
    <div class="collapse" id="social">
      <ul class="list-group bg-secondary">
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
        <li class="list-group-item bg-secondary"><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
      </ul>
    </div>
  </li>
  <li>
    <button id="add-password" type="button" onclick="this.blur()" class="btn btn-outline-success btn-sm btn-block"><i class="fas fa-plus"></i> Add password</button>
  </li>
</ul>
 */
