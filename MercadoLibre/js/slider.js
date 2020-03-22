$(document).ready(function () {
  $("#zoom_03f").ezPlus({
      constrainType: "height",
      constrainSize: 274,
      zoomType: "lens",
      containLensZoom: true,
      gallery: 'gallery_01f',
      cursor: 'pointer',
      galleryActiveClass: "active"
  });

  $("#zoom_03f").bind("click", function (e) {
      var ez = $('#zoom_03f').data('ezPlus');
      ez.closeAll();
      $.fancyboxPlus(ez.getGalleryList());

      return false;
  });

});
