jQuery.ajaxSetup({async:false});

// Preload emojis
const emojis = getResource('json/native.json')
const iso639_langs = getResource('json/iso639-1.json')

/* A Google API Key (for the Cloud Translation API) is needed to get this script to work */
var googleApiKey = "AIzaSyA8m0bay1Sg545_mrZKkmEFIh5bJw7A4a8";
var prefTranslationLang = localStorage.getItem("prefTranslationLang")
var translationLanguages = []


var htmlModelOverlay = getResource("html/modelinfo-overlay.html");
var htmlLangChooser = getResource("html/language-chooser.html");
var htmlLangChooserPrivates = getResource("html/language-chooser-private.html");
var htmlLangPicker = getResource("html/language-picker.html")
var htmlTranslateButton = '<span class="translate-line"><button class="a11y-button TranslateButton#ZN TranslateButton_outline#qg chat-message-translate-button" style="float: none; display: inline-block;" type="button"><svg style="height: 14px; width: 14px;" class="IconV2__icon#YR" viewBox="0 0 16 14"><path fill="currentColor" fill-rule="evenodd" d="M10.28 1.72V3h-1.5a18.53 18.53 0 0 1-2.6 4.52l.05.05c.43.46.86.93 1.3 1.38l-.9.9c-.37-.36-.72-.74-1.07-1.13l-.2-.21c-.9.99-1.9 1.88-3 2.67l-.77-1.02.03-.02a17.36 17.36 0 0 0 2.87-2.58c-.52-.6-1.03-1.19-1.52-1.8L2.1 4.68l1-.8.86 1.08c.44.54.9 1.07 1.36 1.6C6.15 5.46 6.84 4.27 7.4 3H.68V1.72h4.48V.44h1.28v1.28h3.84Zm5.04 11.84h-1.38L13 11.32H9.48l-.93 2.24H7.17l3.32-8H12l3.33 8ZM11.24 7.1l-1.22 2.94h2.45L11.24 7.1Z" clip-rule="evenodd"></path></svg></button></span>'
var htmlSortByTokensButton = '<p class="se-tipmenu-sort text-center"><button class="a11y-button TipMenuDiscountViewCamPanel__button#be" type="button"><svg class="TipMenuDiscountViewCamPanel__diamond#DY icon icon-watch-history"><use xlink:href="#icons-watch-history"></use></svg><small>Sort by Tokens</small></button></p>'


/**
 * Sort Tip Menu by Token Price
 */
waitForKeyElements(".tip-menu__table", addTipmenuByPrice);
function addTipmenuByPrice(el) {

  $(el).before(htmlSortByTokensButton)

  $('.tip-menu').on('click', '.se-tipmenu-sort button', function(e) {
    sortTipmenuByPrice('.tip-menu__table tbody', 'tr', '.tip-menu-item-price-cell span')
    return false
  })
}


/**
 * Add sidebar links
 */ 
waitForKeyElements("[class*='SidebarMainLinks']", addSidebarLinks, false);
function addSidebarLinks(el) {

  $(el).append('<a class="SidebarLink#Ot SidebarLink__variant-main#HJ" href="/not-interested"><span class="SidebarLink__icon#un">​<span class="SidebarLink__icon-frame#Fy"><svg class="IconV2__icon#YR" style="height: 16px; width: 16px;"><use xlink:href="#icons-watch-history"></use></svg></span></span><span class="SidebarLink__text#gq">Not Interested</span></a>')
}

