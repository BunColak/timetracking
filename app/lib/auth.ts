import {json, LoaderFunctionArgs, redirect} from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export const getUserIdOrRedirect = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    throw redirect("/sign-in");
  }

  return userId;
};


export const getUserIdOrThrow = async (args: LoaderFunctionArgs) => {
    const userId = await getUserIdOrRedirect(args);

    if (!userId) {
        throw json({message: 'You must be logged in to do that.'}, {status: 401})
    }

    return userId;
}