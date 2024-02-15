import React from 'react';
import { useEffect, useCallback, useState, useRef } from 'react';
import { LogBox } from 'react-native';
import registerNNPushToken from 'native-notify';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Pressable, Animated
} from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';
// import AppLoading from 'expo-app-loading';
import PoppinsLight from '../../assets/fonts/Poppins-Light.ttf';
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.ttf';
import PoppinsSemiBold from '../../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsMedium from '../../assets/fonts/Poppins-Medium.ttf';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
LogBox.ignoreLogs(['new NativeEventEmitter']); 


SplashScreen.preventAutoHideAsync();

export default function DashBoardScreen() {
  
   registerNNPushToken(19669, 'jFGfEKcN2MgkdaT9v0xlgq');
  const styles = useStyles();
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [notificationCount, setNotificationCount] = useState();
  const [serverState, setServerState] = React.useState('Loading...');
  const [stateOfSystem, setStateOfSystem] = useState('');
  const [serverMessages, setServerMessages] = React.useState([]);


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

  const handleNotificationClick = () => {
    setNotificationClicked(!notificationClicked);
    if (notificationClicked) {
      setNotificationCount(0);
    }
    console.log('i have been pressed');
  };

  // const notificationMessages = [
  //   'Presence de fumées',
  //   'Temperature elevée',
  //   'Alarmes déclenchées',
  //   'Presence de Feu',
  // ];

  const serverMessage = {
    active: 1,
    smokeDetected: false,
    fireDetected: false,
    temperature: 30,
  };

  const systemState00 = serverMessage.active;
  const smoke = serverMessage.smokeDetected;
  const fire = serverMessage.fireDetected;
  const temperature = serverMessage.temperature;

  let notificationMessages = [];

  switch (systemState00) {
    case 0:
      notificationMessages = [];
      length = notificationMessages.length;

      break;
    case 1:
      notificationMessages = [
        'Presence de fumées',
        'Premiere alarme declenchée',
      ];
      length = notificationMessages.length;

      break;
    case 2:
      notificationMessages = [
        'Presence de fumées',
        'Temperature elevée',
        'Alarmes déclenchées',
        'Presence de Feu',
      ];
      length = notificationMessages.length;

      break;
  }
  // const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}> 
    
    <ScrollView 
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.contentContainer}
      onLayout={onLayoutRootView}
    
    >
    
        <View style={styles.headerBarContainer}>
          <Text style={styles.headerText}>Dashboard</Text>

          <Pressable onPress={handleNotificationClick}>
            <Image
              source={require('../../assets/images/notification_logo.png')}
            />
          </Pressable>

          {notificationCount !== 0 && length !== 0 ? (
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationText}>{length}</Text>
            </View>
          ) : null}
        </View>

      {/* // code to be rendered when the notification logo is clicked */}

      {notificationClicked && (
        <View style={{ gap: 24 }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: hp(2.5) }}>
            Notifications{' '}
          </Text>

          {notificationMessages.map((message, index) => (
            <View key={index} style={styles.notificationPage}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp(1.6),
                  paddingBottom: 6,
                }}
              >
                {message}
              </Text>
              <Pressable>
                <Image source={require('../../assets/images/redcross.png')} />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {/* // code to be rendered when the notification logo isn't clicked */}

      {!notificationClicked && (
        <View style={{ gap: 30 }}>
          <View style={styles.allDashboards}>
            <View>
              <View style={styles.titleContainer}>
                <Image
                  source={require('../../assets/images/system_logo.png')}
                />
                <Text style={styles.allMainTexts}>L'etat du Système</Text>
              </View>

              {(() => {
                switch (systemState00) {
                  case 0:
                    return (
                      <View style={styles.stateContainer}>
                        <Image
                          source={require('../../assets/images/checkbox.png')}
                        />
                        <Text style={styles.stateText}>Etat Normal</Text>
                      </View>
                    );
                  case 1:
                    return (
                      <View style={styles.stateContainer}>
                        <Image
                          source={require('../../assets/images/checkbox.png')}
                        />
                        <Text style={styles.stateText}>Etat Risque</Text>
                      </View>
                    );
                  case 2:
                    return (
                      <View style={styles.stateContainer}>
                        <Image
                          source={require('../../assets/images/checkbox.png')}
                        />
                        <Text style={styles.stateText}>Etat Incendie</Text>
                      </View>
                    );
                  default:
                    return <Text>Error</Text>; // Handle any other cases or render nothing
                }
              })()}
            </View>
            <View>
              {(() => {
                switch (systemState00) {
                  case 0:
                    return (
                      <Image
                        source={require('../../assets/images/green_tick.png')}
                      />
                    );
                  case 1:
                    return (
                      <Image
                        source={require('../../assets/images/orange_tick.png')}
                      />
                    );
                  case 2:
                    return (
                      <Image
                        source={require('../../assets/images/incendie_icon.png')}
                      />
                    );
                }
              })()}
            </View>
          </View>

          <View style={styles.allDashboards}>
            <View>
              <View style={styles.titleContainer}>
                <Image source={require('../../assets/images/fumee_logo.png')} />
                <Text style={styles.allMainTexts}>Presence de Fumée</Text>
              </View>

              <View style={styles.stateContainer}>
                <Image source={require('../../assets/images/checkbox.png')} />
                {(() => {
                  switch (systemState00) {
                    case 0:
                      return (
                        <Text style={styles.stateText}> Etat Normal </Text>
                      );
                    case 1:
                      return (
                        <Text style={styles.stateText}> Etat Risque </Text>
                      );
                    case 2:
                      return (
                        <Text style={styles.stateText}> Etat Incendie </Text>
                      );
                  }
                })()}
              </View>
            </View>

            <View>
              {(() => {
                switch (systemState00) {
                  case 0:
                    return (
                      <Image
                        source={require('../../assets/images/green_tick.png')}
                      />
                    );
                  case 1:
                    return (
                      <Image
                        source={require('../../assets/images/orange_tick.png')}
                      />
                    );
                  case 2:
                    return (
                      <Image
                        source={require('../../assets/images/red_tick.png')}
                      />
                    );
                }
              })()}
            </View>
          </View>

          <View style={styles.allDashboards}>
            <View>
              <View style={styles.titleContainer}>
                <Image
                  source={require('../../assets/images/temperature_logo.png')}
                />
                <Text style={styles.allMainTexts}>Niveau de Temperature</Text>
              </View>

              <View style={styles.stateContainer}>
                <Image source={require('../../assets/images/checkbox.png')} />
                {(() => {
                  switch (systemState00) {
                    case 0:
                      return (
                        <Text style={styles.stateText}> Etat Normal </Text>
                      );
                    case 1:
                      return (
                        <Text style={styles.stateText}> Etat Risque </Text>
                      );
                    case 2:
                      return (
                        <Text style={styles.stateText}> Etat Incendie </Text>
                      );
                  }
                })()}
              </View>
            </View>

            {(() => {
              switch (systemState00) {
                case 0:
                  return (
                    <View style={[styles.circle, styles.normal]}>
                      <Text style={styles.circleText}>{temperature}</Text>
                    </View>
                  );
                case 1:
                  return (
                    <View style={[styles.circle, styles.risque]}>
                      <Text style={styles.circleText}>{temperature}</Text>
                    </View>
                  );
                case 2:
                  return (
                    <View style={[styles.circle, styles.incendie]}>
                      <Text style={[styles.circleText, styles.incendie]}>
                        {temperature}
                      </Text>
                    </View>
                  );
                default:
                  return <Text>Error</Text>; // Handle any other cases or render nothing
              }
            })()}
          </View>

          <View style={styles.allDashboards}>
            <View>
              <View style={styles.titleContainer}>
                <Image source={require('../../assets/images/fire_logo.png')} />
                <Text style={styles.allMainTexts}>Presence de Feu</Text>
              </View>

              <View style={styles.stateContainer}>
                <Image source={require('../../assets/images/checkbox.png')} />
                {(() => {
                  switch (systemState00) {
                    case 0:
                      return (
                        <Text style={styles.stateText}> Etat Normal </Text>
                      );
                    case 1:
                      return (
                        <Text style={styles.stateText}> Etat Normal </Text>
                      );
                    case 2:
                      return (
                        <Text style={styles.stateText}> Etat Incendie </Text>
                      );
                  }
                })()}
              </View>
            </View>

            <View>
              {(() => {
                switch (systemState00) {
                  case 0:
                    return (
                      <Image
                        source={require('../../assets/images/red_cross_circle.png')}
                      />
                    );
                  case 1:
                    return (
                      <Image
                        source={require('../../assets/images/red_cross_circle.png')}
                      />
                    );
                  case 2:
                    return (
                      <Image
                        source={require('../../assets/images/red_tick.png')}
                      />
                    );
                }
              })()}
            </View>
          </View>

          <View style={styles.allDashboards}>
            <View>
              <View style={styles.titleContainer}>
                <Image
                  source={require('../../assets/images/alarme_logo.png')}
                />
                <Text style={styles.allMainTexts}>Alarmes déclenchées</Text>
              </View>

              <View style={styles.stateContainer}>
                <Image source={require('../../assets/images/checkbox.png')} />
                {(() => {
                  switch (systemState00) {
                    case 0:
                      return (
                        <Text style={styles.stateText}> Etat Normal </Text>
                      );
                    case 1:
                      return (
                        <Text style={styles.stateText}> Etat Risque </Text>
                      );
                    case 2:
                      return (
                        <Text style={styles.stateText}> Etat Incendie </Text>
                      );
                  }
                })()}
              </View>
            </View>

            <View>
              {(() => {
                switch (systemState00) {
                  case 0:
                    return (
                      <Image
                        source={require('../../assets/images/green_tick.png')}
                      />
                    );
                  case 1:
                    return (
                      <Image
                        source={require('../../assets/images/orange_tick.png')}
                      />
                    );
                  case 2:
                    return (
                      <Image
                        source={require('../../assets/images/red_tick.png')}
                      />
                    );
                }
              })()}
            </View>
          </View>
          <View style={{marginTop:  30}}>

          </View>
        </View>
      )}
      
    </ScrollView>
    </View>
  );
}

