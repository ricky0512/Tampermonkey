// ==UserScript==
// @name         SameSite, CORS, and Alert on Keyword
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Example script for SameSite, CORS handling, and alerting on keyword in Tampermonkey
// @author       You
// @match        https://mail.google.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // 存儲 SameSite 屬性的值
    GM_setValue('SameSiteValue', 'None');

    // 模擬 XMLHttpRequest 請求
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://play.google.com/log?format=json&hasfast=true',
        headers: {
            'Content-Type': 'application/json',
            // 使用 SameSite 屬性的值
            'SameSite': GM_getValue('SameSiteValue'),
        },
        onload: function(response) {
            console.log(response.responseText);
        },
        onerror: function(error) {
            console.error(error);
        },
    });

    // 監聽郵件列表的變化
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // 檢查是否有新增的郵件
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                Array.from(mutation.addedNodes).forEach(function(node) {
                    // 檢查郵件主旨是否包含"特定字樣"    //改成你要找的主旨的關鍵字
                    if (node.classList.contains('zA') && node.querySelector('.bog span').innerText.includes('特定字樣')) {
                        // 發出警示聲
                        // 警示音檔案的 URL     //改成你的聲音檔位置
                        var alertSoundUrl = 'https://localhost/alert.mp3';
                        var audio = new Audio(alertSoundUrl);
                        audio.play();
                        //alert('發現包含特定字樣的郵件！');

                    }
                });
            }
        });
    });

    // 開始監聽郵件列表
    observer.observe(document.body, { childList: true, subtree: true });
})();
