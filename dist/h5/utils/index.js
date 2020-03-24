import Taro, { getStorageSync as _getStorageSync } from "@tarojs/taro-h5";

let throttleTimer = {};
// TODO 多处地方同时调用throttle时，如果第一个传的是ahead = true，另外一个传的是ahead = false, 有可能造成两个的method方法都不会被调用
export const throttle = ({ method, delay = 300, ahead = false, type = 'common' }) => {
  // console.log('已阻止频繁触发..........', ahead)
  if (ahead && !throttleTimer[type]) {
    method();
  }
  clearTimeout(throttleTimer[type]);
  throttleTimer[type] = setTimeout(() => {
    if (!ahead) {
      method();
    }
    clearTimeout(throttleTimer[type]);
    throttleTimer[type] = undefined;
  }, delay);
};

export const vibrateShort = () => {};

export const routerGoBack = () => {
  {
    if (JSON.parse(localStorage.getItem('taroRouterStore')).key == 0) {
      const version = _getStorageSync('version');
      if (version == '3') {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.inappbrowserClose) {
          window.webkit.messageHandlers.inappbrowserClose.postMessage('');
        }
      } else {
        if (window.inappbrowser && window.inappbrowser.close) {
          window.inappbrowser.close();
        }
      }
    }
    document.querySelector('.taro_page:last-child').classList.add("remove");
    const last2 = document.querySelector('.taro_page:nth-last-child(2)');
    if (last2) {
      last2.classList.add('show');
    }
    setTimeout(() => {
      if (last2) {
        last2.classList.remove('show');
      }
      Taro.navigateBack();
    }, 400);
  }
};

export const routerGoIn = url => {
  {
    const last = document.querySelector('.taro_page:last-child');
    last.classList.add("in");
    setTimeout(() => {
      Taro.navigateTo({
        url
      });
      last.classList.remove("in");
    }, 400);
  }
};