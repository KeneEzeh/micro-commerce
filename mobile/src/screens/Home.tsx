import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Micro-Commerce</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Browse Products"
          onPress={() => navigation.navigate("Products")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="My Cart" onPress={() => navigation.navigate("Cart")} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="My Orders"
          onPress={() => navigation.navigate("Orders")}
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 32 },
  buttonContainer: { marginVertical: 8, width: "80%" },
});
