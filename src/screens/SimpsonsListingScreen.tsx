import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'react-native-elements';
import colors from '../constants/colors';
import { MainStackParams } from '../navigation/Main';
import { deleteSimpson, selectSimpsons } from '../redux/simpsons.slice';

type Props = NativeStackScreenProps<MainStackParams, 'SimpsonsListingScreen'>;

export default function SimpsonsListingScreen({ navigation }: Props) {
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>();
  const insets = useSafeAreaInsets();
  const simpsons = useSelector(selectSimpsons);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={simpsons}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listTile}
              onPress={() =>
                navigation.navigate('SimpsonDetailScreen', { id: item.id })
              }
            >
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.image} />
                ) : (
                  <View style={styles.image} />
                )}
                <Text>{item.name}</Text>
              </View>
              <Icon
                name="trash-outline"
                size={24}
                onPress={() => {
                  setSelectedId(item.id);
                  setDeleteDialog(true);
                }}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View
        style={[styles.floatingActionButtonWrapper, { bottom: insets.bottom }]}
      >
        <TouchableOpacity
          style={styles.floatingActionButton}
          onPress={() => {
            navigation.navigate('SimpsonAddScreen');
          }}
        >
          <Icon name="add-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Dialog
        isVisible={deleteDialog}
        onBackdropPress={() => setDeleteDialog(false)}
      >
        <Dialog.Title title="Delete Confirmation" />
        <Text>
          Are you sure you want to delete this character? There is no turning
          back
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Cancel"
            onPress={() => {
              setDeleteDialog(false);
              setSelectedId(undefined);
            }}
          />
          <Dialog.Button
            title="Delete"
            onPress={() => {
              if (selectedId) dispatch(deleteSimpson({ id: selectedId }));
              setDeleteDialog(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listTile: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  floatingActionButtonWrapper: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  floatingActionButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 12,
  },
});
