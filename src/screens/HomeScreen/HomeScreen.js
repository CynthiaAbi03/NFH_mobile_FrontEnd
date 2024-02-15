import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Alert,
  Dimensions,
  PixelRatio,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';
// import {Poppins_300Light as Poppins_Light,
//         Poppins_500Medium as Poppins_Medium,
//         Poppins_600SemiBold as Poppins_SemiBold, 
//         Poppins_400Regular as Poppins_Regular } from '@expo-google-fonts/poppins'
import PoppinsLight from '../../assets/fonts/Poppins-Light.ttf'
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.ttf';
import PoppinsSemiBold from '../../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsMedium from '../../assets/fonts/Poppins-Medium.ttf'
import { getResponsive } from '../../helpers/responsive';
SplashScreen.preventAutoHideAsync();


export default function HomeScreen() {

  const [appIsReady, setAppIsReady] = useState(false);

  const navigation = useNavigation();

  const styles = useStyles()

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': PoppinsRegular,
    'Poppins-Medium': PoppinsMedium,
    'Poppins-SemiBold': PoppinsSemiBold,
    'Poppins-Light': PoppinsLight,

  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  
  return (

      <View style={styles.container} onLayout={onLayoutRootView}>

      <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/images/NFH_background_image.png')}
      >

        <View style={styles.section1}>

          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/NFH_logo.png')} />
            <Text style={styles.logoText}>
              NFH
            </Text>
          </View>

          <View style={styles.formalContainer}>
            <Text style={styles.subtitle}>
              Système anti-incendie Automatisé
            </Text>
          </View>

        </View>

       
        

        <View style={styles.descriptionContainer}>
            <Text style={styles.welcomeText}>Bienvenue à NFH! </Text>
            <Text style={styles.descriptionText}>
              La solution de sécurité incendie pour votre maison. Faites confiance à NFH pour votre tranquillité d'esprit face aux risques d'incendie.
            </Text>
        </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.buttonText}>Continuez</Text>
            </Pressable>
          </View>
      

      </ImageBackground>
    </View>
   
  
  );
}

function useStyles() {
  

  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  console.log('tthis is height', height)
  return StyleSheet.create({
  

  container: {
    flex: 1,
    // marginTop: getResponsive(300, 'height'),
    // maxHeight: height,
    // overflow: 'visible'
    height: hp(100),
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    
  },
  backgroundImage: {
    width: wp(100),
    height: hp(100),
    resizeMode: 'cover',
    overflow: 'visible' // or 'stretch' or 'contain'
  },
  section1: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    marginTop: hp(18),
    flex:3,
    gap: hp(2)
    
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(3)
  },
 
  logoText: {
    color: '#2F61E2',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '500',
    fontSize: hp(5), 
  },
  subtitle : {
    fontFamily: 'Poppins-Medium',
    color: '#CC1010',
    textAlign: 'center',
    fontSize: hp(1.8),
  },

 
  descriptionContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    // marginTop: hp(12),
    flex: 2,
    // backgroundColor: 'dodgerblue',
    gap: 15
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium', 
    fontSize: hp(3), 
    color: "#2F61E2"
  },
  descriptionText: {
    width: getResponsive(266, 'width'),
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.8),
    color: "rgba(52, 50, 50, 1)"
  },
  buttonContainer: {
    alignItems: 'center',
     justifyContent: 'center',
    //  marginTop: hp(2)
    flex: 1,
    // backgroundColor: 'pink'
  },
  button: {
    backgroundColor: '#2F61E2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: getResponsive(254, 'width'),
    
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(2),
    textAlign: 'center'
  },

})
};


