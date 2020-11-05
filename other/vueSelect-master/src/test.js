
const test = {}
test.install = function(Vue, options) {
  Vue.prototype.$test = (content) => {
    let tpl = Vue.extend({
      template: '<div>' + content + '</div>'
    })
    let tpl2 = new tpl().$mount().$el
    console.log(tpl2)
    return true
  }
}

export default test
