import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminMixin extends Vue {
  onSave?(key: number): Promise<any>;

  loading = false;
  data: any[] = [];
  cacheData: any[] = [];
  editingKey = -1;

  handleChange(value: string, key: number, column: string) {
    const index = this.data.findIndex((item) => key === item.key);
    if (index >= 0) {
      this.$set(this.data[index], column, value);
    }
  }

  edit(key: number) {
    const index = this.data.findIndex((item) => key === item.key);
    this.editingKey = key;
    if (index >= 0) {
      this.$set(this.data[index], 'editable', true);
    }
  }

  cancel(key: number) {
    const index = this.data.findIndex((item) => key === item.key);
    this.editingKey = -1;
    if (index >= 0) {
      Object.assign(this.data[index], this.cacheData.find((item) => key === item.key));
      this.$delete(this.data[index], 'editable');
    }
  }

  async save(key: number) {
    if (this.onSave) await this.onSave(key);
    this.editingKey = -1;
    const index = this.data.findIndex((item) => key === item.key);
    if (index >= 0) {
      this.$delete(this.data[index], 'editable');
    }
  }
}
