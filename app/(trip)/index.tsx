import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, Text, View} from "react-native";
import {Suspense} from "react";

const MyTripList = () => {
    let userInfo: { name: String; email: String } | null = null;
    let userPromise: Promise<void> | null = null;

    function fetchUser() {
        return new Promise(resolve => {
            setTimeout(() => {
                userInfo = {
                    name: 'bullets',
                    email: 'jy.ryu.jiyoung@gmail.com',
                };
                resolve();
            }, 2000)
        })
    }

    function useUser() {
        if (userInfo) {
            return userInfo;
        }
        if (!userPromise) {
            userPromise = fetchUser();
        }

        throw userPromise;
    }

    function UserProfile() {
        const user = useUser();
        return (
            <View>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
        )
    }

    return (
        <Suspense fallback={
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        }>
            <SafeAreaView>
                <UserProfile/>
            </SafeAreaView>
        </Suspense>
    );
};

export default MyTripList;