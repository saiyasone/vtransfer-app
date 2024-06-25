import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fs, { ReadDirItem } from 'react-native-fs';
import { Checkbox } from 'react-native-paper';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import styles from '../styles/FileCardItem.style';

const FileCardItem = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<any>(null);

  const checkAndRequestPermission = async () => {
    let result;

    // Check platform and request permission accordingly
    if (Platform.OS === 'android') {
      result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.DENIED) {
        result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
    } else if (Platform.OS === 'ios') {
      result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (result === RESULTS.DENIED) {
        result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
    }

    setPermissionStatus(result);

    if (result === RESULTS.GRANTED) {
      readFiles();
    } else {
      setError('Permission denied');
    }
  };

  const readFiles = async () => {
    try {
      const path =
        Platform.OS === 'android'
          ? fs.ExternalStorageDirectoryPath
          : fs.DocumentDirectoryPath;

      const result = (await readDirectoryRecursive(path)).slice(0, 10);
      setFiles(result);
    } catch (err) {
      setError(err);
    }
  };

  const readDirectoryRecursive = async (
    dirPath: string,
  ): Promise<ReadDirItem[]> => {
    let fileList: ReadDirItem[] = [];
    const items = await fs.readDir(dirPath);

    for (const item of items) {
      if (item.isDirectory()) {
        const subDirFiles = await readDirectoryRecursive(item.path);
        fileList = fileList.concat(subDirFiles);
      } else {
        fileList.push(item);
      }
    }

    return fileList;
  };

  const renderFileItem: ListRenderItem<ReadDirItem> = ({ item }) => {
    if (item.isFile()) {
      if (isImageFile(item.name)) {
        return (
          <TouchableOpacity style={styles.imageContainer}>
            <Checkbox
              status={isCheck ? 'checked' : 'unchecked'}
              onPress={() => {
                setIsCheck(!isCheck);
              }}
            />
            <Image
              source={{ uri: `file://${item.path}` }}
              style={styles.image}
            />
            <Text>{moment(item.mtime).format('DD-MM-YYYY')}</Text>
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const isImageFile = (fileName: string) => {
    return (
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.png')
    );
    // Add more extensions as needed
  };

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  return (
    <View>
      <Text>FileCardItem</Text>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {permissionStatus === RESULTS.GRANTED ? (
        <FlatList
          data={files}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.path}
          renderItem={renderFileItem}
        />
      ) : (
        <Text style={styles.permission}>Awaiting Permission...</Text>
      )}
    </View>
  );
};

export default FileCardItem;