// Hide Favorites From "Featured Model" Listings
waitForKeyElements(".featured-model-list", hideFavoritesFromFeaturedListings);
function hideFavoritesFromFeaturedListings(el) {

  $(el).find('.model-list-item').each(function() {
    if($(this).find('.ModelListItemBadge__favorite#vd')) {
      // $(this).remove()
    }
  })
}

  // Block Websockets
  WebSocket2 = WebSocket
  WebSocket = function(addy) {
      var ws;
      if (!this.blocked) {
          ws = new WebSocket2(addy);
          this.open_sockets.push(ws);
          return ws;
      }
  }
  WebSocket.toggle = function() {
      WebSocket.prototype.blocked = !WebSocket.prototype.blocked;
      var sockets = WebSocket.prototype.open_sockets;
      if (WebSocket.prototype.blocked) {
          sockets.forEach(function(socket, index, sockets) {
              socket.close();
          });
          WebSocket.prototype.open_sockets = [];
      }
  }
  WebSocket.prototype.open_sockets = []
  WebSocket.prototype.blocked = true


  /**
   * Save Player Volume
   */
  waitForKeyElements(".mse-player video", savePlayerVolume);
  function savePlayerVolume(el) {

    if(localStorage.getItem("SE_playerVolume")) {
      $(el).get(0).volume = localStorage.getItem("SE_playerVolume")
    }

    $(el).on('volumechange', function(e) {
      localStorage.setItem("SE_playerVolume", $(el).get(0).volume)
    })
  }


  /**
   * Save Favorites Ordering
   */
  waitForKeyElements("[class*='ModelsOrderDropdown__content']", saveFavoritesSorting);
  function saveFavoritesSorting(el) {

    $("[class*='ModelsOrderDropdown__content']").off().on('click', 'a', function() {
      let path = location.pathname
      $("[class*='SidebarLink'][href='/favorites']").attr("href", path)
      localStorage.setItem("SE_favoritesSorting", path)
    })
  }
  waitForKeyElements("[class*='SidebarMainLinks']", presetFavoritesSorting);
  function presetFavoritesSorting(el) {

    let path = localStorage.getItem("SE_favoritesSorting")
    if(path) $("[class*='SidebarLink'][href='/favorites']").attr("href", path)


    $("[class*='SidebarLink'][href^='/favorites/']").on('click', function() {
      e.preventDefault()
      window.location.replace($(this).attr("href"))
    })
  }



  /**
   * Open Streams in New Tab
   */
  waitForKeyElements("[class*='SlidableCategorySegment__scrollable-container']", addOpenInNewTabLinks);
  function addOpenInNewTabLinks(element) {
    $(element).find('.model-list-item-upper-right').append('<div class="model-additional-menu-newtab model-additional-menu model-additional-menu--model-list-item model-list-item-additional-menu-wrapper"><div id="model-additional-menu-button-567" class="model-additional-menu__button"><svg width="16" height="16" viewBox="0 0 0.48 0.48" xmlns="http://www.w3.org/2000/svg"><path d="M.066.414a.02.02 0 0 1 0-.028L.352.1H.24a.02.02 0 0 1 0-.04H.4a.02.02 0 0 1 .02.02v.16a.02.02 0 0 1-.04 0V.128L.094.414a.02.02 0 0 1-.028 0" fill="#fff" /></svg></div></div>')
  }

  $('#body').on('click', '.model-additional-menu-newtab', function(e) {
      window.open($(this).closest('a').prop('href'), '_blank');
      return false;
  })

  /**
   * Add global options flyout & Output website time in header
   */
  waitForKeyElements(".personal-notifications-modal-panel", addOptionsMenu);
  function addOptionsMenu(jNode) {

    // Add global options flyout
    if(!$(jNode).find('.open-enhanced-options').length) {

      // add button
      $(jNode).prepend('<button class="a11y-button dropdown-link open-enhanced-options" type="button"><span>E</span></button>')

      // html options overlay
      $('#personal-notifications-portal-container').load(chrome.runtime.getURL('html/enhanced-options.html'));

      /* TEMP ALI TRAUM
      $('.enhanced-options-content').append("<select id='test'></select>")

      $.get('/tags/girls', function(data) {

        console.log("html data", data)

        $(data).find('.tags-category-group__header').each(function() {
          console.log($(this).text())
        })


      });
      */


      // process options
      processOptions()
    }

    // Output once and refresh time in website header
    updateTime()
    setInterval(() => { updateTime() }, 1000)

    // open options menu
    $('#body').on('click', '.open-enhanced-options', function(e) {
      $('.enhanced-options-modal').toggleClass('hidden')
    })

    // close options menu
    $('#body').on('click', '.enhanced-options-close', function(e) {
      $('.personal-notifications-modal').remove()
      $('.enhanced-options-modal').toggleClass('hidden')
    })

    // close options menu when opening other dropdown links
    $('.icon-chat-2,.icon-notifications').closest('button').on('click', function(e) {
      $('.enhanced-options-modal').addClass('hidden')
    })
    $('.header-user-menu .dropdown-link,.tokens-menu .dropdown-link').on('click', function(e) {
      $('.enhanced-options-modal').addClass('hidden')
    })

    // options change handler
    $('.enhanced-options-content').on('change', 'input[type="checkbox"]', function(e) {
      let name = $(this).attr('name')
      let val = ($(this).prop('checked') ? "1" : "0")
      localStorage.setItem("SE_"+name, val)
      processOption(name, val)
    })
  }

  function processOption(name, val) {

    switch(name) {
      case "SE_optionDisableAutoRefill":
        break;
      case "SE_optionDisableQuickRefill":
        break;
      case "SE_optionEnableTranslations":
        break;
      default:
        // code block
    }
  }

  function processOptions() {

  }


  /*
   * Display website time in website's header
   */
  var time = $.ajax({async: false}).getResponseHeader('Date')
  var timeFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  function updateTime() {

    if(!$('.personal-notifications-modal-panel .current-time').length) {
      $('.personal-notifications-modal-panel').prepend('<small class="current-time">'+new Date().toLocaleTimeString('en-US', timeFormat)+'</small>')
    } else {
      let currentTime = parseTime($('.personal-notifications-modal-panel .current-time').text())
      $('.personal-notifications-modal-panel .current-time').html(currentTime)
    }
  }
  function parseTime( t ) {
     var d = new Date();
     var time = t.match( /(\d+)(?::(\d\d))(?::(\d\d))?\s*(p?)/ );
     d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
     d.setMinutes( parseInt( time[2]) || 0 );
     return d.toLocaleTimeString('en-US', timeFormat);
  }


  /**
   * Disable Watch History
   */
  localStorage.setItem('userWatchHistoryIds', JSON.stringify([]))


  /**
   * Set model chat font size
   */
  localStorage.setItem('modelChatFontSize', "small")


  /**
   * Disable MOE Data (Tracking)
   */
  localStorage.setItem('MOE_DATA', JSON.stringify([]))


  /**
   * Disable "Ghost History"
   */
  localStorage.setItem('ghost-history', JSON.stringify([]))


  /**
   * Disable "Active Tab ID"
   */
  localStorage.setItem('ActiveTabId', "")


  /**
   * Disable "Auto Rotate Images"
   */
  localStorage.setItem('browser_auto_rotates_images', "false")


  /**
   * Disable "Instant Top Up"
   */
  localStorage.setItem('disableInstantTopUp', "true")


  /**
   * Hide Chat Users
   */
  waitForKeyElements(".messages", hideChatUsers, false);
  function hideChatUsers(jNode) {


    // add "Hide User" button
    $('#body').on('click', '.message-more-menu', function() {

        setTimeout(function() {
          if(!$('.message-more-menu__dropdown .HideUserButton').length) {
            $('.message-more-menu__dropdown .dropdown-content').append('<button class="a11y-button MessageModeMenuItem#rq ReportButton#X2 ReportButton__text#IV HideUserButton" type="button"><svg class="icon icon-warning-triangle-outline-ds" style="height: 20px; width: 20px;"><use xlink:href="#icons-warning-triangle-outline-ds"></use></svg><span>Hide User</span></button>');
          }
        }, 50);
    })
    // "Hide User" button click event
    $('#body').on('click', '.HideUserButton', function(e) {
        alert("hmmm")
        let username = $(this).closest('.user-info-popup').find('.user-levels-username-text').html()

        // get localStorage
        let hiddenChatUsers = JSON.parse(localStorage.getItem("hiddenChatUsers"))

        // append localStorage
        if(!hiddenChatUsers.length) {
            hiddenChatUsers = [username]
        } else {
            hiddenChatUsers.push(username);
        }

        // save localStorage
        localStorage.setItem('hiddenChatUsers', JSON.stringify(hiddenChatUsers))
    })



    // observe messages div
    var observer = new MutationObserver(function(e) {

        // filter model pages only

        // hide local storage users:
        let hiddenChatUsers = JSON.parse(localStorage.getItem("hiddenChatUsers"))
        console.log("hiddenChatUsers", hiddenChatUsers)
        // $.each(hiddenChatUsers, function(index, item) {
        //     // do something with `item` (or `this` is also `item` if you like)
        // });

        // add translation button to regular messages
        $(jNode).find('.regular-message.message__more-menu--hidden:not(.se-processed)').slice(-50).each(function(index, item) {
            if(!$(this).find('.message-body .translate-line').length) {
              $(this).find('.message-body').append(htmlTranslateButton)
              $(this).addClass("se-processed")
            }
        })

        // add translation button to tip notes
        $(jNode).find('.m-bg-public-tip:not(.se-processed)').slice(-50).each(function(index, item) {
            if(!$(this).find('.tip-comment .translate-line').length) {
              $(this).find('.tip-comment').append(htmlTranslateButton)
              $(this).addClass("se-processed")
            }
        })

        // add translation button to goal messages
        $(jNode).find('.goal-message:not(.se-processed)').slice(-50).each(function(index, item) {
            if(!$(this).find('.goal-description__message .translate-line').length) {
              $(this).find('.goal-description__message').append(htmlTranslateButton)
              $(this).addClass("se-processed")
            }
        })

        // add translation button to group show starting messages
        $(jNode).find('.group-show-message:not(.se-processed)').slice(-50).each(function(index, item) {
            if(!$(this).find('.group-show-announce-topic .translate-line').length) {
              $(this).find('.group-show-announce-topic').append(htmlTranslateButton)
              $(this).addClass("se-processed")
            }
        })

        // DND Mode (filter everything else)
        if($('.switch-dnd-mode input[type="checkbox"]').is(':checked')) {
          let scrollContainer = $(jNode).closest('.scroll-bar-container')
          $(jNode).find('.message__more-menu--hidden.regular-message:not(.se-hidden):not(.m-bg-model)').slice(-50).each(function(index, item) {
              $(this).addClass("se-hidden")
          })
        }

        // auto translate
        if($('.switch-auto-translate input[type="checkbox"]').is(':checked')) {
          $(jNode).find('.regular-message.message__more-menu--hidden:not(.se-hidden):not(.se-translated)').slice(-1).each(function(index, item) {
            let that = $(this)
            let ell = $(this).find('.message-body').clone()
            ell.find('.username,.message-body-mention,.message-timestamp,>span,button,.goal-block,.group-show-message-title,.group-show-announce-topic-label,.group-show-announce-controls').remove()
            let text = ell.text().trim()

            translateGoogle(text, 'en_US').then(function(data) {
              if(!that.find('.message-body').find('.translated-line').length) {
                  that.find('.message-body').find('.translate-line').before('<small class="translated-line">'+decodeURIComponent(data.data.translations[0].translatedText)+'</small>')
              }
            })

            $(this).addClass("se-translated")
          })
        }
    });
    observer.observe($('.messages')[0], {characterData: true, childList: true, subtree: true});


    // translate button click handler
    $('.messages').off().on('click', '.translate-line button', function(e) {
        let ell = $(this).closest('.message-body').clone()
        ell.find('.username,.message-body-mention,.message-timestamp,>span,button,.goal-block,.group-show-message-title,.group-show-announce-topic-label,.group-show-announce-controls').remove()
        let text = ell.text().trim()
        let that = $(this)
        $(this).prop('disabled', true)

        translateGoogle(text, 'en_US').then(function(data) {
          if(!that.closest('.message-body').find('.translated-line').length) {
              that.closest('.message-body').find('.translate-line').before('<small class="translated-line">'+decodeURIComponent(data.data.translations[0].translatedText)+'</small>')
          }
          $(this).prop('disabled', false)
        })
    })
  }


  /*
   * Translate Private Shows Testimonials
   */
  waitForKeyElements(".testimonial__description", translatePrivateTestimonials);
  function translatePrivateTestimonials(jNode) {

    // append translate button
    if(!$(jNode).hasClass('se-procesed')) {
      $(jNode).append(htmlTranslateButton)
      $(jNode).addClass("se-processed")
    }

    // translate button click handler
    $('.testimonial__description').off().on('click', '.translate-line button', function(e) {
      let ell = $(this).closest('div').clone()
      ell.find('.translate-line').remove()
      let text = ell.text().trim()
      let that = $(this)
      $(this).prop('disabled', true)

      translateGoogle(text, 'en_US').then(function(data) {
        if(!that.closest('div').find('.translated-line').length) {
            that.closest('div').find('.translate-line').before('<small class="translated-line">'+decodeURIComponent(data.data.translations[0].translatedText)+'</small>')
        }
        $(this).prop('disabled', false)
      })
    })
  }


  /**
   * Normal Emojis
   */
  waitForKeyElements('.model-chat__smiles-block [class*="SmilesWidgetContainer__closeBtn"]', addRegularEmojis);
  function addRegularEmojis(jNode) {
    let modelChat = $(jNode).closest('.model-chat-public')

    // add switch emoji style button
    $(jNode).before('<div class="se-switch-emoji"><a class="subscribe-switch-container switch-emoji-style" href="#" aria-label="White" class="btn-tags-inline-badge inline-badge inline-badge__button inline-badge__override model-filter-link"><span>Switch Emojis</span></a></div>')


    $('.model-chat-content').off().on('click', '.switch-emoji-style', function(e) {
      e.preventDefault

      if($(this).closest('.model-chat__smiles-block').find('.SmilesWidget__content_default-emojis').length) {
        $('.SmilesWidget__content_default-emojis').toggleClass('hidden').prev().toggleClass('hidden')
      } else {

        $('.model-chat__smiles-block [class^="SmilesWidgetContainer__content#"]').after('<div class="SmilesWidget__content_default-emojis"><div class="emoji-list"></div><ul class="emoji-categories"><li class="se-emoji-cat se-emoji-cat_recent"><a class="se-emoji se-emoji-recent" data-tab="recent" href="#">recent</a></li></ul></div>')
        $('.SmilesWidget__content_default-emojis').prev().toggleClass('hidden')

        // output recent emojis from localStorage
        let recent_cat = $('<div class="se-emoji-list se-emoji-list hidden"></div>')
        recent_cat.append('<button aria-label="v" class="se-emoji-v SmilersWidgetSpicyList__smile#mG active-smile" type="button">x</button>')
        $('.emoji-list').append(recent_cat)

        // output cats + emojis
        $.each(emojis.categories, (k, v) => {
          $('.emoji-categories').append('<li class="se-emoji-cat se-emoji-cat_'+v.id+'"><a class="se-emoji se-emoji-'+v.id+'" data-tab="'+v.id+'" href="#">'+v.id+'</a></li>')

          // all emojis of category
          let cat = $('<div class="se-emoji-list se-emoji-list-'+v.id+''+(k>0 ? " hidden" : "")+'"></div>')
          $.each(v.emojis, (k, v) => {
            if([v.matchAll(/\p{RGI_Emoji}/vg)].length) {
              cat.append('<button aria-label="'+v+'" class="se-emoji-'+emojis.emojis[v].id+' SmilersWidgetSpicyList__smile#mG active-smile" type="button">&#x'+emojis.emojis[v].skins[0].unified.split("-").join("")+';</button>')
            }
          })
          $('.emoji-list').append(cat)
        })
      }
    })

    // simple emoji category tabbing
    $('#body').on('click', '.emoji-categories .se-emoji', function(e) {
      $('.se-emoji-list').addClass('hidden')
      $('.se-emoji-list-'+$(this).attr('data-tab')).removeClass('hidden')
    })

    // insert emoji on click
    $('.model-chat-content').on('click', '.SmilesWidget__content_default-emojis .active-smile', function(e) {
        let text = $('.model-chat-input input').val()
        $('.model-chat-input input').val('').focus()
        document.execCommand('insertText', false, text+$(this).text())
    })
  }


  /**
   *  Add Translation Button to Stream Goal
   */
  waitForKeyElements('.view-cam-info-goal', addTransButtonCamInfo);
  function addTransButtonCamInfo() {

      if(!$('.view-cam-info-goal .translate-line').length) {
          $('.view-cam-info-topic:not(.view-cam-info-topic__in-player)').after(htmlTranslateButton)
      }

      $('.view-cam-info-goal').off().on('click', '.translate-line button', function(e) {
          let text = $(this).closest('.view-cam-info-goal').find('.view-cam-info-topic').clone().text().trim()
          let that = $(this)
          $(this).prop('disabled', true)

          translateGoogle(text, 'en_US').then(function(data) {
            if(!that.closest('.view-cam-info-goal .translated-line').length) {
                that.closest('.view-cam-info-goal').find('.view-cam-info-topic').after('<small class="translated-line">'+decodeURIComponent(data.data.translations[0].translatedText)+'</small>')
            }
            $(this).prop('disabled', false)
          })
      })
  }

  /**
   *  Add Translation Button to Stream Description
   */
  waitForKeyElements('[class*="ViewCamShutterWrapper__status"]', addTransButtonCamGroup);
  function addTransButtonCamGroup() {

    // add translation button to regular messages
    var observerCamGroup = new MutationObserver(function(e) {

      if(!$('[class*="ViewCamGroup__description"] .translate-line').length) {
          $('[class*="ViewCamGroup__description"]').append(htmlTranslateButton)
      }
    });
    observerCamGroup.observe($('[class*="ViewCamShutterWrapper__status"]')[0], {characterData: true, childList: true, subtree: true});

    // add event click handler
    $('[class*="ViewCamShutterWrapper__status"]').off().on('click', '.translate-line button', function(e) {
        let text = $(this).closest('[class*="ViewCamGroup__description"]').clone().text().trim()
        let that = $(this)
        $(this).prop('disabled', true)

        translateGoogle(text, 'en_US').then(function(data) {
          if(!that.closest('[class*="ViewCamGroup__description"] .translated-line').length) {
              that.closest('[class*="ViewCamGroup__description"]').find('.translate-line').before('<small class="translated-line">'+decodeURIComponent(data.data.translations[0].translatedText)+'</small>')
          }
          $(this).prop('disabled', false)
        })
    })
  }


  /**
   * Auto Participate in StripChat's 50 Tokens Giveaway
   */
  waitForKeyElements(".lottery", autoParticipate);
  function autoParticipate(jNode) {

    // observe messages div
    var observeParticipation = new MutationObserver(function(e) {

        if(
          $(jNode).find('.lottery-item:contains("in giveaway.")').length > 0 // only if button is found (= giveaway is ready)
          && $('.nav-right .avatar').length // is logged in
        ) {
            $(jNode).find('.a11y-button.lottery-title-wrapper').click()
            $(jNode).find('.btn').click()
        }
    });
    observeParticipation.observe($('.lottery-content')[0], {characterData: true, childList: true, subtree: true});
  }


  /**
   * True Fullscreen & Picture in Picture
   */
  waitForKeyElements(".player-controls-user__right-buttons", videoAddPip, false);
  function videoAddPip(el) {

    // true fullscreen
    $(el).append('<button class="se-fullscreen btn ds-btn-inline-block overflow-visible player-controls-user__button player-top-button" type="button"><svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.24 10.24" xml:space="preserve"><path d="m1.862 2.792 0.93 -0.93 -0.93 -0.932L2.792 0H0v2.792l0.93 -0.93zm0 4.656 -0.93 0.93L0 7.448V10.24h2.792l-0.93 -0.93 0.93 -0.93zm5.586 -4.656H2.792v4.654h4.654V2.792zm-0.932 3.724H3.724V3.724h2.792zM7.448 0l0.93 0.93L7.448 1.86l0.93 0.93L9.308 1.86l0.93 0.93V0zm0.93 7.448 -0.93 0.93 0.93 0.93 -0.93 0.932H10.24V7.448l-0.93 0.93z" fill="#fff"/></svg></button>')
    $('.se-fullscreen').on('click', function(e) {
        $(this).attr('disabled', true)

        const videoElement = document.getElementsByClassName('video-element')[0]
        openFullscreen(videoElement)

        $(this).attr('disabled', false)
    });

    // pip
    $(el).append('<button style="position: absolute; right: 24px; top: 60px;" class="se-pip btn ds-btn-inline-block overflow-visible player-controls-user__button player-top-button" type="button"><svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.24 10.24" xml:space="preserve"><path d="m1.862 2.792 0.93 -0.93 -0.93 -0.932L2.792 0H0v2.792l0.93 -0.93zm0 4.656 -0.93 0.93L0 7.448V10.24h2.792l-0.93 -0.93 0.93 -0.93zm5.586 -4.656H2.792v4.654h4.654V2.792zm-0.932 3.724H3.724V3.724h2.792zM7.448 0l0.93 0.93L7.448 1.86l0.93 0.93L9.308 1.86l0.93 0.93V0zm0.93 7.448 -0.93 0.93 0.93 0.93 -0.93 0.932H10.24V7.448l-0.93 0.93z" fill="#fff"/></svg></button>')
    $('.se-pip').on('click', function(e) {
      $(this).attr('disabled', true)

      const videoElement = document.getElementsByClassName('video-element')[0]
      openPip(videoElement)

      $(this).attr('disabled', false)
    });
  }
  function openFullscreen(elem) {
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
      }
  }
  function openPip(elem) {
    if (elem.requestPictureInPicture) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        elem.requestPictureInPicture();
      }
    }
  }


  /**
   * Add language/translation dropdown to main chat
   */
  waitForKeyElements(".model-chat-input", addLangDropdown, false);
  function addLangDropdown(jNode) {
      let modelChat = $(jNode).closest('.model-chat-public')
      let modelChatInput = $(jNode).find('input')
      let modelChatSubmit = $(jNode).find('.a11y-button')

      // add dropdown html
      if(!modelChat.find('.language-picker').length) {
          $(jNode).children('div').before(htmlLangPicker);
          
          // prepopulate
          populateLanguageDropdowns()

          // preselect if choosen before
          if(prefTranslationLang) {
            setTimeout(function() {
              $('.se-langpicker').attr('data-active', prefTranslationLang)
              $('.se-langpicker').prepend('<svg class="flag flag-'+prefTranslationLang+'"><use xlink:href="#'+prefTranslationLang+'"></use></svg>')
            }, 500);
          }
      }

      // surpress StripChat's default submit (on keypress)
      modelChatInput.on('submit', function(e) {
          e.preventDefault()
          e.stopImmediatePropagation()
          e.stopPropagation()
      })

      // add own keypress event
      modelChatInput.on('keydown', function(e) {
          if(e.which == 13) {
              e.preventDefault()
              e.stopImmediatePropagation()
              e.stopPropagation()
              $('.language-chooser').addClass("hidden")

              if($('.se-langpicker').attr('data-active')) {

                  // only logged in users
                  if(!$('.nav-right .avatar').length) {
                      alert("You have to be logged in to send translated messages.")
                      return
                  }

                  $('[class*="ChatInput__inputBlock"]').append('<span class="se-loader-line"></span>') // TODO please as before

                  translateGoogle(modelChatInput.val(), $('.se-langpicker').attr('data-active').toLowerCase()).then(function(data) {
                      // TODO: console.log missing/wrong languages
                      modelChatInput.val('')
                      modelChatInput.focus()
                      document.execCommand('insertText', false, decodeURIComponent(data.data.translations[0].translatedText))
                      modelChatSubmit.click()
                  }); // TODO add error handling (throw tooltip above input)
              } else {
                  // no translation needed
                  modelChatSubmit.click()
              }
              $('.se-loader-line').remove()
          }
      })

      // hide language chooser on send button && smiles button click
      $('[class*="ChatInput__sendBtn"], [class*="SmilesButton"]').on('click', () => { $('.language-chooser').addClass("hidden") })

      // click language button
      $('.model-chat-public').off().on('click', '.se-langpicker', function(e) {
          if(!$('.model-chat .language-chooser').length) {
              $('.model-chat .model-chat-content').before(htmlLangChooser);

              // add all languages
              populateLanguageDropdowns()
          } else {
              $('.model-chat-public .language-chooser').toggleClass('hidden')
          }
      })

      // reset language on right click
      $(".se-langpicker").on("contextmenu", function() { return false; });
      $('#body').on('mousedown', '.se-langpicker', function(e) {
          if( e.button == 2 ) {
            $('.se-langpicker').find('.flag,use').remove()
            $('.language-chooser .flag').removeClass('active')
            $('.se-langpicker').attr('data-active', '')
            localStorage.setItem('prefTranslationLang', "")
            return false;
          }
          return true;
      })

      // close language chooser
      $('.model-chat').on('click', '.close-language-chooser', function(e) {
          $('.language-chooser').addClass("hidden")
      })

      // select/switch language
      $('.model-chat-public').on('click', '.language-chooser .flag', function(e) {

          $('.se-langpicker').find('.flag,use').remove()
          if($(this).hasClass('active')) {
              $(this).removeClass('active')
              $('.se-langpicker').attr('data-active', '')
              localStorage.setItem('prefTranslationLang', "")
          } else {
            $('.se-langpicker').prepend($(this).html())
            $('.language-chooser .flag.active').removeClass('active')
            $(this).addClass('active')
            $('.se-langpicker').attr('data-active', $(this).attr('data-lang'))
            localStorage.setItem('prefTranslationLang', $(this).attr('data-lang'))
            $('.language-chooser').addClass("hidden")
          }
      })

      // search language by html attributes
      $(".model-chat").on("keyup", ".language-search", function() {
          var value = this.value.toLowerCase().trim();
        if(value.length) {
          $(".language-list button").show().filter(function() {
              return $(this).attr("data-search").toLowerCase().trim().indexOf(value) == -1;
          }).hide();
        } else {
          $(".language-list button").show();
        }
      });

      // clear search input
      $('.model-chat').on('search', '.language-search', function() {
        if(this.value === "") {
          $(".language-list button").show()
        }
      });

  }


  // add lang dropdown to private chats
  waitForKeyElements(".messenger-chat .chat-input", addLangDropdownPrivateChats, false);
  function addLangDropdownPrivateChats(jNode) {
    let privateChat = $(jNode).closest('.messenger-chat')
    let privateChatSubmit = $(jNode).find('.a11y-button')
    let privateChatInput = privateChat.find('[class*="ChatInput__input"]')
    let privateLangSelect = privateChat.find('.se-langpicker')

    // add language dropdown
    if(!$(jNode).find('.language-picker').length) {
      $(jNode).find('[class*="ChatInput__inputBlock"]').before('<div class="language-picker js-language-picker"><div class="se-langpicker" title="Switch language"><svg width="24" height="24" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="iconify iconify--gis" fill="currentColor"><path d="M1.575.17v.606h.53a1.6 1.6 0 0 0-.102-.232c-.119-.216-.27-.346-.428-.373m-.15.006c-.148.037-.288.164-.4.367Q.967.65.923.776h.502zm-.346.04A1.35 1.35 0 0 0 .36.776h.404Q.818.609.893.471q.081-.148.186-.254m.882.014q.096.103.173.24.076.138.129.305h.377a1.35 1.35 0 0 0-.678-.545M.278.926a1.3 1.3 0 0 0-.126.499h.504q.01-.265.066-.499zm.599 0c-.04.152-.065.321-.071.499h.619V.926zm.698 0v.499h.647a2.3 2.3 0 0 0-.071-.499zm.731 0q.056.234.066.499h.476a1.3 1.3 0 0 0-.126-.499zm-2.154.649a1.3 1.3 0 0 0 .126.499h.437a2.5 2.5 0 0 1-.06-.499zm.653 0c.004.177.027.346.064.499h.556v-.499zm.77 0v.499h.583q.057-.23.064-.499zm.797 0a2.5 2.5 0 0 1-.06.499h.41a1.3 1.3 0 0 0 .126-.499zM.36 2.224c.159.249.396.443.679.545a1.2 1.2 0 0 1-.146-.211 1.7 1.7 0 0 1-.139-.335zm.552 0q.048.145.113.263c.105.191.235.314.373.359l.028.002v-.624zm.663 0v.624l.064-.005c.135-.047.261-.17.364-.356q.065-.117.113-.263zm.698 0a1.7 1.7 0 0 1-.139.335 1 1 0 0 1-.132.194 1.35 1.35 0 0 0 .637-.529z" /></svg></div></div>');
    }

    // add own keypress event
    $(jNode).find('[class*="ChatInput__input"]').off().on('keydown', function(e) {

        if(e.which == 13) {
          e.preventDefault()
          e.stopImmediatePropagation()
          e.stopPropagation()

          $(this).closest('.messenger-chat').find('.language-chooser').addClass("hidden")

          if(privateLangSelect.attr('data-active')) {
              let lang = privateLangSelect.attr('data-active').toLowerCase()
              $(this).closest('.messenger-chat').find('[class*="ChatInput__inputBlock"]').append('<span class="se-loader-line"></span>') // TODO please as before

              translateGoogle(privateChatInput.val(), lang).then(function(data) {
                alert("ok translated")
                  // TODO: console.log missing/wrong languages
                  privateChatInput.val('')
                  $('.messenger-chat .se-loader-line').remove()
                  privateChatInput.focus()
                  document.execCommand('insertText', false, decodeURIComponent(data.data.translations[0].translatedText))
                  privateChatSubmit.click()
              });
          } else {
              // no translation needed
              privateChatSubmit.click()
          }
        }
    })

    // open language picker click handler
    privateChat.on('click', '.se-langpicker', function(e) {

        if(!privateChat.find('.language-chooser').length) {

          // add language picker overlay
          if(!privateChat.find('.language-chooser').length) {
              privateChat.find('.content-messages').append(htmlLangChooserPrivates);
          }

          // add all languages
          populateLanguageDropdowns()

          // preselect if choosen before
          if(prefTranslationLang) {
            setTimeout(function() {
              privateChat.find('.se-langpicker').attr('data-active', prefTranslationLang)
              privateChat.find('.se-langpicker').prepend('<span class="fi fi-'+prefTranslationLang+'"></span>')
            }, 500);
          }

          setTimeout(() => { $('.flag[data-lang="'+prefTranslationLang+'"]').addClass("active") }, 300);
        } else {
          privateChat.find('.language-chooser').toggleClass("hidden")
        }
    })

      // select/switch language
      $('.messenger-chats').on('click', '.flag', function(e) {

        if($(this).hasClass('active')) {
            privateLangSelect.find('.fi').remove()
            $(this).removeClass('active')
            privateLangSelect.attr('data-active', '')
            localStorage.setItem('prefTranslationLang', "")
        } else {
            privateLangSelect.find('.fi').remove()
            privateLangSelect.prepend($(this).html())
            privateChat.find('.language-chooser .flag.active').removeClass('active')
            $(this).addClass('active')
            privateLangSelect.attr('data-active', $(this).attr('data-lang'))
            localStorage.setItem('prefTranslationLang', $(this).attr('data-lang'))
        }
        privateChat.find('.language-chooser').toggleClass("hidden")
      })

      // close language chooser
      privateChat.on('click', '.close-language-chooser', function(e) {
        privateChat.find('.language-chooser').toggleClass("hidden")
      })
  }


  /**
   * Ticket Shows Filtering
   */

  // add starting soon toggle filter
  waitForKeyElements(".separated-filters", addTicketShowsFilters);
  function addTicketShowsFilters(jNode) {

    // only on "ticket and group shows" page
    if(window.location.toString().includes("/girls/ticket-and-group-shows")) {

      // add toggle markup
      let toggleSwitchShowType = '<div class="switch-show-type se-switcher"><div class="default light switcher"><div class="switcher-wrapper"><span class="switcher-label"><svg class="icon icon-check"><use xlink:href="#icons-check"></use></svg></span><span class="switcher-switch"></span><span class="switcher-label"></span></div></div><input type="checkbox" value="1"> <span class="model-chat-nav-item-label">Starting soon</span></div>'
      $(jNode).append(toggleSwitchShowType)

      // preset toggle
      if(localStorage.getItem('ticketGroupShowTypePref') === "1") {
        $('.switch-show-type input[type="checkbox"]').prop('checked', true)
        $('.switch-show-type').find('.switcher').addClass("on")
      }

      // filter by html el
      $('#body').on('click', '.switch-show-type', function(e) {
        let that = this
        localStorage.setItem('ticketGroupShowTypePref', ($(that).find('input[type="checkbox"]').prop('checked') ? "1" : "0"))


        var filteredCams = $('.model-list-item').show().filter(function() {
          return ($(that).find('input[type="checkbox"]').prop('checked') ? $(this).find('[class*="GroupShowTitleBadge"]').length >= 1 : false)
        }).hide();
      })
    }
  }
  waitForKeyElements(".model-list-item", filterTicketShowsListing, false);
  function filterTicketShowsListing(el) {

    // only on "ticket and group shows" page
    if(window.location.toString().includes("/girls/ticket-and-group-shows")) {
      
      if(
        localStorage.getItem('ticketGroupShowTypePref') === "1"
        && $(el).find('[class*="GroupShowTitleBadge"]').length
      ) {
        $(el).hide()
      }
    }
  }


  /**
   * Translate Thumbnail Descriptions
   */
  waitForKeyElements('.model-list-item [class*="ModelThumbShowTopic"]', translateThumbnailDescriptions);
  function translateThumbnailDescriptions(jNode) {

    // append translate button
    $(jNode).append(htmlTranslateButton)


      $(jNode).off().on('click', '.translate-line button', function(e) {
        e.preventDefault
        let text = $(jNode).text().trim()
        let that = $(this)
        $(this).prop('disabled', true)

        translateGoogle(text, 'en_US').then(function(data) {
          that.text(decodeURIComponent(data.data.translations[0].translatedText))
          $(this).prop('disabled', false).remove()
        })
      })
  }

  /**
   * Profile Tip Menu Translation & Sorting
   */
  waitForKeyElements(".profile-tip-menu", translateProfileTipMenu, false);
  function translateProfileTipMenu(jNode) {

    // add translate button
    let test = '<div class="profile-tip-menu__activity-wrapper se-translate"><div class="TipMenuGoogleTranslateButton#Rv"><button class="a11y-button TipMenuGoogleTranslateButton__button#T2" type="button"><span class="TipMenuGoogleTranslateButton__icon#jh"></span><span class=""><span class="TipMenuGoogleTranslateButton__translate#WA">Translate</span> Tip menu into English</span></button></div>'
    $(jNode).find('.profile-tip-menu__activities > div').prepend(test)

    // add sorting button
    $(jNode).find('.profile-tip-menu__header').append(htmlSortByTokensButton)


    $('.profile-tip-menu').on('click', '.se-tipmenu-sort button', function(e) {
      sortTipmenuByPrice('.profile-tip-menu__scroll-container', '.profile-tip-menu__activity-wrapper', '.profile-tip-menu__activity span:last-child')
      return false
    })

    $('.profile-tip-menu__activity-wrapper').on('click', '.se-translate button', function(e) {

      var tableArr = [];
      $(".profile-tip-menu__activity-wrapper:not(.se-translate)").each(function(index) {
        tableArr.push($(this).find('span:first-child').text());
        $(this).attr("data-index", index)
      });

      // TEMP: Replace with GM_xmlHttpRequest
      $.ajax('https://translation.googleapis.com/language/translate/v2?key='+googleApiKey, {
        data : JSON.stringify({"q": tableArr,"target": "en_US"}),
        contentType: "application/json; charset=utf-8",
        type : 'POST',
        dataType: 'json',
        success: function(data){
          if(!data.data.translations) return
          $(data.data.translations).each(function(index, val) {
            $('.profile-tip-menu__activity-wrapper[data-index="'+index+'"] span:first-child').text(val.translatedText)
          });
        }
      })
  })
}


