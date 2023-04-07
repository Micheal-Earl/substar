import { Component, createSignal, onMount, Show, Suspense } from "solid-js";
import supabaseAnon from "~/supabase/browserClient";
import { useSession } from "~/hooks/useSession";
import Signout from "./SignOut";

import "./Style.css";

const SignUp: Component = (props) => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [session, { refetch: refetchSession }] = useSession();

  function handleEmailChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      setEmail(event.target.value);
    }
  }

  function handleNameChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      setName(event.target.value);
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
      const { data, error } = await supabaseAnon.auth.signUp({
        email: email(),
        password: password(),
      });
      if (error) throw error;

      await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data?.user?.id,
          name: name(),
        }),
      });

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
              Username:
              <input
                type="text"
                value={name()}
                onChange={handleNameChange}
              />
            </label>
            <br />
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
