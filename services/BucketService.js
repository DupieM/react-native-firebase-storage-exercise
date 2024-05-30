// TODO: Upload Image to Buckets

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const handleUploadOfImage = async (uri, fileName) => {

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        }
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        }
        xhr.responseType = "blob";
        xhr.open("GET", uri, true)
        xhr.send(null);
    })

    const imageRef = ref(storage, fileName)

    const uploadResult = await uploadBytes(imageRef, blob);

    console.log(await getDownloadURL(imageRef));

    var memory = {
        ImageURL: await getDownloadURL(imageRef),
        title: fileName
    }

    try {
        //docRef - our reference to our newly created document (brand new with a self-generated ID)
        const docRef = await addDoc(collection(db, "memories"), memory);
        console.log("Document written with ID: ", docRef.id);
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }
    
    blob.close();

}

export const getMemoryList = async () => {

    var allMemories = [];

    // Getting the data from Firestore
    const querySnapshot = await getDocs(collection(db, "memories"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data())
        allMemories.push(doc.data()); //push each docs' data to the array I wnat to return
        
    });
    console.log(allMemories)

    // console.log(allCourses)

    return allMemories
    
}

// console.log(allMemories)
