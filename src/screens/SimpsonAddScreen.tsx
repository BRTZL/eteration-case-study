import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';
import { addSimpson } from '../redux/simpsons.slice';
import { useCreateCharacter } from '../util/createCharacter';

type Props = NativeStackScreenProps<MainStackParams, 'SimpsonAddScreen'>;

export default function SimpsonAddScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const {
    submit,
    errors,
    name,
    setName,
    job,
    setJob,
    bio,
    setBio,
    imageLink,
    setImageLink,
  } = useCreateCharacter();

  return (
    <View style={styles.container}>
      <TextInput
        label="Name Surname"
        placeholder="Enter character name..."
        value={name}
        onChangeText={(text: string) => setName(text)}
        errorText={errors.name}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        label="Job Title"
        placeholder="Enter character job..."
        value={job}
        onChangeText={(text: string) => setJob(text)}
        errorText={errors.job}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        label="About Him/Her"
        placeholder="Enter character bio..."
        value={bio}
        onChangeText={(text: string) => setBio(text)}
        errorText={errors.bio}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        label="Image Link"
        placeholder="Enter character image link..."
        value={imageLink}
        onChangeText={(text: string) => setImageLink(text)}
        errorText={errors.imageLink}
        keyboardType="url"
        autoCapitalize="none"
      />

      <Button
        onPress={() => {
          const res = submit();
          if (res) {
            dispatch(
              addSimpson({
                id: new Date(Date.now()).toISOString(),
                name,
                job,
                avatar: imageLink,
                bio,
              }),
            );
            navigation.goBack();
          }
        }}
      >
        Add Character
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
});
