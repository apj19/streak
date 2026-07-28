import { z } from "zod";
import { ServerActionResponse } from "@/types/user";
import { ActionError } from "@/types/user";

export async function safeAction<T>(
  ServerAction: () => Promise<T>,
): Promise<ServerActionResponse<T>> {
  try {
    const data = await ServerAction();
    return { success: true, data };
  } catch (error) {
    //we can improve error handline here but for now kepty it simple
    // return { success: false, error: "Something went wrong" };
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please fix the errors in the form.",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    // 4. Handle intentional business logic errors ("Not logged in", "Not enough coins")
    if (error instanceof ActionError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error("🚨 Unhandled Server Action Error:", error);

    return {
      success: false,
      // Generic message ensures we don't leak SQL queries or DB schema to the browser
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
