'use strict';

const responder = require('../helper/responseFormatter.js');
const elasticsearch = require('elasticsearch');

module.exports.createIndexES = (event, context, callback) => {
	//get lambda api event body template params
	console.log('Body:', event.body);
	console.log('Headers:', event.headers);
	console.log('Method:', event.method);
	console.log('Params:', event.params);
	console.log('Path Prams:', event.path);
	console.log('Query:', event.query);
	console.log('PASSWORD_ITERATIONS: ', process.env.PASSWORD_ITERATIONS);// logs `4096`
	console.log('PASSWORD_DERIVED_KEY_LENGTH: ', process.env.PASSWORD_DERIVED_KEY_LENGTH);// logs `256`
	console.log('EMAIL_SERVICE_API_KEY: ', process.env.EMAIL_SERVICE_API_KEY);// logs `KEYEXAMPLE1234`
	console.log('Calling createIndexEalsticsearchCloud AWS Lambda with event: ' + JSON.stringify(event));

	console.log('Inside createIndex() Lambda Function and Paramter passed -' + event.path.indexName);
	 var indexName = event.path.indexName;
	 if(indexName === null || indexName === undefined)
		 context.fail(responder.internalServerError('Error: event.path.indexName required to create Index in ES -> '+indexName));
	 //var payload = event.body.payload;
	 //if(payload  === null || payload === undefined)
	 //	 context.fail(responder.internalServerError('Error: event.body.payload required to create Index mappings in ES -> '+payload));
	 var docType = event.body.docType;
	 if(docType  === null || docType === undefined)
	 	 context.fail(responder.internalServerError('Error: event.body.docType required to create Index mappings in ES -> '+docType));

	var auth = 'vintest:test1234';
	var port = 20914;
	var protocol = 'https';
	var log = 'trace';
	var hostUrls = [
				'iad1-10914-0.es.objectrocket.com',
				'iad1-10914-1.es.objectrocket.com',
				'iad1-10914-2.es.objectrocket.com',
				'iad1-10914-3.es.objectrocket.com'
		  ];
	var hosts = hostUrls.map(function(host) {
		return {
			protocol: protocol,
			host: host,
			port: port,
			auth: auth,
			log: log
		};
	});
	var esClient = new elasticsearch.Client({
		hosts: hosts
	});

	 			/* just trying if index cretion works
			  esClient.index({
			  index: indexName,
			  type: 'posts',
			  id: '1',
			  body: {
				user: 'me',
				post_date: new Date(),
				message: 'Hello World!'
			  },
			  refresh: true
			})*/

	 var res_msg = 'Index not created';

	 console.log('Checking if index Exists('+indexName+')');
	 esClient.indices.exists(indexName)
		 .then(function (response) {//index exists
				console.log('Index ['+indexName+'] already exists in ElasticSearch');
				res_msg = 'Index ['+indexName+'] already exists in ElasticSearch';
				//check if mapping exists
				esClient.indices.getMapping({index: indexName})
					.then(function (response){
						res_msg = 'Mapping ['+indexName+'] already exists. Start calling Index.save()';
						context.succeed(responder.success(JSON.stringify(res_msg)));
					},
					function (error) {
						//mapping doesn't exists
						console.log('Mapping ['+indexName+'] Not created. Creating Now! -> ' + JSON.stringify(error));
						res_msg = 'Mapping ['+indexName+'] Not created. Creating Now!';// + JSON.stringify(error);
						esClient.indices.putMapping({
									index: indexName,
									type: docType, //"test_type_table1"
									body: //payload //below not required if JSON object passed to create mapping
										{
										properties: {
											title: { type: "string" },
											content: { type: "string" }
											}
										}
									});
						res_msg = 'Index ['+indexName+'] existed but mapping now inserted';
						context.succeed(responder.success(JSON.stringify(res_msg)));
					});//end indices.getMapping()
	     }, function (err){ //index dosen't exist. Create one.
			 console.log('Index ['+indexName+'] does not exists!');
			console.log('Creating ['+indexName+'] now! Error value is ->'+JSON.stringify(err));
			res_msg = 'Creating ['+indexName+'] now!'; //+JSON.stringify(err);
			esClient.indices.create({index: indexName})
				.then(function (response) {
					console.log('Index ['+indexName+'] Created! Now putting mapping -> '+ JSON.stringify(response));
						res_msg = 'Index ['+indexName+'] Created! Now putting mapping'; //+JSON.stringify(response);
						//now create mapping
						esClient.indices.putMapping({
									index: indexName,
									type: docType, //"test_type_table1"
									body: //paylod //below not required if JSON object passed to create mapping
										{
										properties: {
											title: { type: "string" },
											content: { type: "string" }
											}
										}
								});
						console.log('Index ['+indexName+'] Created with mapping for Type ['+docType+']');
						res_msg = 'Index ['+indexName+'] Created with mapping';
						context.succeed(responder.success(JSON.stringify(res_msg)));
					}, function (error) {
						console.log('Error: creating index ['+indexName+'] -> ' +JSON.stringify(error));
						res_msg = 'Error: creating index ['+indexName+']'; // + JSON.stringify(error);
						context.fail(responder.internalServerError('Error: elasticsearch cannot create index and put mapping!'));
					});
	    });//end then - indices.exists()
}; //end module.exports
