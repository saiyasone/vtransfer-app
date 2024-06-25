import { Formik, FormikHelpers } from 'formik';
import React, { Fragment, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';

interface FormValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const initialValues: FormValues = {
    username: 'demo',
    password: '1234',
  };
  const validate = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  // Auth context api;
  const { signIn } = useAuth();

  const handleVisible = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSubmitForm = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    await signIn?.(values.username, values.password);
  };

  // const PasswordIcon: React.FC<IconProps> = ({
  //   name = 'eye',
  //   onPress = () => {},
  // }) => {
  //   return <TextInput.Icon icon={name} onPress={onPress} />;
  // };

  return (
    <Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ padding: 20 }}>
          <Text>SignIn</Text>

          <Formik
            validationSchema={validate}
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ display: 'flex', gap: 20 }}>
                <TextInput
                  mode='outlined'
                  dense={true}
                  placeholder='Username'
                  error={Boolean(errors.username && touched.username)}
                  onChangeText={handleChange('username')}
                  value={values.username}
                />

                <TextInput
                  mode='outlined'
                  secureTextEntry={true}
                  dense={true}
                  placeholder='Password'
                  // right={
                  //   <TextInput.Icon
                  //     icon={visiblePassword ? 'eye-off' : 'eye'}
                  //     onPress={handleVisible}
                  //   />
                  // }
                  error={Boolean(errors.password && touched.password)}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />

                <Button mode='contained-tonal' onPress={() => handleSubmit()}>
                  Sign in
                </Button>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView>
    </Fragment>
  );
};

export default SignIn;
