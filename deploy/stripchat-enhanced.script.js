// ==UserScript==
// @name        Stripchat Enhanced
// @namespace   https://github.com/mewcrazy/StripChat-Enhanced
// @version     1.8
// @author      Dennis Bitsch
// @description A browser extension to enhance the features on the StripChat website
// @match       *://*.stripchat.com/*
// @match       *://stripchat.com/*
// @icon        https://mewcrazy.github.io/StripChat-Enhanced/icon.svg
// @require     https://mewcrazy.github.io/StripChat-Enhanced/deploy/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @resource    IMPORTED_CSS https://mewcrazy.github.io/StripChat-Enhanced/deploy/global.css
// @resource    CSS_FLAGS https://mewcrazy.github.io/StripChat-Enhanced/deploy/flags.css
// @resource    ISO639_FLAGS https://mewcrazy.github.io/StripChat-Enhanced/json/iso639-1.json
// @downloadURL https://mewcrazy.github.io/StripChat-Enhanced/deploy/stripchat-enhanced.script.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_addElement
// @grant       GM_getResourceText
// @inject-into page
// ==/UserScript==



(function () {
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
    const css_flags = GM_getResourceText("CSS_FLAGS");
    GM_addStyle(css_flags);

    const iso639_langs = eval("(" + GM_getResourceText("ISO639_FLAGS") + ")")
    const google_langs = $.parseJSON('{"data":{"languages":[{"language":"ab"},{"language":"ace"},{"language":"ach"},{"language":"af"},{"language":"ak"},{"language":"alz"},{"language":"am"},{"language":"ar"},{"language":"as"},{"language":"awa"},{"language":"ay"},{"language":"az"},{"language":"ba"},{"language":"ban"},{"language":"bbc"},{"language":"be"},{"language":"bem"},{"language":"bew"},{"language":"bg"},{"language":"bho"},{"language":"bik"},{"language":"bm"},{"language":"bn"},{"language":"br"},{"language":"bs"},{"language":"bts"},{"language":"btx"},{"language":"bua"},{"language":"ca"},{"language":"ceb"},{"language":"cgg"},{"language":"chm"},{"language":"ckb"},{"language":"cnh"},{"language":"co"},{"language":"crh"},{"language":"crs"},{"language":"cs"},{"language":"cv"},{"language":"cy"},{"language":"da"},{"language":"de"},{"language":"din"},{"language":"doi"},{"language":"dov"},{"language":"dv"},{"language":"dz"},{"language":"ee"},{"language":"el"},{"language":"en"},{"language":"eo"},{"language":"es"},{"language":"et"},{"language":"eu"},{"language":"fa"},{"language":"ff"},{"language":"fi"},{"language":"fj"},{"language":"fr"},{"language":"fy"},{"language":"ga"},{"language":"gaa"},{"language":"gd"},{"language":"gl"},{"language":"gn"},{"language":"gom"},{"language":"gu"},{"language":"ha"},{"language":"haw"},{"language":"he"},{"language":"hi"},{"language":"hil"},{"language":"hmn"},{"language":"hr"},{"language":"hrx"},{"language":"ht"},{"language":"hu"},{"language":"hy"},{"language":"id"},{"language":"ig"},{"language":"ilo"},{"language":"is"},{"language":"it"},{"language":"iw"},{"language":"ja"},{"language":"jv"},{"language":"jw"},{"language":"ka"},{"language":"kk"},{"language":"km"},{"language":"kn"},{"language":"ko"},{"language":"kri"},{"language":"ktu"},{"language":"ku"},{"language":"ky"},{"language":"la"},{"language":"lb"},{"language":"lg"},{"language":"li"},{"language":"lij"},{"language":"lmo"},{"language":"ln"},{"language":"lo"},{"language":"lt"},{"language":"ltg"},{"language":"luo"},{"language":"lus"},{"language":"lv"},{"language":"mai"},{"language":"mak"},{"language":"mg"},{"language":"mi"},{"language":"min"},{"language":"mk"},{"language":"ml"},{"language":"mn"},{"language":"mni-Mtei"},{"language":"mr"},{"language":"ms"},{"language":"ms-Arab"},{"language":"mt"},{"language":"my"},{"language":"ne"},{"language":"new"},{"language":"nl"},{"language":"no"},{"language":"nr"},{"language":"nso"},{"language":"nus"},{"language":"ny"},{"language":"oc"},{"language":"om"},{"language":"or"},{"language":"pa"},{"language":"pa-Arab"},{"language":"pag"},{"language":"pam"},{"language":"pap"},{"language":"pl"},{"language":"ps"},{"language":"pt"},{"language":"qu"},{"language":"rn"},{"language":"ro"},{"language":"rom"},{"language":"ru"},{"language":"rw"},{"language":"sa"},{"language":"scn"},{"language":"sd"},{"language":"sg"},{"language":"shn"},{"language":"si"},{"language":"sk"},{"language":"sl"},{"language":"sm"},{"language":"sn"},{"language":"so"},{"language":"sq"},{"language":"sr"},{"language":"ss"},{"language":"st"},{"language":"su"},{"language":"sv"},{"language":"sw"},{"language":"szl"},{"language":"ta"},{"language":"te"},{"language":"tet"},{"language":"tg"},{"language":"th"},{"language":"ti"},{"language":"tk"},{"language":"tl"},{"language":"tn"},{"language":"tr"},{"language":"ts"},{"language":"tt"},{"language":"ug"},{"language":"uk"},{"language":"ur"},{"language":"uz"},{"language":"vi"},{"language":"xh"},{"language":"yi"},{"language":"yo"},{"language":"yua"},{"language":"yue"},{"language":"zh"},{"language":"zh-CN"},{"language":"zh-TW"},{"language":"zu"}]}}')


    // modify content security policy
    // var text = $('meta[http-equiv="Content-Security-Policy"]').attr("content");
    // text = text.replace("; style-src 'self' *", "; style-src 'self' mewcrazy.github.io *");
    // text = text.replace("; script-src 'self' *", "; style-src 'self' mewcrazy.github.io *");
    // $('meta[http-equiv="Content-Security-Policy"]').attr("content", text);

    /* Include css stylsheets */
    GM_addElement('link', { rel: 'stylesheet', href: 'https://mewcrazy.github.io/StripChat-Enhanced/deploy/global.css' }); // TODO minify css
    GM_addElement('link', { rel: 'stylesheet', href: 'https://mewcrazy.github.io/StripChat-Enhanced/deploy/flags.css' }); // TODO minify css


    /* A Google API Key (for the Cloud Translation API) is needed to get this script to work */
    var googleApiKey = "AIzaSyA8m0bay1Sg545_mrZKkmEFIh5bJw7A4a8";
    var prefTranslationLang = localStorage.getItem("prefTranslationLang")
    var translationLanguages = []

    var htmlLangChooser = '<div class="language-chooser"><div class="SmilesWidgetContainer#AW SmilesWidgetContainer__chat#mq visible-enter-done"><div class="SmilesWidgetContainer__titleBlock#Uy title-block"><span class="SmilesWidgetContainer__title#wG">Translate To Language</span><div class="search"><input class="ModelSearch__input#st inline-block input text-default theme-default language-search" type="search" placeholder="Search Language"></div><button type="button" class="close-language-chooser SmilesWidgetContainer__closeBtn#GV" title="Close Languages"><svg style="height: 20px; width: 20px;" class="IconV2__icon#YR"><use xlink:href="#icons-close-ds"></use></svg></button></div><div class="SmilesWidgetContainer__content#uS" data-scroll="lock-ignore"><div class="language-list SmilesWidget__content#Ml"><span class="se-loader"></span></div></div></div></div>'
    var htmlLangChooserPrivates = '<div class="language-chooser"><div class="SmilesWidgetContainer#AW SmilesWidgetContainer__chat#mq visible-enter-done"><div class="SmilesWidgetContainer__titleBlock#Uy title-block"><span class="SmilesWidgetContainer__title#wG">Translate To Language</span><div class="search"><input class="ModelSearch__input#st inline-block input text-default theme-default language-search" type="search" placeholder="Search Language"></div><button type="button" class="close-language-chooser SmilesWidgetContainer__closeBtn#GV" title="Close Languages"><svg style="height: 20px; width: 20px;" class="IconV2__icon#YR"><use xlink:href="#icons-close-ds"></use></svg></button></div><div class="SmilesWidgetContainer__content#uS" data-scroll="lock-ignore"><div class="language-list SmilesWidget__content#Ml"><span class="se-loader"></span></div></div></div></div>'
    var htmlLangPicker = '<div id="language-picker-select" title="Switch language" class=""><svg width="24" height="24" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="iconify iconify--gis" fill="currentColor"><path d="M1.575.17v.606h.53a1.6 1.6 0 0 0-.102-.232c-.119-.216-.27-.346-.428-.373m-.15.006c-.148.037-.288.164-.4.367Q.967.65.923.776h.502zm-.346.04A1.35 1.35 0 0 0 .36.776h.404Q.818.609.893.471q.081-.148.186-.254m.882.014q.096.103.173.24.076.138.129.305h.377a1.35 1.35 0 0 0-.678-.545M.278.926a1.3 1.3 0 0 0-.126.499h.504q.01-.265.066-.499zm.599 0c-.04.152-.065.321-.071.499h.619V.926zm.698 0v.499h.647a2.3 2.3 0 0 0-.071-.499zm.731 0q.056.234.066.499h.476a1.3 1.3 0 0 0-.126-.499zm-2.154.649a1.3 1.3 0 0 0 .126.499h.437a2.5 2.5 0 0 1-.06-.499zm.653 0c.004.177.027.346.064.499h.556v-.499zm.77 0v.499h.583q.057-.23.064-.499zm.797 0a2.5 2.5 0 0 1-.06.499h.41a1.3 1.3 0 0 0 .126-.499zM.36 2.224c.159.249.396.443.679.545a1.2 1.2 0 0 1-.146-.211 1.7 1.7 0 0 1-.139-.335zm.552 0q.048.145.113.263c.105.191.235.314.373.359l.028.002v-.624zm.663 0v.624l.064-.005c.135-.047.261-.17.364-.356q.065-.117.113-.263zm.698 0a1.7 1.7 0 0 1-.139.335 1 1 0 0 1-.132.194 1.35 1.35 0 0 0 .637-.529z" /></svg></div>'
    var htmlTranslateButton = '<span class="translate-line"><button class="a11y-button TranslateButton#ZN TranslateButton_outline#qg chat-message-translate-button" style="float: none; display: inline-block;" type="button"><svg style="height: 14px; width: 14px;" class="IconV2__icon#YR" viewBox="0 0 16 14"><path fill="currentColor" fill-rule="evenodd" d="M10.28 1.72V3h-1.5a18.53 18.53 0 0 1-2.6 4.52l.05.05c.43.46.86.93 1.3 1.38l-.9.9c-.37-.36-.72-.74-1.07-1.13l-.2-.21c-.9.99-1.9 1.88-3 2.67l-.77-1.02.03-.02a17.36 17.36 0 0 0 2.87-2.58c-.52-.6-1.03-1.19-1.52-1.8L2.1 4.68l1-.8.86 1.08c.44.54.9 1.07 1.36 1.6C6.15 5.46 6.84 4.27 7.4 3H.68V1.72h4.48V.44h1.28v1.28h3.84Zm5.04 11.84h-1.38L13 11.32H9.48l-.93 2.24H7.17l3.32-8H12l3.33 8ZM11.24 7.1l-1.22 2.94h2.45L11.24 7.1Z" clip-rule="evenodd"></path></svg></button></span>'

    // Hide distracting notice messages
    GM_addStyle(`
      .messages .goal-message:not(:last-of-type){ display: none !important; }
      .messages [class*="goal-threshold"]:last-of-type { display: inline-flex !important; }
      .messages .m-bg-fan-club-tip-discount { display: none; }
      .messages .public-menu-announcement-message { display: none; }
      .messages .toy-message-interactive { display: none; }
      .messages .welcome-bot-message { display: none; }
      .messages .console-announcement { display: none; }
      .adblocker-notification { display: none !important; }
    `);

    // Hide Favorites From "Featured Model" Listings
    waitForKeyElements(".featured-model-list", hideFavoritesFromFeaturedListings);
    function hideFavoritesFromFeaturedListings(element) {
      $(element).find('.model-list-item').each(function() {
        if($(this).find('.ModelListItemBadge__favorite#vd')) {
          // $(this).remove()
        }
      })
    }

    // Hide Age Verification Modal, Cookie Notice, Ultimate Ads
    GM_addStyle(`
        #agreement-root { display: none !important }
        .cookies-reminder { display: none !important }
        [class^="SidebarBanners"] { display: none !important }
    `);


    // Make video frame resizable
    GM_addStyle(`
      .view-cam-page-main .video { resize: horizontal; overflow: overlay; height: auto; }
/*       .video > div[class*="ViewCamWrapper__video"] { height: auto !important; } */
    `);


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
    function addOptionsMenu() {

      // Output website time in header
      setInterval(function() {
        let time = $.ajax({async: false}).getResponseHeader('Date');
        if(!$('.personal-notifications-modal-panel .current-time').length) {
          $('.personal-notifications-modal-panel').prepend('<small class="current-time">'+new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })+'</small>')
        } else {
          $('.personal-notifications-modal-panel .current-time').html(new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
        }
      }, 1000)

      // Add global options flyout
      if(!$('.personal-notifications-modal-panel .open-enhanced-options').length) {

          GM_xmlhttpRequest({
              method: "GET",
              url: "//stripchat-enhanced.247camming.com/update/html_enhanced-options.html",
              onload: function(xhr) {

                  // add button
                  $('.personal-notifications-modal-panel').prepend('<button class="a11y-button dropdown-link open-enhanced-options" type="button"><span>E</span></button>')
                  $('#personal-notifications-portal-container').append(xhr.responseText)

                  // process options
                  processOptions()
              }
          });
      }
      $('#body').on('click', '.open-enhanced-options', function(e) {
          $('.enhanced-options-modal').toggleClass('hidden')
      })
      $('#body').on('click', '.enhanced-options-close', function(e) {
          $('.personal-notifications-modal').remove()
          $('.enhanced-options-modal').toggleClass('hidden')
      })
    }
    function processOptions() {

        // enable translation

        // hide auto-refill
        GM_addStyle(`
        #auto-refill.settings-island { display: none !important }
      `);

        // hide widgets: battleship
        GM_addStyle ( `
            .viewcam-widget-panel--battleships { display: none !important; }
        ` );


        // hide quick refill
        if($('.option-disable-quick-refill').val() === "1")  {

            GM_addStyle ( `
            .tokens-quick-refill-list, .instant-top-up-wrapper { display: none !important; }
        ` );
        }
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
    waitForKeyElements(".messages", hideChatUsers);
    function hideChatUsers(jNode) {

      if($("title").is(':contains("Model:")')) {

          // add "Hide User" button
          $('#body').on('click', '.message-more-menu', function() {

              setTimeout(function() {
                  $('.message-more-menu__dropdown .dropdown-content').append('<button class="a11y-button MessageModeMenuItem#rq HideUserButton" type="button"><svg class="icon icon-warning-triangle-outline-ds"><use xlink:href="#icons-warning-triangle-outline-ds"></use></svg><span>Hide User</span></button>');
              }, 50);
          })

          // "Hide User" button click event
          $('#body').on('click', '.HideUserButton', function(e) {
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
              // $.each(hiddenChatUsers, function(index, item) {
              //     // do something with `item` (or `this` is also `item` if you like)
              // });

              // add translation button to regular messages
              $(jNode).find('.regular-message.message__more-menu--hidden:not(.se-processed)').each(function(index, item) {
                  if(!$(this).find('.message-body .translate-line').length) {
                    $(this).find('.message-body').append(htmlTranslateButton)
                    $(this).addClass("se-processed")
                  }
              })

              // add translation button to tip notes
              $(jNode).find('.m-bg-public-tip:not(.se-processed)').each(function(index, item) {
                  if(!$(this).find('.tip-comment .translate-line').length) {
                    $(this).find('.tip-comment').append(htmlTranslateButton)
                    $(this).addClass("se-processed")
                  }
              })

              // add translation button to tip notes
              $(jNode).find('.goal-message:not(.se-processed)').each(function(index, item) {
                  if(!$(this).find('.goal-description__message .translate-line').length) {
                    $(this).find('.goal-description__message').append(htmlTranslateButton)
                    $(this).addClass("se-processed")
                  }
              })

          });
          observer.observe($('.messages')[0], {characterData: true, childList: true, subtree: true});


          // translate button click handler
          $('.messages').off().on('click', '.translate-line button', function(e) {
              let ell = $(this).closest('.message-body').clone()
              ell.find('.username,.message-body-mention,.message-timestamp,>span,button,.goal-block').remove()
              let text = ell.text().trim()
              let that = $(this)

              translateGoogle(text, 'en_US').then(function(data) {
                  if(!that.closest('.message-body').find('.translated-line').length) {
                      that.closest('.message-body').find('.translate-line').before('<small class="translated-line">'+data.data.translations[0].translatedText+'</small>')
                  }
              })
          })
      }
    }


    waitForKeyElements('.view-cam-info-topic', addTransButtonCamInfo);
    function addTransButtonCamInfo() {

        if(!$('.view-cam-info-goal .translate-line').length) {
            $('.view-cam-info-topic').after(htmlTranslateButton)
        }

        $('#body').on('click', '.view-cam-info-topic .translate-line button', function(e) {
            let ell = $(this).closest('.view-cam-info-topic').clone()
            // ell.find('.username,.message-body-mention,.message-timestamp,>span,button,.goal-block').remove()
            let text = ell.text().trim()
            let that = $(this)

            translateGoogle(text, 'en_US').then(function(data) {
                if(!that.closest('.view-cam-info-goal .translated-line').length) {
                    that.closest('.view-cam-info-topic').after('<small class="translated-line">'+data.data.translations[0].translatedText+'</small>')
                }
            })
        })
    }

    waitForKeyElements('[class*="ViewCamShutterWrapper__status"]', addTransButtonCamGroup);
    function addTransButtonCamGroup() {

      // add translation button to regular messages
      var observerCamGroup = new MutationObserver(function(e) {

        if(!$('[class*="ViewCamGroup__description#rQ"] .translate-line').length) {
            $('[class*="ViewCamGroup__description#rQ"]').append(htmlTranslateButton)
        }
      });
      observerCamGroup.observe($('[class*="ViewCamShutterWrapper__status"]')[0], {characterData: true, childList: true, subtree: true});
    }


    /**
     * Auto Participate in StripChat's 50 Tokens Giveaway
     */
    if(
      $('.nav-right .avatar').length // is logged in
      && $("title").is(':contains("Model:")') // only on model pages TODO: replace selector
    ) {
      waitForKeyElements(".lottery-content", autoParticipate);
      function autoParticipate(jNode) {

          // observe messages div
          var observeParticipation = new MutationObserver(function(e) {

              if(
                  $('.nav-right .avatar').length // is logged in
                  && $("title").is(':contains("Model:")') // trigger only on model pages // TODO improve detect model page with some EXISTING css class
                  && $('.lottery.open').length // only if the giveaway is ready
              ) {
                  $('.lottery .a11y-button.lottery-title-wrapper').click()
                  $(jNode).find('.btn').click()
              }

          });
          observeParticipation.observe($('.lottery-content')[0], {characterData: true, childList: true, subtree: true});
      }
    }


    /**
     * True Fullscreen
     */
    waitForKeyElements(".player-wrapper", videoAddPip);
    function videoAddPip(jNode) {
        $('.player .player-controls-user__right-buttons').append('<button class="open-pip btn ds-btn-inline-block overflow-visible player-controls-user__button player-top-button" type="button"><svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.24 10.24" xml:space="preserve"><path d="m1.862 2.792 0.93 -0.93 -0.93 -0.932L2.792 0H0v2.792l0.93 -0.93zm0 4.656 -0.93 0.93L0 7.448V10.24h2.792l-0.93 -0.93 0.93 -0.93zm5.586 -4.656H2.792v4.654h4.654V2.792zm-0.932 3.724H3.724V3.724h2.792zM7.448 0l0.93 0.93L7.448 1.86l0.93 0.93L9.308 1.86l0.93 0.93V0zm0.93 7.448 -0.93 0.93 0.93 0.93 -0.93 0.932H10.24V7.448l-0.93 0.93z" fill="#fff"/></svg></button>')
        $('.open-pip').on('click', function(e) {
            $(this).attr('disabled', true)

            const videoElement = document.getElementsByClassName('video-element')[0]
            openFullscreen(videoElement)

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


    /**
     * Add language/translation dropdown to main chat
     */
    function insertTextAtCursor(element, text) {
        element.focus();
        const startPos = element.selectionStart;
        const endPos = element.selectionEnd;
        element.value =
            element.value.substring(0, startPos) +
            text +
            element.value.substring(endPos, element.value.length);
        element.selectionStart = element.selectionEnd = startPos + text.length;
    }


    GM_addStyle ( `

      /* emoji */
      .SmilesWidget__content_default-emojis { overflow-y: scroll; }
      .SmilesWidget__content_default-emojis .active-smile { font-size: 24px }

      /* enhanced options */
      .enhanced-options-content { align-items: center; padding: 20px }
      .enhanced-options-content label { text-align: left; }

      /* language picker */
      #language-picker-select { opacity: .6; text-align: center; width: 24px; height: 24px; position: absolute; bottom: 1.25em; left: 1.25em; z-index: 1 }
      #language-picker-select:hover { opacity: 1; }
      #language-picker-select option { text-align: center; font-size: 1.35em }
      #language-picker-select .fi { margin-top: 5px; border: 1px solid rgba(255, 255, 255, .25); }
      #language-picker-select span+svg { display: none !important }
      .model-chat-input input, .chat-input textarea { padding-left: 25px }

      /* language chooser */
      .language-chooser { bottom: 60px; display: flex; max-height: 80%; position: absolute; width: 100%; z-index: 2; overflow: hidden }
      .language-chooser > div { height: 275px }
      .language-chooser .title-block { justify-content: none; gap: 30px }
      .language-chooser .title-block .search { flex-grow: 1 }

      .language-list > .flag {
        background: none;
        outline: 0;
        border: 0;
        font-size: 1.35em;
        margin: 3px;
        cursor: pointer;
        line-height: 1;
        padding: 4px 6px 3px 6px;
      }
      .language-list > .flag.active { border: 1px solid #fff }
      input[type="search"].input.language-search { background: rgba(0,0,0,.2); padding: 10px 15px; height: 30px; border-radius: 15px }
      input[type="search"].input.language-search:hover { background: rgba(0,0,0,1) }


      .HideUserButton { height: 20px; width: 20px; }

      .message-body .translate-line button { display: inline; }
      .message-body .translated-line { padding: 0 0 0 10px; }
      .message-body .translated-line + .translate-line { visibility: hidden !important; pointer-events: none; }
      .m-bg-public-tip .translate-line button { margin: 0 10px; }
      /*.message-body .translate-line button svg, .message-body .translate-line button svg path { fill: #fff; }*/
      .message-body .translate-line { visibility: hidden; }
      .message-body:hover .translate-line { visibility: visible; }

      .personal-notifications-modal.enhanced-options-modal { z-index: 314 }
      .personal-notifications-modal-panel .current-time { padding: 0 14px; }

  ` );


    waitForKeyElements(".model-chat-input", addLangDropdown);
    function addLangDropdown(jNode) {
        let modelChatInput = $(jNode).find('input')
        let modelChatSubmit = $(jNode).find('.a11y-button')

        // remove default StripChat event listeners (TODO: CHECK IF UNNECCESSARY)

        modelChatInput.unbind('focusout');
        modelChatInput.unbind('invalid');
        modelChatInput.removeAttr('enterkeyhint')

        // add dropdown html
        if(!$(jNode).children('div').find('.language-picker').length) {
            $(jNode).children('div').before(htmlLangPicker);

            // prepopulate
            populateLanguageDropdowns()

            // preselect if choosen before
            if(prefTranslationLang) {
              setTimeout(function() {
                $('#language-picker-select').data('active', prefTranslationLang)
                $('#language-picker-select').prepend('<span class="fi fi-'+prefTranslationLang+'"></span>')
              }, 1500);
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

                if($('#language-picker-select').attr('data-active')) {
                    let lang = $('#language-picker-select').attr('data-active').toLowerCase()

                    translateGoogle(modelChatInput.val(), lang).then(function(data) {
                        // TODO: console.log missing/wrong languages
                        modelChatInput.val('').focus()
                        document.execCommand('insertText', false, data.data.translations[0].translatedText)
                        modelChatSubmit.click()
                    });
                } else {
                    // no translation needed
                    modelChatSubmit.click()
                }
            }
        })

        // hide language chooser on send button click
        $('[class^="ChatInput__sendBtn"]').on('submit', function(e) {
            $('.language-chooser').addClass("hidden")
        })

        // click language button
        $('.model-chat-public').off().on('click', '#language-picker-select', function(e) {
            if(!$('.model-chat .language-chooser').length) {
                $('.model-chat .model-chat-content').before(htmlLangChooser);

                // add all languages
                populateLanguageDropdowns()
            } else {
                $('.model-chat-public .language-chooser').toggleClass('hidden')
            }
        })



        // reset language on right click
        $("#language-picker-select").on("contextmenu",function(){ return false; });
        $('#body').on('mousedown', '#language-picker-select', function(e) {
            if( e.button == 2 ) {
                $('#language-picker-select .fi').remove()
                $('.language-chooser .flag').removeClass('active')
                $('#language-picker-select').attr('data-active', '')
                localStorage.setItem('prefTranslationLang', "")
                return false;
            }
            return true;
        })

        // close language chooser
        $('.model-chat,.messenger-chats').on('click', '.close-language-chooser', function(e) {
            $('.language-chooser').toggleClass("hidden")
        })

        // select/switch language
        $('.model-chat-public').on('click', '.flag', function(e) {

            if($(this).hasClass('active')) {
                $('#language-picker-select .fi').remove()
                $(this).removeClass('active')
                $('#language-picker-select').attr('data-active', '')
                localStorage.setItem('prefTranslationLang', "")
            } else {
                $('#language-picker-select .fi').remove()
                $('#language-picker-select').prepend($(this).html())
                $('.language-chooser .flag.active').removeClass('active')
                $(this).addClass('active')
                $('#language-picker-select').attr('data-active', $(this).attr('data-lang'))
                localStorage.setItem('prefTranslationLang', $(this).attr('data-lang'))
            }
            $('.language-chooser').toggleClass("hidden")
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
    waitForKeyElements (
        ".messenger-chats",
        addLangDropdownPrivateChats
    );

    function addLangDropdownPrivateChats(jNode) {

        // observe messages div
        var observer2 = new MutationObserver(function(e) {
            console.log("private chats open")

            $(jNode).find('.messenger-chat').each(function() {

                // add language dropdown
                if(!$(jNode).find('.chat-input .language-picker').length) {
                    $(jNode).find('.chat-input > div').before('<div class="language-picker js-language-picker" data-trigger-class="li4-btn li4-btn--subtle js-tab-focus"><div id="language-picker-select" title="Switch language" class=""></div></div>');
                }

                // add language picker overlay
                if(!$(jNode).find('.language-chooser').length) {
                    $(jNode).find('.content-messages').append(htmlLangChooserPrivates);
                }
            })
        });
        observer2.observe($('.messenger-chats')[0], {characterData: true, childList: true, subtree: true});

        $('#body').on('click', '.chat-input #language-picker-select', function(e) {

            if(!$(this).closest('.model-chat').find('.language-chooser').length) {

                // add all languages
                populateLanguageDropdowns()

                setTimeout(function() {
                    $('.flag[data-lang="'+prefTranslationLang+'"]').addClass("active")
                }, 300);
            } else {
                $('.language-chooser').toggleClass("hidden")
            }
        })
    }

    function translateGoogle(val, lang) {
      let data = $.getJSON('https://translation.googleapis.com/language/translate/v2?key='+googleApiKey+'&q='+encodeURIComponent(val)+'&target='+lang.toString().trim()).fail(function(data) { console.log("missing/wrong language", data.responseText) });
      console.log("data", data, data.responseText)
      return data
    }

    // populate languages to dropdowns and language lists
    function populateLanguageDropdowns() {
//       if(!iso639_flags) alert("errorrrrrr")

        translationLanguages = Object.assign(iso639_langs);
        $.each(google_langs.data.languages, function(index, val) {
          if(translationLanguages[val.language]) translationLanguages[val.language]["active"] = 1
        })

        $.each(translationLanguages, function(key, val) {
          if(val.active === 1) {
            $('.language-list').prepend( '<button aria-label="'+val.name+'" class="SmilersWidgetSpicyList__smile#mG flag" type="button" title="'+val.name+'" data-search="'+val.name+'|'+val.nativeName+'|'+key+'" data-lang="'+key+'"><span class="fi fi-'+key+'" title="'+val.name+' ('+val.nativeName+')"></span></button>');
          }
        });
    }



    /**
     * Favorites Filtering
     */
    waitForKeyElements(".favorites h1.title-ds", addFavoritesFilters);
    function addFavoritesFilters() {

        GM_addStyle(`

          .favorites-filters select option:first-child {
            color: red !important;
          }

        `);

        // add country filter
        if(!$('.model-chat .filters-favorites.page-block').length) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "//stripchat-enhanced.247camming.com/update/html_favorites-filters.html",
                onload: function(xhr) {

                    // add filters block
                    $(".favorites [class^='FavoritesHeaderWithActions__title_wrapper']").after(xhr.responseText)

                    // populate country filter
                    $('.model-list-item .country-flag').each(function() {
                        $('select[name="filters[country]"]').append('<option value="'+$(this).attr('title')+'">'+$(this).attr('title')+'</option')
                    })
                }
            });
        }

        $('#body').on('input search', '.favorites-filters-search input', function(e) {
            let username = $(this).val().toLowerCase()
            var filteredNames = $('.model-list-item').show().filter(function() {
                return $(this).find('[class^="ModelThumbUsername"]').text().toLowerCase().indexOf(username) === -1
            }).hide();
        })
    }


    /**
     * Normal Emojis
     */
    $('#body').on('click', '.model-chat-controls__smiles-button', function(e) {

        // setTimeout, executes on every open
        setTimeout(function() {
            $('.language-chooser').addClass("hidden")
            $('.model-chat__smiles-block:not(.language-chooser) [class^="SmilesWidgetContainer__title#"]').after('<a class="switch-emoji-style" href="#" aria-label="White" class="btn-tags-inline-badge inline-badge inline-badge__button inline-badge__override model-filter-link"><span class="">Switch Emoji Style</span></a>')
        }, 300);

    })

    $('#body').on('click', '.switch-emoji-style', function(e) {
        e.preventDefault

        $('[class^="SmilesWidgetContainer__content#"]').after('<div class="SmilesWidget__content_default-emojis hidden"></div>')

        if($(this).find('.SmilesWidget__content_default-emojis').length) {
          $('.SmilesWidget__content_default-emojis').toggleClass('hidden').prev().toggleClass('hidden')
        } else {
          GM_xmlhttpRequest({
              method: "GET",
              url: "https://raw.githubusercontent.com/chalda-pnuzig/emojis.json/refs/heads/master/dist/list.min.json",
              onload: function(xhr) {
                  var data = eval("(" + xhr.responseText + ")");
                  $('.SmilesWidget__content_default-emojis').toggleClass('hidden').prev().toggleClass('hidden')
                  $.each(data.emojis, function(i,v) {
                    $('.SmilesWidget__content_default-emojis').append('<button aria-label="'+v.name+'" class="SmilersWidgetSpicyList__smile#mG active-smile'+(i>=50 ? " hidden" : "")+'" type="button">'+v.emoji+'</button>')
                  });
              }
          });
        }
    })

    // insert emoji on click
    $('#body').on('click', '.SmilesWidget__content_default-emojis .active-smile', function(e) {
        let text = $('.model-chat-input input').val()
        $('.model-chat-input input').val('').focus()
        document.execCommand('insertText', false, text+$(this).text())
    })

})();