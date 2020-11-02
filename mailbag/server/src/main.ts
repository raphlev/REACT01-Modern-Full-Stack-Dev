// Node imports.
import path from "path";

// Library imports.
import express, { Express, NextFunction, Request, Response } from "express";

// App imports.
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";


// Our Express app.
const app: Express = express();

// Only parse query parameters into strings, not objects
//app.set('query parser', 'simple');

// Serve the client.
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

// Enable CORS so that we can call the API even from anywhere.
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  console.log("Express App - Request method value: ", inRequest.method);
  console.log("Express App - Request url value: ", inRequest.url);
  inNext();
});

// Handle JSON in request bodies.
app.use(express.json());

// ---------- RESTful endpoint operations begin. ----------

// Get list of mailboxes.
app.get("/mailboxes",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes (1)");
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
      console.log("GET /mailboxes (1): Ok", mailboxes);
      inResponse.json(mailboxes);
    } catch (inError) {
      console.log("GET /mailboxes (1): Error", inError);
      inResponse.send("error");
    }
  }
);


// Get list of messages in a mailbox (does NOT include bodies).
app.get("/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes/:mailbox (2)", inRequest.params.mailbox);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox : inRequest.params.mailbox
      });
      console.log("GET /mailboxes/:mailbox (2): Ok", messages);
      inResponse.json(messages);
    } catch (inError) {
      console.log("GET /mailboxes/:mailbox (2): Error", inError);
      inResponse.send("error");
    }
  }
);

// Get list of messages in a mailbox (does NOT include bodies).
app.get("/mailboxes/*",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes/* (3)", inRequest.params.mailbox);
    let mailbox:string = inRequest.url.replace("/mailboxes/","").replace("%20"," ");
    console.log("GET /mailboxes/* (3) - url mailbox name contains brackets or additional domains after /mailboxes/");
    console.log("GET /mailboxes/* (3) - GET /mailboxes/:mailbox entry cannot be used");
    console.log("GET /mailboxes/* (3) - resolved mailbox name from request url: " + mailbox);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox : mailbox
      });
      console.log("GET /mailboxes/[Gmail] (3): Ok", messages);
      inResponse.json(messages);
    } catch (inError) {
      console.log("GET /mailboxes/[Gmail]/ (3): Error", inError);
      inResponse.send("error");
    }
  }
);


// Get a message's plain text body.
app.get("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /messages/:mailbox/:id (4)", inRequest.params.mailbox, inRequest.params.id);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("GET /messages/:mailbox/:id (4): Ok", messageBody);
      inResponse.send(messageBody);
    } catch (inError) {
      console.log("GET /messages/:mailbox/:id (4): Error", inError);
      inResponse.send("error");
    }
  }
);

// Get a message's plain text body.
app.get("/messages/*",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /messages/* (5)", inRequest.params.mailbox, inRequest.params.id);
    // /messages/[Gmail]/Sent%20Mail/1
    let mailbox:string = inRequest.url.replace("/messages/","").replace("%20"," ");
    mailbox = mailbox.substring(0,mailbox.lastIndexOf("/"));
    let id:number = parseInt(inRequest.url.substring(inRequest.url.lastIndexOf("/") + 1),10);
    console.log("GET /messages/* (5) - url mailbox name contains brackets or additional domains after /messages/");
    console.log("GET /messages/* (5) - GET /messages/:mailbox/:id entry cannot be used");
    console.log("GET /messages/* (5) - resolved mailbox name from request url: " + mailbox);    
    console.log("GET /messages/* (5) - resolved id number from request url: " + id); 
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox : mailbox,
        id : id
      });
      console.log("GET /messages/* (5): Ok", messageBody);
      inResponse.send(messageBody);
    } catch (inError) {
      console.log("GET /messages/* (5): Error", inError);
      inResponse.send("error");
    }
  }
);

// Delete a message.
app.delete("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /messages (6)", inRequest.params.mailbox, inRequest.params.id);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("DELETE /messages (6): Ok");
      inResponse.send("ok");
    } catch (inError) {
      console.log("DELETE /messages (6): Error", inError);
      inResponse.send("error");
    }
  }
);

// Delete a message.
app.delete("/messages/*",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /messages/* (7)");
    console.log("DELETE /messages/* (7)", inRequest.params.mailbox, inRequest.params.id);
    // /messages/[Gmail]/Sent%20Mail/1
    let mailbox:string = inRequest.url.replace("/messages/","").replace("%20"," ");
    mailbox = mailbox.substring(0,mailbox.lastIndexOf("/"));
    let id:number = parseInt(inRequest.url.substring(inRequest.url.lastIndexOf("/") + 1),10);
    console.log("DELETE /messages/* (7) - url mailbox name contains brackets or additional domains after /messages/");
    console.log("DELETE /messages/* (7) - GET /messages/:mailbox/:id entry cannot be used");
    console.log("DELETE /messages/* (7) - resolved mailbox name from request url: " + mailbox);    
    console.log("DELETE /messages/* (7) - resolved id number from request url: " + id); 
  
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox : mailbox,
        id : id
      });
      console.log("DELETE /messages/[Gmail] (7): Ok");
      inResponse.send("ok");
    } catch (inError) {
      console.log("DELETE /messages/[Gmail] (7): Error", inError);
      inResponse.send("error");
    }
  }
);

// Send a message.
app.post("/messages",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /messages", inRequest.body);
    try {
      const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
      await smtpWorker.sendMessage(inRequest.body);
      console.log("POST /messages: Ok");
      inResponse.send("ok");
    } catch (inError) {
      console.log("POST /messages: Error", inError);
      inResponse.send("error");
    }
  }
);


// List contacts.
app.get("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /contacts");
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contacts: IContact[] = await contactsWorker.listContacts();
      console.log("GET /contacts: Ok", contacts);
      inResponse.json(contacts);
    } catch (inError) {
      console.log("GET /contacts: Error", inError);
      inResponse.send("error");
    }
  }
);


// Add a contact.
app.post("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: IContact = await contactsWorker.addContact(inRequest.body);
      console.log("POST /contacts: Ok", contact);
      inResponse.json(contact);
    } catch (inError) {
      console.log("POST /contacts: Error", inError);
      inResponse.send("error");
    }
  }
);


// Delete a contact.
app.delete("/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      console.log("Contact deleted");
      inResponse.send("ok");
    } catch (inError) {
      console.log(inError);
      inResponse.send("error");
    }
  }
);


// Start app listening.
app.listen(80, () => {
  console.log("MailBag server open for requests");
});
