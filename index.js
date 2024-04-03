import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log("Contact by ID:", contactById);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log("Added contact:", addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log("Removed contact:", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
