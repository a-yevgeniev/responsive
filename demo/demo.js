(function(){
  let el = document.getElementById('demo');

  Responsive.onBreakpoint(function(){
    const msg = 'mobile: (max-width: 767px)';
    el.innerHTML += `<br>${msg}`;
  }, 'down-sm');

  Responsive.onBreakpoint(function(){
    const msg = 'tablet: (min-width: 768px) and (max-width: 991px)';
    el.innerHTML += `<br>${msg}`;
  }, 'only-md');

  Responsive.onBreakpoint(function(){
    const msg = 'desktop: (min-width: 992px)';
    el.innerHTML += `<br>${msg}`;
  }, 'up-lg');
}());