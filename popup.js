// Popup JavaScript for YouTube Music Light Theme Extension

document.addEventListener('DOMContentLoaded', function() {
    
    // Open YouTube Music button
    document.getElementById('openYTMusic').addEventListener('click', function() {
        chrome.tabs.create({
            url: 'https://music.youtube.com'
        });
        window.close();
    });
    
    // Reload current page link
    document.getElementById('reloadPage').addEventListener('click', function(e) {
        e.preventDefault();
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url.includes('music.youtube.com')) {
                chrome.tabs.reload(tabs[0].id);
                window.close();
            } else {
                // If not on YouTube Music, open it instead
                chrome.tabs.create({
                    url: 'https://music.youtube.com'
                });
                window.close();
            }
        });
    });
    
    // Check if current tab is YouTube Music and update status
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        const statusDiv = document.querySelector('.status');
        
        if (currentTab && currentTab.url && currentTab.url.includes('music.youtube.com')) {
            statusDiv.innerHTML = '✅ Light theme is active on this page!';
            statusDiv.className = 'status active';
        } else {
            statusDiv.innerHTML = '💡 Visit YouTube Music to see the light theme';
            statusDiv.className = 'status';
            statusDiv.style.background = '#fff3cd';
            statusDiv.style.borderColor = '#ffc107';
            statusDiv.style.color = '#856404';
        }
    });
    
});