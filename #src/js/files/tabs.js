 //  tabs
let tabsParent = document.querySelectorAll('._tabs');
if(tabsParent.length > 0){
    tabsParent.forEach(element => {
        let tabs = element.querySelectorAll('._tabs-item'),
        tabsContent = element.querySelectorAll('._tab-block');

        function hideTabsContent(){
        tabsContent.forEach(item => {
            item.classList.remove('_active');
        });

        tabs.forEach(item => {
            item.classList.remove('_active');
        });
        };

        let showTabsContent = function (i = 0){
            tabsContent[i].classList.add('_active');
            tabs[i].classList.add('_active');
        }

        hideTabsContent();
        showTabsContent(0);

        element.addEventListener('click', (event) => {
        const targetElement = event.target;
        
        if( targetElement && targetElement.classList.contains('_tabs-item') || targetElement && targetElement.closest('._tabs-item')){
            hideTabsContent();
            
            tabs.forEach((item, i)=>{
                if(targetElement.closest('._tabs-item') == item){
                    showTabsContent(i);
                }
                });
        }
        });
    });
}
 