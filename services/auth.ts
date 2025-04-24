import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return null;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Sign Out Error:', error);
    return false;
  }
}; 