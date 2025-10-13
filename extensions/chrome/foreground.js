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
var htmlTicketGroupshowsFilters = getResource("html/filters-ticketgroupshows.html");
var htmlTranslateButton = '<span class="translate-line"><button class="a11y-button TranslateButton#ZN TranslateButton_outline#qg chat-message-translate-button" style="float: none; display: inline-block;" type="button"><svg style="height: 14px; width: 14px;" class="IconV2__icon#YR" viewBox="0 0 16 14"><path fill="currentColor" fill-rule="evenodd" d="M10.28 1.72V3h-1.5a18.53 18.53 0 0 1-2.6 4.52l.05.05c.43.46.86.93 1.3 1.38l-.9.9c-.37-.36-.72-.74-1.07-1.13l-.2-.21c-.9.99-1.9 1.88-3 2.67l-.77-1.02.03-.02a17.36 17.36 0 0 0 2.87-2.58c-.52-.6-1.03-1.19-1.52-1.8L2.1 4.68l1-.8.86 1.08c.44.54.9 1.07 1.36 1.6C6.15 5.46 6.84 4.27 7.4 3H.68V1.72h4.48V.44h1.28v1.28h3.84Zm5.04 11.84h-1.38L13 11.32H9.48l-.93 2.24H7.17l3.32-8H12l3.33 8ZM11.24 7.1l-1.22 2.94h2.45L11.24 7.1Z" clip-rule="evenodd"></path></svg></button></span>'
var htmlSortByTokensButton = '<p class="se-tipmenu-sort text-center"><button class="a11y-button TipMenuDiscountViewCamPanel__button#be" type="button"><svg class="TipMenuDiscountViewCamPanel__diamond#DY icon icon-watch-history"><use xlink:href="#icons-watch-history"></use></svg><small>Sort by Tokens</small></button></p>'


/**
 * Save Player Volume
 */
waitForKeyElements(".mse-player video", savePlayerVolume, false);
function savePlayerVolume(el) {
  let player = $('.mse-player video')

  if(localStorage.getItem("SE_playerVolume")) {
    $('.mse-player video').get(0).volume = localStorage.getItem("SE_playerVolume")
  }

  $(el).on('volumechange', function(e) {
    localStorage.setItem("SE_playerVolume", player.get(0).volume)
  })
}


/**
 * Save Favorites Order
 */
waitForKeyElements("[class*='ModelsOrderDropdown__content']", saveFavoritesSorting);
function saveFavoritesSorting(el) {

  $("[class*='ModelsOrderDropdown__content']").off().on('click', 'a', function() {
    let path = location.pathname
    $("[class*='SidebarLink'][href='/favorites']").attr("href", path)
    localStorage.setItem("SE_favoritesSorting", path)
    localStorage.setItem("SE_favoritesSortingName", $(this).text())
  })
}


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
 * Message templates
 */
