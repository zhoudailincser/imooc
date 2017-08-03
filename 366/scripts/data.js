const data = {
  singer: 'KOKIA',
  category: '日本女歌手',
  singerpic: 'http://p3.music.126.net/GSOGaiCi9gQ-25xa9MSEog==/580542139487841.jpg?param=640y300',
  song: [{
    songname: 'EXEC_COSMOFLIPS/.',
    outerchain: '//music.163.com/outchain/player?type=2&id=4940455&auto=1',
    img: 'http://p3.music.126.net/F4kkgDr0op7pvKyDFrgAPg==/1407374887348631.jpg?param=130y130',
    albumname: '咲夜琉命 ~Ar tonelicoIII hymmnos concert side. 苍~',
  },
  {
    songname: 'ありがとう…',
    outerchain: '//music.163.com/outchain/player?type=2&id=25638306&auto=1',
    img: 'http://p4.music.126.net/RyUJEW4u_Vk65XDSWtn2aA==/6634453162533388.jpg?param=130y130',
    albumname: 'ありがとう…',
  },
  {
    songname: 'Spirits',
    outerchain: '//music.163.com/outchain/player?type=2&id=32069326&auto=1',
    img: 'http://p4.music.126.net/VZGNAGtF1rWYCl_BRODjVA==/2945591652245516.jpg?param=130y130',
    albumname: 'アルカディアの蒼き巫女 オリジナル・サウンドトラック',
  },
  {
    songname: '夢追人',
    outerchain: '//music.163.com/outchain/player?type=2&id=587815&auto=1',
    img: 'http://p4.music.126.net/3t5JIxQKohR5gk_cZqjLGw==/2275989069517444.jpg?param=130y130',
    albumname: '夢追人',
  },
  {
    songname: 'EXEC COSMOFLIPS',
    outerchain: '//music.163.com/outchain/player?type=2&id=26377651&auto=1',
    img: 'http://p4.music.126.net/GJblcjt12l5acRfFP3SiqQ==/2354054395122733.jpg?param=130y130',
    albumname: 'Krut hymneth Complete BOX',
  },
  {
    songname: 'I Found the Love',
    outerchain: '//music.163.com/outchain/player?type=2&id=31053308&auto=1',
    img: 'http://p4.music.126.net/R5flucnlBOsdU8GkUlG0xA==/7812030115856743.jpg?param=130y130',
    albumname: 'I Found You',
  },
  {
    songname: '白雪 - (《海豚湾恋人》插曲)',
    outerchain: '//music.163.com/outchain/player?type=2&id=4877038&auto=1',
    img: 'http://p1.music.126.net/_ObweMrlLY6ScsmPx62Trw==/56075093031964.jpg?param=130y130',
    albumname: '海豚湾恋人 电视原声带',
  },
  {
    songname: 'ありがとう...',
    outerchain: '//music.163.com/outchain/player?type=2&id=22701801&auto=1',
    img: 'http://p3.music.126.net/Csb6TkxnigI4LTjFHtnX9g==/899400511544316.jpg?param=130y130',
    albumname: 'Complete collection 1998-1999',
  },
  {
    songname: 'Ave Maria',
    outerchain: '//music.163.com/outchain/player?type=2&id=588368&auto=1',
    img: 'http://p3.music.126.net/renLE6OwsTTBarT7c0JQQA==/898300999893127.jpg?param=130y130',
    albumname: 'The VOICE',
  },
  {
    songname: 'たった1つの想い',
    outerchain: '//music.163.com/outchain/player?type=2&id=588425&auto=1',
    img: 'http://p4.music.126.net/MU9vjDa16ucuspjTp1iGpA==/811439581298798.jpg?param=130y130',
    albumname: 'たった1つの想い',
  },
  {
    songname: 'クルマレテ',
    outerchain: '//music.163.com/outchain/player?type=2&id=587778&auto=1',
    img: 'http://p4.music.126.net/SwoArkQ3SnoC21jNvbfNXA==/2319969534632731.jpg?param=130y130',
    albumname: '心ばかり',
  },
  ],
}
// 取前11个数据
const maindata = data.song.slice(0, 11);
// photo区域模板
const photoTpm = `
<div class="front">
  <img src="{{data.src}}" />
  <span class="caption_front">{{data.front_content}}</span>
</div>
<div class="back">
  <span class="caption_back">{{data.back_content}}</span>
</div>`;

