// 找出字符串中出现最多的字符

let num = document.getElementById('l-a-num')

num.onblur = function lista() {
    let val = num.value,
        chars = '';
    val = val.replace(/\s*/g, "")
    // val = val.split('') //处理输入的字符串
    console.log(val);
    // 定义一个空的对象
    let obj = {}
    // 遍历对象
    for (let i = 0, length = val.length; i < length; i++) {
        chars = val.charAt(i)
        if (obj[chars]) {
            obj[chars]++
        } else {
            obj[chars] = 1
        }
        console.log(obj, ' obj[char]');

    }


}