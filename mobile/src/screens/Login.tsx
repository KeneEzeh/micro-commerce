import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      console.log("Axios error:", err);
      Alert.alert(
        "Login failed",
        err.response?.data?.message || "Network Error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
          color="#888"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: { width: "100%", marginVertical: 8 },
});
