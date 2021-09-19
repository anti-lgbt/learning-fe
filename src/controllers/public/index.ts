import ApiClient from '@/library/ApiClient';

class Controller {
  get_product_types() {
    return new ApiClient().get('public/products/types');
  }

  get_products(payload: any) {
    return new ApiClient().get('public/products', payload);
  }

  get_product(id: number) {
    return new ApiClient().get(`public/products/${id}`);
  }
}

export default new Controller();
