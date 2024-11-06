import { getFirestore, collection, query, orderBy, setDoc, doc } from 'firebase/firestore'
import { firebaseApp } from '../firebase'

const cltn = 'blogentries';

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const blogRef = query(collection(db, cltn), orderBy('created', 'desc'))

export async function createBlogEntry(id, newEntry) {
    await setDoc(doc(db, cltn, id.toString()), newEntry);
}