/**
 * Model info overlay on listing pages
 */
waitForKeyElements('.favorites .list-items-container', addOverlayButtons);
function addOverlayButtons(jNode) {

  $(jNode).find('[class*="ModelThumbUpper"]').append('<div class="se-model-info model-additional-menu-newtab model-additional-menu model-additional-menu--model-list-item model-list-item-additional-menu-wrapper"><div id="model-additional-menu-button-567" class="model-additional-menu__button">+</div></div>')

  // apapend click handler
  $('.favorites').on('click', '.se-model-info', function(e) {
    e.preventDefault()
    $('.model-list-item .overlay').remove()
    let model = $(this).closest('.model-list-item');
    let username = model.find('[class*="ModelThumbUsername"]').text();
    model.addClass("active")

    // get api data
    $.getJSON('https://stripchat.com/api/front/v2/models/username/'+username+'/cam').done((data) => {
      this.data = data
      let overlayHtml = htmlModelOverlay

      // replace vars
      const regex = /\[(.*?)\]/g
      let m;
      while ((m = regex.exec(htmlModelOverlay)) !== null) {
        const arrTraverse = m[1].split(".");
        let res = this.data
        $.each(arrTraverse, function(i, v) {
          res = res[v]
        })
        overlayHtml = overlayHtml.replace('['+m[1]+']', res)
      }
      $(this).append(overlayHtml)
    });

    return false;
  })
}


