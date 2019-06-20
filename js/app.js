document.addEventListener('DOMContentLoaded', function() {
  // SideNav Js
  var sidenav = document.querySelectorAll('.sidenav');
  var sidenavInstance = M.Sidenav.init(sidenav, {
    edge: 'right',
  })

  sidenavInstance[0].el.addEventListener('click', function(){
    sidenavInstance[0].close();
  });

  // Slider for images
  var slider = document.querySelectorAll('.slider');
  var sliderInstance = M.Slider.init(slider, {
  });

  // Large Image Popup
  var materializeImages = document.querySelectorAll('.materialboxed');
  var materializeImageInstances = M.Materialbox.init(materializeImages, {
  })

  var modalElems = document.querySelectorAll('.modal');
  var modalInstances = M.Modal.init(modalElems, {});

  window.addEventListener('resize', function(){
    modalInstances.forEach(modal => modal.close())
  })


  // Today's date placed in about me section
  var time = new Date()
  var dd = String(time.getDate());
  var mo = String(time.getMonth());
  var year = time.getFullYear();

  var dateStr = `${mo}/${dd}/${year}`
  var dateElm = document.getElementById('date')
  dateElm.innerHTML = dateStr;
});
