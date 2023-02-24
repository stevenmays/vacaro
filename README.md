# vacaro

reference implementation using koa, typescript. exposes an endpoint, which retrieves open PRs from github, and gets the number of commits per pull request.

## Development

1. run `npm i`
1. set env variables, copy .env.example to .env and fill out your values.
1. run `npm start:dev`
1. alternatively, you can build the project using `npm build`, then run `npm start`

### Code Format + Linting

We are using prettier + eslint. To get maximum productivity use vscode, and install the [Prettier Plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

If you're not using vscode, you can just run `npm run lint` and `npm run lint:fix`

### Debugging

1. In your terminal, source your .env file, either manually or by using a plugin
1. `npm run start:dev`
1. In VSCode, click the Debug icon, and Run `Debug index.ts`

### Helpers

Converted the types using this: https://transform.tools/json-to-typescript

## Usage

There is simplistic body validation enabled. If you do not send the owner and repo as a body param the request will fail.

```
curl --request GET \
  --url http://localhost:3000/github \
  --header 'Content-Type: application/json' \
  --data '{
	"owner": "stevenmays",
	"repo": "vacaro"
}'
```

# todos

1. handle rate limiting. read the headers: https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limit-headers
