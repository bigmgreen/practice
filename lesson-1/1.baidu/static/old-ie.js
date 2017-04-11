window.onload = function() {
    var doc = document;
    var rightMenu = doc.getElementById('rightMenu');
    var bdpfmenu = doc.getElementById('bdpfmenu');

    //设置更多产品菜单的高度
    rightMenu.style.height = doc.documentElement.clientHeight + 'px';

    //鼠标移入更多产品菜单时显示
    doc.getElementById('morePro').onmouseover = function() {
        rightMenu.style.display = 'block';
    };

    //鼠标移出更多产品菜单时隐藏
    rightMenu.onmouseout = function() {

        if (this.contains(event.toElement)) {
            return;
        }
        rightMenu.style.display = 'none';
    };

    //鼠标移入设置菜单时显示
    doc.getElementById('bdpfmenuWrap').onmouseover = function() {
        bdpfmenu.style.display = 'block';
    };

    //鼠标移出设置菜单时隐藏
    bdpfmenu.onmouseout = function() {

        if (this.contains(event.toElement)) {
            return;
        }
        bdpfmenu.style.display = 'none';
    };
};
