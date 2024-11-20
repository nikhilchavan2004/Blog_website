import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center 
        border-2 border-red-500 text-black 
        hover:bg-red-50 py-2 rounded-lg"
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2 text-black" />
        Continue with Google
      </button>
    </div>
  );
}
