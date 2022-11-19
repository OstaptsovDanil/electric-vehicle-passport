import React, {useState} from 'react';
import {Button, Image, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MyImagePicker({style,text}) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{...style}}>
            <Button title={text} onPress={pickImage}/>
            {image && <Image source={{uri: image}} style={{width: 200, height: 200,marginTop:20}}/>}
        </View>
    );
}