# Zoeiii's little listening room

纯静态网站，不需要构建，打开 `index.html` 或放到任何静态托管上即可。

## 文件

```
index.html        页面结构（首屏文案、结尾卡片文案都在这里）
css/style.css     样式（配色在最上面的 :root 里）
js/tracks.js      ★ 歌单数据 —— 改歌名、视频、封面、备注都只改这里
js/app.js         播放器、章鱼、贴纸彩蛋的逻辑
media/01–17.mp4   转码后的视频（720p H.264，手机/电脑浏览器都能播）
media/covers/     从视频里截的封面
media-map.txt     编号 ↔ 原始文件名对照（按拍摄时间排序）
```

## 怎么改

- **歌名**：在 `js/tracks.js` 里把 `"歌名待填写"` 换成真实歌名；每行末尾注释写了原始文件名，方便对照。
- **备注**：填 `note: "一句话"`，会显示在卡片和播放器里。
- **顺序**：直接上下移动整行。
- **封面**：替换 `media/covers/xx.jpg`，或把 `thumbnail` 改成别的图片路径；留空 `""` 会用原创唱片封面。
- **嵌入链接**：`videoUrl` 也可以写 B 站 / YouTube 的 embed 地址（嵌入的视频只能在面板里控制，底部迷你播放器的进度条不可用）。

## 本地预览

```
cd site && python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署

- **网页本身**（HTML/CSS/JS/封面，约 370KB）：GitHub Pages，`main` 分支根目录。
- **视频**（`media/*.mp4`，535MB）：不进 git 仓库，放阿里云 OSS。

### 视频上传到阿里云 OSS

1. 开通 OSS，创建 Bucket：地域选离她近的（如华东1 杭州），**读写权限选「公共读」**，存储类型「标准存储」。
2. 用控制台上传，或用 ossutil 上传：
   ```
   ossutil cp -r media/ oss://你的bucket名/lana/ --include "*.mp4" --meta "Cache-Control:max-age=31536000"
   ```
3. 防盗链（避免被别人盗用产生流量费）：Bucket → 数据安全 → 防盗链，Referer 白名单填
   `https://zoeiii-music-gallery.github.io/*`，并**允许空 Referer**（部分手机浏览器不带 Referer）。
4. 把 `js/tracks.js` 里的 `VIDEO_BASE` 改成
   `"https://你的bucket名.oss-cn-hangzhou.aliyuncs.com/lana/"`，提交推送。

不需要配置 CORS（页面里的 `<video>` 没有用 crossorigin）。视频已做 faststart 处理，边下边播、拖进度条都没问题。
