function initAccordion() {
    var accordionObj = {
        container: document.querySelector('.index__left__accordion')
    };

    if (!accordionObj.container) return;

    accordionObj.mainHeader = accordionObj.container.querySelector('.index__left__accordion__header');
    accordionObj.mainCategories = accordionObj.container.querySelectorAll(':scope > .index__left__accordion__item');

    var initialState = window.innerWidth < 1240 ? 'none' : 'block';
    for (var i = 0; i < accordionObj.mainCategories.length; i++) {
        accordionObj.mainCategories[i].style.display = initialState;
    }

    accordionObj.mainHeader.addEventListener('click', function (e) {
        e.preventDefault();
        var areVisible = accordionObj.mainCategories.length > 0 &&
            getComputedStyle(accordionObj.mainCategories[0]).display !== 'none';
        for (var i = 0; i < accordionObj.mainCategories.length; i++) {
            accordionObj.mainCategories[i].style.display = areVisible ? 'none' : 'block';
        }
    });

    for (var i = 0; i < accordionObj.mainCategories.length; i++) {
        (function (item) {
            var title = item.querySelector('.index__left__accordion__title');
            var content = item.querySelector('.index__left__accordion__content');
            if (title && content) {
                title.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (getComputedStyle(content).display === 'none') {
                        content.style.display = 'block';
                        var icon = title.querySelector('.index__left__accordion__icon');
                        if (icon) { icon.textContent = '−'; }
                    } else {
                        content.style.display = 'none';
                        var icon = title.querySelector('.index__left__accordion__icon');
                        if (icon) { icon.textContent = '+'; }
                    }
                });
            }
        })(accordionObj.mainCategories[i]);
    }
}

window.initAccordion = initAccordion;
