$(document).ready(function () {
  $.getJSON("/api/header")
    .then(user => {
      $("#navbar").append(`
        <div>
          <span>Connected as:${user[0].name}</span>
          <a href="/users/logout"><button class="mt-0 mb-0 btn btn-outline-success" type="submit">Logout</button></a>
        </div>
        `);
    }).catch(e => {
      $("#navbar").append(`
        <div>
          <a href="/users/login"><button class="mt-0 mb-0 btn btn-outline-success" type="submit">Login</button></a>
          <a href="/users/register"><button class="mt-0 mb-0 btn btn-outline-success" type="submit">Register</button></a>
        </div>
        `);
    })
});
