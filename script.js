// 定義行程日期的範圍，用於產生 Day Tab
const totalDays = 16; // 📌 請將這個數字從 12 改成 16
const tabContainer = document.getElementById('day-tabs');
const dayContents = document.querySelectorAll('.day-content');
const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

// 預設要顯示的頁面 ID
const defaultPageId = 'day-01';

/**
 * 1. 動態產生 Day Tabs 標籤
 */
function createDayTabs() {
    for (let i = 1; i <= totalDays; i++) {
        // 格式化數字為兩位數 (01, 02, ...)
        const dayNumber = String(i).padStart(2, '0');
        const dayId = `day-${dayNumber}`;

        const tab = document.createElement('a');
        tab.href = `#${dayId}`;
        tab.classList.add('day-tab');
        tab.dataset.page = dayId; // 用於後續點擊事件識別
        tab.textContent = `Day ${dayNumber}`;

        // 設定預設活躍狀態：如果 ID 匹配預設頁面，則設定 active
        if (dayId === defaultPageId) {
            tab.classList.add('active');
        }

        tabContainer.appendChild(tab);
    }
}


/**
 * 2 & 3. 處理頁面切換邏輯 (包括 Day Tabs 和 Bottom Nav)
 * @param {string} targetPageId - 目標頁面的 ID (例如: 'day-05' 或 'page-explore')
 */
function switchPage(targetPageId) {
    // 隱藏所有內容頁面
    dayContents.forEach(content => {
        content.style.display = 'none';
    });

    // 顯示目標內容頁面
    const targetContent = document.getElementById(targetPageId);
    if (targetContent) {
        targetContent.style.display = 'block';

        // 滾動到頁面頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 更新 Header 標題 
        updateHeaderTitle(targetPageId);
    }
}

/**
 * 處理 Tab 標籤和導航列的點擊事件，並更新 active 狀態
 * @param {HTMLElement} element - 被點擊的元素 (Day Tab 或 Nav Item)
 */
function handleNavigation(element) {
    const targetPageId = element.dataset.page;

    // 移除所有 Day Tabs 的 active 狀態
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // 移除所有 Bottom Nav Items 的 active 狀態
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
    });

    // 判斷目標頁面 ID 是否為 Day Content (例如 'day-05')
    const isDayContent = targetPageId.startsWith('day-');

    if (isDayContent) {
        // 如果是行程日，則更新對應的 Day Tab 狀態
        const dayTab = document.querySelector(`.day-tab[data-page="${targetPageId}"]`);
        if (dayTab) {
            dayTab.classList.add('active');
        }
        // 將底部導航的「行程」按鈕設為 active (因為行程按鈕的 data-page 是 "day-05")
        document.querySelector('.bottom-nav .nav-item[data-page="day-05"]').classList.add('active');

    } else {
        // 如果是功能頁面 (探索/筆記/指南)，則更新對應的 Bottom Nav Item 狀態
        element.classList.add('active');
    }

    // 切換內容頁面
    switchPage(targetPageId);
}

/**
 * 更新動態次標題 (H2)
 * @param {string} pageId - 當前頁面的 ID
 */
function updateHeaderTitle(pageId) {
    // 獲取新的動態次標題元素
    const dynamicSubtitle = document.getElementById('dynamic-subtitle');
    let newTitle = ""; // 預設為空，避免顯示不必要的文字

    if (pageId.startsWith('day-')) {
        const dayNum = pageId.split('-')[1];
        newTitle = `地中海啟航 - Day ${dayNum}`; // 顯示 '地中海啟航 - Day 01'
    } else if (pageId === 'page-explore') {
        newTitle = "探索地圖與景點";
    } else if (pageId === 'page-notes') {
        newTitle = "我的筆記與備忘錄";
    } else if (pageId === 'page-guide') {
        newTitle = "旅遊指南與資訊";
    }

    dynamicSubtitle.textContent = newTitle; // 只更新這個 H2 元素
}

/**
 * 應用程式啟動入口
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 產生 Day Tabs
    createDayTabs();

    // 2. 設置 Day Tabs 的點擊事件監聽器
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(e.currentTarget);
        });
    });

    // 3. 設置 Bottom Nav 的點擊事件監聽器
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(e.currentTarget);
        });
    });

    // 4. 首次載入時，顯示預設頁面 (Day 05)
    switchPage(defaultPageId);
});