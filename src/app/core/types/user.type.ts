/**
 * The type for the 'User' collection in the Firestore database.
 */
export type User = {
  id: string;
  userUID: string;
  username: string;
  profile: {
    firstname: string;
    lastname: string;
  };
  significantOther: string;
  followers: string[];
  followings: string[];
};
