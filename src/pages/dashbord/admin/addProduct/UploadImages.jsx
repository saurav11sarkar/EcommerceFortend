import { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseUrl";

const UploadImages = ({ name, id, value, placeholder, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // request
  const uploadSingleImage = (base64) => {
    setLoading(true);
    axios
      .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        alert("Image upload successfully");
        setImage(imageUrl);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error uploding image", error);
        setLoading(false);
      });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      // console.log(base64)
      uploadSingleImage(base64);
      return;
    }
    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        id={id}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div style={{ marginTop: "8px" }} className="text-sm text-blue-600">
          Product loading...
        </div>
      )}
      {url && (
        <div style={{ marginTop: "8px" }} className="text-sm text-gray-600">
          <p>Image Uploaded successfully!</p>
          <img src={url} alt="upload-imge" />
        </div>
      )}
    </div>
  );
};

export default UploadImages;
