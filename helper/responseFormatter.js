'use strict';

module.exports = {
     success: (result) => {
         return {
              isBase64Encoded: false,
              statusCode: 200,
              headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
               },
              body: JSON.stringify(result),
         }
     },
     internalServerError: (msg, errorCode) => {
         return {
             isBase64Encoded: false,
             statusCode: 500,
             headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
             },
             body: JSON.stringify({
                 statusCode: errorCode,
                 error: 'Internal Server Error',
                 internalError: JSON.stringify(msg),
             }),
         }
     },
     //400 Bad Request
     badRequestApplicationError: (msg) => {
         return {
             isBase64Encoded: false,
             statusCode: 400,
             headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
             },
             body: JSON.stringify({
                 statusCode: 400,
                 error: 'Internal Server Error',
                 internalError: JSON.stringify(msg),
             }),
         }
     },
     //404 Not found
     recordNotFoundApplicationError: (msg) => {
         return {
             isBase64Encoded: false,
             statusCode: 404,
             headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
             },
             body: JSON.stringify({
                 statusCode: 404,
                 error: 'Internal Server Error',
                 internalError: JSON.stringify(msg),
             }),
         }
     },
     //406 Not Acceptable
     notAcceptableRequestApplicationError: (msg) => {
         return {
             isBase64Encoded: false,
             statusCode: 406,
             headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
             },
             body: JSON.stringify({
                 statusCode: 406,
                 error: 'Internal Server Error',
                 internalError: JSON.stringify(msg),
             }),
         }
     },
     //416 Requested Range Not Satisfiable
     reqRangeNotSatisfiableApplicationError: (msg) => {
         return {
             isBase64Encoded: false,
             statusCode: 416,
             headers: {
                 'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                 "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
             },
             body: JSON.stringify({
                 statusCode: 416,
                 error: 'Internal Server Error',
                 internalError: JSON.stringify(msg),
             }),
         }
     }
}; // add more responses here.


/*

4xx Client Error
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Request Entity Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot (RFC 2324)
420 Enhance Your Calm (Twitter)
422 Unprocessable Entity (WebDAV)
423 Locked (WebDAV)
424 Failed Dependency (WebDAV)
425 Reserved for WebDAV
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 No Response (Nginx)
449 Retry With (Microsoft)
450 Blocked by Windows Parental Controls (Microsoft)
451 Unavailable For Legal Reasons
499 Client Closed Request (Nginx)


5xx Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates (Experimental)
507 Insufficient Storage (WebDAV)
508 Loop Detected (WebDAV)
509 Bandwidth Limit Exceeded (Apache)
510 Not Extended
511 Network Authentication Required
598 Network read timeout error
599 Network connect timeout error
*/
