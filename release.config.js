module.exports = {
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md"]
    }],
		["@semantic-release/npm", {
      "npmPublish": true,
			"tarballDir": "dist"
		}],
    ["@semantic-release/github", {
      "assets": ["dist/**"]
    }],
  ]
}