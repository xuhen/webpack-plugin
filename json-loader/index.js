const { getOptions }  = require('loader-utils');


module.exports = function(source) {
    const options = getOptions(this);

    console.log('getOptions', options);

    let transformed = source.split('\n')
            .filter(Boolean)
            .map((item) => item.trim())
            .map((item) => {
                let arr = item.split('=');
                return arr;
            })
            .reduce((ac, item) => {
                let a = item[0].split('.');
                let v = item[1];
                let temp = ac;

                a.forEach((itemj, idx) => {
                    if(temp.hasOwnProperty(itemj)) {
                        temp = temp[itemj]
                    } else {
                        if (idx === a.length - 1) {
                            temp[itemj] = v;
                        } else {
                            temp[itemj] = {};
                            temp = temp[itemj];
                        }
                    }
                })

                // console.log('reduce', temp, a);


                // temp.value = v;

                return ac;
            }, {});

    return `export default ${ JSON.stringify(transformed) }`;
}