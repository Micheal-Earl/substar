import { Show } from "solid-js";
import { Title } from "solid-start";
import Counter from "~/components/Counter";

import { useSession } from "~/hooks/useSession";

export default function Home() {
  const [session] = useSession();
  return (
    <main>
      <Title>Hello World</Title>
      <Show when={session()} fallback={<h1>Hello world!</h1>}>
        <h1>Hello {session()?.user.email}!</h1>
      </Show>
      <Counter />
    </main>
  );
}
