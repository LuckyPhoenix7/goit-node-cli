import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const contactsPath = path.join(__dirname, "db", "contacts.json");

export function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((readContacts) => JSON.parse(readContacts))
    .catch((error) => console.error(error.message));
}

export function getContactById(contactId) {
  return listContacts()
    .then((contactObject) => contactObject.find(({ id }) => id === contactId) || null)
    .catch((error) => console.error(error.message));
}

export function removeContact(contactId) {
  return listContacts()
    .then((contactObject) => {
      const index = contactObject.findIndex(({ id }) => id === contactId);
      if (index === -1) {
        return null;
      }
      const [removedContact] = contactObject.splice(index, 1);
      return fs.writeFile(contactsPath, JSON.stringify(contactObject, null, 2)).then(() => removedContact);
    })
    .catch((error) => console.error(error.message));
}

export function addContact(name, email, phone) {
  return listContacts()
    .then((contactObject) => {
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      contactObject.push(newContact);
      return fs.writeFile(contactsPath, JSON.stringify(contactObject, null, 2), "utf8").then(() => newContact);
    })
    .catch((error) => console.error(error.message));
}
