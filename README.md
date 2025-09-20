# <p align="center">StripChat Enhanced</p>
<p align="center">An user script, and soon to be a browser extension, for ViolentMonkey, Tampermonkey & Greasemonkey to extend StripChat with new useful features like translations of public chat and private chat messages.</p>

<p align="center" width="100%">
  <a href="https://github.com/mewcrazy/StripChat-Enhanced/archive/refs/heads/main.zip"><img src="https://shields.io/github/downloads/mewcrazy/StripChat-Enhanced/total"></a>
</p>

<p align="center" width="100%">
    <img width="100%" src="https://github.com/mewcrazy/StripChat-Enhanced/raw/main/img/animation-translate-chat.gif"> 
</p>

> [!WARNING]  
> StripChat Enhanced is currently in active development. It's safe to use already, and has Auto Update enabled, so expect regular updates with minor layout changes.

## Features:
- Translates public and private chat messages, as well as tip goals and private show testimonials in over different 100 languages
- Open stream in a true fullscreen which is not limited to your browser
- Sort Tip Menus by Token Prices
- Hide distracting chat notice messages (tip goals, interactive toy, welcome bot & fan club discount messages)
- Hide chat users and set your font size for chat rooms
- Regular emojis in chat rooms and private messages
- Do Not Disturb Mode (Shows only yours and the models chat messages)
- Resizable video frame
- Remove Blur in Group, Privte & Ticket Shows
- Hide unneeded links in the site's sidebar
- Filter your favorites by country, age, private prices and more
- Removes the "Age Verification Popup", "Cookie Notices" and "Ultimate Ads"
- Hide the "Quick Refill" & "Auto-Refill" feature to avoid accidental charges
- Hide interactive widgets in chat, i.e. Battleship
- Add favorites everywhere without opening the stream first
- Disable "Watch History"
- Disable various tracking cookies
- Output real time in header

# Installation
The script was made in ViolentMonkey, but should work in TamperMonkey and GreaseMonkey as well. You need to have one of these extensions installed to get the script running.
We are working on dedicated Edge, Firefox and Chrome Extensions, until then the User Script Manager is the only way.

- [TamperMonkey](https://www.tampermonkey.net/) <sub>(Chrome, Microsoft Edge, Firefox, Safari, Opera Next)</sub>
- [ViolentMonkey](https://violentmonkey.github.io/) <sub>(Chrome, Firefox, Microsoft Edge)</sub>
- <s>[GreaseMonkey](https://www.greasespot.net/)</s> <sub>(Firefox; currently unsupported)</sub>

Please note that this script requires an API Key for the Google Cloud Translation API. Simply log in your Google account, and create a New Project for the Cloud Translation API. After you can click on "Login Credentials" and create a new API Key which you can use in this script.

### ViolentMonkey
1. Simply click on our script file [stripchat-enhanced.user.js](https://mewcrazy.github.io/StripChat-Enhanced/deploy/stripchat-enhanced.user.js) and it should automatically get recognized by ViolentMonkey.
1. Open the ViolentMonkey Dashboard of your User Script Manager (ViolentMonkey, TamperMonkey or GreaseMonkey)
2. Click on + (New) -> Install by URL
3. Manually enter the URL to the plugins file in this repository: `https://mewcrazy.github.io/StripChat-Enhanced/deploy/stripchat-enhanced.user.js`

> [!INFO]  
> 


### TamperMonkey <sub>("Allow User Scripts" toggle in the Extension's settings needs to be enabled.)</sub>
1. Click the TamperMonkey Extension Icon and "Create a new script..."
2. Copy paste the contents of [`https://mewcrazy.github.io/StripChat-Enhanced/deploy/stripchat-enhanced.user.js`](https://mewcrazy.github.io/StripChat-Enhanced/deploy/stripchat-enhanced.user.js) into the editor and Save.

### GreaseMonkey
Currently unsupported. To support new version 4.0+ of GreaseMonkey we would need to make major changes.


## Contributing
We welcome any contributions! If you're having ideas or improvements to StripChat Enhanced, simply create a meaningful push request or open an issue and we will take care of it.

## Roadmap:
- Add "Auto Translate" feature (no need to translate each line individually)
- Proper styling of the "Emoji Picker"
- Add additional Favorites filters: In Private, In Group Show, In Ticket Show, New Models
- Bug testing in GreaseMonkey & TamperMonkey

## Used Frameworks/Utilities:
- [CoeJoder/waitForKeyElements.js](https://github.com/CoeJoder/waitForKeyElements.js) - A utility function for userscripts that detects and handles AJAXed content.
- [jquery/jQuery](https://github.com/jquery/jquery) - JavaScript Framework to ease the DOM traversing.
- [missive/emoji-mart](https://github.com/missive/emoji-mart) - A Beautiful emoji picker module. (version-based emoji json files)

Thanks to [Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Language_flags_list) for the curated list of language flags.

---

<p align="center">Inspired by a beautiful woman and made with <span class="aalliyahh">❤️</span> in Düsseldorf, Germany</p>