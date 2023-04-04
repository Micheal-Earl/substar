import { Component } from "solid-js";
import { useSession } from "~/hooks/useSession";
import supabase from "~/supabase/client";

import "./Style.css";

const SignOut: Component = (props) => {
  const [session, { refetch: refetchSession }] = useSession();

  const handleClick = async (event: Event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      refetchSession();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button class="button-warn-small" onClick={handleClick}>Sign Out</button>
  );
};

export default SignOut;
