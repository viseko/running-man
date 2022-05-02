export function loadYandexMap(options) {
  const mapWrapper = document.querySelector(options.wrapper);
  const loaderButton = document.querySelector(options.loader);
  const statusText = {
    loading: options.loadingText || "Загрузка..",
    error: options.loadingText || "Не удалось загрузить карту",
  };
  const timeout = options.timeout || 10000;
  const coords = options.coords || [0, 0];
  const markPosition = options.markPosition || coords;
  const markImageUrl = options.mark || "";
  const markSize = options.markSize || [20, 20];
  const markOffset = options.markOffset || [0, 0];
  const zoom = options.zoom || 17;

  if (!mapWrapper || !loaderButton) return;

  loaderButton.addEventListener("click", prepareMap);

  function prepareMap() {
    if (window.ymaps) {
      ymaps.ready(initMap);
      return;
    };

    loaderButton.disabled = true;
    loaderButton.textContent = statusText.loading;

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      document.body.appendChild(script);

      script.onload = () => resolve(script);
      script.onerror = () => reject();
      setTimeout(()=> {reject()}, timeout);
    });

    promise.then(() => {
      loaderButton.remove();
      ymaps.ready(initMap);
    }, () => {
      loaderButton.textContent = statusText.error;
    });
  }

  function initMap() {
    const map = new ymaps.Map(options.wrapper.slice(1), {
      center: coords,
      zoom: zoom,
      controls: ["zoomControl"]
    });

    let myGeoObjects = [];

    myGeoObjects = new ymaps.Placemark(markPosition, {
        baloonContentBody: '',
    }, {
        iconLayout: "default#image",
        iconImageHref: markImageUrl,
        iconImageSize: markSize,
        iconImageOffset: markOffset
    });

    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        cluseterOpenBaloonOnClick: false,
    });

    clusterer.add(myGeoObjects);
    map.geoObjects.add(clusterer);

    map.behaviors.disable("scrollZoom");
  }
}

