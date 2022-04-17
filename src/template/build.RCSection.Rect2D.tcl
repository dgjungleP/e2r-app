wipe;
model BasicBuilder -ndm 2 -ndf 3;
set dataDir Data;
file mkdir $dataDir;
source ./tcl/Units.tcl;
# MATERIAL parameter
set IDCore 1;
set IDCover 2;
set IDSteel 3;
# confined concrete
set fc1 [expr @jxqd@*$MPa];
set xc1 @jxqdyb@;
set fcu1 [expr @cyqd@*$MPa];
set xcu1 @cyqdyb@;
# unconfined concrete
set fc2 [expr @jxqd2@*$MPa];
set xc2 @jxqdyb2@;
set fcu2 [expr @cyqd2@*$MPa];
set xcu2 @cyqdyb2@;
# -----------
set Fy [expr @qfqd@.*$MPa];
set Es [expr @txmx@.*$MPa];
set haRatio @yhqd@;
set R0 18;
set cR1 0.925;
set cR2 0.15;
uniaxialMaterial Concrete01 $IDCore $fc1 $xc1 $fcu1 $xcu1;
uniaxialMaterial Concrete01 $IDCover $fc2 $xc2 $fcu2 $xcu2;
uniaxialMaterial Steel02 $IDSteel $Fy $Es $haRatio $R0 $cR1 $cR2;

# section GEOMETRY
set HSec [expr @jmkdh@.*$mm];
set BSec [expr @jmkdb@.*$mm];
set cover [expr @gjzbj@.*$mm];
set numBarsTop @tfxgj@;
set numBarsBot @bfxgj@;
set numBarsInt @mfxgj@;
set Dbar [expr @tfxgjz@*$mm];
set barAreaTop [expr $PI*pow($Dbar,2)/4.0];
set barAreaBot [expr $PI*pow($Dbar,2)/4.0];
set barAreaInt [expr $PI*pow($Dbar,2)/4.0];

set coverY [expr $HSec/2.0];
set coverZ [expr $BSec/2.0];
set coreY [expr $coverY-$cover];
set coreZ [expr $coverZ-$cover];
set steelY [expr $coreY-$Dbar/2];
set steelZ [expr $coreZ-$Dbar/2];
set nfCoreY [expr int(($HSec-2*$cover)/@hxqhfdydxx@)];
set nfCoreZ [expr int(($BSec-2*$cover)/@hxqhfdydxy@)];
set nfCoverY [expr int($HSec/@bhchfdydxx@)];
set nfCoverZ [expr int($BSec/@bhchfdydxy@)];
set nfCoverB 2;
set SecTag 1;
section fiberSec $SecTag {
	patch rect $IDCore $nfCoreY $nfCoreZ -$coreY -$coreZ $coreY $coreZ
	patch rect $IDCover $nfCoverY $nfCoverB -$coreY $coreZ $coreY $coverZ
	patch rect $IDCover $nfCoverY $nfCoverB -$coreY -$coverZ $coreY -$coreZ
	patch rect $IDCover $nfCoverB $nfCoverZ -$coverY -$coverZ -$coreY $coverZ
	patch rect $IDCover $nfCoverB $nfCoverZ $coreY -$coverZ $coverY $coverZ
	layer straight $IDSteel $numBarsTop $barAreaTop $steelY $steelZ $steelY -$steelZ
	layer straight $IDSteel $numBarsBot $barAreaBot  -$steelY $steelZ  -$steelY -$steelZ
	layer straight $IDSteel $numBarsInt $barAreaInt  [expr -$steelY*1/3] $steelZ [expr $steelY*1/3] $steelZ
	layer straight $IDSteel $numBarsInt $barAreaInt  [expr -$steelY*1/3] -$steelZ [expr $steelY*1/3] -$steelZ
};