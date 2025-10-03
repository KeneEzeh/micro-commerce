import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../api/client";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("auth/register", {
        email,
        password,
      });
      Alert.alert("Registration successful! Please login.");
      navigation.goBack();
    } catch (err: any) {
      console.log("Axios error:", err);
      Alert.alert(
        "Registration failed",
        err.response?.data?.message || "Network Error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
        <Button title="Register" onPress={handleRegister} />
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
