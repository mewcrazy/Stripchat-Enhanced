# <p align="center">StripChat Enhanced</p>
<p align="center">A browser extension to extend StripChat with new useful features like on-the-fly translations of your sent text message as well as received public chat and private chat messages, and many more features.</p>

<p align="center" width="100%">
  <a href="https://github.com/mewcrazy/Stripchat-Enhanced/releases/latest"><img src="https://shields.io/github/downloads/mewcrazy/Stripchat-Enhanced/total"></a>
</p>

<p align="center" width="100%">
    <img width="100%" src="https://github.com/mewcrazy/Stripchat-Enhanced/raw/main/img/animation-translate-chat.gif"> 
</p>


## Features:
- Translate chat messages, tip menus, tip goals and private show testimonials <sub style="color:rgba(255,255,255,.55)">(in over different 100 languages with 1-click)</sub>
- Open stream in a true fullscreen which is not limited to your browser <sub style="color:rgba(255,255,255,.55)">(A true fullscreen like YouTube; without chat or any animations)</sub>
- Sort Tip Menus by Token Prices <sub style="color:rgba(255,255,255,.55)">(Easier readable tip menus)</sub>
- Hide distracting chat notice messages <sub style="color:rgba(255,255,255,.55)">(Tip Goals, Interactive Toy, Welcome Bot & Fan Club Discount Messages)</sub>
- Hide chat users and set your font size for chat rooms <sub style="color:rgba(255,255,255,.55)">(Ban chat users and never see their chat messages again)</sub>
- Regular emojis in chat rooms and private messages <sub style="color:rgba(255,255,255,.55)">(Use regular emojis, even without ULTIMATE membership)</sub>
- Do Not Disturb Mode <sub style="color:rgba(255,255,255,.55)">(Shows only yours and the models chat messages)</sub>
- Resizable video frame <sub style="color:rgba(255,255,255,.55)">(Shrink the video player to your desired size)</sub>
- Remove Blur in Group, Privte & Ticket Shows <sub style="color:rgba(255,255,255,.55)">Removes the annoying blur on the sides of a vertical video)</sub>
- Hide unneeded links in the site's sidebar <sub style="color:rgba(255,255,255,.55)">(For a cleaner experience)</sub>
- Filter your favorites by country, age, private prices and more <sub style="color:rgba(255,255,255,.55)">(Search your favorites by name and filter them)</sub>
- Removes the "Age Verification Popup", "Cookie Notices" and "Ultimate Ads" <sub style="color:rgba(255,255,255,.55)">(Less advertisement banners)</sub>
- Hide the "Quick Refill" & "Auto-Refill" feature to avoid accidental charges <sub style="color:rgba(255,255,255,.55)">(Remove tempting token buy notices)</sub>
- Hide interactive widgets in chat, i.e. Battleship <sub style="color:rgba(255,255,255,.55)">(Less distracting animations)</sub>
- Disable "Watch History", various tracking cookies <sub style="color:rgba(255,255,255,.55)">(For more privacy)</sub>
- Keep volume always saved <sub style="color:rgba(255,255,255,.55)">(Fixes muted streams after seeing a starting Ticket or Group Show)</sub>
- Output real time in header <sub style="color:rgba(255,255,255,.55)">(For models to keep track of the website's time)</sub>

# Installation

<p width="100%">
    <a href="https://github.com/mewcrazy/Stripchat-Enhanced/raw/refs/heads/main/extensions/chrome.crx"><img width="206" src="https://github.com/mewcrazy/Stripchat-Enhanced/raw/main/img/get-it-for-chrome.png"></a>
    <a href="https://github.com/mewcrazy/Stripchat-Enhanced/raw/refs/heads/main/extensions/firefox.zip"><img width="206" src="https://github.com/mewcrazy/Stripchat-Enhanced/raw/main/img/get-it-for-firefox.png"></a>
    <a href="https://github.com/mewcrazy/Stripchat-Enhanced/raw/refs/heads/main/extensions/opera.crx"><img width="206" src="https://github.com/mewcrazy/Stripchat-Enhanced/raw/main/img/get-it-for-opera.png"></a>
</p>
We are working on dedicated Edge, Firefox and Chrome Extensions. Above is the preview of the Chrome Extension, but we strongly recommend to use a User Script Manager for now. The script was made in ViolentMonkey, but should work in TamperMonkey and GreaseMonkey as well.

- [TamperMonkey](https://www.tampermonkey.net/) <sub>(Chrome, Microsoft Edge, Firefox, Safari, Opera Next)</sub>
- [ViolentMonkey](https://violentmonkey.github.io/) <sub>(Chrome, Firefox, Microsoft Edge)</sub>
- <s>[GreaseMonkey](https://www.greasespot.net/)</s> <sub>(Firefox; currently unsupported)</sub>

Please note that this script requires an API Key for the Google Cloud Translation API. Simply log in your Google account, and create a New Project for the Cloud Translation API. After you can click on "Login Credentials" and create a new API Key which you can use in this script.

### ViolentMonkey
1. Simply click on our script file [/deploy/stripchat-enhanced.user.js](https://mewcrazy.github.io/Stripchat-Enhanced/deploy/stripchat-enhanced.user.js) and it should automatically get recognized by ViolentMonkey.
1. Open the ViolentMonkey Dashboard of your User Script Manager (ViolentMonkey, TamperMonkey or GreaseMonkey)
2. Click on + (New) -> Install by URL
3. Manually enter the URL to the plugins file in this repository: `https://mewcrazy.github.io/Stripchat-Enhanced/deploy/stripchat-enhanced.user.js`

### TamperMonkey <sub>("Allow User Scripts" toggle in the Extension's settings needs to be enabled.)</sub>
1. Click the TamperMonkey Extension Icon and "Create a new script..."
2. Copy paste the contents of [`https://mewcrazy.github.io/Stripchat-Enhanced/deploy/stripchat-enhanced.user.js`](https://mewcrazy.github.io/Stripchat-Enhanced/deploy/Stripchat-Enhanced.user.js) into the editor and Save.

### GreaseMonkey
Currently unsupported. To support new version 4.0+ of GreaseMonkey we would need to make major changes.

## Language list
Stripchat Enhanced supports all available languages offered by Google's Cloud Translation API, in total *123 languages*.

| English Name  | Local Name | ISO-639 Code  |
| ------------- | ------------- | ------------- |
Abkhaz|аҧсуа бызшәа|ab
Afrikaans|Afrikaans|af
Akan|Akan|ak
Albanian|Shqip|sq
Amharic|አማርኛ|am
Arabic|العربية|ar
Armenian|Հայերեն|hy
Assamese|অসমীয়া|as
Aymara|aymar aru|ay
Azerbaijani|azərbaycan dili|az
Bambara|bamanankan|bm
Bashkir|башҡорт теле|ba
Basque|euskara|eu
Belarusian|беларуская мова|be
Bengali|বাংলা|bn
Bosnian|bosanski jezik|bs
Breton|brezhoneg|br
Bulgarian|български език|bg
Burmese|ဗမာစာ|my
Catalan|Català|ca
Chichewa|chiCheŵa|ny
Chinese|中文|zh
Chuvash|чӑваш чӗлхи|cv
Corsican|corsu|co
Croatian|Hrvatski|hr
Czech|Čeština|cs
Danish|Dansk|da
Divehi|ދިވެހި|dv
Dutch|Nederlands|nl
Dzongkha|རྫོང་ཁ|dz
English|English|en
Esperanto|Esperanto|eo
Estonian|eesti|et
Ewe|Eʋegbe|ee
Fijian|vosa Vakaviti|fj
Finnish|suomi|fi
French|Français|fr
Fula|Fulfulde|ff
Galician|galego|gl
Ganda|Luganda|lg
Georgian|ქართული|ka
German|Deutsch|de
Greek|Ελληνικά|el
Guaraní|Avañe'ẽ|gn
Gujarati|ગુજરાતી|gu
Haitian|Kreyòl ayisyen|ht
Hausa|هَوُسَ|ha
Hebrew|עברית|he
Hindi|हिन्दी|hi
Hungarian|magyar|hu
Icelandic|Íslenska|is
Igbo|Asụsụ Igbo|ig
Indonesian|Bahasa Indonesia|id
Irish|Gaeilge|ga
Italian|Italiano|it
Japanese|日本語|ja
Javanese|basa Jawa|jv
Kannada|ಕನ್ನಡ|kn
Kazakh|қазақ тілі|kk
Khmer|ខេមរភាសា|km
Kinyarwanda|Ikinyarwanda|rw
Kirundi|Ikirundi|rn
Korean|한국어|ko
Kurdish|Kurdî|ku
Kyrgyz|Кыргызча|ky
Lao|ພາສາລາວ|lo
Latin|latine|la
Latvian|latviešu valoda|lv
Limburgish|Limburgs|li
Lingala|Lingála|ln
Lithuanian|lietuvių kalba|lt
Luxembourgish|Lëtzebuergesch|lb
Macedonian|македонски јазик|mk
Malagasy|fiteny malagasy|mg
Malayalam|മലയാളം|ml
Malay|Bahasa Melayu|ms
Maltese|Malti|mt
Marathi|मराठी|mr
Mongolian|Монгол хэл|mn
Māori|te reo Māori|mi
Nepali|नेपाली|ne
Norwegian|Norsk|no
Occitan|occitan|oc
Oriya|ଓଡ଼ିଆ|or
Oromo|Afaan Oromoo|om
Panjabi|ਪੰਜਾਬੀ|pa
Pashto|پښتو|ps
Persian|فارسی|fa
Polish|Polski|pl
Portuguese|Português|pt
Quechua|Runa Simi|qu
Romanian|Română|ro
Russian|Русский|ru
Samoan|gagana fa'a Samoa|sm
Sango|yângâ tî sängö|sg
Sanskrit|संस्कृतम्|sa
Scottish Gaelic|Gàidhlig|gd
Serbian|српски језик|sr
Shona|chiShona|sn
Sindhi|सिन्धी|sd
Sinhala|සිංහල|si
Slovak|Slovenčina|sk
Slovenian|slovenščina|sl
Somali|Soomaaliga|so
Southern Ndebele|isiNdebele|nr
Southern Sotho|Sesotho|st
Spanish|Español|es
Sundanese|Basa Sunda|su
Swahili|Kiswahili|sw
Swati|SiSwati|ss
Swedish|Svenska|sv
Tagalog|Wikang Tagalog|tl
Tajik|тоҷикӣ|tg
Tamil|தமிழ்|ta
Tatar|татар теле|tt
Telugu|తెలుగు|te
Thai|ไทย|th
Tigrinya|ትግርኛ|ti
Tsonga|Xitsonga|ts
Tswana|Setswana|tn
Turkish|Türkçe|tr
Turkmen|Türkmençe|tk
Ukrainian|Українська|uk
Urdu|اردو|ur
Uyghur|ئۇيغۇرچە‎|ug
Uzbek|Ўзбек|uz
Vietnamese|Tiếng Việt|vi
Welsh|Cymraeg|cy
Western Frisian|Frysk|fy
Xhosa|isiXhosa|xh
Yiddish|ייִדיש|yi
Yoruba|Yorùbá|yo


## Contributing
We welcome any contributions! If you're having ideas or improvements to StripChat Enhanced, simply create a meaningful push request or open an issue and we will take care of it.


## Roadmap:
- Add Feature: Add Favorites on all listing pages (add without the need to open the stream first)
- Styling: Emoji Picker
- Code Quality Improvements

## Used Frameworks/Utilities:
- [CoeJoder/waitForKeyElements.js](https://github.com/CoeJoder/waitForKeyElements.js) - A utility function for userscripts that detects and handles AJAXed content.
- [jquery/jQuery](https://github.com/jquery/jquery) - JavaScript Framework to ease the DOM traversing.
- [missive/emoji-mart](https://github.com/missive/emoji-mart) - A Beautiful emoji picker module. (version-based emoji json files)

Thanks to [PotPlayer](https://potplayer.info) for the innovative idea of opening a video in fullscreen with a simple middle mouse click.
Thanks to [Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Language_flags_list) for the curated list of language flags.

---

<p>
  <span align="left">Inspired by <a href="//stripchat.com" target="_blank">StripChat</a> and made with ❤️ in Düsseldorf, Germany.</span>
  <a href="https://www.paypal.com/donate/?hosted_button_id=UEUQP2P24Y98S" target="_blank" align="right"><img width="206" src="https://raw.githubusercontent.com/mewcrazy/Stripchat-Enhanced/refs/heads/0.4.9/img/donate-button.png"></a>
</p>