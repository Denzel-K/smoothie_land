import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

//Components
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

//server func's
import { getCurrentUser, signIn } from '@/lib/appwrite';

//context/provider
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
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
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          <Text className="text-2xl font-semibold text-btnAdd font-psemibold">
            Login to your account
          </Text>

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
            title="Login"
            handlePress={handleSubmit}
            containerStyles="mt-10"
            isLoading={submitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign_up"
              className="text-base font-psemibold text-primary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="black" style="light"/>
    </SafeAreaView>
  )
}

export default SignIn