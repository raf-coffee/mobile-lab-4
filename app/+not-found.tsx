import { Link, Stack } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/(tabs)" style={styles.link}>
          Go to "Goods" screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
