import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'Home'>;

export {RootStackParamList, Props}