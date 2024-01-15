import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { like, disLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
   
  const appHtml = posts.map((post, index) => {

    const likesCounter = post.likes.length;
    let firstLiker = null;
    const moreLikers = String(" еще " + (post.likes.length - 1));

    const likersRenderApp = () => {
      if (likesCounter === 0) {
          return "";
      } 
      
      if (likesCounter === 1) {
          firstLiker = post.likes[0].name;
          return `Нравится: <span><strong>${firstLiker}</strong></span>`;
      } else if (likesCounter > 1) {
          firstLiker = post.likes[0].name;
          return `Нравится: <span><strong>${firstLiker}</strong></span> и <span></span><span><strong>${moreLikers}</strong></span>`;
      }

    };

    const createdTimeToNow = formatDistanceToNow(new Date(post.createdAt), {locale: ru});
    
    return `
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
          <button data-post-id="${index}" class="like-button">
            <img style="${post.isLiked === false ? "display: block" : "display: none"}" src="./assets/images/like-not-active.svg">
            <img style="${post.isLiked === true ? "display: block" : "display: none"}" src="./assets/images/like-active.svg">
          </button>
          <p class="post-likes-text">
            ${likersRenderApp("")}
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
      <br>
    </ul>`;
  }).join('');

  appEl.innerHTML = `
    <div class="page-container">
      <div class="header-container"></div>
      ${appHtml}
    </div>`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const likeButtons = document.querySelectorAll(".like-button");

  for (let likeButton of likeButtons) {


    // Форма логина - перерисовываем только кусок разметки (не целиком) - попробовать реализовать

    likeButton.addEventListener("click", () => {

      if (getToken() === undefined) {
        return likeButton.disabled = true;
      } else {
        likeButton.disabled = false;
      }
      
      const index = likeButton.dataset.postId;   

      if (posts[index].isLiked === false) {
        posts[index].likes.length += 1;
        posts[index].isLiked = !posts[index].isLiked;
        like({ posts, getToken, index }).then(() => {
          return renderPostsPageComponent({ appEl })
        })

      } else {
        posts[index].likes.length += -1;
        posts[index].isLiked = !posts[index].isLiked;
        disLike({ posts, getToken, index }).then(() => {
          return renderPostsPageComponent({ appEl })
        })
      }
       
    });
  }

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.disabled = false;
    userEl.addEventListener("click", () => {
      
      console.log(userEl.dataset.userId)
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
