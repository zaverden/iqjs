module.exports = exports = {
  gen
};

function* gen(n) {
  let i = 0;
  while (i < n) {
    yield ++i;
  }
}

