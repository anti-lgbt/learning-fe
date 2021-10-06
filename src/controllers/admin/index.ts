import ApiClient from '@/library/ApiClient';

class AdminController {
  get_product_types() {
    return new ApiClient().get('admin/products/types');
  }

  create_product_type(name: string) {
    return new ApiClient().post('admin/products/types', { name });
  }

  update_product_type(id: number, name: string) {
    return new ApiClient().put('admin/products/types', { id, name });
  }

  delete_product_type(id: number) {
    return new ApiClient().delete(`admin/products/types/${id}`);
  }

  get_products(payload?: any) {
    return new ApiClient().get('admin/products', payload);
  }

  create_product(payload?: any) {
    return new ApiClient().post('admin/products', payload);
  }

  update_product(id: number, product_type_id: number, name: string, description: string, price: string, discount_percentage: string, special: boolean, stock_left: number) {
    return new ApiClient().put('admin/products', {
      id,
      product_type_id,
      name,
      description,
      price,
      discount_percentage,
      special,
      stock_left,
    });
  }

  delete_product(id: number) {
    return new ApiClient().delete(`admin/products/${id}`);
  }

  get_users(payload?: any) {
    return new ApiClient().get('admin/users', payload);
  }

  create_user(payload: any) {
    return new ApiClient().post('admin/users', payload);
  }

  update_user(id: number, full_name: string, role: string, state: string, password?: string) {
    return new ApiClient().put('admin/users', {
      id,
      password,
      full_name,
      role,
      state,
    });
  }

  delete_user(id: number) {
    return new ApiClient().delete(`admin/users/${id}`);
  }
}

export default new AdminController();
