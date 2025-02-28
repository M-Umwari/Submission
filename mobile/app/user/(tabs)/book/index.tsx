import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Image } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";


const Index = () => {
    const router = useRouter()
    const {counselors} = useAppSelector(state => state.user)
    
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="w-[90%]">
                <View className="w-full my-8">
                    <Text className="font-ubuntu text-base">Book some one on one time with our highly qualified professionals</Text>
                    <View className="w-full my-12">
                        {counselors.map(counselor => (
                            <View className="w-full rounded-lg bg-[#f2f2f2] items-center justify-center py-6 mb-8" key={counselor.id}>
                                <View className="rounded-full overflow-hidden w-32 h-32">
                                    <Image source={{ uri: counselor.profileImg}} className="w-full h-full object-cover"/>
                                </View>
                                <Text className="font-ubuntuM text-lg mt-4">{counselor.fullName}</Text>
                                <Text className="font-ubuntu text-base mt-2 text-custom-textGrey">{counselor?.email}</Text>
                                <Button text="Book Session" onPress={() => router.push(`/user/book/${counselor.id}`)} styles="mt-4 w-[90%]"/>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>    
    );
}
 
export default Index;