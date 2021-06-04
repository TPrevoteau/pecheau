var AWS = require("aws-sdk");
  
let awsConfig = {
	"region": "eu-west-3",
	"endpoint": "http://dynamodb.eu-west-3.amazonaws.com",
	"accessKeyId": "AKIA3MBBK3DVQE66VJEU", "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let remove = function () {

	var params = {
		TableName: "Users",
		Key: {
			"email": "toto@gmail.com"
                }
        };
        docClient.delete(params, function (err, data) {

        	if (err) {
	        	console.log("users::delete::error - " + JSON.stringify(err, null, 2));
		} else {
		        console.log("users::delete::success");
						            }
	});
}

remove();
