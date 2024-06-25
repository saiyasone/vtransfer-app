import React, { Fragment, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';

const ImagePicker = () => {
  const [files, setFiles] = useState<Asset[]>([]);

  const handleFilePicker = async () => {
    const response = await launchImageLibrary({
      mediaType: 'mixed',

      //   selectionLimit: 5,
    });

    const fileArrays: Asset[] =
      (await response.assets?.map((file, index) => ({
        index,
        ...file,
      }))) || [];

    setFiles((prev) => [...prev, ...fileArrays]);
  };

  const handleResetFile = () => {
    setFiles([]);
  };

  return (
    <View>
      <Text>ImagePicker</Text>

      <View
        style={{
          display: 'flex',
          gap: 6,
          flexDirection: 'row',
          marginVertical: 20,
        }}
      >
        <Button buttonColor='cyan' textColor='white' onPress={handleFilePicker}>
          Upload
        </Button>
        <Button buttonColor='red' textColor='white' onPress={handleResetFile}>
          Clear
        </Button>
      </View>

      {files.map((file, index) => {
        return (
          <Fragment key={index}>
            {file.type?.startsWith('image') ? (
              <View>
                <Image
                  width={100}
                  height={100}
                  resizeMode='cover'
                  source={{ uri: file.uri }}
                />
                <Text>{file.fileName}</Text>
              </View>
            ) : file.type?.startsWith('video') ? (
              <View>
                <Image
                  source={require('../../../assets/images/video-player.png')}
                />
                <Text>{file.fileName}</Text>
              </View>
            ) : (
              <Text>{file.fileName}</Text>
            )}
          </Fragment>
        );
      })}
    </View>
  );
};

export default ImagePicker;
