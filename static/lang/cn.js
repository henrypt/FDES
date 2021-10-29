module.exports = {
  system: {
    name: '发电机故障诊断专家系统',
    home: {
      to: '/'
    },
    logoInfo: {
      to: '/',
      img: 'static/v.png'
    },
    stations: {
      items: [
        {
          id: 11,
          name: '大亚湾',
          shortName: 'DYW',
          selected: false,
          children: [
            {
              id: 19,
              name: '一号机',
              shortName: 'D1',
              disabled: false,
              selected: false
            },
            {
              id: 20,
              name: '二号机',
              shortName: 'D2',
              disabled: true,
              selected: false
            }
          ]
        },
        {
          id: 22,
          name: '岭东',
          shortName: 'LD',
          selected: true,
          children: [
            {
              id: 22,
              name: '一号机',
              shortName: 'L1',
              disabled: false,
              selected: false
            },
            {
              id: 23,
              name: '二号机',
              shortName: 'L2',
              disabled: false,
              selected: false
            },
            {
              id: 24,
              name: '三号机',
              shortName: 'L3',
              disabled: false,
              selected: true
            },
            {
              id: 25,
              name: '四号机',
              shortName: 'L4',
              disabled: false,
              selected: false
            }
          ]
        },
        {
          id: 33,
          name: '宁德',
          shortName: 'ND',
          selected: false,
          children: [
            {
              id: 26,
              name: '一号机',
              shortName: 'N1',
              disabled: false,
              selected: false
            },
            {
              id: 27,
              name: '二号机',
              shortName: 'N2',
              disabled: false,
              selected: false
            }
          ]
        }
      ]
    }
  },
  message: {
    hello: '你好',
    about: '关于',
    welcome: '欢迎',
    username: '访客',
    placeholder: '请输入您的用户名',
    captcha: '1234',
    logo_text: 'FDES'
  },
  login: {
    code: 200,
    data: {
      seat_number_placeholder: '用户名',
      seat_number_errorMessage: '用户名不可为空',
      nick_name_placeholder: '昵称',
      action_login: '进入',
      action_cancel: '取消',
      tips_seat_1: '必须输入用户名',
      tips_seat_2: '用户名必须少于10个字符'
    }
  },

  logout: {
    code: 200,
    data: {
      question_contents: '您确定要注销当前用户吗？',
      action_logout: '注销',
      action_cancel: '取消'
    }
  },

  languages: {
    code: 200,
    default: 'cn',
    current_locale: 'cn',
    data: [
      { key: 'cn', val: '中文', locale: 'cn', active: true },
      { key: 'en', val: 'English', locale: 'en', active: true },
      { key: 'de', val: 'Deutsch', locale: 'de', active: false }
    ]
  },

  aboutUs: {
    code: 200,
    data: {
      contents: '北京伏安基业电气技术有限公司位于上地信息产业基地，是专门从事电力设备故障诊断应用软件开发、生产、销售和服务的高新技术企业，经工信部认证为软件企业。公司拥有来自中国电力科学研究院的国家级领域专家、并拥有一批来自清华、中国电力科学研究院院的硕士生、本科生为主体的电力系统专业技术人员和软件开发人员。公司依托科研院所、高校和电力系统领域专家的人才和技术优势，致力于电力设备故障诊断应用软件的开发和推广应用。',
      action_cancel: '取消'
    }
  },

  help: {
    code: 200,
    data: {
      contents: '北京伏安基业电气技术有限公司位于上地信息产业基地，是专门从事电力设备故障诊断应用软件开发、生产、销售和服务的高新技术企业，经工信部认证为软件企业。公司拥有来自中国电力科学研究院的国家级领域专家、并拥有一批来自清华、中国电力科学研究院院的硕士生、本科生为主体的电力系统专业技术人员和软件开发人员。公司依托科研院所、高校和电力系统领域专家的人才和技术优势，致力于电力设备故障诊断应用软件的开发和推广应用。',
      action_cancel: '取消'
    }
  },

  menuClass1: {
    code: 200,
    lang: 'cn',
    default: '1',
    data: [
      {
        id: '1',
        name: 'ZhuangTaiJianCe',
        desc: '状态监测',
        to: '/ZhuangTaiJianCe',
        active: false,
        icon: 'home',
        subMenu: [
          {
            id: '1.1.1',
            name: 'ZhuangTaiZhanShi',
            desc: '状态展示',
            icon: './images/ZhuangTaiJianCe/ZhuangTaiZhanShi.png',
            to: '/ZhuangTaiJianCe/ZhuangTaiZhanShi',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.2',
            name: 'DingZiRaoZuWenDu',
            desc: '定子绕组温度',
            icon: './images/ZhuangTaiJianCe/DingZiRaoZuWenDu.png',
            to: '/ZhuangTaiJianCe/DingZiRaoZuWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.3',
            name: 'TongXingCeDian',
            desc: '同型测点',
            icon: './images/ZhuangTaiJianCe/TongXingCeDian.png',
            to: '/ZhuangTaiJianCe/TongXingCeDian',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.4',
            name: 'WenDuFenBuShiYiTu',
            desc: '温度分部示意图',
            icon: './images/ZhuangTaiJianCe/WenDuFenBuShiYiTu.png',
            to: '/ZhuangTaiJianCe/WenDuFenBuShiYiTu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.5',
            name: 'ShuiDianLianJie',
            desc: '水电连接',
            icon: './images/3D/ZhuangTaiJianCe/ShuiDianLianJie.png',
            to: '/ZhuangTaiJianCe/ShuiDianLianJie',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.6',
            name: 'TieXinWenDu',
            desc: '铁芯温度',
            icon: './images/3D/ZhuangTaiJianCe/TieXinWenDu.png',
            to: '/ZhuangTaiJianCe/TieXinWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.7',
            name: 'JinXiangYunXing',
            desc: '进相运行',
            icon: './images/3D/ZhuangTaiJianCe/JinXiangYunXing.png',
            to: '/ZhuangTaiJianCe/JinXiangYunXing',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.1.8',
            name: 'QiTaCanShu',
            desc: '其它参数',
            icon: './images/3D/ZhuangTaiJianCe/QiTaCanShu.png',
            to: '/ZhuangTaiJianCe/QiTaCanShu',
            type: 'ZhuangTaiJianCe'
          }
        ]
      },
      {
        id: '2',
        name: 'QuShiFenXi',
        desc: '趋势分析',
        to: '/QuShiFenXi',
        active: false,
        icon: 'folder',
        subMenu: [
          {
            id: '2.1.1',
            name: 'FaZhan',
            desc: '发展趋势',
            icon: './images/QuShiFenXi/FaZhan.png',
            to: '/QuShiFenXi/FaZhan',
            type: 'QuShiFenXi'
          },
          {
            id: '2.1.2',
            name: 'TongXingBiJiao',
            desc: '同形比较',
            icon: './images/QuShiFenXi/TongXingBiJiao.png',
            to: '/QuShiFenXi/TongXingBiJiao',
            type: 'QuShiFenXi'
          }
        ]
      }
    ]
  },

  menuClass2: {
    code: 200,
    lang: 'cn',
    data: [
      { name: '首页', val: 'home', to: 'home', icon: 'home' },
      { name: '我的', val: 'mine', to: 'mine', icon: 'perm_identity' },
      { name: '返回', val: 'back', to: 'back', icon: 'undo' }
    ]
  },

  menuClass3: {
    code: 200,
    lang: 'cn',
    data: [
      { name: '个人中心', val: 'mine', to: 'mine', icon: 'assignment_ind' },
      { name: '登录', val: 'login', to: 'login', icon: 'person' },
      { name: '注销', val: 'logout', to: 'logout', icon: 'person_outline' },
      { name: '切换用户', val: 'login', to: 'login', icon: 'autorenew' },
      { name: '关于我们', val: 'aboutUs', to: 'aboutUs', icon: 'info' },
      { name: '帮助', val: 'help', to: 'help', icon: 'live_help' }
    ]
  },

  token: [
    {
      code: 200,
      grantType: 'client_credential',
      deviceID: 'test123',
      secretKey: '123456',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
    },
    {
      code: 200,
      grantType: 'client_credential',
      deviceID: 'henry',
      secretKey: '123456',
      Authorization: '111111111111111111111111111111'
    }
  ],

  welcome: {
    title: '欢迎来到MIFECS',
    contents: '<p>此示例是一个快速练习，演示默认的、静态的和固定到顶部的导航栏是如何工作的。它包括响应的css和html，因此它也可以适应您的视区和设备。</p> <p>要查看静态和固定顶部导航条之间的区别，只需滚动。</p>',
    agree_text1: '同意',
    agree_text2: 'XXX 条款',
    agree_contents: '发电机故障诊断专家系统为北京伏安基业电气技术有限公司（以下简称`本公司`）开发的一款发电机故障诊断定制系统`。在您使用MIUI_ROM（以下简称MIUI）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用MIUI，但如果您使用MIUI，您的使用行为将被视为对本声明全部内容的认可。用户须明白，本服务仅依其当前所呈现的状况提供，MIUI服务涉及到互联网及移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此服务可能存在因黑客攻击，电脑病毒的侵入，非法内容信息、骚扰信息的屏蔽，政府管制以及其他任何互联网络、GSM网络、通信线路、信息安全管理措施等原因造成的服务中断、受阻等不可抗力以及用户手机遗失，用户所在位置、用户关机等其他原因造成的服务中断或不能满足用户要求的风险。使用MIUI的用户须承担以上风险，MIUI对服务之及时性、安全性、准确性不作担保，对因此导致用户不能发送和接受阅读消息、信息传输错误，个人设定失败、或其他问题不承担任何责任。 如MIUI的系统发生故障影响到所提供服务的正常运行，MIUI承诺在第一时间内与相关单位配合，及时处理进行修复。但用户因此而产生的经济损失，本公司不承担责任。此外，MIUI保留不经事先通知进行维修保养、升级或其他目的暂停本服务任何部分的权利。 您应该对使用MIUI的后果自行承担风险。MIUI不做任何形式的保证（包括但不限于）：不保证您手机及计算机数据不丢失，不保证原手机功能正常使用或不被改变，不保证自行安装第三方软件的安全性、正确性、合法性。因前述不可抗力或第三方软件等任何原因而导致您不能正常使用MIUI，MIUI不承担任何法律责任。 MIUI尊重并保护所有使用MIUI用户的个人隐私，您注册的用户名、电子邮件地址等个人资料，非经您亲自许可或根据相关法律、法规的强制性规定，MIUI不会主动向第三方披露。任何单位或个人若认为MIUI所提供内容可能存在侵犯第三人著作权的情形，应该及时向MIUI提出书面权利通知，并提供身份证明、权属证明及详细侵权情况证明。MIUI将遵循`版权保护投诉指引`处理该信息内容。详细处理程序请参见具体规则。',
    agree_tips: '同意条款',
    tips1: '请输入用户名',
    enter_text: '开始进入',
    copyright_date: new Date().getFullYear(),
    copyright_text: '北京伏安基业电气技术有限公司'
  },

  userAvatar: {
    code: 200,
    data: [
      { icon: '#icon-nanzhi1', val: 0, active: false },
      { icon: '#icon-xuesheng', val: 1, active: false },
      { icon: '#icon-yisheng', val: 2, active: false },
      { icon: '#icon-yundong', val: 3, active: false },
      { icon: '#icon-nvzhi1', val: 4, active: true },
      { icon: '#icon-shibing', val: 5, active: false },
      { icon: '#icon-nvzhi', val: 6, active: false },
      { icon: '#icon-nanzhi', val: 7, active: false },
      { icon: '#icon-laoyeye', val: 8, active: false },
      { icon: '#icon-laonainai', val: 9, active: false },
      { icon: '#icon-jishu', val: 10, active: false },
      { icon: '#icon-jiqiren', val: 11, active: false }
    ]
  },

  eFilterNews: {
    data: [
      {
        name: '',
        id: 1,
        to: '',
        selected: true,
        fresh: false,
        tags: [
          { name: '全部', id: 100, selected: true, to: '' },
          { name: '时事', id: 101, selected: false, to: '' },
          { name: '经济', id: 102, selected: false, to: '' },
          { name: '体育', id: 103, selected: false, to: '' },
          { name: '故事', id: 104, selected: false, to: '' }
        ]
      }
    ]
  },

  userInfo: {
    code: 200,

    data: {
      name: '张三',
      role: '工程师',
      equipInfo: {},
      img: 'static/img/user/11.jpg',
      hasLogin: false
    }
  }

}
