import { Component, createSignal, onMount, Show, Suspense } from "solid-js";
import supabase from "~/supabase/client";
import { useSession } from "~/hooks/useSession";
import Signout from "./SignOut";

import "./Style.css";

const SignUp: Component = (props) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [session, { refetch: refetchSession }] = useSession();

  function handleEmailChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      setEmail(event.target.value);
    }
  }

  function handlePasswordChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      setPassword(event.target.value);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email: email(),
        password: password(),
      });
      if (error) throw error;

      refetchSession();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class="container">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Show
          when={!session()}
          fallback={
            <>
              <h1>You are already logged in</h1>
              <Signout />
            </>
          }
        >
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email()}
                onChange={handleEmailChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password()}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <button type="submit">Sign Up</button>
          </form>
        </Show>
      </Suspense>
    </div>
  );
};

export default SignUp;
