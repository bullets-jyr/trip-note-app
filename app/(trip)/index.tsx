import {SafeAreaView} from "react-native-safe-area-context";
import {useDeferredValue, useMemo, useState, useTransition} from "react";
import {FlatList, TextInput, Text} from "react-native";

function slowFilter(text: string) {
    const result: string[] = [];
    for (let i = 0; i < 1500; i++) {
        result.push(`${text} - item ${i}`);
    }
    return result;
}

const MyTripList = () => {
    const [textValue, setInputValue] = useState("");
    // const [items, setItems] = useState<string[]>([]);
    // const [isPending, startTransition] = useTransition();
    const deferredText = useDeferredValue(textValue);

    // const handleChange = (value: string) => {
    //     setInputValue(value);
    //     startTransition(() => {
    //         setItems(slowFilter(value));
    //     });
    // };

    const items = useMemo(() => {
        if (!deferredText) return [];
        return slowFilter(deferredText);
    }, [deferredText])

    const isPending = textValue !== deferredText;

    return (
        <SafeAreaView>
            <TextInput
                value={textValue}
                onChangeText={setInputValue}
                style={{borderWidth: 1, height: 50}}
            />
            {isPending && (
                <Text style={{color: "grey"}}>리스트 업데이트 중...</Text>
            )}
            <FlatList
                data={items}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <Text style={{opacity: isPending ? 0.5 : 1}}>{item}</Text>
                )}
            />
        </SafeAreaView>
    );
};

export default MyTripList;