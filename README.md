# 臺灣旅遊網站
![image](https://user-images.githubusercontent.com/69808055/179402013-41e767e2-04d8-40f9-9d8a-440a56cc129a.png)

## 使用方法
直接前往 https://2021thef2e-week1.vercel.app/ 瀏覽網站，點擊各個卡片，會跳轉到該景點、活動或餐廳的資訊頁。在主頁搜尋，或是點擊導覽列的選項，會跳轉到列表頁。

## 專案說明
- 這是由六角學院發起的活動 - [The F2E 前端 & UI 修煉精神時光屋](https://2021.thef2e.com/)，本次主題為**臺灣旅遊網**，串接了[交通部 TDX API](https://tdx.transportdata.tw/)。
- 使用 React 搭配 TypeScript 進行開發。
- 樣式部分，使用 Tailwind CSS 及 Material UI，同時也是我第一次使用 Tailwind CSS。
- 設計部分，感謝[設計師](https://2021.thef2e.com/users/6296427084285739247/)，[設計稿 Figma 在此](https://www.figma.com/file/5HQAZ2bunGNKma2fwU0aNZ/The-F2E-3rd---Week1-%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=5%3A1106)。

## 資料夾結構
```
└─src
    │
    ├─api                          # API 相關，使用 Axios
    │
    ├─components                   # 將常用樣式、功能切成 component 以重複使用
    │  └─Carousel                  # 使用 Swiper 來實現 Carousel 功能
    │
    ├─containers                   # 各頁面
    │
    ├─images
    │
    ├─styles                       # 預設樣式
    │
    └─types                        # TypeScript 的型別
    │
    └─utils                        # 常用 consants、functions
```
