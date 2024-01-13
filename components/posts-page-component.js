import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  // for (const id of posts.likes) {
    // id = posts.likes.id;
  // }

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts.map((post) => {

    const likesCounter = post.likes.length;
    const firstLiker = String(post.likes[0]['name']);
    const moreLikers = String(" еще " + (post.likes.length - 1));

    const likersApp = (likersElement) => {
      if (likesCounter > 1) {
        return likersElement = `Нравится: <span><strong>${firstLiker}</strong></span> и <span></span><span><strong>${moreLikers}</strong></span>`;
      } else if (likesCounter > 0) {
        return likersElement = `Нравится: <span><strong>${firstLiker}</strong></span>`;
      } else {
        return "";
      }
    };

    const createdTimeToNow = formatDistanceToNow(new Date(post.createdAt), {inincludeSeconds: true});
    
    return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="" class="like-button">
              <img style="${post.isLiked === false ? "display: block" : "display: none"}" src="./assets/images/like-not-active.svg">
              <img style="${post.isLiked === true ? "display: block" : "display: none"}" src="./assets/images/like-active.svg">
            </button>
            <p class="post-likes-text">
              ${likersApp()}
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${createdTimeToNow}
          </p>
        </li>
      </ul>
    </div>`;
  }).join('');

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
