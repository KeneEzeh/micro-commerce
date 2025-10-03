import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import api from "../api/client";

export default function CartScreen() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    const r = await api.get("/cart", { params: { userId: "user-1" } });
    setItems(r.data);
  }

  if (items.length === 0) {
    return (
      <View style={styles.noCart}>
        <Text>There's nothing here. Start shopping</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, flex: 1 }}>
            <Text>
              {item.product.title} x {item.quantity}
            </Text>
            <Button
              title="Delete"
              onPress={async () => {
                const itemsForOrder = items.map((i) => ({
                  productId: i.product.id,
                  qty: i.quantity,
                }));
                await api.delete(`/cart/${item.id}`, {});
                alert("Item Deleted from Cart");
              }}
            />
          </View>
        )}
      />
      {items.length > 0 && (
        <Button
          title="Checkout"
          onPress={async () => {
            const itemsForOrder = items.map((i) => ({
              productId: i.product.id,
              qty: i.quantity,
            }));
            await api.post("/orders");
            alert("Order placed successfully");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "auto",
  },
});
