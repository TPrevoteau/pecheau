var AWS = require("aws-sdk");
  
let awsConfig = {
	"region": "eu-west-3",
	"endpoint": "http://dynamodb.eu-west-3.amazonaws.com",
	"accessKeyId": "AKIA3MBBK3DVQE66VJEU", "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

	var input = {
		"email": "toto@gmail.com", "name": "toto","phone": "+33-xxx",
		"updated_on": new Date().toString()
	};
	var params = {
	        TableName: "Users",
		Item:  input
	};
        docClient.put(params, function (err, data) {

        	if (err) {
  	      		console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
		} else {
	     		 console.log("users::save::success" );                      
		}
	});
}

save();
