import { Show } from "solid-js";
import SignIn from "~/components/user/SignIn";
import { useSession } from "~/hooks/useSession";

export default function Login() {
  const [session] = useSession();

  return (
    <div>
      <Show when={!session()} fallback={<h1>Already logged in...</h1>}>
        <SignIn />
      </Show>
    </div>
  );
}
