export const DOMUtils = {
  findGroupsInSidebar(): NodeListOf<Element> {
    return document.querySelectorAll('div[class*="group/sidebar"]');
  },

  findMenuElement(): HTMLDivElement | null {
    return document.querySelector('div[role="menu"]');
  },

  findExistingMenuItem(
    menu: HTMLDivElement | null,
  ): Element | null | undefined {
    return menu?.querySelector('[role="menuitem"]');
  },

  createBookmarkDiv(existingItem: Element): HTMLElement {
    const bookmarkDiv = existingItem.cloneNode(true) as HTMLElement;
    bookmarkDiv.id = "bookmark-convo-option";
    bookmarkDiv.textContent = "🔖 Bookmark";
    return bookmarkDiv;
  },

  findBookmarkContainer(group: Element): HTMLElement | undefined {
    const elements = Array.from(document.querySelectorAll("div#history"));
    return elements[0] as HTMLElement | undefined;
  },

  createBookmarksContainer(): HTMLDivElement {
    const newDiv = document.createElement("div");
    newDiv.id = "inserted-div-id";
    return newDiv;
  },

  removeBookmarkList(): void {
    const element = document.getElementById("inserted-div-id");
    if (element) {
      element.remove();
    }
  },
};
