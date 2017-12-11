myApp.directive('todolistCtrl', function () {
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        templateUrl: 'angular/directives/to-do-list/to-do-list.html',
        link: function (scope, element, attrs) {
            const addItems = document.querySelector('#add-items');
            const selectAll = document.querySelector('[name=select-all]');
            const unSelectAll = document.querySelector('[name=unselect-all]');
            const clearList = document.querySelector('[name=clear-all]');
            const itemsList = document.querySelector('#theList');
            const items = JSON.parse(localStorage.getItem('items')) || [];

            function addItem(e) {
                e.preventDefault();
                const text = (this.querySelector('[name=item]')).value;
                const item = {
                    text,
                    done: false
                }

                // add item to items array and store array in localstorage
                items.push(item);
                populatelist(items, itemsList);
                localStorage.setItem('items', JSON.stringify(items));

                // clear the inputfield
                this.reset();

            }

            // populate the list. recreates entire list everytime, look into framework solution: angular, react
            function populatelist(listItems = [], itemsList) {
                itemsList.innerHTML = listItems.map((item, i) => {
                    return `<li class="list-group-item">
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
                <label for="item${i}" class="strikey">${item.text}</label>`;
                }).join('');

            }

            function toggleDone(e) {
                if (!e.target.matches('input')) return;
                const el = e.target;
                const index = el.dataset.index;
                items[index].done = !items[index].done;
                localStorage.setItem('items', JSON.stringify(items));
                populatelist(items, itemsList);
            }

            function selectAllItems() {
                var cheese = items;
                for (var i = 0; i < cheese.length; i++) {
                    cheese[i].done = true;
                }
                localStorage.setItem('items', JSON.stringify(cheese));
                populatelist(cheese, itemsList);
            }

            function unSelectAllItems() {
                var cheese = items;
                for (var i = 0; i < cheese.length; i++) {
                    cheese[i].done = false;
                }
                localStorage.setItem('items', JSON.stringify(cheese));
                populatelist(cheese, itemsList);
            }

            function clearAllItems() {
                items.length = 0;
                localStorage.clear();
                populatelist(items, itemsList);
            }

            // event listeners
            addItems.addEventListener('submit', addItem);
            selectAll.addEventListener('click', selectAllItems);
            unSelectAll.addEventListener('click', unSelectAllItems);
            itemsList.addEventListener('click', toggleDone);
            clearList.addEventListener('click', clearAllItems);
            populatelist(items, itemsList);


        }
    };
});