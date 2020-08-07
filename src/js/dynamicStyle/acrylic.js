export default {
    install: Vue => {
        Vue.prototype.$acrylic = (element, config) => {
            let is_active = () => {
                let browser = Vue.prototype.$browser.currentBrowser();
                let info = Vue.prototype.$browser.getInfo();
                if(browser == 'firefox')
                    return false;
                if(browser == 'edge') {
                    let item = info.find(it => it.name === 'edge');
                    if(!item) item = info.find(it => it.name === 'edg');
                    if(item.version > 16) return true;
                    return false;
                }
                if(browser == 'chrome') {
                    let item = info.find(it => it.name == 'chrome');
                    if(item.version >= 76)  return true;
                    return false;
                }
                if(browser == 'safari' || browser == 'opera')
                    return true;
                return false;
            }

            let config_ = {
                blurSize: 25,
                rgba: 'rgba(245, 245, 245, 0.6)',
                opacity: '0.6'
            };
            config = Object.assign(config_, config);    //first copy to config_ then assign to config//
            let colorPart = config.rgba.split(',');
            element.style.background = `${colorPart[0]}, ${colorPart[1]}, ${colorPart[2]}, ${config.opacity}`;
            if(is_active()) {
                element.style.backdropFilter = `blur(${config.blurSize}px)`;
                element.style.webkitBackdropFilter = `blur(${config.blurSize}px)`;
            }
            else
            {
                element.style.background = config.rgba;
            }
        }
    }
}