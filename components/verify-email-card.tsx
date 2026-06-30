import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
import { verifyEmailOtp, resendSignupOtp } from "@/api/auth";


export default function VerifyEmailCard() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputsRef = useRef<any[]>([]);
  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next box if filled
    if (text.length > 0 && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  async function handleVerify() {
    const token = otp.join("");
    if (token.length < 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      await verifyEmailOtp({
        email: email || "",
        token,
      });

      alert("Email verified and account activated successfully!");
      router.push("/profile-setup");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    try {
      setResending(true);
      await resendSignupOtp(email);
      alert("A new 6-digit verification code has been sent to your email.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setResending(false);
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

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressItem, styles.active]} />
        <View style={[styles.progressItem, styles.active]} />
        <View style={styles.progressItem} />
        <View style={styles.progressItem} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit code to{" "}
        <Text style={styles.email}>{email || "your email address"}</Text>
      </Text>

      {/* OTP Inputs */}
     <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {/* Resend */}
      <Text style={styles.resendText}>Didn’t receive the code?</Text>
      <TouchableOpacity onPress={handleResend} disabled={resending}>
        <Text style={styles.resendLink}>
          {resending ? "Resending..." : "Resend Code"}
        </Text>
      </TouchableOpacity>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.button, otp.join("").length === 6 && { backgroundColor: "#FF6A00" }]} 
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify & Continue</Text>
        )}
      </TouchableOpacity>

      {/* Footer
      <Text style={styles.footerText}>
        Enter code: 123456 to continue demo
      </Text> */}
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

  progressContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  progressItem: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
    borderRadius: 2,
  },
  active: {
    backgroundColor: "#FF6A00",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  email: {
    color: "#111",
    fontWeight: "600",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 44,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },

  resendText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  resendLink: {
    fontSize: 13,
    color: "#FF6A00",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#FFB37A",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
});
