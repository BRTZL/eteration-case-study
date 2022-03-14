import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';
import { selectSimpsons } from '../redux/simpsons.slice';

type Props = NativeStackScreenProps<MainStackParams, 'SimpsonDetailScreen'>;

export default function SimpsonDetailScreen({
  route: {
    params: { id },
  },
}: Props) {
  const simpsons = useSelector(selectSimpsons);
  const simpson = simpsons.find(s => s.id === id);

  if (!simpson) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!!simpson.avatar && (
        <Image source={{ uri: simpson.avatar }} style={styles.image} />
      )}
      <Text style={styles.name}>{simpson.name}</Text>
      <Text style={styles.job}>{simpson.job}</Text>
      {!!simpson.bio && <Text style={styles.bio}>{simpson.bio}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
    marginBottom: 24,
  },
  name: {
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 6,
  },
  job: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.gray,
  },
  bio: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.gray,
  },
});
