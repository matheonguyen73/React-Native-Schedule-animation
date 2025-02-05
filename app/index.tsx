import { Button, SwitchBase, Text, TouchableOpacity, View } from "react-native";
import Scheduler from "./components/scheduler";
import AvailabilityAnimation from "./components/availabilityAnimation";

import { faker } from '@faker-js/faker';
import React, { useState } from "react";

faker.seed(22);

export const generateFakeData = () => {
  return {
    key: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({
      width: 80,
      height: 80,
      blur: 0,
    }),
  }
}

export const generateFakeDataArray = () => {
  return [...Array(faker.number.int({ min: 1, max: 5 })).keys()].map(() => generateFakeData());
}

export type HomeType = ReturnType<typeof generateFakeData>;


export default function Index() {

  const [data, setData] = useState<HomeType[]>(generateFakeDataArray());
  const [isLoading, setIsLoading] = useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 8
      }}
    >
      {/* <Scheduler /> */}
      <AvailabilityAnimation data={data} isLoading={isLoading} />
      <TouchableOpacity
        style={{
          padding: 8,
          borderRadius: 25,
          marginTop: 50,
          borderWidth: 1,
          borderColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          alignSelf: 'center'

        }}
        onPress={
          () => {
            clearTimeout(timer.current!);
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setData(generateFakeDataArray());
            }, Math.random() * 1000 + 1000);
          }
        }>
        <Text style={{ color: 'green', fontWeight: '600' }}>
          {'Generate New Data'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
