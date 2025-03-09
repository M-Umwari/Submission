import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getNotes } from "@/redux/actions/noteActions";
import { BasicSkeletonGroup } from "@/components/skeletons/BasicSkeleton";

const Index = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {notes, fetching} = useAppSelector(state => state.note)

    useEffect(() => {
        dispatch(getNotes())
    },[])

    return (
        <View className="flex-1 items-center bg-white">
            <Pressable className="items-center justify-center absolute z-10 w-12 h-12 bottom-10 right-6 rounded-full bg-custom-yellow" onPress={() => router.push('/user/journal/createEntry')}>
                <Entypo name="plus" size={30} color="white" />
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false} className="w-[90%]">
                <View className="w-full my-8">
                    {!fetching && notes.map((note) => (
                        <Pressable className="p-4 border border-custom-borderGrey w-full rounded-xl mb-4" 
                            onPress={() => router.push(`/user/journal/${note.id}`)}
                            key={note.id}
                            >
                            <Text className="text-base font-ubuntu">
                                {note.note.slice(0,151)} {note.note.length > 150 && <Text className="font-ubuntuM ml-2 text-custom-yellow">...see more</Text>}
                            </Text>
                            <View className="flex-row items-center justify-between mt-4">
                                <Text className="text-custom-textGrey font-ubuntu">{note.createdAt}</Text>
                                <Feather name="chevron-right" size={18} color="#CCCCCC" />
                            </View>  
                        </Pressable>
                    ))}
                    {fetching && <BasicSkeletonGroup number={5}/>}
                    {!fetching && notes.length === 0 && <Text className="text-custom-textGrey font-ubuntuM text-base text-center mt-8">You do not have any journal entries. Click on the plus icon to create a new entry.</Text>}
                </View>
            </ScrollView>
        </View>
    );
}
 
export default Index;