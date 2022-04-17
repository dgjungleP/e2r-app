# define UNITS
set NT 1.0;
set mm 1.0;
set sec 1.0;
set kN [expr 1000.0*$NT];
set MPa [expr 1.0*$NT/pow($mm,2)];
set LunitTXT "mm";
set FunitTXT "kN";
set TunitTXT "sec";
set m [expr 1000.0*$mm];
set mm2 [expr $mm*$mm];
set mm4 [expr $mm*$mm*$mm*$mm];
set cm [expr 10.0*$mm];
set PI [expr 2*asin(1.0)];
set Ubig 1.e10;
set Usmall [expr 1/$Ubig];