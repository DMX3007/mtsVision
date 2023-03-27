import { useRef } from "react";
import videojs from "video.js";
import VideoJS from "./components/VideoJS";
import "./index.css";
import "./App.css";

const App = () => {
  const playerRef = useRef(null);

  const mode = {
    colorblind: {
      init: false,
      pro: false,
      deu: false,
      tri: false,
    },
    epil: false,
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    breakpoints: {
      medium: 100,
    },
    fluid: true,
    sources: [
      {
        src: "http://91.185.84.100:8888/video/stream/mp4/toystory",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    let button = player.controlBar.addChild("button");
    let buttDom = button.el();
    buttDom.classList.add("super-vision");
    buttDom.innerHTML = `<svg width="50" height="28" viewBox="2 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2H6L1.5 17V20.75M1.5 20.75C1.5 23.6495 3.8505 26 6.75 26C9.64949 26 12 23.6495 12 20.75C12 17.8505 9.64949 15.5 6.75 15.5C3.8505 15.5 1.5 17.8505 1.5 20.75ZM21 2H24L26.25 9.5L28.5 17V20.75M28.5 20.75C28.5 23.6495 26.1495 26 23.25 26C20.3505 26 18 23.6495 18 20.75C18 17.8505 20.3505 15.5 23.25 15.5C26.1495 15.5 28.5 17.8505 28.5 20.75ZM12 20H18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

    buttDom.onpointerdown = function () {
      const h2 = document.createElement("h1");
      h2.innerHTML = "Выберите подходящий режим воспроизведения";

      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper");

      const modalContainer = document.createElement("div");
      modalContainer.classList.add("modal-container");

      const modalContainer2 = document.createElement("div");
      modalContainer2.classList.add("modal-container");

      const epilButton = document.createElement("button");
      epilButton.textContent = "У меня есть эпилепсия";
      epilButton.classList.add("modal-item");

      epilButton.onpointerdown = function () {
        epilButton.classList.toggle("pressed");
        epilButton.classList.contains("pressed")
          ? (mode.epil = true)
          : (mode.epil = false);
      };

      const colBlindButton = document.createElement("button");
      colBlindButton.textContent = "Я различаю не все цвета";
      colBlindButton.classList.add("modal-item");

      colBlindButton.onpointerdown = function () {
        colBlindButton.classList.toggle("pressed");
        colBlindButton.classList.contains("pressed")
          ? (mode.colorblind.init = true)
          : (mode.colorblind.init = false);
        console.log(mode.colorblind.init);
      };

      const okButton = document.createElement("button");
      okButton.textContent = "ГОТОВО";
      okButton.classList.add("modal-item");

      okButton.onpointerdown = function () {
        okButton.classList.toggle("pressed");

        modal.close();

        modalContainer.removeChild(epilButton);
        modalContainer.removeChild(colBlindButton);
        modalContainer2.removeChild(okButton);

        const protan = document.createElement("button");
        protan.classList.add("modal-item");
        protan.textContent = "У меня Протанопия";

        const deutan = document.createElement("button");
        deutan.classList.add("modal-item");
        deutan.textContent = "У меня Дейтеранопия";

        const tritan = document.createElement("button");
        tritan.classList.add("modal-item");
        tritan.textContent = "У меня Тританопия";

        const okButton2 = document.createElement("button");
        okButton2.classList.add("modal-item");
        okButton2.textContent = "ГОТОВО";

        modalContainer.appendChild(protan);
        modalContainer.appendChild(deutan);
        modalContainer.appendChild(tritan);
        modalContainer2.appendChild(okButton2);

        okButton2.onpointerdown = function () {
          mod.close();
        };

        const mod = player.createModal(wrapper);
      };

      modalContainer.appendChild(epilButton);
      modalContainer.appendChild(colBlindButton);
      modalContainer2.appendChild(okButton);

      wrapper.appendChild(h2);
      wrapper.appendChild(modalContainer);
      wrapper.appendChild(modalContainer2);

      const modal = player.createModal(wrapper);

      modal.on("modalopen", function () {
        videojs.log("modalopen");
      });

      // const modalContent = `<button class="vjs-close-button vjs-control vjs-button" type="button" title="Close Modal Dialog" aria-disabled="false"><span class="vjs-icon-placeholder" aria-hidden="true"></span><span class="vjs-control-text" aria-live="polite">Close Modal Dialog</span></button><div class='modal-container'>
      //   <div class='modal-item'>Я различаю не все цвета
      //   </div>
      //   <div class='modal-item'>У меня есть эпилепсия</div>
      //   </div>
      //   <div class='modal-container'>
      //   <div class='modal-item'>Готово</div>
      // </div>`;

      // modalDom.innerHTML = "";
      modal.on("modalclose", function () {
        player.play();
      });
    };

    // let menu = player.controlBar.addChild("menu");
    // let menuDom = menu.el();
    // menuDom.innerHTML = "menu";

    // var MenuButton = videojs.getComponent("MenuButton");
    // var MenuItem = videojs.getComponent("MenuItem");

    // class CustomMenuButton extends MenuButton {
    //   createItems() {
    //     // Must return an array of `MenuItem`s
    //     // Options passed in `addChild` are available at `this.options_`
    //     return this.options().myItems.map(function (i) {
    //       var item = new MenuItem(this.player(), { label: i.name });
    //       item.handleClick = function () {
    //         console.log("clicked");
    //       };
    //       return item;
    //     });
    //   }
    // }
    // videojs.registerComponent("CustomMenuButton", CustomMenuButton);
    // Register as a component, so it can be added
    // player.controlBar.addChild("CustomMenuButton", {
    //   title: "My menu",
    //   myItems: [{ name: "Hello" }, { name: "World" }],
    // });

    // Use `addChild` to add an instance of the new component, with options

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

    // const handleVision = () => {};

    // player.on("pause", function () {
    // Modals are temporary by default. They dispose themselves when they are
    // closed; so, we can create a new one each time the player is paused and
    // not worry about leaving extra nodes hanging around.
    // var modal = player.createModal("This is a modal!");

    // When the modal closes, resume playback.
    // modal.on("modalclose", function () {
    // player.play();
    // });
    // });
  };

  return (
    <>
      <div className="container">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
};

export default App;
