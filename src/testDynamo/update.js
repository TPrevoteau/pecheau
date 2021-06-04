var AWS = require("aws-sdk");
  
let awsConfig = {
	"region": "eu-west-3",
	"endpoint": "http://dynamodb.eu-west-3.amazonaws.com",
	"accessKeyId": "AKIA3MBBK3DVQE66VJEU", "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let modify = function () {
	    
	var params = {
		TableName: "Users",
		Key: { "email": "toto@gmail.com" },
		UpdateExpression: "set #n = :newName",
		ExpressionAttributeValues: {
			":newName": "newToto"
		},
//Cela permet de contourner le problème de mot reservé par dynamo :
		ExpressionAttributeNames: {
			"#n": "name"
		},
		ReturnValues: "UPDATED_NEW"

	};
	docClient.update(params, function (err, data) {

		if (err) {
			console.log("users::update::error - " + JSON.stringify(err, null, 2));
	        } else {
		        console.log("users::update::success "+JSON.stringify(data) );
		}
	});
}

modify();
