import Cropper from "cropperjs";
import firebase from './firebase-app';

document.querySelectorAll("#change-photo").forEach(page => {

    let cropper = null;
    const imageElement = page.querySelector("#photo-preview");
    const buttonElement = page.querySelector(".choose-photo");
    const inputFileElement = page.querySelector("#file");
    const form = imageElement.closest("form");
    const btnSubmit = form.querySelector("[type=submit]");

    form.addEventListener("submit", e => {

        e.preventDefault();

        form.classList.remove("cropping");

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "Salvando...";

        imageElement.src = cropper.getCroppedCanvas().toDataURL("image/png");

        cropper.getCroppedCanvas().toBlob(blob => {

            const storage = firebase.storage();
    
            const fileRef = storage.ref().child();
    
            fileRef
                .put(blob)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => console.log(url));

            });
    
            cropper.destroy();

        });

    })

    imageElement.addEventListener("click", e => {

        inputFileElement.click();

    });

    buttonElement.addEventListener("click", e => {

        inputFileElement.click();

    });

    inputFileElement.addEventListener("click", e => {

        if (e.target.files.length) {

            const file = e.target.files[0];

            const reader = new FileReader();

            reader.onload = () => {

                imageElement.src = reader.result;

                imageElement.closest("form").classList.add("cropping");

                new Cropper(imageElement, {

                    aspectRatio: 1 / 1,
                    crop(event) {



                    }

                });

            }

            reader.readAsDataURL(file);

            e.target.value = "";

        }


    });

})