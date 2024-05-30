// TODO: Upload Image to Buckets

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

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

    blob.close()

    console.log(await getDownloadURL(imageRef))
}