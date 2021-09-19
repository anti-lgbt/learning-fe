enum UserState {
  Loading = 'loading',
  Active = 'active',
  Deleted = 'deleted',
}

enum UserRole {
  Admin = 'admin',
  Member = 'member',
}

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
