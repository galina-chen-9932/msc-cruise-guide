document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有 Day 數字按鈕
    const dayButtons = document.querySelectorAll('.day-num');
    
    // 獲取所有的行程內容區塊 (假設您的內容區塊有一個共同的 class，例如 .day-content)
    // ⚠️ 備註：請確保您的 index.html 內有類似 <div class="day-content" id="day-01">...</div> 的結構
    const contentSections = document.querySelectorAll('.day-content');

    // 判斷當前哪個 Day 應該是 active (預設是 Day 01)
    let activeDay = 'day-01'; 

    // 處理點擊事件
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDay = button.getAttribute('data-day');

            // 1. 移除所有按鈕的 active 狀態
            dayButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. 將被點擊的按鈕設為 active 狀態
            button.classList.add('active');
            
            // 3. 滾動到正確的 Day 位置 (這部分需要 index.html 內容配合)
            
            // 4. (可選) 隱藏/顯示對應的內容區塊
            // if (contentSections.length > 0) {
            //     contentSections.forEach(section => {
            //         if (section.id === targetDay) {
            //             section.style.display = 'block';
            //         } else {
            //             section.style.display = 'none';
            //         }
            //     });
            // }

            // 更新活躍 Day 狀態
            activeDay = targetDay;
            console.log(`切換到：${activeDay}`);
        });
    });
    
    // 確保 Day 01 預設為 active
    const defaultActiveButton = document.querySelector('[data-day="day-01"]');
    if (defaultActiveButton) {
        defaultActiveButton.classList.add('active');
    }
});