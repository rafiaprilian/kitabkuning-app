import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

// Import semua screen
import KitabListScreen from './screens/KitabListScreen';
import PromoScreen from './screens/PromoScreen';
import YoutubeScreen from './screens/YoutubeScreen';
import DetailKitabScreen from './screens/DetailKitabScreen';
import TokoKitabScreen from './screens/TokoKitabScreen';
import IsiKontenKitabScreen from './screens/IsiKontenKitabScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="KitabList">
          {/* Daftar Kitab */}
          <Drawer.Screen 
            name="KitabList" 
            component={KitabListScreen} 
            options={{ title: 'Daftar Kitab' }}
          />
          {/* Promo */}
          <Drawer.Screen 
            name="Promo" 
            component={PromoScreen} 
            options={{ title: 'Promo' }} 
          />
          {/* Video Youtube */}
          <Drawer.Screen 
            name="Youtube" 
            component={YoutubeScreen} 
            options={{ title: 'Video Youtube' }} 
          />
          {/* Detail Kitab */}
          <Drawer.Screen 
            name="DetailKitab" 
            component={DetailKitabScreen} 
            options={{ title: 'Detail Kitab' }} 
          />
          {/* Toko Kitab */}
          <Drawer.Screen
            name="TokoKitab"
            component={TokoKitabScreen}
            options={{ title: 'Toko Kitab' }}
          />
          {/* Isi Konten Kitab */}
          <Drawer.Screen
            name="IsiKontenKitab"
            component={IsiKontenKitabScreen}
            options={{ title: 'Isi Konten Kitab' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
