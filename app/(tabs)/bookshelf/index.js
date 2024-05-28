import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Bookshelf from "../../../components/book/Bookshelf";
import History from "../../../components/book/History";
import { useTranslation } from "react-i18next";
import { api } from "../../../store/api";
import { showError } from "../../../components/Toaster";
import { router } from "expo-router";
import { handleApiError } from "../../../store/utils";
import Loading from "../../../components/Loading";

export default function Tab() {
  const { data, isLoading, error } = api.useGetMyBookshelfQuery();
  const { i18n } = useTranslation();

  const [currentTab, setCurrentTab] = useState("bookshelf");
  const [bookshelf, setBookshelf] = useState([]);
  const [history, setHistory] = useState([]);

  // Error handler
  useEffect(() => {
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [error]);

  // Initial data loader
  useEffect(() => {
    if (!data || !data.success) return;
    const bookshelfData = data.data.available;
    const historyData = [
      ...data.data.exchanged,
      ...data.data.offered,
      ...data.data.reserved,
    ];
    setBookshelf(bookshelfData);
    setHistory(historyData);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      {/* Tab */}
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <TabHeader
          label={
            i18n.t("bookshelf.header") +
            (bookshelf.length ? ` ${bookshelf.length}` : "")
          }
          isActive={currentTab === "bookshelf"}
          onActive={() => setCurrentTab("bookshelf")}
        />
        <TabHeader
          label={
            i18n.t("history.header") +
            (history.length ? ` ${history.length}` : "")
          }
          isActive={currentTab === "history"}
          onActive={() => setCurrentTab("history")}
        />
      </View>
      {/* Content */}
      {currentTab === "bookshelf" && <Bookshelf books={bookshelf} />}
      {currentTab === "history" && <History books={history} />}
    </View>
  );
}

function TabHeader({ label, isActive, onActive }) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderBottomWidth: isActive ? 2 : 0,
      }}
      onPress={onActive}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: isActive ? "black" : "#6E7A9F",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
