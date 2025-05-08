// WAJIB di baris paling atas sebelum yang lain
import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import App from './App';

// Pastikan App tetap didaftarkan ke root
registerRootComponent(App);
