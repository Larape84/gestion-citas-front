import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData , getDoc, getDocs, setDoc, updateDoc  } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',

})
export class FirebaseService {

    encryptedText: string = '';
    decryptedText: string = '';


  constructor(
    private firestore: Firestore,


) {}

  getCollection<T>(collectionName: string): Observable<T[]> {
    const ref = collection(this.firestore, collectionName);

     return from(getDocs(ref).then(snapshot =>
    snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
  ));
  }


  getDocumentId(collectionName: string, userId: string): Observable<any> {
    const userRef = doc(this.firestore, `${collectionName}/${userId}`);
    return from(getDoc(userRef).then(docSnap => {
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      }))
  }

  createDocumentWithId<T>(collectionName: string, docId: string, data: T): Observable<void> {
    const collectionRef = collection(this.firestore, collectionName); // Referencia a la colección
    const docRef = doc(collectionRef, docId); // Documento dentro de la colección
    const dataWithId = { ...data, id: docId }; // Agregar el ID dentro del documento

    return from(setDoc(docRef, dataWithId)); // setDoc reemplaza addDoc
  }

  updateDocument(collectionName: string, docId: string, data: any): Observable<void> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return from(updateDoc(docRef, data));
  }


  updateDocumentComplet<T>(collectionName: string, docId: string, data: any): Observable<T> {
    const docRef : DocumentReference<DocumentData, DocumentData> = doc(this.firestore, `${collectionName}/${docId}`);

    return from(updateDoc(docRef, data)).pipe(
      switchMap(() => from(getDoc(docRef))), // Obtener el documento después de actualizarlo
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() } as T; // Devolver el documento actualizado
        } else {
          throw new Error("El documento no existe");
        }
      })
    );
  }





}