/**
 * Favorites Filtering
 */
waitForKeyElements(".favorites h1.title-ds", addFavoritesFilters, false);
function addFavoritesFilters() {

  // add country filter
  if(!$('.model-chat .filters-favorites.page-block').length) {

    // add filters block html
    $(".favorites [class^='FavoritesHeaderWithActions__title_wrapper'] > div:first-child").after(getResource('html/favorites-filters.html'))

    // populate country filter
    $('.model-list-item .country-flag').each(function() {
      if(!$('select[name="filters[country]"] option[value="'+$(this).attr('title')+'"]').length) $('select[name="filters[country]"]').append('<option value="'+$(this).attr('title')+'">'+$(this).attr('title')+'</option')
    })
  }

  $('#body').on('change', '.filters-favorites .country select', function(e) {
    let country = $(this).val().toLowerCase()
    if(country !== "") {
      var filteredCountries = $('.model-list-item').show().filter(function() {
        return (!$(this).find('.model-list-item-country').length || $(this).find('.model-list-item-country').attr('title').toLowerCase().indexOf(country) === -1)
      }).hide();
    } else {
      $('.model-list-item').show()
    }
  })

  $('#body').on('input search', '.filters-favorites .search input', function(e) {
    let username = $(this).val().toLowerCase()
    var filteredUsers = $('.model-list-item').show().filter(function() {
      return $(this).find('[class^="ModelThumbUsername"]').text().toLowerCase().indexOf(username) === -1
    }).hide();
  })
}
waitForKeyElements(".favorites-page .model-list-item", filterFavoritesPageListing, false);
function filterFavoritesPageListing(el) {
  console.log("yoo")

  if($(el).find('.filters-favorites .search input').val()) {
    let username = $(this).val().toLowerCase()
    var filteredUsers = $('.model-list-item').show().filter(function() {
      return $(this).find('[class^="ModelThumbUsername"]').text().toLowerCase().indexOf(username) === -1
    }).hide();
  }
}


