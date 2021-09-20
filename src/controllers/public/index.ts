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

  get_comments(product_id: number) {
    return new ApiClient().get(`public/products/${product_id}/comments`);
  }

  send_comment(product_id: number, content: string) {
    return new ApiClient().post(`resource/products/${product_id}/comments`, { content });
  }
}

export default new Controller();
