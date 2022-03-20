var TwinnyControl = function (b, a, c) {

    a = void 0 === a ? array() : a;

    c = void 0 === c ? null : c;

    this.value = null;

    this.key = "";

    this.id = twinny_str_to_id(b);

    this.name = twinny_str_to_id(b);

    this.attr = array();

    this.type = "text";

    this.description = this.label = this.title = "";

    this.choices = array();

    this["default"] = null;

    this.heading = "";

    this.args = array();

    this.show = array();

    this.hide = array();

    this.uncheck = this.check = null;

    this.reset = !0;

    for (var d in a)

        isset(a[d]) && isset(this[d]) && (this[d] = a[d]);

    this.type = strtolower(this.type);

    this.key = b;

    this.args =

        a;

    "default" in this.args && (this["default"] = this.args["default"]);

    isset(a.attr) && (this.attr = a.attr);

    null == c && isset(a.value) && (this.value = a.value);

    null !== c && (this.value = c);

    null == this.value && null !== this["default"] && (this.value = this["default"]);

    "checkbox" == this.type ? this.value = !!this.value : "number" == this.type && (this.value = Number(this.value));

    null == this.value && (this.value = "");

    isset(a.id) && (this.id = a.id);

    this.title || (this.title = this.label ? this.label : twinny_slug_to_title(this.key));

    this.args.title = this.title;

    this.args.value = this.value;

    isset(a.choice) ? this.choices = a.choice : isset(a.choices) && (this.choices = a.choices);

    isset(a.description) ? this.description = a.description : isset(a.desc) && (this.description = a.desc);

    isset(a.reset) && !a.reset && (this.reset = !1);

    "checkbox" == this.type && (isset(a.check) && (this.check = a.check), isset(a.uncheck) && (this.uncheck = a.uncheck), null == this.check || null == this.uncheck) && (this.reset = null)

};

TwinnyControl.prototype.render = function () {

    var b = "twinny-control-" + this.id,

    a = "twinny-control twinny-control-uninit twinny-control-" + this.type + " " + b;

    if (isset(this.args.show) || isset(this.args.hide))

        a += " twinny-control-dependency";

    return html_tag("div", {

        id: b,

        "data-key": this.key,

        "data-type": this.type,

        "class": a

    }, this.render_content())

};

TwinnyControl.prototype.render_content = function () {

    var b = "";

    this.heading && (b += html_tag("div", ".twinny-control-separator", html_tag("span", "", this.heading)));

    b += html_tag("div", ".twinny-control-info", html_tag("div", ".twinny-control-title", html_tag("span", "", this.title) + (this.reset && null != this["default"] ? html_tag_a({

                    "class": "twinny-control-reset noselect",

                    "data-default": this["default"],

                    "data-type": this.type

                }, "Reset") : "")) + (empty(this.description) ? "" : html_tag("div", ".twinny-control-description", this.description)));

    var a = "";

    this.attr.type = this.type;

    this.attr["data-type"] = this.type;

    this.attr["class"] = esc_attr("twinny-control-" + this.type + "-value twinny-control-value " + esc_attr(this.id));

    this.attr.name = esc_attr(this.name);

    this.attr.id = esc_attr(this.id);

    this.attr.value = esc_attr(this.value);

    null != this["default"] && (this.attr["data-default"] = esc_attr(this["default"]));

    "checkbox" == this.type && null != this.check && null != this.uncheck && (this.attr.check = this.check, this.attr.uncheck = this.uncheck);

    switch (this.type) {

    case "checkbox":

        empty(this.value) ||

        (this.attr.checked = "on");

        a = html_tag("input", this.attr, this.title) + " " + html_tag("span", "", this.title);

        break;

    case "radio":

        for (var c in this.choices)

            this.attr.value = c, c.toString() === this.value.toString() && (this.attr.checked = "on"), a += html_tag("input", this.attr, this.choices[c]);

        break;

    case "select":

        for (c in this.choices) {

            var d = {

                value: esc_attr(c)

            };

            this.value.toString() === c.toString() && (d.selected = "on");

            a += html_tag("option", d, this.choices[c])

        }

        a = html_tag("select", this.attr, a);

        break;

    case "color":

        a = this.attr;

        a.type = "text";

        a = html_tag("span", "class=twinny-control-color-preview&style=background:" + this.attr.value) + html_tag("input", a);

        break;

    case "textarea":

        a = html_tag("textarea", this.attr, this.value);

        break;

    default:

        a = html_tag("input", this.attr, "")

    }

    a = html_tag("label", null, a);

    return b += html_tag("div", ".twinny-control-input", a)

};

