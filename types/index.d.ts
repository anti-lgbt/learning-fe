type UserStateActive = 'active';
type UserStatePending = 'pending';
type UserStateDeleted = 'deleted';

type UserState = UserStateActive | UserStatePending | UserStateDeleted;

type UserRoleAdmin = 'admin';
type UserRoleMember = 'member';

type UserRole = UserRoleAdmin | UserRoleMember;

interface Product {
  id: number;
  type: string;
  name: string;
  description?: string;
  price: string;
  discount_percentage?: string;
  stock_left: number;
  special: boolean;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: number;
  uid: string;
  email: string;
  password: string;
  full_name: string;
  avatar: string;
  state: UserState;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

interface Comment {
  id: number;
  user_id: number;
  product_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
