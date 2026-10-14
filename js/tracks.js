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
 *   腾讯云 COS："https://zoeiiimusic-1506055688.cos.ap-shanghai.myqcloud.com/"
 * 只改这一行，所有视频就都换过去了。 */
const VIDEO_BASE = "https://zoeiiimusic-1506055688.cos.ap-shanghai.myqcloud.com/";

window.TRACKS = [
  { title: "Never Let Me Go", videoUrl: VIDEO_BASE + "Never_Let_Me_Go.MP4", thumbnail: "media/covers/01.jpg", duration: "3:34", note: "" }, // 原文件 IMG_5678.MP4
  { title: "Video Games", videoUrl: VIDEO_BASE + "Video_Games.MP4", thumbnail: "media/covers/02.jpg", duration: "5:38", note: "" }, // 原文件 IMG_5931.MP4
  { title: "Money Power Glory", videoUrl: VIDEO_BASE + "Money_Power_Glory.mp4", thumbnail: "media/covers/04.jpg", duration: "4:15", note: "" }, // 原文件 IMG_6308.MOV
  { title: "Swan Song", videoUrl: VIDEO_BASE + "Swan_Song.mp4", thumbnail: "media/covers/05.jpg", duration: "5:20", note: "" }, // 原文件 IMG_6345.MOV
  { title: "West Coast", videoUrl: VIDEO_BASE + "West_Coast.mp4", thumbnail: "media/covers/06.jpg", duration: "4:09", note: "" }, // 原文件 9296.mp4
  { title: "Radio", videoUrl: VIDEO_BASE + "Radio.MP4", thumbnail: "media/covers/07.jpg", duration: "3:26", note: "" }, // 原文件 IMG_6314.MP4
  { title: "Love Song", videoUrl: VIDEO_BASE + "Love_Song.mp4", thumbnail: "media/covers/08.jpg", duration: "4:05", note: "" }, // 原文件 IMG_6399.MOV
  { title: "The Greatest", videoUrl: VIDEO_BASE + "The_Greatest.MP4", thumbnail: "media/covers/09.jpg", duration: "3:39", note: "" }, // 原文件 IMG_6447.MP4
  { title: "Lust for Life", videoUrl: VIDEO_BASE + "Lust_for_Life.MP4", thumbnail: "media/covers/10.jpg", duration: "3:31", note: "" }, // 原文件 IMG_6430.MP4
  { title: "Summertime Sadness", videoUrl: VIDEO_BASE + "Summertime_Sadness.MP4", thumbnail: "media/covers/11.jpg", duration: "3:20", note: "" }, // 原文件 IMG_6526.MP4
  { title: "Love", videoUrl: VIDEO_BASE + "Love.MP4", thumbnail: "media/covers/12.jpg", duration: "5:04", note: "" }, // 原文件 IMG_6507.MP4
  { title: "Born to Die", videoUrl: VIDEO_BASE + "Born_to_Die.MP4", thumbnail: "media/covers/13.jpg", duration: "4:22", note: "" }, // 原文件 IMG_6537.MP4
  { title: "Groupie Love", videoUrl: VIDEO_BASE + "Grupie_Love.MP4", thumbnail: "media/covers/14.jpg", duration: "3:52", note: "" }, // 原文件 IMG_6577.MP4
  { title: "Get Free", videoUrl: VIDEO_BASE + "Get_Free.MP4", thumbnail: "media/covers/15.jpg", duration: "3:46", note: "" }, // 原文件 IMG_6648.MP4
  { title: "TV in Black and White", videoUrl: VIDEO_BASE + "TV_in_Black_and_White.MP4", thumbnail: "media/covers/16.jpg", duration: "4:11", note: "" }, // 原文件 IMG_6632.MP4
  { title: "Ride", videoUrl: VIDEO_BASE + "Ride.MP4", thumbnail: "media/covers/17.jpg", duration: "5:02", note: "" }, // 原文件 IMG_6729.MP4
];