var TwinnyFont = {

    style: ["normal", "italic", "oblique"],

    weight: "normal bold lighter bolder 100 200 300 400 500 600 700 800 900".split(" "),

    family: "Allerta Allerta+Stencil Arimo Arvo Bentham Calibri Calligraffitti Cambria Cantarell Cardo Cherry+Cream+Soda Chewy Coming+Soon Consolas Copse Corsiva Cousine Covered+By+Your+Grace Crafty+Girls Crimson+Text Crushed Cuprum Damion Dancing+Script EB+Garamond Fontdiner+Swanky GFS+Didot GFS+Neohellenic Geo Gruppo Hanuman Homemade+Apple IM+Fell+DW+Pica IM+Fell+DW+Pica+SC IM+Fell+Double+Pica IM+Fell+Double+Pica+SC IM+Fell+English IM+Fell+English+SC IM+Fell+French+Canon IM+Fell+French+Canon+SC IM+Fell+Great+Primer IM+Fell+Great+Primer+SC Inconsolata Indie+Flower Josefin+Sans Josefin+Slab Just+Another+Hand Kenia Kranky Lato Lobster Lora Luckiest+Guy Merriweather Molengo Montserrat Mountains+of+Christmas Neucha Neuton Nobile Old+Standard+TT Open+Sans Oswald PT+Sans PT+Sans+Caption PT+Sans+Narrow Pacifico Paytone+One Permanent+Marker Philosopher Play Playfair+Display Puritan Reenie+Beanie Roboto Roboto+Mono Rock+Salt Sacramento Schoolbell Slackey Sorts+Mill+Goudy Sue+Ellen+Francisco Sunshiney Syncopate Tinos Ubuntu UnifrakturMaguntia Unkempt Vollkorn Walter+Turncoat Yanone+Kaffeesatz".split(" ")

};

function twinny_control_actions() {

    $(document).on("click", ".twinny-control-reset", function () {

        var b = $(this).parent().parent().parent().find(".twinny-control-value"),

        a = $(this).attr("data-default");

        switch ($(this).attr("data-type")) {

        case "radio":

            b.each(function () {

                $(this).attr("value") == a && $(this).prop("checked", !0)

            });

            break;

        case "select":

            b.find("option").each(function () {

                $(this).attr("value") == a && $(this).prop("selected", !0)

            });

            break;

        case "checkbox":

            b.attr("check") == a ? b.prop("checked", !0) : b.attr("uncheck") ==

            a && $(this).prop("checked", !1);

            break;

        default:

            b.val(a)

        }

        b.change()

    });

    $(document).on("focus", ".twinny-control-font-value", function () {

        $(this).parents(".twinny-control").find(".twinny-control-font-picker").slideDown()

    });

    $(document).on("change keyup", ".twinny-control-font-value", function () {

        var b = $(this).val(),

        a = twinny_control_str_to_font(b),

        c = $(this).parents(".twinny-control").find(".twinny-control-font-picker");

        c.find("select.style").val(a.style);

        c.find("select.weight").val(a.weight);

        c.find("input.size").val(a.size);

        c.find(".preview").css("font", b);

        c.find("input.family").val(a.family);

        c.find(".font-face-list .option").each(function () {

            $(this).attr("data-value") == a.family ? ($(this).addClass("active"), twinny_jq_scroll_inner($(this))) : $(this).removeClass("active")

        })

    });

    $(document).on("change keyup", ".twinny-control-font-picker select, .twinny-control-font-picker input", function () {

        var b = $(this).parents(".twinny-control-font-picker"),

        a = b.find("select.style").val(),

        c = b.find("select.weight").val(),

        d = b.find("input.size").val(),

        e = b.find("input.family").val();

        a = a + " " + c + " " + d + " " + e;

        $(this).parents(".twinny-control").find(".twinny-control-value").val(a);

        b.find(".preview").css("font", a)

    });

    $(document).on("click", ".twinny-control-font-picker .font-face-list .option", function () {

        if (!$(this).is(".active")) {

            var b = $(this).attr("data-value");

            $(this).parent().find(".option").removeClass("active");

            $(this).addClass("active");

            $(this).parents(".twinny-control-font-picker").find("input.family").val(b).change()

        }

    })

}