waitForKeyElements('[class*="ChatInput__inputActionBtn"]', addMessageTemplates, false);
function addMessageTemplates(el) {

  if(!$('.se-message-templates-btn').length)
    $('.model-chat-input input').after('<div class="ChatInput__inputActionsContainer#iM"><button class="se-message-templates-btn ChatInput__inputActionBtn#a_ ChatInput__smilesBtn#tx SmilesButton__btn#Dr" type="button" aria-label="Show smiles"><svg class="IconV2__icon#YR" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2.16 2.16" xml:space="preserve"><path d="M.836 2.048a.06.06 0 0 1-.06-.061l.006-.224H.631c-.114 0-.197-.094-.197-.21V.768c0-.113.082-.205.197-.205h1.204c.114 0 .22.092.22.205v.784c0 .116-.105.21-.22.21h-.582l-.382.274a.06.06 0 0 1-.035.012M.632.683C.583.683.555.72.555.768v.784c0 .049.029.09.077.09h.212a.06.06 0 0 1 .06.061L.9 1.867l.3-.215a.06.06 0 0 1 .035-.012h.602c.048 0 .1-.041.1-.09V.768c0-.048-.05-.085-.1-.085z"/><path d="M.201 1.264q-.019 0-.034-.015a.2.2 0 0 1-.062-.147V.318c0-.113.082-.205.197-.205h1.204c.114 0 .22.092.22.205v.035a.06.06 0 0 1-.12 0V.318c0-.048-.05-.085-.1-.085H.301C.252.233.224.27.224.318v.784c0 .023.003.042.021.058.025.022.024.06.002.084a.07.07 0 0 1-.048.02"/><path d="M1.023.952h-.24a.03.03 0 1 1 0-.06h.24a.03.03 0 1 1 0 .06m.421 0h-.3a.03.03 0 1 1 0-.06h.3a.03.03 0 1 1 0 .06m.24 0h-.12a.03.03 0 1 1 0-.06h.12a.03.03 0 1 1 0 .06m-.781.15h-.12a.03.03 0 1 1 0-.06h.12a.03.03 0 1 1 0 .06m.36 0h-.24a.03.03 0 1 1 0-.06h.24a.03.03 0 1 1 0 .06m.421 0h-.3a.03.03 0 1 1 0-.06h.3a.03.03 0 1 1 0 .06m-.6.181H.783a.03.03 0 1 1 0-.06h.3a.03.03 0 1 1 0 .06m.42 0h-.3a.03.03 0 1 1 0-.06h.3a.03.03 0 1 1 0 .06m.181 0h-.06a.03.03 0 1 1 0-.06h.06a.03.03 0 1 1 0 .06m-.781.149h-.12a.03.03 0 1 1 0-.06h.12a.03.03 0 1 1 0 .06m.331 0h-.21a.03.03 0 1 1 0-.06h.21a.03.03 0 1 1 0 .06"/></svg></button></div>')

  $('.se-message-templates-btn').off().on('click', function(e) {
    
    // append overlay
    if($(this).closest('.model-chat-public').find('.model-chat__smiles-block .se-message-templates').length) {
      $('.se-message-templates').toggleClass('hidden').prev().toggleClass('hidden')
    } else {
      $('.model-chat__smiles-block').append('<div class="SmilesWidgetContainer#AW se-message-templates visible-enter-done"><div class="SmilesWidgetContainer__titleBlock#Uy title-block"><span class="se-add-message add-icon-wrapper"><svg class="icon icon-add"><use xlink:href="#icons-add"></use></svg></span><div class="search"><input class="ModelSearch__input#st inline-block input text-default theme-default se-msg-tpl-search" name="s" type="search" value="" placeholder="Search message templates ..."></div><button type="button" class="se-close-message-tpl SmilesWidgetContainer__closeBtn#GV" title="Close Languages"><svg style="height:20px;width:20px" class="IconV2__icon#YR" viewBox="0 0 24 24"><path fill="currentColor" d="M20.027 3.985a1.27 1.27 0 0 0-1.796 0L12 10.203l-6.23-6.23a1.27 1.27 0 0 0-1.797 0 1.27 1.27 0 0 0 0 1.796L10.203 12l-6.23 6.23a1.27 1.27 0 0 0 0 1.797c.497.497 1.3.497 1.796 0L12 13.797l6.23 6.23c.498.497 1.3.497 1.797 0s.497-1.3 0-1.796L13.797 12l6.23-6.23c.485-.485.485-1.3 0-1.785"/></svg></button></div><ul class="se-messages-tpl-list"><li class="empty">You haven\'t added any messages yet</ul><span class="no-results hidden">No messages found.</span></div>')
      $('.se-message-templates').prev().toggleClass('hidden')
      
      // fetch & insert templates
      let templates = [
        "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet2.",
        "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet2.",
        "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet3.",
        "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet4."
      ]
      if(templates) {
        $.each(templates, (k, v) => {
          $('.se-messages-tpl-list').append('<li class="se-message-tpl"><span>'+v+'</span></li>')
        })
        $('.empty').addClass('hidden')
      } else {
        $('.empty').removeClass('hidden')
      }

      // click message
      $('.se-add-message').off().on('click', function() {
        alert("add message")
      })

      // click message
      $('.se-messages-tpl-list span').on('click', function() {
        $('.model-chat-input input').val('').focus()
        document.execCommand('insertText', false, $(this).text())
        $('.se-message-templates').toggleClass('hidden')
      })

      // close overlay
      $('.se-close-message-tpl').on('click', function() {
        $('.se-message-templates').toggleClass('hidden')
      })

      // search messages
      $(".se-msg-tpl-search").off().on("keyup", function() {
        var value = this.value.toLowerCase().trim();
        if(value.length) {
          let results = $(".se-message-tpl").show().filter(function() {
              return $(this).text().toLowerCase().indexOf(value) == -1;
          }).hide();
        } else {
          $(".se-message-tpl").show();
        }
      })
    }
  })

}


