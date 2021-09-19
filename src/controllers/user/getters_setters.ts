import Store from './store';

export default class GettersSetters {
  store!: typeof Store;

  get full_name() {
    return this.store.full_name;
  }

  set full_name(full_name: string | null) {
    this.store.full_name = full_name;
  }

  get email() {
    return this.store.email;
  }

  set email(email: string | null) {
    this.store.email = email;
  }

  get state() {
    return this.store.state;
  }

  set state(state: UserState | null) {
    this.store.state = state;
  }

  get role() {
    return this.store.role;
  }

  set role(role: UserRole | null) {
    this.store.role = role;
  }
}