twinny_control_actions();

function twinny_control_init(b) {

    b = void 0 === b ? null : b;

    null == b && (b = $(document).find(".twinny-control.twinny-control-uninit"));

    if (b.length) {

        var a = !1;

        b.each(function () {

            $(this).is(".twinny-control-uninit") && ($(this).removeClass(".twinny-control-uninit"), $(this).is(".twinny-control-color") ? $(this).find(".twinny-control-value").iris({

                    palettes: !0,

                    change: function (c, d) {

                        $(this).parent().find(".twinny-control-color-preview").css("background", d.color.toString())

                    }

                }) : $(this).is(".twinny-control-font") && (a = !0, twinny_control_font($(this).find(".twinny-control-value"))))

        });

        a && html_tag_inject("https://fonts.googleapis.com/css?family=" + TwinnyFont.family.join("|"), "twinny-link-font-faces")

    }

}

function twinny_control_font(b) {

    var a = b.val();

    $(twinny_control_font_form(a)).insertAfter(b.parent())

}

function twinny_control_font_form(b) {

    b = void 0 === b ? "" : b;

    var a = twinny_control_str_to_font(b),

    c = html_tag("label", "", html_tag("div", "", "Font Style") + html_tag_select("class=style&value=" + a.style, TwinnyFont.style)) + html_tag("label", "", html_tag("div", "", "Font Weight") + html_tag_select("class=weight&value=" + a.weight, TwinnyFont.weight)) + html_tag("label", "", html_tag("div", "", "Font Size") + html_tag("input", "class=size&value=" + a.size));

    b = html_tag("div", "class=preview&style=font:" + b, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis tempor eros, id condimentum justo sagittis sed. Curabitur hendrerit, augue sit amet blandit molestie, sapien ex bibendum lorem, vel rhoncus orci mauris ac lectus.");

    return html_tag("div", ".twinny-control-font-picker", html_tag("div", ".col.col1", twinny_control_font_face_list(a.family)) + html_tag("div", ".col.col2", c) + html_tag("div", ".col.col1", b) + html_tag("div", ".clear"))

}

function twinny_control_font_face_list(b) {

    b = void 0 === b ? "" : b;

    for (var a = "", c = 0; c < TwinnyFont.family.length; c++) {

        var d = TwinnyFont.family[c].replaceAll("+", " ");

        a += html_tag("a", "data-value=" + d + "&class=option" + (b == d ? " active" : "") + "&style=font-family:" + d, d)

    }

    return a = html_tag("div", ".font-face-list", html_tag("input", "class=family&type=hidden&value=" + b) + html_tag("div", ".select", a))

}

function twinny_control_str_to_font(b) {

    b = void 0 === b ? "" : b;

    var a = {

        family: "",

        style: "",

        size: "",

        weight: ""

    };

    if (b.hasNot("px "))

        return a;

    b = b.split("px ");

    a.family = b[1];

    b = b[0].split(" ");

    a.style = b[0];

    1 < b.length && (a.weight = b[1]);

    2 < b.length && (a.size = b[2] + "px");

    return a

};