/**
 * Do Not Disturb Mode
 */
waitForKeyElements('.model-chat-nav', addDefaultEmojis);
function addDefaultEmojis(jNode) {

  // append dnd toggle
  $(jNode).find('.chat-settings').before('<div class="switch-dnd-mode model-chat-nav-item se-switcher"><span class="model-chat-nav-item-label">DND</span><div class="default light switcher"><div class="switcher-wrapper"><span class="switcher-label"><svg class="icon icon-check"><use xlink:href="#icons-check"></use></svg></span><span class="switcher-switch"></span><span class="switcher-label"></span></div></div><input type="checkbox" value="1"></div>')
}


/**
 * Global Functions
 */

// Get extension resources
function getResource(path) {
  let data

  $.ajax({
    url:chrome.runtime.getURL(path),
    success: function(html) {
      data = html;
    },
    async: false}
  )
    
  return data
}

// Switch Toggle
waitForKeyElements('#body', addBodyShit);
function addBodyShit(jNode) {

  $('#body').on('click', '.se-switcher', function(e) {
    $(this).find('.switcher').toggleClass("on")
    $(this).find('input[type="checkbox"]').prop('checked', function (i, val) {
      return !val;
    }).trigger('change');
  })
}

// Google Cloud Translation API
function translateGoogle(val, lang) {
  let data = $.getJSON('https://translation.googleapis.com/language/translate/v2?key='+googleApiKey+'&q='+encodeURIComponent(val)+'&target='+lang.toString().trim()).fail(function(data) {
    data = $.parseJSON(data.responseText)

    // error handling
    if(data.error.code) {
      console.log("[StripChat Enhanced] Translation Error: "+data.error.message)
      $('.model-chat-content').append('<div class="model-chat-error"><div class="group-show-in-progress-message m-bg-error message message-base system-text-message system-text-message-error"><div class="message-body"><span class="system-text-message__body"><span class="">[StripChat Enhanced] Translation Error. <em>Please check the browser\'s console (F12) for more information.</small></span></span></div></div></div>')

      // close error
      $('.model-chat-error').on('click', function() { $(this).remove() })
    }
  });

  return data
}

// populate languages to dropdowns and language lists
function populateLanguageDropdowns() {

  $.each(iso639_langs, function(key, val) {
    if(val.active === 1) {
      //$('.language-list').prepend( '<button aria-label="'+val.name+'" class="SmilersWidgetSpicyList__smile#mG flag" type="button" title="'+val.name+'" data-search="'+val.name+'|'+val.nativeName+'|'+key+'" data-lang="'+key+'"><span class="fi fi-'+key+'" title="'+val.name+' ('+val.nativeName+')"></span></button>');
      $('.language-list').prepend('<button aria-label="'+val.name+'" class="SmilersWidgetSpicyList__smile#mG flag" type="button" title="'+val.name+'" data-search="'+val.name+'|'+val.nativeName+'|'+key+'" data-lang="'+key+'"><svg class="flag flag-'+key+'"><use xlink:href="#'+key+'"></use></svg></button>')
    }
  });
}

// sort tip menu by token price
function sortTipmenuByPrice(el, sub, item) {
  var tb = $(el)
  var rows = tb.find(sub)
  rows.sort((a, b) => {
    return $(a).find(item).text() - $(b).find(item).text()
  });
  $.each(rows, (index, row) => {
    tb.append(row)
  });
}