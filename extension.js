const { Gio, GLib } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

function init () {};

function enable () {
    let old_stylesheet = Main.getThemeStylesheet();
    let rtheme = Gio.Settings.new("io.risi.rtheme");
    let theme_timeout;
    
    let changed = rtheme.connect("changed", (setting, key) => {
        let theme_timeout = Mainloop.timeout_add(1000, () => apply_theme())
    })
    apply_theme();
};

function disable () {
    Main.setThemeStylesheet(old_stylesheet)
    Main.loadTheme();
    rtheme.disconnect(changed);
    
    if (theme_timeout) {
        GLib.Source.remove(theme_timeout);
        theme_timeout = null;
    }
    old_stylesheet = null;
};

function apply_theme () {
    let stylesheet = GLib.build_filenamev(
        [GLib.get_user_config_dir(), 'rtheme', 'shell', 'rtheme.css']
    );
    Main.setThemeStylesheet(stylesheet);
    Main.loadTheme();
}