/**
 * Message Translation
 */
waitForKeyElements(".messages", hideChatUsers, false);
function hideChatUsers(jNode) {

  // observe messages div
  var observer = new MutationObserver(function(e) {

      // add translation button to regular messages
      $(jNode).find('.regular-message.message__more-menu--hidden:not(.se-processed)').slice(-50).each(function(index, item) {
          if(!$(this).find('.message-body .translate-line').length) {
            $(this).find('.message-body').append(htmlTranslateButton)
            $(this).addClass("se-processed")
          }
      })

      // auto translate
      if($('.switch-auto-translate input[type="checkbox"]').is(':checked')) {
        $(jNode).find('.regular-message.message__more-menu--hidden:not(.se-hidden):not(.se-translated)').slice(-1).each(function(index, item) {
          let that = $(this)
          let ell = $(this).find('.message-body').clone()
          ell.find('.username,.message-body-mention,.message-timestamp,>span,button,.goal-block,.group-show-message-title,.group-show-announce-topic-label,.group-show-announce-controls').remove()
          let text = ell.text().trim()

          translateGoogle(text, 'en_US', $('.model-chat-content')).then(function(data) {
            if(!that.find('.message-body').find('.translated-line').length) {
                that.find('.message-body').find('.translate-line').before('<small class="translated-line">'+decodeHtml(data.data.translations[0].translatedText)+'</small>')
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

      translateGoogle(text, 'en_US', $('.model-chat-content')).then(function(data) {
        if(!that.closest('.message-body').find('.translated-line').length) {
            that.closest('.message-body').find('.translate-line').before('<small class="translated-line">'+decodeHtml(data.data.translations[0].translatedText)+'</small>')
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

    translateGoogle(text, 'en_US', $('.model-chat-content')).then(function(data) {
      if(!that.closest('div').find('.translated-line').length) {
          that.closest('div').find('.translate-line').before('<small class="translated-line">'+decodeHtml(data.data.translations[0].translatedText)+'</small>')
      }
      $(this).prop('disabled', false)
    })
  })
}


/**
 *  Add Translation Button to Stream Description
 */
waitForKeyElements('[class*="ViewCamShutterWrapper__status"]', addTransButtonCamGroup, false);
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

      translateGoogle(text, 'en_US', $('.model-chat-content')).then(function(data) {
        if(!that.closest('[class*="ViewCamGroup__description"] .translated-line').length) {
            that.closest('[class*="ViewCamGroup__description"]').find('.translate-line').before('<small class="translated-line">'+decodeHtml(data.data.translations[0].translatedText)+'</small>')
        }
        $(this).prop('disabled', false)
      })
  })
}


/**
 * True Fullscreen & Picture in Picture
 */
waitForKeyElements(".player-controls-user__right-buttons", videoAddPip, false);
function videoAddPip(el) {

  // midclick fullscreen
  $('.video').off().on('mousedown', '.player-controls-layers__layer--toggle,.video-element', function(e) {
    if(e.which === 2) {
      e.preventDefault();
      toggleFullscreen(document.getElementsByClassName('video-element')[0])
    }
  });
  
  // true fullscreen
  $(el).append('<button class="se-fullscreen btn ds-btn-inline-block overflow-visible player-controls-user__button player-top-button" type="button"><svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.24 10.24" xml:space="preserve"><path d="m1.862 2.792 0.93 -0.93 -0.93 -0.932L2.792 0H0v2.792l0.93 -0.93zm0 4.656 -0.93 0.93L0 7.448V10.24h2.792l-0.93 -0.93 0.93 -0.93zm5.586 -4.656H2.792v4.654h4.654V2.792zm-0.932 3.724H3.724V3.724h2.792zM7.448 0l0.93 0.93L7.448 1.86l0.93 0.93L9.308 1.86l0.93 0.93V0zm0.93 7.448 -0.93 0.93 0.93 0.93 -0.93 0.932H10.24V7.448l-0.93 0.93z" fill="#fff"/></svg></button>')
  $('.se-fullscreen').on('click', function(e) {
      $(this).attr('disabled', true)
      toggleFullscreen(document.getElementsByClassName('video-element')[0])
      $(this).attr('disabled', false)
  });

  // pip
  $(el).append('<button class="se-pip btn ds-btn-inline-block overflow-visible player-controls-user__button player-top-button" type="button"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pip"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" fill="#fff"/><path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" fill="#fff"/></svg></button>')
  $('.se-pip').on('click', function(e) {
    $(this).attr('disabled', true)
    openPip(document.getElementsByClassName('video-element')[0])
    $(this).attr('disabled', false)
  });
}
function toggleFullscreen(elem) {

    if (document.fullscreenElement === elem) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    } else {
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
        $(jNode).children('div').prepend(htmlLangPicker);
        
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

                translateGoogle(modelChatInput.val(), $('.se-langpicker').attr('data-active').toLowerCase(), $('.model-chat-content')).then(function(data) {
                    // TODO: console.log missing/wrong languages
                    modelChatInput.val('')
                    modelChatInput.focus()
                    document.execCommand('insertText', false, decodeHtml(data.data.translations[0].translatedText))
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


/**
 * Ticket Shows Filtering
 */

// add starting soon toggle filter
waitForKeyElements(".multiple-categories-wrapper .separated-filters", addTicketShowsFilters, false);
function addTicketShowsFilters(jNode) {

  // only on "ticket and group shows" page
  if(window.location.toString().includes("/girls/ticket-and-group-shows")) {
    
    // add toggle markup
    $(jNode).append(htmlTicketGroupshowsFilters)

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
    
    // show all
    $('.filters-favorites').on('click', '.show-all', function(e) {
      $('.model-filter-link').removeClass('active')
      $(this).closest('.model-filter-link').addClass('active')
      $('.model-list-item').removeClass('hidden')
      $('.filters-favorites .search input').val("")
    })

    // in ticket show
    $('.filters-favorites').on('click', '.in-ticket-show', function(e) {
      $('.model-filter-link').removeClass('active')
      $(this).closest('.model-filter-link').addClass('active')
      $('.model-list-item').removeClass('hidden').filter(function() {
        return $(this).find('[class*="ModelListItemBadge__ticketShow"]').length === 0
      }).addClass('hidden')
    })

    // in group show
    $('.filters-favorites').on('click', '.in-group-show', function(e) {
      $('.model-filter-link').removeClass('active')
      $(this).closest('.model-filter-link').addClass('active')
      $('.model-list-item').removeClass('hidden').filter(function() {
        return $(this).find('[class*="ModelListItemBadge__groupShow"]').length === 0
      }).addClass('hidden')
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

    if($('.features .in-ticket-show.active').length && $(el).find('[class*="ModelListItemBadge__ticketShow"]').length === 0) $(el).addClass('hidden')
    if($('.features .in-group-show.active').length && $(el).find('[class*="ModelListItemBadge__groupShow"]').length === 0) $(el).addClass('hidden')
  }
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
    $.getJSON('/api/front/v2/models/username/'+username+'/cam').done((data) => {
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
waitForKeyElements(".favorites-page .model-list-container", preselectFavoritesPageGrid, false);
function preselectFavoritesPageGrid(el) {
  if(!$('.list-items-container[data-grid]').length) {
    let columns = localStorage.getItem("SE_gridTemplate")
    if(columns) $(el).find('.list-items-container').attr('data-grid', columns)
  }
}
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

  // country filter
  $('#body').on('change', '.filters-favorites .country select', function(e) {
    let country = $(this).val().toLowerCase()
    if(country !== "") {
      var filteredCountries = $('.model-list-item').removeClass('hidden').filter(function() {
        return (!$(this).find('.model-list-item-country').length || $(this).find('.model-list-item-country').attr('title').toLowerCase().indexOf(country) === -1)
      }).addClass('hidden')
    } else {
      $('.model-list-item').removeClass('hidden')
    }
  })

  // search filter
  $('#body').on('input search', '.filters-favorites .search input', function(e) {
    let username = $(this).val().toLowerCase()
    var filteredUsers = $('.model-list-item:not(.hidden)').removeClass('hidden').filter(function() {
      return $(this).find('[class^="ModelThumbUsername"]').text().toLowerCase().indexOf(username) === -1
    }).addClass('hidden');
  })

  // show all
  $('.filters-favorites').on('click', '.show-all', function(e) {
    $('.model-filter-link').removeClass('active')
    $(this).closest('.model-filter-link').addClass('active')
    $('.model-list-item').removeClass('hidden')
    $('.filters-favorites .search input').val("")
  })

  // in ticket show
  $('.filters-favorites').on('click', '.in-ticket-show', function(e) {
    $('.model-filter-link').removeClass('active')
    $(this).closest('.model-filter-link').addClass('active')
    $('.model-list-item').removeClass('hidden').filter(function() {
      return $(this).find('.icon-ticket').length === 0
    }).addClass('hidden')
  })

  // in group show
  $('.filters-favorites').on('click', '.in-group-show', function(e) {
    $('.model-filter-link').removeClass('active')
    $(this).closest('.model-filter-link').addClass('active')
    $('.model-list-item').removeClass('hidden').filter(function() {
      return $(this).find('.icon-group-ds').length === 0
    }).addClass('hidden')
  })

  // in private show
  $('.filters-favorites').on('click', '.in-private-show', function(e) {
    $('.model-filter-link').removeClass('active')
    $(this).closest('.model-filter-link').addClass('active')
    $('.model-list-item').removeClass('hidden').filter(function() {
      return (
        $(this).find('.model-list-private-badge').text().toLowerCase().indexOf("in private") === -1
        && !$(this).find('[class*="ModelThumbPrivateCover__label"]').length
      )
    }).addClass('hidden')
  })

  // switch grid template
  var cols = localStorage.getItem("SE_gridTemplate")
  $('.filters-favorites').on('click', '.switch-grid-tpl', function(e) {
    e.preventDefault()
    if(!cols) cols = window.getComputedStyle(document.querySelector('.list-items-container')).getPropertyValue('--columns-count')
    cols = (parseInt(cols) <= 9 ? parseInt(cols) + 1 : 1)
    updateGridColumns(cols)
  })
  
  $('.filters-favorites').on('contextmenu', '.switch-grid-tpl', function(e) {
    e.preventDefault()
    if(!cols) cols = window.getComputedStyle(document.querySelector('.list-items-container')).getPropertyValue('--columns-count')
    cols = (parseInt(cols) > 1 ? parseInt(cols) - 1 : 10)
    updateGridColumns(cols)
  })
}
waitForKeyElements(".favorites-page .model-list-item", filterFavoritesPageListing, false);
function filterFavoritesPageListing(el) {

  if($(el).find('.filters-favorites .search input').val()) {
    let username = $(this).val().toLowerCase()
    var filteredUsers = $('.model-list-item').show().filter(function() {
      return $(this).find('[class^="ModelThumbUsername"]').text().toLowerCase().indexOf(username) === -1
    }).hide();
  }
}
function updateGridColumns(cols) {
  localStorage.setItem("SE_gridTemplate", cols)
  $('.list-items-container').attr('data-grid', cols)
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
function translateGoogle(val, lang, errordiv) {
  let data = $.getJSON('https://translation.googleapis.com/language/translate/v2?key='+googleApiKey+'&q='+encodeURIComponent(val)+'&target='+lang.toString().trim()).fail(function(data) {
    data = $.parseJSON(data.responseText)

    // error handling
    if(errordiv && data.error.code) {
      console.log("[StripChat Enhanced] Translation Error: "+data.error.message)
      $(errordiv).append('<div class="model-chat-error"><div class="group-show-in-progress-message m-bg-error message message-base system-text-message system-text-message-error"><div class="message-body"><span class="system-text-message__body"><span class="">[StripChat Enhanced] Translation Error. <em>Please check the browser\'s console (F12) for more information.</small></span></span></div></div></div>')

      // close error
      $('.model-chat-error').on('click', function() { $(this).remove() })
    }
  });

  return data
}

// decode html entities
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
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