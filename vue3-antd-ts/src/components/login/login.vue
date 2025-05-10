<script lang="ts" setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Form, FormItem, Input, Button, InputPassword, Checkbox } from 'ant-design-vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="container">
    <h2 class="container_header">Ant Design Vue + Vue3 + Type Script</h2>

    <div class="container_main">
      <Form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
        <FormItem label="账号密码登录"></FormItem>
        <FormItem
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]">
          <Input v-model:value="formState.username" size="large" placeholder="username：admin ">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </Input>
        </FormItem>

        <FormItem
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <InputPassword
            v-model:value="formState.password"
            size="large"
            placeholder="password：123456">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </InputPassword>
        </FormItem>
        <FormItem>
          <FormItem name="remember" no-style>
            <Checkbox v-model:checked="formState.remember">Remember me</Checkbox>
          </FormItem>
          <a href="#" class="login-form-forgot">Forgot password</a>
        </FormItem>

        <Button size="large" :block="true" type="primary" html-type="submit">Submit</Button>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f0f2f5 url('../../assets/background.ebcb9160.svg') no-repeat 50%;
  background-size: 100%;
  position: relative;
  &_header {
    height: 20vh;
    line-height: 20vh;
    font-size: 24px;
    font-weight: bolder;
    color: #121111;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  &_main {
    min-width: 260px;
    width: 368px;
    height: 480px;
    margin: 0 auto;
    .login-form-forgot {
      float: right;
    }
  }
}
</style>
