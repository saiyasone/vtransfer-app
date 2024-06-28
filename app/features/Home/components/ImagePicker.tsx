import React, { Fragment, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFileDateCreated } from '../../../utils/file.util';
import { convertBytetoMBandGB } from '../../../utils/storage.util';

const ImagePicker = () => {
  const [files, setFiles] = useState<Asset[] | any[]>([]);

  const handleFilePicker = async () => {
    const response = await launchImageLibrary({
      mediaType: 'mixed',
    });

    const fileArrays: Asset[] = await Promise.all(
      response?.assets?.map(async (file, index) => {
        const fileDate = await getFileDateCreated(file.uri || '');
        return {
          index,
          ...file,
          fileDate,
        };
      }) || [],
    );

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

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {files.map((file, index) => {
          return (
            <Fragment key={index}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {file.type?.startsWith('image') ? (
                  <View>
                    <Image
                      width={60}
                      height={60}
                      resizeMode='cover'
                      source={{ uri: file.uri }}
                      style={{ borderRadius: 10 }}
                    />
                  </View>
                ) : file.type?.startsWith('video') ? (
                  <View>
                    <Image
                      width={60}
                      height={60}
                      resizeMode='cover'
                      style={{ borderRadius: 10 }}
                      source={require('../../../assets/images/video-player.png')}
                    />
                  </View>
                ) : (
                  <Text>{file.fileName}</Text>
                )}

                <Fragment>
                  <View style={{ display: 'flex', gap: 2 }}>
                    <Text style={{ fontWeight: 600 }}> {file.fileName} </Text>
                    <Text> {convertBytetoMBandGB(file.fileSize || 0)} </Text>
                    <Text>{file?.fileDate}</Text>
                  </View>
                </Fragment>

                <Fragment>
                  <TouchableOpacity>
                    <MuiIcon name='trash-can-outline' size={22} />
                  </TouchableOpacity>
                </Fragment>
              </View>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default ImagePicker;
