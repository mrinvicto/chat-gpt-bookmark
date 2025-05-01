// Storage Operations
export const StorageUtils = {
    getBookmarks() {
        const storedBookmarks = localStorage.getItem("chatGPTBookmarks");
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    },

    saveBookmark(bookmark) {
        const bookmarks = this.getBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('chatGPTBookmarks', JSON.stringify(bookmarks));
    },

    bookmarkExists(url) {
        const bookmarks = this.getBookmarks();
        return bookmarks.some(b => b.url === url);
    },

    getLocalBookmarkLink() {
        const linkString = sessionStorage.getItem('localBookmarkLink');
        return linkString ? JSON.parse(linkString) : null;
    },

    setLocalBookmarkLink(link) {
        sessionStorage.setItem('localBookmarkLink', JSON.stringify(link));
    }
};