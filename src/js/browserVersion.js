export class BrowserVersion
{
    constructor () {
        let agent = navigator.userAgent.toLowerCase();
        let pattern = /\w+\/[\d+.]*\d+/g;
        let arr = agent.match(pattern);
        this.arr = arr;
        let browsersArr = [];
        for(let item of arr) {
            item = item.split('/');
            browsersArr.push({
                name: item[0],
                version: item[1].split('.')[0],
                fullVersion: item[1]
            });
        }
        this.browsersInfo = browsersArr;
    }

    currentBrowser () {
        var ie = !-[1,]; 
        if(ie)
            return 'ie';
        if(this.browsersInfo.find(item => item.name === 'edg'))
            return 'edge';
        if(this.browsersInfo.find(item => item.name === 'edge'))
            return 'edge';
        if(this.browsersInfo.find(item => item.name === 'opr'))
            return 'opera';
        if(this.browsersInfo.find(item => item.name === 'opera'))
            return 'opera';
        if(this.browsersInfo.find(item => item.name === 'firefox'))
            return 'firefox';
        if(this.browsersInfo.find(item => item.name === 'chrome'))
            return 'chrome';
        if(this.browsersInfo.find(item => item.name === 'safari'))
            return 'safari';
        return 'chrome';
    }

    getInfo () {
        return this.browsersInfo;
    }
}