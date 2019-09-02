# formative-3.2

### Ensure that you have NPM and Node.js installed on your computer
To get set up, clone or download the repo, then make some edits to some config files.
First off, rename both `configExample.json` files to `config.json`.
One is located in the root folder, the other is located in the public folder.

For the root folder, you need to have an active cluster in MongoDB in order for this project to work. If you have not set up a cluster yet, you can set one up here [https://www.mongodb.com/](https://www.mongodb.com/).
You should put your MongoDB database access user and password in their respective fields.

The second thing you will need to set up is the config file in the public folder.
If you are going to be running this site on your own computer, your `config.json` file should look something like this:
```json
{
	"SERVER_URL": "http://localhost",
	"SERVER_PORT": "3000"
}
```
However, if you are running this project inside a virtual server, you will most likely need to change the `SERVER_URL` section to match whatever your virtual server is set to. The `SERVER_PORT` is set to `3000`. But if you already have something running on port `3000`, then you will need to change it before continuing.
Once all of that is done, open the root folder up in terminal and type:

```sh
npm install
node server
```

This should get you all set up for development.
