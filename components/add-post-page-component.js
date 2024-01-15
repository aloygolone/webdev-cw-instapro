import { addPost } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js"

export function renderAddPostPageComponent({ appEl }) {
  let imageUrl = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml =`
    <div class="page-container">
      <div class="header-container">
      </div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
          <div class="upload=image">
            <label class="file-upload-label secondary-button">
              <input type="file" class="file-upload-input" style="display:none">
              Выберите фото
            </label>    
          </div>
          </div>
          <label>
          Опишите фотографию:
          <textarea id="textarea" class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    for (let userEl of document.querySelectorAll(".post-header")) {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.userId,
        });
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const discription = document.getElementById("textarea").value;

      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }

      if (!discription) {
        alert("Нужно добавить описание")
        return;
      }

      console.log(discription, imageUrl)

      addPost({
        discription: discription.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        imageUrl: imageUrl,
      })
      
    });

  //   document.getElementById("add-button").addEventListener("click", () => {
  //     setError("");

  //     if (isLoginMode) {
  //       const login = document.getElementById("login-input").value;
  //       const password = document.getElementById("password-input").value;

  //       if (!login) {
  //         alert("Введите логин");
  //         return;
  //       }

  //       if (!password) {
  //         alert("Введите пароль");
  //         return;
  //       }

  //       loginUser({
  //         login: login,
  //         password: password,
  //       })
  //         .then((user) => {
  //           setUser(user.user);
  //         })
  //         .catch((error) => {
  //           console.warn(error);
  //           setError(error.message);
  //         });
  //     } else {
  //       const login = document.getElementById("login-input").value;
  //       const name = document.getElementById("name-input").value;
  //       const password = document.getElementById("password-input").value;
  //       if (!name) {
  //         alert("Введите имя");
  //         return;
  //       }
  //       if (!login) {
  //         alert("Введите логин");
  //         return;
  //       }

  //       if (!password) {
  //         alert("Введите пароль");
  //         return;
  //       }

  //       if (!imageUrl) {
  //         alert("Не выбрана фотография");
  //         return;
  //       }

  //       registerUser({
  //         login: login,
  //         password: password,
  //         name: name,
  //         imageUrl,
  //       })
  //         .then((user) => {
  //           setUser(user.user);
  //         })
  //         .catch((error) => {
  //           console.warn(error);
  //           setError(error.message);
  //         });
  //     }
  //   });
  };

  render();
}
