document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('theme-toggle');
            const themeIconLight = document.getElementById('theme-icon-light');
            const themeIconDark = document.getElementById('theme-icon-dark');
            const messageField = document.getElementById('messageField');

            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    themeIconLight.classList.add('hidden');
                    themeIconDark.classList.remove('hidden');
                } else {
                    document.documentElement.classList.remove('dark');
                    themeIconLight.classList.remove('hidden');
                    themeIconDark.classList.add('hidden');
                }
            };
            
            const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(currentTheme);

            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                const newTheme = isDark ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });

            const autoResizeTextarea = () => {
                messageField.style.height = 'auto';
                messageField.style.height = `${messageField.scrollHeight}px`;
            };

            messageField.addEventListener('input', autoResizeTextarea);
            messageField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('Sending message:', messageField.value);
                    messageField.value = '';
                    autoResizeTextarea();
                }
            });

            autoResizeTextarea();

            const historyToggle = document.getElementById('history-toggle');
            if (historyToggle) {
                const mainGrid = document.getElementById('mainGrid');
                const chatHistoryList = document.getElementById('chatHistoryList');
                const historyToggleIcon = document.getElementById('history-toggle-icon');

                historyToggle.addEventListener('click', () => {
                    const isCollapsed = chatHistoryList.classList.contains('hidden');

                    if (isCollapsed) {
                        chatHistoryList.classList.remove('hidden');
                        mainGrid.classList.remove('grid-rows-[68px_1fr]');
                        mainGrid.classList.add('grid-rows-[330px_1fr]');
                        historyToggleIcon.classList.remove('rotate-180');
                    } else {
                        chatHistoryList.classList.add('hidden');
                        mainGrid.classList.remove('grid-rows-[330px_1fr]');
                        mainGrid.classList.add('grid-rows-[68px_1fr]');
                        historyToggleIcon.classList.add('rotate-180');
                    }
                });
            }

            const mdBreakpoint = 768;
            const handleResize = () => {
                if (window.innerWidth >= mdBreakpoint) {
                    const mainGrid = document.getElementById('mainGrid');
                    const chatHistoryList = document.getElementById('chatHistoryList');
                    const historyToggleIcon = document.getElementById('history-toggle-icon');

                    chatHistoryList.classList.remove('hidden');

                    if (historyToggleIcon) {
                        historyToggleIcon.classList.remove('rotate-180');
                    }
                }
            };

            window.addEventListener('resize', handleResize);
            handleResize();
        });