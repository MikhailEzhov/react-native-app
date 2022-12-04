import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from "react-native";
import initialData from "./data/initialData";

export default function App() {
  const [phrase, setPhrase] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [firstLanguage, setFirstLanguage] = useState("eng");

  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  useEffect(() => {
    const lastIndex = initialData.length - 1;
    const random = randomInteger(0, lastIndex);
    setPhrase(initialData[random]);
  }, []);

  const changePhrase = (id) => {
    const currentIndex = id - 1;
    const lastIndex = initialData.length - 1;
    const newIndex = randomInteger(0, lastIndex);
    if (currentIndex !== newIndex) {
      setPhrase(initialData[newIndex]);
    }
    if (currentIndex === newIndex && currentIndex > 0) {
      setPhrase(initialData[newIndex - 1]);
    }
    if (currentIndex === newIndex && currentIndex < lastIndex) {
      setPhrase(initialData[newIndex + 1]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.header}>
        <Text style={styles.title}>Сначала Английский</Text>
        <Switch
          trackColor={{ true: "#5b5959", false: "#5b5959" }}
          thumbColor={firstLanguage === "rus" ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#ffffff"
          value={firstLanguage === "rus"}
          onValueChange={() =>
            setFirstLanguage(firstLanguage === "eng" ? "rus" : "eng")
          }
        />
        <Text style={styles.title}>Сначала Русский</Text>
      </View>

      <Text style={styles.description}>
        {firstLanguage === "eng" ? phrase.eng : phrase.rus}
      </Text>

      <View>
        {showTranslation ? (
          <Text style={styles.description}>
            {firstLanguage !== "eng" ? phrase.eng : phrase.rus}
          </Text>
        ) : (
          <Button
            color="#5b5959"
            title="показать перевод"
            accessibilityLabel="кнопка для показа перевода"
            onPress={() => setShowTranslation(true)}
          />
        )}
      </View>

      <Button
        color="#5b5959"
        title="дальше"
        accessibilityLabel="кнопка для перехода к следующей фразе"
        onPress={() => {
          changePhrase(phrase.id);
          setShowTranslation(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#171515",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#5b5959",
    flex: 1,
    textAlign: "center",
  },
  description: {
    fontSize: 26,
    color: "#ffffff",
    textAlign: "center",
  },
});
