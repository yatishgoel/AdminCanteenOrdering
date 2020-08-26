import React, { useState } from "react";
import { FlatList } from "react-native";

import {
  ListItem,
  ListItemSeparator,
  ListItemDeleteAction,
} from "../components/lists";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "M1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "M2",
    image: require("../assets/mosh.jpg"),
  },
];

function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(message) => message.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subTitle={item.description}
          image={item.image}
          onPress={() => console.log("Tapped", item)}
          renderRightActions={() => (
            <ListItemDeleteAction onPress={() => handleDelete(item)} />
          )}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      refreshing={refreshing}
      onRefresh={() => {
        setMessages(initialMessages);
      }}
    />
  );
}

export default MessagesScreen;
