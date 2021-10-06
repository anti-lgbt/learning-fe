import { notification } from 'ant-design-vue';
import ApiClient from '@/library/ApiClient';
import Store from './store';
import GettersSetters from './getters_setters';
import router from '@/router';

class UserController extends GettersSetters {
  store = Store;

  async get_logged() {
    this.auth_loading();
    try {
      const { data } = await new ApiClient().get('resource/users/me');

      this.auth_success(data.full_name, data.email, data.state, data.role);
    } catch (error) {
      this.auth_error();
      if (router.currentRoute.path !== '/') {
        router.push('/');
      }
      return error;
    }
  }

  async login(email: string, password: string) {
    this.auth_loading();
    try {
      const { data } = await new ApiClient().post('identity/login', { email, password });

      this.auth_success(data.full_name, data.email, data.state, data.role);
      notification.success({
        message: 'Đăng nhập thành công',
        description: '',
      });
      if (router.currentRoute.path !== '/') {
        router.push('/');
      }
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  async register(full_name: string, email: string, password: string) {
    this.auth_loading();
    try {
      const { data } = await new ApiClient().post('identity/register', { full_name, email, password });

      this.auth_success(data.full_name, data.email, data.state, data.role);
      notification.success({
        message: 'Đăng ký thành công',
        description: '',
      });
      if (router.currentRoute.path !== '/') {
        router.push('/');
      }
    } catch (error) {
      this.auth_error();
      return error;
    }
  }

  async forgot_password(email: string) {
    try {
      await new ApiClient().post('identity/forgot_password', { email });
      notification.success({
        message: 'Mật khẩu mới đã được gửi về email',
        description: '',
      });
      router.push('/');
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      await new ApiClient().post('identity/logout');
      notification.success({
        message: 'Đăng xuất thành công',
        description: '',
      });
    } catch (error) {
      return error;
    } finally {
      this.auth_error();
    }
  }

  async change_password(old_password: string, new_password: string, confirm_password: string, callback: () => void) {
    try {
      await new ApiClient().put('resource/users/password', { old_password, new_password, confirm_password });
      notification.success({
        message: 'Đổi mật khẩu thành công',
        description: '',
      });
      callback();
    } catch (error) {
      return error;
    }
  }

  auth_loading() {
    (this.state as string) = 'loading';
  }

  auth_error() {
    this.full_name = null;
    this.email = null;
    this.state = null;
    this.role = null;
    if (router.currentRoute.path !== '/') {
      router.push('/');
    }
  }

  auth_success(full_name: string, email: string, state: UserState, role: UserRole) {
    this.full_name = full_name;
    this.email = email;
    this.state = state;
    this.role = role;
  }
}

export default new UserController();
