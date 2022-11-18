import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tesseract from 'tesseract.js';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      Tesseract.recognize(image, 'rus',{ logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        setImageText(text);
      })
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 400, height: 300 }} />}
      </View>
      <View>
        {imageText}
      </View>
    </View>
  );
}