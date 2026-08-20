/**
 * script.js — Tawhidur Rahman Portfolio
 *
 * Dependencies (loaded via HTML with defer):
 *   jQuery 3.7.1 · Typed.js 2.1.0 · OwlCarousel2 2.3.4
 */

$(function () {

  /* ── Navbar: sticky on scroll ──────────────────────────────────────── */
  $(window).on('scroll', function () {
    var scrollY = this.scrollY;

    // sticky navbar
    if (scrollY > 20) {
      $('.navbar').addClass('sticky');
    } else {
      $('.navbar').removeClass('sticky');
    }

    // scroll-to-top button
    if (scrollY > 500) {
      $('.scroll-up-btn').addClass('show');
    } else {
      $('.scroll-up-btn').removeClass('show');
    }
  });

  /* ── Scroll-to-top button ──────────────────────────────────────────── */
  $('.scroll-up-btn').on('click', function () {
    $('html').css('scrollBehavior', 'auto').animate({ scrollTop: 0 }, 400, function () {
      $('html').css('scrollBehavior', 'smooth');
    });
  });

  /* ── Hamburger / mobile menu ───────────────────────────────────────── */
  $('#hamburger').on('click', function () {
    var $menu = $('.navbar .menu');
    var $icon = $(this).find('i');
    $menu.toggleClass('active');
    $icon.toggleClass('active');
    $(this).attr('aria-expanded', $menu.hasClass('active'));
  });

  // Close mobile menu on link click
  $('.navbar .menu li a').on('click', function () {
    $('.navbar .menu').removeClass('active');
    $('#hamburger i').removeClass('active');
    $('#hamburger').attr('aria-expanded', 'false');
    $('html').css('scrollBehavior', 'smooth');
  });

  /* ── Typed.js — hero section ───────────────────────────────────────── */
  new Typed('.typing', {
    strings: [
      'Test Automation',
      'QA Leadership',
      'Test Strategy',
      'CI/CD Integration',
      'Agile QA'
    ],
    typeSpeed:  85,
    backSpeed:  50,
    backDelay:  1800,
    loop:       true,
    smartBackspace: true
  });

  /* ── Typed.js — about section ──────────────────────────────────────── */
  new Typed('.typing-2', {
    strings: [
      'Test Automation',
      'QA Leadership',
      'Test Planning',
      'Agile Methodologies',
      'Team Mentoring'
    ],
    typeSpeed:  85,
    backSpeed:  50,
    backDelay:  1800,
    loop:       true,
    smartBackspace: true
  });

  /* ── Owl Carousel — experience/projects ───────────────────────────── */
  $('.carousel').owlCarousel({
    margin:           20,
    loop:             true,
    autoplay:         true,        // was missing in original
    autoplayTimeout:  3500,        // fixed: was misspelled "autoplayTimeOut"
    autoplayHoverPause: true,
    smartSpeed:       600,
    dots:             true,
    responsive: {
      0:    { items: 1 },
      600:  { items: 2 },
      1000: { items: 3 }
    }
  });

  /* ── Footer: auto-update copyright year ───────────────────────────── */
  $('#year').text(new Date().getFullYear());

  /* ── Contact form — Formspree AJAX submission ─────────────────────── */
  var $form       = $('#contact-form');
  var $submitBtn  = $('#submit-btn');
  var $status     = $('#form-status');

  $form.on('submit', function (e) {
    e.preventDefault();

    var formAction = $form.attr('action');

    // Guard: warn if Formspree ID hasn't been replaced
    if (formAction.indexOf('YOUR_FORM_ID') !== -1) {
      $status
        .css('color', 'crimson')
        .text('⚠ Please set up Formspree — see the comment in index.html.');
      return;
    }

    $submitBtn.prop('disabled', true).text('Sending…');
    $status.text('');

    $.ajax({
      url:      formAction,
      method:   'POST',
      data:     $form.serialize(),
      dataType: 'json',
      success: function () {
        $status.css('color', 'green')
               .text("✔ Message sent! I’ll get back to you within 24 hours.");
        $form[0].reset();
      },
      error: function () {
        $status.css('color', 'crimson')
               .text('Something went wrong. Please email tawhid.cse@gmail.com directly.');
      },
      complete: function () {
        $submitBtn.prop('disabled', false).text('Send Message');
      }
    });
  });

});
