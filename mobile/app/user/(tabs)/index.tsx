import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getAllCounselors } from "@/redux/actions/userActions";
import { CounselorSkeletonGroup } from "@/components/skeletons/CounselorSkeleton";

const Index = () => {
    const router = useRouter()
    const {user, counselors, fetching} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCounselors())
    },[])

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="w-[90%]">
                <View className="w-full">
                    <View className="w-full mt-8">
                        <Text className="text-3xl font-ubuntuB">Hi, <Text className="text-custom-yellow">{user && user!.fullName.split(" ")[0]}</Text> 👋</Text>
                        <Text className="font-ubuntuB text-2xl mt-4">What would you like to do today?</Text>
                    </View>
                    <View className="w-full mt-12">
                        <Text className="text-lg font-ubuntuM">Join a support group</Text>
                        <Text className="text-custom-textGrey font-ubuntu mt-2 text-base">Connect with others who understand you.</Text>
                        <Button text='View support groups' onPress={() => router.push('/user/chat')} styles="mt-6 w-[55%] h-10" textStyles="text-sm"/>
                    </View>
                    <View className="w-full mt-12">
                        <Text className="text-lg font-ubuntuM">Book a session with one of our mental health professionals</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-8">
                            {!fetching && counselors.slice(0,4).map(counselor => (
                                <View className="w-40 mr-3 rounded-md bg-[#f2f2f2] items-center justify-center py-4" key={counselor.id}>
                                    <View className="rounded-full overflow-hidden w-20 h-20">
                                        <Image source={{ uri: counselor.profileImg }} className="w-full h-full object-cover"/>
                                    </View>
                                    <Text className="font-ubuntuM text-base mt-2">{counselor.fullName}</Text>
                                    <Button text="Book Session" onPress={() => router.push(`/user/book/${counselor.id}`)} styles="mt-2 w-28 h-8" textStyles="text-sm"/>
                                </View>
                            ))}
                            {fetching && <CounselorSkeletonGroup number={3}/>}
                        </ScrollView>
                    </View>
                    <View className="w-full mt-12 mb-8">
                        <Text className="text-lg font-ubuntuM">Write a journal entry</Text>
                        <Text className="text-custom-textGrey font-ubuntu mt-2 text-base">Take a moment to jot down your feelings, reflect on your thoughts, emotions, and experiences.</Text>
                        <Button text='Go to journal' onPress={() => router.push('/user/journal')} styles="mt-6 w-[50%] h-10" textStyles="text-sm"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
 
export default Index;