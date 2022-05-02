// ========== Adaptive move ===========
// How to use:
// 1. Add "data-am" attribute to HTML-element you need.
// 2. Attribute value should be fit the pattern:
//      <targetElementSelector>/<mediaQuery>
// .......
// For example: data-am=".block1 / (min-width: 750px) and (max-width: 1000px)"
// .......
// When media query mathes the element will be moved into target block.
// Otherwise it will be putted into its common position.

export function adaptiveMove() {
  const adaptiveMoveElems = document.querySelectorAll("[data-am]");
  const queries = {};

  for (let i = 0; i < adaptiveMoveElems.length; i++) {
    const elem = adaptiveMoveElems[i];
    const elemData = elem.dataset.am.split("/");
    const target = elemData[0].trim();
    const mediaQuery = elemData[1].trim();

    const moveData = {
      "elem": elem,
      "parent": elem.parentElement,
      "target": target,
      "prev": elem.previousElementSibling
    };

    if (queries[mediaQuery]) {
      queries[mediaQuery].push(moveData)
    } else {
      queries[mediaQuery] = [moveData];
    }
  }

  for (let query in queries) {
    const mediaQuery = window.matchMedia(query);
    const queryData = queries[query];

    const matchMedia = function() {
      if (mediaQuery.matches) {
        for (let i = 0; i < queryData.length; i++) {
          const target = document.querySelector(queryData[i].target);
          target.appendChild(queryData[i].elem);
        }
      } else {
        for (let i = 0; i < queryData.length; i++) {
          if (queryData[i].prev) {
            queryData[i].prev.insertAdjacentElement("afterend", queryData[i].elem)
          } else {
            queryData[i].parent.appendChild(queryData[i].elem);
          }
        }
      }
    };

    matchMedia();

    mediaQuery.addEventListener("change", matchMedia);
  }
}
