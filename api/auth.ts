import { supabase } from "@/lib/supabase";

type SignUpParams = {
  fullName: string;
  email: string;
  password: string;
};
type VerifyOtpParams = {
  email: string;
  token: string;
};

export async function signUp({ fullName, email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: "",
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
export async function verifyEmailOtp({ email, token }: VerifyOtpParams) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function resendSignupOtp(email: string) {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: "",
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email);
}

export async function getCurrentUser() {
  return supabase.auth.getUser();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function signInWithGoogle(idToken: string) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (error) {
    throw error;
  }

  return data;
}
