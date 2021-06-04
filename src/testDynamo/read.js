var AWS = require("aws-sdk");

let awsConfig = {
	"region": "eu-west-3",
	"endpoint": "http://dynamodb.eu-west-3.amazonaws.com",
	"accessKeyId": "AKIA3MBBK3DVQE66VJEU", "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
	var params = {
  	      TableName: "Users",
	      Key: {
		      "email": "toto2@gmail.com"
	      }
	};
	docClient.get(params, function (err, data) {
		if (err) {
			console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
		}
		else {
			console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
	        }
	})
}

fetchOneByKey();
