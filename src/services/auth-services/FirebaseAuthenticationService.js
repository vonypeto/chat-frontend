import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "auth/FirebaseAuth";
import axios from "axios";
const FirebaseService = {};
const getRandomDisplayName = async () => {
  const response = await axios.post(
    "https://randommer.io/Name",
    "type=firstname&number=20&X-Requested-With=XMLHttpRequest",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  );
  const names = response.data;
  console.log(names);
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

FirebaseService.signInEmailRequest = async (email, password) => {
  const data = await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((err) => err);
  return data;
};

FirebaseService.signOutRequest = async () =>
  await auth
    .signOut()
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signInGoogleRequest = async () =>
  await auth
    .signInWithPopup(googleAuthProvider)
    .then((user) => {
      return user;
    })
    .catch((err) => err);

FirebaseService.signInFacebookRequest = async () =>
  await auth
    .signInWithPopup(facebookAuthProvider)
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signUpEmailRequest = async (email, password) => {
  try {
    const displayName = await getRandomDisplayName();

    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log(userCredential.user._delegate.email);
    const user = userCredential.user;
    await user.updateProfile({
      displayName: displayName,
    });
    console.log(user.email);
    console.log(user.displayName);
    console.log(user.uid);
    const request = {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
    };
    await axios.post("/api/signup", request).then((res) => {
      console.log(res.data);
    });
    return userCredential;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default FirebaseService;
