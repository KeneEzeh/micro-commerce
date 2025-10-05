import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AdminHome() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <Button
        title="Manage Products"
        onPress={() => navigation.navigate("ManageProducts")}
      />
      <Button
        title="Manage Orders"
        onPress={() => navigation.navigate("ManageOrders")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, gap: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
