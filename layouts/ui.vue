<!-- page info:  -->
<template>
  <v-app class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        permanent
        fixed
      >
        <v-list>
          <v-list-item class="px-1">
            <v-list-item-avatar class="mr-2">
              <v-img :src="system.logo.img" :alt="system.logo.name" />
            </v-list-item-avatar>
            <v-list-item-subtitle v-text="`${system.name} - 版本：${system.version}`" />
          </v-list-item>
          <v-list-item class="px-1">
            <v-list-item-subtitle v-text="`Author: ${system.author}`" />
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <a :href="system.company.url" target="blank"><v-list-item-title class="text-h8" v-text="system.company.name" /></a>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list
          nav
          dense
        >
          <v-list-item v-for="item in menuList" :key="item" link>
            <v-list-group :value="true" :prepend-icon="item.icon">
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </template>

              <v-list-item v-for="itm in item.list" :key="itm" link>
                <nuxt-link :to="itm.route">
                  <v-list-item-title v-text="itm.name" />
                </nuxt-link>
              </v-list-item>
            </v-list-group>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <nuxt ref="fdes-content" />
    </v-card>
  </v-app>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      title: '',
      system: {
        name: 'UI Library',
        author: 'peng tao',
        company: {
          name: '北京伏安基业电气技术有限公司',
          url: 'http://www.bjvag.com'
        },
        url_link: '#',
        version: 'v1.0.0',
        logo: {
          name: 'VAG',
          img: 'vag-logo.png'
        }
      },
      menuList: [
        {
          icon: 'mdi-file-tree',
          title: '介绍',
          list: [
            { name: '为什么做此UI库？', route: '/intro/why' },
            { name: '项目路线', route: '/intro/workline' }
          ]
        },
        {
          icon: 'mdi-view-quilt',
          title: 'UI组件',
          list: [
            { name: 'Alerts（提示框）', route: '/ui/alert' },
            { name: 'Application（应用程序）', route: '/ui/application' },
            { name: 'Aspect ratios长宽比', route: '/ui/aspect-ratios' },
            { name: 'Avatars（头像）', route: '/ui/' },
            { name: 'Badges（徽章）', route: '/ui/' },
            { name: 'Banners（横幅）', route: '/ui/' },
            { name: 'App bars（应用栏）', route: '/ui/' },
            { name: 'Toolbars（工具栏）', route: '/ui/' },
            { name: 'System bars（系统栏）', route: '/ui/' },
            { name: 'Bottom navigation（底部导航栏）', route: '/ui/' },
            { name: 'Bottom sheets（底部工作表）', route: '/ui/' },
            { name: 'Breadcrumbs（面包屑导航）', route: '/ui/' },
            { name: 'Buttons（按钮）', route: '/ui/' },
            { name: 'Buttons: Floating Action Button (按钮: 浮动动作按钮)', route: '/ui/' },
            { name: 'Calendars（日历）', route: '/ui/' },
            { name: 'Cards（卡片）', route: '/ui/' },
            { name: 'Carousels（轮播）', route: '/ui/' },
            { name: 'Chips（纸片）', route: '/ui/' },
            { name: 'Dialogs（对话框）', route: '/ui/' },
            { name: 'Dividers（分隔线）', route: '/ui/' },
            { name: 'Expansion panels（扩展面板）', route: '/ui/' },
            { name: 'Footers (页脚)', route: '/ui/' },
            { name: 'Autocompletes（自动补全）', route: '/ui/' },
            { name: 'Checkboxes（复选框）', route: '/ui/' },
            { name: 'Combobox（组合框）', route: '/ui/' },
            { name: 'File inputs（文件上传）', route: '/ui/' },
            { name: 'Forms（表单）', route: '/ui/forms' },
            { name: 'Inputs（输入框）', route: '/ui/inputs' },
            { name: 'Overflow buttons（溢出按钮）', route: '/ui/overflow-buttons' },
            { name: 'Radio buttons（单选按钮）', route: '/ui/radio-buttons' },
            { name: 'Range Sliders (范围滑块)', route: '/ui/range-sliders' },
            { name: 'Selects（下拉框）', route: '/ui/selects' },
            { name: 'Sliders（滑块）', route: '/ui/sliders' },
            { name: 'Switches (开关)', route: '/ui/switches' },
            { name: 'Textareas（多行文本框）', route: '/ui/textareas' },
            { name: 'Text fields（文本框）', route: '/ui/text-fields' },
            { name: 'Grid system（网格系统）', route: '/ui/grid-system' },
            { name: 'Button groups（按钮组）', route: '/ui/button-groups' },
            { name: 'Chip groups（纸片组）', route: '/ui/chip-groups' },
            { name: 'Item groups（项目组）', route: '/ui/item-groups' },
            { name: 'List item groups（列表项目组）', route: '/ui/list-item-groups' },
            { name: 'Slide groups（幻灯片组）', route: '/ui/slide-groups' },
            { name: 'Windows（窗口）', route: '/ui/windows' },
            { name: 'Hover（悬停）', route: '/ui/hover' },
            { name: 'Icons（图标）', route: '/ui/icons' },
            { name: 'Images（图像）', route: '/ui/images' },
            { name: 'Lazy（懒加载）', route: '/ui/lazy' },
            { name: 'Lists（列表）', route: '/ui/lists' },
            { name: 'Menus（菜单）', route: '/ui/menus' },
            { name: 'Navigation drawers（导航抽屉）', route: '/ui/navigation-drawers' },
            { name: 'Overlays（遮罩层）', route: '/ui/overlays' },
            { name: 'Pagination（分页）', route: '/ui/pagination' },
            { name: 'Parallax（视差）', route: '/ui/parallax' },
            { name: 'Color pickers（颜色选择器）', route: '/ui/color-pickers' },
            { name: 'Date pickers（日期选择器）', route: '/ui/date-pickers' },
            { name: 'Date pickers - month (月份选择器)', route: '/ui/date-pickers-month' },
            { name: 'Time pickers（时间选择器）', route: '/ui/time-pickers' },
            { name: 'Progress circular (进度环)', route: '/ui/progress-circular' },
            { name: 'Progress linear (进度条)', route: '/ui/progress-linear' },
            { name: 'Ratings（评级）', route: '/ui/ratings' },
            { name: 'Sheets（工作表）', route: '/ui/sheets' },
            { name: 'Skeleton Loaders（骨架装载器）', route: '/ui/skeleton-loaders' },
            { name: 'Snackbars（消息条）', route: '/ui/snackbars' },
            { name: 'Sparklines（迷你图表）', route: '/ui/sparklines' },
            { name: 'Steppers（步骤条）', route: '/ui/steppers' },
            { name: 'Subheaders（副标题）', route: '/ui/subheaders' },
            { name: 'Data iterators（数据迭代器）', route: '/ui/data-iterators' },
            { name: 'Simple tables（简单表格)', route: '/ui/simple-tables' },
            { name: 'Data tables（数据表格）', route: '/ui/data-tables' },
            { name: 'Tabs（选项卡）', route: '/ui/tabs' },
            { name: 'Timelines（时间轴）', route: '/ui/timelines' },
            { name: 'Tooltips（提示）', route: '/ui/tooltips' },
            { name: 'Treeview（树形视图）', route: '/ui/treeview' },
            { name: 'Virtual scroller (虚拟滚动条)', route: '/ui/virtual-scroller' },
            { name: '', route: '/ui/' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  // @import url(); 引入公共css类

</style>
