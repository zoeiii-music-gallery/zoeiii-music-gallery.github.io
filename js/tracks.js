/* =========================================================
 * 歌单 —— 只需要改这个文件
 *
 * 每一首是一个 { ... }，字段说明：
 *   title     歌名（必填，显示在卡片和播放器上）
 *   videoUrl  视频地址，二选一：
 *               · 本地/云存储文件：写 VIDEO_BASE + "01.mp4"（VIDEO_BASE 见下方）
 *               · 嵌入链接：如 "https://player.bilibili.com/player.html?bvid=BVxxxx"
 *                           或 "https://www.youtube.com/embed/xxxx"
 *             留空 "" 时显示“视频待添加”
 *   thumbnail 封面图片地址，如 "media/covers/01.jpg"；留空用原创唱片封面
 *   duration  时长文字，如 "4:12"；本地视频留空会在加载后自动补上
 *   note      一句短备注，可留空
 *
 * 想调整顺序就直接移动整段；想加减歌曲就复制/删除整段。
 * ========================================================= */

/* 视频所在的位置（末尾要带 /）：
 *   本地预览：  "media/"
 *   阿里云 OSS："https://你的bucket名.oss-cn-hangzhou.aliyuncs.com/lana/"
 * 只改这一行，17 首就都换过去了。 */
const VIDEO_BASE = "media/";

window.TRACKS = [
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "01.mp4", thumbnail: "media/covers/01.jpg", duration: "3:34", note: "" }, // 原文件 IMG_5678.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "02.mp4", thumbnail: "media/covers/02.jpg", duration: "5:38", note: "" }, // 原文件 IMG_5931.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "03.mp4", thumbnail: "media/covers/03.jpg", duration: "3:16", note: "" }, // 原文件 IMG_6298.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "04.mp4", thumbnail: "media/covers/04.jpg", duration: "4:15", note: "" }, // 原文件 IMG_6308.MOV
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "05.mp4", thumbnail: "media/covers/05.jpg", duration: "5:20", note: "" }, // 原文件 IMG_6345.MOV
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "06.mp4", thumbnail: "media/covers/06.jpg", duration: "4:09", note: "" }, // 原文件 9296.mp4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "07.mp4", thumbnail: "media/covers/07.jpg", duration: "3:26", note: "" }, // 原文件 IMG_6314.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "08.mp4", thumbnail: "media/covers/08.jpg", duration: "4:05", note: "" }, // 原文件 IMG_6399.MOV
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "09.mp4", thumbnail: "media/covers/09.jpg", duration: "3:39", note: "" }, // 原文件 IMG_6447.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "10.mp4", thumbnail: "media/covers/10.jpg", duration: "3:31", note: "" }, // 原文件 IMG_6430.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "11.mp4", thumbnail: "media/covers/11.jpg", duration: "3:20", note: "" }, // 原文件 IMG_6526.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "12.mp4", thumbnail: "media/covers/12.jpg", duration: "5:04", note: "" }, // 原文件 IMG_6507.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "13.mp4", thumbnail: "media/covers/13.jpg", duration: "4:22", note: "" }, // 原文件 IMG_6537.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "14.mp4", thumbnail: "media/covers/14.jpg", duration: "3:52", note: "" }, // 原文件 IMG_6577.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "15.mp4", thumbnail: "media/covers/15.jpg", duration: "3:46", note: "" }, // 原文件 IMG_6648.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "16.mp4", thumbnail: "media/covers/16.jpg", duration: "4:11", note: "" }, // 原文件 IMG_6632.MP4
  { title: "歌名待填写", videoUrl: VIDEO_BASE + "17.mp4", thumbnail: "media/covers/17.jpg", duration: "5:02", note: "" }, // 原文件 IMG_6729.MP4
];
