import {
  appendToFile,
  Product,
  readFromFile,
  writeToFile,
} from "@/hooks/useFileStorage";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";

const addItem: React.FC = () => {
  const filename = "products.json";

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initialize the file with an empty array if it doesn't exist
    const initializeFile = async () => {
      const data = await readFromFile(filename);
      if (data === null) {
        writeToFile(filename, []);
      } else {
        setProducts(data);
      }
    };
    initializeFile();
  }, []);

  const handleWriteToFile = () => {
    if (name && price && quantity) {
      const productData: Product[] = [
        {
          id: Date.now(),
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      ];
      writeToFile(filename, productData);
      setProducts(productData);
      Alert.alert("Success", "Product written to file");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const handleReadFromFile = async () => {
    const data = await readFromFile(filename);
    if (data !== null) {
      setProducts(data);
      Alert.alert("Success", "Products read from file");
    } else {
      Alert.alert("Error", "Failed to read from file");
    }
  };

  const handleAppendToFile = () => {
    if (name && price && quantity) {
      const newProductData: Product = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      };
      appendToFile(filename, newProductData);
      setProducts((prevProducts) => [...prevProducts, newProductData]);
      Alert.alert("Success", "Product appended to file");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Product Name"
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Product Price"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Product Quantity"
        keyboardType="numeric"
      />
      <Button title="Write to File" onPress={handleWriteToFile} />
      <Button title="Read from File" onPress={handleReadFromFile} />
      <Button title="Append to File" onPress={handleAppendToFile} />
      <Text style={styles.title}>Stored Products:</Text>
      {products.map((product) => (
        <Text key={product.id} style={styles.product}>
          {product.name} - ${product.price} - Qty: {product.quantity}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  product: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default addItem;
