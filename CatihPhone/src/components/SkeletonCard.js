import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

export default function SkeletonCard() {

  return (
    <View style={styles.container}>
      <SkeletonContent
        containerStyle={{ flex: 1 }}
        isLoading={true}
        layout={[
          { key: "avatar", width: 50, height: 50, borderRadius: 25 },
          { key: "title", width: "80%", height: 20, marginTop: 10 },
          { key: "subtitle", width: "60%", height: 20, marginTop: 6 },
          { key: "content", width: "100%", height: 80, marginTop: 10 }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 12
  }
});