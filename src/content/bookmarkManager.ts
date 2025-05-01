import { StorageUtils } from "./storageUtils";
import { DOMUtils } from "./domUtils";

export const BookmarkManager = {
    generateBookmarkHTML(bookmark: { url: string, title: string }) {
        return `
            <li class="relative" data-testid="history-item-3">
                <div draggable="true" class="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm screen-arch:bg-transparent relative flex items-center justify-between" style="--item-background-color: var(--sidebar-surface-primary);">
                    <a class="motion-safe:group-active:screen-arch:scale-[98%] motion-safe:group-active:screen-arch:transition-transform motion-safe:group-active:screen-arch:duration-100 flex items-center gap-2 p-2 flex-grow" data-history-item-link="true" href="${bookmark.url}" data-discover="true" style="mask-image: var(--sidebar-mask);">
                        <div class="relative grow overflow-hidden whitespace-nowrap" dir="auto" title="${bookmark.title}">${bookmark.title}</div>
                    </a>
                    <button class="delete-bookmark ml-auto hover:text-red-500 transition-colors" data-url="${bookmark.url}" title="Delete bookmark">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
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
            // alert(`✅ Already bookmarked: ${title}`);
            return;
        }

        StorageUtils.saveBookmark(bookmarkLink);
        // alert(`🔖 Bookmarked: ${title}`);
        DOMUtils.removeBookmarkList();
    },

    handleDeleteBookmark(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.target as HTMLElement;
        const url = button.closest('button')?.dataset.url;
        
        if (!url) return;
        
        StorageUtils.removeBookmark(url);
        DOMUtils.removeBookmarkList();
    }
};