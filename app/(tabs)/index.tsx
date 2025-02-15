import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { addToCart } from "@/db";

type Item = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
};

export default function Goods() {
  const [goods, setGoods] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGoods = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setGoods(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGoods();
    setRefreshing(false);
  };

  const handleAddToCart = async (product: Omit<Item, "id">) =>
    addToCart(product);

  useEffect(() => {
    fetchGoods();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={goods}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Button
            title="Добавить в корзину"
            onPress={() => handleAddToCart(item)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowRadius: 16,
    shadowOpacity: 0.2,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginVertical: 8,
  },
  price: {
    fontSize: 12,
    color: "#898989",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
});
