import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import api from "../api/client";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; title: string };
}

interface Order {
  id: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 16,
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Order ID: {item.id}</Text>
            <Text>Total: ${item.total}</Text>
            {item.items.map((i) => (
              <Text key={i.id}>
                {i.product.title} x {i.quantity} = ${i.quantity * i.price}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}
