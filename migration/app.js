//sourceURL, targetUrlInAEm and authCreds to be configured for each environment
//const sourceURL = 'C:/Users/Administrator/Desktop/nl/Branding';
//URL to the folder in AEM where assets will be uploaded. targetUrlInAEm Folder must already exist or no processing will happen.
// but the code will create subfolders, just the root folder as specified in the target url must exist.


//uncomment the three variable and set correct values before triggering this script.
//const authCreds = 'vishalsah:VISHALsah12@';
//const targetUrlInAEm = 'https://author-p33717-e120130.adobeaemcloud.com/content/dam/lebara/markets/nl';
//const sourceURL = 'C:/Users/Administrator/Desktop/nl/Branding/2. Standard POS/Campaign 2020_WD';


//note: if targetUrlInAEm = ......../a/b/c and sourceURL = ......../x/y/z, the generated folder structure in aem would be ......../a/b/c/z/subfolders.
// in current configuration multiple uploads parallely. This property is configurable.
// add logic to print the size of asset as well.


//error types observed
//all error codes listed here https://github.com/adobe/aem-upload/blob/master/src/error-codes.js
//if authentication is incorrect: (node:7740) UnhandledPromiseRejectionWarning: Error: Request failed with status code 401
//no internet connection (node:19472) UnhandledPromiseRejectionWarning: Error: getaddrinfo ENOTFOUND author-p33717-e120130.adobeaemcloud.com

var dateTime = require('node-datetime');


//overload the default console.log function to log output on both console and file named migration.log.
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/migration.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const {
    FileSystemUploadOptions,
    FileSystemUpload
	} = require('@adobe/aem-upload');

var filesInitiatedCount = 0;
var filesProcessedCount = 0;


async function migrateImage(){    
	console.log("server triggered to invoke migration of assets");
	// to add logic to print file names/paths of assets which are processed in a text file.
	// also save logs on aem to find any bugs
	// add logic to log any filename changes
	// add proper loggers and error handlers
	//add logic to increase timeout from 60000ms i.e 1 min to 90 seconds
	//see all error codes.
	//add file count and time counter.
	// this code replaces the files with same names with new files, instead of versioning.
	
	//setting all upload related configurable options parameter.
	const options = new FileSystemUploadOptions()
    .withUrl(targetUrlInAEm)
    .withBasicAuth(authCreds)
	.withDeepUpload(true)
	.withInvalidCharacterReplaceValue('-')
	.withMaxUploadFiles(10000)
	.withConcurrent(true)
	.withMaxConcurrent(2)
	.withHttpRequestTimeout(90000); //timeout happens after 90 seconds
	
	
    // upload a single asset and/or all assets in a given directory
    const fileUpload = new FileSystemUpload();
	
	
	
	//file name, path and processing error tracking logic.
	// specific handling that should occur when a file begins uploading
	fileUpload.on('filestart', data => {
    const { fileName, targetFile, fileSize } = data;
    console.log("started uploading file : "+ fileName + " of size " + fileSize + " bytes at targetFile path "+ targetFile);
	filesInitiatedCount++;
	});	
	
	// specific handling that should occur when a file processing ends.
	fileUpload.on('fileend', data => {
    const { fileName, targetFile } = data;    
	console.log("finished uploading file : "+ fileName + " at targetFile path "+ targetFile);
	filesProcessedCount++;
	});
	
	// specific handling that should occur when file processing runs into any issue.
	fileUpload.on('fileerror', data => {
    const { targetFile, errors } = data;    
	console.log("error while uploading targetFile : "+ targetFile);
	
	errors.forEach(fileErr => {
			console.log("error occured while processing file at " + targetFile + " error code : "+ fileErr.getCode() +" : "+ fileErr.getMessage());                
            });	
	});
		
	
	//trigger upload
    await fileUpload.upload(options, [sourceURL]);
	
	console.log("total number of files initiated for processing is : " +filesInitiatedCount + " and total files processed is "+ filesProcessedCount);
	
	var endTime = dateTime.create();
	endTime.format('m/d/Y H:M:S');
	console.log("processing finished at : " + new Date(endTime.now()));
}

var startTime = dateTime.create();
startTime.format('m/d/Y H:M:S');
console.log("processing started at : " + new Date(startTime.now()));
migrateImage();
