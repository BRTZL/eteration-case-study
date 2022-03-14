import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSimpsons } from '../redux/simpsons.slice';
import SimpsonAddScreen from '../screens/SimpsonAddScreen';
import SimpsonDetailScreen from '../screens/SimpsonDetailScreen';
import SimpsonsListingScreen from '../screens/SimpsonsListingScreen';

export type MainStackParams = {
  SimpsonsListingScreen: undefined;
  SimpsonDetailScreen: {
    id: string;
  };
  SimpsonAddScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export function Main() {
  const dispach = useDispatch();

  React.useEffect(() => {
    dispach(fetchSimpsons());
  }, [dispach]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="SimpsonsListingScreen"
        component={SimpsonsListingScreen}
        options={{
          title: 'Simpsons',
        }}
      />
      <MainStack.Screen
        name="SimpsonDetailScreen"
        component={SimpsonDetailScreen}
        options={{
          title: 'Details',
        }}
      />
      <MainStack.Screen
        name="SimpsonAddScreen"
        component={SimpsonAddScreen}
        options={{
          title: 'Add New Character',
        }}
      />
    </MainStack.Navigator>
  );
}
