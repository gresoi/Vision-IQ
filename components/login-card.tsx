import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signIn, signInWithGoogle, resetPassword } from "@/api/auth"; 
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      await signIn({
        email: email.trim().toLowerCase(),
        password,
      });

      alert("Logged in successfully!");
      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        await signInWithGoogle(userInfo.data.idToken);
        
        alert("Logged in successfully with Google!");
        router.replace("/(tabs)");
      } else {
        throw new Error("No secure ID Token returned by Google Engine.");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Google Native Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      alert("Please enter your email address first to reset your password.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email.trim().toLowerCase());
      alert("Password reset request sent! Check your email inbox.");
    } catch (error: any) {
      alert(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue tracking your progress.</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        placeholder="jane@example.com"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Password</Text>
        <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="••••••••"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Row */}
      <View style={styles.socialRow}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} disabled={loading}>
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Switch */}
      <TouchableOpacity onPress={() => router.push("/signup")} disabled={loading}>
        <Text style={styles.footerSwitchText}>
          Don't have an account? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7F0",
    borderRadius: 24,
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  forgotText: {
    fontSize: 12,
    color: "#FF6A00",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#fff",
  },
  socialButtonText: {
    fontWeight: "500",
    color: "#374151",
  },
  footerSwitchText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
  },
  link: {
    color: "#FF6A00",
    fontWeight: "600",
  },
});