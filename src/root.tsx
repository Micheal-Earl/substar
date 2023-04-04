// @refresh reload
import { createEffect, createSignal, Show, Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

import { useSession } from "~/hooks/useSession";
import SignOut from "./components/user/SignOut";

export default function Root() {
  const [session] = useSession();
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <A href="/">Index</A>
            <Show
              when={session()}
              fallback={
                <>
                  <A href="/login">Login</A>
                  <A href="/register">Register</A>
                </>
              }
            >
              <SignOut />
            </Show>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
