import { useEffect, useState } from "react";
import { supabase } from "supabaseClient.js";

import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import { useAuth } from "hooks/Auth";
import { Navigate } from "react-router-dom";

function SignIn() {
  const [session, setSession] = useState();

  const handleSignIn = async (provider) => {
    let providerOptions = {};

    if (provider === "discord") {
      providerOptions = {
        scopes: "guilds guilds.members.read",
        // Discord-specific options
      };
    } else if (provider === "google") {
      providerOptions = {
        // Google-specific options
      };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: providerOptions,
    });

    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <CoverLayout
      title="WELCOME, ENTREPRENEUR!"
      color="white"
      description="You must be a member of Imperial Alpha to access the dashboard. Login via Discord or Google to sign in!"
      premotto=""
      motto=""
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiButton color="info" onClick={() => handleSignIn("discord")}>
          Login with Discord
        </VuiButton>
        <div style={{ margin: "10px" }}></div> {/* Add spacing */}
        <hr style={{ width: "50%", margin: "0" }} /> {/* Add a line */}
        <div style={{ margin: "10px" }}></div> {/* Add spacing */}
        <VuiButton color="info" onClick={() => handleSignIn("google")}>
          Login with Google
        </VuiButton>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
