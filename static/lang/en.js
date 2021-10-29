module.exports = {
  message: {
    hello: 'hello',
    about: 'about',
    welcome: 'welcome',
    username: 'Visitor',
    placeholder: 'Please input your nickname',
    captcha: '1234',
    logo_text: 'Cabin'
  },

  login: {
    code: 200,
    data: {
      seat_number_placeholder: 'Seat Number',
      seat_number_errorMessage: 'Seat Number do not input null string',
      nick_name_placeholder: 'nick_name_placeholder',
      action_login: 'login',
      action_cancel: 'cancel',
      tips_seat_1: 'Seat Number is required',
      tips_seat_2: 'Seat Number must be less than 10 characters'
    }
  },

  logout: {
    code: 200,
    data: {
      question_contents: 'Are you sure to logout?',
      action_logout: 'logout',
      action_cancel: 'cancel'
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
      contents: "Founded in 2012, Cabinnet Akkurt Ltd., China is committed to becoming a professional company in the research and development of on-board entertainment system and providing comprehensive solutions for on-board entertainment. The company's vision is `Any One/Any Time/Any Where/Any Altitude', which enables airlines to provide passengers with a wealth of entertainment, high-quality integrated services and e-commerce at any time, place and height. The headquarters of Cabinnet GmbH is located in Berlin, Germany.",
      action_cancel: 'cancel'
    }
  },

  help: {
    code: 200,
    data: {
      contents: "Founded in 2012, Cabinnet Akkurt Ltd., China is committed to becoming a professional company in the research and development of on-board entertainment system and providing comprehensive solutions for on-board entertainment. The company's vision is `Any One/Any Time/Any Where/Any Altitude', which enables airlines to provide passengers with a wealth of entertainment, high-quality integrated services and e-commerce at any time, place and height. The headquarters of Cabinnet GmbH is located in Berlin, Germany.",
      action_cancel: 'cancel'
    }
  },

  menuClass1: {
    code: 200,
    lang: 'en',
    default: 'entertainment',
    data: [
      {
        id: 'entertainment',
        name: 'entertainment',
        desc: 'Entertain',
        to: '/entertainment',
        active: true,
        subMenu: [
          {
            id: '1.1.1',
            name: 'movies',
            desc: 'Movies',
            src: './images/3D/entertainment/movie.png',
            path: '/entertainment/movies',
            type: 'entertainment'
          },
          {
            id: '1.1.2',
            name: 'musics',
            desc: 'Musics',
            src: './images/3D/entertainment/music.png',
            path: '/entertainment/musics',
            type: 'entertainment'
          },
          {
            id: '1.1.3',
            name: 'tvs',
            desc: 'Tvs',
            src: './images/3D/entertainment/tvs.png',
            path: '/entertainment/tvs',
            type: 'entertainment'
          },
          {
            id: '1.1.4',
            name: 'books',
            desc: 'Books',
            src: './images/3D/entertainment/book.png',
            path: '/entertainment/books',
            type: 'entertainment'
          },
          {
            id: '1.1.5',
            name: 'news',
            desc: 'News',
            src: './images/3D/entertainment/news.png',
            path: '/entertainment/news',
            type: 'entertainment'
          }
        ]
      },
      { id: 'shopping', name: 'shop', desc: 'Shop', to: '/', active: false, subMenus: '' },
      {
        id: 'service',
        name: 'service',
        desc: 'Service',
        to: '/service',
        active: true,
        subMenu: [
          {
            id: '1.2.1',
            name: 'food',
            desc: 'Food',
            src: './images/3D/service/food.png',
            path: '/service/food',
            type: 'service'
          },
          {
            id: '1.2.2',
            name: 'drinks',
            desc: 'Drinks',
            src: './images/3D/service/drink.png',
            path: '/service/drinks',
            type: 'service'
          },
          {
            id: '1.2.3',
            name: 'fruits',
            desc: 'Fruits',
            src: './images/3D/service/fruits.png',
            path: '/service/fruits',
            type: 'service'
          },
          {
            id: '1.2.4',
            name: 'snacks',
            desc: 'Snacks',
            src: './images/3D/service/snack.png',
            path: '/service/snacks',
            type: 'service'
          },
          {
            id: '1.2.5',
            name: 'sothers',
            desc: 'Ohters',
            src: './images/3D/service/others.png',
            path: '/service/sothers',
            type: 'service'
          }
        ]
      }
    ]
  },

  menuClass2: {
    code: 200,
    lang: 'en',
    data: [
      { name: 'Home', val: 'home', to: 'home', icon: 'home' },
      { name: 'Mine', val: 'mine', to: 'mine', icon: 'perm_identity' },
      { name: 'Back', val: 'back', to: 'back', icon: 'undo' }
    ]
  },

  menuClass3: {
    code: 200,
    lang: 'cn',
    data: [
      { name: 'user center', val: 'mine', to: 'mine', icon: 'assignment_ind' },
      { name: 'login', val: 'login', to: 'login', icon: 'person' },
      { name: 'logout', val: 'logout', to: 'logout', icon: 'person_outlinenfo' },
      { name: 'swtich user', val: 'login', to: 'login', icon: 'autorenew' },
      { name: 'about us', val: 'aboutUs', to: 'aboutUs', icon: 'info' },
      { name: 'help', val: 'help', to: 'help', icon: 'live_help' }
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

    title: 'Welcome to MIFECS',
    contents: '<p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p> <p>To see the difference between static and fixed top navbars, just scroll.</p>',
    agree_text1: 'Agree',
    agree_text2: 'XXX agreement',
    agree_contents: 'Cabinnet, IFEMCS A mobile phone customization system developed for Beijing Cabinnet Technology Co., Ltd. (hereinafter referred to as `our company`). Before you use MIUI_ROM (hereinafter referred to as MIUI), please read this statement carefully and understand it thoroughly. You may choose not to use MIUI, but if you use MIUI, your use will be deemed to be an endorsement of the full content of this statement. Users should understand that this service is only provided according to its current situation. MIUI service involves Internet and mobile communication services, which may be affected by instability factors in various links. Therefore, there may be irresistible forces such as service interruption and blockage caused by hacker attacks, computer viruses intrusion, illegal content information, harassment information shielding, government control and any other Internet, GSM network, communication lines, information security management measures, as well as the loss of users`mobile phones. Risk of service interruption or failure to meet user requirements due to location, user shutdown and other reasons. Users who use MIUI must bear the above risks. MIUI does not guarantee the timeliness, security and accuracy of services. It does not bear any responsibility for the failure of sending and receiving reading messages, information transmission errors, personal settings or other problems. If the system failure of MIUI affects the normal operation of the services provided, MIUI promises to cooperate with the relevant units in the first time to deal with and repair in time. However, the company is not liable for the economic losses caused by the users. In addition, MIUI reserves the right to suspend any part of this service without prior notice for maintenance, upgrade or other purposes. You should be at your own risk for the consequences of using MIUI. MIUI does not guarantee any form (including but not limited to): does not guarantee that your mobile phone and computer data will not be lost, does not guarantee the normal use of the original mobile phone function or will not be changed, does not guarantee the security, correctness and legitimacy of self-installing third-party software. Because of force majeure or third-party software mentioned above, you can not use MIUI normally. MIUI does not bear any legal liability. MIUI respects and protects the privacy of all users who use MIUI. Personal data such as your registered username and email address will not be disclosed to third parties without your personal permission or in accordance with the mandatory provisions of relevant laws and regulations. Any unit or individual who considers that the contents provided by MIUI may infringe the copyright of a third party should promptly give MIUI written notice of rights and provide identification, ownership and detailed proof of infringement. MIUI will follow the Copyright Protection Complaints Guide to deal with this information content. See the specific rules for detailed processing procedures.',
    agree_tips: 'confirm this agreement',
    tips1: 'please input seat number',
    enter_text: 'Get started now',
    copyright_date: new Date().getFullYear(),
    copyright_text: 'Cabinnet China Company, Inc.'
  },

  userAvatar: {
    code: 200,
    data: [
      { icon: '#icon-nanzhi1', val: 0, active: 0 },
      { icon: '#icon-xuesheng', val: 1, active: 0 },
      { icon: '#icon-yisheng', val: 2, active: 0 },
      { icon: '#icon-yundong', val: 3, active: 0 },
      { icon: '#icon-nvzhi1', val: 4, active: 1 },
      { icon: '#icon-shibing', val: 5, active: 0 },
      { icon: '#icon-nvzhi', val: 6, active: 0 },
      { icon: '#icon-nanzhi', val: 7, active: 0 },
      { icon: '#icon-laoyeye', val: 8, active: 0 },
      { icon: '#icon-laonainai', val: 9, active: 0 },
      { icon: '#icon-jishu', val: 10, active: 0 },
      { icon: '#icon-jiqiren', val: 11, active: 0 }
    ]
  },

  eRecommand: {
    title: 'Recommand',
    data: [
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      },
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      },
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      },
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      },
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      },
      {
        title: '',
        path: '/entertainment/details',
        src: 'movie/1.jpg'
      }
    ]
  },

  eFilter: {
    data: [
      {
        name: 'All',
        id: 0,
        to: '',
        selected: true,
        fresh: true,
        tags: [
          { name: 'All', id: 0, selected: true, to: '' },
          { name: 'comedy', id: 100, selected: false, to: '' },
          { name: 'love', id: 101, selected: false, to: '' },
          { name: 'action', id: 102, selected: false, to: '' },
          { name: 'crime', id: 103, selected: false, to: '' },
          { name: 'terror', id: 104, selected: false, to: '' },
          { name: 'animation', id: 105, selected: false, to: '' }
        ]
      },
      {
        name: '2D',
        id: 1,
        to: '',
        selected: false,
        fresh: true,
        tags: [
          { name: 'All', id: 0, selected: true, to: '' },
          { name: 'comedy', id: 100, selected: false, to: '' },
          { name: 'love', id: 101, selected: false, to: '' },
          { name: 'action', id: 102, selected: false, to: '' },
          { name: 'crime', id: 103, selected: false, to: '' }
        ]
      },
      {
        name: '3D',
        id: 2,
        to: '',
        selected: false,
        fresh: true,
        tags: [
          { name: 'All', id: 0, selected: true, to: '' },
          { name: 'action', id: 102, selected: false, to: '' },
          { name: 'crime', id: 103, selected: false, to: '' },
          { name: 'terror', id: 104, selected: false, to: '' },
          { name: 'animation', id: 105, selected: false, to: '' }
        ]
      },
      {
        name: 'VR',
        id: 3,
        to: '',
        selected: false,
        fresh: true,
        tags: [
          { name: 'All', id: 0, selected: true, to: '' },
          { name: 'comedy', id: 100, selected: false, to: '' },
          { name: 'love', id: 101, selected: false, to: '' },
          { name: 'action', id: 102, selected: false, to: '' },
          { name: 'animation', id: 105, selected: false, to: '' }
        ]
      }
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
          { name: 'All', id: 100, selected: false, to: '' },
          { name: 'Current-Affairs', id: 101, selected: true, to: '' },
          { name: 'Economics', id: 102, selected: false, to: '' },
          { name: 'Sports', id: 103, selected: false, to: '' },
          { name: 'Story', id: 104, selected: false, to: '' }
        ]
      }
    ]
  },

  eNewsList: {
    data: [
      {
        name: 'News 01',
        items: [
          { src: 'dfic/6d34f853/106/w1024h682/20190728/2743-iakuryx1627942.jpg', title: 'Putin`s View of World War II Submarine', content: 'On July 27, 2019, Russian President Vladimir Putin went down in an autonomous submarine in the Baltic Sea to inspect the salmon submarine that was sunk during World War II.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/2743-iakuryx1627942.jpg', title: 'Putin`s View of World War II Submarine', content: 'On July 27, 2019, Russian President Vladimir Putin went down in an autonomous submarine in the Baltic Sea to inspect the salmon submarine that was sunk during World War II.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/2743-iakuryx1627942.jpg', title: 'Putin`s View of World War II Submarine', content: 'On July 27, 2019, Russian President Vladimir Putin went down in an autonomous submarine in the Baltic Sea to inspect the salmon submarine that was sunk during World War II.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/2743-iakuryx1627942.jpg', title: 'Putin`s View of World War II Submarine', content: 'On July 27, 2019, Russian President Vladimir Putin went down in an autonomous submarine in the Baltic Sea to inspect the salmon submarine that was sunk during World War II.' }
        ]
      },
      {
        name: 'News 02',
        items: [
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' },
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' },
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' },
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' },
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' },
          { src: 'upload/6d34f853/180/w2048h1332/20190728/433d-iakuryx1529066.jpg', title: 'A 8-meter-diameter giant pot is on display for 1,000 people to enjoy 2.5 tons of seafood', content: 'On July 26, 2019, Rizhao Qingdao Food Festival introduced a large pot with a diameter of 8 meters, which can cook 2.5 tons of seafood. On-site cooking of seafood, lobster, crab, abalone, shrimp, oyster, scallop and other local characteristics of seafood attracted many tourists to taste.' }
        ]
      },
      {
        name: 'News 03',
        items: [
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' },
          { src: 'dfic/6d34f853/106/w1024h682/20190728/687a-iakuryx1584763.jpg', title: 'France excavated 140 million years ago, the femur of dinosaurs was 2 meters long and half tons heavy and well preserved.', content: 'Scientists excavated giant dinosaur femurs at the Angeac-Charente site in southwestern France on July 22, 2019. The femur is about 2 meters long and weighs about half a ton. Scientists believe it belonged to a sauropod dinosaur 140 million years ago. Experts say larger bones often break into small pieces themselves, and it`s rare to have such a well-preserved femur.' }
        ]
      }
    ]
  },

  eMovieList: {
    data: [
      { id: 1, title: 'title', src: 'movie.jpg', flex_xs: 12, flex_lg: 4, show: false },
      { id: 2, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false },
      { id: 3, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false },
      { id: 4, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false },
      { id: 5, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false },
      { id: 6, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false },
      { id: 7, title: 'title', src: 'movie.jpg', flex_xs: 6, flex_lg: 4, show: false }
    ]
  },

  eDetails: {
    data: {
      title: 'Circum-Pacific',
      items: [
        {
          title: '',
          path: '',
          src: 'movie-cover.jpg'
        },
        {
          title: '',
          path: '',
          src: 'movie-cover.jpg'
        }
      ],
      name: 'Circum-Pacific',
      favorite_show: false,
      reviews: '16,544',
      avators: [
        { img: 'avator-01.jpg', name: 'avator 1', show: false },
        { img: 'avator-02.jpg', name: 'avator 2', show: false }
      ],
      description: 'Circum-Pacific is an American science fiction film directed by Gilmore Del Toro, starring Charlie Hannam, Idris Alba, Juliet Rinzo and Charlie Dai, which was released in the United States on July 12, 2013. The film mainly tells the story of human beings in order to resist the attack of monsters, developed a tall machine fighter to fight against the monsters.',
      movie_path: 'http://www.w3school.com.cn//i/movie.ogg'
    }
  },

  eMusicList: {
    data: [
      {
        id: 1,
        album: 'AAA',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 4.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 1',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 }
        ]
      },
      {
        id: 2,
        album: 'BBB',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 3.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 2',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 },
          { key: 'classic', val: 103 }
        ]
      },
      {
        album: 'CCC',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 6.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 3',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 }
        ]
      },
      {
        id: 3,
        album: 'DDD',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 1.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 4',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 },
          { key: 'classic', val: 103 },
          { key: 'Jazz', val: 104 }
        ]
      },
      {
        id: 4,
        album: 'EEE',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 0.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 5',
        types: [
          { key: 'classic', val: 103 },
          { key: 'Jazz', val: 104 }
        ]
      },
      {
        id: 5,
        album: 'FFF',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 3.0,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 6',
        types: [
          { key: 'light music', val: 101 }
        ]
      },
      {
        id: 6,
        album: 'GGG',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 4.0,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 7',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 }
        ]
      },
      {
        id: 7,
        album: 'HHH',
        to: '/entertainment/music_player',
        src: '1.jpg',
        title: 'Cafe Badilico',
        rating: 0.5,
        rating_text: 'Rating: ',
        singer: 'Micheal Jackson',
        description: 'Michael Jackson，1958.8.29~2009.6.25.）,Born in Gary, Indiana, USA, American singer, songwriter, dancer, performer, philanthropist, musician, humanitarian, pacifist, founder of charity. Jackson, the seventh child of the family, made his debut on the professional music stage in 1964 as a member of the Jackson Five and his brother. In 1968, the band published its first record, Big Boy, in collaboration with a local record company..197 ... >>>',
        type_name: 'style 8',
        types: [
          { key: 'light music', val: 101 },
          { key: 'Rock & roll', val: 102 },
          { key: 'classic', val: 103 },
          { key: 'Jazz', val: 104 }
        ]
      }
    ]
  },

  books: {
    data: [
      {
        id: 1,
        card_color: 'cyan darken-2',
        cover: 'foster.jpg',
        name: 'Supermodel',
        type: 'Foster the People',
        date: '(2014)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 2,
        card_color: 'purple',
        cover: 'halcyon.png',
        name: 'Halycon Days',
        type: 'Ellie Goulding',
        date: '(2013)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 3,
        card_color: 'cyan darken-2',
        cover: 'foster.jpg',
        name: 'Supermodel',
        type: 'Foster the People',
        date: '(2014)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 4,
        card_color: 'purple',
        cover: 'halcyon.png',
        name: 'Halycon Days',
        type: 'Ellie Goulding',
        date: '(2013)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 5,
        card_color: 'cyan darken-2',
        cover: 'foster.jpg',
        name: 'Supermodel',
        type: 'Foster the People',
        date: '(2014)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 6,
        card_color: 'purple',
        cover: 'halcyon.png',
        name: 'Halycon Days',
        type: 'Ellie Goulding',
        date: '(2013)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 7,
        card_color: 'cyan darken-2',
        cover: 'foster.jpg',
        name: 'Supermodel',
        type: 'Foster the People',
        date: '(2014)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      },
      {
        id: 8,
        card_color: 'purple',
        cover: 'halcyon.png',
        name: 'Halycon Days',
        type: 'Ellie Goulding',
        date: '(2013)',
        author: 'Henry',
        info: [
          "<p>Facebook, a social networking service in the United States, was founded on February 4, 2004 and is headquartered in Menlo Park, California. On March 6, 2012, Windows desktop chat software Facebook Messenger [2] was released. Major founder Mark Zuckerberg.</p> <p>Facebook is the world's leading photo sharing site, uploading about 350 million photos a day as of November 2013. As of May 2012, Facebook had about 900 million users. Facebook is headquartered in Menlo Park, Silicon Valley, 1 Hacker Way [3-4]. From September 11, 2006, any user can enter a valid email address and his or her age. Facebook has been blocked by China since 2009 for social and political reasons, but Facebook has never stopped contacting the Chinese technology industry, expecting to get the opening of the Chinese government by investing in Chinese technology enterprises.</p> <p>On March 17, 2018, Cambridge Analytics Company `stole` information from 50 million Facebook users.</p> <p>On September 28, 2018, Facebook said that the site had recently been hacked, involving nearly 50 million users. [7] Fifty million Facebook users may face the threat of a $1.63 billion fine from the European Union [8] In July 2019, Fortune released 2019 as the top 500 in the world: 184. On July 2, 2019, Germany issued a 2 million fine to Facebook.</p>",
          '<p>Facebook was founded by Mark Zuckerberg, a Harvard student who graduated from Azli High School. Initially, the registration of the website was limited to Harvard College students. Within the next two months, enrollment expanded to other Boston-area universities, Boston College, Boston University, Massachusetts Institute of Technology, Tufts of Telfords University, Rochester, Stanford, NYU, Northwestern University and all the Ivy League universities. 。 In the next year, many other schools were joined. Ultimately, people with a university suffix e-mail address all over the world, such as. edu,. Ac,. Uk, can register. </p>',
          '<p>Later, social networks for high schools and companies can be built on Facebook.</p>',
          '<p>According to July 2007 data, Facebook has the largest number of users among all websites that serve college students: 34 million active users, including those in non-university networks. From September 2006 to September 2007, the ranking of the website in the United States rose from 60th to 7th. At the same time, Facebook is the No. 1 photo sharing site in the United States, uploading 8.5 million photos every day. 2010 Top 500 World Brands: Facebook Ultra Software ranks first.</p>'
        ]
      }
    ]
  },

  sList: {
    data: {
      to: '/service/serve',
      title: 'Cafe Badilico',
      name: '$ • Italian, Cafe',
      description: 'Small plates, salads & sandwiches an inteimate setting with 12 indoor seats plus patio seating.',
      title2: 'Supply Time',
      serve_times: ['5:30PM', '7:30PM', '8:00PM', '9:00PM'],
      rating: 4.5,
      img_src: 'cooking.png',
      price: 100,
      price_unit: '$',
      default_price: 'For Free',
      action_name: 'Book'
    }
  },
  serve: {
    title: 'Serve Cart',
    data: [
      {
        action: 'restaurant',
        title: 'Food',
        color: 'primary',
        active: true,
        goods: [
          { title: 'Breakfast & brunch', favorite: false, count: 0 },
          { title: 'dinner', favorite: false, count: 0 },
          { title: 'Fast food', favorite: true, count: 1 }
        ]
      },
      {
        action: 'local_drink',
        title: 'Drinks',
        color: 'info',
        active: false,
        goods: [
          { title: 'Juice', favorite: false, count: 0 },
          { title: 'Tea', favorite: true, count: 1 },
          { title: 'Wine', favorite: false, count: 0 }
        ]
      },
      {
        action: 'fastfood',
        title: 'Snacks',
        color: 'warning',
        active: false,
        goods: [
          { title: 'candy', favorite: false, count: 0 },
          { title: 'Potato chips', favorite: true, count: 1 },
          { title: 'chewing gum', favorite: false, count: 0 }
        ]
      },
      {
        action: 'book',
        title: 'books',
        color: 'error',
        active: false,
        goods: [{ title: 'World History', favorite: false, count: 0 },
          { title: 'Asian History', favorite: false, count: 0 },
          { title: 'Chian History', favorite: true, count: 1 }]
      },
      {
        action: 'local_offer',
        title: 'local serve',
        color: 'primary',
        active: false,
        goods: [
          { title: 'serve-11', favorite: false, count: 0 },
          { title: 'serve-12', favorite: false, count: 0 },
          { title: 'serve-13', favorite: false, count: 0 },
          { title: 'serve-14', favorite: true, count: 1 },
          { title: 'serve-15', favorite: false, count: 0 }
        ]
      }
    ]
  }

}
