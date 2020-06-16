//1、 找出字符串中出现最多的字符
let num = document.getElementById('l-a-num')
num.onblur = function lista() {
    let val = num.value,
        chars = '',
        max = 0;
    // 去除空格
    val = val.replace(/\s*/g, "")
    // 定义一个空的对象
    let obj = {}
    // 遍历对象
    for (let i = 0, length = val.length; i < length; i++) {
        chars = val.charAt(i)
        if (obj[chars]) {
            obj[chars]++ //次数加1
        } else {
            obj[chars] = 1 //若第一次出现，次数记为1
        }
    }
    console.log(obj, ' obj[char]');
    // 1、for循环实现
    // for (let i in obj) {
    //     if (max < obj[i]) {
    //         max = obj[i]
    //     }
    // }
    // for (let i in obj) {
    //     if (max == obj[i]) {
    //         console.log("最多的字符是" + i);
    //         console.log("出现的次数是" + max);
    //     }
    // }
    // 遍历对象，找到最大值
    // 2、sort
    let arr = []
    for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i])

    }
    // arr = arr.sort(function (a1, a2) {
    //     return a1 - a2
    // })
    console.log(arr);


}

function greet(val) {
    var promise = new Promise(function (resolve, reject) {
        var greet =val ;
        resolve(greet);
    });
    return promise;
}
greet("hello  world").then(v => {
    console.log(v); //*
})