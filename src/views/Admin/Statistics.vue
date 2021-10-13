<template>
  <div class="statistics">
    <div :id="element_id_pie"></div>
    <div :id="element_id_line"></div>
  </div>
</template>

<script lang="ts">
import Highcharts from 'highcharts';
import { v4 } from 'uuid';
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import ApiClient from '@/library/ApiClient';

@Component({})
export default class AdminStatistics extends Vue {
  element_id_pie = v4();
  element_id_line = v4();
  products_statistics: any[] = [];
  comment_statistics: any[] = [];
  types: any[] = [];

  async mounted() {
    await Promise.all([
      this.get_product_types(),
      this.get_product_statistics(),
      this.get_comment_statistics(),
    ]);

    Highcharts.setOptions({
      lang: {
        decimalPoint: ',',
        thousandsSep: '.',
        months: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
        weekdays: [
          'Sonntag',
          'Montag',
          'Dienstag',
          'Mittwoch',
          'Donnerstag',
          'Freitag',
          'Samstag',
        ],
        shortWeekdays: [
          'Thứ 2',
          'Thứ 3',
          'Thứ 4',
          'Thứ 5',
          'Thứ 6',
          'Thứ 7',
          'Chủ nhật',
        ],
        shortMonths: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
      },
    });

    (Highcharts as any).chart(this.element_id_pie, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Thống kê sản phẩm theo danh mục',
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d',
        shared: true,
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: this.products_statistics.map((s) => {
            const product_type = this.types.find(
              (t) => t.id === s.product_type_id,
            );

            return {
              name: product_type.name,
              y: s.count,
            };
          }),
        },
      ],
    });

    (Highcharts as any).chart(this.element_id_line, {
      title: {
        text: 'Thống kê Bình luận',
      },
      yAxis: {
        title: {
          text: 'Number of Comments',
        },
      },
      xAxis: {
        type: 'datetime',
      },
      series: [
        {
          name: 'Comments',
          data: this.comment_statistics,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    });
  }

  async get_product_types() {
    try {
      const { data } = await new ApiClient().get('admin/products/types');
      this.types = data;
    } catch (error) {
      return error;
    }
  }

  async get_product_statistics() {
    try {
      const { data } = await new ApiClient().get('admin/statistic/products');
      this.products_statistics = data;
    } catch (error) {
      return error;
    }
  }

  async get_comment_statistics() {
    try {
      const { data } = await new ApiClient().get('admin/statistic/comments');
      this.comment_statistics = data.map((item: any) => {
        return { x: new Date(item.release_date).getTime(), y: item.count };
      });
    } catch (error) {
      return error;
    }
  }
}
</script>
