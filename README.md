## Introduction

This package contains the logic to build a RESTful service using the [serverless](https://serverless.com/framework/docs/) framework and deploy to multiple destinations - [aws cloud](http://console.aws.amazon.com/), [azure cloud](https://portal.azure.com/) and a hosted server.

The service is implemented in TypeScript and built using NodeJS 12.

More details about the setup here - [Deploy single codebase to multiple Clouds](https://sarthakj178.com/deploy-single-codebase-to-multiple-clouds)

## Prerequisites

-   Install serverless cli
    `curl -o- -L https://slss.io/install | bash` (Mac and Linux)

-   Install [aws cli](https://aws.amazon.com/cli/) (If you are interested in deploying to aws cloud)
-   Install [azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) (If you are interested in deploying to azure cloud)
-   Add serverless plugin `serverless-azure-functions`
    `serverless plugin install --name serverless-azure-functions`

## Get the code

-   set a name for your service
    `export SERVERLESS_SERVICE_NAME='<SERVICE_NAME>'`
-   Clone the repository
    `git clone https://github.com/sarthakj178/ServerlessRestServiceTemplate.git` \$SERVERLESS_SERVICE_NAME
-   Replace all occurrences of `serverless-rest-service-template` with `$SERVERLESS_SERVICE_NAME`
-   Build
    ```
    cd SERVERLESS_SERVICE_NAME
    npm run build # This compiles the TypeScript code and generates the js code in dist/
    ```

## Test aws deployment locally

### /ping API

`serverless --config serverless-aws.yml invoke local --function ping`

```
{
    "statusCode": 200,
    "body": "Hello world"
}
```

### /ping-with-input API with valid input

`serverless --config serverless-aws.yml invoke local --function ping-with-input --data "{\"queryStringParameters\": {\"x\":10}}"`

```
request received { x: 10 }
Input received 10
{
    "statusCode": 200,
    "body": "{\"y\":20}"
}
```

### /ping-with-input API with invalid input

`serverless --config serverless-aws.yml invoke local --function ping-with-input --data "{\"queryStringParameters\": {}}"`

```
request received {}
{
    "statusCode": 400,
    "body": "Query string Parameter `x` is missing or empty"
}
```

## Test azure deployment locally

serverless cli doesn't support testing azure functions locally, will test after release

## Test express server locally

`node dist/index/express.js`

### /ping API

`curl -X GET "http://localhost:3000/ping"`

```
Hello world
```

### /ping-with-input API with valid input

`curl -X GET "http://localhost:3000/ping-with-input?x=10"`

```
{"y":20}
```

### /ping-with-input API with invalid input

`curl -X GET "http://localhost:3000/ping-with-input"`

```
{"y":null}
```

## Release to aws cloud

`serverless --config serverless-aws.yml deploy --stage Prod --region ap-south-1`

```
...
endpoints:
  GET - https://c8n0w2eje8.execute-api.ap-south-1.amazonaws.com/Prod/ping
  GET - https://c8n0w2eje8.execute-api.ap-south-1.amazonaws.com/Prod/ping-with-input
...
```

## Release to azure cloud

`serverless --config serverless-azure.yml deploy`

```
...
Serverless: Deployed serverless functions:
Serverless: -> ping-with-input: [GET] sls-wus2-dev-serverless-rest-service.azurewebsites.net/api/ping-with-input
Serverless: -> ping: [GET] sls-wus2-dev-serverless-rest-service.azurewebsites.net/api/ping
```

## Release to a hosted server

Outside the scope of this package. We don't need serverless for this release.

## Test in aws production

### /ping API

`curl -X GET "https://c8n0w2eje8.execute-api.ap-south-1.amazonaws.com/Prod/ping"`

```
Hello world
```

### /ping-with-input API with valid parameters

`curl -X GET "https://c8n0w2eje8.execute-api.ap-south-1.amazonaws.com/Prod/ping-with-input?x=10"`

```
{"y":20}
```

### /ping-with-input API with invalid parameters

`curl -X GET "https://c8n0w2eje8.execute-api.ap-south-1.amazonaws.com/Prod/ping-with-input?x1=10"`

```
Query string Parameter `x` is missing or empty
```

## Test in azure production

### /ping API

`curl -X GET "https://sls-wus2-dev-serverless-rest-service.azurewebsites.net/api/ping"`

```
Hello world
```

### /ping-with-input API with valid parameters

`curl -X GET "https://sls-wus2-dev-serverless-rest-service.azurewebsites.net/api/ping-with-input?x=100"`

```
{
  "y": 110
}
```

### /ping-with-input API with invalid parameters

`curl -X GET "https://sls-wus2-dev-serverless-rest-service.azurewebsites.net/api/ping-with-input"`

```
Query string Parameter `x` is missing or empty
```
