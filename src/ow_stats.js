const usernames = require('../conf/usernames.js');
const owjs = require('overwatch-js');

get_human_readable_ranks = function() {
  return get_ranks().then(values => {
    var sorted = values.sort(sort_by_rank).reverse();
    var printable_lines = []
    sorted.forEach(value => {
      printable_lines.push(value.rank + ' -> ' + value.user);
    });
    return 'Ranks:\n' + printable_lines.join('\n');
  });
};

get_ranks = function() {
  return get_overall_stats().then(values => {
    var results = [];
    values.forEach(elem => {
      var user = elem['profile']['nick'];
      var rank = elem['profile']['rank'];
      results.push({
        'user': user,
        'rank': rank,
      });
    });
    return results;
  });
};

sort_by_rank = function(a, b) {
  return (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0);
};

sort_by_user = function(a, b) {
  var al = a.user.toLowerCase();
  var bl = b.user.toLowerCase();
  return (al > bl) ? 1 : ((bl > al) ? -1 : 0);
};

// Reqest the overall stats for everyone
get_overall_stats = function() {
  var promises = [];
  // Request everyone's data
  usernames.forEach(u => {
    promises.push(owjs.getOverall('pc','us',u))
  });
  // Synchronize all of the results and push them into a map and return the results in a promise
  return Promise.all(promises);
}

module.exports = {
  get_ranks: get_ranks,
  sort_by_user: sort_by_user,
  sort_by_rank: sort_by_rank,
  get_overall_stats: get_overall_stats,
  get_human_readable_ranks: get_human_readable_ranks,
};
