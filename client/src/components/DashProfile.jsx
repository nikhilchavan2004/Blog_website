import { Button, TextInput } from "flowbite-react";
import pp from "./pp.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto md:mx-96 p-3 w-full">
      <h1 className="text-center text-2xl font-semibold mb-6">Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <div className="flex justify-center items-center mb-6 gap-3">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleChange} 
            ref={filePickerRef} 
            hidden 
          />
          <div 
            className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full" 
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imagePreview || currentUser.profilePicture || pp}
              className="w-full h-full object-cover rounded-full border-4 border-[lightgrey]"
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <TextInput 
            type="text" 
            id="username" 
            placeholder="username" 
            defaultValue={currentUser.username} 
            onChange={handleFormChange} 
            className="text-black" 
          />
          <TextInput 
            type="email" 
            id="email" 
            placeholder="email" 
            defaultValue={currentUser.email}
            onChange={handleFormChange}
          />
          <TextInput 
            type="password" 
            id="password" 
            placeholder="password" 
            onChange={handleFormChange}
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