This jQuery plugin makes it easy to provide access to functions from a drop-down menu. Includes accessibility features like WAI-ARIA and keyboard support for universal access.

# Setup

1. Download the plugin
2. Include the script to your page(s) just before the </body> tag
    <!-- grab latest version of jQuery -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.actionsmenu-1.1.js"></script>
3. Include the CSS to the head of your page(s)
    <link type="text/css" rel="stylesheet" href="jquery.actionsmenu-1.1.css">

# Usage

1. Add the basic HTML where you want the menu to appear on your page(s)

    <div id="mail_actions"> <!-- wrapping element -->
        <h2>Mail actions</h2> <!-- menu button label (h1–h6) -->
        <ul>
            <!-- links should point to equivalent, non-scripted functionality -->
            <li><a href="#" id="mark_read">Mark as read</a></li>
            <li><a href="#" id="add_tasks">Add to Tasks</a></li>
            <li><a href="#" id="add_star">Add star</a></li>
            <li><a href="#" id="filter_messages">Filter messages like these</a></li>
            <li><a href="#" id="mute">Mute</a></li>
        </ul>
    </div>

2. Activate the plugin by calling actionsmenu() on the wrapping element

    <script type="text/javascript">
        $('#mail_actions').actionsmenu();
    </script>

3. Attach an event handler to the menu to listen for click events

    $('#mail_actions_menu').delegate('a', 'click', function () {
        // figure out which menu item was clicked
        switch ($(this).attr('id')) {
        case 'mark_read':
            // do something
            return false;
        case 'add_tasks':
            // do something
            return false;
        // etc.
        }
    });

# Notes on usage

* Options (defaults shown):

    $('#mail_actions').actionsmenu({
        maxHeight: 300, // maximum height of the menu, if the height is exceeded a scroll bar will appear
        width: 180, // specify the menu’s width
        css: {
            ids: {
                button: '_button', // mail_actions_button
                menu: '_menu' // mail_actions_menu
            },
            classes: {
                button: 'actions_menu_button',
                menu: 'actions_menu',
                separator: 'separator',
                hidden: 'actions_menu_hidden',
                active: 'actions_menu_button_active'
            }
        }
    });

* Menu items may be grouped using a nested <ul>.

    <li>
        <ul>
            <li><a href="#" id="add_tag">Add a tag</a></li>
            <li><a href="#" id="add_note">Add a note</a></li>
            <li><a href="#" id="add_person">Add a person</a></li>
        </ul> <!-- end group -->
    </li>

* Classes may be added to menu items by adding them to the corresponding <a> (that’s how the icon was added in the demo).

    <li><a class="actions_view_exif" href="#" id="view_exif" title="Exchangeable image file format">View Exif info</a></li>

* Thanks for downloading, questions, comments, or suggestions are welcome.

# Keyboard shortcuts

* If the menu button has focus and the menu is not open, then:
** Enter, Spacebar, or the up or down arrow keys opens the menu and places focus on the first menu item.
* When the menu is open and focus is on a menu item, then:
** Enter or Spacebar invokes that menu action.
** Up or down arrow keys cycles focus through the items.
** Escape closes the menu and returns focus to the menu button.
* Tabbing out of the menu component closes the menu if open.

# ARIA roles and properties

* Roles:
** role="application"
** role="menu"
** role="menuitem"
* States and properties:
** aria-disabled
** aria-haspopup
** aria-hidden
** aria-labelledby
** aria-owns