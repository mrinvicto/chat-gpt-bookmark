import { BookmarkManager } from "./bookmarkManager";
import { DOMUtils } from "./domUtils";
import { StorageUtils } from "./storageUtils";

const injectBookmarkOption = () => {
  const menu = DOMUtils.findMenuElement();
  if (!menu) return;

  if (document.getElementById("bookmark-convo-option")) return;

  const existingItem = DOMUtils.findExistingMenuItem(menu);
  if (!existingItem) return;

  const bookmarkDiv = DOMUtils.createBookmarkDiv(existingItem);
  bookmarkDiv.onclick = BookmarkManager.handleBookmarkClick;

  const parentNode = existingItem.parentNode;
  if (!parentNode) return;

  parentNode.appendChild(bookmarkDiv);
};

const handleChatClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target) return;

  const button = target.closest("button");
  if (!button) return;

  const chatListItem = button.closest("li");
  if (!chatListItem) return;

  const link = chatListItem.querySelector("a");
  if (link && link.href) {
    const firstChild = link.childNodes[0] as HTMLElement;
    StorageUtils.setLocalBookmarkLink({
      url: link.href,
      title: firstChild.innerText,
    });
  }
};

// Main Initialization
function initializeBookmarkFeature() {
  const observer = new MutationObserver(() => {
    injectBookmarkOption();

    // Set up bookmark deletion handler
    document.querySelectorAll(".delete-bookmark").forEach((button) => {
      button.removeEventListener("click", BookmarkManager.handleDeleteBookmark);
      button.addEventListener("click", BookmarkManager.handleDeleteBookmark);
    });

    DOMUtils.findGroupsInSidebar().forEach((group) => {
      const target = DOMUtils.findBookmarkContainer(group);
      if (!target) {
        console.error("❌ Target container not found.");
        return;
      }

      if (document.getElementById("inserted-div-id")) return;

      const grandparent = target.parentElement?.parentElement;
      if (!grandparent) {
        console.error("❌ Grandparent element is not available.");
        return;
      }

      const grandparentParent = grandparent.parentElement;
      if (!grandparentParent) {
        console.error("❌ Grandparent's parent is not available.");
        return;
      }

      const bookmarksContainer = DOMUtils.createBookmarksContainer();
      bookmarksContainer.innerHTML = BookmarkManager.createBookmarksSection();
      grandparentParent.insertBefore(bookmarksContainer, grandparent);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  document.body.addEventListener("click", handleChatClick);
}

// Start the application
initializeBookmarkFeature();
