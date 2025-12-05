document.addEventListener('DOMContentLoaded', function() {
    // 總天數
    const totalDays = 16;
    // 行程內容區容器
    const contentContainer = document.querySelector('.timeline-container');
    // 建立日期的 Tab 容器 (假設你的 HTML 中已經有 <div id="day-tabs"></div>)
    // 如果你沒有這個容器，請在 HTML 的行程區塊上方加上 <div id="day-tabs" class="day-tabs-container"></div>
    const tabContainer = document.getElementById('day-tabs');

    // 1. 檢查 Tab 容器是否存在
    if (!tabContainer) {
        console.error('Missing #day-tabs container in HTML. Please add <div id="day-tabs" class="day-tabs-container"></div>');
        return; // 如果沒有容器，則停止執行
    }

    // 2. 動態生成 Tab 按鈕
    for (let i = 1; i <= totalDays; i++) {
        const dayId = `day-${i.toString().padStart(2, '0')}`;
        const button = document.createElement('button');
        button.className = 'day-tab-btn';
        button.id = `tab-${dayId}`;
        button.textContent = `Day ${i}`;
        button.setAttribute('data-day-id', dayId);
        tabContainer.appendChild(button);
    }

    // 3. 處理 Tab 點擊事件
    tabContainer.addEventListener('click', function(event) {
        const button = event.target.closest('.day-tab-btn');
        if (button) {
            const targetDayId = button.getAttribute('data-day-id');
            showDayContent(targetDayId);
        }
    });

    /**
     * 顯示特定日期的內容
     * @param {string} targetDayId - 格式為 'day-01' 到 'day-16'
     */
    function showDayContent(targetDayId) {
        // 隱藏所有行程內容
        const allContents = document.querySelectorAll('.day-content');
        allContents.forEach(content => {
            content.style.display = 'none';
        });

        // 移除所有按鈕的 active 樣式
        const allTabs = document.querySelectorAll('.day-tab-btn');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // 顯示目標行程內容並讓它捲動到頂部
        const targetContent = document.getElementById(targetDayId);
        if (targetContent) {
            targetContent.style.display = 'block';
            // 可選：讓頁面捲動到行程內容的上方
            // targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // 為目標按鈕增加 active 樣式
        const targetTab = document.getElementById(`tab-${targetDayId}`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }

    // 4. 初始化：根據今天的日期決定顯示哪個行程

    // 假設行程的開始日期是 2026/4/09
    const startDate = new Date('2026-04-09');
    const today = new Date();
    // 將今天和開始日期都設為午夜，確保日期計算準確
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 計算兩日期的毫秒差
    const timeDiff = today.getTime() - startDate.getTime();
    // 將毫秒差轉換為天數
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 計算應該顯示第幾天 (Day 1 是 dayDiff = 0)
    let currentDayIndex = dayDiff + 1;

    // 確保索引在 1 到 totalDays 之間
    if (currentDayIndex < 1 || currentDayIndex > totalDays) {
        // 如果不在行程日期內，則預設顯示 Day 1
        currentDayIndex = 1;
    }

    const initialDayId = `day-${currentDayIndex.toString().padStart(2, '0')}`;
    showDayContent(initialDayId);
});