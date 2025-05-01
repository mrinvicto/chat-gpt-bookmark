interface Bookmark {
    url: string;
    title: string;
}

// Storage Operations
export const StorageUtils = {
    getBookmarks(): Bookmark[] {
        const storedBookmarks = localStorage.getItem("chatGPTBookmarks");
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    },

    saveBookmark(bookmark: Bookmark): void {
        const bookmarks = this.getBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('chatGPTBookmarks', JSON.stringify(bookmarks));
    },

    bookmarkExists(url: string): boolean {
        const bookmarks = this.getBookmarks();
        return bookmarks.some(b => b.url === url);
    },

    getLocalBookmarkLink(): Bookmark | null {
        const linkString = sessionStorage.getItem('localBookmarkLink');
        return linkString ? JSON.parse(linkString) : null;
    },

    setLocalBookmarkLink(link: Bookmark): void {
        sessionStorage.setItem('localBookmarkLink', JSON.stringify(link));
    },

    removeBookmark(url: string): void {
        const bookmarks = this.getBookmarks();
        const filteredBookmarks = bookmarks.filter(b => b.url !== url);
        localStorage.setItem('chatGPTBookmarks', JSON.stringify(filteredBookmarks));
    }
};