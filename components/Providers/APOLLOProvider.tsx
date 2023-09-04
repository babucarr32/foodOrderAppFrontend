import { View, Text } from "react-native";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_URL } from "react-native-dotenv";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

function APOLLOProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default APOLLOProvider;
