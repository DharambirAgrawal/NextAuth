"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  //   console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });

    return { success: "Email Sent!" };
    // } catch (error) {
    //   // console.log(err);
    //   const someError = error as CredentialsSignin;
    //   // return someError.cause;
    //   console.log("........................");
    //   if (error instanceof AuthError) {
    //     console.log(error.type);
    //   }
    //   console.log(someError.cause);

    //   console.log("........................");
    //   if (error instanceof AuthError) {
    //     switch (error.type) {
    //       case "CredentialsSignin":
    //         return { error: "Invalid credentials" };
    //       case "CallbackRouteError":
    //         return { error: "callinggggg" };
    //       default:
    //         return { error: "Something went wrong!" };
    //     }
    //   }
    //   // throw err;

    //   return { error: "Something went wrong!" };
    // }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials" };
      } else {
        console.error("Auth error:", error);
        // return { error: "An authentication error occurred" };
      }
    }
    if (error instanceof Error) {
      // Check if the underlying error is a CredentialsSignin error
      console.log(
        "...................................",
        error.message,
        error.name,
        error.stack,
        error.cause
      );
      if (error.message.includes("CredentialsSignin")) {
        return { error: "Invalid credentials" };
      }
    }

    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
};
