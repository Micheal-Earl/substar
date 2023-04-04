import { Show } from "solid-js";
import SignUp from "~/components/user/SignUp";
import { useSession } from "~/hooks/useSession";

export default function Register() {
  const [session] = useSession();

  return (
    <div>
      <Show when={!session()} fallback={<h1>Already logged in...</h1>}>
        <SignUp />
      </Show>
    </div>
  );
}
