<!-- page info:  -->
<template>
  <div class="page_gzzz">
    <v-simple-table dense fixed-header>
      <thead>
        <tr>
          <th class="text-left body-2 font-weight-bold sub_title1 pl-2 py-2">
            模拟量报警
          </th>
          <th
            class="text-left body-2 font-weight-bold sub_title1 pl-2 py-2"
            colspan="2"
          >
            开关量报警、运行巡检
          </th>
          <th class="text-left body-2 font-weight-bold sub_title1 pl-2 py-2">
            检修试验
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            定子绕组
          </td>
        </tr>
        <tr>
          <td>定子线棒温度高</td>
          <td>GRH001KA_发电机引线出水温度过高</td>
          <td>&nbsp;</td>
          <td>定子绕组直流电阻测量不合格</td>
        </tr>
        <tr>
          <td>引出线出水温度高</td>
          <td>GRH004KA_发电机槽部温度过高</td>
          <td>&nbsp;</td>
          <td>定子绕组绝缘电阻测试不合格</td>
        </tr>
        <tr>
          <td>定子绕组整个分支温度高</td>
          <td>GRH005KA_定子下层线棒出水温度“过高”</td>
          <td>&nbsp;</td>
          <td>定子绕组直流泄流电流试验不合格</td>
        </tr>
        <tr>
          <td>定子绕组整相温度高</td>
          <td>GRH006KA_定子上层线棒出水温度“过高”</td>
          <td>&nbsp;</td>
          <td>定子绕组流量试验不合格</td>
        </tr>
        <tr>
          <td>定子绕组普遍温度高</td>
          <td>GRH150KA_定子下层线棒出水温度“过高”（偏差信号）</td>
          <td>&nbsp;</td>
          <td>定子绕组真空、压力试验不合格</td>
        </tr>
        <tr>
          <td>定子水进出口温差高</td>
          <td>GRH250KA_定子上层线棒出水温度“过高”（偏差信号）</td>
          <td>&nbsp;</td>
          <td>定子绕组端部手包绝缘施加直流电压测量不合格</td>
        </tr>
        <tr>
          <td>定子绕组端部振动大</td>
          <td>GRH149KA_定子下层线棒出水温度差大</td>
          <td>&nbsp;</td>
          <td>定子绕组自振频率不合格</td>
        </tr>
        <tr>
          <td>发电机局部放电量大</td>
          <td>GRH249KA_定子上层线棒出水温度差大</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>XGEX500KA_发电机定子线圈端部振动“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>XGEX650KA_发电机定子出线振动“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="4" class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            定子铁芯及冷却器
          </td>
        </tr>
        <tr>
          <td>定子铁芯温度高</td>
          <td>GRH002KA_定子铁心温度“过高”</td>
          <td>定子振动大</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子铜屏蔽温度高</td>
          <td>GRH003KA_铜屏蔽温度“过高”</td>
          <td>铁磁振动噪声大</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>冷氢温度高</td>
          <td>GRH401KA_发电机冷氢温度“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>热氢温度高</td>
          <td>GRH402KA_发电机热氢温度“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>两侧冷氢温差大</td>
          <td>GRH403KA_励磁机冷空温度“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>两侧热氢温差大</td>
          <td>GRH404KA_励磁机热空温度“过高”</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            转子
          </td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>励磁电流实测值/计算值大</td>
          <td>GEX130KA_转子接地故障（绝缘故障）第1阶段</td>
          <td>&nbsp;</td>
          <td>转子绕组直流电阻大</td>
        </tr>
        <tr>
          <td>轴承振动大</td>
          <td>GEX611KA_轴电流检测一段（报警）</td>
          <td>&nbsp;</td>
          <td>转子绕组直流电阻小</td>
        </tr>
        <tr>
          <td>轴电流大</td>
          <td>GEX612KA_轴电流检测二段（跳闸）</td>
          <td>&nbsp;</td>
          <td>转子气密试验不合格</td>
        </tr>
        <tr>
          <td>轴电压高</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>静态试验发现有匝间短路</td>
        </tr>
        <tr>
          <td>转子绕组平均温度高</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>转子绕组绝缘电阻低且吸收比小</td>
        </tr>
        <tr>
          <td>转子绕组一点接地</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>转子通风试验不合格</td>
        </tr>
        <tr>
          <td>转子轴接地电刷运行状态不良</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>护环探伤不合格或发现有腐蚀</td>
        </tr>
        <tr>
          <td>转子轴电压测量电刷的运行状态不良</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="4" class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            定子冷却水系统
          </td>
        </tr>
        <tr>
          <td>定子冷却水流量低</td>
          <td>GST001KA_定子冷却水进水流量“低”</td>
          <td>GST008KA_定子冷却水进水电导率“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子水进口压力高</td>
          <td>GST007AA_定子冷却水进水流量“低”</td>
          <td>GST009KA_定子冷却水进水电导率“过高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子水进口压力低</td>
          <td>GST901KA_定子冷却水进水流量“过低”</td>
          <td>GST011KA_离子交换器出水电导率“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子水箱水位低</td>
          <td>GST444KA_定子冷却水进水流量“过低”</td>
          <td>GST012KA_定子冷却水出水温度“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子水箱水位高</td>
          <td>GST002KA_水箱液位“过低”</td>
          <td>GST013KA_定子冷却水出水温度“过高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子冷却水进口温度高</td>
          <td>GST902KA_水箱液位“过低”</td>
          <td>GST014KA_定子冷却水进水温度“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子冷却水出口温度高</td>
          <td>GST003KA_水箱液位“低”</td>
          <td>GST015KA_定子冷却水回路有漏氢</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子冷却水电导率高</td>
          <td>GST004KA_水箱液位“高”</td>
          <td>GST018KA_定子冷却水泵101PO故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>除盐床出口电导率高</td>
          <td>GST005KA_定子冷却水进水压力“高”</td>
          <td>GST019KA_定子冷却水泵201PO故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>定子水过滤器压差高</td>
          <td>GST006KA_定子水箱压力“高”</td>
          <td>GST020KA_定子冷却水进水温度“异常”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GST007KA_主水过滤器压降“高”</td>
          <td>定子水箱气表流量GST002QD增加</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="4" class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            氢气系统
          </td>
        </tr>
        <tr>
          <td>氢气压力低</td>
          <td>GRV001KA_发电机漏液“高”</td>
          <td>GRV010KA_氢、空进气控制失误</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>氢气压力高</td>
          <td>GRV002KA_发电机漏液“过高”</td>
          <td>GRV012KA_氢气干燥器进口氢气湿度“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>氢气纯度低</td>
          <td>GRV901KA_发电机漏液“过高”</td>
          <td>GRV013KA_氢气干燥器出口氢气湿度“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>干燥器入口露点温度高</td>
          <td>GRV003KA_励磁机漏液“高”</td>
          <td>GRV014KA_CO2防冻装置故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>干燥器出口露点温度高</td>
          <td>GRV902KA_励磁机漏液“过高”</td>
          <td>GRV016KA_氢气干燥器故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GRV004KA_励磁机漏液“过高”</td>
          <td>GRV017KA_发电机漏氢量“高”</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GRV005KA_发电机氢气压力“低”</td>
          <td>GRV018KA_氢气风机故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GRV006KA_发电机氢气压力“高”</td>
          <td>GRV019KA_空气风机故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GRV008KA_发电机氢气纯度“低”</td>
          <td>漏氢量大</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GRV009KA_发电机绝缘过热报警</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="4" class="body-2 font-weight-bold pl-0">
            <v-icon color="success">
              mdi-text-subject
            </v-icon>
            密封油系统
          </td>
        </tr>
        <tr>
          <td>油氢压差高</td>
          <td>GHE001KA_主密封油泵GHE001PO出口压力低</td>
          <td>GHE011KA_氢侧回油箱GHE103CW液位高</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>油氢压差低</td>
          <td>GHE002KA_事故密封油泵GHE201PO出口压力低</td>
          <td>GHE012KA_备用氢侧回油箱GHE003CW液位低</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>真空油箱真空度低</td>
          <td>GHE003KA_油过滤器GHE101FI或GHE201FI压降高</td>
          <td>GHE013KA_备用氢侧回油箱GHE003CW液位高</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE004KA_密封油/氢气差压低</td>
          <td>GHE014KA_真空油箱GHE001CW真空度低</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE005KA_密封油/氢气差压过低</td>
          <td>GHE016KA_润滑油过滤器GHE301FI或GHE401FI压降高</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE901KA_密封油/氢气差压过低</td>
          <td>GHE019KA_主密封油泵故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE006KA_真空油箱GHE001CW液位低</td>
          <td>GHE020KA_紧急交流密封油泵故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE007KA_真空油箱GHE001CW液位高</td>
          <td>GHE021KA_紧急直流密封油泵故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE008KA_真空泵积油箱GHE005CW液位高</td>
          <td>GHE022KA_真空泵GHE401PO故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE009KA_真空泵油箱液位“低”</td>
          <td>GHE024KA_排烟风机GHE001ZV故障</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>GHE010KA_氢侧回油箱GHE103CW液位低</td>
          <td>GHE025KA_排烟风机GHE002ZV故障</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      title: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // created
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // mounted
  },
  // 方法集合
  methods: {
    // methods
  }
  // beforeCreate () {}, // 生命周期 - 创建之前
  // beforeMount () {}, // 生命周期 - 挂载之前
  // beforeUpdate () {}, // 生命周期 - 更新之前
  // updated () {}, // 生命周期 - 更新之后
  // beforeDestroy () {}, // 生命周期 - 销毁之前
  // destroyed () {}, // 生命周期 - 销毁完成
  // activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
td{
  font-size: 12px;
  color: #263238
}
</style>
