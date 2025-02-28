import { DefaultTimeSlotSkeletonGroup } from "@/components/skeletons/DefaultTimeSlotSkeleton";
import { getDefaultTimeSlots } from "@/redux/actions/timeSlotActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";


const Index = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {defaultTimeSlots, fetching} = useAppSelector(state => state.timeSlot)

    useEffect(() => {
        dispatch(getDefaultTimeSlots())
    },[])

    return (
        <View className="flex-1 items-center bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
                <View className="w-full bg-white items-center">
                    <View className="w-[90%] py-8">
                        {!fetching && defaultTimeSlots.length === 0 && <Text className="mb-8 text-custom-textGrey font-ubuntuM text-base">You do not have any default time slots</Text>}
                        {defaultTimeSlots.length !== 0 && <Text className="mb-8 text-custom-textGrey font-ubuntuM text-base">These time slots will be automatically created by the system everyday.</Text>}
                        {!fetching && defaultTimeSlots.map((slot) => (
                            <Pressable 
                                className="w-full justify-center rounded-md bg-[#f2f2f2] p-4 mb-4 border-l-[5px] border-custom-yellow" 
                                onPress={() => router.push(`/counselor/settings/defaultTimeSlot/${slot.id}`)}
                                key={slot.id}
                            >
                                <Text className="font-ubuntuM text-base">{slot.from} to {slot.to}</Text>
                            </Pressable>
                        ))}    
                        {fetching && <DefaultTimeSlotSkeletonGroup number={3}/>}                   
                    </View>
                    <View className="w-full border-t-[5px] border-[#f2f2f2] items-center pt-4">
                        <Text className="font-ubuntuM text-lg w-[90%] mb-4">Additional options</Text>
                        <Pressable className="w-[90%] flex-row items-center justify-between py-2" onPress={() => router.push('/counselor/settings/defaultTimeSlot/createDefaultTimeSlot')}>
                            <Text className="font-ubuntu text-base">Add default time slot</Text>
                            <AntDesign name="right" size={18} color="#91969E" />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
 
export default Index;