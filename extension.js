const { Gio, GLib } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

let old_stylesheet;
let changed;
let rtheme = Gio.Settings.new("io.risi.rtheme");

function init () {};

function enable () {
    changed = rtheme.connect("changed", (setting, key) => {
        Mainloop.timeout_add(1000, () => apply_theme())
    })
    apply_theme()
};

function disable () {
    Main.setThemeStylesheet(old_stylesheet)
    Main.loadTheme();
    rtheme.disconnect(changed);
};

function apply_theme () {
    old_stylesheet = Main.getThemeStylesheet();
    let stylesheet = GLib.build_filenamev(
        [GLib.get_user_config_dir(), 'rtheme', 'shell', 'rtheme.css']
    );
    Main.setThemeStylesheet(stylesheet);
    Main.loadTheme();
}
