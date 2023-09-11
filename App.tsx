import Downshift from "downshift";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const items = [
    { value: "apple" },
    { value: "pear" },
    { value: "orange" },
    { value: "grape" },
    { value: "banana" },
  ];

  const [selectedValue, setSelectedValue] = useState(undefined);

  return (
    <View style={styles.container}>
      <Text>Selected Value: {selectedValue}</Text>
      <StatusBar style="auto" />
      <Downshift
        onChange={(selection) => {
          setSelectedValue(selection ? selection.value : undefined);
        }}
        itemToString={(item) => (item ? item.value : "")}
      >
        {({
          getItemProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          highlightedIndex,
          getRootProps,
        }) => (
          <View {...getRootProps({}, { suppressRefError: true })}>
            <View>
              <Button
                {...getToggleButtonProps()}
                title={isOpen ? "Close select" : "Open select"}
              />
            </View>
            <View {...getMenuProps()}>
              {isOpen
                ? items.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={(e) =>
                        (getItemProps({
                          key: item.value,
                          index,
                          item,
                        }) as any)?.onPress?.(e)
                      }
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        borderColor: "black",
                        borderWidth: 1,
                        padding: 4,
                      }}
                    >
                      <Text>{item.value}</Text>
                    </Pressable>
                  ))
                : null}
            </View>
          </View>
        )}
      </Downshift>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
