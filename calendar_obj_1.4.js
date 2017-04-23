
if (Array.prototype.forEach == undefined)
        Array.prototype.forEach = 
                function (f) 
                {
                        for (var i = 0; i < this.length; i++)
                                f(this[i]);
                };

function Link(name, target, class_name, click_handler)
{
        this.name = name; 
        this.target = target;
        this.class_name = class_name;
        if (!(typeof click_handler === 'undefined')) {
                this.click_handler = click_handler;
        } else {
                this.click_handler = null;
        }

}

Link.prototype =
{
   toHtml: function()
           {
                  var the_target = (this.target == null) ? ""
                                                         : " href = '"
                                                           + this.target + "'";
                  var the_class = (this.class_name == null) ? ""
                                                            : " class = '"
                                                              + this.class_name
                                                              + "'";

                  var the_click = (this.click_handler == null) ? ""
                                                            : " onclick= '"
                                                              + this.click_handler
                                                              + "'";

                   return "<a" + the_target + the_class  + the_click + ">"
                          + this.name + "</a>";
           }
}


function devclicks(event, that) {
        if (typeof that.clickCount === "undefined") {
           that.clickCount = 0;
        };

        if (++that.clickCount > 4) {
                return true;
        } else { 
                event.preventDefault()
                return false;
        };
}

function makeLink(name, target, class_name)
{
        return new Link(name, target, class_name);
}

function fakeLink(name, target, class_name)
{
        var the_class = ((class_name == null) ? "" : class_name + " ")
                        + "unavailable";

        return new Link(name, null, the_class);
}

function devLink(name, target, class_name)
{
        var the_class = ((class_name == null) ? "" : class_name + " ")
                        + "unavailable";

        return new Link(name, target, class_name, "return devclicks(event, this);");
}

function isLink(thing)
{
        return thing instanceof Link;
}

var DAY = 24*60*60*1000;   /* length of a day in MS */
var DAYS = DAY;            /* spelled plural or not */
var HALFDAY = DAY/2;

function bump_date(date, days) {
        return new Date(date.getTime() + (DAY * days)); 
}

var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Weekdays are same order as Date.getDay() */
var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function day_number(day_name)
{
        return WEEKDAYS.indexOf(day_name);
}

/* Given a list of day names, map it to array of 7 entries: 1 if day selected else 0 */
function map_weekdays(ar)
{
    day_list = [0,0,0,0,0,0,0];
    var len = ar.length;
    for (var i = 0; i < len; i++) {
	   day_list[day_number(ar[i])] = 1;
    }
    return day_list;
}

function date_to_label_ddmmm(the_date)
{
        return two_digits(the_date.getDate())
               + MONTHS[the_date.getMonth()];
}

function label_to_date_ddmmm(the_label)
{
        var month_string = the_label.substr(2,3);
        var month_number = MONTHS.indexOf(month_string);
        var day_string = the_label.substr(0,2);
        var start_date  = new Date(this.start);
        var year = start_date.getFullYear();  /* e.g. 2013 */
        var result;

        /* Assume we work in the 12 months starting with start_date */
        if (month_number < start_date.getMonth())
                year+=1;  
        /* Making dates start at noon avoids daylight saving problems
           when doing arithmetic on days */
    return new Date(year, month_number, day_string, 12);
}

function date_to_label_mm_slash_dd(the_date)
{
        return two_digits(the_date.getMonth() + 1)
                + "/"
                + two_digits(the_date.getDate());
}

function date_to_label_dd_slash_mm_slash_yyyy(the_date)
{
        return two_digits(the_date.getDate())
                + "/"
                + two_digits(the_date.getMonth() + 1)
                + "/"
                + the_date.getFullYear();
}

/*
 * Find next day in a set of weekdays
 */
