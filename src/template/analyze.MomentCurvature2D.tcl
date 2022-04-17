# --------------------------------------------------------------------------------------------------
# Moment-Curvature analysis of section
#		Silvia Mazzoni & Frank McKenna, 2006
#

# define procedure
source ./tcl/MomentCurvature2D@index@.tcl

# set AXIAL LOAD --------------------------------------------------------
set P [expr @sjzl@*$kN];	# + Tension, - Compression

# set maximum Curvature:
set Ku [expr @zdqlxz@/$mm];
set numIncr 100;	# Number of analysis increments to maximum curvature (default=100)
# Call the section analysis procedure
MomentCurvature2D $SecTag $P $Ku $numIncr