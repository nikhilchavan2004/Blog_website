import { Button, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from 'firebase/storage';
import { app } from '../firebase';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = () => {
    // Reset previous upload states
    setImageFileUploadError(null);
    setImageFileUploadProgress(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          // TODO: Update user profile in database with new image URL
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto md:mx-96 p-3 w-full">
      <h1 className="text-center text-2xl font-semibold mb-6">Profile</h1>
      <form>
        <div className="flex justify-center items-center mb-6 gap-3">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden 
          />
          <div 
            className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imageFileUrl || currentUser.profilePicture}
              className="w-full h-full object-cover rounded-full border-4 border-[lightgrey]"
              alt="Profile"
            />
          </div>
        </div>
        {imageFileUploadProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{width: `${imageFileUploadProgress}%`}}
            ></div>
          </div>
        )}
        {imageFileUploadError && (
          <p className="text-red-500 text-center">{imageFileUploadError}</p>
        )}
        <div className="flex flex-col gap-6">
          <TextInput 
            type="text" 
            id="username" 
            placeholder="username" 
            defaultValue={currentUser.username} 
            className="text-black" 
          />
          <TextInput 
            type="email" 
            id="email" 
            placeholder="email" 
            defaultValue={currentUser.email}
          />
          <TextInput 
            type="password" 
            id="password" 
            placeholder="password" 
            defaultValue="" 
            placeholder="New Password (optional)"
          />
          <Button 
            type="submit" 
            gradientDuoTone="purpleToblue"
            className="bg-blue-500 hover:bg-purple-700 text-gray-800 font-bold py-2 px-1.5" 
            outline
          >
            Update
          </Button>
        </div>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}