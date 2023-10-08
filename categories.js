const categories = () => {

    const elements = document.querySelectorAll('.categories');

    const category = (el) => {

        const desktopToggler = el.querySelector('.categories-desktop-toggler');
        const mobileToggler = el.querySelector('.categories-mobile-toggler');
        const con = el.querySelector('.categories-container');
        const list = el.querySelector('.categories-main-list')
        const firstList = el.querySelector('.categories-first-list');
        const secondList = el.querySelector('.categories-second-list');
        const thirdList = el.querySelector('.categories-third-list');
        const listItems = list.querySelectorAll('.categories-item');

        // functions
        const getRandomId = () => Math.floor((Math.random() * 1000000) * (Math.random() * 1000000))

        const isMobile = () => window.innerWidth > 992 ? false : true;

        function toggleOnMobile(e) {
            if (!isMobile()) return;
            e.stopPropagation();
            const con = this.querySelector('.categories-hidden-list');
            this?.classList.toggle('active-on-mobile');
            con?.classList.toggle('show-on-mobile');
        }

        const toggle = () => {
            con.classList.toggle('show-on-mobile');
            mobileToggler.classList.toggle('active');
        }

        const hideOtherContainers = () => {
            if (isMobile()) return;
            secondList.innerHTML = '';
            thirdList.innerHTML = '';
            secondList.classList.remove('show');
            thirdList.classList.remove('show');
            el.querySelectorAll('.categories-item').forEach((item) => { item.classList.remove('active'); })
        }

        function setList(e) {
            
            e.stopPropagation();
            if (isMobile()) return;
            const hiddenList = this.querySelector('.categories-hidden-list');
            const isSecondList = this.closest('.categories-second-list');
            const isThirdList = this.closest('.categories-third-list');

            if (!isThirdList) {
                el.querySelectorAll('.categories-item').forEach((item) => { if ( item.id != this.getAttribute('parent-id')) item.classList.remove('active'); })
                this.classList.add('active');
            }

            if (isThirdList) return;
            
            if (!hiddenList && isSecondList) {
                thirdList.innerHTML = '';
                thirdList.classList.remove('show');
                return;
            } else if (!hiddenList && !isSecondList && !isThirdList) {
                secondList.innerHTML = '';
                thirdList.innerHTML = '';
                secondList.classList.remove('show');
                thirdList.classList.remove('show');
                return;
            }

            const clonedElements = Array.from(hiddenList.children).map((element) => element.cloneNode(true));
           
            thirdList.innerHTML = '';
        
            clonedElements.forEach((clonedElement) => {

                const items = clonedElement.querySelectorAll('.categories-item');
                items.forEach((item) => { item.addEventListener('mouseenter', setList); })

                if (isSecondList) {
                    thirdList.classList.add('show');
                    thirdList.innerHTML = '';
                    thirdList.appendChild(clonedElement); 
                } else { 
                    secondList.innerHTML = '';
                    secondList.classList.add('show');
                    secondList.appendChild(clonedElement); 
                }

            });
        
        }

        const setListIds = () => {
            const mainItems = el.querySelectorAll('.categories-main-list > .categories-item');
            mainItems.forEach((item) => { 
                const id = getRandomId();
                item.setAttribute('id', id);
                const childItems = item.querySelectorAll('.categories-item');
                childItems.forEach((item) => { 
                    item.setAttribute('parent-id', id);
                })
            })
        }

        // adding-events
        mobileToggler.addEventListener('click', toggle);
        el.addEventListener('mouseleave', hideOtherContainers);
        listItems.forEach((item) => { item.addEventListener('mouseenter', setList); item.addEventListener('click', toggleOnMobile)})
        setListIds();
    }

    elements.forEach((item) => { category(item); })

}

categories();