// 渲染模板，绑定事件
window.onload = function () {
    // 获取模板父节点
  const wrapPhotoDom = document.getElementsByClassName('wrap_photo')[0];
  const navDom = document.getElementsByClassName('nav')[0];
    // 渲染dom
  const photofrag = document.createDocumentFragment();
  const navfrag = document.createDocumentFragment();
  const navString = navDom.innerHTML;
  for (let i = 0; i < maindata.length; i++) {
    const s = document.createElement('div');
    s.innerHTML = photoTpm.replace('{{data.src}}', maindata[i].img)
            .replace('{{data.front_content}}', maindata[i].songname)
            .replace('{{data.back_content}}', maindata[i].albumname);
    s.id = `photo${i}`;
    s.className = 'photo';
    photofrag.appendChild(s);
    const g = document.createElement('i');

    g.setAttribute('aria-hidden', 'true');
    navfrag.appendChild(g);
  }

    // 插入
  wrapPhotoDom.appendChild(photofrag);
  navDom.appendChild(navfrag);
    // 状态初始化
  refreshPostion(0);
    // 改变透明度
  const wrap = document.getElementById('wrap');
  wrap.style.opacity = 1;
    // 绑定点击事件
  const iDom = document.getElementsByClassName('fa');
  const photoDom = document.getElementsByClassName('photo');
  let flag = 1;
  for (let i = 0; i < iDom.length; i++) {
    iDom[i].addEventListener('click', () => {
      refreshPostion(i);
    }, true);
    photoDom[i].addEventListener('click', () => {
      console.log(5);
      if (photoDom[i].className.indexOf('center') === -1) {
        refreshPostion(i);
      } else if (flag === 1) {
        photoDom[i].style.transform = 'rotateY(180deg)';
        flag *= -1;
      } else {
        photoDom[i].style.transform = 'rotateY(0deg)';
        flag *= -1;
      }
    }, true)
  }
}

function refreshPostion(n) {
  const photoDom = document.getElementsByClassName('photo');
  const navDom = document.getElementsByTagName('i');
  for (let i = 0; i < photoDom.length; i++) {
    photoDom[i].style.transform = 'rotateY(0deg)';
    if (i === n) {
      photoDom[i].style.left = '40%';
      photoDom[i].style.top = '15%';
      photoDom[i].style.transform = 'rotateZ(0deg)';
      photoDom[i].style.zIndex = '15';
      photoDom[i].className += ' center';
      navDom[i].className = 'fa fa-refresh';
    } else if (i % 2 === 0) {
      photoDom[i].style.left = `${Math.random() * 30 - 5}%`;
      photoDom[i].style.top = `${Math.random() * 80 - 25}%`;
      photoDom[i].style.transform = `rotateZ(${Math.random() * 60 - 30}deg)`;
      photoDom[i].style.zIndex = '10';
      photoDom[i].className = 'photo';
      navDom[i].className = 'fa fa-circle-o';
    } else {
      photoDom[i].style.left = `${Math.random() * 30 + 55}%`;
      photoDom[i].style.top = `${Math.random() * 80 - 25}%`;
      photoDom[i].style.transform = `rotateZ(${Math.random() * 60 - 30}deg)`;
      photoDom[i].style.zIndex = '10';
      photoDom[i].className = 'photo';
      navDom[i].className = 'fa fa-circle-o';
    }
  }
}
