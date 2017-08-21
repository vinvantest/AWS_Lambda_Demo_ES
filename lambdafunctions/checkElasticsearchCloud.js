'use strict';

const responder = require('../helper/responseFormatter.js');
var elasticsearch = require('elasticsearch');

module.exports.checkES = (event, context, callback) => {
	console.log('Body:', event.body);
	console.log('Headers:', event.headers);
	console.log('Method:', event.method);
	console.log('Params:', event.params);
	console.log('Query:', event.query);
	console.log('PASSWORD_ITERATIONS: ', process.env.PASSWORD_ITERATIONS);// logs `4096`
	console.log('PASSWORD_DERIVED_KEY_LENGTH: ', process.env.PASSWORD_DERIVED_KEY_LENGTH);// logs `256`
	console.log('EMAIL_SERVICE_API_KEY: ', process.env.EMAIL_SERVICE_API_KEY);// logs `KEYEXAMPLE1234`
	console.log('Calling checkEalsticsearchCloud AWS Lambda with event: ' + JSON.stringify(event));
	var auth = 'vintest:test1234';
	var port = 20914;
	var protocol = 'https';
	var log = 'trace';
	var hostUrls = [
				'iad1-10914-0.es.objectrocket.com', 
				'iad1-10914-1.es.objectrocket.com', 
				'iad1-10914-2.es.objectrocket.com', 
				'iad1-10914-3.es.objectrocket.com'
		  ]; //iad1-10914-0.es.objectrocket.com:40914,iad1-10914-1.es.objectrocket.com:40914,iad1-10914-2.es.objectrocket.com:40914,iad1-10914-3.es.objectrocket.com:40914
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
	esClient.ping({ requestTimeout: 30000 }, function(error) 
		{
			if (error) {
				console.trace('Error: elasticsearch cluster is down!', error);
				context.fail(responder.internalServerError('Error: elasticsearch cluster is down! -> '+error));
			} else {
				console.log('Elasticsearch Instance on ObjectRocket Connected!');
			}
			// on finish
			//esClient.close();
	});
	//check elasticsearch health
	esClient.cluster.health({},function(err,resp,status) {  
		  console.log("-- esClient Health --",resp);
		  context.succeed(responder.success(JSON.stringify(resp)));
	});
};