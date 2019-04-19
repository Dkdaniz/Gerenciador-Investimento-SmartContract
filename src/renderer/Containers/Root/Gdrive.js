const fs = require('fs');
const { google } = require('googleapis');
const credentials = require('../.././Files/GoogleCredentials/credentials.json')
const token = require('../.././Files/GoogleCredentials/token.json')

function upload(path){
    authorize(credentials, path, uploadDatabse);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, path, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);
    callback(oAuth2Client, path);
}

/**
 * Upload exemplecoin database.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} path.
 */

function uploadDatabse(auth, path) {
    const drive = google.drive({ version: 'v3', auth });

    var fileMetadata = {
        'name': 'exemplecoin.sqlite'
    };
    var media = {
        mimeType: 'application/sql',
        body: fs.createReadStream(path)
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('success');
        }
    });
}

module.exports = upload;