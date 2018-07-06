(function($) {
  var privateFun = function(){

  }
  var PageSwitch = (function(){ // 利用匿名函数包裹，防止函数
    function PageSwitch(element, options){
      this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
      this.element = element;
    }
    PageSwitch.prototype = {
      /**
       * 说明： 初始化插件
       * 实现： 初始化dom结构，布局，分页及绑定事件
       */
      init: function () {
        var me = this; // pageSwitch
        me.selectors = me.settings.selectors;
        me.sections = me.selectors.sections;
        me.section = me.selectors.section; 

        me.direction = me.settings.direction == 'vertical' ? true : false;
        me.pagesCount = me.pagesCount();
        me.index = (me.settings.index >= 0 // page数量容错代码 
                    && me.settings.index < this.pagesCount) ? me.settings.index : 0;
        if(!me.direction){
          me._initLayout();
        }

        if (me.settings.pagination) {
          me._initPaging();
        }
        me._initEvent();
      },
      
      pagesCount: function(){ // 获取滑动页面数量
        return this.section.length; // section就相当于一个页面
      },
      switchLength: function(){ // 获取滑动的宽度（横屏滑动）或高度（竖屏滑动）
        return this.direction ? this.element.height() :this.element.width();
      },
      _initLayout: function(){ // 主页针对横屏情况进行页面布局
        var me = this;
        var width = (me.pagesCount * 100) + '%', // 容器的总宽度
            cellWith = (100 / me.pagesCount.toFixed(2) + '%');
        me.sections.width(width);
        me.section.width(cellWith).css('float', 'left');
        

      },
      _initPaging: function(){ // 实现分页的dom结构及css样式
        var me = this,
            pagesClass = me.selectors.page.substring(1), // 去掉选择器中的那个.
            activeClass = me.selectors.active.substring(1);
        var pageHtml = '<ul class='+ pagesClass +'>';
        for (var i = 0; i < me.pagesCount; i++) {
          pageHtml += '<li></li>'
        }
        me.element.append(pageHtml);
        var pages = me.element.find(me.selectors.page);
        me.pageItem = pages.find('li');
        me.pageItem.eq(me.index).addClass(me.activeClass);

        if(me.direction){
          pages.addClass('vertical')
        }else{
          pages.addClass('horizontal')
        }
      },
      _initEvent: function(){ // 初始化插件事件

      },
    }
    return PageSwitch;
  })();
  $.fn.PageSwitch = funciton(options){
    return this.each(function () { // 循环遍历，将所有目标元素设置自定义属性
      var me = $(this),
          instance = me.data('PageSwitch');
          if(!instance){
            instance = new PageSwitch(me, options); 
            me.data('PageSwitch', instance);
          }
          if($.type(options) === 'string'){
            return instance[options]();
            $('div').PageSwitch('init');
          }
    });
  }
  $.fn.PageSwitch.defaults = {
    selectors: {
      sections: '.sections', 
      section: '.section',
      page: '.pages',
      active: '.active'
    },
    index: 0,
    easing: 'ease',
    duration: 500,
    loop: false,// 是否循环
    pagination: true,
    keyboard: true,
    direction: 'vertical',
    callback: '' // 动画结束默认回调函数
  }
  $(function(){
    $('[data-PageSwitch]').PageSwitch();
  })
})(jQuery);