import { Vue, Component } from 'vue-property-decorator';
import { UserController } from '@/controllers';

@Component
export class AuthMixin extends Vue {
  form = null;
  full_name = '';
  email = '';
  password = '';

  old_password = '';
  new_password = '';
  confirm_password = '';

  get password_error() {
    if (this.password.length === 0) return;

    return !this.validate_password(this.password) ? 'Mật khẩu cần ít nhất 8 ký tự trở lên' : null;
  }

  get old_password_error() {
    if (this.old_password.length === 0) return;

    return !this.validate_password(this.old_password) ? 'Mật khẩu cần ít nhất 8 ký tự trở lên' : null;
  }

  get new_password_error() {
    if (this.new_password.length === 0) return;
    if (this.new_password === this.old_password) return 'Mật khẩu mới phải khác mật khẩu cũ';

    return !this.validate_password(this.new_password) ? 'Mật khẩu cần ít nhất 8 ký tự trở lên' : null;
  }

  get confirm_password_error() {
    if (this.confirm_password.length === 0) return;

    return this.new_password !== this.confirm_password ? 'Mật khẩu không khớp' : null;
  }

  validate_password(password: string) {
    return password.length >= 8;
  }

  login() {
    UserController.login(this.email, this.password);
  }

  register() {
    UserController.register(this.full_name, this.email, this.password);
  }

  change_password() {
    if (this.old_password_error) return;
    if (this.new_password_error) return;
    if (this.confirm_password_error) return;

    UserController.change_password(this.old_password, this.new_password, this.confirm_password, () => {
      this.old_password = '';
      this.new_password = '';
      this.confirm_password = '';
    });
  }
}
