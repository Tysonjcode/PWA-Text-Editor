import { openDB } from 'idb';

// Initialize the 'jate' database
async function initializeDatabase() {
  const db = await openDB('jate', 1, {
    upgrade(database) {
      if (database.objectStoreNames.contains('jate')) {
        console.log("The 'jate' database already exists.");
        return;
      }
      database.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log("The 'jate' database has been created.");
    },
  });
  return db;
}

// Add a new entry to the 'jate' database
export async function putEntry(id, value) {
  console.log(`PUT request to update the 'jate' database.`);
  const database = await openDB('jate', 1);
  const transaction = database.transaction('jate', 'readwrite');
  const objectStore = transaction.objectStore('jate');
  const request = objectStore.put({ id, value });
  const response = await request;
  console.log(`Data saved to the 'jate' database.`, response);
}

// Get all the entries from the 'jate' database
export async function getAllEntries() {
  console.log(`Getting data from the 'jate' database.`);
  const database = await openDB('jate', 1);
  const transaction = database.transaction('jate', 'readonly');
  const objectStore = transaction.objectStore('jate');
  const request = objectStore.getAll();
  const response = await request;
  console.log(`Data retrieved from the 'jate' database.`, response);
}

// Initialize the 'jate' database and log any errors that occur
initializeDatabase().catch((error) => {
  console.error(`Error initializing the 'jate' database.`, error);
});
