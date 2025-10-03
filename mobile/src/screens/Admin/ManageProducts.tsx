import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://YOUR-IP:3000"; // replace with your server IP

export default function ManageProducts() {
  const { userToken } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !price || !inventory) {
      return Alert.alert("Validation", "All fields are required");
    }

    try {
      if (editingProduct) {
        // update product
        await axios.patch(
          `${API_URL}/products/${editingProduct.id}`,
          { title, price: +price, inventory: +inventory },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        Alert.alert("Updated", "Product updated successfully");
      } else {
        // create product
        await axios.post(
          `${API_URL}/products`,
          { title, price: +price, inventory: +inventory },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        Alert.alert("Created", "Product created successfully");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      Alert.alert("Deleted", "Product deleted");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to delete product");
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setTitle(product.title);
    setPrice(product.price.toString());
    setInventory(product.inventory.toString());
  };

  const resetForm = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setInventory("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {editingProduct ? "Edit Product" : "Add Product"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Inventory"
        keyboardType="numeric"
        value={inventory}
        onChangeText={setInventory}
      />

      <Button
        title={editingProduct ? "Update Product" : "Add Product"}
        onPress={handleSave}
      />
      {editingProduct && <Button title="Cancel" onPress={resetForm} />}

      <Text style={styles.heading}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchProducts}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.text}>
              {item.title} - ${item.price} (Stock: {item.inventory})
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button
                title="Delete"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  productItem: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  text: { fontSize: 16 },
});
