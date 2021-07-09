import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Calendar, Text, CalendarViewModeId } from "@ui-kitten/components";

export const CalendarCustomDayShowcase = () => {
  const [date, setDate] = React.useState(null);

  const renderLeftArrow = (id: CalendarViewModeId) => {
    return (
      <View style={styles.arrow}>
        <TouchableOpacity>
          <Text>{id}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Calendar
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderArrowLeft={renderLeftArrow}
    />
  );
};

const styles = StyleSheet.create({
  arrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
