const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs
      .readFile(contactsPath)
      .then(data => data.toString())
      .then(JSON.parse);

    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const sercheredContact = contacts.find(contact => contact.id === contactId);

    console.log(sercheredContact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId,
    );
    await fs.unlink(contactsPath);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

    console.log('Контакт успешно удален');
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    contacts.push({ name, email, phone });
    await fs.unlink(contactsPath);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    console.log('Контакт успешно добавлен');
  } catch (error) {
    console.log(error.message);
  }
}

// listContacts();
// getContactById(3);
// removeContact(10);
// addContact('qwerty', 'dgdfgdf@ppop.com', '(704) 398-7993');

module.exports = { listContacts, getContactById, removeContact, addContact };
