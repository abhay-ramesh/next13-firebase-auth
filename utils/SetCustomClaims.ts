import { getAuth } from "firebase-admin/auth";

export const SetCustomClaims = async (idToken: string) => {
  const customClaims = {
    fabricator: false,
    admin: false,
  };

  const { verifyIdToken } = getAuth();

  verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      getAuth().setCustomUserClaims(uid, customClaims);
    })
    .catch((error) => {
      console.log(error);
    });
};
