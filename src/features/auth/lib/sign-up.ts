import { authClient } from "@/features/auth/lib/auth-client";

export type SignUpValues = {
  email: string;
  name: string;
  password: string;
};

type SignUpOptions = {
  onError: (message: string) => void;
  onPendingChange: (isPending: boolean) => void;
  onSuccess: () => void;
};

export async function submitSignUp(
  values: SignUpValues,
  options: SignUpOptions,
) {
  const { data, error } = await authClient.signUp.email(
    {
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: "/dashboard",
    },
    {
      onRequest: () => {
        options.onPendingChange(true);
      },
      onSuccess: () => {
        options.onSuccess();
      },
      onError: (context) => {
        options.onError(context.error.message);
      },
    },
  );

  options.onPendingChange(false);

  return { data, error };
}