function find_next_day(day_list, start_date)
{ 
        var start_day = start_date.getDay();      
        var day = (start_day + 1) % 7;
        var incr = 1;
        var found = false;
        var possible_date;
//        console.log("find_next_day:(" + day_list.toString() + "," + start_date.toString() + ")");
//        console.log("    Start: day=" + day + " incr=" +incr);
        while (!found) {
                while ((day  != start_day) && !day_list[day]) {
                        day = (day + 1) % 7;
                        incr++;
//		        console.log("   Bumped: day=" + day + " incr=" +incr);
                }  
                possible_date = bump_date(start_date, incr);
	        if (this.holidays[this.date_to_label(possible_date)]) {
                        /* close to finding one, but turned out to be holiday */
                        start_day = day;  /* go another week: not sure this is right */
                        day = (day + 1) % 7;
		        incr++;
//		        console.log("   Holiday: day=" + day + " incr=" +incr);
	        } else { 
		        found = true;
                }

	}

        /* we found it or tried everything, in which case we go out a week */
//        console.log("   find_next_day returns: " + possible_date.toString());
        return possible_date;
}


function set_weekdays(group, days)
{
        var next_function_name = "next_" + group;
        
        this.weekdays[group] = map_weekdays(days);


     
        this[next_function_name] = function(start_date) {
                    if (!start_date) 
                            start_date = this.LATEST;
                    return this.find_next_day(this.weekdays[group], start_date);
             }
        return;
}



/*
 *  Feel free to extend the date formats.  If you define one that you're
 *  happy with and you'd like to share it, please send it to me.  I will
 *  include it in future versions (and you will receive credit, of
 *  course). 
 */
function set_label_format(fmt)
{
        if (fmt == "ddmmm") {
                this.date_to_label = date_to_label_ddmmm;
                this.label_to_date = label_to_date_ddmmm;
        }
        /* NEEDWORK: label_to_date not supported yet for these formats...
           will blow up when add_info tries to return a date */
        else if (fmt == "mm/dd")
                this.date_to_label = date_to_label_mm_slash_dd;
        else if (fmt == "dd/mm/yyyy")
                this.date_to_label = date_to_label_dd_slash_mm_slash_yyyy;
        else
                this.date_to_label = date_to_label_dd_slash_mm_slash_yyyy;
}


function add_info (label_arg, new_info /*, ... */)
{
        var label;
        var old_info;
        var return_date;

        /* Make sure we have label in string form, and return_date
           in Javascript Date form */
        if (label_arg instanceof Date) {
	    label = this.date_to_label(label_arg);
            return_date = label_arg;
	} else {
            label = label_arg;
            return_date = this.label_to_date(label);
        }

	old_info= this.info[label];

        if (old_info == null)
                old_info = this.info[label] = [];

        for (var i = 1; i < arguments.length; ++i)
                old_info[old_info.length] = arguments[i];


        /* remember the date */
        this.LATEST = return_date;
        return return_date;
}

function increment_date(curr_date, ndays)
{
        curr_date.setDate(curr_date.getDate() + ndays);
        return curr_date;
}

function add_holiday(label, holiday_name)
{
        this.holidays[label] = holiday_name + "<br>";
}

/* Arguments are assumed to come in pairs:  first of each pair is the label
 * for the holiday (the date), the second is the name of the holiday.
 */
function add_holidays(/* var args */)
{
        for (var i = 0; i < arguments.length; i += 2)
                this.add_holiday(arguments[i], arguments[i + 1]);
}

/*
 * Merges CSS class names and returns a class='xxx yyy' string, where
 * xxx and yyy are the arguments to this function.
 */
function merge_classes(/* var args */)
{
        if (arguments.length == 0) return "";

        var classes = "";
        for (var i = 0; i < arguments.length; i++)
                if (classes == "")
                        classes = arguments[i];
                else if ((arguments[i] == null) || (arguments[i] == ""))
                        continue;
                else
                        classes += " " + arguments[i];
        if (classes == "") 
                return "";
        else
                return "class = '" + classes + "'";
}

