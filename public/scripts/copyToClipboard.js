function copyToClipboard(target) {

  // get value of target
  var copyText = $(target).val()

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.value = copyText;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input)
}
