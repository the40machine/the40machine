/*
 *   Holidays and Administrative deadlins for Tufts
 *   2016--2017 school year.
 *
 *   We put in all the dates for the entire year.
 *   Only entries within a calendar's date interval are rendered.
 */

var fall_start   = new Date(2016,  8, 5);    
// var fall_end     = new Date(2016, 11, 22);    /* 22 December 2016 */
var fall_end     = new Date(2016, 11, 22);    /* 22 December 2016 */

var spring_start = new Date(2017,  0, 19);    /* 19 January  2017 */
var spring_end   = new Date(2017,  4, 22);    /* 22 May      2017 */

function add_holidays(cal)
{
    cal.add_holidays("05Sep", "Labor Day",
                     "10Oct", "Indigenous People's Day",
		     "11Nov", "Veterans Day",
                     "23Nov", "Thanksgiving",
                     "24Nov", "Thanksgiving",
                     "25Nov", "Thanksgiving",
		     "25Dec", "Christmas",
		     "26Dec", "Christmas (Observed)",
                     "01Jan", "New Year's Day",
                     "02Jan", "New Year's Day (Observed)",
		     "16Jan", "Martin Luther King Day",
                     "20Feb", "Presidents' Day",
                     "20Mar", "Spring break",
                     "21Mar", "Spring break",
                     "22Mar", "Spring break",
                     "23Mar", "Spring break",
                     "24Mar", "Spring break",
                     "17Apr", "Patriot's Day"
    );
}

function add_admin(cal)
{
    var blank_line = ""; /* causes add_info() to make blank line */

    cal.add_info("30Aug", blank_line, admin_note("Gradudate matriculation"));
    cal.add_info("31Aug", blank_line, admin_note("Orientation"));
    cal.add_info("04Sep", blank_line, admin_note("Returning students arrive"));
    cal.add_info("06Sep", blank_line, admin_note("Classes begin"));
    cal.add_info("20Sep", blank_line, admin_note("Add deadline"));
    // Fall 2015:  Classes are held on Colombus Day, so I moved it
    //             to be an administrative note rather than a holiday.
    //cal.add_info("12Oct", blank_line, 
    //                      admin_note("Columbus Day<br/>Classes held"));
    cal.add_info("11Oct", blank_line, 
                          admin_note("Drop deadline " + "(except first-years)"),
                          admin_note("Pass/Fail deadline"));
    cal.add_info("14Oct", blank_line, 
                          admin_note("Tufts Hackathon (<a href=\"http://2016.polyhack.tufts.io/\">Polyhack</a>) starts"));
    cal.add_info("18Oct", blank_line, 
                          admin_note("Spring incompletes deadline"));
    cal.add_info("19Oct", blank_line, 
                          admin_note("Grace Hopper Conference &#8212; some students will be away"));
    cal.add_info("20Oct", blank_line, 
                          admin_note("Grace Hopper Conference &#8212; some students will be away"));
    cal.add_info("21Oct", blank_line, 
                          admin_note("Grace Hopper Conference &#8212; some students will be away"));
    cal.add_info("31Oct", blank_line, admin_note("Advising period begins"));
    cal.add_info("08Nov", blank_line, admin_note("Friday schedule"));
    cal.add_info("11Nov", blank_line, admin_note("Advising period ends"));
    cal.add_info("14Nov", blank_line, admin_note("Begin Spring registration"));
    cal.add_info("15Nov", blank_line, admin_note("First year drop/PF"
                                                 + " deadline"));
    cal.add_info("25Nov", blank_line, 
                          admin_note("End Spring registration 1700"));
    cal.add_info("12Dec", blank_line, admin_note("Last day of classes"));
    cal.add_info("12Dec", admin_note("Withdraw with W deadline"));
    cal.add_info("13Dec", blank_line, admin_note("Reading period"));
    cal.add_info("14Dec", blank_line, admin_note("Reading period"));
    cal.add_info("15Dec", blank_line, admin_note("Begin final exams"));
    cal.add_info("22Dec", blank_line, admin_note("End final exams"));

    cal.add_info("04Jan", blank_line, admin_note("Fall grades due by 0900"));
    cal.add_info("18Jan", blank_line, admin_note("Orientation"));
    cal.add_info("19Jan", blank_line, admin_note("Classes begin"),
                                      admin_note("Ex-college registration"));
    cal.add_info("02Feb", blank_line, admin_note("Add deadline"));
    cal.add_info("23Feb", blank_line, admin_note("Monday schedule"));
    cal.add_info("23Feb", blank_line, 
                          admin_note("Drop deadline " + "(except first-years)"),
                          admin_note("Pass/Fail deadline"));
    cal.add_info("02Mar", blank_line, admin_note("Fall incompletes deadline"));
    cal.add_info("06Apr", blank_line, admin_note("First year drop/PF"
                                                 + " deadline"));
    cal.add_info("27Mar", blank_line, admin_note("Begin advising period"));
    cal.add_info("07Apr", blank_line, admin_note("End advising period"));
    cal.add_info("10Apr", blank_line, admin_note("Begin fall registration"));
    cal.add_info("21Apr", blank_line, admin_note("End fall registration"));
    cal.add_info("01May", blank_line, admin_note("Classes end"),
                                      admin_note("Withdraw deadline"));
    cal.add_info("02May", blank_line, admin_note("Reading period"));
    cal.add_info("03May", blank_line, admin_note("Reading period"));
    cal.add_info("04May", blank_line, admin_note("Reading period"));
    cal.add_info("05May", blank_line, admin_note("Begin final exams"));
    cal.add_info("12May", blank_line, admin_note("End final exams"));
    cal.add_info("15May", blank_line, 
                          admin_note("Degree candidates' grades due 0900"),
                          admin_note("Begin Senior Week"));
    cal.add_info("19May", blank_line, 
                          admin_note("Remaining grades due 0900"),
                          admin_note("End Senior Week"));
    cal.add_info("19May", blank_line, admin_note("Commencement on Sunday"));
    cal.add_info("21May", blank_line, admin_note("Commencement"));
    cal.add_info("22May", blank_line, admin_note("Residence halls close"));
}

/* If someone wants a pre-made calendar that they can just add their
 * course items to, here are two.  The administrative dates are NOT
 * included here, because a) my intuition is that some people may not
 * want the administrative dates and b) if they do want them, they
 * will likely want them at the bottom of each calendar day (after any
 * course content).  So, they can call the above function if they want.
 */

var fall_calendar   = new Calendar(fall_start,   fall_end);
var spring_calendar = new Calendar(spring_start, spring_end);

add_holidays(fall_calendar);
add_holidays(spring_calendar);
