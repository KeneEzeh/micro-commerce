import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function ManageOrders() {
  const { userToken } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const fulfillOrder = async (orderId: string) => {
    try {
      await api.patch(
        `/orders/${orderId}`,
        { status: "fulfilled" },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "fulfilled" } : o))
      );
      Alert.alert("Success", "Order marked as fulfilled");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id?.toString()}
        refreshing={loading}
        onRefresh={fetchOrders}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.text}>
              Order #{item.id} - {item.status}
            </Text>
            <Text>Customer: {item.user?.email || "N/A"}</Text>
            <Text>Items: {item.items?.length}</Text>
            {item.status !== "fulfilled" && (
              <Button title="Fulfill" onPress={() => fulfillOrder(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  orderItem: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  text: { fontSize: 16, marginBottom: 4 },
});
