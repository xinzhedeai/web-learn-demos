#jquery插件编写
##闭包的作用
(function($){
  // to do
})(jQuery);
-避免全局依赖
-避免第三方破坏
-兼容jQuery操作符‘$’和jQuery

##开发方式
1.类级别组件开发
-即给jQuery命名空间下添加新的全局函数，也称为静态方法
jQuery.myPlugin = function(){
  // todo
}
eg: $.Ajax()/ $.extend()

2.对象级别组件开发
-即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法， 也称为动态方法。
$.fn.myPlugin = funciton(){
  // todo
};
这里$.fn === $.prototype
eg: $('selector').addClass()/attr()等，需要创建jquery实例来调用.

##链式调用
  $('div').next().addClass()...
  $.fn.myPlugin = function(){
    return this.each(function(){
      // to do...
    });
  };

  .代码说明
    -return this返回当前对象，实现链式调用
    -each循环实现每个元素的访问
##单例模式
 -如果实例存在则不再重新创建实例
 -利用data()来存放插件对象的实例

##.on([events], selector, data, handler)
-events 一个或多个空格分隔的事件类型，例如：click, keydown.
-selector 一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素，如果为null， 则被选中的元素触发事件。
-data 事件触发时，要传递给处理函数的event.data.
-handler事件触发时，执行的函数


