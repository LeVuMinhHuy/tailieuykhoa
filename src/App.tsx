import { useCallback } from "react";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";
import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, FirebaseCMSApp } from "firecms";
import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import { firebaseConfig } from "./firebase-config.ts";
import { postCollection } from "./collections/posts.tsx";
import { Roles } from "./consts/auth.consts.ts";
import { folderCollection } from "./collections/folders.tsx";
import { userCollection } from "./collections/users.tsx";

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (
        user?.email === "levuminhhuy.compsci@gmail.com" ||
        user?.email === "quangdinhlam5@gmail.com"
      ) {
        authController.setExtra({ roles: Roles.ADMIN });
        return true;
      }

      return false;
    },
    []
  );

  const dataEnhancementPlugin = useDataEnhancementPlugin({
    // Paths that will be enhanced
    getConfigForPath: ({ path }) => {
      return true;
    },
  });

  return (
    <FirebaseCMSApp
      name={"Tài liệu y khoa"}
      plugins={[dataEnhancementPlugin]}
      authentication={myAuthenticator}
      collections={[postCollection, folderCollection, userCollection]}
      firebaseConfig={firebaseConfig}
    />
  );
}
