import { StorageUtils } from "./storageUtils";
import { DOMUtils } from "./domUtils";

export const BookmarkManager = {
    generateBookmarkHTML(bookmark) {
        return `
            <li class="relative" data-testid="history-item-3">
                <div draggable="true" class="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm screen-arch:bg-transparent relative" style="--item-background-color: var(--sidebar-surface-primary);">
                    <a class="motion-safe:group-active:screen-arch:scale-[98%] motion-safe:group-active:screen-arch:transition-transform motion-safe:group-active:screen-arch:duration-100 flex items-center gap-2 p-2" data-history-item-link="true" href="${bookmark.url}" data-discover="true" style="mask-image: var(--sidebar-mask);">
                        <div class="relative grow overflow-hidden whitespace-nowrap" dir="auto" title="${bookmark.title}">${bookmark.title}</div>
                    </a>
                </div>
            </li>
        `;
    },

    generateBookmarksListHTML() {
        const bookmarks = StorageUtils.getBookmarks();
        return bookmarks.map(this.generateBookmarkHTML).join("");
    },

    createBookmarksSection() {
        return `
            <div class="relative mt-5 first:mt-0 last:mb-5">
                <div class="bg-token-sidebar-surface-primary sticky top-0 z-20">
                    <span class="flex h-9 items-center">
                        <h3 class="px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">Bookmarks</h3>
                    </span>
                </div>
                <ol>
                    ${this.generateBookmarksListHTML()}    
                </ol>
            </div>
        `;
    },

    handleBookmarkClick() {
        const bookmarkLink = StorageUtils.getLocalBookmarkLink();
        if (!bookmarkLink) {
            alert("No bookmark link found");
            return;
        }

        const { url, title } = bookmarkLink;
        if (StorageUtils.bookmarkExists(url)) {
            alert(`✅ Already bookmarked: ${title}`);
            return;
        }

        StorageUtils.saveBookmark(bookmarkLink);
        alert(`🔖 Bookmarked: ${title}`);
        DOMUtils.removeBookmarkList();
    }
};