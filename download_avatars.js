var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var params = process.argv.slice(2);

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
// var err = "not enough arguments"

// if (params.length < 2) {
//   console.log("Errors: ", err);
//   return;
// }

getRepoContributors(params[0], params[1], function(err, result) {
  var err = "not enough arguments"
  if (params.length < 2) {
    console.log("Errors: ", err);
    return;
  } else {
    result.forEach(function(id) {
      console.log(id.avatar_url);
      var path = "./avatars/" + id.login +".jpg"
      downloadImageByURL(id.avatar_url, path);
    })
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath))
}



