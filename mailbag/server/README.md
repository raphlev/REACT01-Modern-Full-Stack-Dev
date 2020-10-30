# setting up project

```
npm init
npm install –save-dev typescript
npx tsc -init
```

Update tsconfig.json file, specifically the following:
• Uncomment the "outDir" element and set its value to "./dist". We want all our compiled files to go into a dist subdirectory.
• After the "compilerOptions" element, add "include": [ "src/**/*" ]. So, the file should have this form when you’re done:
```
{
"compilerOptions": {
...lots of compiler options...
},
"include": [ "src/**/*" ]
}
```
This will ensure that tsc only tries to compile files in the src directory.
• Although not necessary, also uncomment the "sourceMap" option and ensure it’s set to true, to make debugging easier.

# Adding modules

```
npm install --save emailjs-imap-client
npm install --save express
npm install --save mailparser
npm install --save nedb
npm install --save nodemailer
```

# Adding types

```
npm install --save-dev @types/express
npm install --save-dev @types/mailparser
npm install --save-dev @types/nedb
npm install --save-dev @types/node
npm install --save-dev @types/nodemailer
```

# Adding dev monitoring

```
npm install --save-dev nodemon
```

Update package.json :
```
"scripts": {
"compile": "npx tsc && node ./dist/main.js",
"dev": "node ./node_modules/nodemon/bin/nodemon.js -e ts --exec \"npm run compile\""
}
```
the -e option. By default, nodemon watched for changes in .js, .mjs, .coffee, .litcoffee, and .json files. With -e though, we can tell it to watch other types of tiles, .ts files in this case. The --exec option is used to tell nodemon what to do when those files change, so now any time nodemon sees changes to our TypeScript source files, it will execute the compile command.

# start dev 

```
npm run dev
```

nodemon will begin monitoring our source TypeScript files. When any change, it will compile them and then start up the resultant main.js file. Now, we’ve got ourselves a nice little workflow: we can happily peck away at our source files, and then compile and restart will be automatic, making our work quicker and our life easier!
Note
If compiler errors occur, nodemon will still try to start up the app because it doesn’t know not to. That obviously isn’t going to go well, so you need to keep an eye on your console when you make changes to ensure they’re valid and running when you expect them to be.


# Enable gmail IMAP SMTP

gmail > settings > Forwarding and POP/IMAP > IMAP Access

https://mail.google.com/mail/u/0/#settings/fwdandpop

Click Enable IMAP


# Enable gmail account "Allow less secure applications" setting

-- ISSUE GMAIL

IMAP.Worker.listMailboxes()
(node:19484) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
GET /mailboxes (1): Error Error: Invalid credentials (Failure)


Email sent by gmail:

Connection attempt blocked : Someone just used your password to try to sign in to your account from a non-Google app. We blocked this person, but we advise you to check what happened. Review your account activity to make sure no one else has access to it.

-- HOW TO SOLVE

Click "Enable" in https://myaccount.google.com/lesssecureapps
See https://support.google.com/accounts/answer/6010255

# Test Server

List mailboxes:

```
curl localhost/mailboxes
```

List content of INBOX mailbox:

```
curl localhost/mailboxes/INBOX
```

Get message body:

```
curl localhost/messages/INBOX/347
```

Delete message:

``` Powershell
Invoke-WebRequest -Uri http://localhost/messages/INBOX/347 -Method Delete
``` 

``` Linux
curl --location --request DELETE 'localhost/messages/INBOX/347'
``` 


Post email: check using postman

``` Powershell
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$body = "{
`n    `"to`": `"raphaellevequeptc@gmail.com`",
`n    `"from`": `"raphaellevequeptc@gmail.com`",
`n    `"subject`": `"This is a test`",
`n    `"message`": `"If you see this then it worked!`"
`n}"

$response = Invoke-RestMethod 'localhost/messages' -Method 'POST' -Headers $headers -Body $body
$response | ConvertTo-Json
```

``` Linux
curl -d '{ "to" : "raphaellevequeptc@gmail.com", "from" : "raphaellevequeptc@gmail.com", "subject" : "This is a test", "message" : "If you see this then it worked!" }' -H "Content-Type:application/json" -X POST localhost/messages

curl --location --request POST 'localhost/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to": "raphaellevequeptc@gmail.com",
    "from": "raphaellevequeptc@gmail.com",
    "subject": "This is a test",
    "message": "If you see this then it worked!"
}'
``` 
