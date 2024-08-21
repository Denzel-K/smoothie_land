import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link } from 'expo-router';
import {router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';

//Components
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

//Context/provider
import { useGlobalContext } from '@/context/GlobalProvider';

//Server func's
import {createUser} from '@/lib/appwrite'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.push("/home");
    } 
    catch (error) {
      Alert.alert("Error", error.message);
    } 
    finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl font-semibold text-btnAdd mt-10 font-psemibold">
            Create an account
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Signup"
            handlePress={handleSubmit}
            containerStyles="mt-10"
            isLoading={submitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign_in"
              className="text-base font-psemibold text-primary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  )
}

export default SignUp