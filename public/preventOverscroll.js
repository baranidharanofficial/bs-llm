// preventOverscroll.js
export function preventOverscroll() {
    document.addEventListener('DOMContentLoaded', function () {
        // Find the scrollable container element
        var scrollableElement = document.getElementById('yourScrollableElementId');

        // Add an event listener to the scrollable element
        scrollableElement.addEventListener('touchmove', function (e) {
            // Check if the scroll is at the top or bottom
            var atTop = scrollableElement.scrollTop === 0;
            var atBottom = scrollableElement.scrollHeight - scrollableElement.scrollTop === scrollableElement.clientHeight;

            // If at the top or bottom, prevent the default behavior to disable overscroll
            if ((atTop && e.deltaY > 0) || (atBottom && e.deltaY < 0)) {
                e.preventDefault();
            }
        });
    });
}
