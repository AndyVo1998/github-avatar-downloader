var request = require('request');
var token = require('./secrets')

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    },
    json: true
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });


}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  result.forEach(function(id) {
    console.log(id.avatar_url);
  })
});


