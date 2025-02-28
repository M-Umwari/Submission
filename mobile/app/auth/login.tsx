import Button from "@/components/Button";
import { getOwnProfile, login } from "@/redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginFormData } from "@/types/authFormData";
import { loginSchema } from "@/validationSchema/authSchema";
import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"


const Login = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {user, isLoggingIn, token} = useAppSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        onSubmit: (formData: loginFormData) => {
           dispatch(login(formData))
        },
        validationSchema: loginSchema
    })

    useEffect(() => {
        if(!token){
            return
        }

        dispatch(getOwnProfile())
    },[token])

    useEffect(() => {
        if(!user){
            return
        }

        if(user.role === 'user'){
            if(user.hasTakenQuestionnaire){
                router.replace('/user')
            }else{
                router.replace('/user/questionnaire')
            }
            
        }

        user.role === 'counselor' && router.replace('/counselor')
    },[user])

    return (
        <SafeAreaView className="flex-1 items-center justify-end bg-custom-yellow">
            <View className="w-full h-[70%] items-center bg-white rounded-t-3xl mt-6">
                <View className="w-[90%] items-start pt-6">
                    <Text className="font-semibold text-xl mb-8 font-ubuntuM">Log into your account</Text>
                    <View className="w-full mb-12">
                        <View className="w-full mb-4">
                            <Text className="mb-2 font-ubuntu">Email</Text>
                            <TextInput 
                                placeholder="Enter your email" 
                                className={`w-full h-12 px-2 border ${formik.touched.email && formik.errors.email?'border-red-500':'border-custom-borderGrey'} rounded-md font-ubuntu bg-[#f2f2f2]`}
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.email}</Text>}
                        </View>
                        <View className="w-full">
                            <Text className="mb-2 font-ubuntu">Password</Text>
                            <TextInput 
                                placeholder="Enter your password" 
                                className={`w-full h-12 px-2 border ${formik.touched.password && formik.errors.password?'border-red-500':'border-custom-borderGrey'} rounded-md font-ubuntu bg-[#f2f2f2]`}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                                secureTextEntry
                            />
                            {formik.touched.password && formik.errors.password && <Text className="text-red-500 text-xs font-ubuntu mt-2">{formik.errors.password}</Text>}
                        </View>
                    </View>
                    <View className="w-full">
                        <Button text={isLoggingIn ? 'Logging in...':'Login'} onPress={() => {formik.handleSubmit()}} styles={`${isLoggingIn ? 'opacity-80':'opacity-100'}`}/>
                        <View className="flex-row self-center mt-4">
                            <Text className="font-ubuntu text-base">Don't have an account?</Text>
                            <Link href='/auth/signup' className="text-custom-yellow ml-2 font-ubuntuM text-base">Signup</Link>
                        </View>  
                    </View>
                    {/* <Text className="text-custom-blue self-center font-ubuntu text-base">Forgot password?</Text> */}
                </View>
            </View>
            
        </SafeAreaView>
    );
}
 
export default Login;