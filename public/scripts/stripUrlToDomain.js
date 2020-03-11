function stripUrlToDomain(urlString) {
  let outputDomain;
  let urlArr = urlString.split("")
  let firstDotIndex;
  let secondDotIndex;
  for (let i = 0; i < urlArr.length; i++) {
    if (urlString[i] === "." && !firstDotIndex) {
      firstDotIndex = i;
    } else if (urlString[i] === "." && firstDotIndex) {
      secondDotIndex = i;
    }
  }
  outputDomain = urlString.substring(firstDotIndex + 1, secondDotIndex);
  return outputDomain;
}

module.exports = { stripUrlToDomain }
