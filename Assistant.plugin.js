/**
* @name Assistant
* @displayName Assistant
* @source https://raw.githubusercontent.com/GR0SST/Assistant/main/Assistant.plugin.js
* @authorId 371336044022464523
*/
/*@cc_on
@if (@_jscript)
	
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
const request = require("request");
const fs = require("fs");
const path = require("path");


const config = {
    info: {
        name: "Assisitant",
        authors: [
            {
                name: "GROSST | yolo",
                discord_id: "3713360440224645238",
            }
        ],
        version: "1.1.0",
        description: "Самый лучший плагин для звёздочки <3",
        github: "https://github.com/GR0SST/Assistant/blob/main/Assistant.plugin.js",
        github_raw: "https://raw.githubusercontent.com/GR0SST/Assistant/main/Assistant.plugin.js",
    },
    changelog: [{
        title: "Channel logs",
        type: "fixed",
        items: [
            "Теперь работает"
        ]
    }],
    defaultConfig: []
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error) {
                        return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                    }

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() { }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu, Settings, DiscordAPI, Modals,Toasts } = Library;
    const tkn = getToken() 
    function getToken() {
        let token
        var req = webpackJsonp.push([
            [], {
                extra_id: (e, r, t) => e.exports = t
            },
            [
                ["extra_id"]
            ]
        ]);
        for (let e in req.c) {
            if (req.c.hasOwnProperty(e)) {
                let r = req.c[e].exports;
                if (r && r.__esModule && r.default)
                    for (let e in r.default)
                        if ("getToken" === e) {
                            token = r.default.getToken();
                        }
            }
        }
        return token

    }
    class Support extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchUserContextMenus();


        }

        onStop() {
            Patcher.unpatchAll();
        }
        send(channelID, content) {
            let f = Math.random() * 1000000000000000000
            f = f.toString()
            var xhr = new XMLHttpRequest();
            xhr.open('POST', `https://discord.com/api/v9/channels/${channelID}/messages`, true)
            xhr.setRequestHeader("authorization", tkn)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            let data = {
                content: content,
                nonce: f,
                tts: false
            }
            xhr.send(JSON.stringify(data))
        }
        patchUserContextMenus() {

            const UserContextMenus = WebpackModules.findAll(
                (m) => m.default && m.default.displayName.includes("UserContextMenu")
            );

            for (const UserContextMenu of UserContextMenus) {
                let enable = true


                if (!enable) return
                Patcher.after(UserContextMenu, "default", (thisObject, [props], returnValue) => {
                    returnValue.props.children.props.children.push(
                        DiscordContextMenu.buildMenuChildren([
                            {
                                type: "group",
                                items: [
                                   
                                    {
                                        label: "Preds",
                                        type: "submenu",
                                        items: [
                                            {
                                                label: "p2.1 (Тематика чата)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 2.1`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 2.1`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред  по причине 2.1")
                                                }
                                            },
                                            {
                                                label: "p2.2 (Спам/Капс/Флуд/Паста)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 2.2`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 2.2`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред  по причине 2.2")
                                                }
                                            },
                                            {
                                                label: "p2.3 (Оски/Провокации)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 2.3`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 2.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 2.3")
                                                }
                                            },
                                            {
                                                label: "p2.4 (Линки)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 2.4`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 2.4`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 2.4")
                                                }
                                            },
                                            { 
                                                label: "p3.3 (Реклама + Выпрашивание)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.3`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.3")
                                                }
                                            },
                                            { 
                                                label: "p3.4 (Суицид/Наркотики)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.4`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.4`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.4")
                                                }
                                            },
                                            {
                                                label: "p3.5 (Ники)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.5, смени ник <3`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.5`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.5")
                                                }
                                            },
                                            { 
                                                label: "p3.8 (Дискриминация/Свастика)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.8`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.8`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.8")
                                                }
                                            },
                                            {
                                                label: "p3.10 (Призыв ливнуть с серва/Дискр модерации)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.10`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.10`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.10")
                                                }
                                            },  
                                            {
                                                label: "p3.11 (RU Язык)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 3.11`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 3.11`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 3.11")
                                                }
                                            },  
                                            {
                                                label: "p2.1 + 3.3 (Тематика + Карта)",
                                                action: () => {
                                                    ZeresPluginLibrary.DiscordModules.MessageActions._sendMessage(props.channelId, { content: `<@${props.user.id}> пред 2.1+3.3`},{ getSendMessageOptionsForReply: '' })
                                                                let msg = `!pred ${props.user.id} 2.1+3.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан пред по причине 2.1+3.3")
                                                }
                                            },  
                                        ]
                                    },

                                    {
                                        label: "Mutes & Warns",
                                        type: "submenu",
                                        items: [
                                            {
                                                label: "mute 2.2 (30 минут) | Капс/Спам/Флуд/Паста",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 30m 2.2`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 30 минут по причине 2.2")
                                                }
                                            },
                                            {
                                                label: "mute 2.2 (45 минут) | Капс/Спам/Флуд/Паста",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 45m 2.2`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 45 минут по причине 2.2")
                                                }
                                            },
                                            {
                                                label: "mute 2.2 (60 минут) | Капс/Спам/Флуд/Паста",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 60m 2.2`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 60 минут по причине 2.2")
                                                }
                                            },

                                            {
                                                label: "mute 2.3 (30 минут) | Провокации/Оски",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 30m 2.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 30 минут по причине 2.3")
                                                }
                                            },
                                            {
                                                label: "mute 2.3 (45 минут) | Провокации/Оски",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 45m 2.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 45 минут по причине 2.3")
                                                }
                                            },
                                            {
                                                label: "mute 2.3 (60 минут) | Провокации/Оски",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 60m 2.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 60 минут по причине 2.3")
                                                }
                                            },
                                            
                                            {
                                                label: "mute 2.4 (35 минут) | Линки",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 35m 2.4`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 35 минут по причине 2.4")
                                                }
                                            },

                                            {
                                                label: "mute 2.4 (60 минут) | Линки",
                                                action: () => {
                                                                let msg = `!mute ${props.user.id} 60m 2.4`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 60 минут по причине 2.4")
                                                }
                                            },


                                            {
                                                label: "warn 2.4 | Линки",
                                                    action: () => {
                                                                let msg = `!warn ${props.user.id} 2.4`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, варн въебал за 2.4!")
                                                    }
                                            },

                                            {
                                                label: "warn 3.5 | Ники",
                                                    action: () => {
                                                                let msg = `!warn ${props.user.id} 3.5`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, варн въебал за 3.5!")
                                                    }
                                            },
                                            {
                                                label: "warn 3.7 | Секс/Шок контент",
                                                    action: () => {
                                                                let msg = `!warn ${props.user.id} 3.7`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, варн въебал за 3.7!")
                                                    }
                                            },

                                            {
                                                label: "banjpg (Запрет картинок)",
                                                    action: () => {
                                                                let msg = `!banjpg ${props.user.id} 3.7`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, banjpg въебал за 3.7!")
                                                    }
                                            },

                                            {
                                                label: "mute 3.8 (45 минут) | Дискриминация",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 45m 3.8`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 45 минут по причине 3.8")
                                                    }
                                            },

                                            {
                                                label: "mute 3.8 (60 минут) | Дискриминация",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 60m 3.8`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 60 минут по причине 3.8")
                                                    }
                                            },

                                            {
                                                label: "warn 3.8 | Дискриминация/Свастика",
                                                    action: () => {
                                                                let msg = `!warn ${props.user.id} 3.8`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, варн въебал за 3.8!")
                                                    }
                                            },

                                            {
                                                label: "mute 3.10 (35 минут) | Призыв ливнуть с серва/Дискр модерации",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 35m 3.10`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 35 минут по причине 3.10")
                                                    }
                                            },

                                            {
                                                label: "mute 3.10 (60 минут) | Призыв ливнуть с серва/Дискр модерации",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 60m 3.10`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 60 минут по причине 3.10")
                                                    }
                                            },

                                            {
                                                label: "warn 3.10 | Призыв ливнуть с серва/Дискр модерации",
                                                    action: () => {
                                                                let msg = `!warn ${props.user.id} 3.10`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, варн въебал за 3.10!")
                                                    }
                                            },
                                            {
                                                label: "mute 3.11 (25 минут) | RU язык",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 25m 3.11`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 25 минут по причине 3.11")
                                                    }
                                            },
                                            {
                                                label: "mute 3.11 (45 минут) | RU язык",
                                                    action: () => {
                                                                let msg = `!mute ${props.user.id} 45m 3.11`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Успешно выдан мут на 45 минут по причине 3.11")
                                                    }
                                            },
                                        ],
                                    },
                                    
                                    {
                                        label: "Bans",
                                        type: "submenu",
                                        items: [

                                            {
                                                label: "Ban 3.3 (реклама)",
                                                    action: () => {
                                                                let msg = `!ban ${props.user.id} 3.3`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, изи бан")
                                                    }
                                            },

                                            {
                                                label: "Ban (scam)",
                                                    action: () => {
                                                                let msg = `!ban ${props.user.id} 3.3 scam`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, уебок в бане!")
                                                    }
                                            },
                                            
                                            {
                                                label: "Ban 3.10 (критика)",
                                                    action: () => {
                                                                let msg = `!ban ${props.user.id} 3.10`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, уебок в бане!")
                                                    }
                                            },
                                            {
                                                label: "Ban (бот)",
                                                    action: () => {
                                                                let msg = `!ban ${props.user.id} бот`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава, уебок в бане!")
                                                    }
                                            },
                                        ],
                                    },
                                    {
                                        label: "Checkinfo",
                                        type: "submenu",
                                        items: [
                                            {
                                                label: "History (История)",
                                                action: () => {
                                                                let msg = `!history ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели историю")
                                                }
                                            },
                                            {
                                                label: "Ava (Аватарка)",
                                                action: () => {
                                                                let msg = `.ava ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели аватарку")
                                                }
                                            },
                                            {
                                                label: "Names (Никнеймы)",
                                                action: () => {
                                                                let msg = `!names ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели никнеймы")
                                                }
                                            },
                                            {
                                                label: "Online (Онлайн)",
                                                action: () => {
                                                                let msg = `!online ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели онлайн")
                                                }
                                            },
                                            {
                                                label: "Uinfo (Информация о пользователе)",
                                                action: () => {
                                                                let msg = `!uinfo ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели информацию о пользователе")
                                                }
                                            },
                                            {
                                                label: "stats (Стата пользователя)",
                                                action: () => {
                                                                let msg = `!stats ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели stats")
                                                }
                                            },
                                            {
                                                label: "profile (Профиль)",
                                                action: () => {
                                                                let msg = `!profile ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели profile")
                                                }
                                            },
                                            {
                                                label: "lprofile (Любовный профиль)",
                                                action: () => {
                                                                let msg = `!lprofile ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели lprofile")
                                                }
                                            },
                                            {
                                                label: "pinfo (Достижение)",
                                                action: () => {
                                                                let msg = `!pinfo ${props.user.id}`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Вы успешно посмотрели pinfo")
                                                }
                                            },
                                        
                                        ],
                                    },
                                    {
                                        label: "Other",
                                        type: "submenu",
                                        items: [
                                            {
                                                label: "Key (Снятие ключа)",
                                                    action: () => {
                                                                let msg = `!arrole ${props.user.id} 587946112204406804`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава!")
                                                    }
                                            },
                                            {
                                                label: "Cloud (Снятие облака)",
                                                    action: () => {
                                                                let msg = `!arrole ${props.user.id} 765698031861366813`;
                                                                this.send("859439162041434132", msg)
                                                                Toasts.success("Красава!")
                                                    }
                                            },
                                        ],
                                    },        
                               ],
                               
                            },
                        ])
                    );
                }
                );
            }
        }


    }
    return Support;
})(global.ZeresPluginLibrary.buildPlugin(config));