function useStyles() {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      
      backgroundColor: 'white'
    },
    contentContainer: {
      marginRight: 20,
      marginLeft: 20,
    },
    headerBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 35,
      paddingTop: 10,
      
      
      
    },
    headerText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hp(3),
      color: '#2F61E2',
    },
    notificationContainer: {
      position: 'absolute',
      top: 2,
      right: 0,
      height: 20,
      width: 20,
      borderRadius: 50,
      backgroundColor: '#CC1010',
      justifyContent: 'center',
      alignItems: 'center',
    },

    notificationText: {
      color: 'white',
      fontFamily: 'Poppins-Medium',
      textAlign: 'center',
      fontSize: hp(1.5),
    },
    allDashboards: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#D6D7D7',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    allMainTexts: {
      fontFamily: 'Poppins-Medium',
      fontSize: hp(2),
      color: 'black',
      width: wp(30),
    },
    stateContainer: {
      flexDirection: 'row',
      gap: 3,
      alignItems: 'center',
      marginTop: 10,
    },
    stateText: {
      fontFamily: 'Poppins-Regular',
      fontSize: hp(1.6),
    },
    tempText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hp(2),

    },
    circle: {
      borderRadius: 50,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    normal: {
      backgroundColor: '#37B871',
    },
    risque: {
      backgroundColor: '#E18B0A',
    },
    incendie: {
      backgroundColor: '#CC1010',
      color: 'white',
    },
    circleText: {
      color: 'white',
      fontFamily: 'Poppins-Medium',
      fontSize: hp(3),
    },
    notificationPage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#D6D7D7',
      borderBottomWidth: 1,
    },
  });
}
