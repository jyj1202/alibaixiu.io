window.onload = function () {
  // alert("dada");
  let focus = document.querySelector(".focus");
  let arrow_l = document.querySelector(".arrow-l");
  let arrow_r = document.querySelector(".arrow-r");
  let wrapper = document.getElementById("wrapper");
  let circle = document.querySelector(".circle");

  let circle_index = 0;
  let num;
  let timer_auto;

  // 计算每次移动长度
  let width = focus.offsetWidth;
  // console.log(width);

  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer_auto);
    timer_auto = null;
  });

  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer_auto = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });

  // 渲染圆点
  let arr_image = wrapper.children;
  arr_image = Array.prototype.slice.call(arr_image);
  arr_image.forEach((item, index) => {
    let li = document.createElement("li");
    li.setAttribute("data-index", index);
    circle.appendChild(li);
    circle.children[0].className = "current";

    // 圆点点击事件
    li.addEventListener("click", function () {
      for (let i = 0; i < circle.children.length; i++) {
        circle.children[i].className = "";
      }
      this.className = "current";
      let circle_item_index = this.getAttribute("data-index");
      circle_index = circle_item_index;
      num = circle_item_index;
      // console.log(-circle_item_index * width);
      animate(wrapper, -circle_item_index * width);
    });
  });

  //把ul 第一个li 复制一份，放到ul 的最后面
  //当图片滚动到克隆的最后一张图片时， 让ul 快速的、不做动画的跳到最左侧： left 为0
  let li_copy = wrapper.children[0].cloneNode(true);
  wrapper.appendChild(li_copy);

  // 右箭头点击事件
  let pre = 0;
  num = 0;
  arrow_r.addEventListener("click", function () {
    let now = new Date().getTime();
    if (now - pre > 500) {
      if (num === wrapper.children.length - 1) {
        num = 0;
        wrapper.style.left = 0;
      }
      num++;
      circle_index++;
      if (circle_index == circle.children.length) {
        circle_index = 0;
      }
      circleChange(circle_index);
      animate(wrapper, -num * width);
      pre = now;
    }
  });

  // 左箭头点击事件
  let flag = true;
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num === 0) {
        num = wrapper.children.length - 1;
        wrapper.style.left = -num * width + "px";
      }
      num--;
      // console.log(num);
      circle_index--;
      circle_index =
        circle_index < 0 ? circle.children.length - 1 : circle_index;
      circleChange(circle_index);
      animate(wrapper, -num * width, () => {
        flag = true;
      });
    }
  });

  // 点击箭头改变圆点
  function circleChange(index) {
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < circle.children.length; i++) {
      circle.children[i].className = "";
    }
    circle.children[index].className = "current";
  }

  // 手动调用箭头click实现循环播放
  timer_auto = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
};
