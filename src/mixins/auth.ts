import { Vue, Component } from 'vue-property-decorator';
import { UserController } from '@/controllers';

@Component
export class AuthMixin extends Vue {
  form = null;
  full_name = '';
  email = '';
  password = '';

  login() {
    UserController.login(this.email, this.password);
  }

  register() {
    UserController.register(this.full_name, this.email, this.password);
  }
}