function render_cell(the_date)
{
        var cell_label   = this.date_to_label(the_date);
        var info = this.info[cell_label]
        var holiday_info = this.holidays[cell_label];
        var today_class  = 
                (the_date.getTime() == this.today.getTime()) ? this.today_class
                                                             : "";
        var something_rendered = false;     /* true iff we've rendered text */

        if (holiday_info != null)
                document.write("<td " + merge_classes("holiday", today_class)
                               + ">\n"
                               + "<sup>" + cell_label  + "</sup><br>"
                               + holiday_info);
        else
                document.write("<td " + merge_classes(today_class)
                               + ">\n"
                               + "<sup>" + cell_label + "</sup><br>");
        /* Changed to supply an info, not a cell_label. NRM Aug 2016 */
        
        rendered_something = this.render_info(info);

       

        /* See if it's a Friday and if so render weekend data */
        function render_weekend_data(cal, weekend_day_label, day_of_week,
                                     rendered_something)
        {
            weekend_info = cal.info[weekend_day_label];
            if (weekend_info != null) {
		/* Breaks go >between< sections for days */
		if (rendered_something)
		    document.write("<br>");
                document.write("<span class='weekendlabel'>Following are due on or happen on " +
                               day_of_week + " " + weekend_day_label + ": </span>");
		/* Kludge: if info starts with admin, it already has a <br> */
		first_weekend_item = weekend_info[0];
		if (first_weekend_item != "" && weekend_info[0].substr(0,4) != "<br>")
		        document.write("<br>");
                render_info(weekend_info);
		rendered_something = true;
	    }
	    return rendered_something;
        }

        if (the_date.getDay() == 5) {      /* If the_date is a friday */
                weekend_date = new Date(the_date.getTime());       /* Make a copy so we don't alter this */
            rendered_something = render_weekend_data(this, this.date_to_label(increment_date(weekend_date, 1)), "Saturday", rendered_something);
            rendered_something = render_weekend_data(this, this.date_to_label(increment_date(weekend_date, 1)), "Sunday", rendered_something);
        }

        document.write("</td>\n");
}

/* Should a date label go here? */
function render_filler(the_date)
{
        var today_class  = 
                (the_date.getTime() == this.today.getTime()) ? this.today_class
                                                             : "";

        document.write("<td " + merge_classes(today_class, "filler") + ">"
                       + "&nbsp;"
                       + "</td>");
}

function render_link(lnk)
{
        document.write(lnk.toHtml());
}

function render_info(info)
{
        function render_item(item)
        {
                if (isLink(item)) {
                        render_link(item);
                        document.write("<br>");
                } else
                        document.write(item + "<br>");
        }

         if (info == null) return false;

        info.forEach(render_item);

        return true;
}

/*
function render_solution(label)
{
}
*/

function two_digits(n)
{
        return ((n < 10) ? "0" : "") + n;
}

function render_row(curr_date, start_time, end_time)
{
        document.write("  <tr>\n");
        //document.write("<td>"+curr_date.getDate()+"</td>\n");

        for (var i = 1; i <= 5; i++) {
                var curr_time = curr_date.getTime();

                if ((curr_time < start_time) || (curr_time > end_time))
                        this.render_filler(curr_date);
                else
                        this.render_cell(curr_date);

                curr_date = increment_date(curr_date, 1);
        }

        document.write("  </tr>\n");
        return curr_date;
}


