package Color;
use strict;
use vars qw( %OPT );
use POSIX;
BEGIN {};

## 動的ライブラリインクルード
#	my ($libDir) = $0 =~ /(.+\/)/o;
#	$libDir .= "lib/";
#	
#	require $libDir."Color.pm";


#	Color::HSV2RGB(\%hash);
#		$hash{'h'}	= Hue value in 0.0 - 1.0
#		$hash{'s'}	= Saturation value in 0.0 - 1.0
#		$hash{'v'}	= Value value in 0.0 - 1.0
#	Color::HSV2RGB($H,$S,$V);
sub HSV2RGB{
	my ($H,$S,$V) = @_;
	if(ref($H)){
		$S = $H->{'s'};
		$V = $H->{'v'};
		$H = $H->{'h'};
	}
	
	$S = 0.0 if($S < 0);
	$V = 0.0 if($V < 0);
	$S = 1.0 if($S > 1);
	$V = 1.0 if($V > 1);
	
	while($H < 0 ){ $H += 360 };
	$H = $H % 360 if($H > 360);
	
	
	if($S == 0){
		return wantarray ? ($V,$V,$V):{'r' =>$V , 'g'=>$V ,'b' => $V};
	}
	
	my $Hi = floor($H/60);# % 6;
	my $f = ($H/60) - $Hi;
	
#	print '$Hi = '.$Hi."\n";
	
	my $p = $V * (1 - $S);
	my $q = $V * (1 - $f * $S);
	my $t = $V * (1 - (1 - $f) * $S);
	
	my ($R,$G,$B);
	if( $Hi == 0){
		$R = $V;
		$G = $t;
		$B = $p;
	}elsif($Hi == 1){
		$R = $q;
		$G = $V;
		$B = $p;
	}elsif($Hi == 2){
		$R = $p;
		$G = $V;
		$B = $t;
	}elsif($Hi == 3){
		$R = $p;
		$G = $q;
		$B = $V;
	}elsif($Hi == 4){
		$R = $t;
		$G = $p;
		$B = $V;
	}elsif($Hi == 5){
		$R = $V;
		$G = $p;
		$B = $q;
	}
	
	my @hexRGB = map{ sprintf("%02X", int($_ * 255)) }($R,$G,$B);
	return wantarray ? @hexRGB : join('',@hexRGB) ;#{'r' =>$R , 'g'=>$G ,'b' => $B};
}


# RGB color convert to HSV
#	Color::RGB2HSV($R,$G,$B);
#		set hex string to $R,$G,$B 
#
#	Color::RGB2HSV($RGB);
sub RGB2HSV{
	my ($rr,$gg,$bb) ;
	die '[ERR]:RGB Color not defined.' if(! length($_[0]));
	if(scalar(@_) > 2){
		($rr,$gg,$bb) = map{hex($_)/hex("FF")} @_;
	}else{
		($rr,$gg,$bb) = map{hex($_)/hex("FF")} ($_[0] =~ /([a-fA-f0-9]{2})([a-fA-f0-9]{2})([a-fA-f0-9]{2})/o);
	}
	
#	print 'r,g,b = '.join(',',$rr,$gg,$bb)."\n";
	
	my ($rgbMax,$rgbMin) = (sort{ $b <=> $a}($rr,$gg,$bb))[0,-1];
#	print 'rgb max:'.$rgbMax."\n";
#	print 'rgb min:'.$rgbMin."\n";
	
	# 色相
	my $H;
	if($rgbMax == $rr){
		$H = 60.0 * ( ($gg - $bb) / ($rgbMax - $rgbMin));
	}elsif($rgbMax == $gg){
		$H = 60.0 * ( ($bb - $rr) / ($rgbMax - $rgbMin)) + 120;
	}else{
		$H = 60.0 * ( ($rr - $gg) / ($rgbMax - $rgbMin)) + 240;
	}
	
	$H += 360 if($H < 0);
	
	# 彩度
	my $S = ($rgbMax - $rgbMin) / $rgbMax;
	
	# 明度
	my $V = $rgbMax;
	
	return wantarray ? ($H,$S,$V) : {'h' => $H , 's'=> $S ,'v' => $V};
}


END{};
return 1;