// Outputs an HTML table.
// start is a Date object for the fist day of the calendar.
// end is a Date object for last day of the calendar.
// table_args is a string containing any arguments to the TABLE tag. 
// render_cell is a function that will be called to render the
//    contents of every cell.  render_cell must take a single parameter
//    that contains the Date for the cell.
// render_filler is another function that takes a date object and
//    renders a cell that occurs before the start date or after the
//    end date that must be present to fill out the first and last
//    rows. 
function render_calendar()
{
        try {
                this.today     = new Date(); /* used to mark today in cal */
                this.today.setHours(0);
                this.today.setMinutes(0);
                this.today.setSeconds(0);
                this.today.setMilliseconds(0);
                var curr_date  = new Date(this.start);
                var start_time = this.start.getTime();
                var end_time   = this.end.getTime();

                if (start_time > end_time) return;  /* nothing to do */

                // Go back to preceding Monday. Note that
                // JavaScript getDate returns day of the month
                curr_date.setDate(this.start.getDate()
                                  - (this.start.getDay() - 1));

                document.write("<table "
                               + class_to_html(this.cal_class)
                               + ">\n");
                document.write("  <tr>\n" 
                               + "    <th class='monday'>Mon</th>\n"
                               + "    <th class='tuesday'>Tue</th>\n"
                               + "    <th class='wednesday'>Wed</th>\n"
                               + "    <th class='thursday'>Thu</th>\n"
                               + "    <th class='friday'>Fri</th>\n"
                               + "  </tr>");

                while (curr_date.getTime() <= end_time) {
                        curr_date = this.render_row(curr_date, start_time,
                                                    end_time);
                        // skip weekend
                        curr_date = increment_date(curr_date, 2); 
                }

                document.write("</table>\n");
        } catch (e) {
                document.write("There has been an error rendering a calendar.  "
                               + "If you are not the maintainer of the site, "
                               + "be sure that you are using a supported "
                               + "browser: <br>"
                               + cal_supported_browsers);
                if (this.debug_mode > 0)
                        document.write("The error received was:<br>:"
                                       + e.name
                                       + "<br>"
                                       + "and the message was:<br>"
                                       + e.message);
        }
}


function set_calendar_class(cal_class)
{
        this.cal_class = cal_class;
}

function set_today_class(today_class)
{
        this.today_class = today_class;
}

function class_to_html(cal_class)
{
        if (cal_class != null)
                return "class = '" + cal_class + "'";
        else
                return "";
}

/*  IE v 6 and above on Vista and XP work now
function IEwarn()
{
        document.write("<div style = 'background-color: #E9967A;'>"
                       + "The JavaScript Calendar package does not currently"
                       + " support Internet Explorer."
                       + "<p>We intend to support it if possible, however"
                       + " for now you will have to use a browser with better"
                       + " JavaScript support, such as Firefox or Safari."
                       + "<p>Thank you for your patience."
                       + "</div>");
}
*/

function debug_mode_on()
{
        this.debug_mode = 1;
}

function debug_mode_off()
{
        this.debug_mode = 0;
}

var calendar_prototype = {
        debug_mode_on:       debug_mode_on,
        debug_mode_off:      debug_mode_off,
        date_to_label:       date_to_label_mm_slash_dd,
        /* NEEDSWORK: only label_to_date_ddmmm is written, and that doesn't 
           match the default label format */
        label_to_date:       null,
        set_label_format:    set_label_format,
        set_weekdays:        set_weekdays,
        find_next_day:       find_next_day,
        bump_date:           bump_date,
        add_info:            add_info,
        add_holiday:         add_holiday,
        add_holidays:        add_holidays,
        set_calendar_class:  set_calendar_class,
        set_class:  set_calendar_class,       /* for backward compatability */
        set_today_class:     set_today_class,

        render:              render_calendar,
        render_row:          render_row,
        render_info:         render_info,
        render_cell:         render_cell,
        render_filler:       render_filler
};

function Calendar(start_date, end_date)
{
       /*
	* Data members
	*/
        this.start =       start_date;
        this.end   =       end_date;
        this.debug_mode =  0;
        this.holidays =    {};
        this.info =        {};
        this.weekdays =    {};
        this.cal_class =   null;
        this.today_class = null;

       /*
	* Turn off debugging ... change this when testing
	*/
        this.debug_mode_off();


/*      if (navigator.appName == "Microsoft Internet Explorer")
                this.render = IEwarn;
*/
}

Calendar.prototype = calendar_prototype;

/* Intended to hook in with CSS.  Question, should this be left to 
   client, put in a separate calendar_utils.js, or left here?
 */
function admin_note (note)
{
        return "<span class = 'admin'>" + note + "</span>\n";
}
